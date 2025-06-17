import { FlowPlaterConfig, FlowPlaterGroup, FlowPlaterInstance } from "../types";

export const _state = {
  templateCache: {} as Record<string, any>,
  instances: {} as Record<string, FlowPlaterInstance>,
  groups: {} as Record<string, FlowPlaterGroup>, // Store groups and their shared data
  length: 0,
  initialized: false,
  defaults: {
    animation: false,
    debug: false,
  },
  config: {} as FlowPlaterConfig,
  _initTracking: {} as Record<string, number>,
};

// Helper functions for state management
export function getInstance(instanceName: string): FlowPlaterInstance | undefined {
  return _state.instances[instanceName as keyof typeof _state.instances];
}

export function getInstances(): Record<string, FlowPlaterInstance> {
  return _state.instances;
}

export function incrementLength(): number {
  return ++_state.length;
}

// Helper function for group management
export function getGroup(groupName: string): FlowPlaterGroup | undefined {
  return _state.groups[groupName as keyof typeof _state.groups];
}

export function getGroups(): Record<string, FlowPlaterGroup> {
  return _state.groups;
}
