import { Debug } from "../core/Debug";
import { Performance } from "../utils/Performance";
import { _state } from "../core/State";
import { EventSystem } from "../events";
import { PluginManager } from "../core/PluginManager";
import { domBatcher, VirtualDOM } from "../dom";
import {
  captureFormStates,
  setupFormSubmitHandlers,
  setupDynamicFormObserver,
  FormStateManager
} from "../forms";
import { AttributeMatcher } from "../dom";
import { ConfigManager } from "../core/ConfigManager";
import { FlowPlaterInstance } from "../types";

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

  // For non-forced updates, check if HTML is empty
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = newHTML;
  const hasElements = tempDiv.children.length > 0;
  const hasNonWhitespaceText = tempDiv.textContent && tempDiv.textContent.trim().length > 0;
  
  if (!hasElements && !hasNonWhitespaceText) {
    // Clear the container for empty HTML
    Debug.debug(`performDomUpdate: Empty newHTML detected, clearing container for element ${elementId}`);
    await domBatcher.write(
      () => {
        element.innerHTML = '';
      },
      `clear-empty-${elementId}-${timestamp}`
    );
    return;
  }

  // Use Virtual DOM for efficient diffing and patching
  Debug.debug(`performDomUpdate: Using Virtual DOM for element ${elementId} with ${element.childNodes.length} child nodes`);
  Debug.debug(`performDomUpdate: Element innerHTML length: ${element.innerHTML.length}`);
  Debug.debug(`performDomUpdate: Element innerHTML preview:`, element.innerHTML.substring(0, 200));
  
  // Read phase: capture current DOM state
  const oldVNodes = VirtualDOM.domToVNodes(element) || [];
  Debug.debug(`performDomUpdate: Captured initial DOM state with ${oldVNodes.length} nodes`);
  Debug.debug(`performDomUpdate: Initial DOM nodes:`, oldVNodes.map((vn, i) => 
    typeof vn === 'string' ? `${i}: "${vn}"` : `${i}: <${vn.tag}${vn.attrs.class ? ` class="${vn.attrs.class}"` : ''}>`
  ));
  
  // Parse new HTML and compare
  const newVNodes = VirtualDOM.parseHTML(newHTML) || [];
  Debug.debug(`performDomUpdate: Parsed new HTML into ${newVNodes.length} nodes`);
  Debug.debug(`performDomUpdate: New DOM nodes:`, newVNodes.map((vn, i) => 
    typeof vn === 'string' ? `${i}: "${vn}"` : `${i}: <${vn.tag}${vn.attrs.class ? ` class="${vn.attrs.class}"` : ''}>`
  ));
  
  // Write phase: diff and apply patches
  await domBatcher.batch([
    {
      type: 'write',
      operation: () => {
        const patches = VirtualDOM.diff(oldVNodes, newVNodes);
        Debug.debug(`performDomUpdate: Generated ${patches.length} patches`);
        
        if (patches.length > 0) {
          VirtualDOM.patch(element, patches);
        } else {
          Debug.debug(`performDomUpdate: No patches to apply - content is identical`);
        }
      },
      id: `vdom-patch-${elementId}-${timestamp}`
    }
  ]);
}

/**
 * Main update function with performance tracking and error handling
 */
async function updateDOM(element: HTMLElement, newHTML: string, animate = false, instance: FlowPlaterInstance | null = null) {
  Performance.start("updateDOM");

  const forceFullUpdate = AttributeMatcher._hasAttribute(element, "force-full-update");
  const config = ConfigManager.getConfig();
  const elementId = element.id || 'unknown';
  const timestamp = Date.now();
  
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
      throw new Error("Invalid target element");
    }

    if (typeof newHTML !== "string") {
      throw new Error("newHTML must be a string");
    }
    
    Debug.debug(`UpdateDOM called for element ${elementId} with newHTML length: ${newHTML.length}`);
    if (newHTML.length === 0) {
      Debug.warn(`UpdateDOM: Empty newHTML provided for element ${elementId}`);
    } else {
      Debug.debug(`UpdateDOM: newHTML preview (first 200 chars): ${newHTML.substring(0, 200)}`);
    }

    // Check form persistence requirements
    const shouldHandleFormState = config.persistForm && FormStateManager.shouldRestoreForm(element);
    
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
                FormStateManager.restoreFormStates(
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
    if (document.startViewTransition && animate) {
      await document.startViewTransition(() => updateContent()).finished;
    } else {
      await updateContent();
    }

    if (formObserver) {
      Debug.debug("Disconnecting form observer");
      formObserver.disconnect();
    }
  } catch (error) {
    Debug.error("Error in updateDOM:", error);
    console.error("UpdateDOM error:", error);
    throw error;
  } finally {
    element.removeAttribute("fp-restoring");
    Debug.debug(`UpdateDOM: ===== COMPLETED UPDATE #${updateCounter} for ${elementId} =====`);
    Performance.end("updateDOM");
  }
}

export { updateDOM };
