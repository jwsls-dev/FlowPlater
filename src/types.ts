declare const htmx: any;
declare const Handlebars: any;

export interface FlowPlaterElement extends HTMLElement {
  _preloadCleanup?: () => void;
  removeEventListeners?: () => void;
}

export interface FlowPlaterGroup {
  name: string;
  data: ProxyConstructor & Record<string, any>;
  elements: FlowPlaterElement[];
  instances: Set<FlowPlaterInstance>;
  addElement(element: FlowPlaterElement): void;
  removeElement(element: FlowPlaterElement): void;
  update(data: Record<string, any>): void;
  refresh(): void;
  destroy(): void;
  getData(): Record<string, any>;
  _isEvaluating: boolean;
  _lastRenderedOutputs: Map<string, any>;
}

export interface FlowPlaterConfig {
  debug: {
    level: number; // 0-3, 0 = error, 1 = warning, 2 = info, 3 = debug
  };
  selectors: {
    fp: string[];
  };
  templates: {
    cacheSize: number;
    precompile: boolean;
  };
  animation: {
    enabled: boolean;
    duration: number;
  };
  htmx: {
    timeout: number;
    swapStyle: string;
    selfRequestsOnly: boolean;
    ignoreTitle: boolean;
  };
  customTags: Record<string, any>;
  storage: {
    enabled: boolean;
    ttl: number; // Time to live in seconds
  };
  persistForm: boolean;
  allowExecute: boolean;
}

export interface ProcessingResult {
  success: boolean;
  errors: Array<{
    phase: string;
    error: string;
    stack?: string;
    processor?: any;
  }>;
  warnings: Array<{
    phase: string;
    message: string;
  }>;
  finalElement: FlowPlaterElement;
}

export interface Processor {
  name: string;
  process: (element: FlowPlaterElement) => FlowPlaterElement;
}

export interface FlowPlaterObj {
  compileTemplate: (templateId: string, recompile?: boolean) => any;
  render: (options: any) => any;
  getInstance: (instanceName: string) => FlowPlaterInstance | undefined;
  getInstances: () => Record<string, FlowPlaterInstance>;
  getOrCreateInstance: (instanceName: string, initialData?: Record<string, any>) => any;
  PluginManager: any;
  getGroup: (groupName: string) => any;
  getOrCreateGroup: (groupName: string, initialData?: Record<string, any>) => any;
  getGroups: () => any;
  updateGroup: (groupName: string, data: Record<string, any>) => any;
  removeGroup: (groupName: string) => void;
  removeAllGroups: () => void;
  log: (level: number, ...args: any[]) => FlowPlaterObj;
  logLevels: any;
  registerPlugin: (plugin: any, config?: Record<string, any>) => any;
  removePlugin: (name: string) => any;
  removeAllPlugins: () => void;
  getPlugin: (name: string) => any;
  getAllPlugins: () => any;
  enablePlugin: (name: string) => any;
  disablePlugin: (name: string) => any;
  pluginConfig: (name: string) => any;
  on: (...args: any[]) => any;
  off: (...args: any[]) => any;
  emit: (...args: any[]) => any;
  debug: (level: number) => FlowPlaterObj;
  templateCache: {
    set: (templateId: string, template: any) => any;
    get: (templateId?: string) => any;
    isCached: (templateId: string) => boolean;
    clear: (templateId?: string) => void;
    size: () => number;
  };
  init: (element?: Document | FlowPlaterElement, options?: { render: boolean }) => FlowPlaterObj;
  ready: (callback: (instance: FlowPlaterObj) => void) => FlowPlaterObj;
  cleanup: (instanceName?: string) => FlowPlaterObj;
  version: string;
  author: string;
  license: string;
  setCustomTags: (tags: any[]) => void;
  config: (newConfig?: Partial<FlowPlaterConfig>) => FlowPlaterObj;
  getConfig: () => FlowPlaterConfig;
  registerTag: (name: string, helperFn: Handlebars.HelperDelegate) => FlowPlaterObj;
  trigger: (name: string, element?: string | FlowPlaterElement | Document, detail?: Record<string, any>) => void;
  destroy: () => void;
  create: (instanceName: string, options?: { refresh: boolean }) => any;
  findAttribute: (element: FlowPlaterElement, attributeName: string) => string | null;
  addTransformer: (transformationType: string, transformerFn: Function) => FlowPlaterObj;
  removeTransformer: (transformationType: string, transformerFn: Function) => boolean;
  clearTransformers: (transformationType?: string) => FlowPlaterObj;
}

