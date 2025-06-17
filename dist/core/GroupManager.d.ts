import { FlowPlaterGroup, FlowPlaterInstance } from "../types";
export declare const GroupManager: {
    getOrCreateGroup(groupName: string, initialData?: Record<string, any>): FlowPlaterGroup;
    getGroup(groupName: string): FlowPlaterGroup | null;
    getAllGroups(): Record<string, FlowPlaterGroup>;
    updateGroup(groupName: string, data: Record<string, any>): FlowPlaterGroup | null;
    removeGroup(groupName: string): void;
    removeAllGroups(): void;
    /**
     * Adds an instance to a group
     * @param {Object} instance - The instance to add
     * @param {string} groupName - The name of the group
     */
    addInstanceToGroup(instance: FlowPlaterInstance, groupName: string): void;
    /**
     * Removes an instance from its group
     * @param {Object} instance - The instance to remove
     */
    removeInstanceFromGroup(instance: FlowPlaterInstance): void;
};
