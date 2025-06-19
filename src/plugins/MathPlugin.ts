import { FlowPlaterInstance, FlowPlaterObj, FlowPlaterPlugin } from "../types";
import { TemplateError, Debug } from "../core/Debug";

declare const FlowPlater: FlowPlaterObj;

/**
 * JSCalc - JavaScript Calculator Expression Evaluator
 * Supports arithmetic operations, functions, and mathematical constants
 */
function* Lexer(expr: string) {
  var _regex = new RegExp(Lexer.lang, "g");
  var x;
  while ((x = _regex.exec(expr)) !== null) {
    var [token] = x;
    for (var category in Lexer.categories) {
      if (new RegExp(Lexer.categories[category as keyof typeof Lexer.categories]).test(token)) {
        yield { token, category };
        break;
      }
    }
  }
}

Lexer.categories = {
  op: "[+*/^]|-(?!\\d)",
  num: "-?\\d+(?:\\.\\d+)?%?",
  group: "[\\[()\\]]",
  sep: ",",
  ident: "\\b(ans|pi|e)\\b",
  func: "\\b(sqrt|abs|log|ln|sin|cos|tan|min|max)\\b",
};

Lexer.lang = [
  Lexer.categories.op,
  Lexer.categories.num,
  Lexer.categories.group,
  Lexer.categories.sep,
  Lexer.categories.ident,
  Lexer.categories.func,
].join("|");

Lexer.cat = {
  INT: "num",
  IDENT: "ident",
  PCNT: "num",
  FUNC: "func",
  SEP: "sep",
};

class Calc {
  static ans: number;
  stack: any[];
  w: any;
  l: any;

  constructor() {
    this.stack = [];
    this.w = null;
    this.l = null;
  }

  _next() {
    const next = this.l.next();
    if (next.done) {
      return null;
    }
    return next.value;
  }

  exec(expr: string) {
    try {
      this.l = Lexer(expr);
      this.w = this._next();

      if (!this.e()) {
        throw new SyntaxError(
          this.w ? this.w.token : "Unexpected end of expression",
        );
      }

      if (this.w !== null) {
        throw new SyntaxError(`Unexpected token: ${this.w.token}`);
      }

      return (Calc.ans = this.stack.pop() as number);
    } catch (error: any) {
      Debug.error("Error in expression evaluation:", error);
      throw error;
    }
  }

  _istok(o: string) {
    return this.w && o === this.w.token;
  }

  z() {
    if (this._wrapped_expr(this._rep_val, "abs", "|", "|")) {
      return true;
    } else if (
      this.w &&
      ["INT", "IDENT", "PCNT"].some((k) => Lexer.cat[k as keyof typeof Lexer.cat] === this.w.category)
    ) {
      this.stack.push(Calc._val(this.w));
      this.w = this._next();
      return true;
    } else if (this.w && this.w.category === Lexer.cat.FUNC) {
      var fn = this.w.token;
      this.w = this._next();
      if (fn === "min" || fn === "max") {
        return this._wrapped_expr_min_max(this._rep_val, fn);
      } else {
        return this._wrapped_expr(this._rep_val, fn);
      }
    } else if (this._wrapped_expr(this._rep_val, "abs", "|", "|")) {
      return true;
    }
    return false;
  }

  _wrapped_expr_min_max(cb: Function, arg: any, a = "(", b = ")") {
    if (this.w && this.w.token === a) {
      this.w = this._next();
      let args = [];
      while (this.w !== null) {
        if (this.e()) {
          args.push(this.stack.pop());
          if (this.w && this.w.category === "sep") {
            this.w = this._next();
            continue;
          }
        }
        break;
      }
      if (this.w && this.w.token === b) {
        this.w = this._next();
        if (cb instanceof Function) {
          cb.call(this, arg, args);
        }
        return true;
      }
    }
    return false;
  }

  _lrecmut(nt: Function, pfn: Function) {
    return nt.call(this) && pfn.call(this);
  }

  _ophit(ops: string[], nt: Function, pfn: Function, follow: string[]) {
    if (this.w && ops.some((op) => op === this.w.token)) {
      var op = this.w.token;
      var a = this.stack.pop();
      this.w = this._next();
      if (nt.call(this)) {
        var b = this.stack.pop();
        this.stack.push(Calc._chooseOp(op)(a, b));
        return pfn.call(this);
      }
    } else if (!this.w || follow.some((op) => op === this.w.token)) {
      return true;
    }
    return false;
  }

