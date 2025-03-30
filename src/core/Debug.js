export const Debug = (function () {
  return {
    level: 1,
    levels: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    },

    log: function (level, ...args) {
      if (level <= this.level) {
        const prefix = ["ERROR", "WARN", "INFO", "DEBUG"][level];
        switch (prefix) {
          case "ERROR":
            console.error(`FlowPlater [${prefix}]:`, ...args);
            break;
          case "WARN":
            console.warn(`FlowPlater [${prefix}]:`, ...args);
            break;
          case "DEBUG":
            console.debug(`FlowPlater [${prefix}]:`, ...args);
            break;
          default:
            console.log(`FlowPlater [${prefix}]:`, ...args);
        }
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
  constructor(message, stack) {
    super(message);
    this.name = "FlowPlaterError";
    this.stack = stack;
  }
}

export class TemplateError extends FlowPlaterError {
  constructor(message, stack) {
    super(message);
    this.name = "TemplateError";
    this.stack = stack;
  }
}

export class RenderError extends FlowPlaterError {
  constructor(message, stack) {
    super(message);
    this.name = "RenderError";
    this.stack = stack;
  }
}
