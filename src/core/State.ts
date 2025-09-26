import { FlowPlaterConfig, FlowPlaterGroup, FlowPlaterInstance } from "../types";

// Private module-level state (not exported)
const state = {
  templateCache: {} as Record<string, any>,
  instances: {} as Record<string, FlowPlaterInstance>,
  groups: {} as Record<string, FlowPlaterGroup>,
  length: 0,
  initialized: false,
  defaults: {
    animation: false,
    debug: false,
  },
  config: {} as FlowPlaterConfig,
  _initTracking: {} as Record<string, number>,
};

// Readonly facade (legacy compatibility): minimal object for direct property access
// Avoid exporting the real state object
export const _state = {
  get templateCache() { return state.templateCache; },
  set templateCache(v: Record<string, any>) { state.templateCache = v; },
  get instances() { return state.instances; },
  set instances(v: Record<string, FlowPlaterInstance>) { state.instances = v; },
  get groups() { return state.groups; },
  set groups(v: Record<string, FlowPlaterGroup>) { state.groups = v; },
  get length() { return state.length; },
  set length(v: number) { state.length = v; },
  get initialized() { return state.initialized; },
  set initialized(v: boolean) { state.initialized = v; },
  get defaults() { return state.defaults; },
  set defaults(v: { animation: boolean; debug: boolean }) { state.defaults = v; },
  get config() { return state.config; },
  set config(v: FlowPlaterConfig) { state.config = v; },
  get _initTracking() { return state._initTracking; },
  set _initTracking(v: Record<string, number>) { state._initTracking = v; },
} as const;

// Controlled accessors
export function getState() {
  // Shallow copy; nested structures are managed via dedicated APIs (TemplateCache, InstanceManager, GroupManager)
  return { ...state };
}

export function setState(updates: Partial<typeof state>): void {
  Object.assign(state, updates);
}

export function isInitialized(): boolean {
  return state.initialized;
}

export function setInitialized(value: boolean): void {
  state.initialized = value;
}

// Helper functions for state management
export function getInstance(instanceName: string): FlowPlaterInstance | undefined {
  return state.instances[instanceName as keyof typeof state.instances];
}

export function getInstances(): Record<string, FlowPlaterInstance> {
  return state.instances;
}

export function incrementLength(): number {
  return ++state.length;
}

// Helper function for group management
export function getGroup(groupName: string): FlowPlaterGroup | undefined {
  return state.groups[groupName as keyof typeof state.groups];
}

export function getGroups(): Record<string, FlowPlaterGroup> {
  return state.groups;
}
