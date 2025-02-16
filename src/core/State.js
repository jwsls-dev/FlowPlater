export const _state = {
  templateCache: {},
  instances: {},
  length: 0,
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
