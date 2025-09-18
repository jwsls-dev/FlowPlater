/**
 * Centralized default configuration values for FlowPlater
 * This file consolidates all scattered default values to improve maintainability
 */

// Core FlowPlater defaults
export const DEFAULTS = {
  // Template system
  TEMPLATE: {
    CACHE_SIZE: 100,
    PRECOMPILE: true,
    ANONYMOUS_INSTANCE_NAME: "anonymous",
    SELF_TEMPLATE_ID: "self",
  },
  
  // Animation settings  
  ANIMATION: {
    ENABLED: true,
    DURATION: 300,
  },
  
  // Debug and logging
  DEBUG: {
    LEVEL: 1, // Production default
    DEVELOPMENT_LEVEL: 3, // Development/localhost default
  },
  
  // HTMX integration
  HTMX: {
    TIMEOUT: 10000,
    SWAP_STYLE: "innerHTML",
    SELF_REQUESTS_ONLY: false,
    IGNORE_TITLE: true,
    DEFAULT_TRIGGER: "mouseover", // For preload
    SWAP_DELAY: 0,
    SETTLE_DELAY: 0,
    TRANSITION: false,
  },
  
  // Storage configuration
  STORAGE: {
    ENABLED: false,
    TTL: 30 * 24 * 60 * 60, // 30 days in seconds
    INFINITE_TTL: -1,
  },
  
  // Performance settings
  PERFORMANCE: {
    BATCH_DOM_UPDATES: true,
    BATCHING_DELAY: 0, // 0 uses requestAnimationFrame
    DEBOUNCE_DELAY: 0,
  },
  
  // Form handling
  FORMS: {
    PERSIST_FORMS: true,
    DEFAULT_SOURCE: "unknown",
    TRIGGER_EVENTS: "change",
    EXCLUDED_INPUT_TYPES: ["file"],
    CHECKBOX_RADIO_TYPES: ["checkbox", "radio"],
    TEXT_INPUT_TYPES: ["text"],
    FORM_INPUT_TYPES: ["INPUT", "SELECT", "TEXTAREA"],
  },
  
  // Plugin system
  PLUGINS: {
    DEFAULT_PRIORITY: 0,
    DEFAULT_VERSION: "1.0.0",
    DEBUG: false,
  },
  
  // Cart plugin defaults
  CART: {
    ENABLED: true,
    PRIORITY: 50,
    DATA_ATTRIBUTE: "product",
    GROUP_NAME: "cart",
    REQUIRED_KEYS: ["id", "name"],
    CURRENCY: {
      NAME: "USD",
      SYMBOL: "$",
      PRECISION: 2,
      SEPARATOR: ",",
      DECIMAL: ".",
    },
    TAX_RATES: [{ name: "VAT", value: 1.21 }],
    LOCALE: "en-US",
    STOCK: {
      INFINITE: Infinity,
      MIN_AMOUNT: 0,
    },
  },
  
  // Filter plugin defaults
  FILTER: {
    ENABLED: true,
    PRIORITY: 0,
    DEFAULT_SELECT_OPTION: "Select tags...",
    PRESERVE_DEFAULT: false,
  },
  
  // Data extractor defaults
  DATA_EXTRACTOR: {
    VALUE_SOURCES: {
      ATTRIBUTE: "attribute",
      TEXT: "text",
    },
  },
  
  // Proxy plugin defaults
  PROXY: {
    DEFAULT_URL: "",
  },
  
  // Math plugin defaults
  MATH: {
    OPERATORS: {
      ADD: "+",
      SUBTRACT: "-",
      MULTIPLY: "*",
      DIVIDE: "/",
    },
  },
  
  // DOM and Virtual DOM
  DOM: {
    UPDATE_COUNTER_INITIAL: 0,
    UNKNOWN_ELEMENT_ID: "unknown",
    INTEGRITY_CHECK_ENABLED: true, // Enable post-update DOM integrity verification
    VOID_ELEMENTS: [
      'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
      'link', 'meta', 'param', 'source', 'track', 'wbr'
    ],
    SVG_NAMESPACE: 'http://www.w3.org/2000/svg',
    SVG_ELEMENTS: [
      'svg', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'rect', 'path',
      'g', 'text', 'tspan', 'defs', 'use', 'symbol', 'marker', 'clipPath',
      'mask', 'pattern', 'image', 'foreignObject'
    ],
    WEBFLOW_CLASSES: [
      'w-checkbox', 'w-radio', 'w-checkbox-input', 'w-radio-input',
      'w-form', 'w-input', 'w-select', 'w-textarea'
    ],
    SIMILARITY_THRESHOLD: 0.5, // For text similarity comparison
    LENGTH_RATIO_THRESHOLD: 0.5, // For content length comparison
    MAX_PATCHES_THRESHOLD: 2000, // Above this, prefer full innerHTML update
  },
  
  // Instance management
  INSTANCES: {
    DUPLICATE_INIT_WINDOW: 100, // ms window to prevent duplicate initialization
  },
  
  // Event system
  EVENTS: {
    HTTP_METHODS: ["get", "post", "put", "patch", "delete"],
    HTTP_TRIGGER_ATTRIBUTES: ["trigger", "boost", "ws", "sse"],
  },
  
  // Helper defaults
  HELPERS: {
    EACH: {
      START_AT: 0,
      SORT_KEY: "",
      DESCENDING: false,
      SORT_BEFORE_LIMIT: true,
    },
    COMPARISON: {
      DEFAULT_OPERATOR: "==",
    },
  },
  
  // Content types
  CONTENT_TYPES: {
    UNKNOWN: "unknown",
    JSON: "json",
    HTML: "html",
    XML: "xml",
  },
  
  // Error handling
  ERRORS: {
    XML_PARSER_ERROR: "Unknown parser error",
  },
  
  // URL and routing
  URL: {
    WEBFLOW_DOMAINS: [".webflow.io", ".canvas.webflow.com"],
    LOCALHOST: "localhost",
  },
  
  // Element selectors and attributes
  SELECTORS: {
    FP_ATTRIBUTES: [
      "template", "get", "post", "put", "delete", "patch", 
      "persist", "instance", "data", "local", "group",
      "target", "swap", "trigger", "dynamic"
    ],
    TEMPLATE_ELEMENTS: ["template", "fptemplate"],
    EXTENSION_ATTRIBUTE: "hx-ext",
  },
  
  // Security
  SECURITY: {
    ALLOW_EXECUTE: true,
    FORBIDDEN_REGISTRATIONS: new Set([
      "if", "unless", "each", "with", "lookup", "log", "blockHelperMissing", "helperMissing"
    ]),
  },
};

/**
 * Helper function to get nested default values safely
 * @param path - Dot notation path to the default value
 * @returns The default value or undefined if not found
 */
export function getDefault(path: string): any {
  return path.split('.').reduce((obj, key) => obj?.[key], DEFAULTS as any);
}

/**
 * Helper function to check if a value should use a default
 * @param value - The value to check
 * @param defaultValue - The default value to use
 * @returns The original value or the default if value is null/undefined
 */
export function withDefault<T>(value: T | null | undefined, defaultValue: T): T {
  return value ?? defaultValue;
}

/**
 * Helper function to get a configuration value with fallback to default
 * @param configValue - The configuration value
 * @param defaultPath - Path to the default value in DEFAULTS
 * @returns The config value or the default
 */
export function getConfigWithDefault(configValue: any, defaultPath: string): any {
  return withDefault(configValue, getDefault(defaultPath));
} 