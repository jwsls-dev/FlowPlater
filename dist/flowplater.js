/**!

 @license FlowPlater v1.4.22 | (c) 2024 FlowPlater | https://flowplater.io
 Created by J.WSLS | https://jwsls.io

Libraries used:
-   Handlebars.js v4.7.8+ | Copyright (C) 2011-2019 by Yehuda Katz | https://handlebarsjs.com
-   htmx v1.9.9+ | (c) 2020 by Big Sky Software LLC | https://htmx.org

This software and associated documentation (collectively, the "Software") are proprietary to
FlowPlater. Use of the Software is governed by the terms of this license agreement ("Agreement").
By installing, copying, or otherwise using the Software, you agree to be bound by the terms 
of this Agreement.

1.  Grant of License: Subject to the terms of this Agreement, FlowPlater grants you a non-exclusive, 
    non-transferable license to use the Software for personal or commercial purposes. You may not 
    redistribute, sublicense, or resell the Software without prior written consent from FlowPlater.

2.  Restrictions: You may not modify, reverse engineer, decompile, or disassemble the Software, 
    except to the extent that such activity is expressly permitted by applicable law notwithstanding 
    this limitation.

3.  Open Source Libraries: The Software includes open-source libraries Handlebars.js v4.7.8+ (MIT 
    License) and htmx v1.9.9+ (BSD License), which are used under the terms of their respective 
    licenses. These libraries are sublicensed to you under the terms of their original licenses, 
    and not under the terms of this Agreement.

4.  No Warranty: The Software is provided "as is" without any warranty of any kind, either expressed 
    or implied, including but not limited to any implied warranties of merchantability, fitness for 
    a particular purpose, or non-infringement.

5.  Limitation of Liability: In no event shall FlowPlater or its licensors be liable for any damages 
    (including, without limitation, lost profits, business interruption, or lost information) arising 
    out of the use of or inability to use the Software, even if FlowPlater has been advised of the 
    possibility of such damages.

6.  Termination: This Agreement shall terminate automatically if you fail to comply with its terms 
    and conditions. Upon termination, you must destroy all copies of the Software.

7.  General: This Agreement constitutes the entire agreement between you and FlowPlater concerning 
    the Software and supersedes any prior or contemporaneous communications.

BY USING THE SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ THIS AGREEMENT, UNDERSTAND IT, AND AGREE 
TO BE BOUND BY ITS TERMS AND CONDITIONS.

// Handlebars and htmx are included below. Flowplater is located at the bottom of the file.

*/
if (typeof Handlebars != "undefined") {
    console.warn("It looks like you already have Handlebars loaded. Flowplater has Handlebars included. Please remove the other version of Handlebars to prevent conflicts.");
}

if (typeof htmx != "undefined") {
    console.warn("It looks like you already have htmx loaded. Flowplater has htmx included. Please remove the other version of htmx to prevent conflicts.");
}

/**!

 @license
 handlebars v4.7.8

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function e(t, n) {
    if (typeof exports === "object" && typeof module === "object") module.exports = n(); else if (typeof define === "function" && define.amd) define([], n); else if (typeof exports === "object") exports["Handlebars"] = n(); else t["Handlebars"] = n();
})(this, function() {
    return function(n) {
        var r = {};
        function s(e) {
            if (r[e]) return r[e].exports;
            var t = r[e] = {
                exports: {},
                id: e,
                loaded: false
            };
            n[e].call(t.exports, t, t.exports, s);
            t.loaded = true;
            return t.exports;
        }
        s.m = n;
        s.c = r;
        s.p = "";
        return s(0);
    }([ function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        var s = n(2);
        var i = r(s);
        var o = n(84);
        var a = r(o);
        var l = n(85);
        var c = n(90);
        var u = n(91);
        var f = r(u);
        var h = n(88);
        var p = r(h);
        var d = n(83);
        var m = r(d);
        var g = i["default"].create;
        function v() {
            var n = g();
            n.compile = function(e, t) {
                return c.compile(e, t, n);
            };
            n.precompile = function(e, t) {
                return c.precompile(e, t, n);
            };
            n.AST = a["default"];
            n.Compiler = c.Compiler;
            n.JavaScriptCompiler = f["default"];
            n.Parser = l.parser;
            n.parse = l.parse;
            n.parseWithoutProcessing = l.parseWithoutProcessing;
            return n;
        }
        var y = v();
        y.create = v;
        m["default"](y);
        y.Visitor = p["default"];
        y["default"] = y;
        t["default"] = y;
        e.exports = t["default"];
    }, function(e, t) {
        "use strict";
        t["default"] = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        };
        t.__esModule = true;
    }, function(e, t, n) {
        "use strict";
        var r = n(3)["default"];
        var s = n(1)["default"];
        t.__esModule = true;
        var i = n(4);
        var o = r(i);
        var a = n(77);
        var l = s(a);
        var c = n(6);
        var u = s(c);
        var f = n(5);
        var h = r(f);
        var p = n(78);
        var d = r(p);
        var m = n(83);
        var g = s(m);
        function v() {
            var t = new o.HandlebarsEnvironment();
            h.extend(t, o);
            t.SafeString = l["default"];
            t.Exception = u["default"];
            t.Utils = h;
            t.escapeExpression = h.escapeExpression;
            t.VM = d;
            t.template = function(e) {
                return d.template(e, t);
            };
            return t;
        }
        var y = v();
        y.create = v;
        g["default"](y);
        y["default"] = y;
        t["default"] = y;
        e.exports = t["default"];
    }, function(e, t) {
        "use strict";
        t["default"] = function(e) {
            if (e && e.__esModule) {
                return e;
            } else {
                var t = {};
                if (e != null) {
                    for (var n in e) {
                        if (Object.prototype.hasOwnProperty.call(e, n)) t[n] = e[n];
                    }
                }
                t["default"] = e;
                return t;
            }
        };
        t.__esModule = true;
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        t.HandlebarsEnvironment = v;
        var s = n(5);
        var i = n(6);
        var o = r(i);
        var a = n(10);
        var l = n(70);
        var c = n(72);
        var u = r(c);
        var f = n(73);
        var h = "4.7.8";
        t.VERSION = h;
        var p = 8;
        t.COMPILER_REVISION = p;
        var d = 7;
        t.LAST_COMPATIBLE_COMPILER_REVISION = d;
        var m = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0 <4.3.0",
            8: ">= 4.3.0"
        };
        t.REVISION_CHANGES = m;
        var g = "[object Object]";
        function v(e, t, n) {
            this.helpers = e || {};
            this.partials = t || {};
            this.decorators = n || {};
            a.registerDefaultHelpers(this);
            l.registerDefaultDecorators(this);
        }
        v.prototype = {
            constructor: v,
            logger: u["default"],
            log: u["default"].log,
            registerHelper: function e(t, n) {
                if (s.toString.call(t) === g) {
                    if (n) {
                        throw new o["default"]("Arg not supported with multiple helpers");
                    }
                    s.extend(this.helpers, t);
                } else {
                    this.helpers[t] = n;
                }
            },
            unregisterHelper: function e(t) {
                delete this.helpers[t];
            },
            registerPartial: function e(t, n) {
                if (s.toString.call(t) === g) {
                    s.extend(this.partials, t);
                } else {
                    if (typeof n === "undefined") {
                        throw new o["default"]('Attempting to register a partial called "' + t + '" as undefined');
                    }
                    this.partials[t] = n;
                }
            },
            unregisterPartial: function e(t) {
                delete this.partials[t];
            },
            registerDecorator: function e(t, n) {
                if (s.toString.call(t) === g) {
                    if (n) {
                        throw new o["default"]("Arg not supported with multiple decorators");
                    }
                    s.extend(this.decorators, t);
                } else {
                    this.decorators[t] = n;
                }
            },
            unregisterDecorator: function e(t) {
                delete this.decorators[t];
            },
            resetLoggedPropertyAccesses: function e() {
                f.resetLoggedProperties();
            }
        };
        var y = u["default"].log;
        t.log = y;
        t.createFrame = s.createFrame;
        t.logger = u["default"];
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t.extend = o;
        t.indexOf = u;
        t.escapeExpression = f;
        t.isEmpty = h;
        t.createFrame = p;
        t.blockParams = d;
        t.appendContextPath = m;
        var n = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        var r = /[&<>"'`=]/g, s = /[&<>"'`=]/;
        function i(e) {
            return n[e];
        }
        function o(e) {
            for (var t = 1; t < arguments.length; t++) {
                for (var n in arguments[t]) {
                    if (Object.prototype.hasOwnProperty.call(arguments[t], n)) {
                        e[n] = arguments[t][n];
                    }
                }
            }
            return e;
        }
        var a = Object.prototype.toString;
        t.toString = a;
        var l = function e(t) {
            return typeof t === "function";
        };
        if (l(/x/)) {
            t.isFunction = l = function(e) {
                return typeof e === "function" && a.call(e) === "[object Function]";
            };
        }
        t.isFunction = l;
        var c = Array.isArray || function(e) {
            return e && typeof e === "object" ? a.call(e) === "[object Array]" : false;
        };
        t.isArray = c;
        function u(e, t) {
            for (var n = 0, r = e.length; n < r; n++) {
                if (e[n] === t) {
                    return n;
                }
            }
            return -1;
        }
        function f(e) {
            if (typeof e !== "string") {
                if (e && e.toHTML) {
                    return e.toHTML();
                } else if (e == null) {
                    return "";
                } else if (!e) {
                    return e + "";
                }
                e = "" + e;
            }
            if (!s.test(e)) {
                return e;
            }
            return e.replace(r, i);
        }
        function h(e) {
            if (!e && e !== 0) {
                return true;
            } else if (c(e) && e.length === 0) {
                return true;
            } else {
                return false;
            }
        }
        function p(e) {
            var t = o({}, e);
            t._parent = e;
            return t;
        }
        function d(e, t) {
            e.path = t;
            return e;
        }
        function m(e, t) {
            return (e ? e + "." : "") + t;
        }
    }, function(e, t, n) {
        "use strict";
        var c = n(7)["default"];
        t.__esModule = true;
        var u = [ "description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack" ];
        function f(e, t) {
            var n = t && t.loc, r = undefined, s = undefined, i = undefined, o = undefined;
            if (n) {
                r = n.start.line;
                s = n.end.line;
                i = n.start.column;
                o = n.end.column;
                e += " - " + r + ":" + i;
            }
            var a = Error.prototype.constructor.call(this, e);
            for (var l = 0; l < u.length; l++) {
                this[u[l]] = a[u[l]];
            }
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, f);
            }
            try {
                if (n) {
                    this.lineNumber = r;
                    this.endLineNumber = s;
                    if (c) {
                        Object.defineProperty(this, "column", {
                            value: i,
                            enumerable: true
                        });
                        Object.defineProperty(this, "endColumn", {
                            value: o,
                            enumerable: true
                        });
                    } else {
                        this.column = i;
                        this.endColumn = o;
                    }
                }
            } catch (e) {}
        }
        f.prototype = new Error();
        t["default"] = f;
        e.exports = t["default"];
    }, function(e, t, n) {
        e.exports = {
            default: n(8),
            __esModule: true
        };
    }, function(e, t, n) {
        var s = n(9);
        e.exports = function e(t, n, r) {
            return s.setDesc(t, n, r);
        };
    }, function(e, t) {
        var n = Object;
        e.exports = {
            create: n.create,
            getProto: n.getPrototypeOf,
            isEnum: {}.propertyIsEnumerable,
            getDesc: n.getOwnPropertyDescriptor,
            setDesc: n.defineProperty,
            setDescs: n.defineProperties,
            getKeys: n.keys,
            getNames: n.getOwnPropertyNames,
            getSymbols: n.getOwnPropertySymbols,
            each: [].forEach
        };
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        t.registerDefaultHelpers = y;
        t.moveHelperToHooks = b;
        var s = n(11);
        var i = r(s);
        var o = n(12);
        var a = r(o);
        var l = n(65);
        var c = r(l);
        var u = n(66);
        var f = r(u);
        var h = n(67);
        var p = r(h);
        var d = n(68);
        var m = r(d);
        var g = n(69);
        var v = r(g);
        function y(e) {
            i["default"](e);
            a["default"](e);
            c["default"](e);
            f["default"](e);
            p["default"](e);
            m["default"](e);
            v["default"](e);
        }
        function b(e, t, n) {
            if (e.helpers[t]) {
                e.hooks[t] = e.helpers[t];
                if (!n) {
                    delete e.helpers[t];
                }
            }
        }
    }, function(e, t, n) {
        "use strict";
        t.__esModule = true;
        var o = n(5);
        t["default"] = function(i) {
            i.registerHelper("blockHelperMissing", function(e, t) {
                var n = t.inverse, r = t.fn;
                if (e === true) {
                    return r(this);
                } else if (e === false || e == null) {
                    return n(this);
                } else if (o.isArray(e)) {
                    if (e.length > 0) {
                        if (t.ids) {
                            t.ids = [ t.name ];
                        }
                        return i.helpers.each(e, t);
                    } else {
                        return n(this);
                    }
                } else {
                    if (t.data && t.ids) {
                        var s = o.createFrame(t.data);
                        s.contextPath = o.appendContextPath(t.data.contextPath, t.name);
                        t = {
                            data: s
                        };
                    }
                    return r(e, t);
                }
            });
        };
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var p = n(13)["default"];
        var d = n(43)["default"];
        var m = n(55)["default"];
        var g = n(60)["default"];
        var r = n(1)["default"];
        t.__esModule = true;
        var v = n(5);
        var s = n(6);
        var y = r(s);
        t["default"] = function(e) {
            e.registerHelper("each", function(r, e) {
                if (!e) {
                    throw new y["default"]("Must pass iterator to #each");
                }
                var s = e.fn, t = e.inverse, n = 0, i = "", o = undefined, a = undefined;
                if (e.data && e.ids) {
                    a = v.appendContextPath(e.data.contextPath, e.ids[0]) + ".";
                }
                if (v.isFunction(r)) {
                    r = r.call(this);
                }
                if (e.data) {
                    o = v.createFrame(e.data);
                }
                function l(e, t, n) {
                    if (o) {
                        o.key = e;
                        o.index = t;
                        o.first = t === 0;
                        o.last = !!n;
                        if (a) {
                            o.contextPath = a + e;
                        }
                    }
                    i = i + s(r[e], {
                        data: o,
                        blockParams: v.blockParams([ r[e], e ], [ a + e, null ])
                    });
                }
                if (r && typeof r === "object") {
                    if (v.isArray(r)) {
                        for (var c = r.length; n < c; n++) {
                            if (n in r) {
                                l(n, n, n === r.length - 1);
                            }
                        }
                    } else if (typeof p === "function" && r[d]) {
                        var u = [];
                        var f = m(r);
                        for (var h = f.next(); !h.done; h = f.next()) {
                            u.push(h.value);
                        }
                        r = u;
                        for (var c = r.length; n < c; n++) {
                            l(n, n, n === r.length - 1);
                        }
                    } else {
                        (function() {
                            var t = undefined;
                            g(r).forEach(function(e) {
                                if (t !== undefined) {
                                    l(t, n - 1);
                                }
                                t = e;
                                n++;
                            });
                            if (t !== undefined) {
                                l(t, n - 1, true);
                            }
                        })();
                    }
                }
                if (n === 0) {
                    i = t(this);
                }
                return i;
            });
        };
        e.exports = t["default"];
    }, function(e, t, n) {
        e.exports = {
            default: n(14),
            __esModule: true
        };
    }, function(e, t, n) {
        n(15);
        n(42);
        e.exports = n(21).Symbol;
    }, function(D, M, e) {
        "use strict";
        var t = e(9), n = e(16), o = e(17), r = e(18), s = e(20), i = e(24), a = e(19), l = e(27), c = e(28), F = e(30), u = e(29), $ = e(31), f = e(36), B = e(37), q = e(38), U = e(39), h = e(32), p = e(26), d = t.getDesc, m = t.setDesc, g = t.create, v = f.get, y = n.Symbol, b = n.JSON, E = b && b.stringify, x = false, w = u("_hidden"), j = t.isEnum, S = l("symbol-registry"), k = l("symbols"), A = typeof y == "function", P = Object.prototype;
        var C = r && a(function() {
            return g(m({}, "a", {
                get: function() {
                    return m(this, "a", {
                        value: 7
                    }).a;
                }
            })).a != 7;
        }) ? function(e, t, n) {
            var r = d(P, t);
            if (r) delete P[t];
            m(e, t, n);
            if (r && e !== P) m(P, t, r);
        } : m;
        var O = function(t) {
            var e = k[t] = g(y.prototype);
            e._k = t;
            r && x && C(P, t, {
                configurable: true,
                set: function(e) {
                    if (o(this, w) && o(this[w], t)) this[w][t] = false;
                    C(this, t, p(1, e));
                }
            });
            return e;
        };
        var _ = function(e) {
            return typeof e == "symbol";
        };
        var I = function e(t, n, r) {
            if (r && o(k, n)) {
                if (!r.enumerable) {
                    if (!o(t, w)) m(t, w, p(1, {}));
                    t[w][n] = true;
                } else {
                    if (o(t, w) && t[w][n]) t[w][n] = false;
                    r = g(r, {
                        enumerable: p(0, false)
                    });
                }
                return C(t, n, r);
            }
            return m(t, n, r);
        };
        var N = function e(t, n) {
            U(t);
            var r = B(n = h(n)), s = 0, i = r.length, o;
            while (i > s) I(t, o = r[s++], n[o]);
            return t;
        };
        var R = function e(t, n) {
            return n === undefined ? g(t) : N(g(t), n);
        };
        var T = function e(t) {
            var n = j.call(this, t);
            return n || !o(this, t) || !o(k, t) || o(this, w) && this[w][t] ? n : true;
        };
        var H = function e(t, n) {
            var r = d(t = h(t), n);
            if (r && o(k, n) && !(o(t, w) && t[w][n])) r.enumerable = true;
            return r;
        };
        var L = function e(t) {
            var n = v(h(t)), r = [], s = 0, i;
            while (n.length > s) if (!o(k, i = n[s++]) && i != w) r.push(i);
            return r;
        };
        var V = function e(t) {
            var n = v(h(t)), r = [], s = 0, i;
            while (n.length > s) if (o(k, i = n[s++])) r.push(k[i]);
            return r;
        };
        var W = function e(t) {
            if (t === undefined || _(t)) return;
            var n = [ t ], r = 1, s = arguments, i, o;
            while (s.length > r) n.push(s[r++]);
            i = n[1];
            if (typeof i == "function") o = i;
            if (o || !q(i)) i = function(e, t) {
                if (o) t = o.call(this, e, t);
                if (!_(t)) return t;
            };
            n[1] = i;
            return E.apply(b, n);
        };
        var G = a(function() {
            var e = y();
            return E([ e ]) != "[null]" || E({
                a: e
            }) != "{}" || E(Object(e)) != "{}";
        });
        if (!A) {
            y = function e() {
                if (_(this)) throw TypeError("Symbol is not a constructor");
                return O(F(arguments.length > 0 ? arguments[0] : undefined));
            };
            i(y.prototype, "toString", function e() {
                return this._k;
            });
            _ = function(e) {
                return e instanceof y;
            };
            t.create = R;
            t.isEnum = T;
            t.getDesc = H;
            t.setDesc = I;
            t.setDescs = N;
            t.getNames = f.get = L;
            t.getSymbols = V;
            if (r && !e(41)) {
                i(P, "propertyIsEnumerable", T, true);
            }
        }
        var X = {
            for: function(e) {
                return o(S, e += "") ? S[e] : S[e] = y(e);
            },
            keyFor: function e(t) {
                return $(S, t);
            },
            useSetter: function() {
                x = true;
            },
            useSimple: function() {
                x = false;
            }
        };
        t.each.call(("hasInstance,isConcatSpreadable,iterator,match,replace,search," + "species,split,toPrimitive,toStringTag,unscopables").split(","), function(e) {
            var t = u(e);
            X[e] = A ? t : O(t);
        });
        x = true;
        s(s.G + s.W, {
            Symbol: y
        });
        s(s.S, "Symbol", X);
        s(s.S + s.F * !A, "Object", {
            create: R,
            defineProperty: I,
            defineProperties: N,
            getOwnPropertyDescriptor: H,
            getOwnPropertyNames: L,
            getOwnPropertySymbols: V
        });
        b && s(s.S + s.F * (!A || G), "JSON", {
            stringify: W
        });
        c(y, "Symbol");
        c(Math, "Math", true);
        c(n.JSON, "JSON", true);
    }, function(e, t) {
        var n = e.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
        if (typeof __g == "number") __g = n;
    }, function(e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function(e, t) {
            return n.call(e, t);
        };
    }, function(e, t, n) {
        e.exports = !n(19)(function() {
            return Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a != 7;
        });
    }, function(e, t) {
        e.exports = function(e) {
            try {
                return !!e();
            } catch (e) {
                return true;
            }
        };
    }, function(e, t, n) {
        var d = n(16), m = n(21), g = n(22), v = "prototype";
        var y = function(e, t, n) {
            var r = e & y.F, s = e & y.G, i = e & y.S, o = e & y.P, a = e & y.B, l = e & y.W, c = s ? m : m[t] || (m[t] = {}), u = s ? d : i ? d[t] : (d[t] || {})[v], f, h, p;
            if (s) n = t;
            for (f in n) {
                h = !r && u && f in u;
                if (h && f in c) continue;
                p = h ? u[f] : n[f];
                c[f] = s && typeof u[f] != "function" ? n[f] : a && h ? g(p, d) : l && u[f] == p ? function(t) {
                    var e = function(e) {
                        return this instanceof t ? new t(e) : t(e);
                    };
                    e[v] = t[v];
                    return e;
                }(p) : o && typeof p == "function" ? g(Function.call, p) : p;
                if (o) (c[v] || (c[v] = {}))[f] = p;
            }
        };
        y.F = 1;
        y.G = 2;
        y.S = 4;
        y.P = 8;
        y.B = 16;
        y.W = 32;
        e.exports = y;
    }, function(e, t) {
        var n = e.exports = {
            version: "1.2.6"
        };
        if (typeof __e == "number") __e = n;
    }, function(e, t, n) {
        var i = n(23);
        e.exports = function(r, s, e) {
            i(r);
            if (s === undefined) return r;
            switch (e) {
              case 1:
                return function(e) {
                    return r.call(s, e);
                };

              case 2:
                return function(e, t) {
                    return r.call(s, e, t);
                };

              case 3:
                return function(e, t, n) {
                    return r.call(s, e, t, n);
                };
            }
            return function() {
                return r.apply(s, arguments);
            };
        };
    }, function(e, t) {
        e.exports = function(e) {
            if (typeof e != "function") throw TypeError(e + " is not a function!");
            return e;
        };
    }, function(e, t, n) {
        e.exports = n(25);
    }, function(e, t, n) {
        var r = n(9), s = n(26);
        e.exports = n(18) ? function(e, t, n) {
            return r.setDesc(e, t, s(1, n));
        } : function(e, t, n) {
            e[t] = n;
            return e;
        };
    }, function(e, t) {
        e.exports = function(e, t) {
            return {
                enumerable: !(e & 1),
                configurable: !(e & 2),
                writable: !(e & 4),
                value: t
            };
        };
    }, function(e, t, n) {
        var r = n(16), s = "__core-js_shared__", i = r[s] || (r[s] = {});
        e.exports = function(e) {
            return i[e] || (i[e] = {});
        };
    }, function(e, t, n) {
        var r = n(9).setDesc, s = n(17), i = n(29)("toStringTag");
        e.exports = function(e, t, n) {
            if (e && !s(e = n ? e : e.prototype, i)) r(e, i, {
                configurable: true,
                value: t
            });
        };
    }, function(e, t, n) {
        var r = n(27)("wks"), s = n(30), i = n(16).Symbol;
        e.exports = function(e) {
            return r[e] || (r[e] = i && i[e] || (i || s)("Symbol." + e));
        };
    }, function(e, t) {
        var n = 0, r = Math.random();
        e.exports = function(e) {
            return "Symbol(".concat(e === undefined ? "" : e, ")_", (++n + r).toString(36));
        };
    }, function(e, t, n) {
        var a = n(9), l = n(32);
        e.exports = function(e, t) {
            var n = l(e), r = a.getKeys(n), s = r.length, i = 0, o;
            while (s > i) if (n[o = r[i++]] === t) return o;
        };
    }, function(e, t, n) {
        var r = n(33), s = n(35);
        e.exports = function(e) {
            return r(s(e));
        };
    }, function(e, t, n) {
        var r = n(34);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return r(e) == "String" ? e.split("") : Object(e);
        };
    }, function(e, t) {
        var n = {}.toString;
        e.exports = function(e) {
            return n.call(e).slice(8, -1);
        };
    }, function(e, t) {
        e.exports = function(e) {
            if (e == undefined) throw TypeError("Can't call method on  " + e);
            return e;
        };
    }, function(e, t, n) {
        var r = n(32), s = n(9).getNames, i = {}.toString;
        var o = typeof window == "object" && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        var a = function(e) {
            try {
                return s(e);
            } catch (e) {
                return o.slice();
            }
        };
        e.exports.get = function e(t) {
            if (o && i.call(t) == "[object Window]") return a(t);
            return s(r(t));
        };
    }, function(e, t, n) {
        var a = n(9);
        e.exports = function(e) {
            var t = a.getKeys(e), n = a.getSymbols;
            if (n) {
                var r = n(e), s = a.isEnum, i = 0, o;
                while (r.length > i) if (s.call(e, o = r[i++])) t.push(o);
            }
            return t;
        };
    }, function(e, t, n) {
        var r = n(34);
        e.exports = Array.isArray || function(e) {
            return r(e) == "Array";
        };
    }, function(e, t, n) {
        var r = n(40);
        e.exports = function(e) {
            if (!r(e)) throw TypeError(e + " is not an object!");
            return e;
        };
    }, function(e, t) {
        e.exports = function(e) {
            return typeof e === "object" ? e !== null : typeof e === "function";
        };
    }, function(e, t) {
        e.exports = true;
    }, function(e, t) {}, function(e, t, n) {
        e.exports = {
            default: n(44),
            __esModule: true
        };
    }, function(e, t, n) {
        n(45);
        n(51);
        e.exports = n(29)("iterator");
    }, function(e, t, n) {
        "use strict";
        var r = n(46)(true);
        n(48)(String, "String", function(e) {
            this._t = String(e);
            this._i = 0;
        }, function() {
            var e = this._t, t = this._i, n;
            if (t >= e.length) return {
                value: undefined,
                done: true
            };
            n = r(e, t);
            this._i += n.length;
            return {
                value: n,
                done: false
            };
        });
    }, function(e, t, n) {
        var l = n(47), c = n(35);
        e.exports = function(a) {
            return function(e, t) {
                var n = String(c(e)), r = l(t), s = n.length, i, o;
                if (r < 0 || r >= s) return a ? "" : undefined;
                i = n.charCodeAt(r);
                return i < 55296 || i > 56319 || r + 1 === s || (o = n.charCodeAt(r + 1)) < 56320 || o > 57343 ? a ? n.charAt(r) : i : a ? n.slice(r, r + 2) : (i - 55296 << 10) + (o - 56320) + 65536;
            };
        };
    }, function(e, t) {
        var n = Math.ceil, r = Math.floor;
        e.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
        };
    }, function(e, t, n) {
        "use strict";
        var v = n(41), y = n(20), b = n(24), E = n(25), x = n(17), w = n(49), S = n(50), k = n(28), A = n(9).getProto, P = n(29)("iterator"), C = !([].keys && "next" in [].keys()), O = "@@iterator", _ = "keys", I = "values";
        var N = function() {
            return this;
        };
        e.exports = function(e, t, n, r, s, i, o) {
            S(n, t, r);
            var a = function(t) {
                if (!C && t in f) return f[t];
                switch (t) {
                  case _:
                    return function e() {
                        return new n(this, t);
                    };

                  case I:
                    return function e() {
                        return new n(this, t);
                    };
                }
                return function e() {
                    return new n(this, t);
                };
            };
            var l = t + " Iterator", c = s == I, u = false, f = e.prototype, h = f[P] || f[O] || s && f[s], p = h || a(s), d, m;
            if (h) {
                var g = A(p.call(new e()));
                k(g, l, true);
                if (!v && x(f, O)) E(g, P, N);
                if (c && h.name !== I) {
                    u = true;
                    p = function e() {
                        return h.call(this);
                    };
                }
            }
            if ((!v || o) && (C || u || !f[P])) {
                E(f, P, p);
            }
            w[t] = p;
            w[l] = N;
            if (s) {
                d = {
                    values: c ? p : a(I),
                    keys: i ? p : a(_),
                    entries: !c ? p : a("entries")
                };
                if (o) for (m in d) {
                    if (!(m in f)) b(f, m, d[m]);
                } else y(y.P + y.F * (C || u), t, d);
            }
            return d;
        };
    }, function(e, t) {
        e.exports = {};
    }, function(e, t, n) {
        "use strict";
        var r = n(9), s = n(26), i = n(28), o = {};
        n(25)(o, n(29)("iterator"), function() {
            return this;
        });
        e.exports = function(e, t, n) {
            e.prototype = r.create(o, {
                next: s(1, n)
            });
            i(e, t + " Iterator");
        };
    }, function(e, t, n) {
        n(52);
        var r = n(49);
        r.NodeList = r.HTMLCollection = r.Array;
    }, function(e, t, n) {
        "use strict";
        var r = n(53), s = n(54), i = n(49), o = n(32);
        e.exports = n(48)(Array, "Array", function(e, t) {
            this._t = o(e);
            this._i = 0;
            this._k = t;
        }, function() {
            var e = this._t, t = this._k, n = this._i++;
            if (!e || n >= e.length) {
                this._t = undefined;
                return s(1);
            }
            if (t == "keys") return s(0, n);
            if (t == "values") return s(0, e[n]);
            return s(0, [ n, e[n] ]);
        }, "values");
        i.Arguments = i.Array;
        r("keys");
        r("values");
        r("entries");
    }, function(e, t) {
        e.exports = function() {};
    }, function(e, t) {
        e.exports = function(e, t) {
            return {
                value: t,
                done: !!e
            };
        };
    }, function(e, t, n) {
        e.exports = {
            default: n(56),
            __esModule: true
        };
    }, function(e, t, n) {
        n(51);
        n(45);
        e.exports = n(57);
    }, function(e, t, n) {
        var r = n(39), s = n(58);
        e.exports = n(21).getIterator = function(e) {
            var t = s(e);
            if (typeof t != "function") throw TypeError(e + " is not iterable!");
            return r(t.call(e));
        };
    }, function(e, t, n) {
        var r = n(59), s = n(29)("iterator"), i = n(49);
        e.exports = n(21).getIteratorMethod = function(e) {
            if (e != undefined) return e[s] || e["@@iterator"] || i[r(e)];
        };
    }, function(e, t, n) {
        var s = n(34), i = n(29)("toStringTag"), o = s(function() {
            return arguments;
        }()) == "Arguments";
        e.exports = function(e) {
            var t, n, r;
            return e === undefined ? "Undefined" : e === null ? "Null" : typeof (n = (t = Object(e))[i]) == "string" ? n : o ? s(t) : (r = s(t)) == "Object" && typeof t.callee == "function" ? "Arguments" : r;
        };
    }, function(e, t, n) {
        e.exports = {
            default: n(61),
            __esModule: true
        };
    }, function(e, t, n) {
        n(62);
        e.exports = n(21).Object.keys;
    }, function(e, t, n) {
        var r = n(63);
        n(64)("keys", function(n) {
            return function e(t) {
                return n(r(t));
            };
        });
    }, function(e, t, n) {
        var r = n(35);
        e.exports = function(e) {
            return Object(r(e));
        };
    }, function(e, t, n) {
        var s = n(20), i = n(21), o = n(19);
        e.exports = function(e, t) {
            var n = (i.Object || {})[e] || Object[e], r = {};
            r[e] = t(n);
            s(s.S + s.F * o(function() {
                n(1);
            }), "Object", r);
        };
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        var s = n(6);
        var i = r(s);
        t["default"] = function(e) {
            e.registerHelper("helperMissing", function() {
                if (arguments.length === 1) {
                    return undefined;
                } else {
                    throw new i["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
                }
            });
        };
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        var s = n(5);
        var i = n(6);
        var o = r(i);
        t["default"] = function(n) {
            n.registerHelper("if", function(e, t) {
                if (arguments.length != 2) {
                    throw new o["default"]("#if requires exactly one argument");
                }
                if (s.isFunction(e)) {
                    e = e.call(this);
                }
                if (!t.hash.includeZero && !e || s.isEmpty(e)) {
                    return t.inverse(this);
                } else {
                    return t.fn(this);
                }
            });
            n.registerHelper("unless", function(e, t) {
                if (arguments.length != 2) {
                    throw new o["default"]("#unless requires exactly one argument");
                }
                return n.helpers["if"].call(this, e, {
                    fn: t.inverse,
                    inverse: t.fn,
                    hash: t.hash
                });
            });
        };
        e.exports = t["default"];
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t["default"] = function(s) {
            s.registerHelper("log", function() {
                var e = [ undefined ], t = arguments[arguments.length - 1];
                for (var n = 0; n < arguments.length - 1; n++) {
                    e.push(arguments[n]);
                }
                var r = 1;
                if (t.hash.level != null) {
                    r = t.hash.level;
                } else if (t.data && t.data.level != null) {
                    r = t.data.level;
                }
                e[0] = r;
                s.log.apply(s, e);
            });
        };
        e.exports = t["default"];
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t["default"] = function(e) {
            e.registerHelper("lookup", function(e, t, n) {
                if (!e) {
                    return e;
                }
                return n.lookupProperty(e, t);
            });
        };
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        var s = n(5);
        var i = n(6);
        var o = r(i);
        t["default"] = function(e) {
            e.registerHelper("with", function(e, t) {
                if (arguments.length != 2) {
                    throw new o["default"]("#with requires exactly one argument");
                }
                if (s.isFunction(e)) {
                    e = e.call(this);
                }
                var n = t.fn;
                if (!s.isEmpty(e)) {
                    var r = t.data;
                    if (t.data && t.ids) {
                        r = s.createFrame(t.data);
                        r.contextPath = s.appendContextPath(t.data.contextPath, t.ids[0]);
                    }
                    return n(e, {
                        data: r,
                        blockParams: s.blockParams([ e ], [ r && r.contextPath ])
                    });
                } else {
                    return t.inverse(this);
                }
            });
        };
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        t.registerDefaultDecorators = o;
        var s = n(71);
        var i = r(s);
        function o(e) {
            i["default"](e);
        }
    }, function(e, t, n) {
        "use strict";
        t.__esModule = true;
        var a = n(5);
        t["default"] = function(e) {
            e.registerDecorator("inline", function(s, i, o, e) {
                var t = s;
                if (!i.partials) {
                    i.partials = {};
                    t = function(e, t) {
                        var n = o.partials;
                        o.partials = a.extend({}, n, i.partials);
                        var r = s(e, t);
                        o.partials = n;
                        return r;
                    };
                }
                i.partials[e.args[0]] = e.fn;
                return t;
            });
        };
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        t.__esModule = true;
        var r = n(5);
        var o = {
            methodMap: [ "debug", "info", "warn", "error" ],
            level: "info",
            lookupLevel: function e(t) {
                if (typeof t === "string") {
                    var n = r.indexOf(o.methodMap, t.toLowerCase());
                    if (n >= 0) {
                        t = n;
                    } else {
                        t = parseInt(t, 10);
                    }
                }
                return t;
            },
            log: function e(t) {
                t = o.lookupLevel(t);
                if (typeof console !== "undefined" && o.lookupLevel(o.level) <= t) {
                    var n = o.methodMap[t];
                    if (!console[n]) {
                        n = "log";
                    }
                    for (var r = arguments.length, s = Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) {
                        s[i - 1] = arguments[i];
                    }
                    console[n].apply(console, s);
                }
            }
        };
        t["default"] = o;
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var r = n(74)["default"];
        var s = n(60)["default"];
        var i = n(1)["default"];
        t.__esModule = true;
        t.createProtoAccessControl = u;
        t.resultIsAllowed = f;
        t.resetLoggedProperties = d;
        var o = n(76);
        var a = n(72);
        var l = i(a);
        var c = r(null);
        function u(e) {
            var t = r(null);
            t["constructor"] = false;
            t["__defineGetter__"] = false;
            t["__defineSetter__"] = false;
            t["__lookupGetter__"] = false;
            var n = r(null);
            n["__proto__"] = false;
            return {
                properties: {
                    whitelist: o.createNewLookupObject(n, e.allowedProtoProperties),
                    defaultValue: e.allowProtoPropertiesByDefault
                },
                methods: {
                    whitelist: o.createNewLookupObject(t, e.allowedProtoMethods),
                    defaultValue: e.allowProtoMethodsByDefault
                }
            };
        }
        function f(e, t, n) {
            if (typeof e === "function") {
                return h(t.methods, n);
            } else {
                return h(t.properties, n);
            }
        }
        function h(e, t) {
            if (e.whitelist[t] !== undefined) {
                return e.whitelist[t] === true;
            }
            if (e.defaultValue !== undefined) {
                return e.defaultValue;
            }
            p(t);
            return false;
        }
        function p(e) {
            if (c[e] !== true) {
                c[e] = true;
                l["default"].log("error", 'Handlebars: Access has been denied to resolve the property "' + e + '" because it is not an "own property" of its parent.\n' + "You can add a runtime option to disable the check or this warning:\n" + "See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details");
            }
        }
        function d() {
            s(c).forEach(function(e) {
                delete c[e];
            });
        }
    }, function(e, t, n) {
        e.exports = {
            default: n(75),
            __esModule: true
        };
    }, function(e, t, n) {
        var r = n(9);
        e.exports = function e(t, n) {
            return r.create(t, n);
        };
    }, function(e, t, n) {
        "use strict";
        var r = n(74)["default"];
        t.__esModule = true;
        t.createNewLookupObject = i;
        var s = n(5);
        function i() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {
                t[n] = arguments[n];
            }
            return s.extend.apply(undefined, [ r(null) ].concat(t));
        }
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        function n(e) {
            this.string = e;
        }
        n.prototype.toString = n.prototype.toHTML = function() {
            return "" + this.string;
        };
        t["default"] = n;
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var s = n(79)["default"];
        var i = n(60)["default"];
        var r = n(3)["default"];
        var o = n(1)["default"];
        t.__esModule = true;
        t.checkRevision = m;
        t.template = g;
        t.wrapProgram = v;
        t.resolvePartial = y;
        t.invokePartial = b;
        t.noop = E;
        var a = n(5);
        var u = r(a);
        var l = n(6);
        var f = o(l);
        var c = n(4);
        var h = n(10);
        var p = n(82);
        var d = n(73);
        function m(e) {
            var t = e && e[0] || 1, n = c.COMPILER_REVISION;
            if (t >= c.LAST_COMPATIBLE_COMPILER_REVISION && t <= c.COMPILER_REVISION) {
                return;
            }
            if (t < c.LAST_COMPATIBLE_COMPILER_REVISION) {
                var r = c.REVISION_CHANGES[n], s = c.REVISION_CHANGES[t];
                throw new f["default"]("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + r + ") or downgrade your runtime to an older version (" + s + ").");
            } else {
                throw new f["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + e[1] + ").");
            }
        }
        function g(l, c) {
            if (!c) {
                throw new f["default"]("No environment passed to template");
            }
            if (!l || !l.main) {
                throw new f["default"]("Unknown template object: " + typeof l);
            }
            l.main.decorator = l.main_d;
            c.VM.checkRevision(l.compiler);
            var r = l.compiler && l.compiler[0] === 7;
            function e(e, t, n) {
                if (n.hash) {
                    t = u.extend({}, t, n.hash);
                    if (n.ids) {
                        n.ids[0] = true;
                    }
                }
                e = c.VM.resolvePartial.call(this, e, t, n);
                var r = u.extend({}, n, {
                    hooks: this.hooks,
                    protoAccessControl: this.protoAccessControl
                });
                var s = c.VM.invokePartial.call(this, e, t, r);
                if (s == null && c.compile) {
                    n.partials[n.name] = c.compile(e, l.compilerOptions, c);
                    s = n.partials[n.name](t, r);
                }
                if (s != null) {
                    if (n.indent) {
                        var i = s.split("\n");
                        for (var o = 0, a = i.length; o < a; o++) {
                            if (!i[o] && o + 1 === a) {
                                break;
                            }
                            i[o] = n.indent + i[o];
                        }
                        s = i.join("\n");
                    }
                    return s;
                } else {
                    throw new f["default"]("The partial " + n.name + " could not be compiled when running in runtime-only mode");
                }
            }
            var o = {
                strict: function e(t, n, r) {
                    if (!t || !(n in t)) {
                        throw new f["default"]('"' + n + '" not defined in ' + t, {
                            loc: r
                        });
                    }
                    return o.lookupProperty(t, n);
                },
                lookupProperty: function e(t, n) {
                    var r = t[n];
                    if (r == null) {
                        return r;
                    }
                    if (Object.prototype.hasOwnProperty.call(t, n)) {
                        return r;
                    }
                    if (d.resultIsAllowed(r, o.protoAccessControl, n)) {
                        return r;
                    }
                    return undefined;
                },
                lookup: function e(t, n) {
                    var r = t.length;
                    for (var s = 0; s < r; s++) {
                        var i = t[s] && o.lookupProperty(t[s], n);
                        if (i != null) {
                            return t[s][n];
                        }
                    }
                },
                lambda: function e(t, n) {
                    return typeof t === "function" ? t.call(n) : t;
                },
                escapeExpression: u.escapeExpression,
                invokePartial: e,
                fn: function e(t) {
                    var n = l[t];
                    n.decorator = l[t + "_d"];
                    return n;
                },
                programs: [],
                program: function e(t, n, r, s, i) {
                    var o = this.programs[t], a = this.fn(t);
                    if (n || i || s || r) {
                        o = v(this, t, a, n, r, s, i);
                    } else if (!o) {
                        o = this.programs[t] = v(this, t, a);
                    }
                    return o;
                },
                data: function e(t, n) {
                    while (t && n--) {
                        t = t._parent;
                    }
                    return t;
                },
                mergeIfNeeded: function e(t, n) {
                    var r = t || n;
                    if (t && n && t !== n) {
                        r = u.extend({}, n, t);
                    }
                    return r;
                },
                nullContext: s({}),
                noop: c.VM.noop,
                compilerInfo: l.compiler
            };
            function a(e) {
                var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var n = t.data;
                a._setup(t);
                if (!t.partial && l.useData) {
                    n = x(e, n);
                }
                var r = undefined, s = l.useBlockParams ? [] : undefined;
                if (l.useDepths) {
                    if (t.depths) {
                        r = e != t.depths[0] ? [ e ].concat(t.depths) : t.depths;
                    } else {
                        r = [ e ];
                    }
                }
                function i(e) {
                    return "" + l.main(o, e, o.helpers, o.partials, n, s, r);
                }
                i = w(l.main, i, o, t.depths || [], n, s);
                return i(e, t);
            }
            a.isTop = true;
            a._setup = function(e) {
                if (!e.partial) {
                    var t = u.extend({}, c.helpers, e.helpers);
                    S(t, o);
                    o.helpers = t;
                    if (l.usePartial) {
                        o.partials = o.mergeIfNeeded(e.partials, c.partials);
                    }
                    if (l.usePartial || l.useDecorators) {
                        o.decorators = u.extend({}, c.decorators, e.decorators);
                    }
                    o.hooks = {};
                    o.protoAccessControl = d.createProtoAccessControl(e);
                    var n = e.allowCallsToHelperMissing || r;
                    h.moveHelperToHooks(o, "helperMissing", n);
                    h.moveHelperToHooks(o, "blockHelperMissing", n);
                } else {
                    o.protoAccessControl = e.protoAccessControl;
                    o.helpers = e.helpers;
                    o.partials = e.partials;
                    o.decorators = e.decorators;
                    o.hooks = e.hooks;
                }
            };
            a._child = function(e, t, n, r) {
                if (l.useBlockParams && !n) {
                    throw new f["default"]("must pass block params");
                }
                if (l.useDepths && !r) {
                    throw new f["default"]("must pass parent depths");
                }
                return v(o, e, l[e], t, 0, n, r);
            };
            return a;
        }
        function v(r, e, s, i, t, o, a) {
            function n(e) {
                var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var n = a;
                if (a && e != a[0] && !(e === r.nullContext && a[0] === null)) {
                    n = [ e ].concat(a);
                }
                return s(r, e, r.helpers, r.partials, t.data || i, o && [ t.blockParams ].concat(o), n);
            }
            n = w(s, n, r, a, i, o);
            n.program = e;
            n.depth = a ? a.length : 0;
            n.blockParams = t || 0;
            return n;
        }
        function y(e, t, n) {
            if (!e) {
                if (n.name === "@partial-block") {
                    e = n.data["partial-block"];
                } else {
                    e = n.partials[n.name];
                }
            } else if (!e.call && !n.name) {
                n.name = e;
                e = n.partials[e];
            }
            return e;
        }
        function b(e, t, n) {
            var s = n.data && n.data["partial-block"];
            n.partial = true;
            if (n.ids) {
                n.data.contextPath = n.ids[0] || n.data.contextPath;
            }
            var i = undefined;
            if (n.fn && n.fn !== E) {
                (function() {
                    n.data = c.createFrame(n.data);
                    var r = n.fn;
                    i = n.data["partial-block"] = function e(t) {
                        var n = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        n.data = c.createFrame(n.data);
                        n.data["partial-block"] = s;
                        return r(t, n);
                    };
                    if (r.partials) {
                        n.partials = u.extend({}, n.partials, r.partials);
                    }
                })();
            }
            if (e === undefined && i) {
                e = i;
            }
            if (e === undefined) {
                throw new f["default"]("The partial " + n.name + " could not be found");
            } else if (e instanceof Function) {
                return e(t, n);
            }
        }
        function E() {
            return "";
        }
        function x(e, t) {
            if (!t || !("root" in t)) {
                t = t ? c.createFrame(t) : {};
                t.root = e;
            }
            return t;
        }
        function w(e, t, n, r, s, i) {
            if (e.decorator) {
                var o = {};
                t = e.decorator(t, o, n, r && r[0], s, i, r);
                u.extend(t, o);
            }
            return t;
        }
        function S(n, r) {
            i(n).forEach(function(e) {
                var t = n[e];
                n[e] = k(t, r);
            });
        }
        function k(e, t) {
            var n = t.lookupProperty;
            return p.wrapHelper(e, function(e) {
                return u.extend({
                    lookupProperty: n
                }, e);
            });
        }
    }, function(e, t, n) {
        e.exports = {
            default: n(80),
            __esModule: true
        };
    }, function(e, t, n) {
        n(81);
        e.exports = n(21).Object.seal;
    }, function(e, t, n) {
        var r = n(40);
        n(64)("seal", function(n) {
            return function e(t) {
                return n && r(t) ? n(t) : t;
            };
        });
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t.wrapHelper = n;
        function n(n, r) {
            if (typeof n !== "function") {
                return n;
            }
            var e = function e() {
                var t = arguments[arguments.length - 1];
                arguments[arguments.length - 1] = r(t);
                return n.apply(this, arguments);
            };
            return e;
        }
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t["default"] = function(e) {
            (function() {
                if (typeof globalThis === "object") return;
                Object.prototype.__defineGetter__("__magic__", function() {
                    return this;
                });
                __magic__.globalThis = __magic__;
                delete Object.prototype.__magic__;
            })();
            var t = globalThis.Handlebars;
            e.noConflict = function() {
                if (globalThis.Handlebars === e) {
                    globalThis.Handlebars = t;
                }
                return e;
            };
        };
        e.exports = t["default"];
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        var n = {
            helpers: {
                helperExpression: function e(t) {
                    return t.type === "SubExpression" || (t.type === "MustacheStatement" || t.type === "BlockStatement") && !!(t.params && t.params.length || t.hash);
                },
                scopedId: function e(t) {
                    return /^\.|this\b/.test(t.original);
                },
                simpleId: function e(t) {
                    return t.parts.length === 1 && !n.helpers.scopedId(t) && !t.depth;
                }
            }
        };
        t["default"] = n;
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        var s = n(3)["default"];
        t.__esModule = true;
        t.parseWithoutProcessing = p;
        t.parse = d;
        var i = n(86);
        var o = r(i);
        var a = n(87);
        var l = r(a);
        var c = n(89);
        var u = s(c);
        var f = n(5);
        t.parser = o["default"];
        var h = {};
        f.extend(h, u);
        function p(e, t) {
            if (e.type === "Program") {
                return e;
            }
            o["default"].yy = h;
            h.locInfo = function(e) {
                return new h.SourceLocation(t && t.srcName, e);
            };
            var n = o["default"].parse(e);
            return n;
        }
        function d(e, t) {
            var n = p(e, t);
            var r = new l["default"](t);
            return r.accept(n);
        }
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        var n = function() {
            var e = {
                trace: function e() {},
                yy: {},
                symbols_: {
                    error: 2,
                    root: 3,
                    program: 4,
                    EOF: 5,
                    program_repetition0: 6,
                    statement: 7,
                    mustache: 8,
                    block: 9,
                    rawBlock: 10,
                    partial: 11,
                    partialBlock: 12,
                    content: 13,
                    COMMENT: 14,
                    CONTENT: 15,
                    openRawBlock: 16,
                    rawBlock_repetition0: 17,
                    END_RAW_BLOCK: 18,
                    OPEN_RAW_BLOCK: 19,
                    helperName: 20,
                    openRawBlock_repetition0: 21,
                    openRawBlock_option0: 22,
                    CLOSE_RAW_BLOCK: 23,
                    openBlock: 24,
                    block_option0: 25,
                    closeBlock: 26,
                    openInverse: 27,
                    block_option1: 28,
                    OPEN_BLOCK: 29,
                    openBlock_repetition0: 30,
                    openBlock_option0: 31,
                    openBlock_option1: 32,
                    CLOSE: 33,
                    OPEN_INVERSE: 34,
                    openInverse_repetition0: 35,
                    openInverse_option0: 36,
                    openInverse_option1: 37,
                    openInverseChain: 38,
                    OPEN_INVERSE_CHAIN: 39,
                    openInverseChain_repetition0: 40,
                    openInverseChain_option0: 41,
                    openInverseChain_option1: 42,
                    inverseAndProgram: 43,
                    INVERSE: 44,
                    inverseChain: 45,
                    inverseChain_option0: 46,
                    OPEN_ENDBLOCK: 47,
                    OPEN: 48,
                    mustache_repetition0: 49,
                    mustache_option0: 50,
                    OPEN_UNESCAPED: 51,
                    mustache_repetition1: 52,
                    mustache_option1: 53,
                    CLOSE_UNESCAPED: 54,
                    OPEN_PARTIAL: 55,
                    partialName: 56,
                    partial_repetition0: 57,
                    partial_option0: 58,
                    openPartialBlock: 59,
                    OPEN_PARTIAL_BLOCK: 60,
                    openPartialBlock_repetition0: 61,
                    openPartialBlock_option0: 62,
                    param: 63,
                    sexpr: 64,
                    OPEN_SEXPR: 65,
                    sexpr_repetition0: 66,
                    sexpr_option0: 67,
                    CLOSE_SEXPR: 68,
                    hash: 69,
                    hash_repetition_plus0: 70,
                    hashSegment: 71,
                    ID: 72,
                    EQUALS: 73,
                    blockParams: 74,
                    OPEN_BLOCK_PARAMS: 75,
                    blockParams_repetition_plus0: 76,
                    CLOSE_BLOCK_PARAMS: 77,
                    path: 78,
                    dataName: 79,
                    STRING: 80,
                    NUMBER: 81,
                    BOOLEAN: 82,
                    UNDEFINED: 83,
                    NULL: 84,
                    DATA: 85,
                    pathSegments: 86,
                    SEP: 87,
                    $accept: 0,
                    $end: 1
                },
                terminals_: {
                    2: "error",
                    5: "EOF",
                    14: "COMMENT",
                    15: "CONTENT",
                    18: "END_RAW_BLOCK",
                    19: "OPEN_RAW_BLOCK",
                    23: "CLOSE_RAW_BLOCK",
                    29: "OPEN_BLOCK",
                    33: "CLOSE",
                    34: "OPEN_INVERSE",
                    39: "OPEN_INVERSE_CHAIN",
                    44: "INVERSE",
                    47: "OPEN_ENDBLOCK",
                    48: "OPEN",
                    51: "OPEN_UNESCAPED",
                    54: "CLOSE_UNESCAPED",
                    55: "OPEN_PARTIAL",
                    60: "OPEN_PARTIAL_BLOCK",
                    65: "OPEN_SEXPR",
                    68: "CLOSE_SEXPR",
                    72: "ID",
                    73: "EQUALS",
                    75: "OPEN_BLOCK_PARAMS",
                    77: "CLOSE_BLOCK_PARAMS",
                    80: "STRING",
                    81: "NUMBER",
                    82: "BOOLEAN",
                    83: "UNDEFINED",
                    84: "NULL",
                    85: "DATA",
                    87: "SEP"
                },
                productions_: [ 0, [ 3, 2 ], [ 4, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 13, 1 ], [ 10, 3 ], [ 16, 5 ], [ 9, 4 ], [ 9, 4 ], [ 24, 6 ], [ 27, 6 ], [ 38, 6 ], [ 43, 2 ], [ 45, 3 ], [ 45, 1 ], [ 26, 3 ], [ 8, 5 ], [ 8, 5 ], [ 11, 5 ], [ 12, 3 ], [ 59, 5 ], [ 63, 1 ], [ 63, 1 ], [ 64, 5 ], [ 69, 1 ], [ 71, 3 ], [ 74, 3 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 56, 1 ], [ 56, 1 ], [ 79, 2 ], [ 78, 1 ], [ 86, 3 ], [ 86, 1 ], [ 6, 0 ], [ 6, 2 ], [ 17, 0 ], [ 17, 2 ], [ 21, 0 ], [ 21, 2 ], [ 22, 0 ], [ 22, 1 ], [ 25, 0 ], [ 25, 1 ], [ 28, 0 ], [ 28, 1 ], [ 30, 0 ], [ 30, 2 ], [ 31, 0 ], [ 31, 1 ], [ 32, 0 ], [ 32, 1 ], [ 35, 0 ], [ 35, 2 ], [ 36, 0 ], [ 36, 1 ], [ 37, 0 ], [ 37, 1 ], [ 40, 0 ], [ 40, 2 ], [ 41, 0 ], [ 41, 1 ], [ 42, 0 ], [ 42, 1 ], [ 46, 0 ], [ 46, 1 ], [ 49, 0 ], [ 49, 2 ], [ 50, 0 ], [ 50, 1 ], [ 52, 0 ], [ 52, 2 ], [ 53, 0 ], [ 53, 1 ], [ 57, 0 ], [ 57, 2 ], [ 58, 0 ], [ 58, 1 ], [ 61, 0 ], [ 61, 2 ], [ 62, 0 ], [ 62, 1 ], [ 66, 0 ], [ 66, 2 ], [ 67, 0 ], [ 67, 1 ], [ 70, 1 ], [ 70, 2 ], [ 76, 1 ], [ 76, 2 ] ],
                performAction: function e(t, n, r, s, i, o, a) {
                    var l = o.length - 1;
                    switch (i) {
                      case 1:
                        return o[l - 1];
                        break;

                      case 2:
                        this.$ = s.prepareProgram(o[l]);
                        break;

                      case 3:
                        this.$ = o[l];
                        break;

                      case 4:
                        this.$ = o[l];
                        break;

                      case 5:
                        this.$ = o[l];
                        break;

                      case 6:
                        this.$ = o[l];
                        break;

                      case 7:
                        this.$ = o[l];
                        break;

                      case 8:
                        this.$ = o[l];
                        break;

                      case 9:
                        this.$ = {
                            type: "CommentStatement",
                            value: s.stripComment(o[l]),
                            strip: s.stripFlags(o[l], o[l]),
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 10:
                        this.$ = {
                            type: "ContentStatement",
                            original: o[l],
                            value: o[l],
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 11:
                        this.$ = s.prepareRawBlock(o[l - 2], o[l - 1], o[l], this._$);
                        break;

                      case 12:
                        this.$ = {
                            path: o[l - 3],
                            params: o[l - 2],
                            hash: o[l - 1]
                        };
                        break;

                      case 13:
                        this.$ = s.prepareBlock(o[l - 3], o[l - 2], o[l - 1], o[l], false, this._$);
                        break;

                      case 14:
                        this.$ = s.prepareBlock(o[l - 3], o[l - 2], o[l - 1], o[l], true, this._$);
                        break;

                      case 15:
                        this.$ = {
                            open: o[l - 5],
                            path: o[l - 4],
                            params: o[l - 3],
                            hash: o[l - 2],
                            blockParams: o[l - 1],
                            strip: s.stripFlags(o[l - 5], o[l])
                        };
                        break;

                      case 16:
                        this.$ = {
                            path: o[l - 4],
                            params: o[l - 3],
                            hash: o[l - 2],
                            blockParams: o[l - 1],
                            strip: s.stripFlags(o[l - 5], o[l])
                        };
                        break;

                      case 17:
                        this.$ = {
                            path: o[l - 4],
                            params: o[l - 3],
                            hash: o[l - 2],
                            blockParams: o[l - 1],
                            strip: s.stripFlags(o[l - 5], o[l])
                        };
                        break;

                      case 18:
                        this.$ = {
                            strip: s.stripFlags(o[l - 1], o[l - 1]),
                            program: o[l]
                        };
                        break;

                      case 19:
                        var c = s.prepareBlock(o[l - 2], o[l - 1], o[l], o[l], false, this._$), u = s.prepareProgram([ c ], o[l - 1].loc);
                        u.chained = true;
                        this.$ = {
                            strip: o[l - 2].strip,
                            program: u,
                            chain: true
                        };
                        break;

                      case 20:
                        this.$ = o[l];
                        break;

                      case 21:
                        this.$ = {
                            path: o[l - 1],
                            strip: s.stripFlags(o[l - 2], o[l])
                        };
                        break;

                      case 22:
                        this.$ = s.prepareMustache(o[l - 3], o[l - 2], o[l - 1], o[l - 4], s.stripFlags(o[l - 4], o[l]), this._$);
                        break;

                      case 23:
                        this.$ = s.prepareMustache(o[l - 3], o[l - 2], o[l - 1], o[l - 4], s.stripFlags(o[l - 4], o[l]), this._$);
                        break;

                      case 24:
                        this.$ = {
                            type: "PartialStatement",
                            name: o[l - 3],
                            params: o[l - 2],
                            hash: o[l - 1],
                            indent: "",
                            strip: s.stripFlags(o[l - 4], o[l]),
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 25:
                        this.$ = s.preparePartialBlock(o[l - 2], o[l - 1], o[l], this._$);
                        break;

                      case 26:
                        this.$ = {
                            path: o[l - 3],
                            params: o[l - 2],
                            hash: o[l - 1],
                            strip: s.stripFlags(o[l - 4], o[l])
                        };
                        break;

                      case 27:
                        this.$ = o[l];
                        break;

                      case 28:
                        this.$ = o[l];
                        break;

                      case 29:
                        this.$ = {
                            type: "SubExpression",
                            path: o[l - 3],
                            params: o[l - 2],
                            hash: o[l - 1],
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 30:
                        this.$ = {
                            type: "Hash",
                            pairs: o[l],
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 31:
                        this.$ = {
                            type: "HashPair",
                            key: s.id(o[l - 2]),
                            value: o[l],
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 32:
                        this.$ = s.id(o[l - 1]);
                        break;

                      case 33:
                        this.$ = o[l];
                        break;

                      case 34:
                        this.$ = o[l];
                        break;

                      case 35:
                        this.$ = {
                            type: "StringLiteral",
                            value: o[l],
                            original: o[l],
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 36:
                        this.$ = {
                            type: "NumberLiteral",
                            value: Number(o[l]),
                            original: Number(o[l]),
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 37:
                        this.$ = {
                            type: "BooleanLiteral",
                            value: o[l] === "true",
                            original: o[l] === "true",
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 38:
                        this.$ = {
                            type: "UndefinedLiteral",
                            original: undefined,
                            value: undefined,
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 39:
                        this.$ = {
                            type: "NullLiteral",
                            original: null,
                            value: null,
                            loc: s.locInfo(this._$)
                        };
                        break;

                      case 40:
                        this.$ = o[l];
                        break;

                      case 41:
                        this.$ = o[l];
                        break;

                      case 42:
                        this.$ = s.preparePath(true, o[l], this._$);
                        break;

                      case 43:
                        this.$ = s.preparePath(false, o[l], this._$);
                        break;

                      case 44:
                        o[l - 2].push({
                            part: s.id(o[l]),
                            original: o[l],
                            separator: o[l - 1]
                        });
                        this.$ = o[l - 2];
                        break;

                      case 45:
                        this.$ = [ {
                            part: s.id(o[l]),
                            original: o[l]
                        } ];
                        break;

                      case 46:
                        this.$ = [];
                        break;

                      case 47:
                        o[l - 1].push(o[l]);
                        break;

                      case 48:
                        this.$ = [];
                        break;

                      case 49:
                        o[l - 1].push(o[l]);
                        break;

                      case 50:
                        this.$ = [];
                        break;

                      case 51:
                        o[l - 1].push(o[l]);
                        break;

                      case 58:
                        this.$ = [];
                        break;

                      case 59:
                        o[l - 1].push(o[l]);
                        break;

                      case 64:
                        this.$ = [];
                        break;

                      case 65:
                        o[l - 1].push(o[l]);
                        break;

                      case 70:
                        this.$ = [];
                        break;

                      case 71:
                        o[l - 1].push(o[l]);
                        break;

                      case 78:
                        this.$ = [];
                        break;

                      case 79:
                        o[l - 1].push(o[l]);
                        break;

                      case 82:
                        this.$ = [];
                        break;

                      case 83:
                        o[l - 1].push(o[l]);
                        break;

                      case 86:
                        this.$ = [];
                        break;

                      case 87:
                        o[l - 1].push(o[l]);
                        break;

                      case 90:
                        this.$ = [];
                        break;

                      case 91:
                        o[l - 1].push(o[l]);
                        break;

                      case 94:
                        this.$ = [];
                        break;

                      case 95:
                        o[l - 1].push(o[l]);
                        break;

                      case 98:
                        this.$ = [ o[l] ];
                        break;

                      case 99:
                        o[l - 1].push(o[l]);
                        break;

                      case 100:
                        this.$ = [ o[l] ];
                        break;

                      case 101:
                        o[l - 1].push(o[l]);
                        break;
                    }
                },
                table: [ {
                    3: 1,
                    4: 2,
                    5: [ 2, 46 ],
                    6: 3,
                    14: [ 2, 46 ],
                    15: [ 2, 46 ],
                    19: [ 2, 46 ],
                    29: [ 2, 46 ],
                    34: [ 2, 46 ],
                    48: [ 2, 46 ],
                    51: [ 2, 46 ],
                    55: [ 2, 46 ],
                    60: [ 2, 46 ]
                }, {
                    1: [ 3 ]
                }, {
                    5: [ 1, 4 ]
                }, {
                    5: [ 2, 2 ],
                    7: 5,
                    8: 6,
                    9: 7,
                    10: 8,
                    11: 9,
                    12: 10,
                    13: 11,
                    14: [ 1, 12 ],
                    15: [ 1, 20 ],
                    16: 17,
                    19: [ 1, 23 ],
                    24: 15,
                    27: 16,
                    29: [ 1, 21 ],
                    34: [ 1, 22 ],
                    39: [ 2, 2 ],
                    44: [ 2, 2 ],
                    47: [ 2, 2 ],
                    48: [ 1, 13 ],
                    51: [ 1, 14 ],
                    55: [ 1, 18 ],
                    59: 19,
                    60: [ 1, 24 ]
                }, {
                    1: [ 2, 1 ]
                }, {
                    5: [ 2, 47 ],
                    14: [ 2, 47 ],
                    15: [ 2, 47 ],
                    19: [ 2, 47 ],
                    29: [ 2, 47 ],
                    34: [ 2, 47 ],
                    39: [ 2, 47 ],
                    44: [ 2, 47 ],
                    47: [ 2, 47 ],
                    48: [ 2, 47 ],
                    51: [ 2, 47 ],
                    55: [ 2, 47 ],
                    60: [ 2, 47 ]
                }, {
                    5: [ 2, 3 ],
                    14: [ 2, 3 ],
                    15: [ 2, 3 ],
                    19: [ 2, 3 ],
                    29: [ 2, 3 ],
                    34: [ 2, 3 ],
                    39: [ 2, 3 ],
                    44: [ 2, 3 ],
                    47: [ 2, 3 ],
                    48: [ 2, 3 ],
                    51: [ 2, 3 ],
                    55: [ 2, 3 ],
                    60: [ 2, 3 ]
                }, {
                    5: [ 2, 4 ],
                    14: [ 2, 4 ],
                    15: [ 2, 4 ],
                    19: [ 2, 4 ],
                    29: [ 2, 4 ],
                    34: [ 2, 4 ],
                    39: [ 2, 4 ],
                    44: [ 2, 4 ],
                    47: [ 2, 4 ],
                    48: [ 2, 4 ],
                    51: [ 2, 4 ],
                    55: [ 2, 4 ],
                    60: [ 2, 4 ]
                }, {
                    5: [ 2, 5 ],
                    14: [ 2, 5 ],
                    15: [ 2, 5 ],
                    19: [ 2, 5 ],
                    29: [ 2, 5 ],
                    34: [ 2, 5 ],
                    39: [ 2, 5 ],
                    44: [ 2, 5 ],
                    47: [ 2, 5 ],
                    48: [ 2, 5 ],
                    51: [ 2, 5 ],
                    55: [ 2, 5 ],
                    60: [ 2, 5 ]
                }, {
                    5: [ 2, 6 ],
                    14: [ 2, 6 ],
                    15: [ 2, 6 ],
                    19: [ 2, 6 ],
                    29: [ 2, 6 ],
                    34: [ 2, 6 ],
                    39: [ 2, 6 ],
                    44: [ 2, 6 ],
                    47: [ 2, 6 ],
                    48: [ 2, 6 ],
                    51: [ 2, 6 ],
                    55: [ 2, 6 ],
                    60: [ 2, 6 ]
                }, {
                    5: [ 2, 7 ],
                    14: [ 2, 7 ],
                    15: [ 2, 7 ],
                    19: [ 2, 7 ],
                    29: [ 2, 7 ],
                    34: [ 2, 7 ],
                    39: [ 2, 7 ],
                    44: [ 2, 7 ],
                    47: [ 2, 7 ],
                    48: [ 2, 7 ],
                    51: [ 2, 7 ],
                    55: [ 2, 7 ],
                    60: [ 2, 7 ]
                }, {
                    5: [ 2, 8 ],
                    14: [ 2, 8 ],
                    15: [ 2, 8 ],
                    19: [ 2, 8 ],
                    29: [ 2, 8 ],
                    34: [ 2, 8 ],
                    39: [ 2, 8 ],
                    44: [ 2, 8 ],
                    47: [ 2, 8 ],
                    48: [ 2, 8 ],
                    51: [ 2, 8 ],
                    55: [ 2, 8 ],
                    60: [ 2, 8 ]
                }, {
                    5: [ 2, 9 ],
                    14: [ 2, 9 ],
                    15: [ 2, 9 ],
                    19: [ 2, 9 ],
                    29: [ 2, 9 ],
                    34: [ 2, 9 ],
                    39: [ 2, 9 ],
                    44: [ 2, 9 ],
                    47: [ 2, 9 ],
                    48: [ 2, 9 ],
                    51: [ 2, 9 ],
                    55: [ 2, 9 ],
                    60: [ 2, 9 ]
                }, {
                    20: 25,
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    20: 36,
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    4: 37,
                    6: 3,
                    14: [ 2, 46 ],
                    15: [ 2, 46 ],
                    19: [ 2, 46 ],
                    29: [ 2, 46 ],
                    34: [ 2, 46 ],
                    39: [ 2, 46 ],
                    44: [ 2, 46 ],
                    47: [ 2, 46 ],
                    48: [ 2, 46 ],
                    51: [ 2, 46 ],
                    55: [ 2, 46 ],
                    60: [ 2, 46 ]
                }, {
                    4: 38,
                    6: 3,
                    14: [ 2, 46 ],
                    15: [ 2, 46 ],
                    19: [ 2, 46 ],
                    29: [ 2, 46 ],
                    34: [ 2, 46 ],
                    44: [ 2, 46 ],
                    47: [ 2, 46 ],
                    48: [ 2, 46 ],
                    51: [ 2, 46 ],
                    55: [ 2, 46 ],
                    60: [ 2, 46 ]
                }, {
                    15: [ 2, 48 ],
                    17: 39,
                    18: [ 2, 48 ]
                }, {
                    20: 41,
                    56: 40,
                    64: 42,
                    65: [ 1, 43 ],
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    4: 44,
                    6: 3,
                    14: [ 2, 46 ],
                    15: [ 2, 46 ],
                    19: [ 2, 46 ],
                    29: [ 2, 46 ],
                    34: [ 2, 46 ],
                    47: [ 2, 46 ],
                    48: [ 2, 46 ],
                    51: [ 2, 46 ],
                    55: [ 2, 46 ],
                    60: [ 2, 46 ]
                }, {
                    5: [ 2, 10 ],
                    14: [ 2, 10 ],
                    15: [ 2, 10 ],
                    18: [ 2, 10 ],
                    19: [ 2, 10 ],
                    29: [ 2, 10 ],
                    34: [ 2, 10 ],
                    39: [ 2, 10 ],
                    44: [ 2, 10 ],
                    47: [ 2, 10 ],
                    48: [ 2, 10 ],
                    51: [ 2, 10 ],
                    55: [ 2, 10 ],
                    60: [ 2, 10 ]
                }, {
                    20: 45,
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    20: 46,
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    20: 47,
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    20: 41,
                    56: 48,
                    64: 42,
                    65: [ 1, 43 ],
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    33: [ 2, 78 ],
                    49: 49,
                    65: [ 2, 78 ],
                    72: [ 2, 78 ],
                    80: [ 2, 78 ],
                    81: [ 2, 78 ],
                    82: [ 2, 78 ],
                    83: [ 2, 78 ],
                    84: [ 2, 78 ],
                    85: [ 2, 78 ]
                }, {
                    23: [ 2, 33 ],
                    33: [ 2, 33 ],
                    54: [ 2, 33 ],
                    65: [ 2, 33 ],
                    68: [ 2, 33 ],
                    72: [ 2, 33 ],
                    75: [ 2, 33 ],
                    80: [ 2, 33 ],
                    81: [ 2, 33 ],
                    82: [ 2, 33 ],
                    83: [ 2, 33 ],
                    84: [ 2, 33 ],
                    85: [ 2, 33 ]
                }, {
                    23: [ 2, 34 ],
                    33: [ 2, 34 ],
                    54: [ 2, 34 ],
                    65: [ 2, 34 ],
                    68: [ 2, 34 ],
                    72: [ 2, 34 ],
                    75: [ 2, 34 ],
                    80: [ 2, 34 ],
                    81: [ 2, 34 ],
                    82: [ 2, 34 ],
                    83: [ 2, 34 ],
                    84: [ 2, 34 ],
                    85: [ 2, 34 ]
                }, {
                    23: [ 2, 35 ],
                    33: [ 2, 35 ],
                    54: [ 2, 35 ],
                    65: [ 2, 35 ],
                    68: [ 2, 35 ],
                    72: [ 2, 35 ],
                    75: [ 2, 35 ],
                    80: [ 2, 35 ],
                    81: [ 2, 35 ],
                    82: [ 2, 35 ],
                    83: [ 2, 35 ],
                    84: [ 2, 35 ],
                    85: [ 2, 35 ]
                }, {
                    23: [ 2, 36 ],
                    33: [ 2, 36 ],
                    54: [ 2, 36 ],
                    65: [ 2, 36 ],
                    68: [ 2, 36 ],
                    72: [ 2, 36 ],
                    75: [ 2, 36 ],
                    80: [ 2, 36 ],
                    81: [ 2, 36 ],
                    82: [ 2, 36 ],
                    83: [ 2, 36 ],
                    84: [ 2, 36 ],
                    85: [ 2, 36 ]
                }, {
                    23: [ 2, 37 ],
                    33: [ 2, 37 ],
                    54: [ 2, 37 ],
                    65: [ 2, 37 ],
                    68: [ 2, 37 ],
                    72: [ 2, 37 ],
                    75: [ 2, 37 ],
                    80: [ 2, 37 ],
                    81: [ 2, 37 ],
                    82: [ 2, 37 ],
                    83: [ 2, 37 ],
                    84: [ 2, 37 ],
                    85: [ 2, 37 ]
                }, {
                    23: [ 2, 38 ],
                    33: [ 2, 38 ],
                    54: [ 2, 38 ],
                    65: [ 2, 38 ],
                    68: [ 2, 38 ],
                    72: [ 2, 38 ],
                    75: [ 2, 38 ],
                    80: [ 2, 38 ],
                    81: [ 2, 38 ],
                    82: [ 2, 38 ],
                    83: [ 2, 38 ],
                    84: [ 2, 38 ],
                    85: [ 2, 38 ]
                }, {
                    23: [ 2, 39 ],
                    33: [ 2, 39 ],
                    54: [ 2, 39 ],
                    65: [ 2, 39 ],
                    68: [ 2, 39 ],
                    72: [ 2, 39 ],
                    75: [ 2, 39 ],
                    80: [ 2, 39 ],
                    81: [ 2, 39 ],
                    82: [ 2, 39 ],
                    83: [ 2, 39 ],
                    84: [ 2, 39 ],
                    85: [ 2, 39 ]
                }, {
                    23: [ 2, 43 ],
                    33: [ 2, 43 ],
                    54: [ 2, 43 ],
                    65: [ 2, 43 ],
                    68: [ 2, 43 ],
                    72: [ 2, 43 ],
                    75: [ 2, 43 ],
                    80: [ 2, 43 ],
                    81: [ 2, 43 ],
                    82: [ 2, 43 ],
                    83: [ 2, 43 ],
                    84: [ 2, 43 ],
                    85: [ 2, 43 ],
                    87: [ 1, 50 ]
                }, {
                    72: [ 1, 35 ],
                    86: 51
                }, {
                    23: [ 2, 45 ],
                    33: [ 2, 45 ],
                    54: [ 2, 45 ],
                    65: [ 2, 45 ],
                    68: [ 2, 45 ],
                    72: [ 2, 45 ],
                    75: [ 2, 45 ],
                    80: [ 2, 45 ],
                    81: [ 2, 45 ],
                    82: [ 2, 45 ],
                    83: [ 2, 45 ],
                    84: [ 2, 45 ],
                    85: [ 2, 45 ],
                    87: [ 2, 45 ]
                }, {
                    52: 52,
                    54: [ 2, 82 ],
                    65: [ 2, 82 ],
                    72: [ 2, 82 ],
                    80: [ 2, 82 ],
                    81: [ 2, 82 ],
                    82: [ 2, 82 ],
                    83: [ 2, 82 ],
                    84: [ 2, 82 ],
                    85: [ 2, 82 ]
                }, {
                    25: 53,
                    38: 55,
                    39: [ 1, 57 ],
                    43: 56,
                    44: [ 1, 58 ],
                    45: 54,
                    47: [ 2, 54 ]
                }, {
                    28: 59,
                    43: 60,
                    44: [ 1, 58 ],
                    47: [ 2, 56 ]
                }, {
                    13: 62,
                    15: [ 1, 20 ],
                    18: [ 1, 61 ]
                }, {
                    33: [ 2, 86 ],
                    57: 63,
                    65: [ 2, 86 ],
                    72: [ 2, 86 ],
                    80: [ 2, 86 ],
                    81: [ 2, 86 ],
                    82: [ 2, 86 ],
                    83: [ 2, 86 ],
                    84: [ 2, 86 ],
                    85: [ 2, 86 ]
                }, {
                    33: [ 2, 40 ],
                    65: [ 2, 40 ],
                    72: [ 2, 40 ],
                    80: [ 2, 40 ],
                    81: [ 2, 40 ],
                    82: [ 2, 40 ],
                    83: [ 2, 40 ],
                    84: [ 2, 40 ],
                    85: [ 2, 40 ]
                }, {
                    33: [ 2, 41 ],
                    65: [ 2, 41 ],
                    72: [ 2, 41 ],
                    80: [ 2, 41 ],
                    81: [ 2, 41 ],
                    82: [ 2, 41 ],
                    83: [ 2, 41 ],
                    84: [ 2, 41 ],
                    85: [ 2, 41 ]
                }, {
                    20: 64,
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    26: 65,
                    47: [ 1, 66 ]
                }, {
                    30: 67,
                    33: [ 2, 58 ],
                    65: [ 2, 58 ],
                    72: [ 2, 58 ],
                    75: [ 2, 58 ],
                    80: [ 2, 58 ],
                    81: [ 2, 58 ],
                    82: [ 2, 58 ],
                    83: [ 2, 58 ],
                    84: [ 2, 58 ],
                    85: [ 2, 58 ]
                }, {
                    33: [ 2, 64 ],
                    35: 68,
                    65: [ 2, 64 ],
                    72: [ 2, 64 ],
                    75: [ 2, 64 ],
                    80: [ 2, 64 ],
                    81: [ 2, 64 ],
                    82: [ 2, 64 ],
                    83: [ 2, 64 ],
                    84: [ 2, 64 ],
                    85: [ 2, 64 ]
                }, {
                    21: 69,
                    23: [ 2, 50 ],
                    65: [ 2, 50 ],
                    72: [ 2, 50 ],
                    80: [ 2, 50 ],
                    81: [ 2, 50 ],
                    82: [ 2, 50 ],
                    83: [ 2, 50 ],
                    84: [ 2, 50 ],
                    85: [ 2, 50 ]
                }, {
                    33: [ 2, 90 ],
                    61: 70,
                    65: [ 2, 90 ],
                    72: [ 2, 90 ],
                    80: [ 2, 90 ],
                    81: [ 2, 90 ],
                    82: [ 2, 90 ],
                    83: [ 2, 90 ],
                    84: [ 2, 90 ],
                    85: [ 2, 90 ]
                }, {
                    20: 74,
                    33: [ 2, 80 ],
                    50: 71,
                    63: 72,
                    64: 75,
                    65: [ 1, 43 ],
                    69: 73,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    72: [ 1, 79 ]
                }, {
                    23: [ 2, 42 ],
                    33: [ 2, 42 ],
                    54: [ 2, 42 ],
                    65: [ 2, 42 ],
                    68: [ 2, 42 ],
                    72: [ 2, 42 ],
                    75: [ 2, 42 ],
                    80: [ 2, 42 ],
                    81: [ 2, 42 ],
                    82: [ 2, 42 ],
                    83: [ 2, 42 ],
                    84: [ 2, 42 ],
                    85: [ 2, 42 ],
                    87: [ 1, 50 ]
                }, {
                    20: 74,
                    53: 80,
                    54: [ 2, 84 ],
                    63: 81,
                    64: 75,
                    65: [ 1, 43 ],
                    69: 82,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    26: 83,
                    47: [ 1, 66 ]
                }, {
                    47: [ 2, 55 ]
                }, {
                    4: 84,
                    6: 3,
                    14: [ 2, 46 ],
                    15: [ 2, 46 ],
                    19: [ 2, 46 ],
                    29: [ 2, 46 ],
                    34: [ 2, 46 ],
                    39: [ 2, 46 ],
                    44: [ 2, 46 ],
                    47: [ 2, 46 ],
                    48: [ 2, 46 ],
                    51: [ 2, 46 ],
                    55: [ 2, 46 ],
                    60: [ 2, 46 ]
                }, {
                    47: [ 2, 20 ]
                }, {
                    20: 85,
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    4: 86,
                    6: 3,
                    14: [ 2, 46 ],
                    15: [ 2, 46 ],
                    19: [ 2, 46 ],
                    29: [ 2, 46 ],
                    34: [ 2, 46 ],
                    47: [ 2, 46 ],
                    48: [ 2, 46 ],
                    51: [ 2, 46 ],
                    55: [ 2, 46 ],
                    60: [ 2, 46 ]
                }, {
                    26: 87,
                    47: [ 1, 66 ]
                }, {
                    47: [ 2, 57 ]
                }, {
                    5: [ 2, 11 ],
                    14: [ 2, 11 ],
                    15: [ 2, 11 ],
                    19: [ 2, 11 ],
                    29: [ 2, 11 ],
                    34: [ 2, 11 ],
                    39: [ 2, 11 ],
                    44: [ 2, 11 ],
                    47: [ 2, 11 ],
                    48: [ 2, 11 ],
                    51: [ 2, 11 ],
                    55: [ 2, 11 ],
                    60: [ 2, 11 ]
                }, {
                    15: [ 2, 49 ],
                    18: [ 2, 49 ]
                }, {
                    20: 74,
                    33: [ 2, 88 ],
                    58: 88,
                    63: 89,
                    64: 75,
                    65: [ 1, 43 ],
                    69: 90,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    65: [ 2, 94 ],
                    66: 91,
                    68: [ 2, 94 ],
                    72: [ 2, 94 ],
                    80: [ 2, 94 ],
                    81: [ 2, 94 ],
                    82: [ 2, 94 ],
                    83: [ 2, 94 ],
                    84: [ 2, 94 ],
                    85: [ 2, 94 ]
                }, {
                    5: [ 2, 25 ],
                    14: [ 2, 25 ],
                    15: [ 2, 25 ],
                    19: [ 2, 25 ],
                    29: [ 2, 25 ],
                    34: [ 2, 25 ],
                    39: [ 2, 25 ],
                    44: [ 2, 25 ],
                    47: [ 2, 25 ],
                    48: [ 2, 25 ],
                    51: [ 2, 25 ],
                    55: [ 2, 25 ],
                    60: [ 2, 25 ]
                }, {
                    20: 92,
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    20: 74,
                    31: 93,
                    33: [ 2, 60 ],
                    63: 94,
                    64: 75,
                    65: [ 1, 43 ],
                    69: 95,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    75: [ 2, 60 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    20: 74,
                    33: [ 2, 66 ],
                    36: 96,
                    63: 97,
                    64: 75,
                    65: [ 1, 43 ],
                    69: 98,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    75: [ 2, 66 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    20: 74,
                    22: 99,
                    23: [ 2, 52 ],
                    63: 100,
                    64: 75,
                    65: [ 1, 43 ],
                    69: 101,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    20: 74,
                    33: [ 2, 92 ],
                    62: 102,
                    63: 103,
                    64: 75,
                    65: [ 1, 43 ],
                    69: 104,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    33: [ 1, 105 ]
                }, {
                    33: [ 2, 79 ],
                    65: [ 2, 79 ],
                    72: [ 2, 79 ],
                    80: [ 2, 79 ],
                    81: [ 2, 79 ],
                    82: [ 2, 79 ],
                    83: [ 2, 79 ],
                    84: [ 2, 79 ],
                    85: [ 2, 79 ]
                }, {
                    33: [ 2, 81 ]
                }, {
                    23: [ 2, 27 ],
                    33: [ 2, 27 ],
                    54: [ 2, 27 ],
                    65: [ 2, 27 ],
                    68: [ 2, 27 ],
                    72: [ 2, 27 ],
                    75: [ 2, 27 ],
                    80: [ 2, 27 ],
                    81: [ 2, 27 ],
                    82: [ 2, 27 ],
                    83: [ 2, 27 ],
                    84: [ 2, 27 ],
                    85: [ 2, 27 ]
                }, {
                    23: [ 2, 28 ],
                    33: [ 2, 28 ],
                    54: [ 2, 28 ],
                    65: [ 2, 28 ],
                    68: [ 2, 28 ],
                    72: [ 2, 28 ],
                    75: [ 2, 28 ],
                    80: [ 2, 28 ],
                    81: [ 2, 28 ],
                    82: [ 2, 28 ],
                    83: [ 2, 28 ],
                    84: [ 2, 28 ],
                    85: [ 2, 28 ]
                }, {
                    23: [ 2, 30 ],
                    33: [ 2, 30 ],
                    54: [ 2, 30 ],
                    68: [ 2, 30 ],
                    71: 106,
                    72: [ 1, 107 ],
                    75: [ 2, 30 ]
                }, {
                    23: [ 2, 98 ],
                    33: [ 2, 98 ],
                    54: [ 2, 98 ],
                    68: [ 2, 98 ],
                    72: [ 2, 98 ],
                    75: [ 2, 98 ]
                }, {
                    23: [ 2, 45 ],
                    33: [ 2, 45 ],
                    54: [ 2, 45 ],
                    65: [ 2, 45 ],
                    68: [ 2, 45 ],
                    72: [ 2, 45 ],
                    73: [ 1, 108 ],
                    75: [ 2, 45 ],
                    80: [ 2, 45 ],
                    81: [ 2, 45 ],
                    82: [ 2, 45 ],
                    83: [ 2, 45 ],
                    84: [ 2, 45 ],
                    85: [ 2, 45 ],
                    87: [ 2, 45 ]
                }, {
                    23: [ 2, 44 ],
                    33: [ 2, 44 ],
                    54: [ 2, 44 ],
                    65: [ 2, 44 ],
                    68: [ 2, 44 ],
                    72: [ 2, 44 ],
                    75: [ 2, 44 ],
                    80: [ 2, 44 ],
                    81: [ 2, 44 ],
                    82: [ 2, 44 ],
                    83: [ 2, 44 ],
                    84: [ 2, 44 ],
                    85: [ 2, 44 ],
                    87: [ 2, 44 ]
                }, {
                    54: [ 1, 109 ]
                }, {
                    54: [ 2, 83 ],
                    65: [ 2, 83 ],
                    72: [ 2, 83 ],
                    80: [ 2, 83 ],
                    81: [ 2, 83 ],
                    82: [ 2, 83 ],
                    83: [ 2, 83 ],
                    84: [ 2, 83 ],
                    85: [ 2, 83 ]
                }, {
                    54: [ 2, 85 ]
                }, {
                    5: [ 2, 13 ],
                    14: [ 2, 13 ],
                    15: [ 2, 13 ],
                    19: [ 2, 13 ],
                    29: [ 2, 13 ],
                    34: [ 2, 13 ],
                    39: [ 2, 13 ],
                    44: [ 2, 13 ],
                    47: [ 2, 13 ],
                    48: [ 2, 13 ],
                    51: [ 2, 13 ],
                    55: [ 2, 13 ],
                    60: [ 2, 13 ]
                }, {
                    38: 55,
                    39: [ 1, 57 ],
                    43: 56,
                    44: [ 1, 58 ],
                    45: 111,
                    46: 110,
                    47: [ 2, 76 ]
                }, {
                    33: [ 2, 70 ],
                    40: 112,
                    65: [ 2, 70 ],
                    72: [ 2, 70 ],
                    75: [ 2, 70 ],
                    80: [ 2, 70 ],
                    81: [ 2, 70 ],
                    82: [ 2, 70 ],
                    83: [ 2, 70 ],
                    84: [ 2, 70 ],
                    85: [ 2, 70 ]
                }, {
                    47: [ 2, 18 ]
                }, {
                    5: [ 2, 14 ],
                    14: [ 2, 14 ],
                    15: [ 2, 14 ],
                    19: [ 2, 14 ],
                    29: [ 2, 14 ],
                    34: [ 2, 14 ],
                    39: [ 2, 14 ],
                    44: [ 2, 14 ],
                    47: [ 2, 14 ],
                    48: [ 2, 14 ],
                    51: [ 2, 14 ],
                    55: [ 2, 14 ],
                    60: [ 2, 14 ]
                }, {
                    33: [ 1, 113 ]
                }, {
                    33: [ 2, 87 ],
                    65: [ 2, 87 ],
                    72: [ 2, 87 ],
                    80: [ 2, 87 ],
                    81: [ 2, 87 ],
                    82: [ 2, 87 ],
                    83: [ 2, 87 ],
                    84: [ 2, 87 ],
                    85: [ 2, 87 ]
                }, {
                    33: [ 2, 89 ]
                }, {
                    20: 74,
                    63: 115,
                    64: 75,
                    65: [ 1, 43 ],
                    67: 114,
                    68: [ 2, 96 ],
                    69: 116,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    33: [ 1, 117 ]
                }, {
                    32: 118,
                    33: [ 2, 62 ],
                    74: 119,
                    75: [ 1, 120 ]
                }, {
                    33: [ 2, 59 ],
                    65: [ 2, 59 ],
                    72: [ 2, 59 ],
                    75: [ 2, 59 ],
                    80: [ 2, 59 ],
                    81: [ 2, 59 ],
                    82: [ 2, 59 ],
                    83: [ 2, 59 ],
                    84: [ 2, 59 ],
                    85: [ 2, 59 ]
                }, {
                    33: [ 2, 61 ],
                    75: [ 2, 61 ]
                }, {
                    33: [ 2, 68 ],
                    37: 121,
                    74: 122,
                    75: [ 1, 120 ]
                }, {
                    33: [ 2, 65 ],
                    65: [ 2, 65 ],
                    72: [ 2, 65 ],
                    75: [ 2, 65 ],
                    80: [ 2, 65 ],
                    81: [ 2, 65 ],
                    82: [ 2, 65 ],
                    83: [ 2, 65 ],
                    84: [ 2, 65 ],
                    85: [ 2, 65 ]
                }, {
                    33: [ 2, 67 ],
                    75: [ 2, 67 ]
                }, {
                    23: [ 1, 123 ]
                }, {
                    23: [ 2, 51 ],
                    65: [ 2, 51 ],
                    72: [ 2, 51 ],
                    80: [ 2, 51 ],
                    81: [ 2, 51 ],
                    82: [ 2, 51 ],
                    83: [ 2, 51 ],
                    84: [ 2, 51 ],
                    85: [ 2, 51 ]
                }, {
                    23: [ 2, 53 ]
                }, {
                    33: [ 1, 124 ]
                }, {
                    33: [ 2, 91 ],
                    65: [ 2, 91 ],
                    72: [ 2, 91 ],
                    80: [ 2, 91 ],
                    81: [ 2, 91 ],
                    82: [ 2, 91 ],
                    83: [ 2, 91 ],
                    84: [ 2, 91 ],
                    85: [ 2, 91 ]
                }, {
                    33: [ 2, 93 ]
                }, {
                    5: [ 2, 22 ],
                    14: [ 2, 22 ],
                    15: [ 2, 22 ],
                    19: [ 2, 22 ],
                    29: [ 2, 22 ],
                    34: [ 2, 22 ],
                    39: [ 2, 22 ],
                    44: [ 2, 22 ],
                    47: [ 2, 22 ],
                    48: [ 2, 22 ],
                    51: [ 2, 22 ],
                    55: [ 2, 22 ],
                    60: [ 2, 22 ]
                }, {
                    23: [ 2, 99 ],
                    33: [ 2, 99 ],
                    54: [ 2, 99 ],
                    68: [ 2, 99 ],
                    72: [ 2, 99 ],
                    75: [ 2, 99 ]
                }, {
                    73: [ 1, 108 ]
                }, {
                    20: 74,
                    63: 125,
                    64: 75,
                    65: [ 1, 43 ],
                    72: [ 1, 35 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    5: [ 2, 23 ],
                    14: [ 2, 23 ],
                    15: [ 2, 23 ],
                    19: [ 2, 23 ],
                    29: [ 2, 23 ],
                    34: [ 2, 23 ],
                    39: [ 2, 23 ],
                    44: [ 2, 23 ],
                    47: [ 2, 23 ],
                    48: [ 2, 23 ],
                    51: [ 2, 23 ],
                    55: [ 2, 23 ],
                    60: [ 2, 23 ]
                }, {
                    47: [ 2, 19 ]
                }, {
                    47: [ 2, 77 ]
                }, {
                    20: 74,
                    33: [ 2, 72 ],
                    41: 126,
                    63: 127,
                    64: 75,
                    65: [ 1, 43 ],
                    69: 128,
                    70: 76,
                    71: 77,
                    72: [ 1, 78 ],
                    75: [ 2, 72 ],
                    78: 26,
                    79: 27,
                    80: [ 1, 28 ],
                    81: [ 1, 29 ],
                    82: [ 1, 30 ],
                    83: [ 1, 31 ],
                    84: [ 1, 32 ],
                    85: [ 1, 34 ],
                    86: 33
                }, {
                    5: [ 2, 24 ],
                    14: [ 2, 24 ],
                    15: [ 2, 24 ],
                    19: [ 2, 24 ],
                    29: [ 2, 24 ],
                    34: [ 2, 24 ],
                    39: [ 2, 24 ],
                    44: [ 2, 24 ],
                    47: [ 2, 24 ],
                    48: [ 2, 24 ],
                    51: [ 2, 24 ],
                    55: [ 2, 24 ],
                    60: [ 2, 24 ]
                }, {
                    68: [ 1, 129 ]
                }, {
                    65: [ 2, 95 ],
                    68: [ 2, 95 ],
                    72: [ 2, 95 ],
                    80: [ 2, 95 ],
                    81: [ 2, 95 ],
                    82: [ 2, 95 ],
                    83: [ 2, 95 ],
                    84: [ 2, 95 ],
                    85: [ 2, 95 ]
                }, {
                    68: [ 2, 97 ]
                }, {
                    5: [ 2, 21 ],
                    14: [ 2, 21 ],
                    15: [ 2, 21 ],
                    19: [ 2, 21 ],
                    29: [ 2, 21 ],
                    34: [ 2, 21 ],
                    39: [ 2, 21 ],
                    44: [ 2, 21 ],
                    47: [ 2, 21 ],
                    48: [ 2, 21 ],
                    51: [ 2, 21 ],
                    55: [ 2, 21 ],
                    60: [ 2, 21 ]
                }, {
                    33: [ 1, 130 ]
                }, {
                    33: [ 2, 63 ]
                }, {
                    72: [ 1, 132 ],
                    76: 131
                }, {
                    33: [ 1, 133 ]
                }, {
                    33: [ 2, 69 ]
                }, {
                    15: [ 2, 12 ],
                    18: [ 2, 12 ]
                }, {
                    14: [ 2, 26 ],
                    15: [ 2, 26 ],
                    19: [ 2, 26 ],
                    29: [ 2, 26 ],
                    34: [ 2, 26 ],
                    47: [ 2, 26 ],
                    48: [ 2, 26 ],
                    51: [ 2, 26 ],
                    55: [ 2, 26 ],
                    60: [ 2, 26 ]
                }, {
                    23: [ 2, 31 ],
                    33: [ 2, 31 ],
                    54: [ 2, 31 ],
                    68: [ 2, 31 ],
                    72: [ 2, 31 ],
                    75: [ 2, 31 ]
                }, {
                    33: [ 2, 74 ],
                    42: 134,
                    74: 135,
                    75: [ 1, 120 ]
                }, {
                    33: [ 2, 71 ],
                    65: [ 2, 71 ],
                    72: [ 2, 71 ],
                    75: [ 2, 71 ],
                    80: [ 2, 71 ],
                    81: [ 2, 71 ],
                    82: [ 2, 71 ],
                    83: [ 2, 71 ],
                    84: [ 2, 71 ],
                    85: [ 2, 71 ]
                }, {
                    33: [ 2, 73 ],
                    75: [ 2, 73 ]
                }, {
                    23: [ 2, 29 ],
                    33: [ 2, 29 ],
                    54: [ 2, 29 ],
                    65: [ 2, 29 ],
                    68: [ 2, 29 ],
                    72: [ 2, 29 ],
                    75: [ 2, 29 ],
                    80: [ 2, 29 ],
                    81: [ 2, 29 ],
                    82: [ 2, 29 ],
                    83: [ 2, 29 ],
                    84: [ 2, 29 ],
                    85: [ 2, 29 ]
                }, {
                    14: [ 2, 15 ],
                    15: [ 2, 15 ],
                    19: [ 2, 15 ],
                    29: [ 2, 15 ],
                    34: [ 2, 15 ],
                    39: [ 2, 15 ],
                    44: [ 2, 15 ],
                    47: [ 2, 15 ],
                    48: [ 2, 15 ],
                    51: [ 2, 15 ],
                    55: [ 2, 15 ],
                    60: [ 2, 15 ]
                }, {
                    72: [ 1, 137 ],
                    77: [ 1, 136 ]
                }, {
                    72: [ 2, 100 ],
                    77: [ 2, 100 ]
                }, {
                    14: [ 2, 16 ],
                    15: [ 2, 16 ],
                    19: [ 2, 16 ],
                    29: [ 2, 16 ],
                    34: [ 2, 16 ],
                    44: [ 2, 16 ],
                    47: [ 2, 16 ],
                    48: [ 2, 16 ],
                    51: [ 2, 16 ],
                    55: [ 2, 16 ],
                    60: [ 2, 16 ]
                }, {
                    33: [ 1, 138 ]
                }, {
                    33: [ 2, 75 ]
                }, {
                    33: [ 2, 32 ]
                }, {
                    72: [ 2, 101 ],
                    77: [ 2, 101 ]
                }, {
                    14: [ 2, 17 ],
                    15: [ 2, 17 ],
                    19: [ 2, 17 ],
                    29: [ 2, 17 ],
                    34: [ 2, 17 ],
                    39: [ 2, 17 ],
                    44: [ 2, 17 ],
                    47: [ 2, 17 ],
                    48: [ 2, 17 ],
                    51: [ 2, 17 ],
                    55: [ 2, 17 ],
                    60: [ 2, 17 ]
                } ],
                defaultActions: {
                    4: [ 2, 1 ],
                    54: [ 2, 55 ],
                    56: [ 2, 20 ],
                    60: [ 2, 57 ],
                    73: [ 2, 81 ],
                    82: [ 2, 85 ],
                    86: [ 2, 18 ],
                    90: [ 2, 89 ],
                    101: [ 2, 53 ],
                    104: [ 2, 93 ],
                    110: [ 2, 19 ],
                    111: [ 2, 77 ],
                    116: [ 2, 97 ],
                    119: [ 2, 63 ],
                    122: [ 2, 69 ],
                    135: [ 2, 75 ],
                    136: [ 2, 32 ]
                },
                parseError: function e(t, n) {
                    throw new Error(t);
                },
                parse: function e(t) {
                    var n = this, r = [ 0 ], s = [ null ], i = [], o = this.table, a = "", l = 0, c = 0, u = 0, f = 2, h = 1;
                    this.lexer.setInput(t);
                    this.lexer.yy = this.yy;
                    this.yy.lexer = this.lexer;
                    this.yy.parser = this;
                    if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
                    var p = this.lexer.yylloc;
                    i.push(p);
                    var d = this.lexer.options && this.lexer.options.ranges;
                    if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
                    function m(e) {
                        r.length = r.length - 2 * e;
                        s.length = s.length - e;
                        i.length = i.length - e;
                    }
                    function g() {
                        var e;
                        e = n.lexer.lex() || 1;
                        if (typeof e !== "number") {
                            e = n.symbols_[e] || e;
                        }
                        return e;
                    }
                    var v, y, b, E, x, w, S = {}, k, A, P, C;
                    while (true) {
                        b = r[r.length - 1];
                        if (this.defaultActions[b]) {
                            E = this.defaultActions[b];
                        } else {
                            if (v === null || typeof v == "undefined") {
                                v = g();
                            }
                            E = o[b] && o[b][v];
                        }
                        if (typeof E === "undefined" || !E.length || !E[0]) {
                            var O = "";
                            if (!u) {
                                C = [];
                                for (k in o[b]) if (this.terminals_[k] && k > 2) {
                                    C.push("'" + this.terminals_[k] + "'");
                                }
                                if (this.lexer.showPosition) {
                                    O = "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + C.join(", ") + ", got '" + (this.terminals_[v] || v) + "'";
                                } else {
                                    O = "Parse error on line " + (l + 1) + ": Unexpected " + (v == 1 ? "end of input" : "'" + (this.terminals_[v] || v) + "'");
                                }
                                this.parseError(O, {
                                    text: this.lexer.match,
                                    token: this.terminals_[v] || v,
                                    line: this.lexer.yylineno,
                                    loc: p,
                                    expected: C
                                });
                            }
                        }
                        if (E[0] instanceof Array && E.length > 1) {
                            throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + v);
                        }
                        switch (E[0]) {
                          case 1:
                            r.push(v);
                            s.push(this.lexer.yytext);
                            i.push(this.lexer.yylloc);
                            r.push(E[1]);
                            v = null;
                            if (!y) {
                                c = this.lexer.yyleng;
                                a = this.lexer.yytext;
                                l = this.lexer.yylineno;
                                p = this.lexer.yylloc;
                                if (u > 0) u--;
                            } else {
                                v = y;
                                y = null;
                            }
                            break;

                          case 2:
                            A = this.productions_[E[1]][1];
                            S.$ = s[s.length - A];
                            S._$ = {
                                first_line: i[i.length - (A || 1)].first_line,
                                last_line: i[i.length - 1].last_line,
                                first_column: i[i.length - (A || 1)].first_column,
                                last_column: i[i.length - 1].last_column
                            };
                            if (d) {
                                S._$.range = [ i[i.length - (A || 1)].range[0], i[i.length - 1].range[1] ];
                            }
                            w = this.performAction.call(S, a, c, l, this.yy, E[1], s, i);
                            if (typeof w !== "undefined") {
                                return w;
                            }
                            if (A) {
                                r = r.slice(0, -1 * A * 2);
                                s = s.slice(0, -1 * A);
                                i = i.slice(0, -1 * A);
                            }
                            r.push(this.productions_[E[1]][0]);
                            s.push(S.$);
                            i.push(S._$);
                            P = o[r[r.length - 2]][r[r.length - 1]];
                            r.push(P);
                            break;

                          case 3:
                            return true;
                        }
                    }
                    return true;
                }
            };
            var t = function() {
                var e = {
                    EOF: 1,
                    parseError: function e(t, n) {
                        if (this.yy.parser) {
                            this.yy.parser.parseError(t, n);
                        } else {
                            throw new Error(t);
                        }
                    },
                    setInput: function e(t) {
                        this._input = t;
                        this._more = this._less = this.done = false;
                        this.yylineno = this.yyleng = 0;
                        this.yytext = this.matched = this.match = "";
                        this.conditionStack = [ "INITIAL" ];
                        this.yylloc = {
                            first_line: 1,
                            first_column: 0,
                            last_line: 1,
                            last_column: 0
                        };
                        if (this.options.ranges) this.yylloc.range = [ 0, 0 ];
                        this.offset = 0;
                        return this;
                    },
                    input: function e() {
                        var t = this._input[0];
                        this.yytext += t;
                        this.yyleng++;
                        this.offset++;
                        this.match += t;
                        this.matched += t;
                        var n = t.match(/(?:\r\n?|\n).*/g);
                        if (n) {
                            this.yylineno++;
                            this.yylloc.last_line++;
                        } else {
                            this.yylloc.last_column++;
                        }
                        if (this.options.ranges) this.yylloc.range[1]++;
                        this._input = this._input.slice(1);
                        return t;
                    },
                    unput: function e(t) {
                        var n = t.length;
                        var r = t.split(/(?:\r\n?|\n)/g);
                        this._input = t + this._input;
                        this.yytext = this.yytext.substr(0, this.yytext.length - n - 1);
                        this.offset -= n;
                        var s = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1);
                        this.matched = this.matched.substr(0, this.matched.length - 1);
                        if (r.length - 1) this.yylineno -= r.length - 1;
                        var i = this.yylloc.range;
                        this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: r ? (r.length === s.length ? this.yylloc.first_column : 0) + s[s.length - r.length].length - r[0].length : this.yylloc.first_column - n
                        };
                        if (this.options.ranges) {
                            this.yylloc.range = [ i[0], i[0] + this.yyleng - n ];
                        }
                        return this;
                    },
                    more: function e() {
                        this._more = true;
                        return this;
                    },
                    less: function e(t) {
                        this.unput(this.match.slice(t));
                    },
                    pastInput: function e() {
                        var t = this.matched.substr(0, this.matched.length - this.match.length);
                        return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "");
                    },
                    upcomingInput: function e() {
                        var t = this.match;
                        if (t.length < 20) {
                            t += this._input.substr(0, 20 - t.length);
                        }
                        return (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "");
                    },
                    showPosition: function e() {
                        var t = this.pastInput();
                        var n = new Array(t.length + 1).join("-");
                        return t + this.upcomingInput() + "\n" + n + "^";
                    },
                    next: function e() {
                        if (this.done) {
                            return this.EOF;
                        }
                        if (!this._input) this.done = true;
                        var t, n, r, s, i, o;
                        if (!this._more) {
                            this.yytext = "";
                            this.match = "";
                        }
                        var a = this._currentRules();
                        for (var l = 0; l < a.length; l++) {
                            r = this._input.match(this.rules[a[l]]);
                            if (r && (!n || r[0].length > n[0].length)) {
                                n = r;
                                s = l;
                                if (!this.options.flex) break;
                            }
                        }
                        if (n) {
                            o = n[0].match(/(?:\r\n?|\n).*/g);
                            if (o) this.yylineno += o.length;
                            this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: o ? o[o.length - 1].length - o[o.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + n[0].length
                            };
                            this.yytext += n[0];
                            this.match += n[0];
                            this.matches = n;
                            this.yyleng = this.yytext.length;
                            if (this.options.ranges) {
                                this.yylloc.range = [ this.offset, this.offset += this.yyleng ];
                            }
                            this._more = false;
                            this._input = this._input.slice(n[0].length);
                            this.matched += n[0];
                            t = this.performAction.call(this, this.yy, this, a[s], this.conditionStack[this.conditionStack.length - 1]);
                            if (this.done && this._input) this.done = false;
                            if (t) return t; else return;
                        }
                        if (this._input === "") {
                            return this.EOF;
                        } else {
                            return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                text: "",
                                token: null,
                                line: this.yylineno
                            });
                        }
                    },
                    lex: function e() {
                        var t = this.next();
                        if (typeof t !== "undefined") {
                            return t;
                        } else {
                            return this.lex();
                        }
                    },
                    begin: function e(t) {
                        this.conditionStack.push(t);
                    },
                    popState: function e() {
                        return this.conditionStack.pop();
                    },
                    _currentRules: function e() {
                        return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                    },
                    topState: function e() {
                        return this.conditionStack[this.conditionStack.length - 2];
                    },
                    pushState: function e(t) {
                        this.begin(t);
                    }
                };
                e.options = {};
                e.performAction = function e(t, n, r, s) {
                    function i(e, t) {
                        return n.yytext = n.yytext.substring(e, n.yyleng - t + e);
                    }
                    var o = s;
                    switch (r) {
                      case 0:
                        if (n.yytext.slice(-2) === "\\\\") {
                            i(0, 1);
                            this.begin("mu");
                        } else if (n.yytext.slice(-1) === "\\") {
                            i(0, 1);
                            this.begin("emu");
                        } else {
                            this.begin("mu");
                        }
                        if (n.yytext) return 15;
                        break;

                      case 1:
                        return 15;
                        break;

                      case 2:
                        this.popState();
                        return 15;
                        break;

                      case 3:
                        this.begin("raw");
                        return 15;
                        break;

                      case 4:
                        this.popState();
                        if (this.conditionStack[this.conditionStack.length - 1] === "raw") {
                            return 15;
                        } else {
                            i(5, 9);
                            return "END_RAW_BLOCK";
                        }
                        break;

                      case 5:
                        return 15;
                        break;

                      case 6:
                        this.popState();
                        return 14;
                        break;

                      case 7:
                        return 65;
                        break;

                      case 8:
                        return 68;
                        break;

                      case 9:
                        return 19;
                        break;

                      case 10:
                        this.popState();
                        this.begin("raw");
                        return 23;
                        break;

                      case 11:
                        return 55;
                        break;

                      case 12:
                        return 60;
                        break;

                      case 13:
                        return 29;
                        break;

                      case 14:
                        return 47;
                        break;

                      case 15:
                        this.popState();
                        return 44;
                        break;

                      case 16:
                        this.popState();
                        return 44;
                        break;

                      case 17:
                        return 34;
                        break;

                      case 18:
                        return 39;
                        break;

                      case 19:
                        return 51;
                        break;

                      case 20:
                        return 48;
                        break;

                      case 21:
                        this.unput(n.yytext);
                        this.popState();
                        this.begin("com");
                        break;

                      case 22:
                        this.popState();
                        return 14;
                        break;

                      case 23:
                        return 48;
                        break;

                      case 24:
                        return 73;
                        break;

                      case 25:
                        return 72;
                        break;

                      case 26:
                        return 72;
                        break;

                      case 27:
                        return 87;
                        break;

                      case 28:
                        break;

                      case 29:
                        this.popState();
                        return 54;
                        break;

                      case 30:
                        this.popState();
                        return 33;
                        break;

                      case 31:
                        n.yytext = i(1, 2).replace(/\\"/g, '"');
                        return 80;
                        break;

                      case 32:
                        n.yytext = i(1, 2).replace(/\\'/g, "'");
                        return 80;
                        break;

                      case 33:
                        return 85;
                        break;

                      case 34:
                        return 82;
                        break;

                      case 35:
                        return 82;
                        break;

                      case 36:
                        return 83;
                        break;

                      case 37:
                        return 84;
                        break;

                      case 38:
                        return 81;
                        break;

                      case 39:
                        return 75;
                        break;

                      case 40:
                        return 77;
                        break;

                      case 41:
                        return 72;
                        break;

                      case 42:
                        n.yytext = n.yytext.replace(/\\([\\\]])/g, "$1");
                        return 72;
                        break;

                      case 43:
                        return "INVALID";
                        break;

                      case 44:
                        return 5;
                        break;
                    }
                };
                e.rules = [ /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/ ];
                e.conditions = {
                    mu: {
                        rules: [ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 ],
                        inclusive: false
                    },
                    emu: {
                        rules: [ 2 ],
                        inclusive: false
                    },
                    com: {
                        rules: [ 6 ],
                        inclusive: false
                    },
                    raw: {
                        rules: [ 3, 4, 5 ],
                        inclusive: false
                    },
                    INITIAL: {
                        rules: [ 0, 1, 44 ],
                        inclusive: true
                    }
                };
                return e;
            }();
            e.lexer = t;
            function n() {
                this.yy = {};
            }
            n.prototype = e;
            e.Parser = n;
            return new n();
        }();
        t["default"] = n;
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        var s = n(88);
        var i = r(s);
        function o() {
            var e = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            this.options = e;
        }
        o.prototype = new i["default"]();
        o.prototype.Program = function(e) {
            var t = !this.options.ignoreStandalone;
            var n = !this.isRootSeen;
            this.isRootSeen = true;
            var r = e.body;
            for (var s = 0, i = r.length; s < i; s++) {
                var o = r[s], a = this.accept(o);
                if (!a) {
                    continue;
                }
                var l = p(r, s, n), c = d(r, s, n), u = a.openStandalone && l, f = a.closeStandalone && c, h = a.inlineStandalone && l && c;
                if (a.close) {
                    m(r, s, true);
                }
                if (a.open) {
                    g(r, s, true);
                }
                if (t && h) {
                    m(r, s);
                    if (g(r, s)) {
                        if (o.type === "PartialStatement") {
                            o.indent = /([ \t]+$)/.exec(r[s - 1].original)[1];
                        }
                    }
                }
                if (t && u) {
                    m((o.program || o.inverse).body);
                    g(r, s);
                }
                if (t && f) {
                    m(r, s);
                    g((o.inverse || o.program).body);
                }
            }
            return e;
        };
        o.prototype.BlockStatement = o.prototype.DecoratorBlock = o.prototype.PartialBlockStatement = function(e) {
            this.accept(e.program);
            this.accept(e.inverse);
            var t = e.program || e.inverse, n = e.program && e.inverse, r = n, s = n;
            if (n && n.chained) {
                r = n.body[0].program;
                while (s.chained) {
                    s = s.body[s.body.length - 1].program;
                }
            }
            var i = {
                open: e.openStrip.open,
                close: e.closeStrip.close,
                openStandalone: d(t.body),
                closeStandalone: p((r || t).body)
            };
            if (e.openStrip.close) {
                m(t.body, null, true);
            }
            if (n) {
                var o = e.inverseStrip;
                if (o.open) {
                    g(t.body, null, true);
                }
                if (o.close) {
                    m(r.body, null, true);
                }
                if (e.closeStrip.open) {
                    g(s.body, null, true);
                }
                if (!this.options.ignoreStandalone && p(t.body) && d(r.body)) {
                    g(t.body);
                    m(r.body);
                }
            } else if (e.closeStrip.open) {
                g(t.body, null, true);
            }
            return i;
        };
        o.prototype.Decorator = o.prototype.MustacheStatement = function(e) {
            return e.strip;
        };
        o.prototype.PartialStatement = o.prototype.CommentStatement = function(e) {
            var t = e.strip || {};
            return {
                inlineStandalone: true,
                open: t.open,
                close: t.close
            };
        };
        function p(e, t, n) {
            if (t === undefined) {
                t = e.length;
            }
            var r = e[t - 1], s = e[t - 2];
            if (!r) {
                return n;
            }
            if (r.type === "ContentStatement") {
                return (s || !n ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(r.original);
            }
        }
        function d(e, t, n) {
            if (t === undefined) {
                t = -1;
            }
            var r = e[t + 1], s = e[t + 2];
            if (!r) {
                return n;
            }
            if (r.type === "ContentStatement") {
                return (s || !n ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(r.original);
            }
        }
        function m(e, t, n) {
            var r = e[t == null ? 0 : t + 1];
            if (!r || r.type !== "ContentStatement" || !n && r.rightStripped) {
                return;
            }
            var s = r.value;
            r.value = r.value.replace(n ? /^\s+/ : /^[ \t]*\r?\n?/, "");
            r.rightStripped = r.value !== s;
        }
        function g(e, t, n) {
            var r = e[t == null ? e.length - 1 : t - 1];
            if (!r || r.type !== "ContentStatement" || !n && r.leftStripped) {
                return;
            }
            var s = r.value;
            r.value = r.value.replace(n ? /\s+$/ : /[ \t]+$/, "");
            r.leftStripped = r.value !== s;
            return r.leftStripped;
        }
        t["default"] = o;
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        var s = n(6);
        var i = r(s);
        function o() {
            this.parents = [];
        }
        o.prototype = {
            constructor: o,
            mutating: false,
            acceptKey: function e(t, n) {
                var r = this.accept(t[n]);
                if (this.mutating) {
                    if (r && !o.prototype[r.type]) {
                        throw new i["default"]('Unexpected node type "' + r.type + '" found when accepting ' + n + " on " + t.type);
                    }
                    t[n] = r;
                }
            },
            acceptRequired: function e(t, n) {
                this.acceptKey(t, n);
                if (!t[n]) {
                    throw new i["default"](t.type + " requires " + n);
                }
            },
            acceptArray: function e(t) {
                for (var n = 0, r = t.length; n < r; n++) {
                    this.acceptKey(t, n);
                    if (!t[n]) {
                        t.splice(n, 1);
                        n--;
                        r--;
                    }
                }
            },
            accept: function e(t) {
                if (!t) {
                    return;
                }
                if (!this[t.type]) {
                    throw new i["default"]("Unknown type: " + t.type, t);
                }
                if (this.current) {
                    this.parents.unshift(this.current);
                }
                this.current = t;
                var n = this[t.type](t);
                this.current = this.parents.shift();
                if (!this.mutating || n) {
                    return n;
                } else if (n !== false) {
                    return t;
                }
            },
            Program: function e(t) {
                this.acceptArray(t.body);
            },
            MustacheStatement: a,
            Decorator: a,
            BlockStatement: l,
            DecoratorBlock: l,
            PartialStatement: c,
            PartialBlockStatement: function e(t) {
                c.call(this, t);
                this.acceptKey(t, "program");
            },
            ContentStatement: function e() {},
            CommentStatement: function e() {},
            SubExpression: a,
            PathExpression: function e() {},
            StringLiteral: function e() {},
            NumberLiteral: function e() {},
            BooleanLiteral: function e() {},
            UndefinedLiteral: function e() {},
            NullLiteral: function e() {},
            Hash: function e(t) {
                this.acceptArray(t.pairs);
            },
            HashPair: function e(t) {
                this.acceptRequired(t, "value");
            }
        };
        function a(e) {
            this.acceptRequired(e, "path");
            this.acceptArray(e.params);
            this.acceptKey(e, "hash");
        }
        function l(e) {
            a.call(this, e);
            this.acceptKey(e, "program");
            this.acceptKey(e, "inverse");
        }
        function c(e) {
            this.acceptRequired(e, "name");
            this.acceptArray(e.params);
            this.acceptKey(e, "hash");
        }
        t["default"] = o;
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var r = n(1)["default"];
        t.__esModule = true;
        t.SourceLocation = i;
        t.id = o;
        t.stripFlags = a;
        t.stripComment = l;
        t.preparePath = f;
        t.prepareMustache = h;
        t.prepareRawBlock = p;
        t.prepareBlock = d;
        t.prepareProgram = m;
        t.preparePartialBlock = g;
        var s = n(6);
        var u = r(s);
        function c(e, t) {
            t = t.path ? t.path.original : t;
            if (e.path.original !== t) {
                var n = {
                    loc: e.path.loc
                };
                throw new u["default"](e.path.original + " doesn't match " + t, n);
            }
        }
        function i(e, t) {
            this.source = e;
            this.start = {
                line: t.first_line,
                column: t.first_column
            };
            this.end = {
                line: t.last_line,
                column: t.last_column
            };
        }
        function o(e) {
            if (/^\[.*\]$/.test(e)) {
                return e.substring(1, e.length - 1);
            } else {
                return e;
            }
        }
        function a(e, t) {
            return {
                open: e.charAt(2) === "~",
                close: t.charAt(t.length - 3) === "~"
            };
        }
        function l(e) {
            return e.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
        }
        function f(e, t, n) {
            n = this.locInfo(n);
            var r = e ? "@" : "", s = [], i = 0;
            for (var o = 0, a = t.length; o < a; o++) {
                var l = t[o].part, c = t[o].original !== l;
                r += (t[o].separator || "") + l;
                if (!c && (l === ".." || l === "." || l === "this")) {
                    if (s.length > 0) {
                        throw new u["default"]("Invalid path: " + r, {
                            loc: n
                        });
                    } else if (l === "..") {
                        i++;
                    }
                } else {
                    s.push(l);
                }
            }
            return {
                type: "PathExpression",
                data: e,
                depth: i,
                parts: s,
                original: r,
                loc: n
            };
        }
        function h(e, t, n, r, s, i) {
            var o = r.charAt(3) || r.charAt(2), a = o !== "{" && o !== "&";
            var l = /\*/.test(r);
            return {
                type: l ? "Decorator" : "MustacheStatement",
                path: e,
                params: t,
                hash: n,
                escaped: a,
                strip: s,
                loc: this.locInfo(i)
            };
        }
        function p(e, t, n, r) {
            c(e, n);
            r = this.locInfo(r);
            var s = {
                type: "Program",
                body: t,
                strip: {},
                loc: r
            };
            return {
                type: "BlockStatement",
                path: e.path,
                params: e.params,
                hash: e.hash,
                program: s,
                openStrip: {},
                inverseStrip: {},
                closeStrip: {},
                loc: r
            };
        }
        function d(e, t, n, r, s, i) {
            if (r && r.path) {
                c(e, r);
            }
            var o = /\*/.test(e.open);
            t.blockParams = e.blockParams;
            var a = undefined, l = undefined;
            if (n) {
                if (o) {
                    throw new u["default"]("Unexpected inverse block on decorator", n);
                }
                if (n.chain) {
                    n.program.body[0].closeStrip = r.strip;
                }
                l = n.strip;
                a = n.program;
            }
            if (s) {
                s = a;
                a = t;
                t = s;
            }
            return {
                type: o ? "DecoratorBlock" : "BlockStatement",
                path: e.path,
                params: e.params,
                hash: e.hash,
                program: t,
                inverse: a,
                openStrip: e.strip,
                inverseStrip: l,
                closeStrip: r && r.strip,
                loc: this.locInfo(i)
            };
        }
        function m(e, t) {
            if (!t && e.length) {
                var n = e[0].loc, r = e[e.length - 1].loc;
                if (n && r) {
                    t = {
                        source: n.source,
                        start: {
                            line: n.start.line,
                            column: n.start.column
                        },
                        end: {
                            line: r.end.line,
                            column: r.end.column
                        }
                    };
                }
            }
            return {
                type: "Program",
                body: e,
                strip: {},
                loc: t
            };
        }
        function g(e, t, n, r) {
            c(e, n);
            return {
                type: "PartialBlockStatement",
                name: e.path,
                params: e.params,
                hash: e.hash,
                program: t,
                openStrip: e.strip,
                closeStrip: n && n.strip,
                loc: this.locInfo(r)
            };
        }
    }, function(e, t, n) {
        "use strict";
        var r = n(74)["default"];
        var s = n(1)["default"];
        t.__esModule = true;
        t.Compiler = f;
        t.precompile = h;
        t.compile = p;
        var i = n(6);
        var l = s(i);
        var c = n(5);
        var o = n(84);
        var u = s(o);
        var a = [].slice;
        function f() {}
        f.prototype = {
            compiler: f,
            equals: function e(t) {
                var n = this.opcodes.length;
                if (t.opcodes.length !== n) {
                    return false;
                }
                for (var r = 0; r < n; r++) {
                    var s = this.opcodes[r], i = t.opcodes[r];
                    if (s.opcode !== i.opcode || !d(s.args, i.args)) {
                        return false;
                    }
                }
                n = this.children.length;
                for (var r = 0; r < n; r++) {
                    if (!this.children[r].equals(t.children[r])) {
                        return false;
                    }
                }
                return true;
            },
            guid: 0,
            compile: function e(t, n) {
                this.sourceNode = [];
                this.opcodes = [];
                this.children = [];
                this.options = n;
                this.stringParams = n.stringParams;
                this.trackIds = n.trackIds;
                n.blockParams = n.blockParams || [];
                n.knownHelpers = c.extend(r(null), {
                    helperMissing: true,
                    blockHelperMissing: true,
                    each: true,
                    if: true,
                    unless: true,
                    with: true,
                    log: true,
                    lookup: true
                }, n.knownHelpers);
                return this.accept(t);
            },
            compileProgram: function e(t) {
                var n = new this.compiler(), r = n.compile(t, this.options), s = this.guid++;
                this.usePartial = this.usePartial || r.usePartial;
                this.children[s] = r;
                this.useDepths = this.useDepths || r.useDepths;
                return s;
            },
            accept: function e(t) {
                if (!this[t.type]) {
                    throw new l["default"]("Unknown type: " + t.type, t);
                }
                this.sourceNode.unshift(t);
                var n = this[t.type](t);
                this.sourceNode.shift();
                return n;
            },
            Program: function e(t) {
                this.options.blockParams.unshift(t.blockParams);
                var n = t.body, r = n.length;
                for (var s = 0; s < r; s++) {
                    this.accept(n[s]);
                }
                this.options.blockParams.shift();
                this.isSimple = r === 1;
                this.blockParams = t.blockParams ? t.blockParams.length : 0;
                return this;
            },
            BlockStatement: function e(t) {
                m(t);
                var n = t.program, r = t.inverse;
                n = n && this.compileProgram(n);
                r = r && this.compileProgram(r);
                var s = this.classifySexpr(t);
                if (s === "helper") {
                    this.helperSexpr(t, n, r);
                } else if (s === "simple") {
                    this.simpleSexpr(t);
                    this.opcode("pushProgram", n);
                    this.opcode("pushProgram", r);
                    this.opcode("emptyHash");
                    this.opcode("blockValue", t.path.original);
                } else {
                    this.ambiguousSexpr(t, n, r);
                    this.opcode("pushProgram", n);
                    this.opcode("pushProgram", r);
                    this.opcode("emptyHash");
                    this.opcode("ambiguousBlockValue");
                }
                this.opcode("append");
            },
            DecoratorBlock: function e(t) {
                var n = t.program && this.compileProgram(t.program);
                var r = this.setupFullMustacheParams(t, n, undefined), s = t.path;
                this.useDecorators = true;
                this.opcode("registerDecorator", r.length, s.original);
            },
            PartialStatement: function e(t) {
                this.usePartial = true;
                var n = t.program;
                if (n) {
                    n = this.compileProgram(t.program);
                }
                var r = t.params;
                if (r.length > 1) {
                    throw new l["default"]("Unsupported number of partial arguments: " + r.length, t);
                } else if (!r.length) {
                    if (this.options.explicitPartialContext) {
                        this.opcode("pushLiteral", "undefined");
                    } else {
                        r.push({
                            type: "PathExpression",
                            parts: [],
                            depth: 0
                        });
                    }
                }
                var s = t.name.original, i = t.name.type === "SubExpression";
                if (i) {
                    this.accept(t.name);
                }
                this.setupFullMustacheParams(t, n, undefined, true);
                var o = t.indent || "";
                if (this.options.preventIndent && o) {
                    this.opcode("appendContent", o);
                    o = "";
                }
                this.opcode("invokePartial", i, s, o);
                this.opcode("append");
            },
            PartialBlockStatement: function e(t) {
                this.PartialStatement(t);
            },
            MustacheStatement: function e(t) {
                this.SubExpression(t);
                if (t.escaped && !this.options.noEscape) {
                    this.opcode("appendEscaped");
                } else {
                    this.opcode("append");
                }
            },
            Decorator: function e(t) {
                this.DecoratorBlock(t);
            },
            ContentStatement: function e(t) {
                if (t.value) {
                    this.opcode("appendContent", t.value);
                }
            },
            CommentStatement: function e() {},
            SubExpression: function e(t) {
                m(t);
                var n = this.classifySexpr(t);
                if (n === "simple") {
                    this.simpleSexpr(t);
                } else if (n === "helper") {
                    this.helperSexpr(t);
                } else {
                    this.ambiguousSexpr(t);
                }
            },
            ambiguousSexpr: function e(t, n, r) {
                var s = t.path, i = s.parts[0], o = n != null || r != null;
                this.opcode("getContext", s.depth);
                this.opcode("pushProgram", n);
                this.opcode("pushProgram", r);
                s.strict = true;
                this.accept(s);
                this.opcode("invokeAmbiguous", i, o);
            },
            simpleSexpr: function e(t) {
                var n = t.path;
                n.strict = true;
                this.accept(n);
                this.opcode("resolvePossibleLambda");
            },
            helperSexpr: function e(t, n, r) {
                var s = this.setupFullMustacheParams(t, n, r), i = t.path, o = i.parts[0];
                if (this.options.knownHelpers[o]) {
                    this.opcode("invokeKnownHelper", s.length, o);
                } else if (this.options.knownHelpersOnly) {
                    throw new l["default"]("You specified knownHelpersOnly, but used the unknown helper " + o, t);
                } else {
                    i.strict = true;
                    i.falsy = true;
                    this.accept(i);
                    this.opcode("invokeHelper", s.length, i.original, u["default"].helpers.simpleId(i));
                }
            },
            PathExpression: function e(t) {
                this.addDepth(t.depth);
                this.opcode("getContext", t.depth);
                var n = t.parts[0], r = u["default"].helpers.scopedId(t), s = !t.depth && !r && this.blockParamIndex(n);
                if (s) {
                    this.opcode("lookupBlockParam", s, t.parts);
                } else if (!n) {
                    this.opcode("pushContext");
                } else if (t.data) {
                    this.options.data = true;
                    this.opcode("lookupData", t.depth, t.parts, t.strict);
                } else {
                    this.opcode("lookupOnContext", t.parts, t.falsy, t.strict, r);
                }
            },
            StringLiteral: function e(t) {
                this.opcode("pushString", t.value);
            },
            NumberLiteral: function e(t) {
                this.opcode("pushLiteral", t.value);
            },
            BooleanLiteral: function e(t) {
                this.opcode("pushLiteral", t.value);
            },
            UndefinedLiteral: function e() {
                this.opcode("pushLiteral", "undefined");
            },
            NullLiteral: function e() {
                this.opcode("pushLiteral", "null");
            },
            Hash: function e(t) {
                var n = t.pairs, r = 0, s = n.length;
                this.opcode("pushHash");
                for (;r < s; r++) {
                    this.pushParam(n[r].value);
                }
                while (r--) {
                    this.opcode("assignToHash", n[r].key);
                }
                this.opcode("popHash");
            },
            opcode: function e(t) {
                this.opcodes.push({
                    opcode: t,
                    args: a.call(arguments, 1),
                    loc: this.sourceNode[0].loc
                });
            },
            addDepth: function e(t) {
                if (!t) {
                    return;
                }
                this.useDepths = true;
            },
            classifySexpr: function e(t) {
                var n = u["default"].helpers.simpleId(t.path);
                var r = n && !!this.blockParamIndex(t.path.parts[0]);
                var s = !r && u["default"].helpers.helperExpression(t);
                var i = !r && (s || n);
                if (i && !s) {
                    var o = t.path.parts[0], a = this.options;
                    if (a.knownHelpers[o]) {
                        s = true;
                    } else if (a.knownHelpersOnly) {
                        i = false;
                    }
                }
                if (s) {
                    return "helper";
                } else if (i) {
                    return "ambiguous";
                } else {
                    return "simple";
                }
            },
            pushParams: function e(t) {
                for (var n = 0, r = t.length; n < r; n++) {
                    this.pushParam(t[n]);
                }
            },
            pushParam: function e(t) {
                var n = t.value != null ? t.value : t.original || "";
                if (this.stringParams) {
                    if (n.replace) {
                        n = n.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".");
                    }
                    if (t.depth) {
                        this.addDepth(t.depth);
                    }
                    this.opcode("getContext", t.depth || 0);
                    this.opcode("pushStringParam", n, t.type);
                    if (t.type === "SubExpression") {
                        this.accept(t);
                    }
                } else {
                    if (this.trackIds) {
                        var r = undefined;
                        if (t.parts && !u["default"].helpers.scopedId(t) && !t.depth) {
                            r = this.blockParamIndex(t.parts[0]);
                        }
                        if (r) {
                            var s = t.parts.slice(1).join(".");
                            this.opcode("pushId", "BlockParam", r, s);
                        } else {
                            n = t.original || n;
                            if (n.replace) {
                                n = n.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "");
                            }
                            this.opcode("pushId", t.type, n);
                        }
                    }
                    this.accept(t);
                }
            },
            setupFullMustacheParams: function e(t, n, r, s) {
                var i = t.params;
                this.pushParams(i);
                this.opcode("pushProgram", n);
                this.opcode("pushProgram", r);
                if (t.hash) {
                    this.accept(t.hash);
                } else {
                    this.opcode("emptyHash", s);
                }
                return i;
            },
            blockParamIndex: function e(t) {
                for (var n = 0, r = this.options.blockParams.length; n < r; n++) {
                    var s = this.options.blockParams[n], i = s && c.indexOf(s, t);
                    if (s && i >= 0) {
                        return [ n, i ];
                    }
                }
            }
        };
        function h(e, t, n) {
            if (e == null || typeof e !== "string" && e.type !== "Program") {
                throw new l["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + e);
            }
            t = t || {};
            if (!("data" in t)) {
                t.data = true;
            }
            if (t.compat) {
                t.useDepths = true;
            }
            var r = n.parse(e, t), s = new n.Compiler().compile(r, t);
            return new n.JavaScriptCompiler().compile(s, t);
        }
        function p(r, s, i) {
            if (s === undefined) s = {};
            if (r == null || typeof r !== "string" && r.type !== "Program") {
                throw new l["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + r);
            }
            s = c.extend({}, s);
            if (!("data" in s)) {
                s.data = true;
            }
            if (s.compat) {
                s.useDepths = true;
            }
            var o = undefined;
            function a() {
                var e = i.parse(r, s), t = new i.Compiler().compile(e, s), n = new i.JavaScriptCompiler().compile(t, s, undefined, true);
                return i.template(n);
            }
            function e(e, t) {
                if (!o) {
                    o = a();
                }
                return o.call(this, e, t);
            }
            e._setup = function(e) {
                if (!o) {
                    o = a();
                }
                return o._setup(e);
            };
            e._child = function(e, t, n, r) {
                if (!o) {
                    o = a();
                }
                return o._child(e, t, n, r);
            };
            return e;
        }
        function d(e, t) {
            if (e === t) {
                return true;
            }
            if (c.isArray(e) && c.isArray(t) && e.length === t.length) {
                for (var n = 0; n < e.length; n++) {
                    if (!d(e[n], t[n])) {
                        return false;
                    }
                }
                return true;
            }
        }
        function m(e) {
            if (!e.path.parts) {
                var t = e.path;
                e.path = {
                    type: "PathExpression",
                    data: false,
                    depth: 0,
                    parts: [ t.original + "" ],
                    original: t.original + "",
                    loc: t.loc
                };
            }
        }
    }, function(e, t, n) {
        "use strict";
        var l = n(60)["default"];
        var r = n(1)["default"];
        t.__esModule = true;
        var s = n(4);
        var i = n(6);
        var m = r(i);
        var o = n(5);
        var a = n(92);
        var c = r(a);
        function u(e) {
            this.value = e;
        }
        function f() {}
        f.prototype = {
            nameLookup: function e(t, n) {
                return this.internalNameLookup(t, n);
            },
            depthedLookup: function e(t) {
                return [ this.aliasable("container.lookup"), "(depths, ", JSON.stringify(t), ")" ];
            },
            compilerInfo: function e() {
                var t = s.COMPILER_REVISION, n = s.REVISION_CHANGES[t];
                return [ t, n ];
            },
            appendToBuffer: function e(t, n, r) {
                if (!o.isArray(t)) {
                    t = [ t ];
                }
                t = this.source.wrap(t, n);
                if (this.environment.isSimple) {
                    return [ "return ", t, ";" ];
                } else if (r) {
                    return [ "buffer += ", t, ";" ];
                } else {
                    t.appendToBuffer = true;
                    return t;
                }
            },
            initializeBuffer: function e() {
                return this.quotedString("");
            },
            internalNameLookup: function e(t, n) {
                this.lookupPropertyFunctionIsUsed = true;
                return [ "lookupProperty(", t, ",", JSON.stringify(n), ")" ];
            },
            lookupPropertyFunctionIsUsed: false,
            compile: function e(t, n, r, s) {
                this.environment = t;
                this.options = n;
                this.stringParams = this.options.stringParams;
                this.trackIds = this.options.trackIds;
                this.precompile = !s;
                this.name = this.environment.name;
                this.isChild = !!r;
                this.context = r || {
                    decorators: [],
                    programs: [],
                    environments: []
                };
                this.preamble();
                this.stackSlot = 0;
                this.stackVars = [];
                this.aliases = {};
                this.registers = {
                    list: []
                };
                this.hashes = [];
                this.compileStack = [];
                this.inlineStack = [];
                this.blockParams = [];
                this.compileChildren(t, n);
                this.useDepths = this.useDepths || t.useDepths || t.useDecorators || this.options.compat;
                this.useBlockParams = this.useBlockParams || t.useBlockParams;
                var i = t.opcodes, o = undefined, a = undefined, l = undefined, c = undefined;
                for (l = 0, c = i.length; l < c; l++) {
                    o = i[l];
                    this.source.currentLocation = o.loc;
                    a = a || o.loc;
                    this[o.opcode].apply(this, o.args);
                }
                this.source.currentLocation = a;
                this.pushSource("");
                if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
                    throw new m["default"]("Compile completed with content left on stack");
                }
                if (!this.decorators.isEmpty()) {
                    this.useDecorators = true;
                    this.decorators.prepend([ "var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n" ]);
                    this.decorators.push("return fn;");
                    if (s) {
                        this.decorators = Function.apply(this, [ "fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge() ]);
                    } else {
                        this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
                        this.decorators.push("}\n");
                        this.decorators = this.decorators.merge();
                    }
                } else {
                    this.decorators = undefined;
                }
                var u = this.createFunctionContext(s);
                if (!this.isChild) {
                    var f = {
                        compiler: this.compilerInfo(),
                        main: u
                    };
                    if (this.decorators) {
                        f.main_d = this.decorators;
                        f.useDecorators = true;
                    }
                    var h = this.context;
                    var p = h.programs;
                    var d = h.decorators;
                    for (l = 0, c = p.length; l < c; l++) {
                        if (p[l]) {
                            f[l] = p[l];
                            if (d[l]) {
                                f[l + "_d"] = d[l];
                                f.useDecorators = true;
                            }
                        }
                    }
                    if (this.environment.usePartial) {
                        f.usePartial = true;
                    }
                    if (this.options.data) {
                        f.useData = true;
                    }
                    if (this.useDepths) {
                        f.useDepths = true;
                    }
                    if (this.useBlockParams) {
                        f.useBlockParams = true;
                    }
                    if (this.options.compat) {
                        f.compat = true;
                    }
                    if (!s) {
                        f.compiler = JSON.stringify(f.compiler);
                        this.source.currentLocation = {
                            start: {
                                line: 1,
                                column: 0
                            }
                        };
                        f = this.objectLiteral(f);
                        if (n.srcName) {
                            f = f.toStringWithSourceMap({
                                file: n.destName
                            });
                            f.map = f.map && f.map.toString();
                        } else {
                            f = f.toString();
                        }
                    } else {
                        f.compilerOptions = this.options;
                    }
                    return f;
                } else {
                    return u;
                }
            },
            preamble: function e() {
                this.lastContext = 0;
                this.source = new c["default"](this.options.srcName);
                this.decorators = new c["default"](this.options.srcName);
            },
            createFunctionContext: function e(t) {
                var n = this;
                var r = "";
                var s = this.stackVars.concat(this.registers.list);
                if (s.length > 0) {
                    r += ", " + s.join(", ");
                }
                var i = 0;
                l(this.aliases).forEach(function(e) {
                    var t = n.aliases[e];
                    if (t.children && t.referenceCount > 1) {
                        r += ", alias" + ++i + "=" + e;
                        t.children[0] = "alias" + i;
                    }
                });
                if (this.lookupPropertyFunctionIsUsed) {
                    r += ", " + this.lookupPropertyFunctionVarDeclaration();
                }
                var o = [ "container", "depth0", "helpers", "partials", "data" ];
                if (this.useBlockParams || this.useDepths) {
                    o.push("blockParams");
                }
                if (this.useDepths) {
                    o.push("depths");
                }
                var a = this.mergeSource(r);
                if (t) {
                    o.push(a);
                    return Function.apply(this, o);
                } else {
                    return this.source.wrap([ "function(", o.join(","), ") {\n  ", a, "}" ]);
                }
            },
            mergeSource: function e(t) {
                var n = this.environment.isSimple, r = !this.forceBuffer, s = undefined, i = undefined, o = undefined, a = undefined;
                this.source.each(function(e) {
                    if (e.appendToBuffer) {
                        if (o) {
                            e.prepend("  + ");
                        } else {
                            o = e;
                        }
                        a = e;
                    } else {
                        if (o) {
                            if (!i) {
                                s = true;
                            } else {
                                o.prepend("buffer += ");
                            }
                            a.add(";");
                            o = a = undefined;
                        }
                        i = true;
                        if (!n) {
                            r = false;
                        }
                    }
                });
                if (r) {
                    if (o) {
                        o.prepend("return ");
                        a.add(";");
                    } else if (!i) {
                        this.source.push('return "";');
                    }
                } else {
                    t += ", buffer = " + (s ? "" : this.initializeBuffer());
                    if (o) {
                        o.prepend("return buffer + ");
                        a.add(";");
                    } else {
                        this.source.push("return buffer;");
                    }
                }
                if (t) {
                    this.source.prepend("var " + t.substring(2) + (s ? "" : ";\n"));
                }
                return this.source.merge();
            },
            lookupPropertyFunctionVarDeclaration: function e() {
                return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim();
            },
            blockValue: function e(t) {
                var n = this.aliasable("container.hooks.blockHelperMissing"), r = [ this.contextName(0) ];
                this.setupHelperArgs(t, 0, r);
                var s = this.popStack();
                r.splice(1, 0, s);
                this.push(this.source.functionCall(n, "call", r));
            },
            ambiguousBlockValue: function e() {
                var t = this.aliasable("container.hooks.blockHelperMissing"), n = [ this.contextName(0) ];
                this.setupHelperArgs("", 0, n, true);
                this.flushInline();
                var r = this.topStack();
                n.splice(1, 0, r);
                this.pushSource([ "if (!", this.lastHelper, ") { ", r, " = ", this.source.functionCall(t, "call", n), "}" ]);
            },
            appendContent: function e(t) {
                if (this.pendingContent) {
                    t = this.pendingContent + t;
                } else {
                    this.pendingLocation = this.source.currentLocation;
                }
                this.pendingContent = t;
            },
            append: function e() {
                if (this.isInline()) {
                    this.replaceStack(function(e) {
                        return [ " != null ? ", e, ' : ""' ];
                    });
                    this.pushSource(this.appendToBuffer(this.popStack()));
                } else {
                    var t = this.popStack();
                    this.pushSource([ "if (", t, " != null) { ", this.appendToBuffer(t, undefined, true), " }" ]);
                    if (this.environment.isSimple) {
                        this.pushSource([ "else { ", this.appendToBuffer("''", undefined, true), " }" ]);
                    }
                }
            },
            appendEscaped: function e() {
                this.pushSource(this.appendToBuffer([ this.aliasable("container.escapeExpression"), "(", this.popStack(), ")" ]));
            },
            getContext: function e(t) {
                this.lastContext = t;
            },
            pushContext: function e() {
                this.pushStackLiteral(this.contextName(this.lastContext));
            },
            lookupOnContext: function e(t, n, r, s) {
                var i = 0;
                if (!s && this.options.compat && !this.lastContext) {
                    this.push(this.depthedLookup(t[i++]));
                } else {
                    this.pushContext();
                }
                this.resolvePath("context", t, i, n, r);
            },
            lookupBlockParam: function e(t, n) {
                this.useBlockParams = true;
                this.push([ "blockParams[", t[0], "][", t[1], "]" ]);
                this.resolvePath("context", n, 1);
            },
            lookupData: function e(t, n, r) {
                if (!t) {
                    this.pushStackLiteral("data");
                } else {
                    this.pushStackLiteral("container.data(data, " + t + ")");
                }
                this.resolvePath("data", n, 0, true, r);
            },
            resolvePath: function e(n, r, s, i, t) {
                var o = this;
                if (this.options.strict || this.options.assumeObjects) {
                    this.push(h(this.options.strict && t, this, r, s, n));
                    return;
                }
                var a = r.length;
                for (;s < a; s++) {
                    this.replaceStack(function(e) {
                        var t = o.nameLookup(e, r[s], n);
                        if (!i) {
                            return [ " != null ? ", t, " : ", e ];
                        } else {
                            return [ " && ", t ];
                        }
                    });
                }
            },
            resolvePossibleLambda: function e() {
                this.push([ this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")" ]);
            },
            pushStringParam: function e(t, n) {
                this.pushContext();
                this.pushString(n);
                if (n !== "SubExpression") {
                    if (typeof t === "string") {
                        this.pushString(t);
                    } else {
                        this.pushStackLiteral(t);
                    }
                }
            },
            emptyHash: function e(t) {
                if (this.trackIds) {
                    this.push("{}");
                }
                if (this.stringParams) {
                    this.push("{}");
                    this.push("{}");
                }
                this.pushStackLiteral(t ? "undefined" : "{}");
            },
            pushHash: function e() {
                if (this.hash) {
                    this.hashes.push(this.hash);
                }
                this.hash = {
                    values: {},
                    types: [],
                    contexts: [],
                    ids: []
                };
            },
            popHash: function e() {
                var t = this.hash;
                this.hash = this.hashes.pop();
                if (this.trackIds) {
                    this.push(this.objectLiteral(t.ids));
                }
                if (this.stringParams) {
                    this.push(this.objectLiteral(t.contexts));
                    this.push(this.objectLiteral(t.types));
                }
                this.push(this.objectLiteral(t.values));
            },
            pushString: function e(t) {
                this.pushStackLiteral(this.quotedString(t));
            },
            pushLiteral: function e(t) {
                this.pushStackLiteral(t);
            },
            pushProgram: function e(t) {
                if (t != null) {
                    this.pushStackLiteral(this.programExpression(t));
                } else {
                    this.pushStackLiteral(null);
                }
            },
            registerDecorator: function e(t, n) {
                var r = this.nameLookup("decorators", n, "decorator"), s = this.setupHelperArgs(n, t);
                this.decorators.push([ "fn = ", this.decorators.functionCall(r, "", [ "fn", "props", "container", s ]), " || fn;" ]);
            },
            invokeHelper: function e(t, n, r) {
                var s = this.popStack(), i = this.setupHelper(t, n);
                var o = [];
                if (r) {
                    o.push(i.name);
                }
                o.push(s);
                if (!this.options.strict) {
                    o.push(this.aliasable("container.hooks.helperMissing"));
                }
                var a = [ "(", this.itemsSeparatedBy(o, "||"), ")" ];
                var l = this.source.functionCall(a, "call", i.callParams);
                this.push(l);
            },
            itemsSeparatedBy: function e(t, n) {
                var r = [];
                r.push(t[0]);
                for (var s = 1; s < t.length; s++) {
                    r.push(n, t[s]);
                }
                return r;
            },
            invokeKnownHelper: function e(t, n) {
                var r = this.setupHelper(t, n);
                this.push(this.source.functionCall(r.name, "call", r.callParams));
            },
            invokeAmbiguous: function e(t, n) {
                this.useRegister("helper");
                var r = this.popStack();
                this.emptyHash();
                var s = this.setupHelper(0, t, n);
                var i = this.lastHelper = this.nameLookup("helpers", t, "helper");
                var o = [ "(", "(helper = ", i, " || ", r, ")" ];
                if (!this.options.strict) {
                    o[0] = "(helper = ";
                    o.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"));
                }
                this.push([ "(", o, s.paramsInit ? [ "),(", s.paramsInit ] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", s.callParams), " : helper))" ]);
            },
            invokePartial: function e(t, n, r) {
                var s = [], i = this.setupParams(n, 1, s);
                if (t) {
                    n = this.popStack();
                    delete i.name;
                }
                if (r) {
                    i.indent = JSON.stringify(r);
                }
                i.helpers = "helpers";
                i.partials = "partials";
                i.decorators = "container.decorators";
                if (!t) {
                    s.unshift(this.nameLookup("partials", n, "partial"));
                } else {
                    s.unshift(n);
                }
                if (this.options.compat) {
                    i.depths = "depths";
                }
                i = this.objectLiteral(i);
                s.push(i);
                this.push(this.source.functionCall("container.invokePartial", "", s));
            },
            assignToHash: function e(t) {
                var n = this.popStack(), r = undefined, s = undefined, i = undefined;
                if (this.trackIds) {
                    i = this.popStack();
                }
                if (this.stringParams) {
                    s = this.popStack();
                    r = this.popStack();
                }
                var o = this.hash;
                if (r) {
                    o.contexts[t] = r;
                }
                if (s) {
                    o.types[t] = s;
                }
                if (i) {
                    o.ids[t] = i;
                }
                o.values[t] = n;
            },
            pushId: function e(t, n, r) {
                if (t === "BlockParam") {
                    this.pushStackLiteral("blockParams[" + n[0] + "].path[" + n[1] + "]" + (r ? " + " + JSON.stringify("." + r) : ""));
                } else if (t === "PathExpression") {
                    this.pushString(n);
                } else if (t === "SubExpression") {
                    this.pushStackLiteral("true");
                } else {
                    this.pushStackLiteral("null");
                }
            },
            compiler: f,
            compileChildren: function e(t, n) {
                var r = t.children, s = undefined, i = undefined;
                for (var o = 0, a = r.length; o < a; o++) {
                    s = r[o];
                    i = new this.compiler();
                    var l = this.matchExistingProgram(s);
                    if (l == null) {
                        this.context.programs.push("");
                        var c = this.context.programs.length;
                        s.index = c;
                        s.name = "program" + c;
                        this.context.programs[c] = i.compile(s, n, this.context, !this.precompile);
                        this.context.decorators[c] = i.decorators;
                        this.context.environments[c] = s;
                        this.useDepths = this.useDepths || i.useDepths;
                        this.useBlockParams = this.useBlockParams || i.useBlockParams;
                        s.useDepths = this.useDepths;
                        s.useBlockParams = this.useBlockParams;
                    } else {
                        s.index = l.index;
                        s.name = "program" + l.index;
                        this.useDepths = this.useDepths || l.useDepths;
                        this.useBlockParams = this.useBlockParams || l.useBlockParams;
                    }
                }
            },
            matchExistingProgram: function e(t) {
                for (var n = 0, r = this.context.environments.length; n < r; n++) {
                    var s = this.context.environments[n];
                    if (s && s.equals(t)) {
                        return s;
                    }
                }
            },
            programExpression: function e(t) {
                var n = this.environment.children[t], r = [ n.index, "data", n.blockParams ];
                if (this.useBlockParams || this.useDepths) {
                    r.push("blockParams");
                }
                if (this.useDepths) {
                    r.push("depths");
                }
                return "container.program(" + r.join(", ") + ")";
            },
            useRegister: function e(t) {
                if (!this.registers[t]) {
                    this.registers[t] = true;
                    this.registers.list.push(t);
                }
            },
            push: function e(t) {
                if (!(t instanceof u)) {
                    t = this.source.wrap(t);
                }
                this.inlineStack.push(t);
                return t;
            },
            pushStackLiteral: function e(t) {
                this.push(new u(t));
            },
            pushSource: function e(t) {
                if (this.pendingContent) {
                    this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
                    this.pendingContent = undefined;
                }
                if (t) {
                    this.source.push(t);
                }
            },
            replaceStack: function e(t) {
                var n = [ "(" ], r = undefined, s = undefined, i = undefined;
                if (!this.isInline()) {
                    throw new m["default"]("replaceStack on non-inline");
                }
                var o = this.popStack(true);
                if (o instanceof u) {
                    r = [ o.value ];
                    n = [ "(", r ];
                    i = true;
                } else {
                    s = true;
                    var a = this.incrStack();
                    n = [ "((", this.push(a), " = ", o, ")" ];
                    r = this.topStack();
                }
                var l = t.call(this, r);
                if (!i) {
                    this.popStack();
                }
                if (s) {
                    this.stackSlot--;
                }
                this.push(n.concat(l, ")"));
            },
            incrStack: function e() {
                this.stackSlot++;
                if (this.stackSlot > this.stackVars.length) {
                    this.stackVars.push("stack" + this.stackSlot);
                }
                return this.topStackName();
            },
            topStackName: function e() {
                return "stack" + this.stackSlot;
            },
            flushInline: function e() {
                var t = this.inlineStack;
                this.inlineStack = [];
                for (var n = 0, r = t.length; n < r; n++) {
                    var s = t[n];
                    if (s instanceof u) {
                        this.compileStack.push(s);
                    } else {
                        var i = this.incrStack();
                        this.pushSource([ i, " = ", s, ";" ]);
                        this.compileStack.push(i);
                    }
                }
            },
            isInline: function e() {
                return this.inlineStack.length;
            },
            popStack: function e(t) {
                var n = this.isInline(), r = (n ? this.inlineStack : this.compileStack).pop();
                if (!t && r instanceof u) {
                    return r.value;
                } else {
                    if (!n) {
                        if (!this.stackSlot) {
                            throw new m["default"]("Invalid stack pop");
                        }
                        this.stackSlot--;
                    }
                    return r;
                }
            },
            topStack: function e() {
                var t = this.isInline() ? this.inlineStack : this.compileStack, n = t[t.length - 1];
                if (n instanceof u) {
                    return n.value;
                } else {
                    return n;
                }
            },
            contextName: function e(t) {
                if (this.useDepths && t) {
                    return "depths[" + t + "]";
                } else {
                    return "depth" + t;
                }
            },
            quotedString: function e(t) {
                return this.source.quotedString(t);
            },
            objectLiteral: function e(t) {
                return this.source.objectLiteral(t);
            },
            aliasable: function e(t) {
                var n = this.aliases[t];
                if (n) {
                    n.referenceCount++;
                    return n;
                }
                n = this.aliases[t] = this.source.wrap(t);
                n.aliasable = true;
                n.referenceCount = 1;
                return n;
            },
            setupHelper: function e(t, n, r) {
                var s = [], i = this.setupHelperArgs(n, t, s, r);
                var o = this.nameLookup("helpers", n, "helper"), a = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
                return {
                    params: s,
                    paramsInit: i,
                    name: o,
                    callParams: [ a ].concat(s)
                };
            },
            setupParams: function e(t, n, r) {
                var s = {}, i = [], o = [], a = [], l = !r, c = undefined;
                if (l) {
                    r = [];
                }
                s.name = this.quotedString(t);
                s.hash = this.popStack();
                if (this.trackIds) {
                    s.hashIds = this.popStack();
                }
                if (this.stringParams) {
                    s.hashTypes = this.popStack();
                    s.hashContexts = this.popStack();
                }
                var u = this.popStack(), f = this.popStack();
                if (f || u) {
                    s.fn = f || "container.noop";
                    s.inverse = u || "container.noop";
                }
                var h = n;
                while (h--) {
                    c = this.popStack();
                    r[h] = c;
                    if (this.trackIds) {
                        a[h] = this.popStack();
                    }
                    if (this.stringParams) {
                        o[h] = this.popStack();
                        i[h] = this.popStack();
                    }
                }
                if (l) {
                    s.args = this.source.generateArray(r);
                }
                if (this.trackIds) {
                    s.ids = this.source.generateArray(a);
                }
                if (this.stringParams) {
                    s.types = this.source.generateArray(o);
                    s.contexts = this.source.generateArray(i);
                }
                if (this.options.data) {
                    s.data = "data";
                }
                if (this.useBlockParams) {
                    s.blockParams = "blockParams";
                }
                return s;
            },
            setupHelperArgs: function e(t, n, r, s) {
                var i = this.setupParams(t, n, r);
                i.loc = JSON.stringify(this.source.currentLocation);
                i = this.objectLiteral(i);
                if (s) {
                    this.useRegister("options");
                    r.push("options");
                    return [ "options=", i ];
                } else if (r) {
                    r.push(i);
                    return "";
                } else {
                    return i;
                }
            }
        };
        (function() {
            var e = ("break else new var" + " case finally return void" + " catch for switch while" + " continue function this with" + " default if throw" + " delete in try" + " do instanceof typeof" + " abstract enum int short" + " boolean export interface static" + " byte extends long super" + " char final native synchronized" + " class float package throws" + " const goto private transient" + " debugger implements protected volatile" + " double import public let yield await" + " null true false").split(" ");
            var t = f.RESERVED_WORDS = {};
            for (var n = 0, r = e.length; n < r; n++) {
                t[e[n]] = true;
            }
        })();
        f.isValidJavaScriptVariableName = function(e) {
            return !f.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e);
        };
        function h(e, t, n, r, s) {
            var i = t.popStack(), o = n.length;
            if (e) {
                o--;
            }
            for (;r < o; r++) {
                i = t.nameLookup(i, n[r], s);
            }
            if (e) {
                return [ t.aliasable("container.strict"), "(", i, ", ", t.quotedString(n[r]), ", ", JSON.stringify(t.source.currentLocation), " )" ];
            } else {
                return i;
            }
        }
        t["default"] = f;
        e.exports = t["default"];
    }, function(e, t, n) {
        "use strict";
        var i = n(60)["default"];
        t.__esModule = true;
        var o = n(5);
        var r = undefined;
        try {
            if (false) {
                var s = require("source-map");
                r = s.SourceNode;
            }
        } catch (e) {}
        if (!r) {
            r = function(e, t, n, r) {
                this.src = "";
                if (r) {
                    this.add(r);
                }
            };
            r.prototype = {
                add: function e(t) {
                    if (o.isArray(t)) {
                        t = t.join("");
                    }
                    this.src += t;
                },
                prepend: function e(t) {
                    if (o.isArray(t)) {
                        t = t.join("");
                    }
                    this.src = t + this.src;
                },
                toStringWithSourceMap: function e() {
                    return {
                        code: this.toString()
                    };
                },
                toString: function e() {
                    return this.src;
                }
            };
        }
        function a(e, t, n) {
            if (o.isArray(e)) {
                var r = [];
                for (var s = 0, i = e.length; s < i; s++) {
                    r.push(t.wrap(e[s], n));
                }
                return r;
            } else if (typeof e === "boolean" || typeof e === "number") {
                return e + "";
            }
            return e;
        }
        function l(e) {
            this.srcFile = e;
            this.source = [];
        }
        l.prototype = {
            isEmpty: function e() {
                return !this.source.length;
            },
            prepend: function e(t, n) {
                this.source.unshift(this.wrap(t, n));
            },
            push: function e(t, n) {
                this.source.push(this.wrap(t, n));
            },
            merge: function e() {
                var t = this.empty();
                this.each(function(e) {
                    t.add([ "  ", e, "\n" ]);
                });
                return t;
            },
            each: function e(t) {
                for (var n = 0, r = this.source.length; n < r; n++) {
                    t(this.source[n]);
                }
            },
            empty: function e() {
                var t = this.currentLocation || {
                    start: {}
                };
                return new r(t.start.line, t.start.column, this.srcFile);
            },
            wrap: function e(t) {
                var n = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || {
                    start: {}
                } : arguments[1];
                if (t instanceof r) {
                    return t;
                }
                t = a(t, this, n);
                return new r(n.start.line, n.start.column, this.srcFile, t);
            },
            functionCall: function e(t, n, r) {
                r = this.generateList(r);
                return this.wrap([ t, n ? "." + n + "(" : "(", r, ")" ]);
            },
            quotedString: function e(t) {
                return '"' + (t + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
            },
            objectLiteral: function e(n) {
                var r = this;
                var s = [];
                i(n).forEach(function(e) {
                    var t = a(n[e], r);
                    if (t !== "undefined") {
                        s.push([ r.quotedString(e), ":", t ]);
                    }
                });
                var t = this.generateList(s);
                t.prepend("{");
                t.add("}");
                return t;
            },
            generateList: function e(t) {
                var n = this.empty();
                for (var r = 0, s = t.length; r < s; r++) {
                    if (r) {
                        n.add(",");
                    }
                    n.add(a(t[r], this));
                }
                return n;
            },
            generateArray: function e(t) {
                var n = this.generateList(t);
                n.prepend("[");
                n.add("]");
                return n;
            }
        };
        t["default"] = l;
        e.exports = t["default"];
    } ]);
});

/**!

BSD 2-Clause License

@license htmx - https://htmx.org
Copyright (c) 2020, Big Sky Software
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/
var htmx = function() {
    "use strict";
    const htmx = {
        onLoad: null,
        process: null,
        on: null,
        off: null,
        trigger: null,
        ajax: null,
        find: null,
        findAll: null,
        closest: null,
        values: function(e, t) {
            const n = getInputValues(e, t || "post");
            return n.values;
        },
        remove: null,
        addClass: null,
        removeClass: null,
        toggleClass: null,
        takeClass: null,
        swap: null,
        defineExtension: null,
        removeExtension: null,
        logAll: null,
        logNone: null,
        logger: null,
        config: {
            historyEnabled: true,
            historyCacheSize: 10,
            refreshOnHistoryMiss: false,
            defaultSwapStyle: "innerHTML",
            defaultSwapDelay: 0,
            defaultSettleDelay: 20,
            includeIndicatorStyles: true,
            indicatorClass: "htmx-indicator",
            requestClass: "htmx-request",
            addedClass: "htmx-added",
            settlingClass: "htmx-settling",
            swappingClass: "htmx-swapping",
            allowEval: true,
            allowScriptTags: true,
            inlineScriptNonce: "",
            inlineStyleNonce: "",
            attributesToSettle: [ "class", "style", "width", "height" ],
            withCredentials: false,
            timeout: 0,
            wsReconnectDelay: "full-jitter",
            wsBinaryType: "blob",
            disableSelector: "[hx-disable], [data-hx-disable]",
            scrollBehavior: "instant",
            defaultFocusScroll: false,
            getCacheBusterParam: false,
            globalViewTransitions: false,
            methodsThatUseUrlParams: [ "get", "delete" ],
            selfRequestsOnly: true,
            ignoreTitle: false,
            scrollIntoViewOnBoost: true,
            triggerSpecsCache: null,
            disableInheritance: false,
            responseHandling: [ {
                code: "204",
                swap: false
            }, {
                code: "[23]..",
                swap: true
            }, {
                code: "[45]..",
                swap: false,
                error: true
            } ],
            allowNestedOobSwaps: true
        },
        parseInterval: null,
        _: null,
        version: "2.0.4"
    };
    htmx.onLoad = onLoadHelper;
    htmx.process = processNode;
    htmx.on = addEventListenerImpl;
    htmx.off = removeEventListenerImpl;
    htmx.trigger = triggerEvent;
    htmx.ajax = ajaxHelper;
    htmx.find = find;
    htmx.findAll = findAll;
    htmx.closest = closest;
    htmx.remove = removeElement;
    htmx.addClass = addClassToElement;
    htmx.removeClass = removeClassFromElement;
    htmx.toggleClass = toggleClassOnElement;
    htmx.takeClass = takeClassForElement;
    htmx.swap = swap;
    htmx.defineExtension = defineExtension;
    htmx.removeExtension = removeExtension;
    htmx.logAll = logAll;
    htmx.logNone = logNone;
    htmx.parseInterval = parseInterval;
    htmx._ = internalEval;
    const internalAPI = {
        addTriggerHandler: addTriggerHandler,
        bodyContains: bodyContains,
        canAccessLocalStorage: canAccessLocalStorage,
        findThisElement: findThisElement,
        filterValues: filterValues,
        swap: swap,
        hasAttribute: hasAttribute,
        getAttributeValue: getAttributeValue,
        getClosestAttributeValue: getClosestAttributeValue,
        getClosestMatch: getClosestMatch,
        getExpressionVars: getExpressionVars,
        getHeaders: getHeaders,
        getInputValues: getInputValues,
        getInternalData: getInternalData,
        getSwapSpecification: getSwapSpecification,
        getTriggerSpecs: getTriggerSpecs,
        getTarget: getTarget,
        makeFragment: makeFragment,
        mergeObjects: mergeObjects,
        makeSettleInfo: makeSettleInfo,
        oobSwap: oobSwap,
        querySelectorExt: querySelectorExt,
        settleImmediately: settleImmediately,
        shouldCancel: shouldCancel,
        triggerEvent: triggerEvent,
        triggerErrorEvent: triggerErrorEvent,
        withExtensions: withExtensions
    };
    const VERBS = [ "get", "post", "put", "delete", "patch" ];
    const VERB_SELECTOR = VERBS.map(function(e) {
        return "[hx-" + e + "], [data-hx-" + e + "]";
    }).join(", ");
    function parseInterval(e) {
        if (e == undefined) {
            return undefined;
        }
        let t = NaN;
        if (e.slice(-2) == "ms") {
            t = parseFloat(e.slice(0, -2));
        } else if (e.slice(-1) == "s") {
            t = parseFloat(e.slice(0, -1)) * 1e3;
        } else if (e.slice(-1) == "m") {
            t = parseFloat(e.slice(0, -1)) * 1e3 * 60;
        } else {
            t = parseFloat(e);
        }
        return isNaN(t) ? undefined : t;
    }
    function getRawAttribute(e, t) {
        return e instanceof Element && e.getAttribute(t);
    }
    function hasAttribute(e, t) {
        return !!e.hasAttribute && (e.hasAttribute(t) || e.hasAttribute("data-" + t));
    }
    function getAttributeValue(e, t) {
        return getRawAttribute(e, t) || getRawAttribute(e, "data-" + t);
    }
    function parentElt(e) {
        const t = e.parentElement;
        if (!t && e.parentNode instanceof ShadowRoot) return e.parentNode;
        return t;
    }
    function getDocument() {
        return document;
    }
    function getRootNode(e, t) {
        return e.getRootNode ? e.getRootNode({
            composed: t
        }) : getDocument();
    }
    function getClosestMatch(e, t) {
        while (e && !t(e)) {
            e = parentElt(e);
        }
        return e || null;
    }
    function getAttributeValueWithDisinheritance(e, t, n) {
        const r = getAttributeValue(t, n);
        const s = getAttributeValue(t, "hx-disinherit");
        var i = getAttributeValue(t, "hx-inherit");
        if (e !== t) {
            if (htmx.config.disableInheritance) {
                if (i && (i === "*" || i.split(" ").indexOf(n) >= 0)) {
                    return r;
                } else {
                    return null;
                }
            }
            if (s && (s === "*" || s.split(" ").indexOf(n) >= 0)) {
                return "unset";
            }
        }
        return r;
    }
    function getClosestAttributeValue(t, n) {
        let r = null;
        getClosestMatch(t, function(e) {
            return !!(r = getAttributeValueWithDisinheritance(t, asElement(e), n));
        });
        if (r !== "unset") {
            return r;
        }
    }
    function matches(e, t) {
        const n = e instanceof Element && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector);
        return !!n && n.call(e, t);
    }
    function getStartTag(e) {
        const t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        const n = t.exec(e);
        if (n) {
            return n[1].toLowerCase();
        } else {
            return "";
        }
    }
    function parseHTML(e) {
        const t = new DOMParser();
        return t.parseFromString(e, "text/html");
    }
    function takeChildrenFor(e, t) {
        while (t.childNodes.length > 0) {
            e.append(t.childNodes[0]);
        }
    }
    function duplicateScript(e) {
        const t = getDocument().createElement("script");
        forEach(e.attributes, function(e) {
            t.setAttribute(e.name, e.value);
        });
        t.textContent = e.textContent;
        t.async = false;
        if (htmx.config.inlineScriptNonce) {
            t.nonce = htmx.config.inlineScriptNonce;
        }
        return t;
    }
    function isJavaScriptScriptNode(e) {
        return e.matches("script") && (e.type === "text/javascript" || e.type === "module" || e.type === "");
    }
    function normalizeScriptTags(e) {
        Array.from(e.querySelectorAll("script")).forEach(e => {
            if (isJavaScriptScriptNode(e)) {
                const t = duplicateScript(e);
                const n = e.parentNode;
                try {
                    n.insertBefore(t, e);
                } catch (e) {
                    logError(e);
                } finally {
                    e.remove();
                }
            }
        });
    }
    function makeFragment(e) {
        const t = e.replace(/<head(\s[^>]*)?>[\s\S]*?<\/head>/i, "");
        const n = getStartTag(t);
        let r;
        if (n === "html") {
            r = new DocumentFragment();
            const i = parseHTML(e);
            takeChildrenFor(r, i.body);
            r.title = i.title;
        } else if (n === "body") {
            r = new DocumentFragment();
            const i = parseHTML(t);
            takeChildrenFor(r, i.body);
            r.title = i.title;
        } else {
            const i = parseHTML('<body><template class="internal-htmx-wrapper">' + t + "</template></body>");
            r = i.querySelector("template").content;
            r.title = i.title;
            var s = r.querySelector("title");
            if (s && s.parentNode === r) {
                s.remove();
                r.title = s.innerText;
            }
        }
        if (r) {
            if (htmx.config.allowScriptTags) {
                normalizeScriptTags(r);
            } else {
                r.querySelectorAll("script").forEach(e => e.remove());
            }
        }
        return r;
    }
    function maybeCall(e) {
        if (e) {
            e();
        }
    }
    function isType(e, t) {
        return Object.prototype.toString.call(e) === "[object " + t + "]";
    }
    function isFunction(e) {
        return typeof e === "function";
    }
    function isRawObject(e) {
        return isType(e, "Object");
    }
    function getInternalData(e) {
        const t = "htmx-internal-data";
        let n = e[t];
        if (!n) {
            n = e[t] = {};
        }
        return n;
    }
    function toArray(t) {
        const n = [];
        if (t) {
            for (let e = 0; e < t.length; e++) {
                n.push(t[e]);
            }
        }
        return n;
    }
    function forEach(t, n) {
        if (t) {
            for (let e = 0; e < t.length; e++) {
                n(t[e]);
            }
        }
    }
    function isScrolledIntoView(e) {
        const t = e.getBoundingClientRect();
        const n = t.top;
        const r = t.bottom;
        return n < window.innerHeight && r >= 0;
    }
    function bodyContains(e) {
        return e.getRootNode({
            composed: true
        }) === document;
    }
    function splitOnWhitespace(e) {
        return e.trim().split(/\s+/);
    }
    function mergeObjects(e, t) {
        for (const n in t) {
            if (t.hasOwnProperty(n)) {
                e[n] = t[n];
            }
        }
        return e;
    }
    function parseJSON(e) {
        try {
            return JSON.parse(e);
        } catch (e) {
            logError(e);
            return null;
        }
    }
    function canAccessLocalStorage() {
        const e = "htmx:localStorageTest";
        try {
            localStorage.setItem(e, e);
            localStorage.removeItem(e);
            return true;
        } catch (e) {
            return false;
        }
    }
    function normalizePath(t) {
        try {
            const e = new URL(t);
            if (e) {
                t = e.pathname + e.search;
            }
            if (!/^\/$/.test(t)) {
                t = t.replace(/\/+$/, "");
            }
            return t;
        } catch (e) {
            return t;
        }
    }
    function internalEval(str) {
        return maybeEval(getDocument().body, function() {
            return eval(str);
        });
    }
    function onLoadHelper(t) {
        const e = htmx.on("htmx:load", function(e) {
            t(e.detail.elt);
        });
        return e;
    }
    function logAll() {
        htmx.logger = function(e, t, n) {
            if (console) {
                console.log(t, e, n);
            }
        };
    }
    function logNone() {
        htmx.logger = null;
    }
    function find(e, t) {
        if (typeof e !== "string") {
            return e.querySelector(t);
        } else {
            return find(getDocument(), e);
        }
    }
    function findAll(e, t) {
        if (typeof e !== "string") {
            return e.querySelectorAll(t);
        } else {
            return findAll(getDocument(), e);
        }
    }
    function getWindow() {
        return window;
    }
    function removeElement(e, t) {
        e = resolveTarget(e);
        if (t) {
            getWindow().setTimeout(function() {
                removeElement(e);
                e = null;
            }, t);
        } else {
            parentElt(e).removeChild(e);
        }
    }
    function asElement(e) {
        return e instanceof Element ? e : null;
    }
    function asHtmlElement(e) {
        return e instanceof HTMLElement ? e : null;
    }
    function asString(e) {
        return typeof e === "string" ? e : null;
    }
    function asParentNode(e) {
        return e instanceof Element || e instanceof Document || e instanceof DocumentFragment ? e : null;
    }
    function addClassToElement(e, t, n) {
        e = asElement(resolveTarget(e));
        if (!e) {
            return;
        }
        if (n) {
            getWindow().setTimeout(function() {
                addClassToElement(e, t);
                e = null;
            }, n);
        } else {
            e.classList && e.classList.add(t);
        }
    }
    function removeClassFromElement(e, t, n) {
        let r = asElement(resolveTarget(e));
        if (!r) {
            return;
        }
        if (n) {
            getWindow().setTimeout(function() {
                removeClassFromElement(r, t);
                r = null;
            }, n);
        } else {
            if (r.classList) {
                r.classList.remove(t);
                if (r.classList.length === 0) {
                    r.removeAttribute("class");
                }
            }
        }
    }
    function toggleClassOnElement(e, t) {
        e = resolveTarget(e);
        e.classList.toggle(t);
    }
    function takeClassForElement(e, t) {
        e = resolveTarget(e);
        forEach(e.parentElement.children, function(e) {
            removeClassFromElement(e, t);
        });
        addClassToElement(asElement(e), t);
    }
    function closest(e, t) {
        e = asElement(resolveTarget(e));
        if (e && e.closest) {
            return e.closest(t);
        } else {
            do {
                if (e == null || matches(e, t)) {
                    return e;
                }
            } while (e = e && asElement(parentElt(e)));
            return null;
        }
    }
    function startsWith(e, t) {
        return e.substring(0, t.length) === t;
    }
    function endsWith(e, t) {
        return e.substring(e.length - t.length) === t;
    }
    function normalizeSelector(e) {
        const t = e.trim();
        if (startsWith(t, "<") && endsWith(t, "/>")) {
            return t.substring(1, t.length - 2);
        } else {
            return t;
        }
    }
    function querySelectorAllExt(t, r, n) {
        if (r.indexOf("global ") === 0) {
            return querySelectorAllExt(t, r.slice(7), true);
        }
        t = resolveTarget(t);
        const s = [];
        {
            let t = 0;
            let n = 0;
            for (let e = 0; e < r.length; e++) {
                const a = r[e];
                if (a === "," && t === 0) {
                    s.push(r.substring(n, e));
                    n = e + 1;
                    continue;
                }
                if (a === "<") {
                    t++;
                } else if (a === "/" && e < r.length - 1 && r[e + 1] === ">") {
                    t--;
                }
            }
            if (n < r.length) {
                s.push(r.substring(n));
            }
        }
        const i = [];
        const o = [];
        while (s.length > 0) {
            const r = normalizeSelector(s.shift());
            let e;
            if (r.indexOf("closest ") === 0) {
                e = closest(asElement(t), normalizeSelector(r.substr(8)));
            } else if (r.indexOf("find ") === 0) {
                e = find(asParentNode(t), normalizeSelector(r.substr(5)));
            } else if (r === "next" || r === "nextElementSibling") {
                e = asElement(t).nextElementSibling;
            } else if (r.indexOf("next ") === 0) {
                e = scanForwardQuery(t, normalizeSelector(r.substr(5)), !!n);
            } else if (r === "previous" || r === "previousElementSibling") {
                e = asElement(t).previousElementSibling;
            } else if (r.indexOf("previous ") === 0) {
                e = scanBackwardsQuery(t, normalizeSelector(r.substr(9)), !!n);
            } else if (r === "document") {
                e = document;
            } else if (r === "window") {
                e = window;
            } else if (r === "body") {
                e = document.body;
            } else if (r === "root") {
                e = getRootNode(t, !!n);
            } else if (r === "host") {
                e = t.getRootNode().host;
            } else {
                o.push(r);
            }
            if (e) {
                i.push(e);
            }
        }
        if (o.length > 0) {
            const e = o.join(",");
            const l = asParentNode(getRootNode(t, !!n));
            i.push(...toArray(l.querySelectorAll(e)));
        }
        return i;
    }
    var scanForwardQuery = function(t, e, n) {
        const r = asParentNode(getRootNode(t, n)).querySelectorAll(e);
        for (let e = 0; e < r.length; e++) {
            const s = r[e];
            if (s.compareDocumentPosition(t) === Node.DOCUMENT_POSITION_PRECEDING) {
                return s;
            }
        }
    };
    var scanBackwardsQuery = function(t, e, n) {
        const r = asParentNode(getRootNode(t, n)).querySelectorAll(e);
        for (let e = r.length - 1; e >= 0; e--) {
            const s = r[e];
            if (s.compareDocumentPosition(t) === Node.DOCUMENT_POSITION_FOLLOWING) {
                return s;
            }
        }
    };
    function querySelectorExt(e, t) {
        if (typeof e !== "string") {
            return querySelectorAllExt(e, t)[0];
        } else {
            return querySelectorAllExt(getDocument().body, e)[0];
        }
    }
    function resolveTarget(e, t) {
        if (typeof e === "string") {
            return find(asParentNode(t) || document, e);
        } else {
            return e;
        }
    }
    function processEventArgs(e, t, n, r) {
        if (isFunction(t)) {
            return {
                target: getDocument().body,
                event: asString(e),
                listener: t,
                options: n
            };
        } else {
            return {
                target: resolveTarget(e),
                event: asString(t),
                listener: n,
                options: r
            };
        }
    }
    function addEventListenerImpl(t, n, r, s) {
        ready(function() {
            const e = processEventArgs(t, n, r, s);
            e.target.addEventListener(e.event, e.listener, e.options);
        });
        const e = isFunction(n);
        return e ? n : r;
    }
    function removeEventListenerImpl(t, n, r) {
        ready(function() {
            const e = processEventArgs(t, n, r);
            e.target.removeEventListener(e.event, e.listener);
        });
        return isFunction(n) ? n : r;
    }
    const DUMMY_ELT = getDocument().createElement("output");
    function findAttributeTargets(e, t) {
        const n = getClosestAttributeValue(e, t);
        if (n) {
            if (n === "this") {
                return [ findThisElement(e, t) ];
            } else {
                const r = querySelectorAllExt(e, n);
                if (r.length === 0) {
                    logError('The selector "' + n + '" on ' + t + " returned no matches!");
                    return [ DUMMY_ELT ];
                } else {
                    return r;
                }
            }
        }
    }
    function findThisElement(e, t) {
        return asElement(getClosestMatch(e, function(e) {
            return getAttributeValue(asElement(e), t) != null;
        }));
    }
    function getTarget(e) {
        const t = getClosestAttributeValue(e, "hx-target");
        if (t) {
            if (t === "this") {
                return findThisElement(e, "hx-target");
            } else {
                return querySelectorExt(e, t);
            }
        } else {
            const n = getInternalData(e);
            if (n.boosted) {
                return getDocument().body;
            } else {
                return e;
            }
        }
    }
    function shouldSettleAttribute(t) {
        const n = htmx.config.attributesToSettle;
        for (let e = 0; e < n.length; e++) {
            if (t === n[e]) {
                return true;
            }
        }
        return false;
    }
    function cloneAttributes(t, n) {
        forEach(t.attributes, function(e) {
            if (!n.hasAttribute(e.name) && shouldSettleAttribute(e.name)) {
                t.removeAttribute(e.name);
            }
        });
        forEach(n.attributes, function(e) {
            if (shouldSettleAttribute(e.name)) {
                t.setAttribute(e.name, e.value);
            }
        });
    }
    function isInlineSwap(t, e) {
        const n = getExtensions(e);
        for (let e = 0; e < n.length; e++) {
            const r = n[e];
            try {
                if (r.isInlineSwap(t)) {
                    return true;
                }
            } catch (e) {
                logError(e);
            }
        }
        return t === "outerHTML";
    }
    function oobSwap(e, s, i, t) {
        t = t || getDocument();
        let n = "#" + getRawAttribute(s, "id");
        let o = "outerHTML";
        if (e === "true") {} else if (e.indexOf(":") > 0) {
            o = e.substring(0, e.indexOf(":"));
            n = e.substring(e.indexOf(":") + 1);
        } else {
            o = e;
        }
        s.removeAttribute("hx-swap-oob");
        s.removeAttribute("data-hx-swap-oob");
        const r = querySelectorAllExt(t, n, false);
        if (r) {
            forEach(r, function(e) {
                let t;
                const n = s.cloneNode(true);
                t = getDocument().createDocumentFragment();
                t.appendChild(n);
                if (!isInlineSwap(o, e)) {
                    t = asParentNode(n);
                }
                const r = {
                    shouldSwap: true,
                    target: e,
                    fragment: t
                };
                if (!triggerEvent(e, "htmx:oobBeforeSwap", r)) return;
                e = r.target;
                if (r.shouldSwap) {
                    handlePreservedElements(t);
                    swapWithStyle(o, e, e, t, i);
                    restorePreservedElements();
                }
                forEach(i.elts, function(e) {
                    triggerEvent(e, "htmx:oobAfterSwap", r);
                });
            });
            s.parentNode.removeChild(s);
        } else {
            s.parentNode.removeChild(s);
            triggerErrorEvent(getDocument().body, "htmx:oobErrorNoTarget", {
                content: s
            });
        }
        return e;
    }
    function restorePreservedElements() {
        const e = find("#--htmx-preserve-pantry--");
        if (e) {
            for (const t of [ ...e.children ]) {
                const n = find("#" + t.id);
                n.parentNode.moveBefore(t, n);
                n.remove();
            }
            e.remove();
        }
    }
    function handlePreservedElements(e) {
        forEach(findAll(e, "[hx-preserve], [data-hx-preserve]"), function(e) {
            const t = getAttributeValue(e, "id");
            const n = getDocument().getElementById(t);
            if (n != null) {
                if (e.moveBefore) {
                    let e = find("#--htmx-preserve-pantry--");
                    if (e == null) {
                        getDocument().body.insertAdjacentHTML("afterend", "<div id='--htmx-preserve-pantry--'></div>");
                        e = find("#--htmx-preserve-pantry--");
                    }
                    e.moveBefore(n, null);
                } else {
                    e.parentNode.replaceChild(n, e);
                }
            }
        });
    }
    function handleAttributes(a, e, l) {
        forEach(e.querySelectorAll("[id]"), function(t) {
            const n = getRawAttribute(t, "id");
            if (n && n.length > 0) {
                const r = n.replace("'", "\\'");
                const s = t.tagName.replace(":", "\\:");
                const e = asParentNode(a);
                const i = e && e.querySelector(s + "[id='" + r + "']");
                if (i && i !== e) {
                    const o = t.cloneNode();
                    cloneAttributes(t, i);
                    l.tasks.push(function() {
                        cloneAttributes(t, o);
                    });
                }
            }
        });
    }
    function makeAjaxLoadTask(e) {
        return function() {
            removeClassFromElement(e, htmx.config.addedClass);
            processNode(asElement(e));
            processFocus(asParentNode(e));
            triggerEvent(e, "htmx:load");
        };
    }
    function processFocus(e) {
        const t = "[autofocus]";
        const n = asHtmlElement(matches(e, t) ? e : e.querySelector(t));
        if (n != null) {
            n.focus();
        }
    }
    function insertNodesBefore(e, t, n, r) {
        handleAttributes(e, n, r);
        while (n.childNodes.length > 0) {
            const s = n.firstChild;
            addClassToElement(asElement(s), htmx.config.addedClass);
            e.insertBefore(s, t);
            if (s.nodeType !== Node.TEXT_NODE && s.nodeType !== Node.COMMENT_NODE) {
                r.tasks.push(makeAjaxLoadTask(s));
            }
        }
    }
    function stringHash(e, t) {
        let n = 0;
        while (n < e.length) {
            t = (t << 5) - t + e.charCodeAt(n++) | 0;
        }
        return t;
    }
    function attributeHash(t) {
        let n = 0;
        if (t.attributes) {
            for (let e = 0; e < t.attributes.length; e++) {
                const r = t.attributes[e];
                if (r.value) {
                    n = stringHash(r.name, n);
                    n = stringHash(r.value, n);
                }
            }
        }
        return n;
    }
    function deInitOnHandlers(t) {
        const n = getInternalData(t);
        if (n.onHandlers) {
            for (let e = 0; e < n.onHandlers.length; e++) {
                const r = n.onHandlers[e];
                removeEventListenerImpl(t, r.event, r.listener);
            }
            delete n.onHandlers;
        }
    }
    function deInitNode(e) {
        const t = getInternalData(e);
        if (t.timeout) {
            clearTimeout(t.timeout);
        }
        if (t.listenerInfos) {
            forEach(t.listenerInfos, function(e) {
                if (e.on) {
                    removeEventListenerImpl(e.on, e.trigger, e.listener);
                }
            });
        }
        deInitOnHandlers(e);
        forEach(Object.keys(t), function(e) {
            if (e !== "firstInitCompleted") delete t[e];
        });
    }
    function cleanUpElement(e) {
        triggerEvent(e, "htmx:beforeCleanupElement");
        deInitNode(e);
        if (e.children) {
            forEach(e.children, function(e) {
                cleanUpElement(e);
            });
        }
    }
    function swapOuterHTML(t, e, n) {
        if (t instanceof Element && t.tagName === "BODY") {
            return swapInnerHTML(t, e, n);
        }
        let r;
        const s = t.previousSibling;
        const i = parentElt(t);
        if (!i) {
            return;
        }
        insertNodesBefore(i, t, e, n);
        if (s == null) {
            r = i.firstChild;
        } else {
            r = s.nextSibling;
        }
        n.elts = n.elts.filter(function(e) {
            return e !== t;
        });
        while (r && r !== t) {
            if (r instanceof Element) {
                n.elts.push(r);
            }
            r = r.nextSibling;
        }
        cleanUpElement(t);
        if (t instanceof Element) {
            t.remove();
        } else {
            t.parentNode.removeChild(t);
        }
    }
    function swapAfterBegin(e, t, n) {
        return insertNodesBefore(e, e.firstChild, t, n);
    }
    function swapBeforeBegin(e, t, n) {
        return insertNodesBefore(parentElt(e), e, t, n);
    }
    function swapBeforeEnd(e, t, n) {
        return insertNodesBefore(e, null, t, n);
    }
    function swapAfterEnd(e, t, n) {
        return insertNodesBefore(parentElt(e), e.nextSibling, t, n);
    }
    function swapDelete(e) {
        cleanUpElement(e);
        const t = parentElt(e);
        if (t) {
            return t.removeChild(e);
        }
    }
    function swapInnerHTML(e, t, n) {
        const r = e.firstChild;
        insertNodesBefore(e, r, t, n);
        if (r) {
            while (r.nextSibling) {
                cleanUpElement(r.nextSibling);
                e.removeChild(r.nextSibling);
            }
            cleanUpElement(r);
            e.removeChild(r);
        }
    }
    function swapWithStyle(t, e, n, r, s) {
        switch (t) {
          case "none":
            return;

          case "outerHTML":
            swapOuterHTML(n, r, s);
            return;

          case "afterbegin":
            swapAfterBegin(n, r, s);
            return;

          case "beforebegin":
            swapBeforeBegin(n, r, s);
            return;

          case "beforeend":
            swapBeforeEnd(n, r, s);
            return;

          case "afterend":
            swapAfterEnd(n, r, s);
            return;

          case "delete":
            swapDelete(n);
            return;

          default:
            var i = getExtensions(e);
            for (let e = 0; e < i.length; e++) {
                const o = i[e];
                try {
                    const a = o.handleSwap(t, n, r, s);
                    if (a) {
                        if (Array.isArray(a)) {
                            for (let e = 0; e < a.length; e++) {
                                const l = a[e];
                                if (l.nodeType !== Node.TEXT_NODE && l.nodeType !== Node.COMMENT_NODE) {
                                    s.tasks.push(makeAjaxLoadTask(l));
                                }
                            }
                        }
                        return;
                    }
                } catch (e) {
                    logError(e);
                }
            }
            if (t === "innerHTML") {
                swapInnerHTML(n, r, s);
            } else {
                swapWithStyle(htmx.config.defaultSwapStyle, e, n, r, s);
            }
        }
    }
    function findAndSwapOobElements(e, n, r) {
        var t = findAll(e, "[hx-swap-oob], [data-hx-swap-oob]");
        forEach(t, function(e) {
            if (htmx.config.allowNestedOobSwaps || e.parentElement === null) {
                const t = getAttributeValue(e, "hx-swap-oob");
                if (t != null) {
                    oobSwap(t, e, n, r);
                }
            } else {
                e.removeAttribute("hx-swap-oob");
                e.removeAttribute("data-hx-swap-oob");
            }
        });
        return t.length > 0;
    }
    function swap(e, t, r, s) {
        if (!s) {
            s = {};
        }
        e = resolveTarget(e);
        const i = s.contextElement ? getRootNode(s.contextElement, false) : getDocument();
        const n = document.activeElement;
        let o = {};
        try {
            o = {
                elt: n,
                start: n ? n.selectionStart : null,
                end: n ? n.selectionEnd : null
            };
        } catch (e) {}
        const a = makeSettleInfo(e);
        if (r.swapStyle === "textContent") {
            e.textContent = t;
        } else {
            let n = makeFragment(t);
            a.title = n.title;
            if (s.selectOOB) {
                const c = s.selectOOB.split(",");
                for (let t = 0; t < c.length; t++) {
                    const u = c[t].split(":", 2);
                    let e = u[0].trim();
                    if (e.indexOf("#") === 0) {
                        e = e.substring(1);
                    }
                    const f = u[1] || "true";
                    const h = n.querySelector("#" + e);
                    if (h) {
                        oobSwap(f, h, a, i);
                    }
                }
            }
            findAndSwapOobElements(n, a, i);
            forEach(findAll(n, "template"), function(e) {
                if (e.content && findAndSwapOobElements(e.content, a, i)) {
                    e.remove();
                }
            });
            if (s.select) {
                const p = getDocument().createDocumentFragment();
                forEach(n.querySelectorAll(s.select), function(e) {
                    p.appendChild(e);
                });
                n = p;
            }
            handlePreservedElements(n);
            swapWithStyle(r.swapStyle, s.contextElement, e, n, a);
            restorePreservedElements();
        }
        if (o.elt && !bodyContains(o.elt) && getRawAttribute(o.elt, "id")) {
            const d = document.getElementById(getRawAttribute(o.elt, "id"));
            const m = {
                preventScroll: r.focusScroll !== undefined ? !r.focusScroll : !htmx.config.defaultFocusScroll
            };
            if (d) {
                if (o.start && d.setSelectionRange) {
                    try {
                        d.setSelectionRange(o.start, o.end);
                    } catch (e) {}
                }
                d.focus(m);
            }
        }
        e.classList.remove(htmx.config.swappingClass);
        forEach(a.elts, function(e) {
            if (e.classList) {
                e.classList.add(htmx.config.settlingClass);
            }
            triggerEvent(e, "htmx:afterSwap", s.eventInfo);
        });
        if (s.afterSwapCallback) {
            s.afterSwapCallback();
        }
        if (!r.ignoreTitle) {
            handleTitle(a.title);
        }
        const l = function() {
            forEach(a.tasks, function(e) {
                e.call();
            });
            forEach(a.elts, function(e) {
                if (e.classList) {
                    e.classList.remove(htmx.config.settlingClass);
                }
                triggerEvent(e, "htmx:afterSettle", s.eventInfo);
            });
            if (s.anchor) {
                const e = asElement(resolveTarget("#" + s.anchor));
                if (e) {
                    e.scrollIntoView({
                        block: "start",
                        behavior: "auto"
                    });
                }
            }
            updateScrollState(a.elts, r);
            if (s.afterSettleCallback) {
                s.afterSettleCallback();
            }
        };
        if (r.settleDelay > 0) {
            getWindow().setTimeout(l, r.settleDelay);
        } else {
            l();
        }
    }
    function handleTriggerHeader(e, t, n) {
        const r = e.getResponseHeader(t);
        if (r.indexOf("{") === 0) {
            const s = parseJSON(r);
            for (const i in s) {
                if (s.hasOwnProperty(i)) {
                    let e = s[i];
                    if (isRawObject(e)) {
                        n = e.target !== undefined ? e.target : n;
                    } else {
                        e = {
                            value: e
                        };
                    }
                    triggerEvent(n, i, e);
                }
            }
        } else {
            const o = r.split(",");
            for (let e = 0; e < o.length; e++) {
                triggerEvent(n, o[e].trim(), []);
            }
        }
    }
    const WHITESPACE = /\s/;
    const WHITESPACE_OR_COMMA = /[\s,]/;
    const SYMBOL_START = /[_$a-zA-Z]/;
    const SYMBOL_CONT = /[_$a-zA-Z0-9]/;
    const STRINGISH_START = [ '"', "'", "/" ];
    const NOT_WHITESPACE = /[^\s]/;
    const COMBINED_SELECTOR_START = /[{(]/;
    const COMBINED_SELECTOR_END = /[})]/;
    function tokenizeString(e) {
        const t = [];
        let n = 0;
        while (n < e.length) {
            if (SYMBOL_START.exec(e.charAt(n))) {
                var r = n;
                while (SYMBOL_CONT.exec(e.charAt(n + 1))) {
                    n++;
                }
                t.push(e.substring(r, n + 1));
            } else if (STRINGISH_START.indexOf(e.charAt(n)) !== -1) {
                const s = e.charAt(n);
                var r = n;
                n++;
                while (n < e.length && e.charAt(n) !== s) {
                    if (e.charAt(n) === "\\") {
                        n++;
                    }
                    n++;
                }
                t.push(e.substring(r, n + 1));
            } else {
                const i = e.charAt(n);
                t.push(i);
            }
            n++;
        }
        return t;
    }
    function isPossibleRelativeReference(e, t, n) {
        return SYMBOL_START.exec(e.charAt(0)) && e !== "true" && e !== "false" && e !== "this" && e !== n && t !== ".";
    }
    function maybeGenerateConditional(r, s, i) {
        if (s[0] === "[") {
            s.shift();
            let e = 1;
            let t = " return (function(" + i + "){ return (";
            let n = null;
            while (s.length > 0) {
                const o = s[0];
                if (o === "]") {
                    e--;
                    if (e === 0) {
                        if (n === null) {
                            t = t + "true";
                        }
                        s.shift();
                        t += ")})";
                        try {
                            const a = maybeEval(r, function() {
                                return Function(t)();
                            }, function() {
                                return true;
                            });
                            a.source = t;
                            return a;
                        } catch (e) {
                            triggerErrorEvent(getDocument().body, "htmx:syntax:error", {
                                error: e,
                                source: t
                            });
                            return null;
                        }
                    }
                } else if (o === "[") {
                    e++;
                }
                if (isPossibleRelativeReference(o, n, i)) {
                    t += "((" + i + "." + o + ") ? (" + i + "." + o + ") : (window." + o + "))";
                } else {
                    t = t + o;
                }
                n = s.shift();
            }
        }
    }
    function consumeUntil(e, t) {
        let n = "";
        while (e.length > 0 && !t.test(e[0])) {
            n += e.shift();
        }
        return n;
    }
    function consumeCSSSelector(e) {
        let t;
        if (e.length > 0 && COMBINED_SELECTOR_START.test(e[0])) {
            e.shift();
            t = consumeUntil(e, COMBINED_SELECTOR_END).trim();
            e.shift();
        } else {
            t = consumeUntil(e, WHITESPACE_OR_COMMA);
        }
        return t;
    }
    const INPUT_SELECTOR = "input, textarea, select";
    function parseAndCacheTrigger(e, t, n) {
        const r = [];
        const s = tokenizeString(t);
        do {
            consumeUntil(s, NOT_WHITESPACE);
            const a = s.length;
            const l = consumeUntil(s, /[,\[\s]/);
            if (l !== "") {
                if (l === "every") {
                    const c = {
                        trigger: "every"
                    };
                    consumeUntil(s, NOT_WHITESPACE);
                    c.pollInterval = parseInterval(consumeUntil(s, /[,\[\s]/));
                    consumeUntil(s, NOT_WHITESPACE);
                    var i = maybeGenerateConditional(e, s, "event");
                    if (i) {
                        c.eventFilter = i;
                    }
                    r.push(c);
                } else {
                    const u = {
                        trigger: l
                    };
                    var i = maybeGenerateConditional(e, s, "event");
                    if (i) {
                        u.eventFilter = i;
                    }
                    consumeUntil(s, NOT_WHITESPACE);
                    while (s.length > 0 && s[0] !== ",") {
                        const f = s.shift();
                        if (f === "changed") {
                            u.changed = true;
                        } else if (f === "once") {
                            u.once = true;
                        } else if (f === "consume") {
                            u.consume = true;
                        } else if (f === "delay" && s[0] === ":") {
                            s.shift();
                            u.delay = parseInterval(consumeUntil(s, WHITESPACE_OR_COMMA));
                        } else if (f === "from" && s[0] === ":") {
                            s.shift();
                            if (COMBINED_SELECTOR_START.test(s[0])) {
                                var o = consumeCSSSelector(s);
                            } else {
                                var o = consumeUntil(s, WHITESPACE_OR_COMMA);
                                if (o === "closest" || o === "find" || o === "next" || o === "previous") {
                                    s.shift();
                                    const h = consumeCSSSelector(s);
                                    if (h.length > 0) {
                                        o += " " + h;
                                    }
                                }
                            }
                            u.from = o;
                        } else if (f === "target" && s[0] === ":") {
                            s.shift();
                            u.target = consumeCSSSelector(s);
                        } else if (f === "throttle" && s[0] === ":") {
                            s.shift();
                            u.throttle = parseInterval(consumeUntil(s, WHITESPACE_OR_COMMA));
                        } else if (f === "queue" && s[0] === ":") {
                            s.shift();
                            u.queue = consumeUntil(s, WHITESPACE_OR_COMMA);
                        } else if (f === "root" && s[0] === ":") {
                            s.shift();
                            u[f] = consumeCSSSelector(s);
                        } else if (f === "threshold" && s[0] === ":") {
                            s.shift();
                            u[f] = consumeUntil(s, WHITESPACE_OR_COMMA);
                        } else {
                            triggerErrorEvent(e, "htmx:syntax:error", {
                                token: s.shift()
                            });
                        }
                        consumeUntil(s, NOT_WHITESPACE);
                    }
                    r.push(u);
                }
            }
            if (s.length === a) {
                triggerErrorEvent(e, "htmx:syntax:error", {
                    token: s.shift()
                });
            }
            consumeUntil(s, NOT_WHITESPACE);
        } while (s[0] === "," && s.shift());
        if (n) {
            n[t] = r;
        }
        return r;
    }
    function getTriggerSpecs(e) {
        const t = getAttributeValue(e, "hx-trigger");
        let n = [];
        if (t) {
            const r = htmx.config.triggerSpecsCache;
            n = r && r[t] || parseAndCacheTrigger(e, t, r);
        }
        if (n.length > 0) {
            return n;
        } else if (matches(e, "form")) {
            return [ {
                trigger: "submit"
            } ];
        } else if (matches(e, 'input[type="button"], input[type="submit"]')) {
            return [ {
                trigger: "click"
            } ];
        } else if (matches(e, INPUT_SELECTOR)) {
            return [ {
                trigger: "change"
            } ];
        } else {
            return [ {
                trigger: "click"
            } ];
        }
    }
    function cancelPolling(e) {
        getInternalData(e).cancelled = true;
    }
    function processPolling(e, t, n) {
        const r = getInternalData(e);
        r.timeout = getWindow().setTimeout(function() {
            if (bodyContains(e) && r.cancelled !== true) {
                if (!maybeFilterEvent(n, e, makeEvent("hx:poll:trigger", {
                    triggerSpec: n,
                    target: e
                }))) {
                    t(e);
                }
                processPolling(e, t, n);
            }
        }, n.pollInterval);
    }
    function isLocalLink(e) {
        return location.hostname === e.hostname && getRawAttribute(e, "href") && getRawAttribute(e, "href").indexOf("#") !== 0;
    }
    function eltIsDisabled(e) {
        return closest(e, htmx.config.disableSelector);
    }
    function boostElement(t, n, e) {
        if (t instanceof HTMLAnchorElement && isLocalLink(t) && (t.target === "" || t.target === "_self") || t.tagName === "FORM" && String(getRawAttribute(t, "method")).toLowerCase() !== "dialog") {
            n.boosted = true;
            let r, s;
            if (t.tagName === "A") {
                r = "get";
                s = getRawAttribute(t, "href");
            } else {
                const i = getRawAttribute(t, "method");
                r = i ? i.toLowerCase() : "get";
                s = getRawAttribute(t, "action");
                if (s == null || s === "") {
                    s = getDocument().location.href;
                }
                if (r === "get" && s.includes("?")) {
                    s = s.replace(/\?[^#]+/, "");
                }
            }
            e.forEach(function(e) {
                addEventListener(t, function(e, t) {
                    const n = asElement(e);
                    if (eltIsDisabled(n)) {
                        cleanUpElement(n);
                        return;
                    }
                    issueAjaxRequest(r, s, n, t);
                }, n, e, true);
            });
        }
    }
    function shouldCancel(e, t) {
        const n = asElement(t);
        if (!n) {
            return false;
        }
        if (e.type === "submit" || e.type === "click") {
            if (n.tagName === "FORM") {
                return true;
            }
            if (matches(n, 'input[type="submit"], button') && (matches(n, "[form]") || closest(n, "form") !== null)) {
                return true;
            }
            if (n instanceof HTMLAnchorElement && n.href && (n.getAttribute("href") === "#" || n.getAttribute("href").indexOf("#") !== 0)) {
                return true;
            }
        }
        return false;
    }
    function ignoreBoostedAnchorCtrlClick(e, t) {
        return getInternalData(e).boosted && e instanceof HTMLAnchorElement && t.type === "click" && (t.ctrlKey || t.metaKey);
    }
    function maybeFilterEvent(e, t, n) {
        const r = e.eventFilter;
        if (r) {
            try {
                return r.call(t, n) !== true;
            } catch (e) {
                const s = r.source;
                triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", {
                    error: e,
                    source: s
                });
                return true;
            }
        }
        return false;
    }
    function addEventListener(a, l, e, c, u) {
        const f = getInternalData(a);
        let t;
        if (c.from) {
            t = querySelectorAllExt(a, c.from);
        } else {
            t = [ a ];
        }
        if (c.changed) {
            if (!("lastValue" in f)) {
                f.lastValue = new WeakMap();
            }
            t.forEach(function(e) {
                if (!f.lastValue.has(c)) {
                    f.lastValue.set(c, new WeakMap());
                }
                f.lastValue.get(c).set(e, e.value);
            });
        }
        forEach(t, function(i) {
            const o = function(e) {
                if (!bodyContains(a)) {
                    i.removeEventListener(c.trigger, o);
                    return;
                }
                if (ignoreBoostedAnchorCtrlClick(a, e)) {
                    return;
                }
                if (u || shouldCancel(e, a)) {
                    e.preventDefault();
                }
                if (maybeFilterEvent(c, a, e)) {
                    return;
                }
                const t = getInternalData(e);
                t.triggerSpec = c;
                if (t.handledFor == null) {
                    t.handledFor = [];
                }
                if (t.handledFor.indexOf(a) < 0) {
                    t.handledFor.push(a);
                    if (c.consume) {
                        e.stopPropagation();
                    }
                    if (c.target && e.target) {
                        if (!matches(asElement(e.target), c.target)) {
                            return;
                        }
                    }
                    if (c.once) {
                        if (f.triggeredOnce) {
                            return;
                        } else {
                            f.triggeredOnce = true;
                        }
                    }
                    if (c.changed) {
                        const n = event.target;
                        const r = n.value;
                        const s = f.lastValue.get(c);
                        if (s.has(n) && s.get(n) === r) {
                            return;
                        }
                        s.set(n, r);
                    }
                    if (f.delayed) {
                        clearTimeout(f.delayed);
                    }
                    if (f.throttle) {
                        return;
                    }
                    if (c.throttle > 0) {
                        if (!f.throttle) {
                            triggerEvent(a, "htmx:trigger");
                            l(a, e);
                            f.throttle = getWindow().setTimeout(function() {
                                f.throttle = null;
                            }, c.throttle);
                        }
                    } else if (c.delay > 0) {
                        f.delayed = getWindow().setTimeout(function() {
                            triggerEvent(a, "htmx:trigger");
                            l(a, e);
                        }, c.delay);
                    } else {
                        triggerEvent(a, "htmx:trigger");
                        l(a, e);
                    }
                }
            };
            if (e.listenerInfos == null) {
                e.listenerInfos = [];
            }
            e.listenerInfos.push({
                trigger: c.trigger,
                listener: o,
                on: i
            });
            i.addEventListener(c.trigger, o);
        });
    }
    let windowIsScrolling = false;
    let scrollHandler = null;
    function initScrollHandler() {
        if (!scrollHandler) {
            scrollHandler = function() {
                windowIsScrolling = true;
            };
            window.addEventListener("scroll", scrollHandler);
            window.addEventListener("resize", scrollHandler);
            setInterval(function() {
                if (windowIsScrolling) {
                    windowIsScrolling = false;
                    forEach(getDocument().querySelectorAll("[hx-trigger*='revealed'],[data-hx-trigger*='revealed']"), function(e) {
                        maybeReveal(e);
                    });
                }
            }, 200);
        }
    }
    function maybeReveal(e) {
        if (!hasAttribute(e, "data-hx-revealed") && isScrolledIntoView(e)) {
            e.setAttribute("data-hx-revealed", "true");
            const t = getInternalData(e);
            if (t.initHash) {
                triggerEvent(e, "revealed");
            } else {
                e.addEventListener("htmx:afterProcessNode", function() {
                    triggerEvent(e, "revealed");
                }, {
                    once: true
                });
            }
        }
    }
    function loadImmediately(e, t, n, r) {
        const s = function() {
            if (!n.loaded) {
                n.loaded = true;
                triggerEvent(e, "htmx:trigger");
                t(e);
            }
        };
        if (r > 0) {
            getWindow().setTimeout(s, r);
        } else {
            s();
        }
    }
    function processVerbs(t, n, e) {
        let i = false;
        forEach(VERBS, function(r) {
            if (hasAttribute(t, "hx-" + r)) {
                const s = getAttributeValue(t, "hx-" + r);
                i = true;
                n.path = s;
                n.verb = r;
                e.forEach(function(e) {
                    addTriggerHandler(t, e, n, function(e, t) {
                        const n = asElement(e);
                        if (closest(n, htmx.config.disableSelector)) {
                            cleanUpElement(n);
                            return;
                        }
                        issueAjaxRequest(r, s, n, t);
                    });
                });
            }
        });
        return i;
    }
    function addTriggerHandler(r, e, t, n) {
        if (e.trigger === "revealed") {
            initScrollHandler();
            addEventListener(r, n, t, e);
            maybeReveal(asElement(r));
        } else if (e.trigger === "intersect") {
            const s = {};
            if (e.root) {
                s.root = querySelectorExt(r, e.root);
            }
            if (e.threshold) {
                s.threshold = parseFloat(e.threshold);
            }
            const i = new IntersectionObserver(function(t) {
                for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (n.isIntersecting) {
                        triggerEvent(r, "intersect");
                        break;
                    }
                }
            }, s);
            i.observe(asElement(r));
            addEventListener(asElement(r), n, t, e);
        } else if (!t.firstInitCompleted && e.trigger === "load") {
            if (!maybeFilterEvent(e, r, makeEvent("load", {
                elt: r
            }))) {
                loadImmediately(asElement(r), n, t, e.delay);
            }
        } else if (e.pollInterval > 0) {
            t.polling = true;
            processPolling(asElement(r), n, e);
        } else {
            addEventListener(r, n, t, e);
        }
    }
    function shouldProcessHxOn(e) {
        const t = asElement(e);
        if (!t) {
            return false;
        }
        const n = t.attributes;
        for (let e = 0; e < n.length; e++) {
            const r = n[e].name;
            if (startsWith(r, "hx-on:") || startsWith(r, "data-hx-on:") || startsWith(r, "hx-on-") || startsWith(r, "data-hx-on-")) {
                return true;
            }
        }
        return false;
    }
    const HX_ON_QUERY = new XPathEvaluator().createExpression('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or' + ' starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]');
    function processHXOnRoot(e, t) {
        if (shouldProcessHxOn(e)) {
            t.push(asElement(e));
        }
        const n = HX_ON_QUERY.evaluate(e);
        let r = null;
        while (r = n.iterateNext()) t.push(asElement(r));
    }
    function findHxOnWildcardElements(e) {
        const t = [];
        if (e instanceof DocumentFragment) {
            for (const n of e.childNodes) {
                processHXOnRoot(n, t);
            }
        } else {
            processHXOnRoot(e, t);
        }
        return t;
    }
    function findElementsToProcess(e) {
        if (e.querySelectorAll) {
            const n = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";
            const r = [];
            for (const i in extensions) {
                const o = extensions[i];
                if (o.getSelectors) {
                    var t = o.getSelectors();
                    if (t) {
                        r.push(t);
                    }
                }
            }
            const s = e.querySelectorAll(VERB_SELECTOR + n + ", form, [type='submit']," + " [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]" + r.flat().map(e => ", " + e).join(""));
            return s;
        } else {
            return [];
        }
    }
    function maybeSetLastButtonClicked(e) {
        const t = closest(asElement(e.target), "button, input[type='submit']");
        const n = getRelatedFormData(e);
        if (n) {
            n.lastButtonClicked = t;
        }
    }
    function maybeUnsetLastButtonClicked(e) {
        const t = getRelatedFormData(e);
        if (t) {
            t.lastButtonClicked = null;
        }
    }
    function getRelatedFormData(e) {
        const t = closest(asElement(e.target), "button, input[type='submit']");
        if (!t) {
            return;
        }
        const n = resolveTarget("#" + getRawAttribute(t, "form"), t.getRootNode()) || closest(t, "form");
        if (!n) {
            return;
        }
        return getInternalData(n);
    }
    function initButtonTracking(e) {
        e.addEventListener("click", maybeSetLastButtonClicked);
        e.addEventListener("focusin", maybeSetLastButtonClicked);
        e.addEventListener("focusout", maybeUnsetLastButtonClicked);
    }
    function addHxOnEventHandler(t, e, n) {
        const r = getInternalData(t);
        if (!Array.isArray(r.onHandlers)) {
            r.onHandlers = [];
        }
        let s;
        const i = function(e) {
            maybeEval(t, function() {
                if (eltIsDisabled(t)) {
                    return;
                }
                if (!s) {
                    s = new Function("event", n);
                }
                s.call(t, e);
            });
        };
        t.addEventListener(e, i);
        r.onHandlers.push({
            event: e,
            listener: i
        });
    }
    function processHxOnWildcard(t) {
        deInitOnHandlers(t);
        for (let e = 0; e < t.attributes.length; e++) {
            const n = t.attributes[e].name;
            const r = t.attributes[e].value;
            if (startsWith(n, "hx-on") || startsWith(n, "data-hx-on")) {
                const s = n.indexOf("-on") + 3;
                const i = n.slice(s, s + 1);
                if (i === "-" || i === ":") {
                    let e = n.slice(s + 1);
                    if (startsWith(e, ":")) {
                        e = "htmx" + e;
                    } else if (startsWith(e, "-")) {
                        e = "htmx:" + e.slice(1);
                    } else if (startsWith(e, "htmx-")) {
                        e = "htmx:" + e.slice(5);
                    }
                    addHxOnEventHandler(t, e, r);
                }
            }
        }
    }
    function initNode(t) {
        if (closest(t, htmx.config.disableSelector)) {
            cleanUpElement(t);
            return;
        }
        const n = getInternalData(t);
        const e = attributeHash(t);
        if (n.initHash !== e) {
            deInitNode(t);
            n.initHash = e;
            triggerEvent(t, "htmx:beforeProcessNode");
            const r = getTriggerSpecs(t);
            const s = processVerbs(t, n, r);
            if (!s) {
                if (getClosestAttributeValue(t, "hx-boost") === "true") {
                    boostElement(t, n, r);
                } else if (hasAttribute(t, "hx-trigger")) {
                    r.forEach(function(e) {
                        addTriggerHandler(t, e, n, function() {});
                    });
                }
            }
            if (t.tagName === "FORM" || getRawAttribute(t, "type") === "submit" && hasAttribute(t, "form")) {
                initButtonTracking(t);
            }
            n.firstInitCompleted = true;
            triggerEvent(t, "htmx:afterProcessNode");
        }
    }
    function processNode(e) {
        e = resolveTarget(e);
        if (closest(e, htmx.config.disableSelector)) {
            cleanUpElement(e);
            return;
        }
        initNode(e);
        forEach(findElementsToProcess(e), function(e) {
            initNode(e);
        });
        forEach(findHxOnWildcardElements(e), processHxOnWildcard);
    }
    function kebabEventName(e) {
        return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    }
    function makeEvent(e, t) {
        let n;
        if (window.CustomEvent && typeof window.CustomEvent === "function") {
            n = new CustomEvent(e, {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: t
            });
        } else {
            n = getDocument().createEvent("CustomEvent");
            n.initCustomEvent(e, true, true, t);
        }
        return n;
    }
    function triggerErrorEvent(e, t, n) {
        triggerEvent(e, t, mergeObjects({
            error: t
        }, n));
    }
    function ignoreEventForLogging(e) {
        return e === "htmx:afterProcessNode";
    }
    function withExtensions(e, t) {
        forEach(getExtensions(e), function(e) {
            try {
                t(e);
            } catch (e) {
                logError(e);
            }
        });
    }
    function logError(e) {
        if (console.error) {
            console.error(e);
        } else if (console.log) {
            console.log("ERROR: ", e);
        }
    }
    function triggerEvent(e, t, n) {
        e = resolveTarget(e);
        if (n == null) {
            n = {};
        }
        n.elt = e;
        const r = makeEvent(t, n);
        if (htmx.logger && !ignoreEventForLogging(t)) {
            htmx.logger(e, t, n);
        }
        if (n.error) {
            logError(n.error);
            triggerEvent(e, "htmx:error", {
                errorInfo: n
            });
        }
        let s = e.dispatchEvent(r);
        const i = kebabEventName(t);
        if (s && i !== t) {
            const o = makeEvent(i, r.detail);
            s = s && e.dispatchEvent(o);
        }
        withExtensions(asElement(e), function(e) {
            s = s && (e.onEvent(t, r) !== false && !r.defaultPrevented);
        });
        return s;
    }
    let currentPathForHistory = location.pathname + location.search;
    function getHistoryElement() {
        const e = getDocument().querySelector("[hx-history-elt],[data-hx-history-elt]");
        return e || getDocument().body;
    }
    function saveToHistoryCache(t, e) {
        if (!canAccessLocalStorage()) {
            return;
        }
        const n = cleanInnerHtmlForHistory(e);
        const r = getDocument().title;
        const s = window.scrollY;
        if (htmx.config.historyCacheSize <= 0) {
            localStorage.removeItem("htmx-history-cache");
            return;
        }
        t = normalizePath(t);
        const i = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
        for (let e = 0; e < i.length; e++) {
            if (i[e].url === t) {
                i.splice(e, 1);
                break;
            }
        }
        const o = {
            url: t,
            content: n,
            title: r,
            scroll: s
        };
        triggerEvent(getDocument().body, "htmx:historyItemCreated", {
            item: o,
            cache: i
        });
        i.push(o);
        while (i.length > htmx.config.historyCacheSize) {
            i.shift();
        }
        while (i.length > 0) {
            try {
                localStorage.setItem("htmx-history-cache", JSON.stringify(i));
                break;
            } catch (e) {
                triggerErrorEvent(getDocument().body, "htmx:historyCacheError", {
                    cause: e,
                    cache: i
                });
                i.shift();
            }
        }
    }
    function getCachedHistory(t) {
        if (!canAccessLocalStorage()) {
            return null;
        }
        t = normalizePath(t);
        const n = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
        for (let e = 0; e < n.length; e++) {
            if (n[e].url === t) {
                return n[e];
            }
        }
        return null;
    }
    function cleanInnerHtmlForHistory(e) {
        const t = htmx.config.requestClass;
        const n = e.cloneNode(true);
        forEach(findAll(n, "." + t), function(e) {
            removeClassFromElement(e, t);
        });
        forEach(findAll(n, "[data-disabled-by-htmx]"), function(e) {
            e.removeAttribute("disabled");
        });
        return n.innerHTML;
    }
    function saveCurrentPageToHistory() {
        const e = getHistoryElement();
        const t = currentPathForHistory || location.pathname + location.search;
        let n;
        try {
            n = getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch (e) {
            n = getDocument().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        if (!n) {
            triggerEvent(getDocument().body, "htmx:beforeHistorySave", {
                path: t,
                historyElt: e
            });
            saveToHistoryCache(t, e);
        }
        if (htmx.config.historyEnabled) history.replaceState({
            htmx: true
        }, getDocument().title, window.location.href);
    }
    function pushUrlIntoHistory(e) {
        if (htmx.config.getCacheBusterParam) {
            e = e.replace(/org\.htmx\.cache-buster=[^&]*&?/, "");
            if (endsWith(e, "&") || endsWith(e, "?")) {
                e = e.slice(0, -1);
            }
        }
        if (htmx.config.historyEnabled) {
            history.pushState({
                htmx: true
            }, "", e);
        }
        currentPathForHistory = e;
    }
    function replaceUrlInHistory(e) {
        if (htmx.config.historyEnabled) history.replaceState({
            htmx: true
        }, "", e);
        currentPathForHistory = e;
    }
    function settleImmediately(e) {
        forEach(e, function(e) {
            e.call(undefined);
        });
    }
    function loadHistoryFromServer(s) {
        const e = new XMLHttpRequest();
        const i = {
            path: s,
            xhr: e
        };
        triggerEvent(getDocument().body, "htmx:historyCacheMiss", i);
        e.open("GET", s, true);
        e.setRequestHeader("HX-Request", "true");
        e.setRequestHeader("HX-History-Restore-Request", "true");
        e.setRequestHeader("HX-Current-URL", getDocument().location.href);
        e.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                triggerEvent(getDocument().body, "htmx:historyCacheMissLoad", i);
                const e = makeFragment(this.response);
                const t = e.querySelector("[hx-history-elt],[data-hx-history-elt]") || e;
                const n = getHistoryElement();
                const r = makeSettleInfo(n);
                handleTitle(e.title);
                handlePreservedElements(e);
                swapInnerHTML(n, t, r);
                restorePreservedElements();
                settleImmediately(r.tasks);
                currentPathForHistory = s;
                triggerEvent(getDocument().body, "htmx:historyRestore", {
                    path: s,
                    cacheMiss: true,
                    serverResponse: this.response
                });
            } else {
                triggerErrorEvent(getDocument().body, "htmx:historyCacheMissLoadError", i);
            }
        };
        e.send();
    }
    function restoreHistory(e) {
        saveCurrentPageToHistory();
        e = e || location.pathname + location.search;
        const t = getCachedHistory(e);
        if (t) {
            const n = makeFragment(t.content);
            const r = getHistoryElement();
            const s = makeSettleInfo(r);
            handleTitle(t.title);
            handlePreservedElements(n);
            swapInnerHTML(r, n, s);
            restorePreservedElements();
            settleImmediately(s.tasks);
            getWindow().setTimeout(function() {
                window.scrollTo(0, t.scroll);
            }, 0);
            currentPathForHistory = e;
            triggerEvent(getDocument().body, "htmx:historyRestore", {
                path: e,
                item: t
            });
        } else {
            if (htmx.config.refreshOnHistoryMiss) {
                window.location.reload(true);
            } else {
                loadHistoryFromServer(e);
            }
        }
    }
    function addRequestIndicatorClasses(e) {
        let t = findAttributeTargets(e, "hx-indicator");
        if (t == null) {
            t = [ e ];
        }
        forEach(t, function(e) {
            const t = getInternalData(e);
            t.requestCount = (t.requestCount || 0) + 1;
            e.classList.add.call(e.classList, htmx.config.requestClass);
        });
        return t;
    }
    function disableElements(e) {
        let t = findAttributeTargets(e, "hx-disabled-elt");
        if (t == null) {
            t = [];
        }
        forEach(t, function(e) {
            const t = getInternalData(e);
            t.requestCount = (t.requestCount || 0) + 1;
            e.setAttribute("disabled", "");
            e.setAttribute("data-disabled-by-htmx", "");
        });
        return t;
    }
    function removeRequestIndicators(e, t) {
        forEach(e.concat(t), function(e) {
            const t = getInternalData(e);
            t.requestCount = (t.requestCount || 1) - 1;
        });
        forEach(e, function(e) {
            const t = getInternalData(e);
            if (t.requestCount === 0) {
                e.classList.remove.call(e.classList, htmx.config.requestClass);
            }
        });
        forEach(t, function(e) {
            const t = getInternalData(e);
            if (t.requestCount === 0) {
                e.removeAttribute("disabled");
                e.removeAttribute("data-disabled-by-htmx");
            }
        });
    }
    function haveSeenNode(t, n) {
        for (let e = 0; e < t.length; e++) {
            const r = t[e];
            if (r.isSameNode(n)) {
                return true;
            }
        }
        return false;
    }
    function shouldInclude(e) {
        const t = e;
        if (t.name === "" || t.name == null || t.disabled || closest(t, "fieldset[disabled]")) {
            return false;
        }
        if (t.type === "button" || t.type === "submit" || t.tagName === "image" || t.tagName === "reset" || t.tagName === "file") {
            return false;
        }
        if (t.type === "checkbox" || t.type === "radio") {
            return t.checked;
        }
        return true;
    }
    function addValueToFormData(t, e, n) {
        if (t != null && e != null) {
            if (Array.isArray(e)) {
                e.forEach(function(e) {
                    n.append(t, e);
                });
            } else {
                n.append(t, e);
            }
        }
    }
    function removeValueFromFormData(t, n, r) {
        if (t != null && n != null) {
            let e = r.getAll(t);
            if (Array.isArray(n)) {
                e = e.filter(e => n.indexOf(e) < 0);
            } else {
                e = e.filter(e => e !== n);
            }
            r.delete(t);
            forEach(e, e => r.append(t, e));
        }
    }
    function processInputValue(t, n, r, s, i) {
        if (s == null || haveSeenNode(t, s)) {
            return;
        } else {
            t.push(s);
        }
        if (shouldInclude(s)) {
            const o = getRawAttribute(s, "name");
            let e = s.value;
            if (s instanceof HTMLSelectElement && s.multiple) {
                e = toArray(s.querySelectorAll("option:checked")).map(function(e) {
                    return e.value;
                });
            }
            if (s instanceof HTMLInputElement && s.files) {
                e = toArray(s.files);
            }
            addValueToFormData(o, e, n);
            if (i) {
                validateElement(s, r);
            }
        }
        if (s instanceof HTMLFormElement) {
            forEach(s.elements, function(e) {
                if (t.indexOf(e) >= 0) {
                    removeValueFromFormData(e.name, e.value, n);
                } else {
                    t.push(e);
                }
                if (i) {
                    validateElement(e, r);
                }
            });
            new FormData(s).forEach(function(e, t) {
                if (e instanceof File && e.name === "") {
                    return;
                }
                addValueToFormData(t, e, n);
            });
        }
    }
    function validateElement(e, t) {
        const n = e;
        if (n.willValidate) {
            triggerEvent(n, "htmx:validation:validate");
            if (!n.checkValidity()) {
                t.push({
                    elt: n,
                    message: n.validationMessage,
                    validity: n.validity
                });
                triggerEvent(n, "htmx:validation:failed", {
                    message: n.validationMessage,
                    validity: n.validity
                });
            }
        }
    }
    function overrideFormData(n, e) {
        for (const t of e.keys()) {
            n.delete(t);
        }
        e.forEach(function(e, t) {
            n.append(t, e);
        });
        return n;
    }
    function getInputValues(e, t) {
        const n = [];
        const r = new FormData();
        const s = new FormData();
        const i = [];
        const o = getInternalData(e);
        if (o.lastButtonClicked && !bodyContains(o.lastButtonClicked)) {
            o.lastButtonClicked = null;
        }
        let a = e instanceof HTMLFormElement && e.noValidate !== true || getAttributeValue(e, "hx-validate") === "true";
        if (o.lastButtonClicked) {
            a = a && o.lastButtonClicked.formNoValidate !== true;
        }
        if (t !== "get") {
            processInputValue(n, s, i, closest(e, "form"), a);
        }
        processInputValue(n, r, i, e, a);
        if (o.lastButtonClicked || e.tagName === "BUTTON" || e.tagName === "INPUT" && getRawAttribute(e, "type") === "submit") {
            const c = o.lastButtonClicked || e;
            const u = getRawAttribute(c, "name");
            addValueToFormData(u, c.value, s);
        }
        const l = findAttributeTargets(e, "hx-include");
        forEach(l, function(e) {
            processInputValue(n, r, i, asElement(e), a);
            if (!matches(e, "form")) {
                forEach(asParentNode(e).querySelectorAll(INPUT_SELECTOR), function(e) {
                    processInputValue(n, r, i, e, a);
                });
            }
        });
        overrideFormData(r, s);
        return {
            errors: i,
            formData: r,
            values: formDataProxy(r)
        };
    }
    function appendParam(e, t, n) {
        if (e !== "") {
            e += "&";
        }
        if (String(n) === "[object Object]") {
            n = JSON.stringify(n);
        }
        const r = encodeURIComponent(n);
        e += encodeURIComponent(t) + "=" + r;
        return e;
    }
    function urlEncode(e) {
        e = formDataFromObject(e);
        let n = "";
        e.forEach(function(e, t) {
            n = appendParam(n, t, e);
        });
        return n;
    }
    function getHeaders(e, t, n) {
        const r = {
            "HX-Request": "true",
            "HX-Trigger": getRawAttribute(e, "id"),
            "HX-Trigger-Name": getRawAttribute(e, "name"),
            "HX-Target": getAttributeValue(t, "id"),
            "HX-Current-URL": getDocument().location.href
        };
        getValuesForElement(e, "hx-headers", false, r);
        if (n !== undefined) {
            r["HX-Prompt"] = n;
        }
        if (getInternalData(e).boosted) {
            r["HX-Boosted"] = "true";
        }
        return r;
    }
    function filterValues(n, e) {
        const t = getClosestAttributeValue(e, "hx-params");
        if (t) {
            if (t === "none") {
                return new FormData();
            } else if (t === "*") {
                return n;
            } else if (t.indexOf("not ") === 0) {
                forEach(t.slice(4).split(","), function(e) {
                    e = e.trim();
                    n.delete(e);
                });
                return n;
            } else {
                const r = new FormData();
                forEach(t.split(","), function(t) {
                    t = t.trim();
                    if (n.has(t)) {
                        n.getAll(t).forEach(function(e) {
                            r.append(t, e);
                        });
                    }
                });
                return r;
            }
        } else {
            return n;
        }
    }
    function isAnchorLink(e) {
        return !!getRawAttribute(e, "href") && getRawAttribute(e, "href").indexOf("#") >= 0;
    }
    function getSwapSpecification(e, t) {
        const n = t || getClosestAttributeValue(e, "hx-swap");
        const r = {
            swapStyle: getInternalData(e).boosted ? "innerHTML" : htmx.config.defaultSwapStyle,
            swapDelay: htmx.config.defaultSwapDelay,
            settleDelay: htmx.config.defaultSettleDelay
        };
        if (htmx.config.scrollIntoViewOnBoost && getInternalData(e).boosted && !isAnchorLink(e)) {
            r.show = "top";
        }
        if (n) {
            const o = splitOnWhitespace(n);
            if (o.length > 0) {
                for (let e = 0; e < o.length; e++) {
                    const a = o[e];
                    if (a.indexOf("swap:") === 0) {
                        r.swapDelay = parseInterval(a.slice(5));
                    } else if (a.indexOf("settle:") === 0) {
                        r.settleDelay = parseInterval(a.slice(7));
                    } else if (a.indexOf("transition:") === 0) {
                        r.transition = a.slice(11) === "true";
                    } else if (a.indexOf("ignoreTitle:") === 0) {
                        r.ignoreTitle = a.slice(12) === "true";
                    } else if (a.indexOf("scroll:") === 0) {
                        const l = a.slice(7);
                        var s = l.split(":");
                        const c = s.pop();
                        var i = s.length > 0 ? s.join(":") : null;
                        r.scroll = c;
                        r.scrollTarget = i;
                    } else if (a.indexOf("show:") === 0) {
                        const u = a.slice(5);
                        var s = u.split(":");
                        const f = s.pop();
                        var i = s.length > 0 ? s.join(":") : null;
                        r.show = f;
                        r.showTarget = i;
                    } else if (a.indexOf("focus-scroll:") === 0) {
                        const h = a.slice("focus-scroll:".length);
                        r.focusScroll = h == "true";
                    } else if (e == 0) {
                        r.swapStyle = a;
                    } else {
                        logError("Unknown modifier in hx-swap: " + a);
                    }
                }
            }
        }
        return r;
    }
    function usesFormData(e) {
        return getClosestAttributeValue(e, "hx-encoding") === "multipart/form-data" || matches(e, "form") && getRawAttribute(e, "enctype") === "multipart/form-data";
    }
    function encodeParamsForBody(t, n, r) {
        let s = null;
        withExtensions(n, function(e) {
            if (s == null) {
                s = e.encodeParameters(t, r, n);
            }
        });
        if (s != null) {
            return s;
        } else {
            if (usesFormData(n)) {
                return overrideFormData(new FormData(), formDataFromObject(r));
            } else {
                return urlEncode(r);
            }
        }
    }
    function makeSettleInfo(e) {
        return {
            tasks: [],
            elts: [ e ]
        };
    }
    function updateScrollState(e, t) {
        const n = e[0];
        const r = e[e.length - 1];
        if (t.scroll) {
            var s = null;
            if (t.scrollTarget) {
                s = asElement(querySelectorExt(n, t.scrollTarget));
            }
            if (t.scroll === "top" && (n || s)) {
                s = s || n;
                s.scrollTop = 0;
            }
            if (t.scroll === "bottom" && (r || s)) {
                s = s || r;
                s.scrollTop = s.scrollHeight;
            }
        }
        if (t.show) {
            var s = null;
            if (t.showTarget) {
                let e = t.showTarget;
                if (t.showTarget === "window") {
                    e = "body";
                }
                s = asElement(querySelectorExt(n, e));
            }
            if (t.show === "top" && (n || s)) {
                s = s || n;
                s.scrollIntoView({
                    block: "start",
                    behavior: htmx.config.scrollBehavior
                });
            }
            if (t.show === "bottom" && (r || s)) {
                s = s || r;
                s.scrollIntoView({
                    block: "end",
                    behavior: htmx.config.scrollBehavior
                });
            }
        }
    }
    function getValuesForElement(r, e, s, i) {
        if (i == null) {
            i = {};
        }
        if (r == null) {
            return i;
        }
        const o = getAttributeValue(r, e);
        if (o) {
            let e = o.trim();
            let t = s;
            if (e === "unset") {
                return null;
            }
            if (e.indexOf("javascript:") === 0) {
                e = e.slice(11);
                t = true;
            } else if (e.indexOf("js:") === 0) {
                e = e.slice(3);
                t = true;
            }
            if (e.indexOf("{") !== 0) {
                e = "{" + e + "}";
            }
            let n;
            if (t) {
                n = maybeEval(r, function() {
                    return Function("return (" + e + ")")();
                }, {});
            } else {
                n = parseJSON(e);
            }
            for (const a in n) {
                if (n.hasOwnProperty(a)) {
                    if (i[a] == null) {
                        i[a] = n[a];
                    }
                }
            }
        }
        return getValuesForElement(asElement(parentElt(r)), e, s, i);
    }
    function maybeEval(e, t, n) {
        if (htmx.config.allowEval) {
            return t();
        } else {
            triggerErrorEvent(e, "htmx:evalDisallowedError");
            return n;
        }
    }
    function getHXVarsForElement(e, t) {
        return getValuesForElement(e, "hx-vars", true, t);
    }
    function getHXValsForElement(e, t) {
        return getValuesForElement(e, "hx-vals", false, t);
    }
    function getExpressionVars(e) {
        return mergeObjects(getHXVarsForElement(e), getHXValsForElement(e));
    }
    function safelySetHeaderValue(t, n, r) {
        if (r !== null) {
            try {
                t.setRequestHeader(n, r);
            } catch (e) {
                t.setRequestHeader(n, encodeURIComponent(r));
                t.setRequestHeader(n + "-URI-AutoEncoded", "true");
            }
        }
    }
    function getPathFromResponse(t) {
        if (t.responseURL && typeof URL !== "undefined") {
            try {
                const e = new URL(t.responseURL);
                return e.pathname + e.search;
            } catch (e) {
                triggerErrorEvent(getDocument().body, "htmx:badResponseUrl", {
                    url: t.responseURL
                });
            }
        }
    }
    function hasHeader(e, t) {
        return t.test(e.getAllResponseHeaders());
    }
    function ajaxHelper(t, n, r) {
        t = t.toLowerCase();
        if (r) {
            if (r instanceof Element || typeof r === "string") {
                return issueAjaxRequest(t, n, null, null, {
                    targetOverride: resolveTarget(r) || DUMMY_ELT,
                    returnPromise: true
                });
            } else {
                let e = resolveTarget(r.target);
                if (r.target && !e || r.source && !e && !resolveTarget(r.source)) {
                    e = DUMMY_ELT;
                }
                return issueAjaxRequest(t, n, resolveTarget(r.source), r.event, {
                    handler: r.handler,
                    headers: r.headers,
                    values: r.values,
                    targetOverride: e,
                    swapOverride: r.swap,
                    select: r.select,
                    returnPromise: true
                });
            }
        } else {
            return issueAjaxRequest(t, n, null, null, {
                returnPromise: true
            });
        }
    }
    function hierarchyForElt(e) {
        const t = [];
        while (e) {
            t.push(e);
            e = e.parentElement;
        }
        return t;
    }
    function verifyPath(e, t, n) {
        let r;
        let s;
        if (typeof URL === "function") {
            s = new URL(t, document.location.href);
            const i = document.location.origin;
            r = i === s.origin;
        } else {
            s = t;
            r = startsWith(t, document.location.origin);
        }
        if (htmx.config.selfRequestsOnly) {
            if (!r) {
                return false;
            }
        }
        return triggerEvent(e, "htmx:validateUrl", mergeObjects({
            url: s,
            sameHost: r
        }, n));
    }
    function formDataFromObject(e) {
        if (e instanceof FormData) return e;
        const t = new FormData();
        for (const n in e) {
            if (e.hasOwnProperty(n)) {
                if (e[n] && typeof e[n].forEach === "function") {
                    e[n].forEach(function(e) {
                        t.append(n, e);
                    });
                } else if (typeof e[n] === "object" && !(e[n] instanceof Blob)) {
                    t.append(n, JSON.stringify(e[n]));
                } else {
                    t.append(n, e[n]);
                }
            }
        }
        return t;
    }
    function formDataArrayProxy(r, s, e) {
        return new Proxy(e, {
            get: function(t, e) {
                if (typeof e === "number") return t[e];
                if (e === "length") return t.length;
                if (e === "push") {
                    return function(e) {
                        t.push(e);
                        r.append(s, e);
                    };
                }
                if (typeof t[e] === "function") {
                    return function() {
                        t[e].apply(t, arguments);
                        r.delete(s);
                        t.forEach(function(e) {
                            r.append(s, e);
                        });
                    };
                }
                if (t[e] && t[e].length === 1) {
                    return t[e][0];
                } else {
                    return t[e];
                }
            },
            set: function(e, t, n) {
                e[t] = n;
                r.delete(s);
                e.forEach(function(e) {
                    r.append(s, e);
                });
                return true;
            }
        });
    }
    function formDataProxy(s) {
        return new Proxy(s, {
            get: function(e, t) {
                if (typeof t === "symbol") {
                    const r = Reflect.get(e, t);
                    if (typeof r === "function") {
                        return function() {
                            return r.apply(s, arguments);
                        };
                    } else {
                        return r;
                    }
                }
                if (t === "toJSON") {
                    return () => Object.fromEntries(s);
                }
                if (t in e) {
                    if (typeof e[t] === "function") {
                        return function() {
                            return s[t].apply(s, arguments);
                        };
                    } else {
                        return e[t];
                    }
                }
                const n = s.getAll(t);
                if (n.length === 0) {
                    return undefined;
                } else if (n.length === 1) {
                    return n[0];
                } else {
                    return formDataArrayProxy(e, t, n);
                }
            },
            set: function(t, n, e) {
                if (typeof n !== "string") {
                    return false;
                }
                t.delete(n);
                if (e && typeof e.forEach === "function") {
                    e.forEach(function(e) {
                        t.append(n, e);
                    });
                } else if (typeof e === "object" && !(e instanceof Blob)) {
                    t.append(n, JSON.stringify(e));
                } else {
                    t.append(n, e);
                }
                return true;
            },
            deleteProperty: function(e, t) {
                if (typeof t === "string") {
                    e.delete(t);
                }
                return true;
            },
            ownKeys: function(e) {
                return Reflect.ownKeys(Object.fromEntries(e));
            },
            getOwnPropertyDescriptor: function(e, t) {
                return Reflect.getOwnPropertyDescriptor(Object.fromEntries(e), t);
            }
        });
    }
    function issueAjaxRequest(t, n, r, s, i, D) {
        let o = null;
        let a = null;
        i = i != null ? i : {};
        if (i.returnPromise && typeof Promise !== "undefined") {
            var e = new Promise(function(e, t) {
                o = e;
                a = t;
            });
        }
        if (r == null) {
            r = getDocument().body;
        }
        const M = i.handler || handleAjaxResponse;
        const F = i.select || null;
        if (!bodyContains(r)) {
            maybeCall(o);
            return e;
        }
        const l = i.targetOverride || asElement(getTarget(r));
        if (l == null || l == DUMMY_ELT) {
            triggerErrorEvent(r, "htmx:targetError", {
                target: getAttributeValue(r, "hx-target")
            });
            maybeCall(a);
            return e;
        }
        let c = getInternalData(r);
        const u = c.lastButtonClicked;
        if (u) {
            const I = getRawAttribute(u, "formaction");
            if (I != null) {
                n = I;
            }
            const N = getRawAttribute(u, "formmethod");
            if (N != null) {
                if (N.toLowerCase() !== "dialog") {
                    t = N;
                }
            }
        }
        const f = getClosestAttributeValue(r, "hx-confirm");
        if (D === undefined) {
            const z = function(e) {
                return issueAjaxRequest(t, n, r, s, i, !!e);
            };
            const J = {
                target: l,
                elt: r,
                path: n,
                verb: t,
                triggeringEvent: s,
                etc: i,
                issueRequest: z,
                question: f
            };
            if (triggerEvent(r, "htmx:confirm", J) === false) {
                maybeCall(o);
                return e;
            }
        }
        let h = r;
        let p = getClosestAttributeValue(r, "hx-sync");
        let d = null;
        let $ = false;
        if (p) {
            const R = p.split(":");
            const T = R[0].trim();
            if (T === "this") {
                h = findThisElement(r, "hx-sync");
            } else {
                h = asElement(querySelectorExt(r, T));
            }
            p = (R[1] || "drop").trim();
            c = getInternalData(h);
            if (p === "drop" && c.xhr && c.abortable !== true) {
                maybeCall(o);
                return e;
            } else if (p === "abort") {
                if (c.xhr) {
                    maybeCall(o);
                    return e;
                } else {
                    $ = true;
                }
            } else if (p === "replace") {
                triggerEvent(h, "htmx:abort");
            } else if (p.indexOf("queue") === 0) {
                const K = p.split(" ");
                d = (K[1] || "last").trim();
            }
        }
        if (c.xhr) {
            if (c.abortable) {
                triggerEvent(h, "htmx:abort");
            } else {
                if (d == null) {
                    if (s) {
                        const H = getInternalData(s);
                        if (H && H.triggerSpec && H.triggerSpec.queue) {
                            d = H.triggerSpec.queue;
                        }
                    }
                    if (d == null) {
                        d = "last";
                    }
                }
                if (c.queuedRequests == null) {
                    c.queuedRequests = [];
                }
                if (d === "first" && c.queuedRequests.length === 0) {
                    c.queuedRequests.push(function() {
                        issueAjaxRequest(t, n, r, s, i);
                    });
                } else if (d === "all") {
                    c.queuedRequests.push(function() {
                        issueAjaxRequest(t, n, r, s, i);
                    });
                } else if (d === "last") {
                    c.queuedRequests = [];
                    c.queuedRequests.push(function() {
                        issueAjaxRequest(t, n, r, s, i);
                    });
                }
                maybeCall(o);
                return e;
            }
        }
        const m = new XMLHttpRequest();
        c.xhr = m;
        c.abortable = $;
        const g = function() {
            c.xhr = null;
            c.abortable = false;
            if (c.queuedRequests != null && c.queuedRequests.length > 0) {
                const e = c.queuedRequests.shift();
                e();
            }
        };
        const B = getClosestAttributeValue(r, "hx-prompt");
        if (B) {
            var v = prompt(B);
            if (v === null || !triggerEvent(r, "htmx:prompt", {
                prompt: v,
                target: l
            })) {
                maybeCall(o);
                g();
                return e;
            }
        }
        if (f && !D) {
            if (!confirm(f)) {
                maybeCall(o);
                g();
                return e;
            }
        }
        let y = getHeaders(r, l, v);
        if (t !== "get" && !usesFormData(r)) {
            y["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (i.headers) {
            y = mergeObjects(y, i.headers);
        }
        const q = getInputValues(r, t);
        let b = q.errors;
        const U = q.formData;
        if (i.values) {
            overrideFormData(U, formDataFromObject(i.values));
        }
        const j = formDataFromObject(getExpressionVars(r));
        const E = overrideFormData(U, j);
        let x = filterValues(E, r);
        if (htmx.config.getCacheBusterParam && t === "get") {
            x.set("org.htmx.cache-buster", getRawAttribute(l, "id") || "true");
        }
        if (n == null || n === "") {
            n = getDocument().location.href;
        }
        const w = getValuesForElement(r, "hx-request");
        const V = getInternalData(r).boosted;
        let S = htmx.config.methodsThatUseUrlParams.indexOf(t) >= 0;
        const k = {
            boosted: V,
            useUrlParams: S,
            formData: x,
            parameters: formDataProxy(x),
            unfilteredFormData: E,
            unfilteredParameters: formDataProxy(E),
            headers: y,
            target: l,
            verb: t,
            errors: b,
            withCredentials: i.credentials || w.credentials || htmx.config.withCredentials,
            timeout: i.timeout || w.timeout || htmx.config.timeout,
            path: n,
            triggeringEvent: s
        };
        if (!triggerEvent(r, "htmx:configRequest", k)) {
            maybeCall(o);
            g();
            return e;
        }
        n = k.path;
        t = k.verb;
        y = k.headers;
        x = formDataFromObject(k.parameters);
        b = k.errors;
        S = k.useUrlParams;
        if (b && b.length > 0) {
            triggerEvent(r, "htmx:validation:halted", k);
            maybeCall(o);
            g();
            return e;
        }
        const W = n.split("#");
        const G = W[0];
        const A = W[1];
        let P = n;
        if (S) {
            P = G;
            const Y = !x.keys().next().done;
            if (Y) {
                if (P.indexOf("?") < 0) {
                    P += "?";
                } else {
                    P += "&";
                }
                P += urlEncode(x);
                if (A) {
                    P += "#" + A;
                }
            }
        }
        if (!verifyPath(r, P, k)) {
            triggerErrorEvent(r, "htmx:invalidPath", k);
            maybeCall(a);
            return e;
        }
        m.open(t.toUpperCase(), P, true);
        m.overrideMimeType("text/html");
        m.withCredentials = k.withCredentials;
        m.timeout = k.timeout;
        if (w.noHeaders) {} else {
            for (const L in y) {
                if (y.hasOwnProperty(L)) {
                    const Z = y[L];
                    safelySetHeaderValue(m, L, Z);
                }
            }
        }
        const C = {
            xhr: m,
            target: l,
            requestConfig: k,
            etc: i,
            boosted: V,
            select: F,
            pathInfo: {
                requestPath: n,
                finalRequestPath: P,
                responsePath: null,
                anchor: A
            }
        };
        m.onload = function() {
            try {
                const t = hierarchyForElt(r);
                C.pathInfo.responsePath = getPathFromResponse(m);
                M(r, C);
                if (C.keepIndicators !== true) {
                    removeRequestIndicators(O, _);
                }
                triggerEvent(r, "htmx:afterRequest", C);
                triggerEvent(r, "htmx:afterOnLoad", C);
                if (!bodyContains(r)) {
                    let e = null;
                    while (t.length > 0 && e == null) {
                        const n = t.shift();
                        if (bodyContains(n)) {
                            e = n;
                        }
                    }
                    if (e) {
                        triggerEvent(e, "htmx:afterRequest", C);
                        triggerEvent(e, "htmx:afterOnLoad", C);
                    }
                }
                maybeCall(o);
                g();
            } catch (e) {
                triggerErrorEvent(r, "htmx:onLoadError", mergeObjects({
                    error: e
                }, C));
                throw e;
            }
        };
        m.onerror = function() {
            removeRequestIndicators(O, _);
            triggerErrorEvent(r, "htmx:afterRequest", C);
            triggerErrorEvent(r, "htmx:sendError", C);
            maybeCall(a);
            g();
        };
        m.onabort = function() {
            removeRequestIndicators(O, _);
            triggerErrorEvent(r, "htmx:afterRequest", C);
            triggerErrorEvent(r, "htmx:sendAbort", C);
            maybeCall(a);
            g();
        };
        m.ontimeout = function() {
            removeRequestIndicators(O, _);
            triggerErrorEvent(r, "htmx:afterRequest", C);
            triggerErrorEvent(r, "htmx:timeout", C);
            maybeCall(a);
            g();
        };
        if (!triggerEvent(r, "htmx:beforeRequest", C)) {
            maybeCall(o);
            g();
            return e;
        }
        var O = addRequestIndicatorClasses(r);
        var _ = disableElements(r);
        forEach([ "loadstart", "loadend", "progress", "abort" ], function(t) {
            forEach([ m, m.upload ], function(e) {
                e.addEventListener(t, function(e) {
                    triggerEvent(r, "htmx:xhr:" + t, {
                        lengthComputable: e.lengthComputable,
                        loaded: e.loaded,
                        total: e.total
                    });
                });
            });
        });
        triggerEvent(r, "htmx:beforeSend", C);
        const X = S ? null : encodeParamsForBody(m, r, x);
        m.send(X);
        return e;
    }
    function determineHistoryUpdates(e, t) {
        const n = t.xhr;
        let r = null;
        let s = null;
        if (hasHeader(n, /HX-Push:/i)) {
            r = n.getResponseHeader("HX-Push");
            s = "push";
        } else if (hasHeader(n, /HX-Push-Url:/i)) {
            r = n.getResponseHeader("HX-Push-Url");
            s = "push";
        } else if (hasHeader(n, /HX-Replace-Url:/i)) {
            r = n.getResponseHeader("HX-Replace-Url");
            s = "replace";
        }
        if (r) {
            if (r === "false") {
                return {};
            } else {
                return {
                    type: s,
                    path: r
                };
            }
        }
        const i = t.pathInfo.finalRequestPath;
        const o = t.pathInfo.responsePath;
        const a = getClosestAttributeValue(e, "hx-push-url");
        const l = getClosestAttributeValue(e, "hx-replace-url");
        const c = getInternalData(e).boosted;
        let u = null;
        let f = null;
        if (a) {
            u = "push";
            f = a;
        } else if (l) {
            u = "replace";
            f = l;
        } else if (c) {
            u = "push";
            f = o || i;
        }
        if (f) {
            if (f === "false") {
                return {};
            }
            if (f === "true") {
                f = o || i;
            }
            if (t.pathInfo.anchor && f.indexOf("#") === -1) {
                f = f + "#" + t.pathInfo.anchor;
            }
            return {
                type: u,
                path: f
            };
        } else {
            return {};
        }
    }
    function codeMatches(e, t) {
        var n = new RegExp(e.code);
        return n.test(t.toString(10));
    }
    function resolveResponseHandling(e) {
        for (var t = 0; t < htmx.config.responseHandling.length; t++) {
            var n = htmx.config.responseHandling[t];
            if (codeMatches(n, e.status)) {
                return n;
            }
        }
        return {
            swap: false
        };
    }
    function handleTitle(e) {
        if (e) {
            const t = find("title");
            if (t) {
                t.innerHTML = e;
            } else {
                window.document.title = e;
            }
        }
    }
    function handleAjaxResponse(s, i) {
        const o = i.xhr;
        let a = i.target;
        const e = i.etc;
        const l = i.select;
        if (!triggerEvent(s, "htmx:beforeOnLoad", i)) return;
        if (hasHeader(o, /HX-Trigger:/i)) {
            handleTriggerHeader(o, "HX-Trigger", s);
        }
        if (hasHeader(o, /HX-Location:/i)) {
            saveCurrentPageToHistory();
            let e = o.getResponseHeader("HX-Location");
            var t;
            if (e.indexOf("{") === 0) {
                t = parseJSON(e);
                e = t.path;
                delete t.path;
            }
            ajaxHelper("get", e, t).then(function() {
                pushUrlIntoHistory(e);
            });
            return;
        }
        const n = hasHeader(o, /HX-Refresh:/i) && o.getResponseHeader("HX-Refresh") === "true";
        if (hasHeader(o, /HX-Redirect:/i)) {
            i.keepIndicators = true;
            location.href = o.getResponseHeader("HX-Redirect");
            n && location.reload();
            return;
        }
        if (n) {
            i.keepIndicators = true;
            location.reload();
            return;
        }
        if (hasHeader(o, /HX-Retarget:/i)) {
            if (o.getResponseHeader("HX-Retarget") === "this") {
                i.target = s;
            } else {
                i.target = asElement(querySelectorExt(s, o.getResponseHeader("HX-Retarget")));
            }
        }
        const c = determineHistoryUpdates(s, i);
        const r = resolveResponseHandling(o);
        const u = r.swap;
        let f = !!r.error;
        let h = htmx.config.ignoreTitle || r.ignoreTitle;
        let p = r.select;
        if (r.target) {
            i.target = asElement(querySelectorExt(s, r.target));
        }
        var d = e.swapOverride;
        if (d == null && r.swapOverride) {
            d = r.swapOverride;
        }
        if (hasHeader(o, /HX-Retarget:/i)) {
            if (o.getResponseHeader("HX-Retarget") === "this") {
                i.target = s;
            } else {
                i.target = asElement(querySelectorExt(s, o.getResponseHeader("HX-Retarget")));
            }
        }
        if (hasHeader(o, /HX-Reswap:/i)) {
            d = o.getResponseHeader("HX-Reswap");
        }
        var m = o.response;
        var g = mergeObjects({
            shouldSwap: u,
            serverResponse: m,
            isError: f,
            ignoreTitle: h,
            selectOverride: p,
            swapOverride: d
        }, i);
        if (r.event && !triggerEvent(a, r.event, g)) return;
        if (!triggerEvent(a, "htmx:beforeSwap", g)) return;
        a = g.target;
        m = g.serverResponse;
        f = g.isError;
        h = g.ignoreTitle;
        p = g.selectOverride;
        d = g.swapOverride;
        i.target = a;
        i.failed = f;
        i.successful = !f;
        if (g.shouldSwap) {
            if (o.status === 286) {
                cancelPolling(s);
            }
            withExtensions(s, function(e) {
                m = e.transformResponse(m, o, s);
            });
            if (c.type) {
                saveCurrentPageToHistory();
            }
            var v = getSwapSpecification(s, d);
            if (!v.hasOwnProperty("ignoreTitle")) {
                v.ignoreTitle = h;
            }
            a.classList.add(htmx.config.swappingClass);
            let n = null;
            let r = null;
            if (l) {
                p = l;
            }
            if (hasHeader(o, /HX-Reselect:/i)) {
                p = o.getResponseHeader("HX-Reselect");
            }
            const y = getClosestAttributeValue(s, "hx-select-oob");
            const b = getClosestAttributeValue(s, "hx-select");
            let e = function() {
                try {
                    if (c.type) {
                        triggerEvent(getDocument().body, "htmx:beforeHistoryUpdate", mergeObjects({
                            history: c
                        }, i));
                        if (c.type === "push") {
                            pushUrlIntoHistory(c.path);
                            triggerEvent(getDocument().body, "htmx:pushedIntoHistory", {
                                path: c.path
                            });
                        } else {
                            replaceUrlInHistory(c.path);
                            triggerEvent(getDocument().body, "htmx:replacedInHistory", {
                                path: c.path
                            });
                        }
                    }
                    swap(a, m, v, {
                        select: p || b,
                        selectOOB: y,
                        eventInfo: i,
                        anchor: i.pathInfo.anchor,
                        contextElement: s,
                        afterSwapCallback: function() {
                            if (hasHeader(o, /HX-Trigger-After-Swap:/i)) {
                                let e = s;
                                if (!bodyContains(s)) {
                                    e = getDocument().body;
                                }
                                handleTriggerHeader(o, "HX-Trigger-After-Swap", e);
                            }
                        },
                        afterSettleCallback: function() {
                            if (hasHeader(o, /HX-Trigger-After-Settle:/i)) {
                                let e = s;
                                if (!bodyContains(s)) {
                                    e = getDocument().body;
                                }
                                handleTriggerHeader(o, "HX-Trigger-After-Settle", e);
                            }
                            maybeCall(n);
                        }
                    });
                } catch (e) {
                    triggerErrorEvent(s, "htmx:swapError", i);
                    maybeCall(r);
                    throw e;
                }
            };
            let t = htmx.config.globalViewTransitions;
            if (v.hasOwnProperty("transition")) {
                t = v.transition;
            }
            if (t && triggerEvent(s, "htmx:beforeTransition", i) && typeof Promise !== "undefined" && document.startViewTransition) {
                const E = new Promise(function(e, t) {
                    n = e;
                    r = t;
                });
                const x = e;
                e = function() {
                    document.startViewTransition(function() {
                        x();
                        return E;
                    });
                };
            }
            if (v.swapDelay > 0) {
                getWindow().setTimeout(e, v.swapDelay);
            } else {
                e();
            }
        }
        if (f) {
            triggerErrorEvent(s, "htmx:responseError", mergeObjects({
                error: "Response Status Error Code " + o.status + " from " + i.pathInfo.requestPath
            }, i));
        }
    }
    const extensions = {};
    function extensionBase() {
        return {
            init: function(e) {
                return null;
            },
            getSelectors: function() {
                return null;
            },
            onEvent: function(e, t) {
                return true;
            },
            transformResponse: function(e, t, n) {
                return e;
            },
            isInlineSwap: function(e) {
                return false;
            },
            handleSwap: function(e, t, n, r) {
                return false;
            },
            encodeParameters: function(e, t, n) {
                return null;
            }
        };
    }
    function defineExtension(e, t) {
        if (t.init) {
            t.init(internalAPI);
        }
        extensions[e] = mergeObjects(extensionBase(), t);
    }
    function removeExtension(e) {
        delete extensions[e];
    }
    function getExtensions(e, n, r) {
        if (n == undefined) {
            n = [];
        }
        if (e == undefined) {
            return n;
        }
        if (r == undefined) {
            r = [];
        }
        const t = getAttributeValue(e, "hx-ext");
        if (t) {
            forEach(t.split(","), function(e) {
                e = e.replace(/ /g, "");
                if (e.slice(0, 7) == "ignore:") {
                    r.push(e.slice(7));
                    return;
                }
                if (r.indexOf(e) < 0) {
                    const t = extensions[e];
                    if (t && n.indexOf(t) < 0) {
                        n.push(t);
                    }
                }
            });
        }
        return getExtensions(asElement(parentElt(e)), n, r);
    }
    var isReady = false;
    getDocument().addEventListener("DOMContentLoaded", function() {
        isReady = true;
    });
    function ready(e) {
        if (isReady || getDocument().readyState === "complete") {
            e();
        } else {
            getDocument().addEventListener("DOMContentLoaded", e);
        }
    }
    function insertIndicatorStyles() {
        if (htmx.config.includeIndicatorStyles !== false) {
            const e = htmx.config.inlineStyleNonce ? ` nonce="${htmx.config.inlineStyleNonce}"` : "";
            getDocument().head.insertAdjacentHTML("beforeend", "<style" + e + ">      ." + htmx.config.indicatorClass + "{opacity:0}      ." + htmx.config.requestClass + " ." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}      ." + htmx.config.requestClass + "." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}      </style>");
        }
    }
    function getMetaConfig() {
        const e = getDocument().querySelector('meta[name="htmx-config"]');
        if (e) {
            return parseJSON(e.content);
        } else {
            return null;
        }
    }
    function mergeMetaConfig() {
        const e = getMetaConfig();
        if (e) {
            htmx.config = mergeObjects(htmx.config, e);
        }
    }
    ready(function() {
        mergeMetaConfig();
        insertIndicatorStyles();
        let e = getDocument().body;
        processNode(e);
        const t = getDocument().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
        e.addEventListener("htmx:abort", function(e) {
            const t = e.target;
            const n = getInternalData(t);
            if (n && n.xhr) {
                n.xhr.abort();
            }
        });
        const n = window.onpopstate ? window.onpopstate.bind(window) : null;
        window.onpopstate = function(e) {
            if (e.state && e.state.htmx) {
                restoreHistory();
                forEach(t, function(e) {
                    triggerEvent(e, "htmx:restored", {
                        document: getDocument(),
                        triggerEvent: triggerEvent
                    });
                });
            } else {
                if (n) {
                    n(e);
                }
            }
        };
        getWindow().setTimeout(function() {
            triggerEvent(e, "htmx:load", {});
            e = null;
        }, 0);
    });
    return htmx;
}()
/**!
@preserve FlowPlater starts here 
*/;

var FlowPlater = function() {
    "use strict";
    const d = function() {
        return {
            level: 1,
            levels: {
                ERROR: 0,
                WARN: 1,
                INFO: 2,
                DEBUG: 3
            },
            log: function(e, ...t) {
                if (e <= this.level) {
                    const n = [ "ERROR", "WARN", "INFO", "DEBUG" ][e];
                    switch (n) {
                      case "ERROR":
                        console.error(`FlowPlater [${n}]:`, ...t);
                        break;

                      case "WARN":
                        console.warn(`FlowPlater [${n}]:`, ...t);
                        break;

                      case "DEBUG":
                        console.debug(`FlowPlater [${n}]:`, ...t);
                        break;

                      default:
                        console.log(`FlowPlater [${n}]:`, ...t);
                    }
                }
            }
        };
    }();
    function g(...e) {
        d.log(d.levels.INFO, ...e);
    }
    function v(...e) {
        d.log(d.levels.ERROR, ...e);
    }
    class h extends Error {
        constructor(e, t) {
            super(e);
            this.name = "FlowPlaterError";
            this.stack = t;
        }
    }
    class y extends h {
        constructor(e, t) {
            super(e);
            this.name = "TemplateError";
            this.stack = t;
        }
    }
    const b = function() {
        const i = new Map();
        return {
            subscribe(e, t, n = null) {
                if (!e || typeof e !== "string") {
                    h("Invalid event name. Event name must be a non-empty string.");
                }
                if (!t || typeof t !== "function") {
                    h(`Invalid callback for event "${e}". Callback must be a function.`);
                }
                if (!i.has(e)) {
                    i.set(e, []);
                }
                i.get(e).push({
                    callback: t,
                    context: n
                });
                d.log(d.levels.DEBUG, `Subscribed to event: ${e}`);
                return () => this.unsubscribe(e, t);
            },
            unsubscribe(e, t) {
                if (!e || typeof e !== "string") {
                    h("Invalid event name. Event name must be a non-empty string. If you are trying to unsubscribe from all events, use unsubscribeAll() instead.");
                }
                if (!i.has(e)) return;
                const n = i.get(e);
                i.set(e, n.filter(e => e.callback !== t));
            },
            unsubscribeAll() {
                i.clear();
                d.log(d.levels.INFO, "Cleared all event subscribers");
            },
            publish(n, r) {
                if (!i.has(n)) return;
                i.get(n).forEach(({
                    callback: e,
                    context: t
                }) => {
                    try {
                        e.call(t, r);
                    } catch (e) {
                        v(`Error in event subscriber for ${n}:`, e);
                    }
                });
                if (r && r.instanceName) {
                    const s = `${r.instanceName}:${n}`;
                    if (i.has(s)) {
                        i.get(s).forEach(({
                            callback: e,
                            context: t
                        }) => {
                            try {
                                e.call(t, r);
                            } catch (e) {
                                v(`Error in instance event subscriber for ${s}:`, e);
                            }
                        });
                    }
                }
            }
        };
    }();
    const E = {
        templateCache: {},
        instances: {},
        length: 0,
        initialized: false,
        defaults: {
            animation: false,
            debug: false
        }
    };
    function i(e) {
        return E.instances[e];
    }
    function D() {
        return E.instances;
    }
    const x = {
        marks: {},
        start: function(e) {
            this.marks[e] = performance.now();
        },
        end: function(e) {
            if (!this.marks[e]) return;
            const t = performance.now() - this.marks[e];
            delete this.marks[e];
            d.log(d.levels.DEBUG, `${e} took ${t.toFixed(2)}ms`);
            return t;
        }
    };
    class M {
        constructor(e) {
            this.cache = new Map();
            this.original = e;
        }
        apply(...e) {
            const t = JSON.stringify(e);
            if (this.cache.has(t)) {
                d.log(d.levels.DEBUG, "Cache hit:", t);
                return this.cache.get(t);
            }
            d.log(d.levels.DEBUG, "Cache miss:", t);
            const n = this.original.apply(this, e);
            this.cache.set(t, n);
            return n;
        }
    }
    function F(e) {
        const t = new M(e);
        const n = (...e) => t.apply(...e);
        n.original = t.original;
        n.cache = t.cache;
        return n;
    }
    const e = [ {
        tag: "fpselect",
        replaceWith: "select"
    } ];
    let f = e;
    function t(e) {
        f = e;
    }
    function $(e) {
        let t = false;
        for (const n of f) {
            const r = e.getElementsByTagName(n.tag);
            if (r.length > 0) {
                t = true;
                const s = Array.from(r);
                for (const i of s) {
                    const o = document.createElement(n.replaceWith);
                    o.innerHTML = i.innerHTML;
                    for (const a of i.attributes) {
                        o.setAttribute(a.name, a.value);
                    }
                    i.parentNode.replaceChild(o, i);
                }
            }
        }
        if (t) {
            g("replaced custom tags", e);
        }
        return e;
    }
    function w(e, t = false) {
        if (!t) {
            return r(e);
        }
        delete E.templateCache[e];
        const n = r.original(e);
        r.cache.set(JSON.stringify([ e ]), n);
        return n;
    }
    const r = F(function(t) {
        x.start("compile:" + t);
        const e = t.startsWith("#") ? t : "#" + t;
        var n = document.querySelector(e);
        g("Trying to compile template: " + t);
        if (!n) {
            v("Template not found: " + t);
            x.end("compile:" + t);
            return null;
        }
        if (!E.templateCache[t] || n.hasAttribute("fp-dynamic") && n.getAttribute("fp-dynamic") !== "false") {
            g("compiling template: " + t);
            function c(t) {
                let n = t.tagName.toLowerCase();
                f.forEach(e => {
                    if (n === e.tag) {
                        n = e.replaceWith;
                    }
                });
                let r = "";
                for (let e of t.attributes) {
                    r += ` ${e.name}="${e.value}"`;
                }
                return `<${n}${r}>`;
            }
            function u(e) {
                let l = "";
                e.childNodes.forEach(e => {
                    if (e.nodeType === Node.TEXT_NODE) {
                        l += e.textContent;
                    } else if (e.nodeType === Node.ELEMENT_NODE) {
                        if (e.hasAttribute("fp")) {
                            const t = e.tagName.toLowerCase();
                            const n = e.getAttribute("fp").split(" ").map(e => e.replace(/&quot;/g, '"')).join(" ");
                            const r = u(e);
                            if (t === "log" || t === "lookup" || t === "execute") {
                                if (r) {
                                    l += `{{${t} ${r} ${n}}}`;
                                } else {
                                    l += `{{${t} ${n}}}`;
                                }
                            } else if (t === "comment") {
                                l += `{{!-- ${n} --}}`;
                            } else if (t === "if") {
                                const s = n.replace(/"/g, '\\"');
                                l += `{{#${t} "${s}"}}${r}{{/${t}}}`;
                            } else if (t === "else") {
                                l += `{{${t}}}${r}`;
                            } else if (t === "math") {
                                if (r) {
                                    console.warn(`FlowPlater: The <${t}> helper does not accept inner content.`);
                                }
                                l += `{{#${t} "${n}"}}`;
                            } else {
                                l += `{{#${t} ${n}}}${r}{{/${t}}}`;
                            }
                        } else if (e.tagName === "else") {
                            const r = u(e);
                            l += `{{${e.tagName.toLowerCase()}}}${r}`;
                        } else if (e.tagName === "template" || e.tagName === "fptemplate" || e.hasAttribute("fp-template")) {
                            l += e.outerHTML;
                        } else {
                            const i = u(e);
                            const o = c(e);
                            let t = e.tagName.toLowerCase();
                            f.forEach(e => {
                                if (t === e.tag) {
                                    t = e.replaceWith;
                                }
                            });
                            const a = `</${t}>`;
                            l += `${o}${i}${a}`;
                        }
                    }
                });
                return l;
            }
            const r = u(n);
            g("Compiling Handlebars template: " + r);
            try {
                const s = Handlebars.compile(r);
                const i = E.config?.templates?.cacheSize || 100;
                if (Object.keys(E.templateCache).length >= i) {
                    const o = Object.keys(E.templateCache)[0];
                    delete E.templateCache[o];
                    g(`Cache limit reached. Removed template: ${o}`);
                }
                E.templateCache[t] = s;
                x.end("compile:" + t);
                return s;
            } catch (e) {
                v("Template not valid: " + r + " | Error: " + e.message);
                x.end("compile:" + t);
                return null;
            }
        }
        x.end("compile:" + t);
        return E.templateCache[t];
    });
    function S(e, t, n = "") {
        d.log(d.levels.DEBUG, `Storage config:`, E.config?.storage);
        if (E.config?.storage?.enabled) {
            try {
                const r = E.config.storage.ttl || 30 * 24 * 60 * 60;
                const s = {
                    data: t,
                    expiry: r === -1 ? -1 : Date.now() + r * 1e3
                };
                const i = `fp_${n}${n ? "_" : ""}${e}`;
                d.log(d.levels.DEBUG, `Saving to localStorage:`, {
                    key: i,
                    data: s
                });
                localStorage.setItem(i, JSON.stringify(s));
            } catch (e) {
                v(`Failed to save to localStorage: ${e.message}`);
            }
        } else {
            d.log(d.levels.DEBUG, `Storage is disabled, skipping save`);
        }
    }
    function k(e, t = "") {
        d.log(d.levels.DEBUG, `Storage config:`, E.config?.storage);
        if (E.config?.storage?.enabled) {
            try {
                const n = `fp_${t}${t ? "_" : ""}${e}`;
                const r = localStorage.getItem(n);
                if (!r) {
                    d.log(d.levels.DEBUG, `No stored item found for: ${n}`);
                    return null;
                }
                const s = JSON.parse(r);
                if (s.expiry !== -1 && Date.now() > s.expiry) {
                    d.log(d.levels.DEBUG, `Stored item has expired: ${n}`);
                    localStorage.removeItem(n);
                    return null;
                }
                d.log(d.levels.DEBUG, `Loaded from localStorage:`, {
                    key: n,
                    data: s
                });
                return s.data;
            } catch (e) {
                v(`Failed to load from localStorage: ${e.message}`);
                return null;
            }
        } else {
            d.log(d.levels.DEBUG, `Storage is disabled, skipping load`);
        }
        return null;
    }
    const B = {
        parseVersion(e) {
            return e.split(".").map(Number);
        },
        compareVersions(e, t) {
            const n = this.parseVersion(e);
            const r = this.parseVersion(t);
            for (let e = 0; e < 3; e++) {
                if (n[e] > r[e]) return 1;
                if (n[e] < r[e]) return -1;
            }
            return 0;
        },
        satisfiesVersion(e, t) {
            if (!e || !t) return false;
            const [ n, r ] = e.split("@");
            if (!r) return true;
            return this.compareVersions(t, r) >= 0;
        }
    };
    const m = {
        plugins: new Map(),
        globalMethods: new Map(),
        instanceMethods: new Map(),
        registerPlugin(e) {
            if (!e || typeof e !== "function") {
                throw new h("Plugin must be a function");
            }
            const t = e();
            const n = [ "name", "enabled", "priority", "version" ];
            for (const r of n) {
                if (!(r in t.config)) {
                    throw new h(`Plugin config must contain '${r}'`);
                }
            }
            if (!/^\d+\.\d+\.\d+$/.test(t.config.version)) {
                throw new h(`Plugin version must be in format 'x.y.z' (got ${t.config.version})`);
            }
            if (this.plugins.has(t.config.name)) {
                throw new h(`Plugin ${t.config.name} already registered`);
            }
            if (t.config.dependencies) {
                for (const s of t.config.dependencies) {
                    const [ i, o ] = s.split("@");
                    const a = this.getPlugin(i);
                    if (!a) {
                        throw new h(`Required dependency '${i}' not found for plugin ${t.config.name}`);
                    }
                    if (!B.satisfiesVersion(s, a.config.version)) {
                        throw new h(`Plugin ${t.config.name} requires ${i} version ${o || "any"}, but found version ${a.config.version}`);
                    }
                }
            }
            if (t.config.optionalDependencies) {
                for (const s of t.config.optionalDependencies) {
                    const [ i, o ] = s.split("@");
                    const a = this.getPlugin(i);
                    if (a && !B.satisfiesVersion(s, a.config.version)) {
                        d.log(d.levels.WARN, `Optional dependency '${i}' version mismatch for plugin ${t.config.name}. Required: ${o || "any"}, Found: ${a.config.version}`);
                    }
                }
            }
            for (const l in t.hooks) {
                if (typeof t.hooks[l] !== "function") {
                    throw new h(`Hook ${l} must be a function`);
                }
            }
            if (t.globalMethods) {
                for (const [ c, u ] of Object.entries(t.globalMethods)) {
                    if (typeof u !== "function") {
                        throw new h(`Global method ${c} must be a function`);
                    }
                    if (this.globalMethods.has(c)) {
                        const f = this.globalMethods.get(c);
                        throw new h(`Global method ${c} already registered by plugin ${f.plugin}`);
                    }
                    this.globalMethods.set(c, {
                        method: u,
                        plugin: t.config.name
                    });
                    if (typeof window !== "undefined" && window.FlowPlater) {
                        window.FlowPlater[c] = (...e) => this.executeGlobalMethod(c, ...e);
                    }
                }
            }
            if (t.instanceMethods) {
                for (const [ c, u ] of Object.entries(t.instanceMethods)) {
                    if (typeof u !== "function") {
                        throw new h(`Instance method ${c} must be a function`);
                    }
                    if (this.instanceMethods.has(c)) {
                        const f = this.instanceMethods.get(c);
                        throw new h(`Instance method ${c} already registered by plugin ${f.plugin}`);
                    }
                    this.instanceMethods.set(c, {
                        method: u,
                        plugin: t.config.name
                    });
                }
            }
            if (t.config?.enabled && typeof t.init === "function") {
                t.init();
            }
            this.plugins.set(t.config.name, t);
            this.updateExistingInstances();
            if (E.initialized && t.hooks?.initComplete) {
                try {
                    t.hooks.initComplete(window.FlowPlater, Object.values(E.instances));
                } catch (e) {
                    d.log(d.levels.ERROR, `Plugin ${t.config.name} failed executing initComplete:`, e);
                }
            }
            return t;
        },
        updateExistingInstances() {
            const e = Object.values(E.instances);
            e.forEach(t => {
                for (const [ n, e ] of this.instanceMethods.entries()) {
                    if (!t[n]) {
                        t[n] = (...e) => this.executeInstanceMethod(n, t, ...e);
                    }
                }
            });
        },
        getPlugin(e) {
            return this.plugins.get(e);
        },
        getAllPlugins() {
            return Array.from(this.plugins.values());
        },
        getEnabledPlugins() {
            return this.getAllPlugins().filter(e => e.config?.enabled);
        },
        removePlugin(e) {
            const t = this.getPlugin(e);
            if (!t) return false;
            const n = new Set();
            for (const [ s, i ] of this.instanceMethods.entries()) {
                if (i.plugin === e) {
                    n.add(s);
                }
            }
            for (const [ s, i ] of this.globalMethods.entries()) {
                if (i.plugin === e) {
                    this.globalMethods.delete(s);
                    if (typeof window !== "undefined" && window.FlowPlater) {
                        delete window.FlowPlater[s];
                    }
                }
            }
            for (const [ s, i ] of this.instanceMethods.entries()) {
                if (i.plugin === e) {
                    this.instanceMethods.delete(s);
                }
            }
            const r = Object.values(E.instances);
            r.forEach(t => {
                n.forEach(e => {
                    delete t[e];
                });
            });
            return this.plugins.delete(e);
        },
        disablePlugin(e) {
            const t = this.getPlugin(e);
            if (!t) return false;
            t.config.enabled = false;
            return true;
        },
        enablePlugin(e) {
            const t = this.getPlugin(e);
            if (!t) return false;
            t.config.enabled = true;
            if (typeof t.init === "function" && !t.state.initialized) {
                t.init();
                t.state.initialized = true;
            }
            return true;
        },
        pluginConfig(e) {
            const t = this.getPlugin(e);
            if (!t) return null;
            return t.config;
        },
        getSortedPlugins() {
            return this.getEnabledPlugins().sort((e, t) => {
                const n = e.config?.priority || 0;
                const r = t.config?.priority || 0;
                return r - n;
            });
        },
        executeHook(t, ...e) {
            d.log(d.levels.DEBUG, "[PLUGIN] Executing hook:", t, e);
            const n = this.getSortedPlugins();
            let r = e[0];
            for (const s of n) {
                if (s.hooks?.[t]) {
                    try {
                        const i = s.hooks[t](...e);
                        if (i !== undefined) {
                            r = i;
                            e[0] = r;
                        } else {
                            d.log(d.levels.WARN, `Plugin ${s.config.name} returned undefined for ${t}`, e[0]);
                            r = e[0];
                        }
                    } catch (e) {
                        d.log(d.levels.ERROR, `Plugin ${s.config.name} failed executing ${t}:`, e);
                    }
                }
            }
            return r;
        },
        executeGlobalMethod(e, ...t) {
            const n = this.globalMethods.get(e);
            if (!n) {
                throw new h(`Global method ${e} not found`);
            }
            const r = this.getPlugin(n.plugin);
            if (!r || !r.config?.enabled) {
                throw new h(`Plugin ${n.plugin} is not enabled`);
            }
            return n.method(r, ...t);
        },
        executeInstanceMethod(e, t, ...n) {
            const r = this.instanceMethods.get(e);
            if (!r) {
                throw new h(`Instance method ${e} not found`);
            }
            const s = this.getPlugin(r.plugin);
            if (!s || !s.config?.enabled) {
                throw new h(`Plugin ${r.plugin} is not enabled`);
            }
            return r.method(t, ...n);
        },
        async destroyPlugin(e) {
            const t = this.getPlugin(e);
            if (!t) return false;
            if (typeof t.destroy === "function") {
                await t.destroy();
            }
            return this.removePlugin(e);
        },
        async destroyAll() {
            const e = this.getAllPlugins();
            await Promise.all(e.map(e => typeof e.destroy === "function" ? e.destroy() : null));
            this.plugins.clear();
            this.globalMethods.clear();
            this.instanceMethods.clear();
        }
    };
    function a(e, t, n = {}) {
        return {
            formId: e.id,
            type: t,
            persistenceEnabled: s(e),
            ...n
        };
    }
    function l(e, t, n = "save") {
        const r = u(e);
        const s = `fp_form_${e.id}`;
        if (n === "save") {
            if (r) {
                S(e.id, t, "form");
            } else {
                sessionStorage.setItem(s, JSON.stringify(t));
            }
        } else if (n === "load") {
            return r ? k(e.id, "form") : JSON.parse(sessionStorage.getItem(s));
        } else if (n === "clear") {
            if (r) localStorage.removeItem(s);
            sessionStorage.removeItem(s);
        }
    }
    function c(e, t) {
        Array.from(e.elements).forEach(e => {
            if (!e.name || e.type === "file") return;
            if (!s(e)) return;
            t(e);
        });
    }
    function q(t, e, n, r = "add") {
        const s = e === "change" ? [ "change", t.type !== "checkbox" && t.type !== "radio" ? "input" : null ] : [ e ];
        s.filter(Boolean).forEach(e => {
            t[`${r}EventListener`](e, n);
        });
    }
    function U(e, t) {
        if (e.type === "checkbox" || e.type === "radio") {
            e.checked = t;
            j(e);
        } else if (e instanceof HTMLSelectElement && e.multiple) {
            Array.from(e.options).forEach(e => {
                e.selected = t.includes(e.value);
            });
        } else {
            e.value = t;
        }
    }
    function j(e) {
        const t = e.closest(e.type === "checkbox" ? ".w-checkbox" : ".w-radio");
        if (!t) return;
        const n = t.querySelector(`.w-${e.type}-input`);
        if (n) {
            n.classList.toggle("w--redirected-checked", e.checked);
        }
    }
    function V(e) {
        let t = false;
        let n = false;
        if (e.hasAttribute("fp-persist")) {
            t = e.getAttribute("fp-persist") !== "false";
            n = e.getAttribute("fp-persist") === "true";
        } else {
            const r = e.form;
            if (r && r.hasAttribute("fp-persist")) {
                t = r.getAttribute("fp-persist") !== "false";
                n = r.getAttribute("fp-persist") === "true";
            } else if (E.config?.storage?.enabled && !E.config?.persistForm) {
                t = false;
                n = false;
            } else {
                t = E.config?.persistForm;
                n = E.config?.storage?.enabled && E.config?.persistForm;
            }
        }
        if (e.tagName === "FORM") {
            const s = Array.from(e.elements).some(e => e.getAttribute("fp-persist") === "true");
            if (s) {
                n = E.config?.storage?.enabled;
            }
        }
        return {
            shouldPersist: t,
            useLocalStorage: n && E.config?.storage?.enabled
        };
    }
    function s(e) {
        return V(e).shouldPersist;
    }
    function u(e) {
        return V(e).useLocalStorage;
    }
    function W(e) {
        try {
            if (e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement) {
                const t = {
                    value: e.value,
                    checked: e.checked,
                    selected: e instanceof HTMLSelectElement ? e.multiple ? Array.from(e.selectedOptions).map(e => e.value) : e.value : null,
                    selectionStart: e instanceof HTMLTextAreaElement ? e.selectionStart : null,
                    selectionEnd: e instanceof HTMLTextAreaElement ? e.selectionEnd : null,
                    scrollTop: e instanceof HTMLTextAreaElement ? e.scrollTop : null,
                    scrollLeft: e instanceof HTMLTextAreaElement ? e.scrollLeft : null
                };
                return t;
            }
            return null;
        } catch (e) {
            d.log(d.levels.ERROR, `Error capturing element state: ${e.message}`);
            return null;
        }
    }
    function G(n, e) {
        try {
            if (!e) return;
            if (n instanceof HTMLSelectElement) {
                if (e.selected) {
                    if (n.multiple && Array.isArray(e.selected)) {
                        e.selected.forEach(e => {
                            const t = n.querySelector(`option[value="${e}"]`);
                            if (t) t.selected = true;
                        });
                    } else {
                        const t = n.querySelector(`option[value="${e.selected}"]`);
                        if (t) {
                            t.selected = true;
                            n.value = e.selected;
                        }
                    }
                }
            } else if (n instanceof HTMLTextAreaElement) {
                n.value = e.value;
                if (e.selectionStart !== null && e.selectionEnd !== null) {
                    n.setSelectionRange(e.selectionStart, e.selectionEnd);
                }
                if (e.scrollTop !== null) n.scrollTop = e.scrollTop;
                if (e.scrollLeft !== null) n.scrollLeft = e.scrollLeft;
            } else {
                n.value = e.value;
                n.checked = e.checked;
            }
        } catch (e) {
            d.log(d.levels.ERROR, `Error restoring element state: ${e.message}`);
        }
    }
    function X(t, e) {
        try {
            Array.from(e.attributes).forEach(e => {
                if (e.name !== "value" && e.name !== "checked" && !e.name.startsWith("w-")) {
                    t.setAttribute(e.name, e.value);
                }
            });
        } catch (e) {
            d.log(d.levels.ERROR, `Error updating element attributes: ${e.message}`);
        }
    }
    function z(e, t) {
        try {
            if (e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement) {
                const n = W(e);
                X(e, t);
                G(e, n);
            }
        } catch (e) {
            d.log(d.levels.ERROR, `Error preserving element state: ${e.message}`);
        }
    }
    function J(e) {
        try {
            const t = e.getElementsByTagName("form");
            const r = {};
            Array.from(t).forEach(e => {
                if (!e.id) return;
                const t = {};
                const n = e.elements;
                Array.from(n).forEach(e => {
                    if (!e.name || e.type === "file") return;
                    if (!s(e)) return;
                    if (e.type === "checkbox" || e.type === "radio") {
                        t[e.name] = e.checked;
                    } else if (e instanceof HTMLSelectElement) {
                        if (e.multiple) {
                            t[e.name] = Array.from(e.selectedOptions).map(e => e.value);
                        } else {
                            t[e.name] = e.value;
                        }
                    } else {
                        t[e.name] = e.value;
                    }
                });
                if (Object.keys(t).length > 0) {
                    b.publish("formState:beforeCapture", {
                        formId: e.id,
                        formElement: e,
                        state: t
                    });
                    r[e.id] = t;
                    if (u(e)) {
                        S(e.id, t, "form");
                    } else {
                        sessionStorage.setItem(`fp_form_${e.id}`, JSON.stringify(t));
                    }
                }
            });
            return r;
        } catch (e) {
            d.log(d.levels.ERROR, `Error capturing form states: ${e.message}`);
            return {};
        }
    }
    function K(e) {
        if (!e.id) return false;
        const t = l(e, null, "load");
        if (!t) {
            d.log(d.levels.DEBUG, `No stored state found for form: ${e.id}`);
            return false;
        }
        const n = a(e, "restore", {
            restoredElements: [],
            customVisualUpdates: [],
            skippedElements: [],
            storageType: u(e) ? "localStorage" : "sessionStorage"
        });
        c(e, e => {
            if (!(e.name in t)) return;
            n.restoredElements.push({
                name: e.name,
                value: t[e.name]
            });
            U(e, t[e.name]);
        });
        d.log(d.levels.DEBUG, `Form state restoration summary for ${e.id}:
    Storage type: ${n.storageType}
    Restored elements:
    ${n.restoredElements.map(e => `- ${e.name}: ${e.value}`).join("\n    ")}
    
    Updated custom visual states for:
    ${n.customVisualUpdates.join(", ")}
    
    Skipped elements (persistence disabled):
    ${n.skippedElements.join(", ")}`);
        b.publish("formState:afterRestore", {
            formId: e.id,
            formElement: e,
            state: t
        });
        return true;
    }
    function Y(e) {
        try {
            const t = e.getElementsByTagName("form");
            Array.from(t).forEach(K);
        } catch (e) {
            d.log(d.levels.ERROR, `Error restoring form states: ${e.message}`);
        }
    }
    function Z(e) {
        try {
            const t = document.getElementById(e);
            if (!t) return;
            l(t, null, "clear");
            b.publish("formState:clear", {
                formId: e,
                formElement: t
            });
        } catch (e) {
            d.log(d.levels.ERROR, `Error clearing form state: ${e.message}`);
        }
    }
    function Q(n) {
        try {
            if (!n.id) {
                d.log(d.levels.DEBUG, "Skipping form without ID");
                return;
            }
            const r = a(n, "setup", {
                formElements: n.elements.length,
                checkboxWrappers: n.querySelectorAll(".w-checkbox").length,
                listenersAdded: [],
                skippedElements: []
            });
            if (!n._fpChangeListeners) {
                n._fpChangeListeners = [];
            }
            c(n, t => {
                if (n._fpChangeListeners.some(({
                    element: e
                }) => e === t)) {
                    return;
                }
                const e = e => te(e);
                q(t, "change", e);
                n._fpChangeListeners.push({
                    element: t,
                    handler: e
                });
                r.listenersAdded.push(t.name);
            });
            d.log(d.levels.DEBUG, `Form setup summary for ${n.id}:
      - Total form elements: ${r.formElements}
      - Checkbox wrappers: ${r.checkboxWrappers}
      - Form persistence: ${r.persistenceEnabled ? "enabled" : "disabled"}
      - Listeners added to: ${r.listenersAdded.join(", ")}
      - Skipped elements: ${r.skippedElements.join(", ")}`);
        } catch (e) {
            d.log(d.levels.ERROR, `Error setting up form change listeners: ${e.message}`);
        }
    }
    function ee(e) {
        try {
            if (!e._fpChangeListeners) return;
            e._fpChangeListeners.forEach(({
                element: e,
                handler: t
            }) => {
                e.removeEventListener("change", t);
                e.removeEventListener("input", t);
            });
            e._fpChangeListeners = [];
        } catch (e) {
            d.log(d.levels.ERROR, `Error cleaning up form change listeners: ${e.message}`);
        }
    }
    function te(e) {
        try {
            const t = e.target;
            const n = t.form;
            if (!n || !n.id) {
                d.log(d.levels.DEBUG, "Skipping change handler - no form or form ID");
                return;
            }
            const r = a(n, "change", {
                changedValues: {},
                skippedElements: []
            });
            const s = {};
            c(n, e => {
                const t = e.type === "checkbox" || e.type === "radio" ? e.checked : e instanceof HTMLSelectElement && e.multiple ? Array.from(e.selectedOptions).map(e => e.value) : e.value;
                s[e.name] = t;
                r.changedValues[e.name] = t;
            });
            if (Object.keys(s).length > 0) {
                l(n, s, "save");
                d.log(d.levels.DEBUG, `Form state update for ${n.id}:
        - Changed element: ${t.name}
        - Storage type: ${u(n) ? "localStorage" : "sessionStorage"}
        - Updated values: ${JSON.stringify(r.changedValues, null, 2)}
        - Skipped elements (persistence disabled): ${r.skippedElements.join(", ")}`);
                let e = null;
                for (const [ i, o ] of Object.entries(E.instances)) {
                    if (Array.from(o.elements).some(e => e.contains(n))) {
                        e = o;
                        break;
                    }
                }
                m.executeHook("updateForm", e, {
                    element: n,
                    id: n.id,
                    data: s,
                    changedElement: t
                });
                b.publish("formState:changed", {
                    formId: n.id,
                    formElement: n,
                    state: s,
                    changedElement: t
                });
            }
        } catch (e) {
            d.log(d.levels.ERROR, `Error handling form element change: ${e.message}`);
        }
    }
    function ne(e) {
        const t = new Set();
        if (e.tagName === "FORM") {
            t.add(e);
        }
        const n = e.closest("form");
        if (n) {
            t.add(n);
        }
        const r = e.getElementsByTagName("form");
        Array.from(r).forEach(e => t.add(e));
        return t;
    }
    function p(e) {
        try {
            d.log(d.levels.DEBUG, "Setting up form submit handlers for element:", e);
            const t = ne(e);
            d.log(d.levels.DEBUG, `Found ${t.size} forms`);
            t.forEach(e => {
                re(e);
            });
        } catch (e) {
            d.log(d.levels.ERROR, `Error setting up form submit handlers: ${e.message}`);
        }
    }
    function re(e) {
        if (!e.id) {
            d.log(d.levels.DEBUG, "Skipping form without ID");
            return;
        }
        d.log(d.levels.DEBUG, `Setting up handlers for form: ${e.id}`);
        e.removeEventListener("submit", se);
        e.addEventListener("submit", se);
        Q(e);
        e._fpHandlersSetup = true;
        if (A(e)) {
            d.log(d.levels.DEBUG, `Restoring state for form: ${e.id}`);
            K(e);
        } else {
            d.log(d.levels.DEBUG, `Skipping form restoration - no persistent elements: ${e.id}`);
        }
    }
    function se(e) {
        try {
            const t = e.target;
            if (t.id) {
                Z(t.id);
            }
        } catch (e) {
            d.log(d.levels.ERROR, `Error handling form submit: ${e.message}`);
        }
    }
    function ie(e) {
        try {
            const t = new MutationObserver(e => {
                e.forEach(e => {
                    e.addedNodes.forEach(e => {
                        if (e.tagName === "FORM") {
                            p(e);
                        }
                    });
                });
            });
            t.observe(e, {
                childList: true,
                subtree: true
            });
            return t;
        } catch (e) {
            d.log(d.levels.ERROR, `Error setting up dynamic form observer: ${e.message}`);
            return null;
        }
    }
    function A(e) {
        const t = e.querySelectorAll('[fp-persist="true"]');
        if (t.length > 0) {
            return true;
        }
        if (e.tagName === "FORM" && e.hasAttribute("fp-persist")) {
            return e.getAttribute("fp-persist") !== "false";
        }
        const n = e.closest("form");
        if (n) {
            if (n.getAttribute("fp-persist") === "false") {
                return false;
            }
            const s = n.elements;
            for (const i of s) {
                if (!i.name || i.type === "file") continue;
                const o = i.closest('[fp-persist="false"]');
                if (o) {
                    continue;
                }
                return true;
            }
        }
        const r = e.getElementsByTagName("form");
        for (const a of r) {
            if (a.getAttribute("fp-persist") === "false") {
                continue;
            }
            const s = a.elements;
            for (const i of s) {
                if (!i.name || i.type === "file") continue;
                const o = i.closest('[fp-persist="false"]');
                if (o) {
                    continue;
                }
                return true;
            }
        }
        return false;
    }
    function oe(a, e, i, t) {
        if (!a.childNodes.length) {
            a.innerHTML = e.innerHTML;
            if (E.config?.persistForm) {
                p(a);
            }
            return;
        }
        if (a instanceof HTMLInputElement) {
            z(a, e);
            return;
        }
        const l = a instanceof SVGElement;
        if (ae(a)) {
            if (a instanceof HTMLIFrameElement || a instanceof HTMLScriptElement) {
                X(a, e);
            } else {
                z(a, e);
            }
            return;
        }
        if (!a.children.length && a.childNodes.length || !e.children.length && e.childNodes.length) {
            le(a, e);
            return;
        }
        if (E.config?.persistForm) {
            J(a);
        }
        const c = Array.from(a.childNodes);
        const n = Array.from(e.childNodes);
        if (c.length === 1 && n.length === 1 && c[0].nodeType === n[0].nodeType && c[0].nodeName === n[0].nodeName) {
            oe(c[0], n[0], i);
            return;
        }
        const u = new Set();
        n.forEach((e, t) => {
            if (e.nodeType === Node.ELEMENT_NODE) {
                const n = e.getAttribute("data-key");
                if (n) {
                    const r = i.get(n);
                    if (r) {
                        const s = c.indexOf(r);
                        if (s !== -1) {
                            a.insertBefore(r, c[t] || null);
                            u.add(s);
                        }
                    }
                }
            }
        });
        n.forEach((n, e) => {
            const t = c.findIndex((e, t) => !u.has(t) && ce(e, n));
            if (t !== -1) {
                u.add(t);
                const r = c[t];
                const s = Array.from(a.childNodes).indexOf(r);
                if (s !== e) {
                    const i = c[e];
                    if (i && i !== r) {
                        a.insertBefore(r, i);
                    }
                }
            } else {
                const o = l ? ue(n) : n.cloneNode(true);
                const i = c[e] || null;
                a.insertBefore(o, i);
            }
        });
        c.forEach((e, t) => {
            if (!u.has(t)) {
                a.removeChild(e);
            }
        });
    }
    function ae(e) {
        const t = [ "INPUT", "SELECT", "TEXTAREA", "IFRAME", "SCRIPT" ];
        return t.includes(e.tagName);
    }
    function le(r, e) {
        const t = Array.from(r.childNodes);
        const s = Array.from(e.childNodes);
        if (t.length === s.length) {
            t.forEach((e, t) => {
                const n = s[t];
                if (!ce(e, n)) {
                    r.replaceChild(n.cloneNode(true), e);
                }
            });
        } else {
            r.innerHTML = e.innerHTML;
        }
    }
    function ce(e, t) {
        if (e.nodeType !== t.nodeType) return false;
        if (e.nodeType === Node.TEXT_NODE) {
            return e.textContent.trim() === t.textContent.trim();
        }
        if (e.nodeType === Node.COMMENT_NODE) {
            return e.textContent === t.textContent;
        }
        if (e instanceof Element && (e.className.includes("w-") || t.className.includes("w-"))) {
            return true;
        }
        return e.isEqualNode(t);
    }
    function ue(e) {
        if (!(e instanceof Element)) return e.cloneNode(true);
        const t = e.namespaceURI;
        const n = t ? document.createElementNS(t, e.tagName) : document.createElement(e.tagName);
        Array.from(e.attributes).forEach(e => {
            const t = e.namespaceURI;
            if (t) {
                n.setAttributeNS(t, e.name, e.value);
            } else {
                n.setAttribute(e.name, e.value);
            }
        });
        Array.from(e.childNodes).forEach(e => {
            n.appendChild(ue(e));
        });
        return n;
    }
    async function P(i, o, t = false) {
        x.start("updateDOM");
        const e = i.hasAttribute("fp-restoring");
        if (e) {
            d.log(d.levels.DEBUG, "Already restoring, skipping");
            return;
        }
        i.setAttribute("fp-restoring", "true");
        try {
            if (!i || !(i instanceof HTMLElement)) {
                throw new Error("Invalid target element");
            }
            if (typeof o !== "string") {
                throw new Error("newHTML must be a string");
            }
            d.log(d.levels.DEBUG, "Starting updateDOM with config:", E.config);
            d.log(d.levels.DEBUG, `Form persistence enabled: ${E.config?.persistForm}, Should restore form: ${A(i)}`);
            let s = null;
            if (E.config?.persistForm && A(i)) {
                d.log(d.levels.DEBUG, "Capturing form states before update");
                s = J(i);
                d.log(d.levels.DEBUG, "Captured form states:", s);
            }
            let e = null;
            if (E.config?.persistForm && A(i)) {
                d.log(d.levels.DEBUG, "Setting up dynamic form observer");
                e = ie(i);
            }
            const n = () => {
                return new Promise(e => {
                    const t = document.createElement("div");
                    t.innerHTML = o.trim();
                    const n = new Map();
                    const r = new Map();
                    fe(i, n);
                    fe(t, r);
                    oe(i, t, n, r);
                    if (E.config?.persistForm && A(i) && s) {
                        d.log(d.levels.DEBUG, "Restoring form states after update");
                        Y(i);
                        p(i);
                    }
                    e();
                });
            };
            if (document.startViewTransition && t) {
                await document.startViewTransition(() => n()).finished;
            } else {
                await n();
            }
            if (E.config?.persistForm && A(i)) {
                d.log(d.levels.DEBUG, "Restoring form states after update");
                const r = i.querySelectorAll('[fp-persist="true"]');
                d.log(d.levels.DEBUG, `Found ${r.length} inputs to restore`);
                Y(i);
                p(i);
            }
            if (e) {
                d.log(d.levels.DEBUG, "Disconnecting form observer");
                e.disconnect();
            }
        } catch (e) {
            d.log(d.levels.ERROR, "Error in updateDOM:", e);
            console.error("UpdateDOM error:", e);
            throw e;
        } finally {
            i.removeAttribute("fp-restoring");
            x.end("updateDOM");
        }
    }
    function fe(e, t) {
        const n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, null, false);
        let r;
        while (r = n.nextNode()) {
            const s = r.getAttribute("data-key");
            if (s) {
                t.set(s, r);
            }
        }
    }
    function he(h) {
        function l(e) {
            const t = E.instances[h];
            if (!t) {
                v("Instance not found: " + h);
                return undefined;
            }
            const n = e.split(/[\.\[\]'"]/);
            let r = t.data;
            for (let e = 0; e < n.length; e++) {
                const s = n[e];
                if (s === "") continue;
                if (r === undefined || r === null || !r.hasOwnProperty(s)) {
                    return undefined;
                }
                r = r[s];
            }
            return r;
        }
        function p(e) {
            if (typeof e === "string" && e.trim().startsWith("<!DOCTYPE")) {
                d.log(d.levels.DEBUG, "Data is HTML, skipping validation", h);
                return {
                    valid: true,
                    isHtml: true
                };
            }
            if (typeof e === "object" && e !== null || Array.isArray(e) || typeof e === "number" || typeof e === "boolean") {
                return {
                    valid: true,
                    isHtml: false
                };
            }
            v("Invalid data type: " + typeof e);
            return {
                valid: false,
                isHtml: false
            };
        }
        return {
            instanceName: h,
            animate: E.defaults.animation,
            _updateDOM: function() {
                const e = E.instances[h];
                if (!e) {
                    v("Instance not found: " + h);
                    return;
                }
                const {
                    valid: t,
                    isHtml: n
                } = p(e.data);
                if (!t || n) {
                    return;
                }
                try {
                    let t;
                    if (this.templateId === "self" || this.templateId === null) {
                        const r = Array.from(this.elements)[0];
                        if (!r) {
                            d.log(d.levels.ERROR, "No template element found for self template", this.instanceName);
                            return;
                        }
                        t = r.innerHTML;
                    } else if (!this.template) {
                        d.log(d.levels.ERROR, "No template found for instance", this.instanceName);
                        return;
                    } else {
                        t = this.template(this.data);
                    }
                    this.elements.forEach(e => {
                        P(e, t, this.animate);
                    });
                } catch (e) {
                    d.log(d.levels.ERROR, "Error updating DOM for instance", this.instanceName, e);
                }
            },
            update: function(e) {
                const t = E.instances[h];
                if (!t) {
                    v("Instance not found: " + h);
                    return this;
                }
                const {
                    valid: n,
                    isHtml: r
                } = p(e);
                if (!n || r) {
                    return this;
                }
                Object.assign(t.data, e);
                Object.assign(t.proxy, e);
                const s = h.replace("#", "");
                S(s, t.data, "instance");
                m.executeHook("updateData", t, {
                    data: t.data,
                    changes: e
                });
                return this._updateDOM();
            },
            remove: function() {
                const e = E.instances[h];
                if (!e) {
                    throw new Error("Instance not found: " + h);
                }
                b.publish("beforeRemove", {
                    instanceName: h,
                    elements: e.elements
                });
                try {
                    if (E.config?.storage?.enabled) {
                        localStorage.removeItem(`fp_${h}`);
                    }
                    e.elements.forEach(function(e) {
                        try {
                            e.innerHTML = "";
                        } catch (e) {
                            v("Error removing instance: " + e.message);
                        }
                    });
                    e.elements = [];
                    delete E.instances[h];
                    delete E.templateCache[e.templateId];
                    b.publish("afterRemove", {
                        instanceName: h,
                        elements: []
                    });
                    g("Removed instance: " + h);
                    return true;
                } catch (e) {
                    throw e;
                }
            },
            refresh: async function(o = {
                remote: true,
                recompile: false
            }) {
                const a = E.instances[h];
                if (!a) {
                    v("Instance not found: " + h);
                    return Promise.reject(new Error("Instance not found: " + h));
                }
                const e = a.template(a.data);
                const t = o.recompile || !e && a.data;
                if (t) {
                    a.template = w(a.templateId, true);
                }
                d.log(d.levels.DEBUG, "Refresh - Template check:", {
                    templateId: a.templateId,
                    templateElement: document.querySelector(a.templateId),
                    compiledTemplate: a.template(a.data)
                });
                const l = [];
                a.elements.forEach(function(n) {
                    try {
                        if (o.remote) {
                            const e = [ "get", "post", "put", "patch", "delete" ];
                            const t = e.some(e => n.getAttribute(`hx-${e}`));
                            if (t) {
                                const r = e.find(e => n.getAttribute(`hx-${e}`));
                                const s = n.getAttribute(`hx-${r}`);
                                const i = fetch(s, {
                                    method: r.toUpperCase()
                                }).then(e => {
                                    if (!e.ok) {
                                        throw new Error(`HTTP error! status: ${e.status}`);
                                    }
                                    return e.json();
                                }).then(e => {
                                    Object.assign(a.data, e);
                                    Object.assign(a.proxy, e);
                                    const t = a.template(a.proxy);
                                    d.log(d.levels.DEBUG, "Refresh - Template render:", {
                                        data: a.data,
                                        rendered: t
                                    });
                                    m.executeHook("updateData", a, {
                                        data: a.data,
                                        changes: e
                                    });
                                    P(n, t, a.animate);
                                    return e;
                                });
                                l.push(i);
                            }
                        } else {
                            P(n, a.template(a.proxy), a.animate);
                        }
                    } catch (e) {
                        n.innerHTML = `<div class="fp-error">Error refreshing template: ${e.message}</div>`;
                        v(`Failed to refresh template: ${e.message}`);
                        l.push(Promise.reject(e));
                    }
                });
                await Promise.all(l);
                return this;
            },
            getData: function() {
                return E.instances[h].data;
            },
            getProxy: function() {
                return E.instances[h].proxy;
            },
            getElements: function() {
                return E.instances[h].elements;
            },
            merge: function(e, n) {
                const t = E.instances[h];
                if (!t) {
                    v("Instance not found: " + h);
                    return this;
                }
                let r = n !== undefined ? n : e;
                const {
                    valid: s,
                    isHtml: i
                } = p(r);
                if (!s || i) {
                    return this;
                }
                try {
                    function o(t, e) {
                        for (const n in e) {
                            if (e.hasOwnProperty(n)) {
                                if (Array.isArray(e[n]) && Array.isArray(t[n])) {
                                    const r = new Map(t[n].map(e => [ e.id, e ]));
                                    e[n].forEach(e => {
                                        if (e.id && r.has(e.id)) {
                                            o(r.get(e.id), e);
                                        } else {
                                            t[n].push(e);
                                        }
                                    });
                                } else if (e[n] && typeof e[n] === "object" && !Array.isArray(e[n])) {
                                    t[n] = t[n] || {};
                                    o(t[n], e[n]);
                                } else {
                                    t[n] = e[n];
                                }
                            }
                        }
                        return t;
                    }
                    if (e && n !== undefined) {
                        let t = this.getData();
                        const a = e.split(/[\.\[\]'"]/);
                        for (let e = 0; e < a.length - 1; e++) {
                            const c = a[e];
                            if (c === "") continue;
                            if (!t[c]) t[c] = {};
                            t = t[c];
                        }
                        const l = a[a.length - 1];
                        if (l !== "") {
                            if (!t[l]) {
                                t[l] = Array.isArray(n) ? [] : {};
                            }
                            if (Array.isArray(n)) {
                                if (!Array.isArray(t[l])) {
                                    t[l] = [];
                                }
                                const u = t[l];
                                n.forEach(t => {
                                    if (t.id) {
                                        const e = u.findIndex(e => e.id === t.id);
                                        if (e >= 0) {
                                            o(u[e], t);
                                        } else {
                                            u.push(t);
                                        }
                                    } else {
                                        u.push(t);
                                    }
                                });
                            } else if (typeof n === "object") {
                                o(t[l], n);
                            } else {
                                t[l] = n;
                            }
                        }
                    } else {
                        o(this.getData(), r);
                    }
                    if (E.config?.storage?.enabled) {
                        const f = h.replace("#", "");
                        S(f, t.data, "instance");
                    }
                    m.executeHook("updateData", t, {
                        data: t.data,
                        changes: r,
                        path: e
                    });
                    return this._updateDOM();
                } catch (e) {
                    v(e.message);
                    return this;
                }
            },
            set: function(e, t) {
                const n = E.instances[h];
                if (!n) {
                    v("Instance not found: " + h);
                    return this;
                }
                const {
                    valid: r,
                    isHtml: s
                } = p(t);
                if (!r || s) {
                    return this;
                }
                try {
                    const i = e.split(/[\.\[\]'"]/g).filter(Boolean);
                    const o = i.pop();
                    const a = i.reduce((e, t) => {
                        if (!e[t]) e[t] = {};
                        return e[t];
                    }, n.data);
                    a[o] = t;
                    Object.assign(n.proxy, n.data);
                    const l = h.replace("#", "");
                    S(l, n.data, "instance");
                    m.executeHook("updateData", n, {
                        data: n.data,
                        changes: {
                            [e]: t
                        }
                    });
                    return this._updateDOM();
                } catch (e) {
                    v(e.message);
                    return this;
                }
            },
            push: function(e, t) {
                const n = E.instances[h];
                if (!n) {
                    v("Instance not found: " + h);
                    return this;
                }
                const {
                    valid: r,
                    isHtml: s
                } = p(t);
                if (!r || s) {
                    return this;
                }
                let i = l(e);
                if (!Array.isArray(i)) {
                    v("Target at path is not an array: " + e);
                    return this;
                }
                try {
                    i.push(t);
                    if (E.config?.storage?.enabled) {
                        const o = h.replace("#", "");
                        S(o, n.data, "instance");
                    }
                    m.executeHook("updateData", n, {
                        data: n.data,
                        changes: {
                            [e]: i
                        },
                        path: e
                    });
                    return this._updateDOM();
                } catch (e) {
                    v(e.message);
                    return this;
                }
            },
            updateWhere: function(e, t, r) {
                const n = E.instances[h];
                if (!n) {
                    v("Instance not found: " + h);
                    return this;
                }
                const {
                    valid: s,
                    isHtml: i
                } = p(r);
                if (!s || i) {
                    return this;
                }
                let o = l(e);
                if (!Array.isArray(o)) {
                    v("Target at path is not an array: " + e);
                    return this;
                }
                try {
                    o.forEach(n => {
                        const e = Object.entries(t).every(([ e, t ]) => n[e] === t);
                        if (e) {
                            Object.assign(n, r);
                        }
                    });
                    if (E.config?.storage?.enabled) {
                        const a = h.replace("#", "");
                        S(a, n.data, "instance");
                    }
                    m.executeHook("updateData", n, {
                        data: n.data,
                        changes: {
                            [e]: o
                        },
                        path: e,
                        criteria: t,
                        updates: r
                    });
                    return this._updateDOM();
                } catch (e) {
                    v(e.message);
                    return this;
                }
            },
            get: function(e) {
                return !e ? this.getData() : l.call(this, e);
            },
            refreshTemplate: function(e, t = false) {
                x.start("refreshTemplate:" + e);
                const n = w(e, t);
                if (!n) {
                    v("Failed to compile template: " + e);
                    x.end("refreshTemplate:" + e);
                    return false;
                }
            }
        };
    }
    function C({
        template: e,
        data: t,
        target: n,
        returnHtml: r = false,
        instanceName: s,
        animate: i = E.defaults.animation,
        recompile: o = false
    }) {
        x.start("render:" + (s || "anonymous"));
        b.publish("beforeRender", {
            instanceName: s,
            template: e,
            data: t,
            target: n,
            returnHtml: r,
            recompile: o
        });
        if (!e || e === "self") {
            const h = typeof n === "string" ? document.querySelector(n) : n;
            e = "#" + h.id;
        }
        let a = [];
        if (n instanceof NodeList) {
            a = Array.from(n);
        } else if (typeof n === "string") {
            a = Array.from(document.querySelectorAll(n));
        } else if (n instanceof Element) {
            a = [ n ];
        }
        if (a.length === 0) {
            v("No target elements found");
            return;
        }
        if (a.length === undefined) {
            a = [ a ];
        }
        if (s) {
            s = s;
        } else if (a[0].hasAttribute("fp-instance")) {
            s = a[0].getAttribute("fp-instance");
        } else if (a[0].id) {
            s = a[0].id;
        } else {
            s = E.length;
        }
        g("Rendering instance: " + s, e, t, n);
        var l = w(e, o);
        E.length++;
        if (!l) {
            v("Template not found: " + e);
            return;
        }
        if (a.length === 0) {
            v("Target not found: " + n);
            return;
        }
        if (!E.instances[s] || E.instances[s].data !== t) {
            const p = k(s, "instance");
            if (p) {
                if (p.isHtml) {
                    const d = {
                        swapStyle: a[0].getAttribute("hx-swap")?.split(" ")[0] || "innerHTML",
                        swapDelay: 0,
                        settleDelay: 0,
                        transition: a[0].getAttribute("hx-swap")?.includes("transition:true") || false
                    };
                    if (r) {
                        return p.data;
                    }
                    a.forEach(e => {
                        htmx.swap(e, p.data, d);
                    });
                    return E.instances[s];
                }
                t = {
                    ...p,
                    ...t
                };
            }
            var c = pe(t, t => {
                const e = a.filter(e => document.body.contains(e));
                e.forEach(e => {
                    P(e, l(t));
                });
            });
            E.instances[s] = {
                elements: new Set(a),
                template: l,
                templateId: a[0].getAttribute("fp-template") || e,
                proxy: c,
                data: t,
                cleanup: () => {
                    this.elements.clear();
                },
                ...he(s)
            };
            if (E.config?.storage?.enabled) {
                const m = s.replace("#", "");
                S(m, t, "instance");
            }
        }
        const u = E.instances[s];
        g("Proxy created: ", u.proxy);
        try {
            if (r) {
                var f = u.template(u.proxy);
                return f;
            }
            a.forEach(function(t) {
                try {
                    P(t, u.template(u.proxy), u.animate);
                } catch (e) {
                    t.innerHTML = `<div class="fp-error">Error rendering template: ${e.message}</div>`;
                    v(`Failed to render template: ${e.message}`);
                }
            });
            return u;
        } catch (e) {
            if (!(e instanceof y)) {
                v(`Failed to render template: ${e.message}`);
            }
            throw e;
        } finally {
            b.publish("afterRender", {
                instanceName: s,
                template: e,
                data: t,
                target: n,
                elements: a,
                returnHtml: r
            });
            g("Rendered instance: " + s, e, t, n);
            x.end("render:" + (s || "anonymous"));
        }
    }
    function pe(e, r) {
        if (typeof e !== "object" || e === null) {
            return e;
        }
        const t = {
            get(e, t) {
                const n = e[t];
                return n && typeof n === "object" ? pe(n, r) : n;
            },
            set(e, t, n) {
                e[t] = n;
                r(e);
                return true;
            },
            deleteProperty(e, t) {
                delete e[t];
                r(e);
                return true;
            }
        };
        return new Proxy(e, t);
    }
    function de(e, t, n) {
        if (!isNaN(e)) e = Number(e);
        if (!isNaN(n)) n = Number(n);
        function r(e) {
            return e === null || e === undefined;
        }
        if (r(e) || r(n)) {
            switch (t) {
              case "==":
                return e == n;

              case "!=":
                return e != n;

              case "&&":
                return Boolean(e) && Boolean(n);

              case "||":
                return Boolean(e) || Boolean(n);

              default:
                return false;
            }
        }
        if (typeof e === "string" && typeof n === "string") {
            switch (t) {
              case "==":
                return e.localeCompare(n) === 0;

              case "!=":
                return e.localeCompare(n) !== 0;

              case "<":
                return e.localeCompare(n) < 0;

              case ">":
                return e.localeCompare(n) > 0;

              case "<=":
                return e.localeCompare(n) <= 0;

              case ">=":
                return e.localeCompare(n) >= 0;

              default:
                throw new y("Unsupported operator for strings: " + t);
            }
        }
        switch (t) {
          case "==":
            return e == n;

          case "!=":
            return e != n;

          case "<":
            return e < n;

          case ">":
            return e > n;

          case "<=":
            return e <= n;

          case ">=":
            return e >= n;

          case "&&":
            return Boolean(e) && Boolean(n);

          case "||":
            return Boolean(e) || Boolean(n);

          case "regex":
            return new RegExp(n).test(e);

          default:
            throw new y("Unsupported operator: " + t);
        }
    }
    function me() {
        Handlebars.registerHelper("if", function(e, t) {
            function n(t, e, n) {
                if (t.startsWith('"') && t.endsWith('"') || t.startsWith("'") && t.endsWith("'")) {
                    return t.slice(1, -1);
                }
                if (!isNaN(t)) {
                    return parseFloat(t);
                }
                if (t === "this") {
                    return n;
                }
                if (t.startsWith("this.")) {
                    const r = t.split(".").slice(1);
                    let e = n;
                    for (const i of r) {
                        if (e && typeof e === "object" && i in e) {
                            e = e[i];
                        } else {
                            return undefined;
                        }
                    }
                    return e;
                }
                const r = t.split(".");
                let s = e;
                for (const i of r) {
                    if (s && typeof s === "object" && i in s) {
                        s = s[i];
                    } else {
                        return undefined;
                    }
                }
                return s;
            }
            try {
                const r = e.trim();
                const [ s, i, o ] = r.split(/\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/);
                if (!s || !i || !o) {
                    throw new y(`Invalid expression format: ${r}`);
                }
                const a = n(s, t.data.root, this);
                const l = n(o, t.data.root, this);
                d.log(d.levels.INFO, "Evaluating expression:", {
                    raw: r,
                    leftValue: a,
                    operator: i,
                    rightValue: l
                });
                const c = de(a, i, l);
                if (c) {
                    return t.fn(this);
                } else {
                    return t.inverse(this);
                }
            } catch (e) {
                if (!(e instanceof y)) {
                    d.log(d.levels.ERROR, "Error evaluating if condition:", e.stack);
                }
                throw e;
            }
        });
    }
    function ge() {
        Handlebars.registerHelper("sum", function() {
            var t = 0;
            for (var e = 0; e < arguments.length - 1; e++) {
                var n = arguments[e];
                if (Array.isArray(n)) {
                    n.forEach(function(e) {
                        t += e;
                    });
                } else {
                    t += n;
                }
            }
            return t;
        });
    }
    function* o(e) {
        var t = new RegExp(o.lang, "g");
        var n;
        while ((n = t.exec(e)) !== null) {
            var [ r ] = n;
            for (var s in o.categories) {
                if (new RegExp(o.categories[s]).test(r)) {
                    yield {
                        token: r,
                        category: s
                    };
                    break;
                }
            }
        }
    }
    o.categories = {
        op: "[+*/^]|-(?!\\d)",
        num: "-?\\d+(?:\\.\\d+)?%?",
        group: "[\\[()\\]]",
        sep: ",",
        ident: "\\b(ans|pi|e)\\b",
        func: "\\b(sqrt|abs|log|ln|sin|cos|tan|min|max)\\b"
    };
    o.lang = [ o.categories.op, o.categories.num, o.categories.group, o.categories.sep, o.categories.ident, o.categories.func ].join("|");
    o.cat = {
        INT: "num",
        IDENT: "ident",
        PCNT: "num",
        FUNC: "func",
        SEP: "sep"
    };
    class O {
        constructor() {
            this.stack = [];
            this.w = null;
            this.l = null;
        }
        _next() {
            const e = this.l.next();
            if (e.done) {
                return null;
            }
            return e.value;
        }
        exec(e) {
            try {
                this.l = o(e);
                this.w = this._next();
                if (!this.e()) {
                    throw new SyntaxError(this.w ? this.w.token : "Unexpected end of expression");
                }
                if (this.w !== null) {
                    throw new SyntaxError(`Unexpected token: ${this.w.token}`);
                }
                return O.ans = this.stack.pop();
            } catch (e) {
                console.error("Error in expression evaluation:", e);
                throw e;
            }
        }
        _istok(e) {
            return this.w && e === this.w.token;
        }
        z() {
            if (this._wrapped_expr()) {
                return true;
            } else if (this.w && [ "INT", "IDENT", "PCNT" ].some(e => o.cat[e] === this.w.category)) {
                this.stack.push(O._val(this.w));
                this.w = this._next();
                return true;
            } else if (this.w && this.w.category === o.cat.FUNC) {
                var e = this.w.token;
                this.w = this._next();
                if (e === "min" || e === "max") {
                    return this._wrapped_expr_min_max(this._rep_val, e);
                } else {
                    return this._wrapped_expr(this._rep_val, e);
                }
            } else if (this._wrapped_expr(this._rep_val, "abs", "|", "|")) {
                return true;
            }
            return false;
        }
        _wrapped_expr_min_max(t, n, e = "(", r = ")") {
            if (this.w && this.w.token === e) {
                this.w = this._next();
                let e = [];
                while (this.w !== null) {
                    if (this.e()) {
                        e.push(this.stack.pop());
                        if (this.w && this.w.category === "sep") {
                            this.w = this._next();
                            continue;
                        }
                    }
                    break;
                }
                if (this.w && this.w.token === r) {
                    this.w = this._next();
                    if (t instanceof Function) {
                        t.call(this, n, e);
                    }
                    return true;
                }
            }
            return false;
        }
        _lrecmut(e, t) {
            return e.call(this) && t.call(this);
        }
        _ophit(e, t, n, r) {
            if (this.w && e.some(e => e === this.w.token)) {
                var s = this.w.token;
                var i = this.stack.pop();
                this.w = this._next();
                if (t.call(this)) {
                    var o = this.stack.pop();
                    this.stack.push(O._chooseOp(s)(i, o));
                    return n.call(this);
                }
            } else if (!this.w || r.some(e => e === this.w.token)) {
                return true;
            }
            return false;
        }
        e() {
            this.t();
            while (this.w && (this.w.token === "+" || this.w.token === "-")) {
                const e = this.w.token;
                this.w = this._next();
                if (!this.t()) return false;
                const t = this.stack.pop();
                const n = this.stack.pop();
                this.stack.push(O._chooseOp(e)(n, t));
            }
            return true;
        }
        t() {
            let e = this.f();
            while (this.w && (this.w.token === "*" || this.w.token === "/")) {
                const t = this.w.token;
                this.w = this._next();
                if (!this.f()) return false;
                const n = this.stack.pop();
                const r = this.stack.pop();
                this.stack.push(O._chooseOp(t)(r, n));
            }
            return e;
        }
        f() {
            if (this.w && this.w.token === "-") {
                this.w = this._next();
                if (!this.z()) return false;
                const e = this.stack.pop();
                this.stack.push(-e);
                return true;
            }
            return this.z();
        }
        ep() {
            return this._ophit([ "+", "-" ], this.p, this.ep, [ ")", "|", "," ]);
        }
        p() {
            return this._lrecmut(this.x, this.pp);
        }
        pp() {
            return this._ophit([ "*", "/" ], this.x, this.pp, [ "+", "-", ")", "|", "," ]);
        }
        x() {
            return this._lrecmut(this.z, this.xp);
        }
        xp() {
            return this._ophit([ "^" ], this.z, this.xp, [ "*", "/", "+", "-", ")", "|", "," ]);
        }
        _wrapped_expr(e, t, n = "(", r = ")") {
            if (!this.w) {
                return false;
            }
            if (this.w.token === n) {
                this.w = this._next();
                if (this.e()) {
                    if (this.w && this.w.token === r) {
                        this.w = this._next();
                        if (e instanceof Function) e.call(this, t);
                        return true;
                    }
                }
            }
            return false;
        }
        _rep_val(e, t) {
            if (t) {
                this.stack.push(O._chooseFn(e).apply(null, t));
            } else {
                const n = this.stack.pop();
                if (n === undefined) {
                    throw new Error(`Function ${e} requires an argument`);
                }
                this.stack.push(O._chooseFn(e)(n));
            }
        }
        static _chooseFn(e) {
            switch (e) {
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
                throw new Error(`Unknown function: ${e}`);
            }
        }
        static _val(e) {
            var t;
            if (e.category === o.cat.INT || e.category === o.cat.PCNT) {
                t = parseFloat(e.token);
                if (e.token.endsWith("%")) t /= 100;
            } else if (e.category === o.cat.IDENT) {
                if (e.token === "pi") {
                    t = Math.PI;
                } else if (e.token === "e") {
                    t = Math.E;
                } else if (e.token === "ans") {
                    t = this.ans;
                }
            }
            return t;
        }
        static _chooseOp(e) {
            switch (e) {
              case "+":
                return (e, t) => e + t;

              case "-":
                return (e, t) => e - t;

              case "*":
                return (e, t) => e * t;

              case "/":
                return (e, t) => e / t;

              case "^":
                return (e, t) => Math.pow(e, t);

              default:
                throw new Error(`Unknown operator: ${e}`);
            }
        }
    }
    O.ans = 0;
    function ve() {
        Handlebars.registerHelper("math", function(e, n) {
            const r = [ "min", "max", "sqrt", "abs", "log", "ln", "sin", "cos", "tan" ];
            const t = e.replace(/@{([^}]+)}/g, (e, t) => {
                try {
                    let e;
                    if (t.includes(".")) {
                        e = t.split(".").reduce((e, t) => e[t], n.data.root);
                    } else {
                        e = n.data.root[t] || n.hash[t];
                    }
                    return e;
                } catch (e) {
                    console.warn(`Could not resolve ${t}`);
                    return NaN;
                }
            });
            const s = t.replace(/[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*/g, t => {
                if (r.includes(t) && !t.includes(".")) {
                    return t;
                }
                try {
                    let e;
                    if (t.includes(".")) {
                        e = t.split(".").reduce((e, t) => e[t], n.data.root);
                    } else {
                        e = n.data.root[t] || n.hash[t];
                    }
                    return e;
                } catch (e) {
                    console.warn(`Could not resolve ${t}`);
                    return NaN;
                }
            });
            d.log(d.levels.DEBUG, "Evaluating expression:", s);
            try {
                const i = new O();
                const o = i.exec(s);
                return o;
            } catch (e) {
                if (!(e instanceof y)) {
                    throw new y(`Error evaluating expression: ${e.message}`, e.stack);
                }
                throw e;
            }
        });
    }
    function ye(s, i) {
        return function(e, t) {
            let n = s ? e[s] : e;
            let r = s ? t[s] : t;
            if (n === null || n === undefined) return i ? -1 : 1;
            if (r === null || r === undefined) return i ? 1 : -1;
            if (typeof n === "string" && typeof r === "string") {
                return i ? r.localeCompare(n) : n.localeCompare(r);
            }
            if (n < r) return i ? 1 : -1;
            if (n > r) return i ? -1 : 1;
            return 0;
        };
    }
    function be() {
        Handlebars.registerHelper("each", function(e, t) {
            var n = "";
            var r = t.hash.limit;
            var s = t.hash.startAt || 0;
            var i = t.hash.sortBy;
            var o = t.hash.descending;
            var a = t.hash.sortBeforeLimit;
            var l = t.inverse;
            var c = t.fn;
            var u;
            var f;
            a = typeof a === "boolean" ? a : true;
            if (t.data && t.ids) {
                f = Handlebars.Utils.appendContextPath(t.data.contextPath, t.ids[0]) + ".";
            }
            if (Handlebars.Utils.isFunction(e)) {
                e = e.call(this);
            }
            if (t.data) {
                u = Handlebars.createFrame(t.data);
            }
            if (!Array.isArray(e) && typeof e !== "object") {
                return l(this);
            }
            var h = Array.isArray(e) ? e.slice() : Object.entries(e);
            if (r === undefined) {
                r = h.length;
            }
            if (a) {
                h.sort(ye(i, o));
                h = h.slice(s, r + s);
            } else {
                h = h.slice(s, r + s);
                h.sort(ye(i, o));
            }
            for (var p = 0; p < h.length; p++) {
                var d = Array.isArray(e) ? h[p] : h[p][1];
                u.key = Array.isArray(e) ? p : h[p][0];
                u.index = p;
                u.first = p === 0;
                u.last = p === h.length - 1;
                if (f) {
                    u.contextPath = f + u.key;
                }
                n += c(d, {
                    data: u,
                    blockParams: Handlebars.Utils.blockParams([ d, u.key ], [ f + u.key, null ])
                });
            }
            if (p === 0) {
                n = l(this);
            }
            return n;
        });
    }
    function Ee() {
        Handlebars.registerHelper("execute", function(e, ...t) {
            t.pop();
            const n = String(e);
            const r = this[n] || window[n];
            if (typeof r === "function") {
                return r(...t);
            } else {
                v("Function not found or is not a function: " + e);
            }
        });
    }
    function xe() {
        Handlebars.registerHelper("set", function(e, t, n) {
            if (!e || !t) {
                v("setHelper: varName and varValue are required");
                return "";
            }
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(e)) {
                v(`setHelper: varName ${e} is not a valid variable name`);
                return "";
            }
            n.data.root[e] = t;
        });
    }
    function we() {
        if (typeof Handlebars === "undefined") {
            console.error("Handlebars is not loaded yet!");
            return;
        }
        if (Handlebars.helpers.bunny) {
            return;
        }
        const e = `
    &nbsp;&nbsp;&nbsp;&nbsp;/)  /)<br>
    ପ(˶•-•˶)ଓ ♡<br>
    &nbsp;&nbsp;&nbsp;/づ  づ
  `;
        const t = `
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(\\  (\\<br>
    &nbsp;&nbsp;ପ(˶•-•˶)ଓ<br>
    &nbsp;&nbsp;♡じ  じ\\
  `;
        window.bunnyStates = {
            bunny: e,
            bunnyFlipped: t
        };
        window.bunnyAnimation = function() {
            if (window.bunnyAnimationIntervalId) {
                clearInterval(window.bunnyAnimationIntervalId);
            }
            window.bunnyAnimationIntervalId = setInterval(function() {
                document.querySelectorAll(".fp-bunny").forEach(function(e) {
                    const t = e.getAttribute("data-bunny-state");
                    if (t === "normal") {
                        e.innerHTML = window.bunnyStates.bunnyFlipped;
                        e.setAttribute("data-bunny-state", "flipped");
                    } else {
                        e.innerHTML = window.bunnyStates.bunny;
                        e.setAttribute("data-bunny-state", "normal");
                    }
                });
            }, 1e3);
        };
        Handlebars.registerHelper("bunny", function() {
            const e = `<span class="fp-bunny" data-bunny-state="normal">${window.bunnyStates.bunny}</span>`;
            setTimeout(window.bunnyAnimation, 0);
            return new Handlebars.SafeString(e);
        });
        if (document.querySelectorAll(".fp-bunny").length > 0) {
            window.bunnyAnimation();
        }
    }
    function Se() {
        me();
        ge();
        ve();
        be();
        Ee();
        xe();
        we();
    }
    const _ = {
        processingElements: new Map(),
        currentRequestId: 0,
        generateRequestId() {
            return `fp-${Date.now()}-${this.currentRequestId++}`;
        },
        handleRequest(e, t, n) {
            if (!e || !e.hasAttribute("fp-template")) return;
            const r = this.processingElements.get(e);
            t = t || this.generateRequestId();
            switch (n) {
              case "start":
                if (!r || r.requestId !== t) {
                    this.processingElements.set(e, {
                        requestId: t,
                        timestamp: Date.now(),
                        processed: false
                    });
                    d.log(d.levels.DEBUG, "Added element to processing set", e, t);
                }
                break;

              case "process":
                if (r && r.requestId === t && !r.processed) {
                    r.processed = true;
                    this.processingElements.set(e, r);
                    return true;
                }
                return false;

              case "cleanup":
                if (r && r.requestId === t) {
                    this.processingElements.delete(e);
                    d.log(d.levels.DEBUG, "Cleaned up after request", e, t);
                }
                break;
            }
        },
        cleanupStale() {
            const e = Date.now();
            const t = 1e4;
            for (const [ n, r ] of this.processingElements.entries()) {
                if (e - r.timestamp > t) {
                    this.processingElements.delete(n);
                    d.log(d.levels.DEBUG, "Cleaned up stale processing entry", n, r.requestId);
                }
            }
        },
        setupEventListeners() {
            document.body.addEventListener("htmx:configRequest", e => {
                e.detail.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
            });
            document.body.addEventListener("htmx:beforeRequest", e => {
                const t = e.detail.elt;
                const n = e.detail.requestId || this.generateRequestId();
                e.detail.requestId = n;
                this.handleRequest(t, n, "start");
                let r = null;
                let s = null;
                for (const [ i, o ] of Object.entries(E.instances)) {
                    if (Array.from(o.elements).some(e => e.contains(t))) {
                        r = o;
                        s = i;
                        break;
                    }
                }
                if (r) {
                    b.publish("request-start", {
                        instanceName: s,
                        ...e.detail
                    });
                }
            });
            document.body.addEventListener("htmx:afterRequest", e => {
                const t = e.detail.elt;
                this.handleRequest(t, e.detail.requestId, "cleanup");
            });
            document.body.addEventListener("htmx:beforeSwap", e => {
                const t = e.detail.elt;
                const n = e.detail.requestId;
                const r = this.processingElements.get(t);
                if (!r || r.requestId !== n) {
                    e.preventDefault();
                    d.log(d.levels.DEBUG, "Prevented swap - request ID mismatch");
                }
            });
            document.body.addEventListener("htmx:responseError", e => {
                this.handleRequest(e.detail.elt, e.detail.requestId, "cleanup");
            });
            setInterval(() => this.cleanupStale(), 1e4);
            window.addEventListener("unload", () => {
                this.processingElements.clear();
            });
        }
    };
    function ke(e) {
        function l(e) {
            var t = {};
            if (e.attributes) {
                for (var n = 0; n < e.attributes.length; n++) {
                    var r = e.attributes.item(n);
                    t["_" + r.nodeName] = r.nodeValue;
                }
            }
            var s = e.childNodes;
            if (s.length === 1 && s[0].nodeType === 3) {
                return s[0].nodeValue.trim();
            } else {
                for (var i = 0; i < s.length; i++) {
                    var o = s[i];
                    if (o.nodeType === 1) {
                        var a = l(o);
                        if (t[o.nodeName]) {
                            if (!Array.isArray(t[o.nodeName])) {
                                t[o.nodeName] = [ t[o.nodeName] ];
                            }
                            t[o.nodeName].push(a);
                        } else {
                            t[o.nodeName] = a;
                        }
                    }
                }
            }
            return t;
        }
        var t = new DOMParser();
        var n = t.parseFromString(e, "text/xml");
        return l(n.documentElement);
    }
    const I = {
        getOrCreateInstance(e, t = {}) {
            const n = e.getAttribute("fp-instance") || e.id;
            if (!n) {
                v("No instance name found for element");
                return null;
            }
            let r = E.instances[n];
            if (!r) {
                r = {
                    elements: new Set([ e ]),
                    template: null,
                    templateId: e.getAttribute("fp-template"),
                    proxy: null,
                    data: t,
                    cleanup: () => {
                        this.elements.clear();
                    }
                };
                Object.assign(r, he(n));
                const s = m.instanceMethods;
                for (const [ i, o ] of s.entries()) {
                    r[i] = (...e) => m.executeInstanceMethod(i, r, ...e);
                }
                E.instances[n] = r;
                m.executeHook("newInstance", r);
            }
            return r;
        },
        updateInstance(r, e) {
            if (!r) return;
            r.data = {
                ...r.data,
                ...e
            };
            r.proxy = new Proxy(r.data, {
                get: (e, t) => {
                    const n = e[t];
                    return n && typeof n === "object" ? new Proxy(n, this.proxyHandler) : n;
                },
                set: (e, t, n) => {
                    e[t] = n;
                    r._updateDOM();
                    return true;
                },
                deleteProperty: (e, t) => {
                    delete e[t];
                    r._updateDOM();
                    return true;
                }
            });
        },
        proxyHandler: {
            get(e, t) {
                const n = e[t];
                return n && typeof n === "object" ? new Proxy(n, this) : n;
            },
            set(e, t, n) {
                e[t] = n;
                return true;
            },
            deleteProperty(e, t) {
                delete e[t];
                return true;
            }
        },
        _updateDOM(n) {
            if (typeof n.data === "string" && n.data.trim().startsWith("<!DOCTYPE")) {
                d.log(d.levels.DEBUG, "Data is HTML, skipping DOM update", n.instanceName);
                return;
            }
            try {
                let t;
                if (n.templateId === "self" || n.templateId === null) {
                    const e = Array.from(n.elements)[0];
                    if (!e) {
                        d.log(d.levels.ERROR, "No template element found for self template", n.instanceName);
                        return;
                    }
                    t = e.innerHTML;
                } else if (!n.template) {
                    d.log(d.levels.ERROR, "No template found for instance", n.instanceName);
                    return;
                } else {
                    t = n.template(n.data);
                }
                n.elements.forEach(e => {
                    P(e, t, n.animate);
                });
            } catch (e) {
                d.log(d.levels.ERROR, "Error updating DOM for instance", n.instanceName, e);
            }
        }
    };
    function Ae() {
        htmx.defineExtension("flowplater", {
            transformResponse: function(t, e, n) {
                const r = e.requestId;
                const s = _.processingElements.get(n);
                d.log(d.levels.DEBUG, "Transform response for request", r, "current info:", s);
                if (!s || s.requestId !== r) {
                    d.log(d.levels.DEBUG, "Skipping transformation - request ID mismatch", {
                        current: s?.requestId,
                        received: r
                    });
                    return t;
                }
                if (!n.hasAttribute("fp-template")) {
                    return t;
                }
                if (typeof t === "string" && t.trim().startsWith("<!DOCTYPE")) {
                    if (E.config?.storage?.enabled) {
                        const c = n.getAttribute("fp-instance") || n.id;
                        if (c) {
                            S(c, {
                                data: t,
                                isHtml: true,
                                timestamp: Date.now()
                            }, "instance");
                        }
                    }
                    return t;
                }
                let i;
                try {
                    if (e.getResponseHeader("Content-Type")?.startsWith("text/xml")) {
                        var o = new DOMParser();
                        var a = o.parseFromString(t, "text/xml");
                        i = ke(a);
                    } else {
                        i = JSON.parse(t);
                    }
                } catch (e) {
                    v("Failed to parse response:", e);
                    return t;
                }
                var l = n.getAttribute("fp-template");
                g("Response received for request " + r + ": ", i);
                const c = n.getAttribute("fp-instance") || n.id;
                const u = I.getOrCreateInstance(n, i);
                if (!u) return t;
                try {
                    let e;
                    if (l) {
                        g("Rendering html to " + l + " based on htmx response");
                        e = C({
                            template: l,
                            data: i,
                            target: n,
                            returnHtml: true,
                            instanceName: c
                        });
                    } else {
                        if (!n.id) {
                            v("No template found. If the current element is a template, it must have an id.");
                            return t;
                        }
                        g("Rendering html to current element based on htmx response");
                        var f = "#" + n.id;
                        e = C({
                            template: f,
                            data: i,
                            target: n,
                            returnHtml: true,
                            instanceName: c
                        });
                    }
                    if (e) {
                        d.log(d.levels.DEBUG, "Template rendered successfully for request", r);
                        return e;
                    }
                    return t;
                } catch (e) {
                    v("Error rendering template:", e);
                    return "<div class='fp-error'>Error rendering template: " + e + "</div>";
                }
            },
            handleSwap: function(e, t, n, r) {
                if (!t.hasAttribute("fp-template")) {
                    d.log(d.levels.DEBUG, "No fp-template attribute, skipping handleSwap");
                    return false;
                }
                try {
                    const s = I.getOrCreateInstance(t);
                    if (!s) return false;
                    const i = [ "innerHTML" ];
                    if (!i.includes(e)) {
                        d.log(d.levels.DEBUG, "Unsupported swap style: " + e + ", falling back to default swap");
                        return false;
                    }
                    s._updateDOM();
                    return true;
                } catch (e) {
                    d.log(d.levels.ERROR, "Error in handleSwap: " + e.message);
                    return false;
                }
            },
            onEvent: function(e, t) {
                if (t.detail.handled) return;
                const n = t.detail.elt;
                const r = t.detail.requestId || _.generateRequestId();
                switch (e) {
                  case "htmx:beforeRequest":
                    t.detail.requestId = r;
                    t.detail.xhr.requestId = r;
                    _.handleRequest(n, r, "start");
                    if (n.hasAttribute("fp-template")) {
                        const o = I.getOrCreateInstance(n);
                        if (o) {
                            m.executeHook("beforeRequest", o, t);
                        }
                    }
                    break;

                  case "htmx:beforeSwap":
                    const s = _.processingElements.get(n);
                    if (!s || s.requestId !== r) {
                        t.preventDefault();
                        d.log(d.levels.DEBUG, "Prevented swap - request ID mismatch");
                        return;
                    }
                    N("beforeSwap", n, t);
                    break;

                  case "htmx:afterSwap":
                    N("afterSwap", n, t);
                    const i = ne(n);
                    i.forEach(ee);
                    break;

                  case "htmx:afterRequest":
                    if (n.hasAttribute("fp-template")) {
                        const o = I.getOrCreateInstance(n);
                        if (o) {
                            m.executeHook("afterRequest", o, t);
                            b.publish("request-end", {
                                instanceName: o.instanceName,
                                ...t.detail
                            });
                        }
                    }
                    _.handleRequest(n, r, "cleanup");
                    break;

                  case "htmx:afterSettle":
                    N("afterSettle", n, t);
                    d.log(d.levels.DEBUG, `Setting up form handlers after DOM settle for target: ${n.id || "unknown"}, ` + `has fp-template: ${n.hasAttribute("fp-template")}, ` + `parent form: ${n.closest("form")?.id || "none"}`);
                    p(n);
                    break;
                }
            }
        });
    }
    function N(e, t, n) {
        if (t.hasAttribute("fp-instance") || t.hasAttribute("id")) {
            const r = I.getOrCreateInstance(t);
            if (r) {
                m.executeHook(e, r, n?.detail);
            }
        }
    }
    function Pe(n) {
        try {
            if (n.hasAttribute("data-fp-proxy-processed") || !n.hasAttribute("fp-proxy") || n.getAttribute("fp-proxy") === "false") {
                return n;
            }
            const r = n.getAttribute("fp-proxy").startsWith("http") ? n.getAttribute("fp-proxy") : "https://corsproxy.io/?";
            const e = [ "get", "post", "put", "patch", "delete" ];
            e.forEach(function(e) {
                if (n.hasAttribute("hx-" + e)) {
                    const t = n.getAttribute("hx-" + e);
                    n.setAttribute("hx-" + e, r + encodeURIComponent(t));
                }
            });
            n.setAttribute("data-fp-proxy-processed", "true");
            return n;
        } catch (e) {
            d.log(d.levels.ERROR, `Error in setupProxy: ${e.message}`);
            return n;
        }
    }
    function Ce(t) {
        if (!t) {
            errorLog("No URL provided for preloading");
            return;
        }
        const e = document.createElement("link");
        e.rel = "preload";
        e.href = t;
        e.as = "fetch";
        e.crossOrigin = "anonymous";
        const n = () => {
            if (e.parentNode) {
                e.remove();
            }
        };
        e.onerror = e => {
            errorLog(`Failed to preload URL: ${t}`, e);
            n();
        };
        const r = setTimeout(n, 3e3);
        document.head.appendChild(e);
        return {
            cleanup: n,
            timeoutId: r
        };
    }
    function Oe(r) {
        const e = r.getAttribute("fp-preload") || "mouseover";
        if (e === "mouseover") {
            let t = true;
            let e;
            let n;
            const s = () => {
                t = true;
                e = setTimeout(() => {
                    if (t) {
                        const e = r.getAttribute("href") || r.getAttribute("hx-get") || r.getAttribute("fp-get");
                        n = Ce(e);
                    }
                }, 100);
            };
            const i = () => {
                t = false;
                if (e) {
                    clearTimeout(e);
                }
                if (n) {
                    clearTimeout(n.timeoutId);
                    n.cleanup();
                }
            };
            r.addEventListener("mouseover", s);
            r.addEventListener("mouseout", i);
            r._preloadCleanup = () => {
                r.removeEventListener("mouseover", s);
                r.removeEventListener("mouseout", i);
                i();
            };
        } else {
            const t = () => {
                const e = r.getAttribute("href") || r.getAttribute("hx-get") || r.getAttribute("fp-get");
                Ce(e);
            };
            r.addEventListener(e, t);
            r._preloadCleanup = () => {
                r.removeEventListener(e, t);
            };
        }
    }
    function _e(t) {
        try {
            if (t.hasAttribute("data-fp-preload-processed")) {
                return t;
            }
            if (t.hasAttribute("fp-preload")) {
                Oe(t);
                t.setAttribute("data-fp-preload-processed", "true");
            }
            return t;
        } catch (e) {
            d.log(d.levels.ERROR, `Error in processPreload: ${e.message}`);
            return t;
        }
    }
    const Ie = [ "boost", "get", "post", "on", "push-url", "select", "select-oob", "swap", "swap-oob", "target", "trigger", "vals", "confirm", "delete", "disable", "disabled-elt", "disinherit", "encoding", "ext", "headers", "history", "history-elt", "include", "indicator", "params", "patch", "preserve", "prompt", "put", "replace-url", "request", "sync", "validate", "vars" ];
    function Ne(r) {
        try {
            const s = "fp-";
            const i = "hx-";
            Ie.forEach(e => {
                const t = s + e;
                if (r.hasAttribute(t)) {
                    const n = r.getAttribute(t);
                    r.setAttribute(i + e, n);
                    r.removeAttribute(t);
                }
            });
            return r;
        } catch (e) {
            errorLog(`Error in translateCustomHTMXAttributes: ${e.message}`);
            return r;
        }
    }
    function Re(t) {
        try {
            const n = [ "get", "post", "put", "patch", "delete" ];
            function a(e, t) {
                while (e) {
                    if (e.hasAttribute(t)) {
                        return e.getAttribute(t);
                    }
                    e = e.parentElement;
                }
                return null;
            }
            function e(o) {
                n.forEach(function(e) {
                    var t = "hx-" + e;
                    if (o.hasAttribute(t)) {
                        var n = o.getAttribute(t);
                        g("Original URL: " + n);
                        var r = a(o, "fp-prepend");
                        var s = a(o, "fp-append");
                        var i = n;
                        if (r) {
                            i = r + i;
                        }
                        if (s) {
                            i += s;
                        }
                        o.setAttribute(t, i);
                        g("Modified URL: " + i);
                        if (i !== n) {
                            g("Modification successful for", e, "on element", o);
                        } else {
                            v("Modification failed for", e, "on element", o);
                        }
                    }
                });
            }
            if ((t.hasAttribute("fp-prepend") || t.hasAttribute("fp-append")) && n.some(e => t.hasAttribute("hx-" + e))) {
                e(t);
            }
            return t;
        } catch (e) {
            v(`Error in processUrlAffixes: ${e.message}`);
            return t;
        }
    }
    function Te(t) {
        try {
            var e = t.getAttribute("fp-animation") || E.defaults.animation;
            if (e === "true") {
                var n = t.getAttribute("hx-swap");
                if (!n) {
                    t.setAttribute("hx-swap", "innerHTML transition:true");
                } else {
                    t.setAttribute("hx-swap", n + " transition:true");
                }
            }
            return t;
        } catch (e) {
            d.log(d.levels.ERROR, `Error in setupAnimation: ${e.message}`);
            return t;
        }
    }
    function He(t) {
        try {
            var e = t.getAttribute("hx-ext") || "";
            if (!e.includes("flowplater")) {
                var n = e ? e + ", flowplater" : "flowplater";
                t.setAttribute("hx-ext", n);
                d.log(d.levels.INFO, "Added hx-ext attribute to " + t.id);
            }
            return t;
        } catch (e) {
            d.log(d.levels.ERROR, `Error in addHtmxExtensionAttribute: ${e.message}`);
            return t;
        }
    }
    const Le = "1.4.22";
    const De = "JWSLS";
    const Me = "Flowplater standard licence";
    const n = {
        debug: {
            level: window.location.hostname.endsWith(".webflow.io") || window.location.hostname.endsWith(".canvas.webflow.com") ? 3 : 1
        },
        selectors: {
            fp: "[fp-template], [fp-get], [fp-post], [fp-put], [fp-delete], [fp-patch], [fp-persist]"
        },
        templates: {
            cacheSize: 100,
            precompile: true
        },
        animation: {
            enabled: true,
            duration: 300
        },
        htmx: {
            timeout: 1e4,
            swapStyle: "innerHTML",
            selfRequestsOnly: false
        },
        customTags: e,
        storage: {
            enabled: false,
            ttl: 30 * 24 * 60 * 60
        },
        persistForm: true
    };
    if (typeof Handlebars === "undefined") {
        throw new h("FlowPlater requires Handlebars. Get it at https://handlebarsjs.com/");
    }
    if (typeof htmx === "undefined") {
        throw new h("FlowPlater requires htmx. Get it at https://htmx.org/");
    }
    E.config = JSON.parse(JSON.stringify(n));
    _.setupEventListeners();
    Ae();
    const R = {
        processors: [ {
            name: "customTags",
            process: $
        }, {
            name: "htmxAttributes",
            process: Ne
        }, {
            name: "htmxExtensionAttribute",
            process: He
        }, {
            name: "urlAffixes",
            process: Re
        }, {
            name: "animation",
            process: Te
        }, {
            name: "proxy",
            process: Pe
        }, {
            name: "preload",
            process: _e
        }, {
            name: "htmxProcess",
            process: e => {
                htmx.process(e);
                return e;
            }
        } ],
        FP_SELECTOR: E.config.selectors.fp,
        processElement: function(s) {
            if (s._preloadCleanup) {
                s._preloadCleanup();
            }
            let i = {
                success: true,
                errors: [],
                warnings: [],
                finalElement: s
            };
            i.finalElement = this.processors.reduce((t, n, e) => {
                if (!t) {
                    i.errors.push({
                        phase: n.name,
                        error: `Element became undefined at processor index ${e}`,
                        processor: this.processors[e - 1]
                    });
                    i.success = false;
                    return s;
                }
                try {
                    const r = n.process(t);
                    return r;
                } catch (e) {
                    i.errors.push({
                        phase: n.name,
                        error: e.message,
                        stack: e.stack
                    });
                    d.log(d.levels.ERROR, `Error in processor ${n.name}: ${e.message}`, e);
                    if (e instanceof y) {
                        i.warnings.push({
                            phase: n.name,
                            message: "Falling back to original template"
                        });
                        return t;
                    }
                    return t;
                }
            }, s);
            if (i.errors.length > 0) {
                b.publish("processingChain:error", i);
            }
            if (i.warnings.length > 0) {
                b.publish("processingChain:warning", i);
            }
            return i.finalElement;
        }
    };
    function Fe(e = document) {
        if (e === document || !e.matches(R.FP_SELECTOR)) {
            const t = e.querySelectorAll(R.FP_SELECTOR);
            t.forEach(e => R.processElement(e));
        } else {
            R.processElement(e);
        }
    }
    Handlebars.unregisterHelper("each");
    Handlebars.unregisterHelper("if");
    Se(Handlebars);
    const $e = {
        compileTemplate: w,
        render: C,
        getInstance: i,
        getInstances: D,
        PluginManager: m,
        log: function(e, ...t) {
            t.unshift(`[PLUGIN]`);
            d.log(e, ...t);
            return this;
        },
        logLevels: {
            ERROR: d.levels.ERROR,
            WARN: d.levels.WARN,
            INFO: d.levels.INFO,
            DEBUG: d.levels.DEBUG
        },
        registerPlugin(e) {
            return this.PluginManager.registerPlugin(e);
        },
        removePlugin(e) {
            return this.PluginManager.removePlugin(e);
        },
        removeAllPlugins() {
            return this.PluginManager.destroyAll();
        },
        getPlugin(e) {
            return this.PluginManager.getPlugin(e);
        },
        getAllPlugins() {
            return this.PluginManager.getSortedPlugins();
        },
        enablePlugin(e) {
            return this.PluginManager.enablePlugin(e);
        },
        disablePlugin(e) {
            return this.PluginManager.disablePlugin(e);
        },
        pluginConfig(e) {
            return this.PluginManager.pluginConfig(e);
        },
        on: (...e) => b.subscribe(...e),
        off: (...e) => b.unsubscribe(...e),
        emit: (...e) => b.publish(...e),
        debug: function(e) {
            d.level = e;
            return this;
        },
        templateCache: {
            set: function(e, t) {
                const n = E.config.templates.cacheSize;
                const r = E.templateCache;
                if (Object.keys(r).length >= n) {
                    const s = Object.keys(r)[0];
                    delete r[s];
                    d.log(d.levels.INFO, `Cache limit reached. Removed template: ${s}`);
                }
                r[e] = t;
                return t;
            },
            get: function(e) {
                if (e) {
                    return E.templateCache[e];
                }
                return E.templateCache;
            },
            isCached: function(e) {
                return !!E.templateCache[e];
            },
            clear: function(e) {
                if (e) {
                    delete E.templateCache[e];
                    d.log(d.levels.INFO, `Cleared template cache for: ${e}`);
                } else {
                    E.templateCache = {};
                    d.log(d.levels.INFO, "Cleared entire template cache");
                }
            },
            size: function() {
                return Object.keys(E.templateCache).length;
            }
        },
        init: function(e = document, c = {
            render: true
        }) {
            x.start("init");
            d.log(d.levels.INFO, "Initializing FlowPlater...");
            const t = document.querySelectorAll("[fp-template]");
            t.forEach(t => {
                let e = t.getAttribute("fp-template");
                if (e === "self" || e === "") {
                    e = t.id;
                }
                if (e) {
                    const n = document.querySelector(e);
                    if (n) {
                        g("replacing template content", n);
                        const r = n.getElementsByTagName("script");
                        const s = Array.from(r).map(e => e.innerHTML);
                        Array.from(r).forEach((e, t) => {
                            e.innerHTML = `##FP_SCRIPT_${t}##`;
                        });
                        n.innerHTML = n.innerHTML.replace(/\[\[(.*?)\]\]/g, "{{$1}}");
                        Array.from(n.getElementsByTagName("script")).forEach((e, t) => {
                            e.innerHTML = s[t];
                        });
                    }
                    w(e, true);
                    if (c.render) {
                        const i = [ "get", "post", "put", "patch", "delete" ];
                        const o = i.some(e => t.hasAttribute(`hx-${e}`) || t.hasAttribute(`fp-${e}`));
                        if (!o) {
                            C({
                                template: e,
                                data: {},
                                target: t
                            });
                        } else {
                            if (E.config?.storage?.enabled) {
                                const a = t.getAttribute("fp-instance") || e;
                                const l = k(a, "instance");
                                if (l) {
                                    d.log(d.levels.INFO, `Found stored data for instance: ${a}, rendering with stored data`);
                                    C({
                                        template: e,
                                        data: l,
                                        target: t
                                    });
                                } else {
                                    d.log(d.levels.INFO, `Skipping initial render for instance: ${a}`);
                                }
                            } else {
                                d.log(d.levels.INFO, `Skipping initial render for template with HTMX/FP methods: ${e}`);
                            }
                        }
                    }
                } else {
                    v(`No template ID found for element: ${t.id}`, t, "Make sure your template has an ID attribute");
                }
            });
            Fe(e);
            d.log(d.levels.INFO, "FlowPlater initialized successfully");
            x.end("init");
            E.initialized = true;
            this.PluginManager.executeHook("initComplete", this, E.instances);
            return this;
        },
        cleanup: function(e) {
            if (e) {
                const t = E.instances[e];
                if (t) {
                    t.elements.forEach(e => {
                        if (e._preloadCleanup) {
                            e._preloadCleanup();
                        }
                        e.removeEventListeners();
                    });
                    delete E.instances[e];
                    g(`Cleaned up instance: ${e}`);
                }
            } else {
                Object.keys(E.instances).forEach(e => {
                    this.cleanup(e);
                });
                g("Cleaned up all instances");
            }
            return this;
        },
        version: Le,
        author: De,
        license: Me,
        setCustomTags: t,
        config: function(e = {}) {
            if ("storage" in e) {
                e.storage = Be(e.storage, n.storage);
            }
            function r(e, t) {
                for (const n in t) {
                    if (t[n] instanceof Object && n in e) {
                        r(e[n], t[n]);
                    } else {
                        e[n] = t[n];
                    }
                }
                return e;
            }
            E.config = r(JSON.parse(JSON.stringify(E.config)), e);
            d.level = E.config.debug.level;
            R.FP_SELECTOR = E.config.selectors.fp;
            if (typeof htmx !== "undefined") {
                htmx.config.timeout = E.config.htmx.timeout;
                htmx.config.defaultSwapStyle = E.config.htmx.swapStyle;
                htmx.config.selfRequestsOnly = E.config.htmx.selfRequestsOnly;
            }
            if (e.customTags) {
                t(e.customTags);
            }
            d.log(d.levels.INFO, "FlowPlater configured with:", E.config);
            return this;
        },
        getConfig: function() {
            return JSON.parse(JSON.stringify(E.config));
        },
        destroy: function() {
            Object.keys(E.instances).forEach(e => {
                this.cleanup(e);
            });
            E.templateCache = {};
            E.instances = {};
            b.unsubscribeAll();
            g("Cleaned up all instances");
        },
        create: function(e, t = {
            refresh: true
        }) {
            x.start(`createInstance:${e}`);
            d.log(d.levels.INFO, `Creating FlowPlater instance: ${e}`);
            let n;
            if (e.startsWith("#")) {
                n = document.getElementById(e.slice(1));
            } else {
                n = document.querySelector(`[fp-instance="${e}"]`);
            }
            if (!n) {
                throw new h(`Could not find element for instance: ${e}`);
            }
            const r = n.getAttribute("fp-template");
            if (r) {
                this.templateCache.clear(r);
            }
            this.init(n);
            const s = i(e);
            if (!s) {
                throw new h(`Failed to create instance: ${e}`);
            }
            this.PluginManager.executeHook("newInstance", s);
            if (t.refresh) {
                s.refresh();
            }
            d.log(d.levels.INFO, `Instance created successfully: ${e}`);
            x.end(`createInstance:${e}`);
            return s;
        }
    };
    function Be(e, t) {
        if (typeof e === "boolean") {
            return {
                enabled: e,
                ttl: t.ttl
            };
        }
        if (typeof e === "number") {
            if (e === -1) {
                return {
                    enabled: true,
                    ttl: -1
                };
            }
            return {
                enabled: e > 0,
                ttl: e > 0 ? e : t.ttl
            };
        }
        return e;
    }
    let T = JSON.parse(JSON.stringify(n));
    const H = document.querySelector('meta[name="fp-config"]');
    if (H) {
        try {
            const L = JSON.parse(H.content);
            if ("storage" in L) {
                L.storage = Be(L.storage, n.storage);
            }
            T = {
                ...T,
                ...L
            };
        } catch (e) {
            v("Error parsing fp-config meta tag:", H, "Make sure your meta tag is valid");
        }
    }
    $e.config(T);
    if (document.readyState === "complete" || document.readyState !== "loading") {
        setTimeout(() => {
            try {
                FlowPlater.init();
            } catch (e) {
                v("FlowPlater initialization failed:", e);
            }
        }, 1);
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            setTimeout(() => {
                try {
                    FlowPlater.init();
                } catch (e) {
                    v("FlowPlater initialization failed:", e);
                }
            }, 1);
        });
    }
    return $e;
}();