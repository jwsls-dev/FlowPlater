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

/**
 * Options for the render method
 */
export interface RenderOptions {
  template: string;
  data: any;
  target: FlowPlaterElement | string;
  returnHtml?: boolean;
  instanceName?: string;
  animate?: boolean;
  recompile?: boolean;
  skipLocalStorageLoad?: boolean;
  skipRender?: boolean;
  isStoredDataRender?: boolean;
}

/**
 * Debug log levels
 */
export interface LogLevels {
  ERROR: number;
  WARN: number;
  INFO: number;
  DEBUG: number;
}

export interface FlowPlaterObj {
  VERSION: string;
  AUTHOR: string;
  LICENSE: string;
  compileTemplate: (templateId: string, recompile?: boolean) => Handlebars.TemplateDelegate | null;
  render: (options: RenderOptions) => FlowPlaterInstance | string | null;
  getInstance: (instanceName: string) => FlowPlaterInstance | undefined;
  getInstances: () => Record<string, FlowPlaterInstance>;
  getOrCreateInstance: (instanceName: string, initialData?: Record<string, any>) => FlowPlaterInstance | null;
  getGroup: (groupName: string) => FlowPlaterGroup | null;
  getOrCreateGroup: (groupName: string, initialData?: Record<string, any>) => FlowPlaterGroup;
  getGroups: () => Record<string, FlowPlaterGroup>;
  updateGroup: (groupName: string, data: Record<string, any>) => FlowPlaterGroup | null;
  removeGroup: (groupName: string) => void;
  removeAllGroups: () => void;
  log: (level: number, ...args: any[]) => FlowPlaterObj;
  logLevels: LogLevels;
  registerPlugin: (plugin: FlowPlaterPlugin | string | Function, config?: Record<string, any>) => FlowPlaterPlugin;
  removePlugin: (name: string) => boolean;
  removeAllPlugins: () => void;
  getPlugin: (name: string) => FlowPlaterPlugin | undefined;
  getAllPlugins: () => FlowPlaterPlugin[];
  enablePlugin: (name: string) => boolean;
  disablePlugin: (name: string) => boolean;
  pluginConfig: (name: string) => FlowPlaterPluginConfig | null;
  on: (eventName: string, callback: Function) => void;
  off: (eventName: string, callback: Function) => void;
  emit: (eventName: string, ...args: any[]) => void;
  debug: (level: number) => FlowPlaterObj;
  templateCache: {
    set: (templateId: string, template: Handlebars.TemplateDelegate) => Handlebars.TemplateDelegate;
    get: (templateId?: string) => Handlebars.TemplateDelegate | Record<string, Handlebars.TemplateDelegate> | undefined;
    isCached: (templateId: string) => boolean;
    clear: (templateId?: string) => void;
    size: () => number;
  };
  init: (element?: Document | FlowPlaterElement, options?: { render: boolean }) => FlowPlaterObj;
  ready: (callback: (instance: FlowPlaterObj) => void) => FlowPlaterObj;
  cleanup: (instanceName?: string) => FlowPlaterObj;
  setCustomTags: (tags: any[]) => void;
  config: (newConfig?: Partial<FlowPlaterConfig>) => FlowPlaterObj;
  getConfig: () => FlowPlaterConfig;
  registerTag: (name: string, helperFn: Handlebars.HelperDelegate) => FlowPlaterObj;
  trigger: (name: string, element?: string | FlowPlaterElement | Document, detail?: Record<string, any>) => void;
  destroy: () => void;
  create: (instanceName: string, options?: { refresh: boolean }) => FlowPlaterInstance;
  findAttribute: (element: FlowPlaterElement, attributeName: string) => string | null;
  addTransformer: (transformationType: string, transformerFn: TransformerFunction | RequestTransformerFunction, transformerName?: string) => FlowPlaterObj;
  removeTransformer: (transformationType: string, transformerName: string) => boolean;
  clearTransformers: (transformationType?: string) => FlowPlaterObj;
  listTransformers: (transformationType?: string) => Record<string, NamedTransformer[]> | NamedTransformer[];
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

/**
 * Valid data types for transformer functions
 */
export type TransformerDataType = "json" | "html" | "xml";

/**
 * Standard transformer function signature
 * @param instance - The FlowPlater instance that triggered the transformation
 * @param data - The data to transform
 * @param dataType - The type of data being transformed ('json', 'html', or 'xml')
 * @returns The transformed data
 */
export type TransformerFunction = (instance: FlowPlaterInstance, data: any, dataType: TransformerDataType) => any;

/**
 * Request transformer function signature (for transformRequest)
 * @param instance - The FlowPlater instance making the request
 * @param evt - The HTMX event object containing request details
 * @returns The transformed event object
 */
export type RequestTransformerFunction = (instance: FlowPlaterInstance, evt: any) => any;

/**
 * Named transformer entry
 */
export interface NamedTransformer {
  name: string;
  fn: TransformerFunction | RequestTransformerFunction;
}

/**
 * Collection of transformer function types based on actual transformer implementations
 */
export interface TransformerFunctions {
  /** Transform HTMX requests before they are sent */
  transformRequest: RequestTransformerFunction;
  /** Transform HTMX responses after they are received */
  transformResponse: TransformerFunction;
  /** Transform data before it's rendered in templates */
  transformDataBeforeRender: TransformerFunction;
  /** Custom transformer functions */
  [customTransformerName: string]: TransformerFunction | RequestTransformerFunction;
}

export interface FlowPlaterPluginTransformers {
  transformRequest?: (instance: FlowPlaterInstance, evt: any) => any;
  transformResponse?: (instance: FlowPlaterInstance, response: any, dataType: TransformerDataType) => any;
  transformDataBeforeRender?: (instance: FlowPlaterInstance, data: any, dataType: TransformerDataType) => any;
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