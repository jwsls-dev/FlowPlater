import { errorLog } from "../../core/Debug";

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
    this.stack = [];
    this.w = null;
    this.l = null;
  }

  _next() {
    const next = this.l.next();
    if (next.done) {
      //   console.debug("End of expression reached");
      return null;
    }
    // console.debug("Next token:", next.value);
    return next.value;
  }

  exec(expr) {
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

      return (Calc.ans = this.stack.pop());
    } catch (error) {
      console.error("Error in expression evaluation:", error);
      throw error;
    }
  }

  _istok(o) {
    return this.w && o === this.w.token;
  }

  z() {
    if (this._wrapped_expr()) {
      return true;
    } else if (
      this.w &&
      ["INT", "IDENT", "PCNT"].some((k) => Lexer.cat[k] === this.w.category)
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
    } else if (!this.w || follow.some((op) => op === this.w.token)) {
      return true;
    }
    return false;
  }

  e() {
    let result = this.t();
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

  _wrapped_expr(cb, arg, a = "(", b = ")") {
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

  _rep_val(fn, args) {
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

export { Calc };