  e() {
    if (!this.t()) return false;
    while (this.w && (this.w.token === "+" || this.w.token === "-")) {
      const op = this.w.token;
      this.w = this._next();
      if (!this.t()) return false;
      const right = this.stack.pop();
      const left = this.stack.pop();
      this.stack.push(Calc._chooseOp(op)(left, right));
    }
    return true;
  }

  t() {
    let result = this.f();
    while (this.w && (this.w.token === "*" || this.w.token === "/")) {
      const op = this.w.token;
      this.w = this._next();
      if (!this.f()) return false;
      const right = this.stack.pop();
      const left = this.stack.pop();
      this.stack.push(Calc._chooseOp(op)(left, right));
    }
    return result;
  }

  f() {
    if (this.w && this.w.token === "-") {
      this.w = this._next();
      if (!this.z()) return false;
      const val = this.stack.pop();
      this.stack.push(-val);
      return true;
    }
    return this.z();
  }

  ep() {
    return this._ophit(["+", "-"], this.p, this.ep, [")", "|", ","]);
  }

  p() {
    return this._lrecmut(this.x, this.pp);
  }

  pp() {
    return this._ophit(["*", "/"], this.x, this.pp, ["+", "-", ")", "|", ","]);
  }

  x() {
    return this._lrecmut(this.z, this.xp);
  }

  xp() {
    return this._ophit(["^"], this.z, this.xp, [
      "*",
      "/",
      "+",
      "-",
      ")",
      "|",
      ",",
    ]);
  }

  _wrapped_expr(cb: Function, arg: any, a = "(", b = ")") {
    if (!this.w) {
      return false;
    }

    if (this.w.token === a) {
      this.w = this._next();
      if (this.e()) {
        if (this.w && this.w.token === b) {
          this.w = this._next();
          if (cb instanceof Function) cb.call(this, arg);
          return true;
        }
      }
    }
    return false;
  }

  _rep_val(fn: string, args: any[]) {
    if (args) {
      // For min/max functions with multiple arguments
      this.stack.push(Calc._chooseFn(fn).apply(null, args));
    } else {
      // For single argument functions
      const value = this.stack.pop();
      if (value === undefined) {
        throw new Error(`Function ${fn} requires an argument`);
      }
      this.stack.push(Calc._chooseFn(fn)(value));
    }
  }

  static _chooseFn(fn: string) {
    switch (fn) {
      case "sqrt":
        return Math.sqrt;
      case "log":
        return Math.log10;
      case "ln":
        return Math.log;
      case "abs":
        return Math.abs;
      case "min":
        return Math.min;
      case "max":
        return Math.max;
      case "sin":
        return Math.sin;
      case "cos":
        return Math.cos;
      case "tan":
        return Math.tan;
      default:
        throw new Error(`Unknown function: ${fn}`);
    }
  }

  static _val(w: any) {
    var n;
    if (w.category === Lexer.cat.INT || w.category === Lexer.cat.PCNT) {
      n = parseFloat(w.token);
      if (w.token.endsWith("%")) n /= 100;
    } else if (w.category === Lexer.cat.IDENT) {
      if (w.token === "pi") {
        n = Math.PI;
      } else if (w.token === "e") {
        n = Math.E;
      } else if (w.token === "ans") {
        n = this.ans;
      }
    }
    return n;
  }

  static _chooseOp(op: string) {
    switch (op) {
      case "+":
        return (a: number, b: number) => a + b;
      case "-":
        return (a: number, b: number) => a - b;
      case "*":
        return (a: number, b: number) => a * b;
      case "/":
        return (a: number, b: number) => a / b;
      case "^":
        return (a: number, b: number) => Math.pow(a, b);
      default:
        throw new Error(`Unknown operator: ${op}`);
    }
  }
}
Calc.ans = 0;

/**
 * @module MathPlugin
 * @description Math plugin that provides mathematical expression evaluation capabilities
 */

/**
 * Math plugin for FlowPlater providing mathematical expression evaluation through the math helper
 * 
 * @function MathPlugin
 * @returns {Object} Plugin object containing math calculation functionality
 */
