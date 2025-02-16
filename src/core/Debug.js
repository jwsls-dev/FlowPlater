export const Debug = (function () {
  return {
    level: 3,
    levels: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    },
    debugMode: true,

    log: function (level, ...args) {
      if (!this.debugMode) return;
      if (level <= this.level) {
        const prefix = ["ERROR", "WARN", "INFO", "DEBUG"][level];
        console.log(`FlowPlater [${prefix}]:`, ...args);
      }
    },
  };
})();

// Helper functions
export function log(...args) {
  Debug.log(Debug.levels.INFO, ...args);
}

export function errorLog(...args) {
  Debug.log(Debug.levels.ERROR, ...args);
}

export class FlowPlaterError extends Error {
  constructor(message) {
    super(message);
    this.name = "FlowPlaterError";
  }
}

export class TemplateError extends FlowPlaterError {
  constructor(message) {
    super(message);
    this.name = "TemplateError";
  }
}

export class RenderError extends FlowPlaterError {
  constructor(message) {
    super(message);
    this.name = "RenderError";
  }
}