export interface FlowPlaterInstance {
  instanceName: string;
  templateId: string;
  template: any;
  data: ProxyConstructor & Record<string, any>;
  elements: FlowPlaterElement[];
  groupName?: string;
  localVarName?: string;
  cleanup: () => void;
  animate?: boolean;
  update(data: Record<string, any>): void;
  refresh(): void;
  refreshTemplate: (templateId: string, recompile?: boolean) => boolean;
  remove: () => void;
  get: (path: string) => any;
  getData(): Record<string, any>;
  setData(data: Record<string, any>): void;
  getElements(): FlowPlaterElement[];
  _updateDOM: () => Promise<void[] | undefined>;
  _htmxUpdateInProgress?: boolean;
  _updateTimer?: NodeJS.Timeout | null;
  _stateBeforeDebounce?: Record<string, any> | null;
  _observers?: Set<MutationObserver>;
  _isEvaluating?: boolean;
  _lastRenderedOutput?: string;
}

export interface FlowPlaterPluginConfig {
  name: string;
  enabled: boolean;
  priority: number;
  version: string;
  dependencies: string[];
  optionalDependencies: string[];
  settings: Record<string, any>;
  description: string;
  author: string;
}

export interface FlowPlaterPluginState {
  initialized: boolean;
  data: Record<string, any>;
}

export interface FlowPlaterPluginGlobalMethods {
  [methodName: string]: (plugin: FlowPlaterPlugin, ...args: any[]) => any;
}

export interface FlowPlaterPluginInstanceMethods {
  [methodName: string]: (instance: FlowPlaterInstance, ...args: any[]) => any;
}

export interface FlowPlaterPluginHooks {
  beforeRequest?: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
  afterRequest?: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
  beforeSwap?: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
  afterSwap?: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
  beforeDomUpdate?: (instance: FlowPlaterInstance, context: {
    element: HTMLElement;
    newHTML: string;
    animate: boolean;
    formStates: Record<string, any> | null;
  }) => FlowPlaterInstance;
  afterDomUpdate?: (instance: FlowPlaterInstance, context: {
    element: HTMLElement;
    newHTML: string;
    animate: boolean;
    formStates: Record<string, any> | null;
  }) => FlowPlaterInstance;
  newInstance?: (instance: FlowPlaterInstance) => FlowPlaterInstance;
  updateForm?: (instance: FlowPlaterInstance, form: {
    element: HTMLElement;
    id: string;
    data: Record<string, any>;
    changedElement: HTMLElement;
  }) => FlowPlaterInstance;
  updateData?: (instance: FlowPlaterInstance, data: {
    data: Record<string, any>;
    changes?: Record<string, any>;
    source: string;
  }) => FlowPlaterInstance;
  initComplete?: (flowplater: any, instances: FlowPlaterInstance[]) => any;
  afterSettle?: (instance: FlowPlaterInstance, evt: any) => FlowPlaterInstance;
  destroy?: (instance: FlowPlaterInstance) => FlowPlaterInstance;
}

export interface FlowPlaterPluginTransformers {
  transformRequest?: (instance: FlowPlaterInstance, evt: any) => any;
  transformResponse?: (instance: FlowPlaterInstance, response: any, dataType: string) => any;
  transformDataBeforeRender?: (instance: FlowPlaterInstance, data: any, dataType: string) => any;
}

export interface FlowPlaterPluginHelpers {
  [helperName: string]: (...args: any[]) => any;
}

export interface FlowPlaterPlugin {
  init: () => void;
  destroy?: () => Promise<void>;
  config: FlowPlaterPluginConfig;
  state?: FlowPlaterPluginState;
  globalMethods?: FlowPlaterPluginGlobalMethods;
  instanceMethods?: FlowPlaterPluginInstanceMethods;
  hooks?: FlowPlaterPluginHooks;
  transformers?: FlowPlaterPluginTransformers;
  helpers?: FlowPlaterPluginHelpers;
  inheritableAttributes?: string[];
}