import { Debug } from "./Debug";
import { EventSystem } from "../events/EventSystem";
import { _state } from "./State";
import { GroupManager } from "../instance/GroupManager";
import type { FlowPlaterGroup, FlowPlaterInstance } from "../types";

/**
 * Centralized data mediator for instances and groups.
 * Ensures a single point of truth for membership and update propagation.
 */
export class DataStore {
  private static initialized = false;

  /**
   * Initialize global subscriptions for data flow.
   * Routes group-driven data changes to instances without direct coupling.
   */
  static init(): void {
    if (this.initialized) return;
    this.initialized = true;

    // Route group-originated data updates to the corresponding instance DOM updates
    EventSystem.subscribe("updateData", (payload: any) => {
      try {
        if (!payload || payload.source !== "group") return;
        const instanceName: string | undefined = payload.instanceName;
        if (!instanceName) return;

        const instance = _state.instances[instanceName];
        if (!instance) return;
        if (instance._htmxUpdateInProgress) return;

        Debug.debug(`[DataStore] updateData received for ${instanceName} from group '${payload.groupName}'. Triggering DOM update.`);
        // Fire and forget; the instance handles debouncing/flags internally
        Promise.resolve().then(() => instance._updateDOM());
      } catch (e) {
        Debug.error("[DataStore] Error handling updateData event:", e);
      }
    });

    Debug.info("[DataStore] Initialized centralized data flow");
  }

  // Group wrappers to enforce centralized access

  static getOrCreateGroup(groupName: string, initialData: Record<string, any> = {}): FlowPlaterGroup {
    return GroupManager.getOrCreateGroup(groupName, initialData);
  }

  static getGroup(groupName: string): FlowPlaterGroup | null {
    return GroupManager.getGroup(groupName);
  }

  static getAllGroups(): Record<string, FlowPlaterGroup> {
    return GroupManager.getAllGroups();
  }

  static updateGroup(groupName: string, data: Record<string, any>): FlowPlaterGroup | null {
    return GroupManager.updateGroup(groupName, data);
  }

  static removeGroup(groupName: string): void {
    return GroupManager.removeGroup(groupName);
  }

  static removeAllGroups(): void {
    return GroupManager.removeAllGroups();
  }

  static addInstanceToGroup(instance: FlowPlaterInstance, groupName: string): void {
    return GroupManager.addInstanceToGroup(instance, groupName);
  }

  static removeInstanceFromGroup(instance: FlowPlaterInstance): void {
    return GroupManager.removeInstanceFromGroup(instance);
  }
}


