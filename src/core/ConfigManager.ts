import { _state } from "./State";
import { Debug } from "./Debug";
import { setCustomTags, customTagList } from "../template";
import { deepMerge } from "../storage";
import { DEFAULTS } from "./DefaultConfig";

import { FlowPlaterConfig } from "../types";

declare const htmx: any;

// Determine debug level based on environment
const isDevEnvironment = DEFAULTS.URL.WEBFLOW_DOMAINS.some(domain => 
  window.location.hostname.endsWith(domain)
) || window.location.hostname.includes(DEFAULTS.URL.LOCALHOST);

const defaultConfig: FlowPlaterConfig = {
  debug: {
    level: isDevEnvironment ? DEFAULTS.DEBUG.DEVELOPMENT_LEVEL : DEFAULTS.DEBUG.LEVEL,
  },
  selectors: {
    fp: DEFAULTS.SELECTORS.FP_ATTRIBUTES,
  },
  templates: {
    cacheSize: DEFAULTS.TEMPLATE.CACHE_SIZE,
    precompile: DEFAULTS.TEMPLATE.PRECOMPILE,
  },
  animation: {
    enabled: DEFAULTS.ANIMATION.ENABLED,
    duration: DEFAULTS.ANIMATION.DURATION,
  },
  htmx: {
    timeout: DEFAULTS.HTMX.TIMEOUT,
    swapStyle: DEFAULTS.HTMX.SWAP_STYLE,
    selfRequestsOnly: DEFAULTS.HTMX.SELF_REQUESTS_ONLY,
    ignoreTitle: DEFAULTS.HTMX.IGNORE_TITLE,
  },
  customTags: customTagList,
  storage: {
    enabled: DEFAULTS.STORAGE.ENABLED,
    ttl: DEFAULTS.STORAGE.TTL,
  },
  performance: {
    batchDomUpdates: DEFAULTS.PERFORMANCE.BATCH_DOM_UPDATES,
    batchingDelay: DEFAULTS.PERFORMANCE.BATCHING_DELAY,
  },
  persistForm: DEFAULTS.FORMS.PERSIST_FORMS,
  allowExecute: DEFAULTS.SECURITY.ALLOW_EXECUTE,
};

/**
 * Normalizes storage configuration to a standard format
 * @param {boolean|number|Object} storageConfig - The storage configuration value
 * @param {Object} defaultStorageConfig - The default storage configuration
 * @returns {Object} Normalized storage configuration
 */
function normalizeStorageConfig(storageConfig: any, defaultStorageConfig: any) {
  if (typeof storageConfig === "boolean") {
    return {
      enabled: storageConfig,
      ttl: defaultStorageConfig.ttl,
    };
  }
  if (typeof storageConfig === "number") {
    if (storageConfig === -1) {
      return {
        enabled: true,
        ttl: -1, // Infinite TTL
      };
    }
    return {
      enabled: storageConfig > 0,
      ttl: storageConfig > 0 ? storageConfig : defaultStorageConfig.ttl,
    };
  }
  // Ensure enabled is boolean and ttl is number
  if (typeof storageConfig === "object" && storageConfig !== null) {
    return {
      enabled: !!storageConfig.enabled,
      ttl:
        typeof storageConfig.ttl === "number"
          ? storageConfig.ttl
          : defaultStorageConfig.ttl,
    };
  }
  return defaultStorageConfig; // Fallback to default if invalid format
}

// Initialize state with default config
_state.config = JSON.parse(JSON.stringify(defaultConfig)) as FlowPlaterConfig;

// Config queue system
let configQueue: Partial<FlowPlaterConfig>[] = [];
let isInitialized = false;

/**
 * Internal function to apply configuration changes
 * @param {Object} newConfig - Configuration options to apply
 */
function applyConfigInternal(newConfig: Partial<FlowPlaterConfig>) {
  if ("storage" in newConfig) {
    newConfig.storage = normalizeStorageConfig(
      newConfig.storage,
      defaultConfig.storage,
    );
  }

  // Use the imported deepMerge utility
  _state.config = deepMerge(
    JSON.parse(JSON.stringify(_state.config)),
    newConfig,
  );

  // --- Apply configuration settings ---

  // Apply debug level
  Debug.level = _state.config.debug.level;

  // Configure HTMX defaults if htmx is available
  if (typeof htmx !== "undefined") {
    htmx.config.timeout = _state.config.htmx.timeout;
    htmx.config.defaultSwapStyle = _state.config.htmx.swapStyle;
    htmx.config.selfRequestsOnly = _state.config.htmx.selfRequestsOnly;
    htmx.config.ignoreTitle = _state.config.htmx.ignoreTitle;
  }

  // Set custom tags if provided in the new config
  if (newConfig.customTags) {
    setCustomTags(newConfig.customTags as { tag: string; replaceWith: string }[]);
  }
}

export const ConfigManager = {
  /**
   * Sets the default configuration without logging
   * @param {Object} defaultConfig - Default configuration to apply
   */
  setDefaultConfig(defaultConfig: FlowPlaterConfig) {
    applyConfigInternal(defaultConfig);
  },

  /**
   * Sets or updates the FlowPlater configuration.
   * Before initialization: queues the config change
   * After initialization: applies immediately and logs
   * @param {Object} newConfig - Configuration options to apply.
   */
  setConfig(newConfig: Partial<FlowPlaterConfig> = {}) {
    if (isInitialized) {
      // Apply immediately and log
      applyConfigInternal(newConfig);
      Debug.info("FlowPlater configuration updated:", this.getConfig());
    } else {
      // Queue for later
      configQueue.push(newConfig);
    }
  },

  /**
   * Submits all queued configuration changes and marks as initialized
   * @internal
   */
  submitQueuedConfig() {
    if (configQueue.length > 0) {
      // Merge all queued configs
      const finalConfig = configQueue.reduce((acc, config) => deepMerge(acc, config), {} as Partial<FlowPlaterConfig>);
      applyConfigInternal(finalConfig);
      Debug.info("FlowPlater configuration updated:", this.getConfig());
      configQueue = [];
    }
    isInitialized = true;
  },

  /**
   * Gets the current configuration.
   * @returns {Object} A deep copy of the current configuration.
   */
  getConfig() {
    // Return a deep copy to prevent accidental modification of the state
    return JSON.parse(JSON.stringify(_state.config));
  },

  /**
   * Gets the default configuration.
   * @returns {Object} A deep copy of the default configuration.
   */
  getDefaultConfig() {
    return JSON.parse(JSON.stringify(defaultConfig));
  },
};

// Apply initial debug level based on the default config loaded into state
Debug.level = _state.config.debug.level;
