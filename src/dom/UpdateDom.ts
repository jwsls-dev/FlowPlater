import { Debug, RenderError } from "../core/Debug";
import { Performance } from "../utils/Performance";
import { EventSystem } from "../events/EventSystem";
import { PluginManager } from "../core/PluginManager";
import { domBatcher } from "../dom/DomBatcher";
import morphdom from "morphdom";
import {
  captureFormStates,
  setupFormSubmitHandlers,
  setupDynamicFormObserver,
} from "../forms/FormPersistence";
import { AttributeMatcher } from "../dom/AttributeMatcher";
import { ConfigService } from "../core/ConfigService";
import { FlowPlaterInstance } from "../types";
import { animate as runAnimation } from "../template/Animate";
import { shouldRestoreForm, restoreFormStates } from '../forms/FormPersistence';

/**
 * Performs the actual DOM update logic
 */
async function performDomUpdate(
  element: HTMLElement,
  newHTML: string,
  forceFullUpdate: boolean,
  elementId: string,
  timestamp: number
): Promise<void> {
  if (forceFullUpdate) {
    // For forced updates, simply set innerHTML
    await domBatcher.write(
      () => {
        element.innerHTML = newHTML;
        Debug.debug(`performDomUpdate: Force full update completed for ${elementId}`);
      },
      `full-update-${elementId}-${timestamp}`
    );
    return;
  }

  // Use morphdom for efficient DOM reconciliation
  Debug.debug(`performDomUpdate: Using morphdom for element ${elementId} with ${element.childNodes.length} child nodes`);
  Debug.debug(`performDomUpdate: Element innerHTML length: ${element.innerHTML.length}`);
  Debug.debug(`performDomUpdate: Element innerHTML preview:`, element.innerHTML.substring(0, 200));

  // Determine emptiness efficiently: any non-whitespace text or any element tags
  const hasElements = /<\w+[^>]*>/.test(newHTML);
  const hasNonWhitespaceText = newHTML.replace(/<[^>]*>/g, '').trim().length > 0;
  const hasRenderableContent = hasElements || hasNonWhitespaceText;
  if (!hasRenderableContent) {
    Debug.debug(`performDomUpdate: Empty newVNodes detected, clearing container for element ${elementId}`);
    await domBatcher.write(
      () => {
        element.innerHTML = '';
      },
      `clear-empty-${elementId}-${timestamp}`
    );
    return;
  }

  // Write phase: morph current DOM to the new HTML
  await domBatcher.write(
    () => {
      morphdom(element, newHTML, {
        childrenOnly: true,
        getNodeKey: (node: Node) => {
          if (!(node instanceof Element)) return undefined;
          const el = node as HTMLElement;
          const id = el.id;
          const key = el.getAttribute('data-key');
          return id || key || undefined;
        },
        onBeforeElUpdated: (fromEl: Element, toEl: Element) => {
          // Merge Webflow classes (w-*) from existing element into the new one
          const from = fromEl as HTMLElement;
          const to = toEl as HTMLElement;

          const fromClasses = (from.className || '').split(' ').filter(Boolean);
          const webflowClasses = fromClasses.filter(cls => cls.startsWith('w-'));
          if (webflowClasses.length > 0) {
            const toClasses = (to.className || '').split(' ').filter(Boolean);
            const merged = Array.from(new Set([...toClasses, ...webflowClasses]));
            to.className = merged.join(' ');
          }

          // Preserve Webflow-specific attributes (w-*) present on the existing element
          Array.from(from.attributes).forEach(attr => {
            if (attr.name.startsWith('w-') && !to.hasAttribute(attr.name)) {
              to.setAttribute(attr.name, attr.value);
            }
          });

          // Form elements: preserve user state (value/checked/selection)
          if (from instanceof HTMLInputElement && to instanceof HTMLInputElement) {
            if (from.type === 'checkbox' || from.type === 'radio') {
              to.checked = from.checked;
            } else if (from.type !== 'file') {
              to.value = from.value;
            }
          } else if (from instanceof HTMLTextAreaElement && to instanceof HTMLTextAreaElement) {
            to.value = from.value;
          } else if (from instanceof HTMLSelectElement && to instanceof HTMLSelectElement) {
            if (from.multiple) {
              const selectedValues = Array.from(from.selectedOptions).map(o => o.value);
              Array.from(to.options).forEach(opt => { opt.selected = selectedValues.includes(opt.value); });
            } else {
              to.value = from.value;
            }
          }

          // Skip updates if nodes are identical
          if ((from as HTMLElement).isEqualNode(to as Node)) {
            return false;
          }
          return true;
        },
        onElUpdated: (el: Element) => {
          // Sync Webflow visual state for checkbox/radio wrappers
          if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
            const wrapper = el.closest(el.type === 'checkbox' ? '.w-checkbox' : '.w-radio');
            if (wrapper) {
              const custom = wrapper.querySelector(`.w-${el.type}-input`);
              if (custom) {
                if (el.checked) {
                  custom.classList.add('w--redirected-checked');
                } else {
                  custom.classList.remove('w--redirected-checked');
                }
              }
            }
          }
        },
        onNodeAdded: (node: Node) => {
          // Ensure newly added inputs reflect correct Webflow visual state
          if (node instanceof HTMLInputElement && (node.type === 'checkbox' || node.type === 'radio')) {
            const wrapper = node.closest(node.type === 'checkbox' ? '.w-checkbox' : '.w-radio');
            if (wrapper) {
              const custom = wrapper.querySelector(`.w-${node.type}-input`);
              if (custom) {
                if (node.checked) {
                  custom.classList.add('w--redirected-checked');
                } else {
                  custom.classList.remove('w--redirected-checked');
                }
              }
            }
          }
        }
      });
    },
    `morphdom-${elementId}-${timestamp}`
  );
}

