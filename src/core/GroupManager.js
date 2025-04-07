import { _state } from "./State";
import { Debug } from "./Debug";
import { createDeepProxy } from "../utils/CreateDeepProxy";
import { deepMerge } from "../utils/DeepMerge";
import { saveToLocalStorage } from "../utils/LocalStorage";
import { EventSystem } from "./EventSystem";
import PluginManager from "./PluginManager";

export const GroupManager = {
  /**
   * Gets or creates a group and its shared data proxy
   * @param {string} groupName - The name of the group
   * @param {Object} initialData - Initial data for the group (if new)
   * @returns {Object} The group object containing data proxy and instances
   */
  getOrCreateGroup(groupName, initialData = {}) {
    if (!groupName) {
      Debug.error("Invalid group name");
      return null;
    }

    // If group already exists, return it
    if (_state.groups[groupName]) {
      // Merge any new initial data
      if (Object.keys(initialData).length > 0) {
        deepMerge(_state.groups[groupName].data, initialData);
      }
      return _state.groups[groupName];
    }

    // Create new group
    const group = {
      name: groupName,
      instances: new Set(),
      _isEvaluating: false,
      _lastRenderedOutputs: new Map(),
      data: {}, // Will be replaced with proxy
    };

    // Create proxy for group data
    group.data = createDeepProxy(initialData, async () => {
      // Skip if already evaluating to prevent circular updates
      if (group._isEvaluating) return;

      try {
        group._isEvaluating = true;
        Debug.info(
          `[Group Update] Updating all instances in group: ${groupName}`,
        );

        // Get array of instances that are ready for updates
        const instances = Array.from(group.instances).filter(
          (instance) =>
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
              group.data,
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

        // Save to storage if enabled
        if (_state.config?.storage?.enabled) {
          saveToLocalStorage(`group_${groupName}`, group.data, "group");
        }
      } finally {
        group._isEvaluating = false;
      }
    });

    // Store group in state
    _state.groups[groupName] = group;
    Debug.info(`Created new group: ${groupName}`);

    return group;
  },

  /**
   * Adds an instance to a group
   * @param {Object} instance - The instance to add
   * @param {string} groupName - The name of the group
   */
  addInstanceToGroup(instance, groupName) {
    const group = this.getOrCreateGroup(groupName);
    if (group) {
      // Set instance's group reference
      instance.groupName = groupName;

      // Add instance to group
      group.instances.add(instance);

      // Only try to render if the template is actually a function
      if (instance.template && typeof instance.template === "function") {
        // Store instance's initial rendered output
        const transformedData = PluginManager.applyTransformations(
          instance,
          group.data,
          "transformDataBeforeRender",
          "json",
        );

        try {
          const renderedOutput = instance.template(transformedData);
          group._lastRenderedOutputs.set(instance.instanceName, renderedOutput);
        } catch (error) {
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
  removeInstanceFromGroup(instance) {
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