const MathPlugin = (customConfig = {}) => {
  /**
   * Plugin configuration object
   */
  const config = {
    name: "math",
    enabled: true,
    priority: 100, // Higher priority since other plugins might depend on math helpers
    version: "1.0.0",
    dependencies: [],
    optionalDependencies: [],
    settings: {
      debug: false,
    },
    description: "Provides mathematical expression evaluation capabilities through the math helper",
    author: "FlowPlater Team",
  };

  // Merge custom config with default config
  Object.assign(config, customConfig);

  /**
   * Plugin state object
   */
  let state = {
    initialized: false,
    data: {},
  };

  /**
   * Global methods that can be called from FlowPlater
   */
  const globalMethods = {
    /**
     * Evaluate a mathematical expression directly
     * @param {Object} plugin - The plugin instance
     * @param {string} expression - The mathematical expression to evaluate
     * @returns {number} The result of the evaluation
     */
    evaluateExpression(_plugin: FlowPlaterPlugin, expression: string) {
      try {
        const c = new Calc();
        return c.exec(expression);
      } catch (error: any) {
        Debug.error("Error evaluating math expression:", error);
        throw error;
      }
    },
  };

  /**
   * Instance methods that can be called from instances
   */
  const instanceMethods = {};

  /**
   * Plugin hooks
   */
  const hooks = {
    /**
     * Called after FlowPlater has fully initialized
     */
    initComplete: function (flowplater: FlowPlaterObj, _instances: FlowPlaterInstance[]) {
      if (config.enabled) {
        Debug.debug(`${config.name} plugin initialized successfully`);
      }
      return flowplater;
    },
  };

  /**
   * Transformers
   */
  const transformers = {};

  /**
   * Custom Handlebars helpers
   */
  const helpers = {
    /**
     * Math helper that evaluates mathematical expressions
     * Supports variables, functions (min, max, sqrt, abs, log, ln, sin, cos, tan), and constants (pi, e)
     * 
     * Usage examples:
     * {{math "2 + 3 * 4"}} -> 14
     * {{math "sqrt(16) + 2"}} -> 6
     * {{math "max(price, 10)"}} -> uses the 'price' variable from context
     * {{math "@{forced.variable} + 5"}} -> forces variable resolution with @{} syntax
     * 
     * @param {string} expression - The mathematical expression to evaluate
     * @param {Object} options - Handlebars options object containing context data
     * @returns {number} The result of the mathematical evaluation
     */
    math: function (this: any, expression: string, options: any) {
      // First, identify and protect function names
      const functionNames = [
        "min",
        "max",
        "sqrt",
        "abs",
        "log",
        "ln",
        "sin",
        "cos",
        "tan",
      ];

      // First pass: resolve forced variable references like @{max}
      const resolvedForced = expression.replace(
        /@{([^}]+)}/g,
        // @ts-ignore
        (match: string, varPath: string) => {
          try {
            let value;
            if (varPath.includes(".")) {
              value = varPath
                .split(".")
                .reduce((acc, part) => acc[part], options.data.root);
            } else {
              value = options.data.root[varPath] || options.hash[varPath];
            }
            return value;
          } catch (error) {
            console.warn(`Could not resolve ${varPath}`);
            return NaN;
          }
        },
      );

      // Second pass: normal variable resolution with function name protection
      const resolvedExpression = resolvedForced.replace(
        /[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*/g,
        (match: string) => {
          // Skip if it's a standalone function name (not part of a property path)
          if (functionNames.includes(match) && !match.includes(".")) {
            return match;
          }

          try {
            // Resolve context paths like 'this.data' or 'object.sum'
            let value;
            if (match.includes(".")) {
              value = match
                .split(".")
                .reduce((acc: any, part: any) => acc[part], options.data.root);
            } else {
              value = options.data.root[match] || options.hash[match];
            }
            return value;
          } catch (error) {
            console.warn(`Could not resolve ${match}`);
            return NaN;
          }
        },
      );

      Debug.debug("Evaluating expression:", resolvedExpression);

      try {
        // Evaluate the expression using jscalc
        const c = new Calc();
        const result = c.exec(resolvedExpression);
        return result;
      } catch (error: any) {
        // Only log and throw once
        if (!(error instanceof TemplateError)) {
          throw new TemplateError(
            `Error evaluating expression: ${error.message}`,
            error.stack,
          );
        }
        throw error; // Re-throw TemplateErrors without wrapping
      }
    },
  };

  /**
   * Return the plugin object
   */
  return {
    config,
    state,
    globalMethods,
    instanceMethods,
    hooks,
    transformers,
    helpers,
  };
};

export default MathPlugin; 