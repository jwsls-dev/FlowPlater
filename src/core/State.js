export const _state = {
  templateCache: {},
  instances: {},
  groups: {}, // Store groups and their shared data
  length: 0,
  initialized: false,
  defaults: {
    animation: false,
    debug: false,
  },
};

// Helper functions for state management
export function getInstance(instanceName) {
  return _state.instances[instanceName];
}

export function getInstances() {
  return _state.instances;
}

export function incrementLength() {
  return _state.length++;
}

// Helper function for group management
export function getGroup(groupName) {
  return _state.groups[groupName];
}

export function getGroups() {
  return _state.groups;
}