/**
 * Main update function with performance tracking and error handling
 */
async function updateDOM(element: HTMLElement, newHTML: string, animate = false, instance: FlowPlaterInstance | null = null) {
  
  const forceFullUpdate = AttributeMatcher._hasAttribute(element, "force-full-update");
  const config = ConfigService.getConfig();
  const elementId = element.id || 'unknown';
  const timestamp = Date.now();

  Performance.start("updateDOM_" + instance?.instanceName || element.id);
  
  Debug.debug(`UpdateDOM: ===== STARTING UPDATE for ${elementId} at ${timestamp} =====`);

  // Add a flag to prevent multiple restorations
  const isAlreadyRestoring = element.hasAttribute("fp-restoring");
  if (isAlreadyRestoring && !forceFullUpdate) {
    Debug.debug(`UpdateDOM: Already restoring element ${elementId}, skipping update`);
    return;
  }
  
  // Add update counter to track multiple rapid calls
  const updateCounter = parseInt(element.getAttribute("fp-update-counter") || "0") + 1;
  element.setAttribute("fp-update-counter", updateCounter.toString());
  element.setAttribute("fp-restoring", "true");
  
  Debug.debug(`UpdateDOM: This is update #${updateCounter} for element ${elementId}`);

  try {
    if (!element || !(element instanceof HTMLElement)) {
      throw new RenderError("Invalid target element", undefined);
    }

    if (typeof newHTML !== "string") {
      throw new RenderError("newHTML must be a string", undefined);
    }
    
    Debug.debug(`UpdateDOM called for element ${elementId} with newHTML length: ${newHTML.length}`);
    if (newHTML.length === 0) {
      Debug.warn(`UpdateDOM: Empty newHTML provided for element ${elementId}`);
    } else {
      Debug.debug(`UpdateDOM: newHTML preview (first 200 chars): ${newHTML.substring(0, 200)}`);
    }

    // Check form persistence requirements
    const shouldHandleFormState = config.persistForm && shouldRestoreForm(element);
    
    // Only capture and restore form state manually when doing force update
    // Virtual DOM already preserves form element state during normal updates
    const needsManualStatePreservation = shouldHandleFormState && forceFullUpdate;
    
    Debug.debug("Starting updateDOM with config:", config);
    Debug.debug(`Form persistence enabled: ${config.persistForm}, Should handle form state: ${shouldHandleFormState}, Needs manual preservation (force update): ${needsManualStatePreservation}`);

    // Capture form states if manual preservation is needed (single DOM read operation)
    let formStates = null;
    let formObserver = null;
    
    if (needsManualStatePreservation) {
      Debug.debug("Capturing form states before update (manual preservation needed)");
      formStates = await domBatcher.read(
        () => captureFormStates(element),
        `capture-form-${elementId}-${timestamp}`
      );
      Debug.debug("Captured form states:", formStates);
    }
    
    if (shouldHandleFormState) {
      Debug.debug("Setting up dynamic form observer");
      formObserver = setupDynamicFormObserver(element);
    }

    const updateContent = () => {
      return new Promise<void>(async (resolve) => {
        // Publish beforeDomUpdate event
        EventSystem.publish("beforeDomUpdate", {
          element,
          newHTML,
          animate,
          formStates,
        });

        // Execute beforeDomUpdate plugin hook if instance is provided
        if (instance) {
          PluginManager.executeHook("beforeDomUpdate", instance, {
            element,
            newHTML,
            animate,
            formStates,
          });
        }

        // Perform the actual DOM update
        await performDomUpdate(element, newHTML, forceFullUpdate, elementId, timestamp);

        // Form state handling after DOM update
        if (shouldHandleFormState) {
          if (needsManualStatePreservation && formStates) {
            Debug.debug("Restoring form states after update (manual preservation)");
            await domBatcher.write(
              () => {
                restoreFormStates(
                  element,
                  "updateDOM - form state restoration - restoreFormStates",
                );
              },
              `restore-form-${elementId}-${timestamp}`
            );
          }
          
          // Always set up form submit handlers when form persistence is enabled
          Debug.debug("Setting up form submit handlers");
          await domBatcher.write(
            () => {
              setupFormSubmitHandlers(
                element,
                "updateDOM - form state restoration - setupFormSubmitHandlers",
              );
            },
            `setup-form-handlers-${elementId}-${timestamp}`
          );
        }

        // Execute afterDomUpdate plugin hook if instance is provided
        if (instance) {
          PluginManager.executeHook("afterDomUpdate", instance, {
            element,
            newHTML,
            animate,
            formStates,
          });
        }

        // Publish afterDomUpdate event
        EventSystem.publish("afterDomUpdate", {
          element,
          newHTML,
          animate,
          formStates,
        });

        resolve();
      });
    };

    // Handle view transitions for animations
    await new Promise<void>(resolve => {
      runAnimation(element, async () => {
        await updateContent();
        resolve();
      });
    });

    if (formObserver) {
      Debug.debug("Disconnecting form observer");
      formObserver.disconnect();
    }
  } catch (error) {
    Debug.error("Error in updateDOM:", error);
    throw error;
  } finally {
    element.removeAttribute("fp-restoring");
    
    Performance.end("updateDOM_" + instance?.instanceName || element.id);
    
    Debug.debug(`UpdateDOM: ===== COMPLETED UPDATE #${updateCounter} for ${elementId} =====`);
  }
}

export { updateDOM };
