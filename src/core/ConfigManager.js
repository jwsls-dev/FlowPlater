import { _state } from "./State";
import { Debug } from "./Debug";
import { setCustomTags, customTagList } from "./ReplaceCustomTags";
import { deepMerge } from "../utils/DeepMerge";

const defaultConfig = {
  debug: {
    level:
      window.location.hostname.endsWith(".webflow.io") ||
      window.location.hostname.endsWith(".canvas.webflow.com") ||
      window.location.hostname.endsWith("localhost")
        ? 3
        : 1,
  },
  selectors: {
    fp: [
      "template",
      "get",
      "post",
      "put",
      "delete",
      "patch",
      "persist",
      "instance",
    ],
  },
  templates: {
    cacheSize: 100,
    precompile: true,
  },
  animation: {
    enabled: true,
    duration: 300,
  },
  htmx: {
    timeout: 10000,
    swapStyle: "innerHTML",
    selfRequestsOnly: false,
    ignoreTitle: true,
  },
  customTags: customTagList,
  storage: {
    enabled: false,
    ttl: 30 * 24 * 60 * 60, // 30 days in seconds
  },
  persistForm: true,
};

/**
 * Normalizes storage configuration to a standard format
 * @param {boolean|number|Object} storageConfig - The storage configuration value
 * @param {Object} defaultStorageConfig - The default storage configuration
 * @returns {Object} Normalized storage configuration
 */
function normalizeStorageConfig(storageConfig, defaultStorageConfig) {
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
_state.config = JSON.parse(JSON.stringify(defaultConfig));

export const ConfigManager = {
  /**
   * Sets or updates the FlowPlater configuration.
   * @param {Object} newConfig - Configuration options to apply.
   */
  setConfig(newConfig = {}) {
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
      setCustomTags(newConfig.customTags);
    }

    Debug.info("FlowPlater configuration updated:", this.getConfig());
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
