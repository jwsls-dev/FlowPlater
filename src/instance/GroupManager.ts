import { _state } from "../core/State";
import { Debug } from "../core/Debug";
import { saveToLocalStorage, loadFromLocalStorage } from "../storage/LocalStorage";
import { createDeepProxy, deepMerge } from "../storage/DataTransformers";
import { EventSystem } from "../events/EventSystem";
import { PluginManager } from "../core/PluginManager";
import { ConfigManager } from "../core/ConfigManager";
import { FlowPlaterGroup, FlowPlaterInstance, FlowPlaterElement } from "../types";

export const GroupManager = {
  getOrCreateGroup(groupName: string, initialData: Record<string, any> = {}): FlowPlaterGroup {
    let existingGroup = _state.groups[groupName];

    if (existingGroup) {
      // Merge any new initial data
      if (Object.keys(initialData).length > 0) {
        deepMerge(existingGroup.data, initialData);
        Debug.debug(
          `[GroupManager] Merged initialData into existing group: ${groupName}`,
          initialData,
        );
      }
      return existingGroup as FlowPlaterGroup;
    }

    // --- Group doesn't exist in state, attempt to load from storage ---
    let baseData = {}; // Start with empty base

    if (ConfigManager.getConfig().storage?.enabled) {
      // Check if storage is currently enabled
      try {
        const loadedData = loadFromLocalStorage(groupName, "group");
        if (loadedData) {
          Debug.info(
            `[GroupManager] Loaded group data from storage for: ${groupName}`,
          );
          baseData = loadedData; // Use loaded data as the base
        } else {
          Debug.debug(
            `[GroupManager] No group data found in storage for: ${groupName}`,
          );
        }
      } catch (e: any) {
        Debug.error(
          `[GroupManager] Error loading group ${groupName} from storage: ${e.message}`,
        );
        // Proceed with empty baseData on error
      }
    } else {
      Debug.debug(
        `[GroupManager] Storage is disabled, skipping loadFromLocalStorage for: ${groupName}`,
      );
    }

    // Merge any explicitly passed initialData *on top* of the base (loaded or empty)
    if (Object.keys(initialData).length > 0) {
      baseData = deepMerge(baseData, initialData);
      Debug.debug(
        `[GroupManager] Merged initialData onto base for new group: ${groupName}`,
        initialData,
      );
    }

    // --- Create new group with the final baseData ---
    Debug.info(
      `[GroupManager] Creating new group: ${groupName} with base data`,
      baseData,
    );
    const group = {
      name: groupName,
      elements: [],
      addElement: (element: FlowPlaterElement) => {
        group.elements.push(element);
      },
      removeElement: (element: FlowPlaterElement) => {
        group.elements = group.elements.filter((e) => e !== element);
      },
      instances: new Set<FlowPlaterInstance>(),
      _isEvaluating: false,
      _lastRenderedOutputs: new Map(),
      data: {}, // Will be replaced with proxy
      getData: () => {
        return JSON.parse(JSON.stringify(_state.groups[groupName].data));
      },
      update: (data: Record<string, any>) => {
        deepMerge(group.data, data);
      },
      refresh: () => {
        group.update(group.data);
      },
      destroy: () => {
        delete _state.groups[groupName];
      },
    } as unknown as FlowPlaterGroup;

    // Create proxy for group data using the final baseData
    group.data = createDeepProxy(baseData, async () => {
      // Skip if already evaluating to prevent circular updates
      if (group._isEvaluating) return;

      try {
        group._isEvaluating = true;
        Debug.info(
          `[Group Update] Updating all instances in group: ${groupName}`,
        );

        // Get array of instances that are ready for updates
        const instances = Array.from(group.instances).filter(
          (instance: FlowPlaterInstance) =>
            instance.template &&
            typeof instance.template === "function" &&
            !instance._htmxUpdateInProgress,
        );

        // Create update promises for all instances
        const updatePromises = instances.map(async (instance) => {
          try {
            // Get transformed data
            const transformedData = PluginManager.applyTransformations(
              instance,
              group.getData(),
              "transformDataBeforeRender",
              "json",
            );

            // Render template
            const newRenderedOutput = instance.template(transformedData);
            const previousOutput = group._lastRenderedOutputs.get(
              instance.instanceName,
            );

            // Only update if output changed
            if (previousOutput !== newRenderedOutput) {
              // Execute hooks
              PluginManager.executeHook("updateData", instance, {
                newData: group.data,
                source: "group",
              });

              EventSystem.publish("updateData", {
                instanceName: instance.instanceName,
                groupName: groupName,
                newData: group.data,
                source: "group",
              });

              // Update DOM
              Debug.debug(
                `[Group Update] Updating DOM for ${instance.instanceName}`,
              );
              return instance._updateDOM().then(() => {
                // Store rendered output
                group._lastRenderedOutputs.set(
                  instance.instanceName,
                  newRenderedOutput,
                );
              });
            }
          } catch (error) {
            Debug.error(`Error updating ${instance.instanceName}:`, error);
          }
        });

        // Wait for all instance updates to complete
        await Promise.all(updatePromises);

        // Save to storage if enabled - dynamically checks ConfigManager.getConfig
        if (ConfigManager.getConfig().storage?.enabled) {
          Debug.debug(`[Group Update] Saving group data for ${groupName}`);
          saveToLocalStorage(groupName, group.data, "group");
        }
      } finally {
        group._isEvaluating = false;
      }
    });

    // Store group in state
    _state.groups[groupName] = group as any;
    Debug.info(`[GroupManager] Created and stored new group: ${groupName}`);

    return group as unknown as FlowPlaterGroup;
  },

  getGroup(groupName: string): FlowPlaterGroup | null {
    return _state.groups[groupName] || null;
  },

  getAllGroups(): Record<string, FlowPlaterGroup> {
    return _state.groups;
  },

  updateGroup(groupName: string, data: Record<string, any>): FlowPlaterGroup | null {
    const group = this.getGroup(groupName);
    if (group && group.data && typeof data === "object") {
      deepMerge(group.data, data);
      return group;
    }
    return null;
  },

  removeGroup(groupName: string) {
    const group = this.getGroup(groupName);
    if (group) {
      delete _state.groups[groupName];
      Debug.info(`Removed group: ${groupName}`);
    }
  },

  removeAllGroups() {
    _state.groups = {};
    Debug.info("Removed all groups");
  },

  /**
   * Adds an instance to a group
   * @param {Object} instance - The instance to add
   * @param {string} groupName - The name of the group
   */
  addInstanceToGroup(instance: FlowPlaterInstance, groupName: string) {
    const group = this.getOrCreateGroup(groupName);
    if (group) {
      // Set instance's group reference
      instance.groupName = groupName;

      // Add instance to group
      (group as FlowPlaterGroup).instances.add(instance);

      // Only try to render if the template is actually a function
      if (instance.template && typeof instance.template === "function") {
        // Store instance's initial rendered output
        const transformedData = PluginManager.applyTransformations(
          instance,
          group.getData(),
          "transformDataBeforeRender",
          "json",
        );

        try {
          const renderedOutput = instance.template(transformedData);
          group._lastRenderedOutputs.set(instance.instanceName, renderedOutput);
        } catch (error: any) {
          Debug.error(
            `Error rendering template for group member: ${error.message}`,
          );
        }
      } else {
        Debug.debug(
          `Skipping initial render for group member: template not ready for ${instance.instanceName}`,
        );
      }

      Debug.debug(
        `Added instance ${instance.instanceName} to group ${groupName}`,
      );
    }
  },

  /**
   * Removes an instance from its group
   * @param {Object} instance - The instance to remove
   */
  removeInstanceFromGroup(instance: FlowPlaterInstance) {
    if (!instance.groupName) {
      return;
    }

    const group = _state.groups[instance.groupName];
    if (group) {
      group.instances.delete(instance);
      group._lastRenderedOutputs.delete(instance.instanceName);

      Debug.debug(
        `Removed instance ${instance.instanceName} from group ${instance.groupName}`,
      );

      // Clean up empty groups
      if (group.instances.size === 0) {
        delete _state.groups[instance.groupName];
        Debug.info(`Removed empty group: ${instance.groupName}`);
      }
    }

    // Remove group reference from instance
    delete instance.groupName;
  },
};
