export const Debug = (function () {
  return {
    level: 1,
    levels: {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3,
    },

    log: function (level: number, ...args: any[]) {
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

    error: function (...args: any[]) {
      this.log(this.levels.ERROR, ...args);
    },

    warn: function (...args: any[]) {
      this.log(this.levels.WARN, ...args);
    },

    info: function (...args: any[]) {
      this.log(this.levels.INFO, ...args);
    },

    debug: function (...args: any[]) {
      this.log(this.levels.DEBUG, ...args);
    },
  };
})();

export class FlowPlaterError extends Error {
  constructor(message: string, stack?: string | undefined) {
    super(message);
    this.name = "FlowPlaterError";
    if (stack !== undefined) {
    this.stack = stack;
    }
  }
}

export class TemplateError extends FlowPlaterError {
  constructor(message: string, templateId?: string | undefined) {
    super(`Template Error${templateId !== undefined ? ` in ${templateId}` : ''}: ${message}`);
    this.name = "TemplateError";
  }
}

export class RenderError extends FlowPlaterError {
  constructor(message: string, stack: string | undefined) {
    super(message, stack);
    this.name = "RenderError";
    this.stack = stack;
  }
}
