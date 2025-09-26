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
  performance: {
    batchDomUpdates: boolean;
    batchingDelay: number; // 0 uses requestAnimationFrame, >0 uses setTimeout with delay
  };
  dom: {
    maxPatchesThreshold: number;
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
  on: (eventName: string, callback: Function) => () => void;
  once: (eventName: string, callback: Function) => () => void;
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
  invalidateHtmlCache: (instanceName?: string) => FlowPlaterObj;
  addTransformer: (transformationType: TransformationType, transformerFn: TransformerFunction | RequestTransformerFunction, transformerName?: string) => FlowPlaterObj;
  removeTransformer: (transformationType: TransformationType, transformerName: string) => boolean;
  clearTransformers: (transformationType?: TransformationType) => FlowPlaterObj;
  listTransformers: (transformationType?: TransformationType) => Record<string, NamedTransformer[]> | NamedTransformer[];
  registerMethod: (type: "global" | "instance" | "group", name: string, fn: Function, override?: boolean) => FlowPlaterObj;
  callGlobal: (name: string, ...args: any[]) => any;
  [key: string]: any;
}

import type { _updateDOM as updateInstanceDOMFn } from "./instance/methods/_updateDOM";
import type { setData as setDataFn } from "./instance/methods/setData";
import type { getData as getDataFn } from "./instance/methods/getData";
import type { get as getFn } from "./instance/methods/get";
import type { getElements as getElementsFn } from "./instance/methods/getElements";
import type { getTemplateElement as getTemplateElementFn } from "./instance/methods/getTemplateElement";
import type { refresh as refreshFn } from "./instance/methods/refresh";
import type { remove as removeFn } from "./instance/methods/remove";
import type { refreshTemplate as refreshTemplateFn } from "./instance/methods/refreshTemplate";
import type { invalidateHtmlCache as invalidateHtmlCacheFn } from "./instance/methods/invalidateHtmlCache";

export interface FlowPlaterInstance {
  instanceName: string;
  templateId: string;
  template: any;
  templateElement: FlowPlaterElement;
  data: ProxyConstructor & Record<string, any>;
  elements: FlowPlaterElement[];
  groupName?: string;
  localVarName?: string;
  cleanup: () => void;
  animate?: boolean;
  refresh: typeof refreshFn;
  refreshTemplate: typeof refreshTemplateFn;
  remove: typeof removeFn;
  get: typeof getFn;
  getData: typeof getDataFn;
  setData: typeof setDataFn;
  getElements: typeof getElementsFn;
  getTemplateElement: typeof getTemplateElementFn;
  _updateDOM: typeof updateInstanceDOMFn;
  _htmxUpdateInProgress?: boolean;
  _updateTimer?: NodeJS.Timeout | null;
  _stateBeforeDebounce?: Record<string, any> | null;
  _observers?: Set<MutationObserver>;
  _isEvaluating?: boolean;
  _lastRenderedOutput?: string;
  _hasPendingUpdate?: boolean;
  invalidateHtmlCache: typeof invalidateHtmlCacheFn;
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

export interface FlowPlaterPluginGroupMethods {
  [methodName: string]: (group: FlowPlaterGroup, ...args: any[]) => any;
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
 * Valid transformation types supported by FlowPlater
 * - "transformRequest": Modify HTMX request event/details before sending.
 *     - Use this to modify the request parameters, headers, or body.
 * - "transformResponse": Modify response payload/text before processing or rendering.
 *     - Use this to modify the response payload/text.
 * - "transformDataBeforeRender": Modify instance/group data prior to template rendering.
 *     - Use this to modify the data before it is rendered in templates.  
 * - "transformCompiledHtml": Modify the compiled HTML string before it is applied to the DOM.
 *     - IMPORTANT: The input is a STRING of HTML, NOT a live DOM tree; return a STRING.
 * (Removed) transformConfirmEvent: Confirmation UI should be handled by apps/plugins directly using htmx:confirm.
 */
export type TransformationType =
  | "transformRequest"
  | "transformResponse"
  | "transformDataBeforeRender"
  | "transformCompiledHtml";

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
  /** Transform compiled HTML string before DOM update (must return a string) */
  transformCompiledHtml: TransformerFunction;
  /** Custom transformer functions */
  [customTransformerName: string]: TransformerFunction | RequestTransformerFunction;
}

export interface FlowPlaterPluginTransformers {
  transformRequest?: (instance: FlowPlaterInstance, evt: any) => any;
  transformResponse?: (instance: FlowPlaterInstance, response: any, dataType: TransformerDataType) => any;
  transformDataBeforeRender?: (instance: FlowPlaterInstance, data: any, dataType: TransformerDataType) => any;
  transformCompiledHtml?: (instance: FlowPlaterInstance, html: string, dataType: TransformerDataType) => string;
}

export interface FlowPlaterPluginHelpers {
  [helperName: string]: (...args: any[]) => any;
}

export interface FlowPlaterPlugin {
  /**
   * Initialize the plugin (runs when FlowPlater registers the plugin)
   */
  init: () => void;
  /**
   * Destroy the plugin (runs when FlowPlater unregisters the plugin)
   */
  destroy?: () => Promise<void>;
  /**
   * Plugin configuration
   */
  config: FlowPlaterPluginConfig;
  /**
   * Plugin state
   */
  state?: FlowPlaterPluginState;
  /**
   * Plugin global methods
   */
  globalMethods?: FlowPlaterPluginGlobalMethods;
  /**
   * Plugin instance methods
   */
  instanceMethods?: FlowPlaterPluginInstanceMethods;
  /**
   * Plugin group methods
   */
  groupMethods?: FlowPlaterPluginGroupMethods;
  /**
   * Plugin hooks
   */
  hooks?: FlowPlaterPluginHooks;
  /**
   * Plugin transformers
   */
  transformers?: FlowPlaterPluginTransformers;
  /**
   * Plugin helpers
   */
  helpers?: FlowPlaterPluginHelpers;
  /**
   * Plugin inheritable attributes
   */
  inheritableAttributes?: string[];
}

// Type-safe window interface for FlowPlater
declare global {
  interface Window {
    FlowPlater?: FlowPlaterObj;
    Handlebars?: typeof Handlebars;
    htmx?: any;
    [key: string]: any;
  }
}

export type FlowPlaterWindow = Window;