var MathPlugin = (function () {
    'use strict';

    const Debug = (function () {
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
            error: function (...args) {
                this.log(this.levels.ERROR, ...args);
            },
            warn: function (...args) {
                this.log(this.levels.WARN, ...args);
            },
            info: function (...args) {
                this.log(this.levels.INFO, ...args);
            },
            debug: function (...args) {
                this.log(this.levels.DEBUG, ...args);
            },
        };
    })();
    class FlowPlaterError extends Error {
        constructor(message, stack) {
            super(message);
            this.name = "FlowPlaterError";
            if (stack !== undefined) {
                this.stack = stack;
            }
        }
    }
    class TemplateError extends FlowPlaterError {
        constructor(message, templateId) {
            super(`Template Error${templateId !== undefined ? ` in ${templateId}` : ''}: ${message}`);
            this.name = "TemplateError";
        }
    }

    function* Lexer(expr) {
        var _regex = new RegExp(Lexer.lang, "g");
        var x;
        while ((x = _regex.exec(expr)) !== null) {
            var [token] = x;
            for (var category in Lexer.categories) {
                if (new RegExp(Lexer.categories[category]).test(token)) {
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
        constructor() {
            Object.defineProperty(this, "stack", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "w", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "l", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
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
        exec(expr) {
            try {
                this.l = Lexer(expr);
                this.w = this._next();
                if (!this.e()) {
                    throw new SyntaxError(this.w ? this.w.token : "Unexpected end of expression");
                }
                if (this.w !== null) {
                    throw new SyntaxError(`Unexpected token: ${this.w.token}`);
                }
                return (Calc.ans = this.stack.pop());
            }
            catch (error) {
                Debug.error("Error in expression evaluation:", error);
                throw error;
            }
        }
        _istok(o) {
            return this.w && o === this.w.token;
        }
        z() {
            if (this._wrapped_expr(this._rep_val, "abs", "|", "|")) {
                return true;
            }
            else if (this.w &&
                ["INT", "IDENT", "PCNT"].some((k) => Lexer.cat[k] === this.w.category)) {
                this.stack.push(Calc._val(this.w));
                this.w = this._next();
                return true;
            }
            else if (this.w && this.w.category === Lexer.cat.FUNC) {
                var fn = this.w.token;
                this.w = this._next();
                if (fn === "min" || fn === "max") {
                    return this._wrapped_expr_min_max(this._rep_val, fn);
                }
                else {
                    return this._wrapped_expr(this._rep_val, fn);
                }
            }
            else if (this._wrapped_expr(this._rep_val, "abs", "|", "|")) {
                return true;
            }
            return false;
        }
        _wrapped_expr_min_max(cb, arg, a = "(", b = ")") {
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
        _lrecmut(nt, pfn) {
            return nt.call(this) && pfn.call(this);
        }
        _ophit(ops, nt, pfn, follow) {
            if (this.w && ops.some((op) => op === this.w.token)) {
                var op = this.w.token;
                var a = this.stack.pop();
                this.w = this._next();
                if (nt.call(this)) {
                    var b = this.stack.pop();
                    this.stack.push(Calc._chooseOp(op)(a, b));
                    return pfn.call(this);
                }
            }
            else if (!this.w || follow.some((op) => op === this.w.token)) {
                return true;
            }
            return false;
        }
        e() {
            if (!this.t())
                return false;
            while (this.w && (this.w.token === "+" || this.w.token === "-")) {
                const op = this.w.token;
                this.w = this._next();
                if (!this.t())
                    return false;
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
                if (!this.f())
                    return false;
                const right = this.stack.pop();
                const left = this.stack.pop();
                this.stack.push(Calc._chooseOp(op)(left, right));
            }
            return result;
        }
        f() {
            if (this.w && this.w.token === "-") {
                this.w = this._next();
                if (!this.z())
                    return false;
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
        _wrapped_expr(cb, arg, a = "(", b = ")") {
            if (!this.w) {
                return false;
            }
            if (this.w.token === a) {
                this.w = this._next();
                if (this.e()) {
                    if (this.w && this.w.token === b) {
                        this.w = this._next();
                        if (cb instanceof Function)
                            cb.call(this, arg);
                        return true;
                    }
                }
            }
            return false;
        }
        _rep_val(fn, args) {
            if (args) {
                this.stack.push(Calc._chooseFn(fn).apply(null, args));
            }
            else {
                const value = this.stack.pop();
                if (value === undefined) {
                    throw new Error(`Function ${fn} requires an argument`);
                }
                this.stack.push(Calc._chooseFn(fn)(value));
            }
        }
        static _chooseFn(fn) {
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
        static _val(w) {
            var n;
            if (w.category === Lexer.cat.INT || w.category === Lexer.cat.PCNT) {
                n = parseFloat(w.token);
                if (w.token.endsWith("%"))
                    n /= 100;
            }
            else if (w.category === Lexer.cat.IDENT) {
                if (w.token === "pi") {
                    n = Math.PI;
                }
                else if (w.token === "e") {
                    n = Math.E;
                }
                else if (w.token === "ans") {
                    n = this.ans;
                }
            }
            return n;
        }
        static _chooseOp(op) {
            switch (op) {
                case "+":
                    return (a, b) => a + b;
                case "-":
                    return (a, b) => a - b;
                case "*":
                    return (a, b) => a * b;
                case "/":
                    return (a, b) => a / b;
                case "^":
                    return (a, b) => Math.pow(a, b);
                default:
                    throw new Error(`Unknown operator: ${op}`);
            }
        }
    }
    Calc.ans = 0;
    const MathPlugin = (customConfig = {}) => {
        const config = {
            name: "math",
            enabled: true,
            priority: 100,
            version: "1.0.0",
            dependencies: [],
            optionalDependencies: [],
            settings: {
                debug: false,
            },
            description: "Provides mathematical expression evaluation capabilities through the math helper",
            author: "FlowPlater Team",
        };
        Object.assign(config, customConfig);
        let state = {
            initialized: false,
            data: {},
        };
        const globalMethods = {
            evaluateExpression(_plugin, expression) {
                try {
                    const c = new Calc();
                    return c.exec(expression);
                }
                catch (error) {
                    Debug.error("Error evaluating math expression:", error);
                    throw error;
                }
            },
        };
        const instanceMethods = {};
        const hooks = {
            initComplete: function (flowplater, _instances) {
                if (config.enabled) {
                    Debug.debug(`${config.name} plugin initialized successfully`);
                }
                return flowplater;
            },
        };
        const transformers = {};
        const helpers = {
            math: function (expression, options) {
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
                const resolvedForced = expression.replace(/@{([^}]+)}/g, (match, varPath) => {
                    try {
                        let value;
                        if (varPath.includes(".")) {
                            value = varPath
                                .split(".")
                                .reduce((acc, part) => acc[part], options.data.root);
                        }
                        else {
                            value = options.data.root[varPath] || options.hash[varPath];
                        }
                        return value;
                    }
                    catch (error) {
                        console.warn(`Could not resolve ${varPath}`);
                        return NaN;
                    }
                });
                const resolvedExpression = resolvedForced.replace(/[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*/g, (match) => {
                    if (functionNames.includes(match) && !match.includes(".")) {
                        return match;
                    }
                    try {
                        let value;
                        if (match.includes(".")) {
                            value = match
                                .split(".")
                                .reduce((acc, part) => acc[part], options.data.root);
                        }
                        else {
                            value = options.data.root[match] || options.hash[match];
                        }
                        return value;
                    }
                    catch (error) {
                        console.warn(`Could not resolve ${match}`);
                        return NaN;
                    }
                });
                Debug.debug("Evaluating expression:", resolvedExpression);
                try {
                    const c = new Calc();
                    const result = c.exec(resolvedExpression);
                    return result;
                }
                catch (error) {
                    if (!(error instanceof TemplateError)) {
                        throw new TemplateError(`Error evaluating expression: ${error.message}`, error.stack);
                    }
                    throw error;
                }
            },
        };
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

    return MathPlugin;

})();
