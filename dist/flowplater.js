/**!

 @license FlowPlater v1.4.26 | (c) 2024 FlowPlater | https://flowplater.io
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
(function e(t, r) {
    if (typeof exports === "object" && typeof module === "object") module.exports = r(); else if (typeof define === "function" && define.amd) define([], r); else if (typeof exports === "object") exports["Handlebars"] = r(); else t["Handlebars"] = r();
})(this, function() {
    return function(r) {
        var n = {};
        function s(e) {
            if (n[e]) return n[e].exports;
            var t = n[e] = {
                exports: {},
                id: e,
                loaded: false
            };
            r[e].call(t.exports, t, t.exports, s);
            t.loaded = true;
            return t.exports;
        }
        s.m = r;
        s.c = n;
        s.p = "";
        return s(0);
    }([ function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var s = r(2);
        var i = n(s);
        var o = r(84);
        var a = n(o);
        var l = r(85);
        var u = r(90);
        var c = r(91);
        var f = n(c);
        var h = r(88);
        var p = n(h);
        var d = r(83);
        var m = n(d);
        var g = i["default"].create;
        function b() {
            var r = g();
            r.compile = function(e, t) {
                return u.compile(e, t, r);
            };
            r.precompile = function(e, t) {
                return u.precompile(e, t, r);
            };
            r.AST = a["default"];
            r.Compiler = u.Compiler;
            r.JavaScriptCompiler = f["default"];
            r.Parser = l.parser;
            r.parse = l.parse;
            r.parseWithoutProcessing = l.parseWithoutProcessing;
            return r;
        }
        var v = b();
        v.create = b;
        m["default"](v);
        v.Visitor = p["default"];
        v["default"] = v;
        t["default"] = v;
        e.exports = t["default"];
    }, function(e, t) {
        "use strict";
        t["default"] = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        };
        t.__esModule = true;
    }, function(e, t, r) {
        "use strict";
        var n = r(3)["default"];
        var s = r(1)["default"];
        t.__esModule = true;
        var i = r(4);
        var o = n(i);
        var a = r(77);
        var l = s(a);
        var u = r(6);
        var c = s(u);
        var f = r(5);
        var h = n(f);
        var p = r(78);
        var d = n(p);
        var m = r(83);
        var g = s(m);
        function b() {
            var t = new o.HandlebarsEnvironment();
            h.extend(t, o);
            t.SafeString = l["default"];
            t.Exception = c["default"];
            t.Utils = h;
            t.escapeExpression = h.escapeExpression;
            t.VM = d;
            t.template = function(e) {
                return d.template(e, t);
            };
            return t;
        }
        var v = b();
        v.create = b;
        g["default"](v);
        v["default"] = v;
        t["default"] = v;
        e.exports = t["default"];
    }, function(e, t) {
        "use strict";
        t["default"] = function(e) {
            if (e && e.__esModule) {
                return e;
            } else {
                var t = {};
                if (e != null) {
                    for (var r in e) {
                        if (Object.prototype.hasOwnProperty.call(e, r)) t[r] = e[r];
                    }
                }
                t["default"] = e;
                return t;
            }
        };
        t.__esModule = true;
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        t.HandlebarsEnvironment = b;
        var s = r(5);
        var i = r(6);
        var o = n(i);
        var a = r(10);
        var l = r(70);
        var u = r(72);
        var c = n(u);
        var f = r(73);
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
        function b(e, t, r) {
            this.helpers = e || {};
            this.partials = t || {};
            this.decorators = r || {};
            a.registerDefaultHelpers(this);
            l.registerDefaultDecorators(this);
        }
        b.prototype = {
            constructor: b,
            logger: c["default"],
            log: c["default"].log,
            registerHelper: function e(t, r) {
                if (s.toString.call(t) === g) {
                    if (r) {
                        throw new o["default"]("Arg not supported with multiple helpers");
                    }
                    s.extend(this.helpers, t);
                } else {
                    this.helpers[t] = r;
                }
            },
            unregisterHelper: function e(t) {
                delete this.helpers[t];
            },
            registerPartial: function e(t, r) {
                if (s.toString.call(t) === g) {
                    s.extend(this.partials, t);
                } else {
                    if (typeof r === "undefined") {
                        throw new o["default"]('Attempting to register a partial called "' + t + '" as undefined');
                    }
                    this.partials[t] = r;
                }
            },
            unregisterPartial: function e(t) {
                delete this.partials[t];
            },
            registerDecorator: function e(t, r) {
                if (s.toString.call(t) === g) {
                    if (r) {
                        throw new o["default"]("Arg not supported with multiple decorators");
                    }
                    s.extend(this.decorators, t);
                } else {
                    this.decorators[t] = r;
                }
            },
            unregisterDecorator: function e(t) {
                delete this.decorators[t];
            },
            resetLoggedPropertyAccesses: function e() {
                f.resetLoggedProperties();
            }
        };
        var v = c["default"].log;
        t.log = v;
        t.createFrame = s.createFrame;
        t.logger = c["default"];
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t.extend = o;
        t.indexOf = c;
        t.escapeExpression = f;
        t.isEmpty = h;
        t.createFrame = p;
        t.blockParams = d;
        t.appendContextPath = m;
        var r = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        var n = /[&<>"'`=]/g, s = /[&<>"'`=]/;
        function i(e) {
            return r[e];
        }
        function o(e) {
            for (var t = 1; t < arguments.length; t++) {
                for (var r in arguments[t]) {
                    if (Object.prototype.hasOwnProperty.call(arguments[t], r)) {
                        e[r] = arguments[t][r];
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
        var u = Array.isArray || function(e) {
            return e && typeof e === "object" ? a.call(e) === "[object Array]" : false;
        };
        t.isArray = u;
        function c(e, t) {
            for (var r = 0, n = e.length; r < n; r++) {
                if (e[r] === t) {
                    return r;
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
            return e.replace(n, i);
        }
        function h(e) {
            if (!e && e !== 0) {
                return true;
            } else if (u(e) && e.length === 0) {
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
    }, function(e, t, r) {
        "use strict";
        var u = r(7)["default"];
        t.__esModule = true;
        var c = [ "description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack" ];
        function f(e, t) {
            var r = t && t.loc, n = undefined, s = undefined, i = undefined, o = undefined;
            if (r) {
                n = r.start.line;
                s = r.end.line;
                i = r.start.column;
                o = r.end.column;
                e += " - " + n + ":" + i;
            }
            var a = Error.prototype.constructor.call(this, e);
            for (var l = 0; l < c.length; l++) {
                this[c[l]] = a[c[l]];
            }
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, f);
            }
            try {
                if (r) {
                    this.lineNumber = n;
                    this.endLineNumber = s;
                    if (u) {
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
    }, function(e, t, r) {
        e.exports = {
            default: r(8),
            __esModule: true
        };
    }, function(e, t, r) {
        var s = r(9);
        e.exports = function e(t, r, n) {
            return s.setDesc(t, r, n);
        };
    }, function(e, t) {
        var r = Object;
        e.exports = {
            create: r.create,
            getProto: r.getPrototypeOf,
            isEnum: {}.propertyIsEnumerable,
            getDesc: r.getOwnPropertyDescriptor,
            setDesc: r.defineProperty,
            setDescs: r.defineProperties,
            getKeys: r.keys,
            getNames: r.getOwnPropertyNames,
            getSymbols: r.getOwnPropertySymbols,
            each: [].forEach
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        t.registerDefaultHelpers = v;
        t.moveHelperToHooks = y;
        var s = r(11);
        var i = n(s);
        var o = r(12);
        var a = n(o);
        var l = r(65);
        var u = n(l);
        var c = r(66);
        var f = n(c);
        var h = r(67);
        var p = n(h);
        var d = r(68);
        var m = n(d);
        var g = r(69);
        var b = n(g);
        function v(e) {
            i["default"](e);
            a["default"](e);
            u["default"](e);
            f["default"](e);
            p["default"](e);
            m["default"](e);
            b["default"](e);
        }
        function y(e, t, r) {
            if (e.helpers[t]) {
                e.hooks[t] = e.helpers[t];
                if (!r) {
                    delete e.helpers[t];
                }
            }
        }
    }, function(e, t, r) {
        "use strict";
        t.__esModule = true;
        var o = r(5);
        t["default"] = function(i) {
            i.registerHelper("blockHelperMissing", function(e, t) {
                var r = t.inverse, n = t.fn;
                if (e === true) {
                    return n(this);
                } else if (e === false || e == null) {
                    return r(this);
                } else if (o.isArray(e)) {
                    if (e.length > 0) {
                        if (t.ids) {
                            t.ids = [ t.name ];
                        }
                        return i.helpers.each(e, t);
                    } else {
                        return r(this);
                    }
                } else {
                    if (t.data && t.ids) {
                        var s = o.createFrame(t.data);
                        s.contextPath = o.appendContextPath(t.data.contextPath, t.name);
                        t = {
                            data: s
                        };
                    }
                    return n(e, t);
                }
            });
        };
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var p = r(13)["default"];
        var d = r(43)["default"];
        var m = r(55)["default"];
        var g = r(60)["default"];
        var n = r(1)["default"];
        t.__esModule = true;
        var b = r(5);
        var s = r(6);
        var v = n(s);
        t["default"] = function(e) {
            e.registerHelper("each", function(n, e) {
                if (!e) {
                    throw new v["default"]("Must pass iterator to #each");
                }
                var s = e.fn, t = e.inverse, r = 0, i = "", o = undefined, a = undefined;
                if (e.data && e.ids) {
                    a = b.appendContextPath(e.data.contextPath, e.ids[0]) + ".";
                }
                if (b.isFunction(n)) {
                    n = n.call(this);
                }
                if (e.data) {
                    o = b.createFrame(e.data);
                }
                function l(e, t, r) {
                    if (o) {
                        o.key = e;
                        o.index = t;
                        o.first = t === 0;
                        o.last = !!r;
                        if (a) {
                            o.contextPath = a + e;
                        }
                    }
                    i = i + s(n[e], {
                        data: o,
                        blockParams: b.blockParams([ n[e], e ], [ a + e, null ])
                    });
                }
                if (n && typeof n === "object") {
                    if (b.isArray(n)) {
                        for (var u = n.length; r < u; r++) {
                            if (r in n) {
                                l(r, r, r === n.length - 1);
                            }
                        }
                    } else if (typeof p === "function" && n[d]) {
                        var c = [];
                        var f = m(n);
                        for (var h = f.next(); !h.done; h = f.next()) {
                            c.push(h.value);
                        }
                        n = c;
                        for (var u = n.length; r < u; r++) {
                            l(r, r, r === n.length - 1);
                        }
                    } else {
                        (function() {
                            var t = undefined;
                            g(n).forEach(function(e) {
                                if (t !== undefined) {
                                    l(t, r - 1);
                                }
                                t = e;
                                r++;
                            });
                            if (t !== undefined) {
                                l(t, r - 1, true);
                            }
                        })();
                    }
                }
                if (r === 0) {
                    i = t(this);
                }
                return i;
            });
        };
        e.exports = t["default"];
    }, function(e, t, r) {
        e.exports = {
            default: r(14),
            __esModule: true
        };
    }, function(e, t, r) {
        r(15);
        r(42);
        e.exports = r(21).Symbol;
    }, function(D, M, e) {
        "use strict";
        var t = e(9), r = e(16), o = e(17), n = e(18), s = e(20), i = e(24), a = e(19), l = e(27), u = e(28), $ = e(30), c = e(29), F = e(31), f = e(36), q = e(37), B = e(38), j = e(39), h = e(32), p = e(26), d = t.getDesc, m = t.setDesc, g = t.create, b = f.get, v = r.Symbol, y = r.JSON, E = y && y.stringify, x = false, S = c("_hidden"), V = t.isEnum, w = l("symbol-registry"), k = l("symbols"), P = typeof v == "function", A = Object.prototype;
        var C = n && a(function() {
            return g(m({}, "a", {
                get: function() {
                    return m(this, "a", {
                        value: 7
                    }).a;
                }
            })).a != 7;
        }) ? function(e, t, r) {
            var n = d(A, t);
            if (n) delete A[t];
            m(e, t, r);
            if (n && e !== A) m(A, t, n);
        } : m;
        var _ = function(t) {
            var e = k[t] = g(v.prototype);
            e._k = t;
            n && x && C(A, t, {
                configurable: true,
                set: function(e) {
                    if (o(this, S) && o(this[S], t)) this[S][t] = false;
                    C(this, t, p(1, e));
                }
            });
            return e;
        };
        var O = function(e) {
            return typeof e == "symbol";
        };
        var I = function e(t, r, n) {
            if (n && o(k, r)) {
                if (!n.enumerable) {
                    if (!o(t, S)) m(t, S, p(1, {}));
                    t[S][r] = true;
                } else {
                    if (o(t, S) && t[S][r]) t[S][r] = false;
                    n = g(n, {
                        enumerable: p(0, false)
                    });
                }
                return C(t, r, n);
            }
            return m(t, r, n);
        };
        var T = function e(t, r) {
            j(t);
            var n = q(r = h(r)), s = 0, i = n.length, o;
            while (i > s) I(t, o = n[s++], r[o]);
            return t;
        };
        var N = function e(t, r) {
            return r === undefined ? g(t) : T(g(t), r);
        };
        var H = function e(t) {
            var r = V.call(this, t);
            return r || !o(this, t) || !o(k, t) || o(this, S) && this[S][t] ? r : true;
        };
        var R = function e(t, r) {
            var n = d(t = h(t), r);
            if (n && o(k, r) && !(o(t, S) && t[S][r])) n.enumerable = true;
            return n;
        };
        var L = function e(t) {
            var r = b(h(t)), n = [], s = 0, i;
            while (r.length > s) if (!o(k, i = r[s++]) && i != S) n.push(i);
            return n;
        };
        var U = function e(t) {
            var r = b(h(t)), n = [], s = 0, i;
            while (r.length > s) if (o(k, i = r[s++])) n.push(k[i]);
            return n;
        };
        var W = function e(t) {
            if (t === undefined || O(t)) return;
            var r = [ t ], n = 1, s = arguments, i, o;
            while (s.length > n) r.push(s[n++]);
            i = r[1];
            if (typeof i == "function") o = i;
            if (o || !B(i)) i = function(e, t) {
                if (o) t = o.call(this, e, t);
                if (!O(t)) return t;
            };
            r[1] = i;
            return E.apply(y, r);
        };
        var J = a(function() {
            var e = v();
            return E([ e ]) != "[null]" || E({
                a: e
            }) != "{}" || E(Object(e)) != "{}";
        });
        if (!P) {
            v = function e() {
                if (O(this)) throw TypeError("Symbol is not a constructor");
                return _($(arguments.length > 0 ? arguments[0] : undefined));
            };
            i(v.prototype, "toString", function e() {
                return this._k;
            });
            O = function(e) {
                return e instanceof v;
            };
            t.create = N;
            t.isEnum = H;
            t.getDesc = R;
            t.setDesc = I;
            t.setDescs = T;
            t.getNames = f.get = L;
            t.getSymbols = U;
            if (n && !e(41)) {
                i(A, "propertyIsEnumerable", H, true);
            }
        }
        var z = {
            for: function(e) {
                return o(w, e += "") ? w[e] : w[e] = v(e);
            },
            keyFor: function e(t) {
                return F(w, t);
            },
            useSetter: function() {
                x = true;
            },
            useSimple: function() {
                x = false;
            }
        };
        t.each.call(("hasInstance,isConcatSpreadable,iterator,match,replace,search," + "species,split,toPrimitive,toStringTag,unscopables").split(","), function(e) {
            var t = c(e);
            z[e] = P ? t : _(t);
        });
        x = true;
        s(s.G + s.W, {
            Symbol: v
        });
        s(s.S, "Symbol", z);
        s(s.S + s.F * !P, "Object", {
            create: N,
            defineProperty: I,
            defineProperties: T,
            getOwnPropertyDescriptor: R,
            getOwnPropertyNames: L,
            getOwnPropertySymbols: U
        });
        y && s(s.S + s.F * (!P || J), "JSON", {
            stringify: W
        });
        u(v, "Symbol");
        u(Math, "Math", true);
        u(r.JSON, "JSON", true);
    }, function(e, t) {
        var r = e.exports = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
        if (typeof __g == "number") __g = r;
    }, function(e, t) {
        var r = {}.hasOwnProperty;
        e.exports = function(e, t) {
            return r.call(e, t);
        };
    }, function(e, t, r) {
        e.exports = !r(19)(function() {
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
    }, function(e, t, r) {
        var d = r(16), m = r(21), g = r(22), b = "prototype";
        var v = function(e, t, r) {
            var n = e & v.F, s = e & v.G, i = e & v.S, o = e & v.P, a = e & v.B, l = e & v.W, u = s ? m : m[t] || (m[t] = {}), c = s ? d : i ? d[t] : (d[t] || {})[b], f, h, p;
            if (s) r = t;
            for (f in r) {
                h = !n && c && f in c;
                if (h && f in u) continue;
                p = h ? c[f] : r[f];
                u[f] = s && typeof c[f] != "function" ? r[f] : a && h ? g(p, d) : l && c[f] == p ? function(t) {
                    var e = function(e) {
                        return this instanceof t ? new t(e) : t(e);
                    };
                    e[b] = t[b];
                    return e;
                }(p) : o && typeof p == "function" ? g(Function.call, p) : p;
                if (o) (u[b] || (u[b] = {}))[f] = p;
            }
        };
        v.F = 1;
        v.G = 2;
        v.S = 4;
        v.P = 8;
        v.B = 16;
        v.W = 32;
        e.exports = v;
    }, function(e, t) {
        var r = e.exports = {
            version: "1.2.6"
        };
        if (typeof __e == "number") __e = r;
    }, function(e, t, r) {
        var i = r(23);
        e.exports = function(n, s, e) {
            i(n);
            if (s === undefined) return n;
            switch (e) {
              case 1:
                return function(e) {
                    return n.call(s, e);
                };

              case 2:
                return function(e, t) {
                    return n.call(s, e, t);
                };

              case 3:
                return function(e, t, r) {
                    return n.call(s, e, t, r);
                };
            }
            return function() {
                return n.apply(s, arguments);
            };
        };
    }, function(e, t) {
        e.exports = function(e) {
            if (typeof e != "function") throw TypeError(e + " is not a function!");
            return e;
        };
    }, function(e, t, r) {
        e.exports = r(25);
    }, function(e, t, r) {
        var n = r(9), s = r(26);
        e.exports = r(18) ? function(e, t, r) {
            return n.setDesc(e, t, s(1, r));
        } : function(e, t, r) {
            e[t] = r;
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
    }, function(e, t, r) {
        var n = r(16), s = "__core-js_shared__", i = n[s] || (n[s] = {});
        e.exports = function(e) {
            return i[e] || (i[e] = {});
        };
    }, function(e, t, r) {
        var n = r(9).setDesc, s = r(17), i = r(29)("toStringTag");
        e.exports = function(e, t, r) {
            if (e && !s(e = r ? e : e.prototype, i)) n(e, i, {
                configurable: true,
                value: t
            });
        };
    }, function(e, t, r) {
        var n = r(27)("wks"), s = r(30), i = r(16).Symbol;
        e.exports = function(e) {
            return n[e] || (n[e] = i && i[e] || (i || s)("Symbol." + e));
        };
    }, function(e, t) {
        var r = 0, n = Math.random();
        e.exports = function(e) {
            return "Symbol(".concat(e === undefined ? "" : e, ")_", (++r + n).toString(36));
        };
    }, function(e, t, r) {
        var a = r(9), l = r(32);
        e.exports = function(e, t) {
            var r = l(e), n = a.getKeys(r), s = n.length, i = 0, o;
            while (s > i) if (r[o = n[i++]] === t) return o;
        };
    }, function(e, t, r) {
        var n = r(33), s = r(35);
        e.exports = function(e) {
            return n(s(e));
        };
    }, function(e, t, r) {
        var n = r(34);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return n(e) == "String" ? e.split("") : Object(e);
        };
    }, function(e, t) {
        var r = {}.toString;
        e.exports = function(e) {
            return r.call(e).slice(8, -1);
        };
    }, function(e, t) {
        e.exports = function(e) {
            if (e == undefined) throw TypeError("Can't call method on  " + e);
            return e;
        };
    }, function(e, t, r) {
        var n = r(32), s = r(9).getNames, i = {}.toString;
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
            return s(n(t));
        };
    }, function(e, t, r) {
        var a = r(9);
        e.exports = function(e) {
            var t = a.getKeys(e), r = a.getSymbols;
            if (r) {
                var n = r(e), s = a.isEnum, i = 0, o;
                while (n.length > i) if (s.call(e, o = n[i++])) t.push(o);
            }
            return t;
        };
    }, function(e, t, r) {
        var n = r(34);
        e.exports = Array.isArray || function(e) {
            return n(e) == "Array";
        };
    }, function(e, t, r) {
        var n = r(40);
        e.exports = function(e) {
            if (!n(e)) throw TypeError(e + " is not an object!");
            return e;
        };
    }, function(e, t) {
        e.exports = function(e) {
            return typeof e === "object" ? e !== null : typeof e === "function";
        };
    }, function(e, t) {
        e.exports = true;
    }, function(e, t) {}, function(e, t, r) {
        e.exports = {
            default: r(44),
            __esModule: true
        };
    }, function(e, t, r) {
        r(45);
        r(51);
        e.exports = r(29)("iterator");
    }, function(e, t, r) {
        "use strict";
        var n = r(46)(true);
        r(48)(String, "String", function(e) {
            this._t = String(e);
            this._i = 0;
        }, function() {
            var e = this._t, t = this._i, r;
            if (t >= e.length) return {
                value: undefined,
                done: true
            };
            r = n(e, t);
            this._i += r.length;
            return {
                value: r,
                done: false
            };
        });
    }, function(e, t, r) {
        var l = r(47), u = r(35);
        e.exports = function(a) {
            return function(e, t) {
                var r = String(u(e)), n = l(t), s = r.length, i, o;
                if (n < 0 || n >= s) return a ? "" : undefined;
                i = r.charCodeAt(n);
                return i < 55296 || i > 56319 || n + 1 === s || (o = r.charCodeAt(n + 1)) < 56320 || o > 57343 ? a ? r.charAt(n) : i : a ? r.slice(n, n + 2) : (i - 55296 << 10) + (o - 56320) + 65536;
            };
        };
    }, function(e, t) {
        var r = Math.ceil, n = Math.floor;
        e.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? n : r)(e);
        };
    }, function(e, t, r) {
        "use strict";
        var b = r(41), v = r(20), y = r(24), E = r(25), x = r(17), S = r(49), w = r(50), k = r(28), P = r(9).getProto, A = r(29)("iterator"), C = !([].keys && "next" in [].keys()), _ = "@@iterator", O = "keys", I = "values";
        var T = function() {
            return this;
        };
        e.exports = function(e, t, r, n, s, i, o) {
            w(r, t, n);
            var a = function(t) {
                if (!C && t in f) return f[t];
                switch (t) {
                  case O:
                    return function e() {
                        return new r(this, t);
                    };

                  case I:
                    return function e() {
                        return new r(this, t);
                    };
                }
                return function e() {
                    return new r(this, t);
                };
            };
            var l = t + " Iterator", u = s == I, c = false, f = e.prototype, h = f[A] || f[_] || s && f[s], p = h || a(s), d, m;
            if (h) {
                var g = P(p.call(new e()));
                k(g, l, true);
                if (!b && x(f, _)) E(g, A, T);
                if (u && h.name !== I) {
                    c = true;
                    p = function e() {
                        return h.call(this);
                    };
                }
            }
            if ((!b || o) && (C || c || !f[A])) {
                E(f, A, p);
            }
            S[t] = p;
            S[l] = T;
            if (s) {
                d = {
                    values: u ? p : a(I),
                    keys: i ? p : a(O),
                    entries: !u ? p : a("entries")
                };
                if (o) for (m in d) {
                    if (!(m in f)) y(f, m, d[m]);
                } else v(v.P + v.F * (C || c), t, d);
            }
            return d;
        };
    }, function(e, t) {
        e.exports = {};
    }, function(e, t, r) {
        "use strict";
        var n = r(9), s = r(26), i = r(28), o = {};
        r(25)(o, r(29)("iterator"), function() {
            return this;
        });
        e.exports = function(e, t, r) {
            e.prototype = n.create(o, {
                next: s(1, r)
            });
            i(e, t + " Iterator");
        };
    }, function(e, t, r) {
        r(52);
        var n = r(49);
        n.NodeList = n.HTMLCollection = n.Array;
    }, function(e, t, r) {
        "use strict";
        var n = r(53), s = r(54), i = r(49), o = r(32);
        e.exports = r(48)(Array, "Array", function(e, t) {
            this._t = o(e);
            this._i = 0;
            this._k = t;
        }, function() {
            var e = this._t, t = this._k, r = this._i++;
            if (!e || r >= e.length) {
                this._t = undefined;
                return s(1);
            }
            if (t == "keys") return s(0, r);
            if (t == "values") return s(0, e[r]);
            return s(0, [ r, e[r] ]);
        }, "values");
        i.Arguments = i.Array;
        n("keys");
        n("values");
        n("entries");
    }, function(e, t) {
        e.exports = function() {};
    }, function(e, t) {
        e.exports = function(e, t) {
            return {
                value: t,
                done: !!e
            };
        };
    }, function(e, t, r) {
        e.exports = {
            default: r(56),
            __esModule: true
        };
    }, function(e, t, r) {
        r(51);
        r(45);
        e.exports = r(57);
    }, function(e, t, r) {
        var n = r(39), s = r(58);
        e.exports = r(21).getIterator = function(e) {
            var t = s(e);
            if (typeof t != "function") throw TypeError(e + " is not iterable!");
            return n(t.call(e));
        };
    }, function(e, t, r) {
        var n = r(59), s = r(29)("iterator"), i = r(49);
        e.exports = r(21).getIteratorMethod = function(e) {
            if (e != undefined) return e[s] || e["@@iterator"] || i[n(e)];
        };
    }, function(e, t, r) {
        var s = r(34), i = r(29)("toStringTag"), o = s(function() {
            return arguments;
        }()) == "Arguments";
        e.exports = function(e) {
            var t, r, n;
            return e === undefined ? "Undefined" : e === null ? "Null" : typeof (r = (t = Object(e))[i]) == "string" ? r : o ? s(t) : (n = s(t)) == "Object" && typeof t.callee == "function" ? "Arguments" : n;
        };
    }, function(e, t, r) {
        e.exports = {
            default: r(61),
            __esModule: true
        };
    }, function(e, t, r) {
        r(62);
        e.exports = r(21).Object.keys;
    }, function(e, t, r) {
        var n = r(63);
        r(64)("keys", function(r) {
            return function e(t) {
                return r(n(t));
            };
        });
    }, function(e, t, r) {
        var n = r(35);
        e.exports = function(e) {
            return Object(n(e));
        };
    }, function(e, t, r) {
        var s = r(20), i = r(21), o = r(19);
        e.exports = function(e, t) {
            var r = (i.Object || {})[e] || Object[e], n = {};
            n[e] = t(r);
            s(s.S + s.F * o(function() {
                r(1);
            }), "Object", n);
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var s = r(6);
        var i = n(s);
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
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var s = r(5);
        var i = r(6);
        var o = n(i);
        t["default"] = function(r) {
            r.registerHelper("if", function(e, t) {
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
            r.registerHelper("unless", function(e, t) {
                if (arguments.length != 2) {
                    throw new o["default"]("#unless requires exactly one argument");
                }
                return r.helpers["if"].call(this, e, {
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
                for (var r = 0; r < arguments.length - 1; r++) {
                    e.push(arguments[r]);
                }
                var n = 1;
                if (t.hash.level != null) {
                    n = t.hash.level;
                } else if (t.data && t.data.level != null) {
                    n = t.data.level;
                }
                e[0] = n;
                s.log.apply(s, e);
            });
        };
        e.exports = t["default"];
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t["default"] = function(e) {
            e.registerHelper("lookup", function(e, t, r) {
                if (!e) {
                    return e;
                }
                return r.lookupProperty(e, t);
            });
        };
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var s = r(5);
        var i = r(6);
        var o = n(i);
        t["default"] = function(e) {
            e.registerHelper("with", function(e, t) {
                if (arguments.length != 2) {
                    throw new o["default"]("#with requires exactly one argument");
                }
                if (s.isFunction(e)) {
                    e = e.call(this);
                }
                var r = t.fn;
                if (!s.isEmpty(e)) {
                    var n = t.data;
                    if (t.data && t.ids) {
                        n = s.createFrame(t.data);
                        n.contextPath = s.appendContextPath(t.data.contextPath, t.ids[0]);
                    }
                    return r(e, {
                        data: n,
                        blockParams: s.blockParams([ e ], [ n && n.contextPath ])
                    });
                } else {
                    return t.inverse(this);
                }
            });
        };
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        t.registerDefaultDecorators = o;
        var s = r(71);
        var i = n(s);
        function o(e) {
            i["default"](e);
        }
    }, function(e, t, r) {
        "use strict";
        t.__esModule = true;
        var a = r(5);
        t["default"] = function(e) {
            e.registerDecorator("inline", function(s, i, o, e) {
                var t = s;
                if (!i.partials) {
                    i.partials = {};
                    t = function(e, t) {
                        var r = o.partials;
                        o.partials = a.extend({}, r, i.partials);
                        var n = s(e, t);
                        o.partials = r;
                        return n;
                    };
                }
                i.partials[e.args[0]] = e.fn;
                return t;
            });
        };
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        t.__esModule = true;
        var n = r(5);
        var o = {
            methodMap: [ "debug", "info", "warn", "error" ],
            level: "info",
            lookupLevel: function e(t) {
                if (typeof t === "string") {
                    var r = n.indexOf(o.methodMap, t.toLowerCase());
                    if (r >= 0) {
                        t = r;
                    } else {
                        t = parseInt(t, 10);
                    }
                }
                return t;
            },
            log: function e(t) {
                t = o.lookupLevel(t);
                if (typeof console !== "undefined" && o.lookupLevel(o.level) <= t) {
                    var r = o.methodMap[t];
                    if (!console[r]) {
                        r = "log";
                    }
                    for (var n = arguments.length, s = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) {
                        s[i - 1] = arguments[i];
                    }
                    console[r].apply(console, s);
                }
            }
        };
        t["default"] = o;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(74)["default"];
        var s = r(60)["default"];
        var i = r(1)["default"];
        t.__esModule = true;
        t.createProtoAccessControl = c;
        t.resultIsAllowed = f;
        t.resetLoggedProperties = d;
        var o = r(76);
        var a = r(72);
        var l = i(a);
        var u = n(null);
        function c(e) {
            var t = n(null);
            t["constructor"] = false;
            t["__defineGetter__"] = false;
            t["__defineSetter__"] = false;
            t["__lookupGetter__"] = false;
            var r = n(null);
            r["__proto__"] = false;
            return {
                properties: {
                    whitelist: o.createNewLookupObject(r, e.allowedProtoProperties),
                    defaultValue: e.allowProtoPropertiesByDefault
                },
                methods: {
                    whitelist: o.createNewLookupObject(t, e.allowedProtoMethods),
                    defaultValue: e.allowProtoMethodsByDefault
                }
            };
        }
        function f(e, t, r) {
            if (typeof e === "function") {
                return h(t.methods, r);
            } else {
                return h(t.properties, r);
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
            if (u[e] !== true) {
                u[e] = true;
                l["default"].log("error", 'Handlebars: Access has been denied to resolve the property "' + e + '" because it is not an "own property" of its parent.\n' + "You can add a runtime option to disable the check or this warning:\n" + "See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details");
            }
        }
        function d() {
            s(u).forEach(function(e) {
                delete u[e];
            });
        }
    }, function(e, t, r) {
        e.exports = {
            default: r(75),
            __esModule: true
        };
    }, function(e, t, r) {
        var n = r(9);
        e.exports = function e(t, r) {
            return n.create(t, r);
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(74)["default"];
        t.__esModule = true;
        t.createNewLookupObject = i;
        var s = r(5);
        function i() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) {
                t[r] = arguments[r];
            }
            return s.extend.apply(undefined, [ n(null) ].concat(t));
        }
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        function r(e) {
            this.string = e;
        }
        r.prototype.toString = r.prototype.toHTML = function() {
            return "" + this.string;
        };
        t["default"] = r;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var s = r(79)["default"];
        var i = r(60)["default"];
        var n = r(3)["default"];
        var o = r(1)["default"];
        t.__esModule = true;
        t.checkRevision = m;
        t.template = g;
        t.wrapProgram = b;
        t.resolvePartial = v;
        t.invokePartial = y;
        t.noop = E;
        var a = r(5);
        var c = n(a);
        var l = r(6);
        var f = o(l);
        var u = r(4);
        var h = r(10);
        var p = r(82);
        var d = r(73);
        function m(e) {
            var t = e && e[0] || 1, r = u.COMPILER_REVISION;
            if (t >= u.LAST_COMPATIBLE_COMPILER_REVISION && t <= u.COMPILER_REVISION) {
                return;
            }
            if (t < u.LAST_COMPATIBLE_COMPILER_REVISION) {
                var n = u.REVISION_CHANGES[r], s = u.REVISION_CHANGES[t];
                throw new f["default"]("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + s + ").");
            } else {
                throw new f["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. " + "Please update your runtime to a newer version (" + e[1] + ").");
            }
        }
        function g(l, u) {
            if (!u) {
                throw new f["default"]("No environment passed to template");
            }
            if (!l || !l.main) {
                throw new f["default"]("Unknown template object: " + typeof l);
            }
            l.main.decorator = l.main_d;
            u.VM.checkRevision(l.compiler);
            var n = l.compiler && l.compiler[0] === 7;
            function e(e, t, r) {
                if (r.hash) {
                    t = c.extend({}, t, r.hash);
                    if (r.ids) {
                        r.ids[0] = true;
                    }
                }
                e = u.VM.resolvePartial.call(this, e, t, r);
                var n = c.extend({}, r, {
                    hooks: this.hooks,
                    protoAccessControl: this.protoAccessControl
                });
                var s = u.VM.invokePartial.call(this, e, t, n);
                if (s == null && u.compile) {
                    r.partials[r.name] = u.compile(e, l.compilerOptions, u);
                    s = r.partials[r.name](t, n);
                }
                if (s != null) {
                    if (r.indent) {
                        var i = s.split("\n");
                        for (var o = 0, a = i.length; o < a; o++) {
                            if (!i[o] && o + 1 === a) {
                                break;
                            }
                            i[o] = r.indent + i[o];
                        }
                        s = i.join("\n");
                    }
                    return s;
                } else {
                    throw new f["default"]("The partial " + r.name + " could not be compiled when running in runtime-only mode");
                }
            }
            var o = {
                strict: function e(t, r, n) {
                    if (!t || !(r in t)) {
                        throw new f["default"]('"' + r + '" not defined in ' + t, {
                            loc: n
                        });
                    }
                    return o.lookupProperty(t, r);
                },
                lookupProperty: function e(t, r) {
                    var n = t[r];
                    if (n == null) {
                        return n;
                    }
                    if (Object.prototype.hasOwnProperty.call(t, r)) {
                        return n;
                    }
                    if (d.resultIsAllowed(n, o.protoAccessControl, r)) {
                        return n;
                    }
                    return undefined;
                },
                lookup: function e(t, r) {
                    var n = t.length;
                    for (var s = 0; s < n; s++) {
                        var i = t[s] && o.lookupProperty(t[s], r);
                        if (i != null) {
                            return t[s][r];
                        }
                    }
                },
                lambda: function e(t, r) {
                    return typeof t === "function" ? t.call(r) : t;
                },
                escapeExpression: c.escapeExpression,
                invokePartial: e,
                fn: function e(t) {
                    var r = l[t];
                    r.decorator = l[t + "_d"];
                    return r;
                },
                programs: [],
                program: function e(t, r, n, s, i) {
                    var o = this.programs[t], a = this.fn(t);
                    if (r || i || s || n) {
                        o = b(this, t, a, r, n, s, i);
                    } else if (!o) {
                        o = this.programs[t] = b(this, t, a);
                    }
                    return o;
                },
                data: function e(t, r) {
                    while (t && r--) {
                        t = t._parent;
                    }
                    return t;
                },
                mergeIfNeeded: function e(t, r) {
                    var n = t || r;
                    if (t && r && t !== r) {
                        n = c.extend({}, r, t);
                    }
                    return n;
                },
                nullContext: s({}),
                noop: u.VM.noop,
                compilerInfo: l.compiler
            };
            function a(e) {
                var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var r = t.data;
                a._setup(t);
                if (!t.partial && l.useData) {
                    r = x(e, r);
                }
                var n = undefined, s = l.useBlockParams ? [] : undefined;
                if (l.useDepths) {
                    if (t.depths) {
                        n = e != t.depths[0] ? [ e ].concat(t.depths) : t.depths;
                    } else {
                        n = [ e ];
                    }
                }
                function i(e) {
                    return "" + l.main(o, e, o.helpers, o.partials, r, s, n);
                }
                i = S(l.main, i, o, t.depths || [], r, s);
                return i(e, t);
            }
            a.isTop = true;
            a._setup = function(e) {
                if (!e.partial) {
                    var t = c.extend({}, u.helpers, e.helpers);
                    w(t, o);
                    o.helpers = t;
                    if (l.usePartial) {
                        o.partials = o.mergeIfNeeded(e.partials, u.partials);
                    }
                    if (l.usePartial || l.useDecorators) {
                        o.decorators = c.extend({}, u.decorators, e.decorators);
                    }
                    o.hooks = {};
                    o.protoAccessControl = d.createProtoAccessControl(e);
                    var r = e.allowCallsToHelperMissing || n;
                    h.moveHelperToHooks(o, "helperMissing", r);
                    h.moveHelperToHooks(o, "blockHelperMissing", r);
                } else {
                    o.protoAccessControl = e.protoAccessControl;
                    o.helpers = e.helpers;
                    o.partials = e.partials;
                    o.decorators = e.decorators;
                    o.hooks = e.hooks;
                }
            };
            a._child = function(e, t, r, n) {
                if (l.useBlockParams && !r) {
                    throw new f["default"]("must pass block params");
                }
                if (l.useDepths && !n) {
                    throw new f["default"]("must pass parent depths");
                }
                return b(o, e, l[e], t, 0, r, n);
            };
            return a;
        }
        function b(n, e, s, i, t, o, a) {
            function r(e) {
                var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var r = a;
                if (a && e != a[0] && !(e === n.nullContext && a[0] === null)) {
                    r = [ e ].concat(a);
                }
                return s(n, e, n.helpers, n.partials, t.data || i, o && [ t.blockParams ].concat(o), r);
            }
            r = S(s, r, n, a, i, o);
            r.program = e;
            r.depth = a ? a.length : 0;
            r.blockParams = t || 0;
            return r;
        }
        function v(e, t, r) {
            if (!e) {
                if (r.name === "@partial-block") {
                    e = r.data["partial-block"];
                } else {
                    e = r.partials[r.name];
                }
            } else if (!e.call && !r.name) {
                r.name = e;
                e = r.partials[e];
            }
            return e;
        }
        function y(e, t, r) {
            var s = r.data && r.data["partial-block"];
            r.partial = true;
            if (r.ids) {
                r.data.contextPath = r.ids[0] || r.data.contextPath;
            }
            var i = undefined;
            if (r.fn && r.fn !== E) {
                (function() {
                    r.data = u.createFrame(r.data);
                    var n = r.fn;
                    i = r.data["partial-block"] = function e(t) {
                        var r = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        r.data = u.createFrame(r.data);
                        r.data["partial-block"] = s;
                        return n(t, r);
                    };
                    if (n.partials) {
                        r.partials = c.extend({}, r.partials, n.partials);
                    }
                })();
            }
            if (e === undefined && i) {
                e = i;
            }
            if (e === undefined) {
                throw new f["default"]("The partial " + r.name + " could not be found");
            } else if (e instanceof Function) {
                return e(t, r);
            }
        }
        function E() {
            return "";
        }
        function x(e, t) {
            if (!t || !("root" in t)) {
                t = t ? u.createFrame(t) : {};
                t.root = e;
            }
            return t;
        }
        function S(e, t, r, n, s, i) {
            if (e.decorator) {
                var o = {};
                t = e.decorator(t, o, r, n && n[0], s, i, n);
                c.extend(t, o);
            }
            return t;
        }
        function w(r, n) {
            i(r).forEach(function(e) {
                var t = r[e];
                r[e] = k(t, n);
            });
        }
        function k(e, t) {
            var r = t.lookupProperty;
            return p.wrapHelper(e, function(e) {
                return c.extend({
                    lookupProperty: r
                }, e);
            });
        }
    }, function(e, t, r) {
        e.exports = {
            default: r(80),
            __esModule: true
        };
    }, function(e, t, r) {
        r(81);
        e.exports = r(21).Object.seal;
    }, function(e, t, r) {
        var n = r(40);
        r(64)("seal", function(r) {
            return function e(t) {
                return r && n(t) ? r(t) : t;
            };
        });
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t.wrapHelper = r;
        function r(r, n) {
            if (typeof r !== "function") {
                return r;
            }
            var e = function e() {
                var t = arguments[arguments.length - 1];
                arguments[arguments.length - 1] = n(t);
                return r.apply(this, arguments);
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
        var r = {
            helpers: {
                helperExpression: function e(t) {
                    return t.type === "SubExpression" || (t.type === "MustacheStatement" || t.type === "BlockStatement") && !!(t.params && t.params.length || t.hash);
                },
                scopedId: function e(t) {
                    return /^\.|this\b/.test(t.original);
                },
                simpleId: function e(t) {
                    return t.parts.length === 1 && !r.helpers.scopedId(t) && !t.depth;
                }
            }
        };
        t["default"] = r;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        var s = r(3)["default"];
        t.__esModule = true;
        t.parseWithoutProcessing = p;
        t.parse = d;
        var i = r(86);
        var o = n(i);
        var a = r(87);
        var l = n(a);
        var u = r(89);
        var c = s(u);
        var f = r(5);
        t.parser = o["default"];
        var h = {};
        f.extend(h, c);
        function p(e, t) {
            if (e.type === "Program") {
                return e;
            }
            o["default"].yy = h;
            h.locInfo = function(e) {
                return new h.SourceLocation(t && t.srcName, e);
            };
            var r = o["default"].parse(e);
            return r;
        }
        function d(e, t) {
            var r = p(e, t);
            var n = new l["default"](t);
            return n.accept(r);
        }
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        var r = function() {
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
                performAction: function e(t, r, n, s, i, o, a) {
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
                        var u = s.prepareBlock(o[l - 2], o[l - 1], o[l], o[l], false, this._$), c = s.prepareProgram([ u ], o[l - 1].loc);
                        c.chained = true;
                        this.$ = {
                            strip: o[l - 2].strip,
                            program: c,
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
                parseError: function e(t, r) {
                    throw new Error(t);
                },
                parse: function e(t) {
                    var r = this, n = [ 0 ], s = [ null ], i = [], o = this.table, a = "", l = 0, u = 0, c = 0, f = 2, h = 1;
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
                        n.length = n.length - 2 * e;
                        s.length = s.length - e;
                        i.length = i.length - e;
                    }
                    function g() {
                        var e;
                        e = r.lexer.lex() || 1;
                        if (typeof e !== "number") {
                            e = r.symbols_[e] || e;
                        }
                        return e;
                    }
                    var b, v, y, E, x, S, w = {}, k, P, A, C;
                    while (true) {
                        y = n[n.length - 1];
                        if (this.defaultActions[y]) {
                            E = this.defaultActions[y];
                        } else {
                            if (b === null || typeof b == "undefined") {
                                b = g();
                            }
                            E = o[y] && o[y][b];
                        }
                        if (typeof E === "undefined" || !E.length || !E[0]) {
                            var _ = "";
                            if (!c) {
                                C = [];
                                for (k in o[y]) if (this.terminals_[k] && k > 2) {
                                    C.push("'" + this.terminals_[k] + "'");
                                }
                                if (this.lexer.showPosition) {
                                    _ = "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + C.join(", ") + ", got '" + (this.terminals_[b] || b) + "'";
                                } else {
                                    _ = "Parse error on line " + (l + 1) + ": Unexpected " + (b == 1 ? "end of input" : "'" + (this.terminals_[b] || b) + "'");
                                }
                                this.parseError(_, {
                                    text: this.lexer.match,
                                    token: this.terminals_[b] || b,
                                    line: this.lexer.yylineno,
                                    loc: p,
                                    expected: C
                                });
                            }
                        }
                        if (E[0] instanceof Array && E.length > 1) {
                            throw new Error("Parse Error: multiple actions possible at state: " + y + ", token: " + b);
                        }
                        switch (E[0]) {
                          case 1:
                            n.push(b);
                            s.push(this.lexer.yytext);
                            i.push(this.lexer.yylloc);
                            n.push(E[1]);
                            b = null;
                            if (!v) {
                                u = this.lexer.yyleng;
                                a = this.lexer.yytext;
                                l = this.lexer.yylineno;
                                p = this.lexer.yylloc;
                                if (c > 0) c--;
                            } else {
                                b = v;
                                v = null;
                            }
                            break;

                          case 2:
                            P = this.productions_[E[1]][1];
                            w.$ = s[s.length - P];
                            w._$ = {
                                first_line: i[i.length - (P || 1)].first_line,
                                last_line: i[i.length - 1].last_line,
                                first_column: i[i.length - (P || 1)].first_column,
                                last_column: i[i.length - 1].last_column
                            };
                            if (d) {
                                w._$.range = [ i[i.length - (P || 1)].range[0], i[i.length - 1].range[1] ];
                            }
                            S = this.performAction.call(w, a, u, l, this.yy, E[1], s, i);
                            if (typeof S !== "undefined") {
                                return S;
                            }
                            if (P) {
                                n = n.slice(0, -1 * P * 2);
                                s = s.slice(0, -1 * P);
                                i = i.slice(0, -1 * P);
                            }
                            n.push(this.productions_[E[1]][0]);
                            s.push(w.$);
                            i.push(w._$);
                            A = o[n[n.length - 2]][n[n.length - 1]];
                            n.push(A);
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
                    parseError: function e(t, r) {
                        if (this.yy.parser) {
                            this.yy.parser.parseError(t, r);
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
                        var r = t.match(/(?:\r\n?|\n).*/g);
                        if (r) {
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
                        var r = t.length;
                        var n = t.split(/(?:\r\n?|\n)/g);
                        this._input = t + this._input;
                        this.yytext = this.yytext.substr(0, this.yytext.length - r - 1);
                        this.offset -= r;
                        var s = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1);
                        this.matched = this.matched.substr(0, this.matched.length - 1);
                        if (n.length - 1) this.yylineno -= n.length - 1;
                        var i = this.yylloc.range;
                        this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: n ? (n.length === s.length ? this.yylloc.first_column : 0) + s[s.length - n.length].length - n[0].length : this.yylloc.first_column - r
                        };
                        if (this.options.ranges) {
                            this.yylloc.range = [ i[0], i[0] + this.yyleng - r ];
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
                        var r = new Array(t.length + 1).join("-");
                        return t + this.upcomingInput() + "\n" + r + "^";
                    },
                    next: function e() {
                        if (this.done) {
                            return this.EOF;
                        }
                        if (!this._input) this.done = true;
                        var t, r, n, s, i, o;
                        if (!this._more) {
                            this.yytext = "";
                            this.match = "";
                        }
                        var a = this._currentRules();
                        for (var l = 0; l < a.length; l++) {
                            n = this._input.match(this.rules[a[l]]);
                            if (n && (!r || n[0].length > r[0].length)) {
                                r = n;
                                s = l;
                                if (!this.options.flex) break;
                            }
                        }
                        if (r) {
                            o = r[0].match(/(?:\r\n?|\n).*/g);
                            if (o) this.yylineno += o.length;
                            this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: o ? o[o.length - 1].length - o[o.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + r[0].length
                            };
                            this.yytext += r[0];
                            this.match += r[0];
                            this.matches = r;
                            this.yyleng = this.yytext.length;
                            if (this.options.ranges) {
                                this.yylloc.range = [ this.offset, this.offset += this.yyleng ];
                            }
                            this._more = false;
                            this._input = this._input.slice(r[0].length);
                            this.matched += r[0];
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
                e.performAction = function e(t, r, n, s) {
                    function i(e, t) {
                        return r.yytext = r.yytext.substring(e, r.yyleng - t + e);
                    }
                    var o = s;
                    switch (n) {
                      case 0:
                        if (r.yytext.slice(-2) === "\\\\") {
                            i(0, 1);
                            this.begin("mu");
                        } else if (r.yytext.slice(-1) === "\\") {
                            i(0, 1);
                            this.begin("emu");
                        } else {
                            this.begin("mu");
                        }
                        if (r.yytext) return 15;
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
                        this.unput(r.yytext);
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
                        r.yytext = i(1, 2).replace(/\\"/g, '"');
                        return 80;
                        break;

                      case 32:
                        r.yytext = i(1, 2).replace(/\\'/g, "'");
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
                        r.yytext = r.yytext.replace(/\\([\\\]])/g, "$1");
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
            function r() {
                this.yy = {};
            }
            r.prototype = e;
            e.Parser = r;
            return new r();
        }();
        t["default"] = r;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var s = r(88);
        var i = n(s);
        function o() {
            var e = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            this.options = e;
        }
        o.prototype = new i["default"]();
        o.prototype.Program = function(e) {
            var t = !this.options.ignoreStandalone;
            var r = !this.isRootSeen;
            this.isRootSeen = true;
            var n = e.body;
            for (var s = 0, i = n.length; s < i; s++) {
                var o = n[s], a = this.accept(o);
                if (!a) {
                    continue;
                }
                var l = p(n, s, r), u = d(n, s, r), c = a.openStandalone && l, f = a.closeStandalone && u, h = a.inlineStandalone && l && u;
                if (a.close) {
                    m(n, s, true);
                }
                if (a.open) {
                    g(n, s, true);
                }
                if (t && h) {
                    m(n, s);
                    if (g(n, s)) {
                        if (o.type === "PartialStatement") {
                            o.indent = /([ \t]+$)/.exec(n[s - 1].original)[1];
                        }
                    }
                }
                if (t && c) {
                    m((o.program || o.inverse).body);
                    g(n, s);
                }
                if (t && f) {
                    m(n, s);
                    g((o.inverse || o.program).body);
                }
            }
            return e;
        };
        o.prototype.BlockStatement = o.prototype.DecoratorBlock = o.prototype.PartialBlockStatement = function(e) {
            this.accept(e.program);
            this.accept(e.inverse);
            var t = e.program || e.inverse, r = e.program && e.inverse, n = r, s = r;
            if (r && r.chained) {
                n = r.body[0].program;
                while (s.chained) {
                    s = s.body[s.body.length - 1].program;
                }
            }
            var i = {
                open: e.openStrip.open,
                close: e.closeStrip.close,
                openStandalone: d(t.body),
                closeStandalone: p((n || t).body)
            };
            if (e.openStrip.close) {
                m(t.body, null, true);
            }
            if (r) {
                var o = e.inverseStrip;
                if (o.open) {
                    g(t.body, null, true);
                }
                if (o.close) {
                    m(n.body, null, true);
                }
                if (e.closeStrip.open) {
                    g(s.body, null, true);
                }
                if (!this.options.ignoreStandalone && p(t.body) && d(n.body)) {
                    g(t.body);
                    m(n.body);
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
        function p(e, t, r) {
            if (t === undefined) {
                t = e.length;
            }
            var n = e[t - 1], s = e[t - 2];
            if (!n) {
                return r;
            }
            if (n.type === "ContentStatement") {
                return (s || !r ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(n.original);
            }
        }
        function d(e, t, r) {
            if (t === undefined) {
                t = -1;
            }
            var n = e[t + 1], s = e[t + 2];
            if (!n) {
                return r;
            }
            if (n.type === "ContentStatement") {
                return (s || !r ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(n.original);
            }
        }
        function m(e, t, r) {
            var n = e[t == null ? 0 : t + 1];
            if (!n || n.type !== "ContentStatement" || !r && n.rightStripped) {
                return;
            }
            var s = n.value;
            n.value = n.value.replace(r ? /^\s+/ : /^[ \t]*\r?\n?/, "");
            n.rightStripped = n.value !== s;
        }
        function g(e, t, r) {
            var n = e[t == null ? e.length - 1 : t - 1];
            if (!n || n.type !== "ContentStatement" || !r && n.leftStripped) {
                return;
            }
            var s = n.value;
            n.value = n.value.replace(r ? /\s+$/ : /[ \t]+$/, "");
            n.leftStripped = n.value !== s;
            return n.leftStripped;
        }
        t["default"] = o;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var s = r(6);
        var i = n(s);
        function o() {
            this.parents = [];
        }
        o.prototype = {
            constructor: o,
            mutating: false,
            acceptKey: function e(t, r) {
                var n = this.accept(t[r]);
                if (this.mutating) {
                    if (n && !o.prototype[n.type]) {
                        throw new i["default"]('Unexpected node type "' + n.type + '" found when accepting ' + r + " on " + t.type);
                    }
                    t[r] = n;
                }
            },
            acceptRequired: function e(t, r) {
                this.acceptKey(t, r);
                if (!t[r]) {
                    throw new i["default"](t.type + " requires " + r);
                }
            },
            acceptArray: function e(t) {
                for (var r = 0, n = t.length; r < n; r++) {
                    this.acceptKey(t, r);
                    if (!t[r]) {
                        t.splice(r, 1);
                        r--;
                        n--;
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
                var r = this[t.type](t);
                this.current = this.parents.shift();
                if (!this.mutating || r) {
                    return r;
                } else if (r !== false) {
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
            PartialStatement: u,
            PartialBlockStatement: function e(t) {
                u.call(this, t);
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
        function u(e) {
            this.acceptRequired(e, "name");
            this.acceptArray(e.params);
            this.acceptKey(e, "hash");
        }
        t["default"] = o;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
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
        var s = r(6);
        var c = n(s);
        function u(e, t) {
            t = t.path ? t.path.original : t;
            if (e.path.original !== t) {
                var r = {
                    loc: e.path.loc
                };
                throw new c["default"](e.path.original + " doesn't match " + t, r);
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
        function f(e, t, r) {
            r = this.locInfo(r);
            var n = e ? "@" : "", s = [], i = 0;
            for (var o = 0, a = t.length; o < a; o++) {
                var l = t[o].part, u = t[o].original !== l;
                n += (t[o].separator || "") + l;
                if (!u && (l === ".." || l === "." || l === "this")) {
                    if (s.length > 0) {
                        throw new c["default"]("Invalid path: " + n, {
                            loc: r
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
                original: n,
                loc: r
            };
        }
        function h(e, t, r, n, s, i) {
            var o = n.charAt(3) || n.charAt(2), a = o !== "{" && o !== "&";
            var l = /\*/.test(n);
            return {
                type: l ? "Decorator" : "MustacheStatement",
                path: e,
                params: t,
                hash: r,
                escaped: a,
                strip: s,
                loc: this.locInfo(i)
            };
        }
        function p(e, t, r, n) {
            u(e, r);
            n = this.locInfo(n);
            var s = {
                type: "Program",
                body: t,
                strip: {},
                loc: n
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
                loc: n
            };
        }
        function d(e, t, r, n, s, i) {
            if (n && n.path) {
                u(e, n);
            }
            var o = /\*/.test(e.open);
            t.blockParams = e.blockParams;
            var a = undefined, l = undefined;
            if (r) {
                if (o) {
                    throw new c["default"]("Unexpected inverse block on decorator", r);
                }
                if (r.chain) {
                    r.program.body[0].closeStrip = n.strip;
                }
                l = r.strip;
                a = r.program;
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
                closeStrip: n && n.strip,
                loc: this.locInfo(i)
            };
        }
        function m(e, t) {
            if (!t && e.length) {
                var r = e[0].loc, n = e[e.length - 1].loc;
                if (r && n) {
                    t = {
                        source: r.source,
                        start: {
                            line: r.start.line,
                            column: r.start.column
                        },
                        end: {
                            line: n.end.line,
                            column: n.end.column
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
        function g(e, t, r, n) {
            u(e, r);
            return {
                type: "PartialBlockStatement",
                name: e.path,
                params: e.params,
                hash: e.hash,
                program: t,
                openStrip: e.strip,
                closeStrip: r && r.strip,
                loc: this.locInfo(n)
            };
        }
    }, function(e, t, r) {
        "use strict";
        var n = r(74)["default"];
        var s = r(1)["default"];
        t.__esModule = true;
        t.Compiler = f;
        t.precompile = h;
        t.compile = p;
        var i = r(6);
        var l = s(i);
        var u = r(5);
        var o = r(84);
        var c = s(o);
        var a = [].slice;
        function f() {}
        f.prototype = {
            compiler: f,
            equals: function e(t) {
                var r = this.opcodes.length;
                if (t.opcodes.length !== r) {
                    return false;
                }
                for (var n = 0; n < r; n++) {
                    var s = this.opcodes[n], i = t.opcodes[n];
                    if (s.opcode !== i.opcode || !d(s.args, i.args)) {
                        return false;
                    }
                }
                r = this.children.length;
                for (var n = 0; n < r; n++) {
                    if (!this.children[n].equals(t.children[n])) {
                        return false;
                    }
                }
                return true;
            },
            guid: 0,
            compile: function e(t, r) {
                this.sourceNode = [];
                this.opcodes = [];
                this.children = [];
                this.options = r;
                this.stringParams = r.stringParams;
                this.trackIds = r.trackIds;
                r.blockParams = r.blockParams || [];
                r.knownHelpers = u.extend(n(null), {
                    helperMissing: true,
                    blockHelperMissing: true,
                    each: true,
                    if: true,
                    unless: true,
                    with: true,
                    log: true,
                    lookup: true
                }, r.knownHelpers);
                return this.accept(t);
            },
            compileProgram: function e(t) {
                var r = new this.compiler(), n = r.compile(t, this.options), s = this.guid++;
                this.usePartial = this.usePartial || n.usePartial;
                this.children[s] = n;
                this.useDepths = this.useDepths || n.useDepths;
                return s;
            },
            accept: function e(t) {
                if (!this[t.type]) {
                    throw new l["default"]("Unknown type: " + t.type, t);
                }
                this.sourceNode.unshift(t);
                var r = this[t.type](t);
                this.sourceNode.shift();
                return r;
            },
            Program: function e(t) {
                this.options.blockParams.unshift(t.blockParams);
                var r = t.body, n = r.length;
                for (var s = 0; s < n; s++) {
                    this.accept(r[s]);
                }
                this.options.blockParams.shift();
                this.isSimple = n === 1;
                this.blockParams = t.blockParams ? t.blockParams.length : 0;
                return this;
            },
            BlockStatement: function e(t) {
                m(t);
                var r = t.program, n = t.inverse;
                r = r && this.compileProgram(r);
                n = n && this.compileProgram(n);
                var s = this.classifySexpr(t);
                if (s === "helper") {
                    this.helperSexpr(t, r, n);
                } else if (s === "simple") {
                    this.simpleSexpr(t);
                    this.opcode("pushProgram", r);
                    this.opcode("pushProgram", n);
                    this.opcode("emptyHash");
                    this.opcode("blockValue", t.path.original);
                } else {
                    this.ambiguousSexpr(t, r, n);
                    this.opcode("pushProgram", r);
                    this.opcode("pushProgram", n);
                    this.opcode("emptyHash");
                    this.opcode("ambiguousBlockValue");
                }
                this.opcode("append");
            },
            DecoratorBlock: function e(t) {
                var r = t.program && this.compileProgram(t.program);
                var n = this.setupFullMustacheParams(t, r, undefined), s = t.path;
                this.useDecorators = true;
                this.opcode("registerDecorator", n.length, s.original);
            },
            PartialStatement: function e(t) {
                this.usePartial = true;
                var r = t.program;
                if (r) {
                    r = this.compileProgram(t.program);
                }
                var n = t.params;
                if (n.length > 1) {
                    throw new l["default"]("Unsupported number of partial arguments: " + n.length, t);
                } else if (!n.length) {
                    if (this.options.explicitPartialContext) {
                        this.opcode("pushLiteral", "undefined");
                    } else {
                        n.push({
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
                this.setupFullMustacheParams(t, r, undefined, true);
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
                var r = this.classifySexpr(t);
                if (r === "simple") {
                    this.simpleSexpr(t);
                } else if (r === "helper") {
                    this.helperSexpr(t);
                } else {
                    this.ambiguousSexpr(t);
                }
            },
            ambiguousSexpr: function e(t, r, n) {
                var s = t.path, i = s.parts[0], o = r != null || n != null;
                this.opcode("getContext", s.depth);
                this.opcode("pushProgram", r);
                this.opcode("pushProgram", n);
                s.strict = true;
                this.accept(s);
                this.opcode("invokeAmbiguous", i, o);
            },
            simpleSexpr: function e(t) {
                var r = t.path;
                r.strict = true;
                this.accept(r);
                this.opcode("resolvePossibleLambda");
            },
            helperSexpr: function e(t, r, n) {
                var s = this.setupFullMustacheParams(t, r, n), i = t.path, o = i.parts[0];
                if (this.options.knownHelpers[o]) {
                    this.opcode("invokeKnownHelper", s.length, o);
                } else if (this.options.knownHelpersOnly) {
                    throw new l["default"]("You specified knownHelpersOnly, but used the unknown helper " + o, t);
                } else {
                    i.strict = true;
                    i.falsy = true;
                    this.accept(i);
                    this.opcode("invokeHelper", s.length, i.original, c["default"].helpers.simpleId(i));
                }
            },
            PathExpression: function e(t) {
                this.addDepth(t.depth);
                this.opcode("getContext", t.depth);
                var r = t.parts[0], n = c["default"].helpers.scopedId(t), s = !t.depth && !n && this.blockParamIndex(r);
                if (s) {
                    this.opcode("lookupBlockParam", s, t.parts);
                } else if (!r) {
                    this.opcode("pushContext");
                } else if (t.data) {
                    this.options.data = true;
                    this.opcode("lookupData", t.depth, t.parts, t.strict);
                } else {
                    this.opcode("lookupOnContext", t.parts, t.falsy, t.strict, n);
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
                var r = t.pairs, n = 0, s = r.length;
                this.opcode("pushHash");
                for (;n < s; n++) {
                    this.pushParam(r[n].value);
                }
                while (n--) {
                    this.opcode("assignToHash", r[n].key);
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
                var r = c["default"].helpers.simpleId(t.path);
                var n = r && !!this.blockParamIndex(t.path.parts[0]);
                var s = !n && c["default"].helpers.helperExpression(t);
                var i = !n && (s || r);
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
                for (var r = 0, n = t.length; r < n; r++) {
                    this.pushParam(t[r]);
                }
            },
            pushParam: function e(t) {
                var r = t.value != null ? t.value : t.original || "";
                if (this.stringParams) {
                    if (r.replace) {
                        r = r.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".");
                    }
                    if (t.depth) {
                        this.addDepth(t.depth);
                    }
                    this.opcode("getContext", t.depth || 0);
                    this.opcode("pushStringParam", r, t.type);
                    if (t.type === "SubExpression") {
                        this.accept(t);
                    }
                } else {
                    if (this.trackIds) {
                        var n = undefined;
                        if (t.parts && !c["default"].helpers.scopedId(t) && !t.depth) {
                            n = this.blockParamIndex(t.parts[0]);
                        }
                        if (n) {
                            var s = t.parts.slice(1).join(".");
                            this.opcode("pushId", "BlockParam", n, s);
                        } else {
                            r = t.original || r;
                            if (r.replace) {
                                r = r.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "");
                            }
                            this.opcode("pushId", t.type, r);
                        }
                    }
                    this.accept(t);
                }
            },
            setupFullMustacheParams: function e(t, r, n, s) {
                var i = t.params;
                this.pushParams(i);
                this.opcode("pushProgram", r);
                this.opcode("pushProgram", n);
                if (t.hash) {
                    this.accept(t.hash);
                } else {
                    this.opcode("emptyHash", s);
                }
                return i;
            },
            blockParamIndex: function e(t) {
                for (var r = 0, n = this.options.blockParams.length; r < n; r++) {
                    var s = this.options.blockParams[r], i = s && u.indexOf(s, t);
                    if (s && i >= 0) {
                        return [ r, i ];
                    }
                }
            }
        };
        function h(e, t, r) {
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
            var n = r.parse(e, t), s = new r.Compiler().compile(n, t);
            return new r.JavaScriptCompiler().compile(s, t);
        }
        function p(n, s, i) {
            if (s === undefined) s = {};
            if (n == null || typeof n !== "string" && n.type !== "Program") {
                throw new l["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + n);
            }
            s = u.extend({}, s);
            if (!("data" in s)) {
                s.data = true;
            }
            if (s.compat) {
                s.useDepths = true;
            }
            var o = undefined;
            function a() {
                var e = i.parse(n, s), t = new i.Compiler().compile(e, s), r = new i.JavaScriptCompiler().compile(t, s, undefined, true);
                return i.template(r);
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
            e._child = function(e, t, r, n) {
                if (!o) {
                    o = a();
                }
                return o._child(e, t, r, n);
            };
            return e;
        }
        function d(e, t) {
            if (e === t) {
                return true;
            }
            if (u.isArray(e) && u.isArray(t) && e.length === t.length) {
                for (var r = 0; r < e.length; r++) {
                    if (!d(e[r], t[r])) {
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
    }, function(e, t, r) {
        "use strict";
        var l = r(60)["default"];
        var n = r(1)["default"];
        t.__esModule = true;
        var s = r(4);
        var i = r(6);
        var m = n(i);
        var o = r(5);
        var a = r(92);
        var u = n(a);
        function c(e) {
            this.value = e;
        }
        function f() {}
        f.prototype = {
            nameLookup: function e(t, r) {
                return this.internalNameLookup(t, r);
            },
            depthedLookup: function e(t) {
                return [ this.aliasable("container.lookup"), "(depths, ", JSON.stringify(t), ")" ];
            },
            compilerInfo: function e() {
                var t = s.COMPILER_REVISION, r = s.REVISION_CHANGES[t];
                return [ t, r ];
            },
            appendToBuffer: function e(t, r, n) {
                if (!o.isArray(t)) {
                    t = [ t ];
                }
                t = this.source.wrap(t, r);
                if (this.environment.isSimple) {
                    return [ "return ", t, ";" ];
                } else if (n) {
                    return [ "buffer += ", t, ";" ];
                } else {
                    t.appendToBuffer = true;
                    return t;
                }
            },
            initializeBuffer: function e() {
                return this.quotedString("");
            },
            internalNameLookup: function e(t, r) {
                this.lookupPropertyFunctionIsUsed = true;
                return [ "lookupProperty(", t, ",", JSON.stringify(r), ")" ];
            },
            lookupPropertyFunctionIsUsed: false,
            compile: function e(t, r, n, s) {
                this.environment = t;
                this.options = r;
                this.stringParams = this.options.stringParams;
                this.trackIds = this.options.trackIds;
                this.precompile = !s;
                this.name = this.environment.name;
                this.isChild = !!n;
                this.context = n || {
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
                this.compileChildren(t, r);
                this.useDepths = this.useDepths || t.useDepths || t.useDecorators || this.options.compat;
                this.useBlockParams = this.useBlockParams || t.useBlockParams;
                var i = t.opcodes, o = undefined, a = undefined, l = undefined, u = undefined;
                for (l = 0, u = i.length; l < u; l++) {
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
                var c = this.createFunctionContext(s);
                if (!this.isChild) {
                    var f = {
                        compiler: this.compilerInfo(),
                        main: c
                    };
                    if (this.decorators) {
                        f.main_d = this.decorators;
                        f.useDecorators = true;
                    }
                    var h = this.context;
                    var p = h.programs;
                    var d = h.decorators;
                    for (l = 0, u = p.length; l < u; l++) {
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
                        if (r.srcName) {
                            f = f.toStringWithSourceMap({
                                file: r.destName
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
                    return c;
                }
            },
            preamble: function e() {
                this.lastContext = 0;
                this.source = new u["default"](this.options.srcName);
                this.decorators = new u["default"](this.options.srcName);
            },
            createFunctionContext: function e(t) {
                var r = this;
                var n = "";
                var s = this.stackVars.concat(this.registers.list);
                if (s.length > 0) {
                    n += ", " + s.join(", ");
                }
                var i = 0;
                l(this.aliases).forEach(function(e) {
                    var t = r.aliases[e];
                    if (t.children && t.referenceCount > 1) {
                        n += ", alias" + ++i + "=" + e;
                        t.children[0] = "alias" + i;
                    }
                });
                if (this.lookupPropertyFunctionIsUsed) {
                    n += ", " + this.lookupPropertyFunctionVarDeclaration();
                }
                var o = [ "container", "depth0", "helpers", "partials", "data" ];
                if (this.useBlockParams || this.useDepths) {
                    o.push("blockParams");
                }
                if (this.useDepths) {
                    o.push("depths");
                }
                var a = this.mergeSource(n);
                if (t) {
                    o.push(a);
                    return Function.apply(this, o);
                } else {
                    return this.source.wrap([ "function(", o.join(","), ") {\n  ", a, "}" ]);
                }
            },
            mergeSource: function e(t) {
                var r = this.environment.isSimple, n = !this.forceBuffer, s = undefined, i = undefined, o = undefined, a = undefined;
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
                        if (!r) {
                            n = false;
                        }
                    }
                });
                if (n) {
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
                var r = this.aliasable("container.hooks.blockHelperMissing"), n = [ this.contextName(0) ];
                this.setupHelperArgs(t, 0, n);
                var s = this.popStack();
                n.splice(1, 0, s);
                this.push(this.source.functionCall(r, "call", n));
            },
            ambiguousBlockValue: function e() {
                var t = this.aliasable("container.hooks.blockHelperMissing"), r = [ this.contextName(0) ];
                this.setupHelperArgs("", 0, r, true);
                this.flushInline();
                var n = this.topStack();
                r.splice(1, 0, n);
                this.pushSource([ "if (!", this.lastHelper, ") { ", n, " = ", this.source.functionCall(t, "call", r), "}" ]);
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
            lookupOnContext: function e(t, r, n, s) {
                var i = 0;
                if (!s && this.options.compat && !this.lastContext) {
                    this.push(this.depthedLookup(t[i++]));
                } else {
                    this.pushContext();
                }
                this.resolvePath("context", t, i, r, n);
            },
            lookupBlockParam: function e(t, r) {
                this.useBlockParams = true;
                this.push([ "blockParams[", t[0], "][", t[1], "]" ]);
                this.resolvePath("context", r, 1);
            },
            lookupData: function e(t, r, n) {
                if (!t) {
                    this.pushStackLiteral("data");
                } else {
                    this.pushStackLiteral("container.data(data, " + t + ")");
                }
                this.resolvePath("data", r, 0, true, n);
            },
            resolvePath: function e(r, n, s, i, t) {
                var o = this;
                if (this.options.strict || this.options.assumeObjects) {
                    this.push(h(this.options.strict && t, this, n, s, r));
                    return;
                }
                var a = n.length;
                for (;s < a; s++) {
                    this.replaceStack(function(e) {
                        var t = o.nameLookup(e, n[s], r);
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
            pushStringParam: function e(t, r) {
                this.pushContext();
                this.pushString(r);
                if (r !== "SubExpression") {
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
            registerDecorator: function e(t, r) {
                var n = this.nameLookup("decorators", r, "decorator"), s = this.setupHelperArgs(r, t);
                this.decorators.push([ "fn = ", this.decorators.functionCall(n, "", [ "fn", "props", "container", s ]), " || fn;" ]);
            },
            invokeHelper: function e(t, r, n) {
                var s = this.popStack(), i = this.setupHelper(t, r);
                var o = [];
                if (n) {
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
            itemsSeparatedBy: function e(t, r) {
                var n = [];
                n.push(t[0]);
                for (var s = 1; s < t.length; s++) {
                    n.push(r, t[s]);
                }
                return n;
            },
            invokeKnownHelper: function e(t, r) {
                var n = this.setupHelper(t, r);
                this.push(this.source.functionCall(n.name, "call", n.callParams));
            },
            invokeAmbiguous: function e(t, r) {
                this.useRegister("helper");
                var n = this.popStack();
                this.emptyHash();
                var s = this.setupHelper(0, t, r);
                var i = this.lastHelper = this.nameLookup("helpers", t, "helper");
                var o = [ "(", "(helper = ", i, " || ", n, ")" ];
                if (!this.options.strict) {
                    o[0] = "(helper = ";
                    o.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"));
                }
                this.push([ "(", o, s.paramsInit ? [ "),(", s.paramsInit ] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", s.callParams), " : helper))" ]);
            },
            invokePartial: function e(t, r, n) {
                var s = [], i = this.setupParams(r, 1, s);
                if (t) {
                    r = this.popStack();
                    delete i.name;
                }
                if (n) {
                    i.indent = JSON.stringify(n);
                }
                i.helpers = "helpers";
                i.partials = "partials";
                i.decorators = "container.decorators";
                if (!t) {
                    s.unshift(this.nameLookup("partials", r, "partial"));
                } else {
                    s.unshift(r);
                }
                if (this.options.compat) {
                    i.depths = "depths";
                }
                i = this.objectLiteral(i);
                s.push(i);
                this.push(this.source.functionCall("container.invokePartial", "", s));
            },
            assignToHash: function e(t) {
                var r = this.popStack(), n = undefined, s = undefined, i = undefined;
                if (this.trackIds) {
                    i = this.popStack();
                }
                if (this.stringParams) {
                    s = this.popStack();
                    n = this.popStack();
                }
                var o = this.hash;
                if (n) {
                    o.contexts[t] = n;
                }
                if (s) {
                    o.types[t] = s;
                }
                if (i) {
                    o.ids[t] = i;
                }
                o.values[t] = r;
            },
            pushId: function e(t, r, n) {
                if (t === "BlockParam") {
                    this.pushStackLiteral("blockParams[" + r[0] + "].path[" + r[1] + "]" + (n ? " + " + JSON.stringify("." + n) : ""));
                } else if (t === "PathExpression") {
                    this.pushString(r);
                } else if (t === "SubExpression") {
                    this.pushStackLiteral("true");
                } else {
                    this.pushStackLiteral("null");
                }
            },
            compiler: f,
            compileChildren: function e(t, r) {
                var n = t.children, s = undefined, i = undefined;
                for (var o = 0, a = n.length; o < a; o++) {
                    s = n[o];
                    i = new this.compiler();
                    var l = this.matchExistingProgram(s);
                    if (l == null) {
                        this.context.programs.push("");
                        var u = this.context.programs.length;
                        s.index = u;
                        s.name = "program" + u;
                        this.context.programs[u] = i.compile(s, r, this.context, !this.precompile);
                        this.context.decorators[u] = i.decorators;
                        this.context.environments[u] = s;
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
                for (var r = 0, n = this.context.environments.length; r < n; r++) {
                    var s = this.context.environments[r];
                    if (s && s.equals(t)) {
                        return s;
                    }
                }
            },
            programExpression: function e(t) {
                var r = this.environment.children[t], n = [ r.index, "data", r.blockParams ];
                if (this.useBlockParams || this.useDepths) {
                    n.push("blockParams");
                }
                if (this.useDepths) {
                    n.push("depths");
                }
                return "container.program(" + n.join(", ") + ")";
            },
            useRegister: function e(t) {
                if (!this.registers[t]) {
                    this.registers[t] = true;
                    this.registers.list.push(t);
                }
            },
            push: function e(t) {
                if (!(t instanceof c)) {
                    t = this.source.wrap(t);
                }
                this.inlineStack.push(t);
                return t;
            },
            pushStackLiteral: function e(t) {
                this.push(new c(t));
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
                var r = [ "(" ], n = undefined, s = undefined, i = undefined;
                if (!this.isInline()) {
                    throw new m["default"]("replaceStack on non-inline");
                }
                var o = this.popStack(true);
                if (o instanceof c) {
                    n = [ o.value ];
                    r = [ "(", n ];
                    i = true;
                } else {
                    s = true;
                    var a = this.incrStack();
                    r = [ "((", this.push(a), " = ", o, ")" ];
                    n = this.topStack();
                }
                var l = t.call(this, n);
                if (!i) {
                    this.popStack();
                }
                if (s) {
                    this.stackSlot--;
                }
                this.push(r.concat(l, ")"));
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
                for (var r = 0, n = t.length; r < n; r++) {
                    var s = t[r];
                    if (s instanceof c) {
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
                var r = this.isInline(), n = (r ? this.inlineStack : this.compileStack).pop();
                if (!t && n instanceof c) {
                    return n.value;
                } else {
                    if (!r) {
                        if (!this.stackSlot) {
                            throw new m["default"]("Invalid stack pop");
                        }
                        this.stackSlot--;
                    }
                    return n;
                }
            },
            topStack: function e() {
                var t = this.isInline() ? this.inlineStack : this.compileStack, r = t[t.length - 1];
                if (r instanceof c) {
                    return r.value;
                } else {
                    return r;
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
                var r = this.aliases[t];
                if (r) {
                    r.referenceCount++;
                    return r;
                }
                r = this.aliases[t] = this.source.wrap(t);
                r.aliasable = true;
                r.referenceCount = 1;
                return r;
            },
            setupHelper: function e(t, r, n) {
                var s = [], i = this.setupHelperArgs(r, t, s, n);
                var o = this.nameLookup("helpers", r, "helper"), a = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
                return {
                    params: s,
                    paramsInit: i,
                    name: o,
                    callParams: [ a ].concat(s)
                };
            },
            setupParams: function e(t, r, n) {
                var s = {}, i = [], o = [], a = [], l = !n, u = undefined;
                if (l) {
                    n = [];
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
                var c = this.popStack(), f = this.popStack();
                if (f || c) {
                    s.fn = f || "container.noop";
                    s.inverse = c || "container.noop";
                }
                var h = r;
                while (h--) {
                    u = this.popStack();
                    n[h] = u;
                    if (this.trackIds) {
                        a[h] = this.popStack();
                    }
                    if (this.stringParams) {
                        o[h] = this.popStack();
                        i[h] = this.popStack();
                    }
                }
                if (l) {
                    s.args = this.source.generateArray(n);
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
            setupHelperArgs: function e(t, r, n, s) {
                var i = this.setupParams(t, r, n);
                i.loc = JSON.stringify(this.source.currentLocation);
                i = this.objectLiteral(i);
                if (s) {
                    this.useRegister("options");
                    n.push("options");
                    return [ "options=", i ];
                } else if (n) {
                    n.push(i);
                    return "";
                } else {
                    return i;
                }
            }
        };
        (function() {
            var e = ("break else new var" + " case finally return void" + " catch for switch while" + " continue function this with" + " default if throw" + " delete in try" + " do instanceof typeof" + " abstract enum int short" + " boolean export interface static" + " byte extends long super" + " char final native synchronized" + " class float package throws" + " const goto private transient" + " debugger implements protected volatile" + " double import public let yield await" + " null true false").split(" ");
            var t = f.RESERVED_WORDS = {};
            for (var r = 0, n = e.length; r < n; r++) {
                t[e[r]] = true;
            }
        })();
        f.isValidJavaScriptVariableName = function(e) {
            return !f.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(e);
        };
        function h(e, t, r, n, s) {
            var i = t.popStack(), o = r.length;
            if (e) {
                o--;
            }
            for (;n < o; n++) {
                i = t.nameLookup(i, r[n], s);
            }
            if (e) {
                return [ t.aliasable("container.strict"), "(", i, ", ", t.quotedString(r[n]), ", ", JSON.stringify(t.source.currentLocation), " )" ];
            } else {
                return i;
            }
        }
        t["default"] = f;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var i = r(60)["default"];
        t.__esModule = true;
        var o = r(5);
        var n = undefined;
        try {
            if (false) {
                var s = require("source-map");
                n = s.SourceNode;
            }
        } catch (e) {}
        if (!n) {
            n = function(e, t, r, n) {
                this.src = "";
                if (n) {
                    this.add(n);
                }
            };
            n.prototype = {
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
        function a(e, t, r) {
            if (o.isArray(e)) {
                var n = [];
                for (var s = 0, i = e.length; s < i; s++) {
                    n.push(t.wrap(e[s], r));
                }
                return n;
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
            prepend: function e(t, r) {
                this.source.unshift(this.wrap(t, r));
            },
            push: function e(t, r) {
                this.source.push(this.wrap(t, r));
            },
            merge: function e() {
                var t = this.empty();
                this.each(function(e) {
                    t.add([ "  ", e, "\n" ]);
                });
                return t;
            },
            each: function e(t) {
                for (var r = 0, n = this.source.length; r < n; r++) {
                    t(this.source[r]);
                }
            },
            empty: function e() {
                var t = this.currentLocation || {
                    start: {}
                };
                return new n(t.start.line, t.start.column, this.srcFile);
            },
            wrap: function e(t) {
                var r = arguments.length <= 1 || arguments[1] === undefined ? this.currentLocation || {
                    start: {}
                } : arguments[1];
                if (t instanceof n) {
                    return t;
                }
                t = a(t, this, r);
                return new n(r.start.line, r.start.column, this.srcFile, t);
            },
            functionCall: function e(t, r, n) {
                n = this.generateList(n);
                return this.wrap([ t, r ? "." + r + "(" : "(", n, ")" ]);
            },
            quotedString: function e(t) {
                return '"' + (t + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
            },
            objectLiteral: function e(r) {
                var n = this;
                var s = [];
                i(r).forEach(function(e) {
                    var t = a(r[e], n);
                    if (t !== "undefined") {
                        s.push([ n.quotedString(e), ":", t ]);
                    }
                });
                var t = this.generateList(s);
                t.prepend("{");
                t.add("}");
                return t;
            },
            generateList: function e(t) {
                var r = this.empty();
                for (var n = 0, s = t.length; n < s; n++) {
                    if (n) {
                        r.add(",");
                    }
                    r.add(a(t[n], this));
                }
                return r;
            },
            generateArray: function e(t) {
                var r = this.generateList(t);
                r.prepend("[");
                r.add("]");
                return r;
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
            const r = getInputValues(e, t || "post");
            return r.values;
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
    function getAttributeValueWithDisinheritance(e, t, r) {
        const n = getAttributeValue(t, r);
        const s = getAttributeValue(t, "hx-disinherit");
        var i = getAttributeValue(t, "hx-inherit");
        if (e !== t) {
            if (htmx.config.disableInheritance) {
                if (i && (i === "*" || i.split(" ").indexOf(r) >= 0)) {
                    return n;
                } else {
                    return null;
                }
            }
            if (s && (s === "*" || s.split(" ").indexOf(r) >= 0)) {
                return "unset";
            }
        }
        return n;
    }
    function getClosestAttributeValue(t, r) {
        let n = null;
        getClosestMatch(t, function(e) {
            return !!(n = getAttributeValueWithDisinheritance(t, asElement(e), r));
        });
        if (n !== "unset") {
            return n;
        }
    }
    function matches(e, t) {
        const r = e instanceof Element && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector);
        return !!r && r.call(e, t);
    }
    function getStartTag(e) {
        const t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        const r = t.exec(e);
        if (r) {
            return r[1].toLowerCase();
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
                const r = e.parentNode;
                try {
                    r.insertBefore(t, e);
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
        const r = getStartTag(t);
        let n;
        if (r === "html") {
            n = new DocumentFragment();
            const i = parseHTML(e);
            takeChildrenFor(n, i.body);
            n.title = i.title;
        } else if (r === "body") {
            n = new DocumentFragment();
            const i = parseHTML(t);
            takeChildrenFor(n, i.body);
            n.title = i.title;
        } else {
            const i = parseHTML('<body><template class="internal-htmx-wrapper">' + t + "</template></body>");
            n = i.querySelector("template").content;
            n.title = i.title;
            var s = n.querySelector("title");
            if (s && s.parentNode === n) {
                s.remove();
                n.title = s.innerText;
            }
        }
        if (n) {
            if (htmx.config.allowScriptTags) {
                normalizeScriptTags(n);
            } else {
                n.querySelectorAll("script").forEach(e => e.remove());
            }
        }
        return n;
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
        let r = e[t];
        if (!r) {
            r = e[t] = {};
        }
        return r;
    }
    function toArray(t) {
        const r = [];
        if (t) {
            for (let e = 0; e < t.length; e++) {
                r.push(t[e]);
            }
        }
        return r;
    }
    function forEach(t, r) {
        if (t) {
            for (let e = 0; e < t.length; e++) {
                r(t[e]);
            }
        }
    }
    function isScrolledIntoView(e) {
        const t = e.getBoundingClientRect();
        const r = t.top;
        const n = t.bottom;
        return r < window.innerHeight && n >= 0;
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
        for (const r in t) {
            if (t.hasOwnProperty(r)) {
                e[r] = t[r];
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
        htmx.logger = function(e, t, r) {
            if (console) {
                console.log(t, e, r);
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
    function addClassToElement(e, t, r) {
        e = asElement(resolveTarget(e));
        if (!e) {
            return;
        }
        if (r) {
            getWindow().setTimeout(function() {
                addClassToElement(e, t);
                e = null;
            }, r);
        } else {
            e.classList && e.classList.add(t);
        }
    }
    function removeClassFromElement(e, t, r) {
        let n = asElement(resolveTarget(e));
        if (!n) {
            return;
        }
        if (r) {
            getWindow().setTimeout(function() {
                removeClassFromElement(n, t);
                n = null;
            }, r);
        } else {
            if (n.classList) {
                n.classList.remove(t);
                if (n.classList.length === 0) {
                    n.removeAttribute("class");
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
    function querySelectorAllExt(t, n, r) {
        if (n.indexOf("global ") === 0) {
            return querySelectorAllExt(t, n.slice(7), true);
        }
        t = resolveTarget(t);
        const s = [];
        {
            let t = 0;
            let r = 0;
            for (let e = 0; e < n.length; e++) {
                const a = n[e];
                if (a === "," && t === 0) {
                    s.push(n.substring(r, e));
                    r = e + 1;
                    continue;
                }
                if (a === "<") {
                    t++;
                } else if (a === "/" && e < n.length - 1 && n[e + 1] === ">") {
                    t--;
                }
            }
            if (r < n.length) {
                s.push(n.substring(r));
            }
        }
        const i = [];
        const o = [];
        while (s.length > 0) {
            const n = normalizeSelector(s.shift());
            let e;
            if (n.indexOf("closest ") === 0) {
                e = closest(asElement(t), normalizeSelector(n.substr(8)));
            } else if (n.indexOf("find ") === 0) {
                e = find(asParentNode(t), normalizeSelector(n.substr(5)));
            } else if (n === "next" || n === "nextElementSibling") {
                e = asElement(t).nextElementSibling;
            } else if (n.indexOf("next ") === 0) {
                e = scanForwardQuery(t, normalizeSelector(n.substr(5)), !!r);
            } else if (n === "previous" || n === "previousElementSibling") {
                e = asElement(t).previousElementSibling;
            } else if (n.indexOf("previous ") === 0) {
                e = scanBackwardsQuery(t, normalizeSelector(n.substr(9)), !!r);
            } else if (n === "document") {
                e = document;
            } else if (n === "window") {
                e = window;
            } else if (n === "body") {
                e = document.body;
            } else if (n === "root") {
                e = getRootNode(t, !!r);
            } else if (n === "host") {
                e = t.getRootNode().host;
            } else {
                o.push(n);
            }
            if (e) {
                i.push(e);
            }
        }
        if (o.length > 0) {
            const e = o.join(",");
            const l = asParentNode(getRootNode(t, !!r));
            i.push(...toArray(l.querySelectorAll(e)));
        }
        return i;
    }
    var scanForwardQuery = function(t, e, r) {
        const n = asParentNode(getRootNode(t, r)).querySelectorAll(e);
        for (let e = 0; e < n.length; e++) {
            const s = n[e];
            if (s.compareDocumentPosition(t) === Node.DOCUMENT_POSITION_PRECEDING) {
                return s;
            }
        }
    };
    var scanBackwardsQuery = function(t, e, r) {
        const n = asParentNode(getRootNode(t, r)).querySelectorAll(e);
        for (let e = n.length - 1; e >= 0; e--) {
            const s = n[e];
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
    function processEventArgs(e, t, r, n) {
        if (isFunction(t)) {
            return {
                target: getDocument().body,
                event: asString(e),
                listener: t,
                options: r
            };
        } else {
            return {
                target: resolveTarget(e),
                event: asString(t),
                listener: r,
                options: n
            };
        }
    }
    function addEventListenerImpl(t, r, n, s) {
        ready(function() {
            const e = processEventArgs(t, r, n, s);
            e.target.addEventListener(e.event, e.listener, e.options);
        });
        const e = isFunction(r);
        return e ? r : n;
    }
    function removeEventListenerImpl(t, r, n) {
        ready(function() {
            const e = processEventArgs(t, r, n);
            e.target.removeEventListener(e.event, e.listener);
        });
        return isFunction(r) ? r : n;
    }
    const DUMMY_ELT = getDocument().createElement("output");
    function findAttributeTargets(e, t) {
        const r = getClosestAttributeValue(e, t);
        if (r) {
            if (r === "this") {
                return [ findThisElement(e, t) ];
            } else {
                const n = querySelectorAllExt(e, r);
                if (n.length === 0) {
                    logError('The selector "' + r + '" on ' + t + " returned no matches!");
                    return [ DUMMY_ELT ];
                } else {
                    return n;
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
            const r = getInternalData(e);
            if (r.boosted) {
                return getDocument().body;
            } else {
                return e;
            }
        }
    }
    function shouldSettleAttribute(t) {
        const r = htmx.config.attributesToSettle;
        for (let e = 0; e < r.length; e++) {
            if (t === r[e]) {
                return true;
            }
        }
        return false;
    }
    function cloneAttributes(t, r) {
        forEach(t.attributes, function(e) {
            if (!r.hasAttribute(e.name) && shouldSettleAttribute(e.name)) {
                t.removeAttribute(e.name);
            }
        });
        forEach(r.attributes, function(e) {
            if (shouldSettleAttribute(e.name)) {
                t.setAttribute(e.name, e.value);
            }
        });
    }
    function isInlineSwap(t, e) {
        const r = getExtensions(e);
        for (let e = 0; e < r.length; e++) {
            const n = r[e];
            try {
                if (n.isInlineSwap(t)) {
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
        let r = "#" + getRawAttribute(s, "id");
        let o = "outerHTML";
        if (e === "true") {} else if (e.indexOf(":") > 0) {
            o = e.substring(0, e.indexOf(":"));
            r = e.substring(e.indexOf(":") + 1);
        } else {
            o = e;
        }
        s.removeAttribute("hx-swap-oob");
        s.removeAttribute("data-hx-swap-oob");
        const n = querySelectorAllExt(t, r, false);
        if (n) {
            forEach(n, function(e) {
                let t;
                const r = s.cloneNode(true);
                t = getDocument().createDocumentFragment();
                t.appendChild(r);
                if (!isInlineSwap(o, e)) {
                    t = asParentNode(r);
                }
                const n = {
                    shouldSwap: true,
                    target: e,
                    fragment: t
                };
                if (!triggerEvent(e, "htmx:oobBeforeSwap", n)) return;
                e = n.target;
                if (n.shouldSwap) {
                    handlePreservedElements(t);
                    swapWithStyle(o, e, e, t, i);
                    restorePreservedElements();
                }
                forEach(i.elts, function(e) {
                    triggerEvent(e, "htmx:oobAfterSwap", n);
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
                const r = find("#" + t.id);
                r.parentNode.moveBefore(t, r);
                r.remove();
            }
            e.remove();
        }
    }
    function handlePreservedElements(e) {
        forEach(findAll(e, "[hx-preserve], [data-hx-preserve]"), function(e) {
            const t = getAttributeValue(e, "id");
            const r = getDocument().getElementById(t);
            if (r != null) {
                if (e.moveBefore) {
                    let e = find("#--htmx-preserve-pantry--");
                    if (e == null) {
                        getDocument().body.insertAdjacentHTML("afterend", "<div id='--htmx-preserve-pantry--'></div>");
                        e = find("#--htmx-preserve-pantry--");
                    }
                    e.moveBefore(r, null);
                } else {
                    e.parentNode.replaceChild(r, e);
                }
            }
        });
    }
    function handleAttributes(a, e, l) {
        forEach(e.querySelectorAll("[id]"), function(t) {
            const r = getRawAttribute(t, "id");
            if (r && r.length > 0) {
                const n = r.replace("'", "\\'");
                const s = t.tagName.replace(":", "\\:");
                const e = asParentNode(a);
                const i = e && e.querySelector(s + "[id='" + n + "']");
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
        const r = asHtmlElement(matches(e, t) ? e : e.querySelector(t));
        if (r != null) {
            r.focus();
        }
    }
    function insertNodesBefore(e, t, r, n) {
        handleAttributes(e, r, n);
        while (r.childNodes.length > 0) {
            const s = r.firstChild;
            addClassToElement(asElement(s), htmx.config.addedClass);
            e.insertBefore(s, t);
            if (s.nodeType !== Node.TEXT_NODE && s.nodeType !== Node.COMMENT_NODE) {
                n.tasks.push(makeAjaxLoadTask(s));
            }
        }
    }
    function stringHash(e, t) {
        let r = 0;
        while (r < e.length) {
            t = (t << 5) - t + e.charCodeAt(r++) | 0;
        }
        return t;
    }
    function attributeHash(t) {
        let r = 0;
        if (t.attributes) {
            for (let e = 0; e < t.attributes.length; e++) {
                const n = t.attributes[e];
                if (n.value) {
                    r = stringHash(n.name, r);
                    r = stringHash(n.value, r);
                }
            }
        }
        return r;
    }
    function deInitOnHandlers(t) {
        const r = getInternalData(t);
        if (r.onHandlers) {
            for (let e = 0; e < r.onHandlers.length; e++) {
                const n = r.onHandlers[e];
                removeEventListenerImpl(t, n.event, n.listener);
            }
            delete r.onHandlers;
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
    function swapOuterHTML(t, e, r) {
        if (t instanceof Element && t.tagName === "BODY") {
            return swapInnerHTML(t, e, r);
        }
        let n;
        const s = t.previousSibling;
        const i = parentElt(t);
        if (!i) {
            return;
        }
        insertNodesBefore(i, t, e, r);
        if (s == null) {
            n = i.firstChild;
        } else {
            n = s.nextSibling;
        }
        r.elts = r.elts.filter(function(e) {
            return e !== t;
        });
        while (n && n !== t) {
            if (n instanceof Element) {
                r.elts.push(n);
            }
            n = n.nextSibling;
        }
        cleanUpElement(t);
        if (t instanceof Element) {
            t.remove();
        } else {
            t.parentNode.removeChild(t);
        }
    }
    function swapAfterBegin(e, t, r) {
        return insertNodesBefore(e, e.firstChild, t, r);
    }
    function swapBeforeBegin(e, t, r) {
        return insertNodesBefore(parentElt(e), e, t, r);
    }
    function swapBeforeEnd(e, t, r) {
        return insertNodesBefore(e, null, t, r);
    }
    function swapAfterEnd(e, t, r) {
        return insertNodesBefore(parentElt(e), e.nextSibling, t, r);
    }
    function swapDelete(e) {
        cleanUpElement(e);
        const t = parentElt(e);
        if (t) {
            return t.removeChild(e);
        }
    }
    function swapInnerHTML(e, t, r) {
        const n = e.firstChild;
        insertNodesBefore(e, n, t, r);
        if (n) {
            while (n.nextSibling) {
                cleanUpElement(n.nextSibling);
                e.removeChild(n.nextSibling);
            }
            cleanUpElement(n);
            e.removeChild(n);
        }
    }
    function swapWithStyle(t, e, r, n, s) {
        switch (t) {
          case "none":
            return;

          case "outerHTML":
            swapOuterHTML(r, n, s);
            return;

          case "afterbegin":
            swapAfterBegin(r, n, s);
            return;

          case "beforebegin":
            swapBeforeBegin(r, n, s);
            return;

          case "beforeend":
            swapBeforeEnd(r, n, s);
            return;

          case "afterend":
            swapAfterEnd(r, n, s);
            return;

          case "delete":
            swapDelete(r);
            return;

          default:
            var i = getExtensions(e);
            for (let e = 0; e < i.length; e++) {
                const o = i[e];
                try {
                    const a = o.handleSwap(t, r, n, s);
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
                swapInnerHTML(r, n, s);
            } else {
                swapWithStyle(htmx.config.defaultSwapStyle, e, r, n, s);
            }
        }
    }
    function findAndSwapOobElements(e, r, n) {
        var t = findAll(e, "[hx-swap-oob], [data-hx-swap-oob]");
        forEach(t, function(e) {
            if (htmx.config.allowNestedOobSwaps || e.parentElement === null) {
                const t = getAttributeValue(e, "hx-swap-oob");
                if (t != null) {
                    oobSwap(t, e, r, n);
                }
            } else {
                e.removeAttribute("hx-swap-oob");
                e.removeAttribute("data-hx-swap-oob");
            }
        });
        return t.length > 0;
    }
    function swap(e, t, n, s) {
        if (!s) {
            s = {};
        }
        e = resolveTarget(e);
        const i = s.contextElement ? getRootNode(s.contextElement, false) : getDocument();
        const r = document.activeElement;
        let o = {};
        try {
            o = {
                elt: r,
                start: r ? r.selectionStart : null,
                end: r ? r.selectionEnd : null
            };
        } catch (e) {}
        const a = makeSettleInfo(e);
        if (n.swapStyle === "textContent") {
            e.textContent = t;
        } else {
            let r = makeFragment(t);
            a.title = r.title;
            if (s.selectOOB) {
                const u = s.selectOOB.split(",");
                for (let t = 0; t < u.length; t++) {
                    const c = u[t].split(":", 2);
                    let e = c[0].trim();
                    if (e.indexOf("#") === 0) {
                        e = e.substring(1);
                    }
                    const f = c[1] || "true";
                    const h = r.querySelector("#" + e);
                    if (h) {
                        oobSwap(f, h, a, i);
                    }
                }
            }
            findAndSwapOobElements(r, a, i);
            forEach(findAll(r, "template"), function(e) {
                if (e.content && findAndSwapOobElements(e.content, a, i)) {
                    e.remove();
                }
            });
            if (s.select) {
                const p = getDocument().createDocumentFragment();
                forEach(r.querySelectorAll(s.select), function(e) {
                    p.appendChild(e);
                });
                r = p;
            }
            handlePreservedElements(r);
            swapWithStyle(n.swapStyle, s.contextElement, e, r, a);
            restorePreservedElements();
        }
        if (o.elt && !bodyContains(o.elt) && getRawAttribute(o.elt, "id")) {
            const d = document.getElementById(getRawAttribute(o.elt, "id"));
            const m = {
                preventScroll: n.focusScroll !== undefined ? !n.focusScroll : !htmx.config.defaultFocusScroll
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
        if (!n.ignoreTitle) {
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
            updateScrollState(a.elts, n);
            if (s.afterSettleCallback) {
                s.afterSettleCallback();
            }
        };
        if (n.settleDelay > 0) {
            getWindow().setTimeout(l, n.settleDelay);
        } else {
            l();
        }
    }
    function handleTriggerHeader(e, t, r) {
        const n = e.getResponseHeader(t);
        if (n.indexOf("{") === 0) {
            const s = parseJSON(n);
            for (const i in s) {
                if (s.hasOwnProperty(i)) {
                    let e = s[i];
                    if (isRawObject(e)) {
                        r = e.target !== undefined ? e.target : r;
                    } else {
                        e = {
                            value: e
                        };
                    }
                    triggerEvent(r, i, e);
                }
            }
        } else {
            const o = n.split(",");
            for (let e = 0; e < o.length; e++) {
                triggerEvent(r, o[e].trim(), []);
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
        let r = 0;
        while (r < e.length) {
            if (SYMBOL_START.exec(e.charAt(r))) {
                var n = r;
                while (SYMBOL_CONT.exec(e.charAt(r + 1))) {
                    r++;
                }
                t.push(e.substring(n, r + 1));
            } else if (STRINGISH_START.indexOf(e.charAt(r)) !== -1) {
                const s = e.charAt(r);
                var n = r;
                r++;
                while (r < e.length && e.charAt(r) !== s) {
                    if (e.charAt(r) === "\\") {
                        r++;
                    }
                    r++;
                }
                t.push(e.substring(n, r + 1));
            } else {
                const i = e.charAt(r);
                t.push(i);
            }
            r++;
        }
        return t;
    }
    function isPossibleRelativeReference(e, t, r) {
        return SYMBOL_START.exec(e.charAt(0)) && e !== "true" && e !== "false" && e !== "this" && e !== r && t !== ".";
    }
    function maybeGenerateConditional(n, s, i) {
        if (s[0] === "[") {
            s.shift();
            let e = 1;
            let t = " return (function(" + i + "){ return (";
            let r = null;
            while (s.length > 0) {
                const o = s[0];
                if (o === "]") {
                    e--;
                    if (e === 0) {
                        if (r === null) {
                            t = t + "true";
                        }
                        s.shift();
                        t += ")})";
                        try {
                            const a = maybeEval(n, function() {
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
                if (isPossibleRelativeReference(o, r, i)) {
                    t += "((" + i + "." + o + ") ? (" + i + "." + o + ") : (window." + o + "))";
                } else {
                    t = t + o;
                }
                r = s.shift();
            }
        }
    }
    function consumeUntil(e, t) {
        let r = "";
        while (e.length > 0 && !t.test(e[0])) {
            r += e.shift();
        }
        return r;
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
    function parseAndCacheTrigger(e, t, r) {
        const n = [];
        const s = tokenizeString(t);
        do {
            consumeUntil(s, NOT_WHITESPACE);
            const a = s.length;
            const l = consumeUntil(s, /[,\[\s]/);
            if (l !== "") {
                if (l === "every") {
                    const u = {
                        trigger: "every"
                    };
                    consumeUntil(s, NOT_WHITESPACE);
                    u.pollInterval = parseInterval(consumeUntil(s, /[,\[\s]/));
                    consumeUntil(s, NOT_WHITESPACE);
                    var i = maybeGenerateConditional(e, s, "event");
                    if (i) {
                        u.eventFilter = i;
                    }
                    n.push(u);
                } else {
                    const c = {
                        trigger: l
                    };
                    var i = maybeGenerateConditional(e, s, "event");
                    if (i) {
                        c.eventFilter = i;
                    }
                    consumeUntil(s, NOT_WHITESPACE);
                    while (s.length > 0 && s[0] !== ",") {
                        const f = s.shift();
                        if (f === "changed") {
                            c.changed = true;
                        } else if (f === "once") {
                            c.once = true;
                        } else if (f === "consume") {
                            c.consume = true;
                        } else if (f === "delay" && s[0] === ":") {
                            s.shift();
                            c.delay = parseInterval(consumeUntil(s, WHITESPACE_OR_COMMA));
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
                            c.from = o;
                        } else if (f === "target" && s[0] === ":") {
                            s.shift();
                            c.target = consumeCSSSelector(s);
                        } else if (f === "throttle" && s[0] === ":") {
                            s.shift();
                            c.throttle = parseInterval(consumeUntil(s, WHITESPACE_OR_COMMA));
                        } else if (f === "queue" && s[0] === ":") {
                            s.shift();
                            c.queue = consumeUntil(s, WHITESPACE_OR_COMMA);
                        } else if (f === "root" && s[0] === ":") {
                            s.shift();
                            c[f] = consumeCSSSelector(s);
                        } else if (f === "threshold" && s[0] === ":") {
                            s.shift();
                            c[f] = consumeUntil(s, WHITESPACE_OR_COMMA);
                        } else {
                            triggerErrorEvent(e, "htmx:syntax:error", {
                                token: s.shift()
                            });
                        }
                        consumeUntil(s, NOT_WHITESPACE);
                    }
                    n.push(c);
                }
            }
            if (s.length === a) {
                triggerErrorEvent(e, "htmx:syntax:error", {
                    token: s.shift()
                });
            }
            consumeUntil(s, NOT_WHITESPACE);
        } while (s[0] === "," && s.shift());
        if (r) {
            r[t] = n;
        }
        return n;
    }
    function getTriggerSpecs(e) {
        const t = getAttributeValue(e, "hx-trigger");
        let r = [];
        if (t) {
            const n = htmx.config.triggerSpecsCache;
            r = n && n[t] || parseAndCacheTrigger(e, t, n);
        }
        if (r.length > 0) {
            return r;
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
    function processPolling(e, t, r) {
        const n = getInternalData(e);
        n.timeout = getWindow().setTimeout(function() {
            if (bodyContains(e) && n.cancelled !== true) {
                if (!maybeFilterEvent(r, e, makeEvent("hx:poll:trigger", {
                    triggerSpec: r,
                    target: e
                }))) {
                    t(e);
                }
                processPolling(e, t, r);
            }
        }, r.pollInterval);
    }
    function isLocalLink(e) {
        return location.hostname === e.hostname && getRawAttribute(e, "href") && getRawAttribute(e, "href").indexOf("#") !== 0;
    }
    function eltIsDisabled(e) {
        return closest(e, htmx.config.disableSelector);
    }
    function boostElement(t, r, e) {
        if (t instanceof HTMLAnchorElement && isLocalLink(t) && (t.target === "" || t.target === "_self") || t.tagName === "FORM" && String(getRawAttribute(t, "method")).toLowerCase() !== "dialog") {
            r.boosted = true;
            let n, s;
            if (t.tagName === "A") {
                n = "get";
                s = getRawAttribute(t, "href");
            } else {
                const i = getRawAttribute(t, "method");
                n = i ? i.toLowerCase() : "get";
                s = getRawAttribute(t, "action");
                if (s == null || s === "") {
                    s = getDocument().location.href;
                }
                if (n === "get" && s.includes("?")) {
                    s = s.replace(/\?[^#]+/, "");
                }
            }
            e.forEach(function(e) {
                addEventListener(t, function(e, t) {
                    const r = asElement(e);
                    if (eltIsDisabled(r)) {
                        cleanUpElement(r);
                        return;
                    }
                    issueAjaxRequest(n, s, r, t);
                }, r, e, true);
            });
        }
    }
    function shouldCancel(e, t) {
        const r = asElement(t);
        if (!r) {
            return false;
        }
        if (e.type === "submit" || e.type === "click") {
            if (r.tagName === "FORM") {
                return true;
            }
            if (matches(r, 'input[type="submit"], button') && (matches(r, "[form]") || closest(r, "form") !== null)) {
                return true;
            }
            if (r instanceof HTMLAnchorElement && r.href && (r.getAttribute("href") === "#" || r.getAttribute("href").indexOf("#") !== 0)) {
                return true;
            }
        }
        return false;
    }
    function ignoreBoostedAnchorCtrlClick(e, t) {
        return getInternalData(e).boosted && e instanceof HTMLAnchorElement && t.type === "click" && (t.ctrlKey || t.metaKey);
    }
    function maybeFilterEvent(e, t, r) {
        const n = e.eventFilter;
        if (n) {
            try {
                return n.call(t, r) !== true;
            } catch (e) {
                const s = n.source;
                triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", {
                    error: e,
                    source: s
                });
                return true;
            }
        }
        return false;
    }
    function addEventListener(a, l, e, u, c) {
        const f = getInternalData(a);
        let t;
        if (u.from) {
            t = querySelectorAllExt(a, u.from);
        } else {
            t = [ a ];
        }
        if (u.changed) {
            if (!("lastValue" in f)) {
                f.lastValue = new WeakMap();
            }
            t.forEach(function(e) {
                if (!f.lastValue.has(u)) {
                    f.lastValue.set(u, new WeakMap());
                }
                f.lastValue.get(u).set(e, e.value);
            });
        }
        forEach(t, function(i) {
            const o = function(e) {
                if (!bodyContains(a)) {
                    i.removeEventListener(u.trigger, o);
                    return;
                }
                if (ignoreBoostedAnchorCtrlClick(a, e)) {
                    return;
                }
                if (c || shouldCancel(e, a)) {
                    e.preventDefault();
                }
                if (maybeFilterEvent(u, a, e)) {
                    return;
                }
                const t = getInternalData(e);
                t.triggerSpec = u;
                if (t.handledFor == null) {
                    t.handledFor = [];
                }
                if (t.handledFor.indexOf(a) < 0) {
                    t.handledFor.push(a);
                    if (u.consume) {
                        e.stopPropagation();
                    }
                    if (u.target && e.target) {
                        if (!matches(asElement(e.target), u.target)) {
                            return;
                        }
                    }
                    if (u.once) {
                        if (f.triggeredOnce) {
                            return;
                        } else {
                            f.triggeredOnce = true;
                        }
                    }
                    if (u.changed) {
                        const r = event.target;
                        const n = r.value;
                        const s = f.lastValue.get(u);
                        if (s.has(r) && s.get(r) === n) {
                            return;
                        }
                        s.set(r, n);
                    }
                    if (f.delayed) {
                        clearTimeout(f.delayed);
                    }
                    if (f.throttle) {
                        return;
                    }
                    if (u.throttle > 0) {
                        if (!f.throttle) {
                            triggerEvent(a, "htmx:trigger");
                            l(a, e);
                            f.throttle = getWindow().setTimeout(function() {
                                f.throttle = null;
                            }, u.throttle);
                        }
                    } else if (u.delay > 0) {
                        f.delayed = getWindow().setTimeout(function() {
                            triggerEvent(a, "htmx:trigger");
                            l(a, e);
                        }, u.delay);
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
                trigger: u.trigger,
                listener: o,
                on: i
            });
            i.addEventListener(u.trigger, o);
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
    function loadImmediately(e, t, r, n) {
        const s = function() {
            if (!r.loaded) {
                r.loaded = true;
                triggerEvent(e, "htmx:trigger");
                t(e);
            }
        };
        if (n > 0) {
            getWindow().setTimeout(s, n);
        } else {
            s();
        }
    }
    function processVerbs(t, r, e) {
        let i = false;
        forEach(VERBS, function(n) {
            if (hasAttribute(t, "hx-" + n)) {
                const s = getAttributeValue(t, "hx-" + n);
                i = true;
                r.path = s;
                r.verb = n;
                e.forEach(function(e) {
                    addTriggerHandler(t, e, r, function(e, t) {
                        const r = asElement(e);
                        if (closest(r, htmx.config.disableSelector)) {
                            cleanUpElement(r);
                            return;
                        }
                        issueAjaxRequest(n, s, r, t);
                    });
                });
            }
        });
        return i;
    }
    function addTriggerHandler(n, e, t, r) {
        if (e.trigger === "revealed") {
            initScrollHandler();
            addEventListener(n, r, t, e);
            maybeReveal(asElement(n));
        } else if (e.trigger === "intersect") {
            const s = {};
            if (e.root) {
                s.root = querySelectorExt(n, e.root);
            }
            if (e.threshold) {
                s.threshold = parseFloat(e.threshold);
            }
            const i = new IntersectionObserver(function(t) {
                for (let e = 0; e < t.length; e++) {
                    const r = t[e];
                    if (r.isIntersecting) {
                        triggerEvent(n, "intersect");
                        break;
                    }
                }
            }, s);
            i.observe(asElement(n));
            addEventListener(asElement(n), r, t, e);
        } else if (!t.firstInitCompleted && e.trigger === "load") {
            if (!maybeFilterEvent(e, n, makeEvent("load", {
                elt: n
            }))) {
                loadImmediately(asElement(n), r, t, e.delay);
            }
        } else if (e.pollInterval > 0) {
            t.polling = true;
            processPolling(asElement(n), r, e);
        } else {
            addEventListener(n, r, t, e);
        }
    }
    function shouldProcessHxOn(e) {
        const t = asElement(e);
        if (!t) {
            return false;
        }
        const r = t.attributes;
        for (let e = 0; e < r.length; e++) {
            const n = r[e].name;
            if (startsWith(n, "hx-on:") || startsWith(n, "data-hx-on:") || startsWith(n, "hx-on-") || startsWith(n, "data-hx-on-")) {
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
        const r = HX_ON_QUERY.evaluate(e);
        let n = null;
        while (n = r.iterateNext()) t.push(asElement(n));
    }
    function findHxOnWildcardElements(e) {
        const t = [];
        if (e instanceof DocumentFragment) {
            for (const r of e.childNodes) {
                processHXOnRoot(r, t);
            }
        } else {
            processHXOnRoot(e, t);
        }
        return t;
    }
    function findElementsToProcess(e) {
        if (e.querySelectorAll) {
            const r = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";
            const n = [];
            for (const i in extensions) {
                const o = extensions[i];
                if (o.getSelectors) {
                    var t = o.getSelectors();
                    if (t) {
                        n.push(t);
                    }
                }
            }
            const s = e.querySelectorAll(VERB_SELECTOR + r + ", form, [type='submit']," + " [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger]" + n.flat().map(e => ", " + e).join(""));
            return s;
        } else {
            return [];
        }
    }
    function maybeSetLastButtonClicked(e) {
        const t = closest(asElement(e.target), "button, input[type='submit']");
        const r = getRelatedFormData(e);
        if (r) {
            r.lastButtonClicked = t;
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
        const r = resolveTarget("#" + getRawAttribute(t, "form"), t.getRootNode()) || closest(t, "form");
        if (!r) {
            return;
        }
        return getInternalData(r);
    }
    function initButtonTracking(e) {
        e.addEventListener("click", maybeSetLastButtonClicked);
        e.addEventListener("focusin", maybeSetLastButtonClicked);
        e.addEventListener("focusout", maybeUnsetLastButtonClicked);
    }
    function addHxOnEventHandler(t, e, r) {
        const n = getInternalData(t);
        if (!Array.isArray(n.onHandlers)) {
            n.onHandlers = [];
        }
        let s;
        const i = function(e) {
            maybeEval(t, function() {
                if (eltIsDisabled(t)) {
                    return;
                }
                if (!s) {
                    s = new Function("event", r);
                }
                s.call(t, e);
            });
        };
        t.addEventListener(e, i);
        n.onHandlers.push({
            event: e,
            listener: i
        });
    }
    function processHxOnWildcard(t) {
        deInitOnHandlers(t);
        for (let e = 0; e < t.attributes.length; e++) {
            const r = t.attributes[e].name;
            const n = t.attributes[e].value;
            if (startsWith(r, "hx-on") || startsWith(r, "data-hx-on")) {
                const s = r.indexOf("-on") + 3;
                const i = r.slice(s, s + 1);
                if (i === "-" || i === ":") {
                    let e = r.slice(s + 1);
                    if (startsWith(e, ":")) {
                        e = "htmx" + e;
                    } else if (startsWith(e, "-")) {
                        e = "htmx:" + e.slice(1);
                    } else if (startsWith(e, "htmx-")) {
                        e = "htmx:" + e.slice(5);
                    }
                    addHxOnEventHandler(t, e, n);
                }
            }
        }
    }
    function initNode(t) {
        if (closest(t, htmx.config.disableSelector)) {
            cleanUpElement(t);
            return;
        }
        const r = getInternalData(t);
        const e = attributeHash(t);
        if (r.initHash !== e) {
            deInitNode(t);
            r.initHash = e;
            triggerEvent(t, "htmx:beforeProcessNode");
            const n = getTriggerSpecs(t);
            const s = processVerbs(t, r, n);
            if (!s) {
                if (getClosestAttributeValue(t, "hx-boost") === "true") {
                    boostElement(t, r, n);
                } else if (hasAttribute(t, "hx-trigger")) {
                    n.forEach(function(e) {
                        addTriggerHandler(t, e, r, function() {});
                    });
                }
            }
            if (t.tagName === "FORM" || getRawAttribute(t, "type") === "submit" && hasAttribute(t, "form")) {
                initButtonTracking(t);
            }
            r.firstInitCompleted = true;
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
        let r;
        if (window.CustomEvent && typeof window.CustomEvent === "function") {
            r = new CustomEvent(e, {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: t
            });
        } else {
            r = getDocument().createEvent("CustomEvent");
            r.initCustomEvent(e, true, true, t);
        }
        return r;
    }
    function triggerErrorEvent(e, t, r) {
        triggerEvent(e, t, mergeObjects({
            error: t
        }, r));
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
    function triggerEvent(e, t, r) {
        e = resolveTarget(e);
        if (r == null) {
            r = {};
        }
        r.elt = e;
        const n = makeEvent(t, r);
        if (htmx.logger && !ignoreEventForLogging(t)) {
            htmx.logger(e, t, r);
        }
        if (r.error) {
            logError(r.error);
            triggerEvent(e, "htmx:error", {
                errorInfo: r
            });
        }
        let s = e.dispatchEvent(n);
        const i = kebabEventName(t);
        if (s && i !== t) {
            const o = makeEvent(i, n.detail);
            s = s && e.dispatchEvent(o);
        }
        withExtensions(asElement(e), function(e) {
            s = s && (e.onEvent(t, n) !== false && !n.defaultPrevented);
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
        const r = cleanInnerHtmlForHistory(e);
        const n = getDocument().title;
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
            content: r,
            title: n,
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
        const r = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
        for (let e = 0; e < r.length; e++) {
            if (r[e].url === t) {
                return r[e];
            }
        }
        return null;
    }
    function cleanInnerHtmlForHistory(e) {
        const t = htmx.config.requestClass;
        const r = e.cloneNode(true);
        forEach(findAll(r, "." + t), function(e) {
            removeClassFromElement(e, t);
        });
        forEach(findAll(r, "[data-disabled-by-htmx]"), function(e) {
            e.removeAttribute("disabled");
        });
        return r.innerHTML;
    }
    function saveCurrentPageToHistory() {
        const e = getHistoryElement();
        const t = currentPathForHistory || location.pathname + location.search;
        let r;
        try {
            r = getDocument().querySelector('[hx-history="false" i],[data-hx-history="false" i]');
        } catch (e) {
            r = getDocument().querySelector('[hx-history="false"],[data-hx-history="false"]');
        }
        if (!r) {
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
                const r = getHistoryElement();
                const n = makeSettleInfo(r);
                handleTitle(e.title);
                handlePreservedElements(e);
                swapInnerHTML(r, t, n);
                restorePreservedElements();
                settleImmediately(n.tasks);
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
            const r = makeFragment(t.content);
            const n = getHistoryElement();
            const s = makeSettleInfo(n);
            handleTitle(t.title);
            handlePreservedElements(r);
            swapInnerHTML(n, r, s);
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
    function haveSeenNode(t, r) {
        for (let e = 0; e < t.length; e++) {
            const n = t[e];
            if (n.isSameNode(r)) {
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
    function addValueToFormData(t, e, r) {
        if (t != null && e != null) {
            if (Array.isArray(e)) {
                e.forEach(function(e) {
                    r.append(t, e);
                });
            } else {
                r.append(t, e);
            }
        }
    }
    function removeValueFromFormData(t, r, n) {
        if (t != null && r != null) {
            let e = n.getAll(t);
            if (Array.isArray(r)) {
                e = e.filter(e => r.indexOf(e) < 0);
            } else {
                e = e.filter(e => e !== r);
            }
            n.delete(t);
            forEach(e, e => n.append(t, e));
        }
    }
    function processInputValue(t, r, n, s, i) {
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
            addValueToFormData(o, e, r);
            if (i) {
                validateElement(s, n);
            }
        }
        if (s instanceof HTMLFormElement) {
            forEach(s.elements, function(e) {
                if (t.indexOf(e) >= 0) {
                    removeValueFromFormData(e.name, e.value, r);
                } else {
                    t.push(e);
                }
                if (i) {
                    validateElement(e, n);
                }
            });
            new FormData(s).forEach(function(e, t) {
                if (e instanceof File && e.name === "") {
                    return;
                }
                addValueToFormData(t, e, r);
            });
        }
    }
    function validateElement(e, t) {
        const r = e;
        if (r.willValidate) {
            triggerEvent(r, "htmx:validation:validate");
            if (!r.checkValidity()) {
                t.push({
                    elt: r,
                    message: r.validationMessage,
                    validity: r.validity
                });
                triggerEvent(r, "htmx:validation:failed", {
                    message: r.validationMessage,
                    validity: r.validity
                });
            }
        }
    }
    function overrideFormData(r, e) {
        for (const t of e.keys()) {
            r.delete(t);
        }
        e.forEach(function(e, t) {
            r.append(t, e);
        });
        return r;
    }
    function getInputValues(e, t) {
        const r = [];
        const n = new FormData();
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
            processInputValue(r, s, i, closest(e, "form"), a);
        }
        processInputValue(r, n, i, e, a);
        if (o.lastButtonClicked || e.tagName === "BUTTON" || e.tagName === "INPUT" && getRawAttribute(e, "type") === "submit") {
            const u = o.lastButtonClicked || e;
            const c = getRawAttribute(u, "name");
            addValueToFormData(c, u.value, s);
        }
        const l = findAttributeTargets(e, "hx-include");
        forEach(l, function(e) {
            processInputValue(r, n, i, asElement(e), a);
            if (!matches(e, "form")) {
                forEach(asParentNode(e).querySelectorAll(INPUT_SELECTOR), function(e) {
                    processInputValue(r, n, i, e, a);
                });
            }
        });
        overrideFormData(n, s);
        return {
            errors: i,
            formData: n,
            values: formDataProxy(n)
        };
    }
    function appendParam(e, t, r) {
        if (e !== "") {
            e += "&";
        }
        if (String(r) === "[object Object]") {
            r = JSON.stringify(r);
        }
        const n = encodeURIComponent(r);
        e += encodeURIComponent(t) + "=" + n;
        return e;
    }
    function urlEncode(e) {
        e = formDataFromObject(e);
        let r = "";
        e.forEach(function(e, t) {
            r = appendParam(r, t, e);
        });
        return r;
    }
    function getHeaders(e, t, r) {
        const n = {
            "HX-Request": "true",
            "HX-Trigger": getRawAttribute(e, "id"),
            "HX-Trigger-Name": getRawAttribute(e, "name"),
            "HX-Target": getAttributeValue(t, "id"),
            "HX-Current-URL": getDocument().location.href
        };
        getValuesForElement(e, "hx-headers", false, n);
        if (r !== undefined) {
            n["HX-Prompt"] = r;
        }
        if (getInternalData(e).boosted) {
            n["HX-Boosted"] = "true";
        }
        return n;
    }
    function filterValues(r, e) {
        const t = getClosestAttributeValue(e, "hx-params");
        if (t) {
            if (t === "none") {
                return new FormData();
            } else if (t === "*") {
                return r;
            } else if (t.indexOf("not ") === 0) {
                forEach(t.slice(4).split(","), function(e) {
                    e = e.trim();
                    r.delete(e);
                });
                return r;
            } else {
                const n = new FormData();
                forEach(t.split(","), function(t) {
                    t = t.trim();
                    if (r.has(t)) {
                        r.getAll(t).forEach(function(e) {
                            n.append(t, e);
                        });
                    }
                });
                return n;
            }
        } else {
            return r;
        }
    }
    function isAnchorLink(e) {
        return !!getRawAttribute(e, "href") && getRawAttribute(e, "href").indexOf("#") >= 0;
    }
    function getSwapSpecification(e, t) {
        const r = t || getClosestAttributeValue(e, "hx-swap");
        const n = {
            swapStyle: getInternalData(e).boosted ? "innerHTML" : htmx.config.defaultSwapStyle,
            swapDelay: htmx.config.defaultSwapDelay,
            settleDelay: htmx.config.defaultSettleDelay
        };
        if (htmx.config.scrollIntoViewOnBoost && getInternalData(e).boosted && !isAnchorLink(e)) {
            n.show = "top";
        }
        if (r) {
            const o = splitOnWhitespace(r);
            if (o.length > 0) {
                for (let e = 0; e < o.length; e++) {
                    const a = o[e];
                    if (a.indexOf("swap:") === 0) {
                        n.swapDelay = parseInterval(a.slice(5));
                    } else if (a.indexOf("settle:") === 0) {
                        n.settleDelay = parseInterval(a.slice(7));
                    } else if (a.indexOf("transition:") === 0) {
                        n.transition = a.slice(11) === "true";
                    } else if (a.indexOf("ignoreTitle:") === 0) {
                        n.ignoreTitle = a.slice(12) === "true";
                    } else if (a.indexOf("scroll:") === 0) {
                        const l = a.slice(7);
                        var s = l.split(":");
                        const u = s.pop();
                        var i = s.length > 0 ? s.join(":") : null;
                        n.scroll = u;
                        n.scrollTarget = i;
                    } else if (a.indexOf("show:") === 0) {
                        const c = a.slice(5);
                        var s = c.split(":");
                        const f = s.pop();
                        var i = s.length > 0 ? s.join(":") : null;
                        n.show = f;
                        n.showTarget = i;
                    } else if (a.indexOf("focus-scroll:") === 0) {
                        const h = a.slice("focus-scroll:".length);
                        n.focusScroll = h == "true";
                    } else if (e == 0) {
                        n.swapStyle = a;
                    } else {
                        logError("Unknown modifier in hx-swap: " + a);
                    }
                }
            }
        }
        return n;
    }
    function usesFormData(e) {
        return getClosestAttributeValue(e, "hx-encoding") === "multipart/form-data" || matches(e, "form") && getRawAttribute(e, "enctype") === "multipart/form-data";
    }
    function encodeParamsForBody(t, r, n) {
        let s = null;
        withExtensions(r, function(e) {
            if (s == null) {
                s = e.encodeParameters(t, n, r);
            }
        });
        if (s != null) {
            return s;
        } else {
            if (usesFormData(r)) {
                return overrideFormData(new FormData(), formDataFromObject(n));
            } else {
                return urlEncode(n);
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
        const r = e[0];
        const n = e[e.length - 1];
        if (t.scroll) {
            var s = null;
            if (t.scrollTarget) {
                s = asElement(querySelectorExt(r, t.scrollTarget));
            }
            if (t.scroll === "top" && (r || s)) {
                s = s || r;
                s.scrollTop = 0;
            }
            if (t.scroll === "bottom" && (n || s)) {
                s = s || n;
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
                s = asElement(querySelectorExt(r, e));
            }
            if (t.show === "top" && (r || s)) {
                s = s || r;
                s.scrollIntoView({
                    block: "start",
                    behavior: htmx.config.scrollBehavior
                });
            }
            if (t.show === "bottom" && (n || s)) {
                s = s || n;
                s.scrollIntoView({
                    block: "end",
                    behavior: htmx.config.scrollBehavior
                });
            }
        }
    }
    function getValuesForElement(n, e, s, i) {
        if (i == null) {
            i = {};
        }
        if (n == null) {
            return i;
        }
        const o = getAttributeValue(n, e);
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
            let r;
            if (t) {
                r = maybeEval(n, function() {
                    return Function("return (" + e + ")")();
                }, {});
            } else {
                r = parseJSON(e);
            }
            for (const a in r) {
                if (r.hasOwnProperty(a)) {
                    if (i[a] == null) {
                        i[a] = r[a];
                    }
                }
            }
        }
        return getValuesForElement(asElement(parentElt(n)), e, s, i);
    }
    function maybeEval(e, t, r) {
        if (htmx.config.allowEval) {
            return t();
        } else {
            triggerErrorEvent(e, "htmx:evalDisallowedError");
            return r;
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
    function safelySetHeaderValue(t, r, n) {
        if (n !== null) {
            try {
                t.setRequestHeader(r, n);
            } catch (e) {
                t.setRequestHeader(r, encodeURIComponent(n));
                t.setRequestHeader(r + "-URI-AutoEncoded", "true");
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
    function ajaxHelper(t, r, n) {
        t = t.toLowerCase();
        if (n) {
            if (n instanceof Element || typeof n === "string") {
                return issueAjaxRequest(t, r, null, null, {
                    targetOverride: resolveTarget(n) || DUMMY_ELT,
                    returnPromise: true
                });
            } else {
                let e = resolveTarget(n.target);
                if (n.target && !e || n.source && !e && !resolveTarget(n.source)) {
                    e = DUMMY_ELT;
                }
                return issueAjaxRequest(t, r, resolveTarget(n.source), n.event, {
                    handler: n.handler,
                    headers: n.headers,
                    values: n.values,
                    targetOverride: e,
                    swapOverride: n.swap,
                    select: n.select,
                    returnPromise: true
                });
            }
        } else {
            return issueAjaxRequest(t, r, null, null, {
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
    function verifyPath(e, t, r) {
        let n;
        let s;
        if (typeof URL === "function") {
            s = new URL(t, document.location.href);
            const i = document.location.origin;
            n = i === s.origin;
        } else {
            s = t;
            n = startsWith(t, document.location.origin);
        }
        if (htmx.config.selfRequestsOnly) {
            if (!n) {
                return false;
            }
        }
        return triggerEvent(e, "htmx:validateUrl", mergeObjects({
            url: s,
            sameHost: n
        }, r));
    }
    function formDataFromObject(e) {
        if (e instanceof FormData) return e;
        const t = new FormData();
        for (const r in e) {
            if (e.hasOwnProperty(r)) {
                if (e[r] && typeof e[r].forEach === "function") {
                    e[r].forEach(function(e) {
                        t.append(r, e);
                    });
                } else if (typeof e[r] === "object" && !(e[r] instanceof Blob)) {
                    t.append(r, JSON.stringify(e[r]));
                } else {
                    t.append(r, e[r]);
                }
            }
        }
        return t;
    }
    function formDataArrayProxy(n, s, e) {
        return new Proxy(e, {
            get: function(t, e) {
                if (typeof e === "number") return t[e];
                if (e === "length") return t.length;
                if (e === "push") {
                    return function(e) {
                        t.push(e);
                        n.append(s, e);
                    };
                }
                if (typeof t[e] === "function") {
                    return function() {
                        t[e].apply(t, arguments);
                        n.delete(s);
                        t.forEach(function(e) {
                            n.append(s, e);
                        });
                    };
                }
                if (t[e] && t[e].length === 1) {
                    return t[e][0];
                } else {
                    return t[e];
                }
            },
            set: function(e, t, r) {
                e[t] = r;
                n.delete(s);
                e.forEach(function(e) {
                    n.append(s, e);
                });
                return true;
            }
        });
    }
    function formDataProxy(s) {
        return new Proxy(s, {
            get: function(e, t) {
                if (typeof t === "symbol") {
                    const n = Reflect.get(e, t);
                    if (typeof n === "function") {
                        return function() {
                            return n.apply(s, arguments);
                        };
                    } else {
                        return n;
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
                const r = s.getAll(t);
                if (r.length === 0) {
                    return undefined;
                } else if (r.length === 1) {
                    return r[0];
                } else {
                    return formDataArrayProxy(e, t, r);
                }
            },
            set: function(t, r, e) {
                if (typeof r !== "string") {
                    return false;
                }
                t.delete(r);
                if (e && typeof e.forEach === "function") {
                    e.forEach(function(e) {
                        t.append(r, e);
                    });
                } else if (typeof e === "object" && !(e instanceof Blob)) {
                    t.append(r, JSON.stringify(e));
                } else {
                    t.append(r, e);
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
    function issueAjaxRequest(t, r, n, s, i, D) {
        let o = null;
        let a = null;
        i = i != null ? i : {};
        if (i.returnPromise && typeof Promise !== "undefined") {
            var e = new Promise(function(e, t) {
                o = e;
                a = t;
            });
        }
        if (n == null) {
            n = getDocument().body;
        }
        const M = i.handler || handleAjaxResponse;
        const $ = i.select || null;
        if (!bodyContains(n)) {
            maybeCall(o);
            return e;
        }
        const l = i.targetOverride || asElement(getTarget(n));
        if (l == null || l == DUMMY_ELT) {
            triggerErrorEvent(n, "htmx:targetError", {
                target: getAttributeValue(n, "hx-target")
            });
            maybeCall(a);
            return e;
        }
        let u = getInternalData(n);
        const c = u.lastButtonClicked;
        if (c) {
            const I = getRawAttribute(c, "formaction");
            if (I != null) {
                r = I;
            }
            const T = getRawAttribute(c, "formmethod");
            if (T != null) {
                if (T.toLowerCase() !== "dialog") {
                    t = T;
                }
            }
        }
        const f = getClosestAttributeValue(n, "hx-confirm");
        if (D === undefined) {
            const X = function(e) {
                return issueAjaxRequest(t, r, n, s, i, !!e);
            };
            const G = {
                target: l,
                elt: n,
                path: r,
                verb: t,
                triggeringEvent: s,
                etc: i,
                issueRequest: X,
                question: f
            };
            if (triggerEvent(n, "htmx:confirm", G) === false) {
                maybeCall(o);
                return e;
            }
        }
        let h = n;
        let p = getClosestAttributeValue(n, "hx-sync");
        let d = null;
        let F = false;
        if (p) {
            const N = p.split(":");
            const H = N[0].trim();
            if (H === "this") {
                h = findThisElement(n, "hx-sync");
            } else {
                h = asElement(querySelectorExt(n, H));
            }
            p = (N[1] || "drop").trim();
            u = getInternalData(h);
            if (p === "drop" && u.xhr && u.abortable !== true) {
                maybeCall(o);
                return e;
            } else if (p === "abort") {
                if (u.xhr) {
                    maybeCall(o);
                    return e;
                } else {
                    F = true;
                }
            } else if (p === "replace") {
                triggerEvent(h, "htmx:abort");
            } else if (p.indexOf("queue") === 0) {
                const K = p.split(" ");
                d = (K[1] || "last").trim();
            }
        }
        if (u.xhr) {
            if (u.abortable) {
                triggerEvent(h, "htmx:abort");
            } else {
                if (d == null) {
                    if (s) {
                        const R = getInternalData(s);
                        if (R && R.triggerSpec && R.triggerSpec.queue) {
                            d = R.triggerSpec.queue;
                        }
                    }
                    if (d == null) {
                        d = "last";
                    }
                }
                if (u.queuedRequests == null) {
                    u.queuedRequests = [];
                }
                if (d === "first" && u.queuedRequests.length === 0) {
                    u.queuedRequests.push(function() {
                        issueAjaxRequest(t, r, n, s, i);
                    });
                } else if (d === "all") {
                    u.queuedRequests.push(function() {
                        issueAjaxRequest(t, r, n, s, i);
                    });
                } else if (d === "last") {
                    u.queuedRequests = [];
                    u.queuedRequests.push(function() {
                        issueAjaxRequest(t, r, n, s, i);
                    });
                }
                maybeCall(o);
                return e;
            }
        }
        const m = new XMLHttpRequest();
        u.xhr = m;
        u.abortable = F;
        const g = function() {
            u.xhr = null;
            u.abortable = false;
            if (u.queuedRequests != null && u.queuedRequests.length > 0) {
                const e = u.queuedRequests.shift();
                e();
            }
        };
        const q = getClosestAttributeValue(n, "hx-prompt");
        if (q) {
            var b = prompt(q);
            if (b === null || !triggerEvent(n, "htmx:prompt", {
                prompt: b,
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
        let v = getHeaders(n, l, b);
        if (t !== "get" && !usesFormData(n)) {
            v["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if (i.headers) {
            v = mergeObjects(v, i.headers);
        }
        const B = getInputValues(n, t);
        let y = B.errors;
        const j = B.formData;
        if (i.values) {
            overrideFormData(j, formDataFromObject(i.values));
        }
        const V = formDataFromObject(getExpressionVars(n));
        const E = overrideFormData(j, V);
        let x = filterValues(E, n);
        if (htmx.config.getCacheBusterParam && t === "get") {
            x.set("org.htmx.cache-buster", getRawAttribute(l, "id") || "true");
        }
        if (r == null || r === "") {
            r = getDocument().location.href;
        }
        const S = getValuesForElement(n, "hx-request");
        const U = getInternalData(n).boosted;
        let w = htmx.config.methodsThatUseUrlParams.indexOf(t) >= 0;
        const k = {
            boosted: U,
            useUrlParams: w,
            formData: x,
            parameters: formDataProxy(x),
            unfilteredFormData: E,
            unfilteredParameters: formDataProxy(E),
            headers: v,
            target: l,
            verb: t,
            errors: y,
            withCredentials: i.credentials || S.credentials || htmx.config.withCredentials,
            timeout: i.timeout || S.timeout || htmx.config.timeout,
            path: r,
            triggeringEvent: s
        };
        if (!triggerEvent(n, "htmx:configRequest", k)) {
            maybeCall(o);
            g();
            return e;
        }
        r = k.path;
        t = k.verb;
        v = k.headers;
        x = formDataFromObject(k.parameters);
        y = k.errors;
        w = k.useUrlParams;
        if (y && y.length > 0) {
            triggerEvent(n, "htmx:validation:halted", k);
            maybeCall(o);
            g();
            return e;
        }
        const W = r.split("#");
        const J = W[0];
        const P = W[1];
        let A = r;
        if (w) {
            A = J;
            const Y = !x.keys().next().done;
            if (Y) {
                if (A.indexOf("?") < 0) {
                    A += "?";
                } else {
                    A += "&";
                }
                A += urlEncode(x);
                if (P) {
                    A += "#" + P;
                }
            }
        }
        if (!verifyPath(n, A, k)) {
            triggerErrorEvent(n, "htmx:invalidPath", k);
            maybeCall(a);
            return e;
        }
        m.open(t.toUpperCase(), A, true);
        m.overrideMimeType("text/html");
        m.withCredentials = k.withCredentials;
        m.timeout = k.timeout;
        if (S.noHeaders) {} else {
            for (const L in v) {
                if (v.hasOwnProperty(L)) {
                    const Q = v[L];
                    safelySetHeaderValue(m, L, Q);
                }
            }
        }
        const C = {
            xhr: m,
            target: l,
            requestConfig: k,
            etc: i,
            boosted: U,
            select: $,
            pathInfo: {
                requestPath: r,
                finalRequestPath: A,
                responsePath: null,
                anchor: P
            }
        };
        m.onload = function() {
            try {
                const t = hierarchyForElt(n);
                C.pathInfo.responsePath = getPathFromResponse(m);
                M(n, C);
                if (C.keepIndicators !== true) {
                    removeRequestIndicators(_, O);
                }
                triggerEvent(n, "htmx:afterRequest", C);
                triggerEvent(n, "htmx:afterOnLoad", C);
                if (!bodyContains(n)) {
                    let e = null;
                    while (t.length > 0 && e == null) {
                        const r = t.shift();
                        if (bodyContains(r)) {
                            e = r;
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
                triggerErrorEvent(n, "htmx:onLoadError", mergeObjects({
                    error: e
                }, C));
                throw e;
            }
        };
        m.onerror = function() {
            removeRequestIndicators(_, O);
            triggerErrorEvent(n, "htmx:afterRequest", C);
            triggerErrorEvent(n, "htmx:sendError", C);
            maybeCall(a);
            g();
        };
        m.onabort = function() {
            removeRequestIndicators(_, O);
            triggerErrorEvent(n, "htmx:afterRequest", C);
            triggerErrorEvent(n, "htmx:sendAbort", C);
            maybeCall(a);
            g();
        };
        m.ontimeout = function() {
            removeRequestIndicators(_, O);
            triggerErrorEvent(n, "htmx:afterRequest", C);
            triggerErrorEvent(n, "htmx:timeout", C);
            maybeCall(a);
            g();
        };
        if (!triggerEvent(n, "htmx:beforeRequest", C)) {
            maybeCall(o);
            g();
            return e;
        }
        var _ = addRequestIndicatorClasses(n);
        var O = disableElements(n);
        forEach([ "loadstart", "loadend", "progress", "abort" ], function(t) {
            forEach([ m, m.upload ], function(e) {
                e.addEventListener(t, function(e) {
                    triggerEvent(n, "htmx:xhr:" + t, {
                        lengthComputable: e.lengthComputable,
                        loaded: e.loaded,
                        total: e.total
                    });
                });
            });
        });
        triggerEvent(n, "htmx:beforeSend", C);
        const z = w ? null : encodeParamsForBody(m, n, x);
        m.send(z);
        return e;
    }
    function determineHistoryUpdates(e, t) {
        const r = t.xhr;
        let n = null;
        let s = null;
        if (hasHeader(r, /HX-Push:/i)) {
            n = r.getResponseHeader("HX-Push");
            s = "push";
        } else if (hasHeader(r, /HX-Push-Url:/i)) {
            n = r.getResponseHeader("HX-Push-Url");
            s = "push";
        } else if (hasHeader(r, /HX-Replace-Url:/i)) {
            n = r.getResponseHeader("HX-Replace-Url");
            s = "replace";
        }
        if (n) {
            if (n === "false") {
                return {};
            } else {
                return {
                    type: s,
                    path: n
                };
            }
        }
        const i = t.pathInfo.finalRequestPath;
        const o = t.pathInfo.responsePath;
        const a = getClosestAttributeValue(e, "hx-push-url");
        const l = getClosestAttributeValue(e, "hx-replace-url");
        const u = getInternalData(e).boosted;
        let c = null;
        let f = null;
        if (a) {
            c = "push";
            f = a;
        } else if (l) {
            c = "replace";
            f = l;
        } else if (u) {
            c = "push";
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
                type: c,
                path: f
            };
        } else {
            return {};
        }
    }
    function codeMatches(e, t) {
        var r = new RegExp(e.code);
        return r.test(t.toString(10));
    }
    function resolveResponseHandling(e) {
        for (var t = 0; t < htmx.config.responseHandling.length; t++) {
            var r = htmx.config.responseHandling[t];
            if (codeMatches(r, e.status)) {
                return r;
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
        const r = hasHeader(o, /HX-Refresh:/i) && o.getResponseHeader("HX-Refresh") === "true";
        if (hasHeader(o, /HX-Redirect:/i)) {
            i.keepIndicators = true;
            location.href = o.getResponseHeader("HX-Redirect");
            r && location.reload();
            return;
        }
        if (r) {
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
        const u = determineHistoryUpdates(s, i);
        const n = resolveResponseHandling(o);
        const c = n.swap;
        let f = !!n.error;
        let h = htmx.config.ignoreTitle || n.ignoreTitle;
        let p = n.select;
        if (n.target) {
            i.target = asElement(querySelectorExt(s, n.target));
        }
        var d = e.swapOverride;
        if (d == null && n.swapOverride) {
            d = n.swapOverride;
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
            shouldSwap: c,
            serverResponse: m,
            isError: f,
            ignoreTitle: h,
            selectOverride: p,
            swapOverride: d
        }, i);
        if (n.event && !triggerEvent(a, n.event, g)) return;
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
            if (u.type) {
                saveCurrentPageToHistory();
            }
            var b = getSwapSpecification(s, d);
            if (!b.hasOwnProperty("ignoreTitle")) {
                b.ignoreTitle = h;
            }
            a.classList.add(htmx.config.swappingClass);
            let r = null;
            let n = null;
            if (l) {
                p = l;
            }
            if (hasHeader(o, /HX-Reselect:/i)) {
                p = o.getResponseHeader("HX-Reselect");
            }
            const v = getClosestAttributeValue(s, "hx-select-oob");
            const y = getClosestAttributeValue(s, "hx-select");
            let e = function() {
                try {
                    if (u.type) {
                        triggerEvent(getDocument().body, "htmx:beforeHistoryUpdate", mergeObjects({
                            history: u
                        }, i));
                        if (u.type === "push") {
                            pushUrlIntoHistory(u.path);
                            triggerEvent(getDocument().body, "htmx:pushedIntoHistory", {
                                path: u.path
                            });
                        } else {
                            replaceUrlInHistory(u.path);
                            triggerEvent(getDocument().body, "htmx:replacedInHistory", {
                                path: u.path
                            });
                        }
                    }
                    swap(a, m, b, {
                        select: p || y,
                        selectOOB: v,
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
                            maybeCall(r);
                        }
                    });
                } catch (e) {
                    triggerErrorEvent(s, "htmx:swapError", i);
                    maybeCall(n);
                    throw e;
                }
            };
            let t = htmx.config.globalViewTransitions;
            if (b.hasOwnProperty("transition")) {
                t = b.transition;
            }
            if (t && triggerEvent(s, "htmx:beforeTransition", i) && typeof Promise !== "undefined" && document.startViewTransition) {
                const E = new Promise(function(e, t) {
                    r = e;
                    n = t;
                });
                const x = e;
                e = function() {
                    document.startViewTransition(function() {
                        x();
                        return E;
                    });
                };
            }
            if (b.swapDelay > 0) {
                getWindow().setTimeout(e, b.swapDelay);
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
            transformResponse: function(e, t, r) {
                return e;
            },
            isInlineSwap: function(e) {
                return false;
            },
            handleSwap: function(e, t, r, n) {
                return false;
            },
            encodeParameters: function(e, t, r) {
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
    function getExtensions(e, r, n) {
        if (r == undefined) {
            r = [];
        }
        if (e == undefined) {
            return r;
        }
        if (n == undefined) {
            n = [];
        }
        const t = getAttributeValue(e, "hx-ext");
        if (t) {
            forEach(t.split(","), function(e) {
                e = e.replace(/ /g, "");
                if (e.slice(0, 7) == "ignore:") {
                    n.push(e.slice(7));
                    return;
                }
                if (n.indexOf(e) < 0) {
                    const t = extensions[e];
                    if (t && r.indexOf(t) < 0) {
                        r.push(t);
                    }
                }
            });
        }
        return getExtensions(asElement(parentElt(e)), r, n);
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
            const r = getInternalData(t);
            if (r && r.xhr) {
                r.xhr.abort();
            }
        });
        const r = window.onpopstate ? window.onpopstate.bind(window) : null;
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
                if (r) {
                    r(e);
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
    const C = function() {
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
                    const r = [ "ERROR", "WARN", "INFO", "DEBUG" ][e];
                    switch (r) {
                      case "ERROR":
                        console.error(`FlowPlater [${r}]:`, ...t);
                        break;

                      case "WARN":
                        console.warn(`FlowPlater [${r}]:`, ...t);
                        break;

                      case "DEBUG":
                        console.debug(`FlowPlater [${r}]:`, ...t);
                        break;

                      default:
                        console.log(`FlowPlater [${r}]:`, ...t);
                    }
                }
            },
            error: function(...e) {
                this.log(this.levels.ERROR, ...e);
            },
            warn: function(...e) {
                this.log(this.levels.WARN, ...e);
            },
            info: function(...e) {
                this.log(this.levels.INFO, ...e);
            },
            debug: function(...e) {
                this.log(this.levels.DEBUG, ...e);
            }
        };
    }();
    class p extends Error {
        constructor(e, t) {
            super(e);
            this.name = "FlowPlaterError";
            this.stack = t;
        }
    }
    class _ extends p {
        constructor(e, t) {
            super(e);
            this.name = "TemplateError";
            this.stack = t;
        }
    }
    const O = function() {
        const i = new Map();
        return {
            subscribe(e, t, r = null) {
                if (!e || typeof e !== "string") {
                    p("Invalid event name. Event name must be a non-empty string.");
                }
                if (!t || typeof t !== "function") {
                    p(`Invalid callback for event "${e}". Callback must be a function.`);
                }
                if (!i.has(e)) {
                    i.set(e, []);
                }
                i.get(e).push({
                    callback: t,
                    context: r
                });
                C.debug(`Subscribed to event: ${e}`);
                return () => this.unsubscribe(e, t);
            },
            unsubscribe(e, t) {
                if (!e || typeof e !== "string") {
                    p("Invalid event name. Event name must be a non-empty string. If you are trying to unsubscribe from all events, use unsubscribeAll() instead.");
                }
                if (!i.has(e)) return;
                const r = i.get(e);
                i.set(e, r.filter(e => e.callback !== t));
            },
            unsubscribeAll() {
                i.clear();
                C.info("Cleared all event subscribers");
            },
            publish(r, n) {
                if (!i.has(r)) return;
                i.get(r).forEach(({
                    callback: e,
                    context: t
                }) => {
                    try {
                        e.call(t, n);
                    } catch (e) {
                        C.error(`Error in event subscriber for ${r}:`, e);
                    }
                });
                if (n && n.instanceName) {
                    const s = `${n.instanceName}:${r}`;
                    if (i.has(s)) {
                        i.get(s).forEach(({
                            callback: e,
                            context: t
                        }) => {
                            try {
                                e.call(t, n);
                            } catch (e) {
                                C.error(`Error in instance event subscriber for ${s}:`, e);
                            }
                        });
                    }
                }
            }
        };
    }();
    const I = {
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
        return I.instances[e];
    }
    function P() {
        return I.instances;
    }
    const T = {
        marks: {},
        start: function(e) {
            this.marks[e] = performance.now();
        },
        end: function(e) {
            if (!this.marks[e]) return;
            const t = performance.now() - this.marks[e];
            delete this.marks[e];
            C.debug(`${e} took ${t.toFixed(2)}ms`);
            return t;
        }
    };
    const d = {
        isReady: false,
        queue: [],
        plugins: new Set(),
        hasPluginsRegistered: false,
        processQueue() {
            C.debug(`Processing ${this.queue.length} queued operations`);
            while (this.queue.length > 0) {
                const e = this.queue.shift();
                try {
                    e();
                } catch (e) {
                    C.error("Error processing queued operation:", e);
                }
            }
        },
        enqueue(e) {
            if (this.isReady) {
                try {
                    e();
                } catch (e) {
                    C.error("Error executing operation:", e);
                }
            } else {
                this.queue.push(e);
            }
        },
        markReady() {
            if (this.plugins.size === 0 && !this.hasPluginsRegistered) {
                C.info("No plugins registered, proceeding with initialization");
            }
            this.isReady = true;
            this.processQueue();
        },
        registerPlugin(e) {
            this.hasPluginsRegistered = true;
            this.plugins.add(e);
            C.debug(`Plugin registered: ${e}, total plugins: ${this.plugins.size}`);
        },
        unregisterPlugin(e) {
            const t = this.plugins.delete(e);
            if (t) {
                C.debug(`Plugin unregistered: ${e}, remaining plugins: ${this.plugins.size}`);
                if (this.plugins.size === 0) {
                    this.hasPluginsRegistered = false;
                    C.debug("All plugins unregistered, reset plugin registration state");
                }
            } else {
                C.warn(`Attempted to unregister non-existent plugin: ${e}`);
            }
            return t;
        },
        reset(e = true) {
            this.isReady;
            this.queue = [];
            this.plugins.clear();
            this.hasPluginsRegistered = false;
            if (!e) {
                this.isReady = false;
                C.info("ReadyState completely reset, FlowPlater needs re-initialization");
            } else {
                C.info("ReadyState reset but maintains ready status for new plugins");
            }
        },
        cleanup() {
            this.reset(false);
            C.info("FlowPlater ReadyState cleaned up completely");
        }
    };
    const m = {
        parseVersion(e) {
            return e.split(".").map(Number);
        },
        compareVersions(e, t) {
            const r = this.parseVersion(e);
            const n = this.parseVersion(t);
            for (let e = 0; e < 3; e++) {
                if (r[e] > n[e]) return 1;
                if (r[e] < n[e]) return -1;
            }
            return 0;
        },
        satisfiesVersion(e, t) {
            if (!e || !t) return false;
            const [ r, n ] = e.split("@");
            if (!n) return true;
            return this.compareVersions(t, n) >= 0;
        }
    };
    const N = {
        plugins: new Map(),
        globalMethods: new Map(),
        instanceMethods: new Map(),
        registerPlugin(e) {
            if (typeof e === "string") {
                e = window[e];
            }
            if (!e) {
                throw new p(`Plugin not found: ${e}`);
            }
            if (typeof e !== "function") {
                throw new p("Plugin must be a valid function");
            }
            const t = e();
            const r = [ "name", "enabled", "priority", "version" ];
            for (const n of r) {
                if (!(n in t.config)) {
                    throw new p(`Plugin config must contain '${n}'`);
                }
            }
            if (!/^\d+\.\d+\.\d+$/.test(t.config.version)) {
                throw new p(`Plugin version must be in format 'x.y.z' (got ${t.config.version})`);
            }
            if (this.plugins.has(t.config.name)) {
                throw new p(`Plugin ${t.config.name} already registered`);
            }
            if (t.config.dependencies) {
                for (const s of t.config.dependencies) {
                    const [ i, o ] = s.split("@");
                    const a = this.getPlugin(i);
                    if (!a) {
                        throw new p(`Required dependency '${i}' not found for plugin ${t.config.name}`);
                    }
                    if (!m.satisfiesVersion(s, a.config.version)) {
                        throw new p(`Plugin ${t.config.name} requires ${i} version ${o || "any"}, but found version ${a.config.version}`);
                    }
                }
            }
            if (t.config.optionalDependencies) {
                for (const s of t.config.optionalDependencies) {
                    const [ i, o ] = s.split("@");
                    const a = this.getPlugin(i);
                    if (a && !m.satisfiesVersion(s, a.config.version)) {
                        C.warn(`Optional dependency '${i}' version mismatch for plugin ${t.config.name}. Required: ${o || "any"}, Found: ${a.config.version}`);
                    }
                }
            }
            d.registerPlugin(t.config.name);
            if (t.globalMethods) {
                for (const [ l, u ] of Object.entries(t.globalMethods)) {
                    if (typeof u !== "function") {
                        throw new p(`Global method ${l} must be a function`);
                    }
                    if (this.globalMethods.has(l)) {
                        const c = this.globalMethods.get(l);
                        throw new p(`Global method ${l} already registered by plugin ${c.plugin}`);
                    }
                    this.globalMethods.set(l, {
                        method: u,
                        plugin: t.config.name
                    });
                    if (typeof window !== "undefined" && window.FlowPlater) {
                        window.FlowPlater[l] = (...e) => this.executeGlobalMethod(l, ...e);
                    }
                }
            }
            if (t.instanceMethods) {
                for (const [ l, u ] of Object.entries(t.instanceMethods)) {
                    if (typeof u !== "function") {
                        throw new p(`Instance method ${l} must be a function`);
                    }
                    if (this.instanceMethods.has(l)) {
                        const c = this.instanceMethods.get(l);
                        throw new p(`Instance method ${l} already registered by plugin ${c.plugin}`);
                    }
                    this.instanceMethods.set(l, {
                        method: u,
                        plugin: t.config.name
                    });
                }
            }
            if (t.helpers && typeof t.helpers === "object") {
                for (const [ f, h ] of Object.entries(t.helpers)) {
                    if (typeof h !== "function") {
                        C.warn(`Plugin ${t.config.name} contains invalid helper ${f}:`, h);
                        continue;
                    }
                    try {
                        Handlebars.registerHelper(f.toLowerCase(), h);
                    } catch (e) {
                        C.error(`Plugin ${t.config.name} failed registering helper ${f}:`, e);
                    }
                }
            }
            this.plugins.set(t.config.name, t);
            if (!d.isReady) {
                d.queue.push(() => {
                    if (t.config?.enabled && typeof t.init === "function") {
                        t.init();
                    }
                    this.updateExistingInstances();
                    if (t.hooks?.initComplete) {
                        try {
                            t.hooks.initComplete(window.FlowPlater, Object.values(I.instances));
                        } catch (e) {
                            C.error(`Plugin ${t.config.name} failed executing initComplete:`, e);
                        }
                    }
                });
            } else {
                if (t.config?.enabled && typeof t.init === "function") {
                    t.init();
                }
                this.updateExistingInstances();
                if (t.hooks?.initComplete) {
                    try {
                        t.hooks.initComplete(window.FlowPlater, Object.values(I.instances));
                    } catch (e) {
                        C.error(`Plugin ${t.config.name} failed executing initComplete:`, e);
                    }
                }
            }
            return t;
        },
        updateExistingInstances() {
            const e = Object.values(I.instances);
            e.forEach(t => {
                for (const [ r, e ] of this.instanceMethods.entries()) {
                    if (!t[r]) {
                        t[r] = (...e) => this.executeInstanceMethod(r, t, ...e);
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
            const r = new Set();
            for (const [ s, i ] of this.instanceMethods.entries()) {
                if (i.plugin === e) {
                    r.add(s);
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
            const n = Object.values(I.instances);
            n.forEach(t => {
                r.forEach(e => {
                    delete t[e];
                });
            });
            d.unregisterPlugin(e);
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
                const r = e.config?.priority || 0;
                const n = t.config?.priority || 0;
                return n - r;
            });
        },
        _determineDataType(e) {
            if (typeof e === "object" && e !== null) {
                return "json";
            }
            if (typeof e === "string") {
                try {
                    JSON.parse(e);
                    return "json";
                } catch (e) {
                    return "html";
                }
            }
            return "json";
        },
        applyTransformations(n, e, s, i = "json") {
            const t = this.getSortedPlugins();
            return t.reduce((t, r) => {
                if (r.transformers && typeof r.transformers[s] === "function") {
                    try {
                        const e = r.transformers[s](n, t, i);
                        if (e === undefined || e === null) {
                            C.warn(`Plugin ${r.config.name} returned undefined/null for ${s}, using original data`);
                            return t;
                        }
                        if (t instanceof Event && e instanceof Event) {
                            Object.assign(t.detail, e.detail);
                            return t;
                        }
                        return e;
                    } catch (e) {
                        C.error(`Plugin ${r.config.name} failed executing ${s} transformation:`, e);
                        return t;
                    }
                }
                return t;
            }, e);
        },
        executeHook(t, ...e) {
            C.debug("[PLUGIN] Executing hook:", t, e);
            const r = this.getSortedPlugins();
            let n = e[0];
            for (const s of r) {
                if (s.hooks?.[t]) {
                    try {
                        const i = s.hooks[t](...e);
                        if (i !== undefined) {
                            n = i;
                            e[0] = n;
                        } else {
                            C.warn(`Plugin ${s.config.name} returned undefined for ${t}`, e[0]);
                            n = e[0];
                        }
                    } catch (e) {
                        C.error(`Plugin ${s.config.name} failed executing ${t}:`, e);
                    }
                }
            }
            return n;
        },
        executeGlobalMethod(e, ...t) {
            const r = this.globalMethods.get(e);
            if (!r) {
                throw new p(`Global method ${e} not found`);
            }
            const n = this.getPlugin(r.plugin);
            if (!n || !n.config?.enabled) {
                throw new p(`Plugin ${r.plugin} is not enabled`);
            }
            return r.method(n, ...t);
        },
        executeInstanceMethod(e, t, ...r) {
            const n = this.instanceMethods.get(e);
            if (!n) {
                throw new p(`Instance method ${e} not found`);
            }
            const s = this.getPlugin(n.plugin);
            if (!s || !s.config?.enabled) {
                throw new p(`Plugin ${n.plugin} is not enabled`);
            }
            return n.method(t, ...r);
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
            e.forEach(e => d.unregisterPlugin(e.config.name));
            this.plugins.clear();
            this.globalMethods.clear();
            this.instanceMethods.clear();
            C.info("All plugins destroyed, FlowPlater remains ready for new plugins");
        }
    };
    class A {
        constructor(e) {
            this.cache = new Map();
            this.original = e;
        }
        apply(...e) {
            const t = JSON.stringify(e);
            if (this.cache.has(t)) {
                C.debug("Cache hit:", t);
                return this.cache.get(t);
            }
            C.debug("Cache miss:", t);
            const r = this.original.apply(this, e);
            this.cache.set(t, r);
            return r;
        }
    }
    function $(e) {
        const t = new A(e);
        const r = (...e) => t.apply(...e);
        r.original = t.original;
        r.cache = t.cache;
        return r;
    }
    const e = [ {
        tag: "fpselect",
        replaceWith: "select"
    } ];
    let g = e;
    function t(e) {
        g = e;
    }
    function F(e) {
        let t = false;
        for (const r of g) {
            const n = e.getElementsByTagName(r.tag);
            if (n.length > 0) {
                t = true;
                const s = Array.from(n);
                for (const i of s) {
                    const o = document.createElement(r.replaceWith);
                    o.innerHTML = i.innerHTML;
                    for (const a of i.attributes) {
                        o.setAttribute(a.name, a.value);
                    }
                    i.parentNode.replaceChild(o, i);
                }
            }
        }
        if (t) {
            C.info("replaced custom tags", e);
        }
        return e;
    }
    function H(e, t = false) {
        if (!t) {
            return n(e);
        }
        delete I.templateCache[e];
        const r = n.original(e);
        n.cache.set(JSON.stringify([ e ]), r);
        return r;
    }
    const n = $(function(t) {
        T.start("compile:" + t);
        const f = Handlebars.helpers;
        const e = t.startsWith("#") ? t : "#" + t;
        var r = document.querySelector(e);
        C.debug("Trying to compile template: " + t);
        if (!r) {
            C.error("Template not found: " + t);
            T.end("compile:" + t);
            return null;
        }
        if (!I.templateCache[t] || r.hasAttribute("fp-dynamic") && r.getAttribute("fp-dynamic") !== "false") {
            C.debug("compiling template: " + t);
            function h(t) {
                let r = t.tagName.toLowerCase();
                g.forEach(e => {
                    if (r === e.tag) {
                        r = e.replaceWith;
                    }
                });
                let n = "";
                for (let e of t.attributes) {
                    n += ` ${e.name}="${e.value}"`;
                }
                return `<${r}${n}>`;
            }
            function p(e) {
                let c = "";
                e.childNodes.forEach(r => {
                    if (r.nodeType === Node.TEXT_NODE) {
                        c += r.textContent;
                    } else if (r.nodeType === Node.ELEMENT_NODE) {
                        let e = r.tagName.toLowerCase();
                        if (r.hasAttribute("fp") || e in f) {
                            const t = e;
                            const n = r.getAttribute("fp") ? r.getAttribute("fp").split(" ").map(e => e.replace(/&quot;/g, '"')).join(" ") : "";
                            const s = p(r);
                            if (t === "log" || t === "lookup" || t === "execute") {
                                if (s) {
                                    c += `{{${t} ${s} ${n}}}`;
                                } else {
                                    c += `{{${t} ${n}}}`;
                                }
                            } else if (t === "comment") {
                                c += `{{!-- ${n} --}}`;
                            } else if (t === "if") {
                                const i = n.replace(/"/g, '\\"');
                                c += `{{#${t} "${i}"}}${s}{{/${t}}}`;
                            } else if (t === "else") {
                                c += `{{${t}}}${s}`;
                            } else if (t === "math") {
                                if (s) {
                                    C.warn(`FlowPlater: The <${t}> helper does not accept inner content.`);
                                }
                                c += `{{#${t} "${n}"}}`;
                            } else {
                                c += `{{#${t} ${n}}}${s}{{/${t}}}`;
                            }
                        } else if (r.tagName === "else") {
                            const s = p(r);
                            c += `{{${r.tagName.toLowerCase()}}}${s}`;
                        } else if (r.tagName === "template" || r.tagName === "fptemplate" || r.hasAttribute("fp-template")) {
                            c += r.outerHTML;
                        } else {
                            const o = p(r);
                            const a = h(r);
                            const l = r.getAttribute("fp-val");
                            let e = o;
                            if (l) {
                                e = `{{{default ${l} "${o.replace(/"/g, '\\"')}"}}}`;
                            }
                            let t = r.tagName.toLowerCase();
                            g.forEach(e => {
                                if (t === e.tag) {
                                    t = e.replaceWith;
                                }
                            });
                            const u = `</${t}>`;
                            c += `${a}${e}${u}`;
                        }
                    }
                });
                return c;
            }
            const n = p(r);
            C.debug("Compiling Handlebars template: " + n);
            try {
                const s = Handlebars.compile(n);
                const i = I.config?.templates?.cacheSize || 100;
                if (Object.keys(I.templateCache).length >= i) {
                    const o = Object.keys(I.templateCache)[0];
                    delete I.templateCache[o];
                    C.info("Cache limit reached. Removed template: " + o);
                }
                I.templateCache[t] = s;
                T.end("compile:" + t);
                return s;
            } catch (e) {
                C.error("Template not valid: " + n + " | Error: " + e.message);
                T.end("compile:" + t);
                return null;
            }
        }
        T.end("compile:" + t);
        return I.templateCache[t];
    });
    function R(e, r, n = "") {
        C.debug(`Storage config:`, I.config?.storage);
        if (!I.config?.storage?.enabled) {
            C.debug(`Storage is disabled, skipping save`);
            return false;
        }
        try {
            const s = n ? `fp_${n}_${e}` : `fp_${e}`;
            let t;
            try {
                t = JSON.parse(JSON.stringify(r));
            } catch (e) {
                C.error(`Failed to serialize data for localStorage: ${e.message}`);
                t = {};
            }
            const i = {
                data: t,
                expiry: Date.now() + 7 * 24 * 60 * 60 * 1e3
            };
            C.debug(`Saving to localStorage:`, {
                key: s,
                data: i
            });
            localStorage.setItem(s, JSON.stringify(i));
            return true;
        } catch (e) {
            C.error(`Failed to save to localStorage: ${e.message}`);
            return false;
        }
    }
    function L(e, t = "") {
        C.debug(`Storage config:`, I.config?.storage);
        if (!I.config?.storage?.enabled) {
            C.debug(`Storage is disabled, skipping load`);
            return null;
        }
        try {
            const r = t ? `fp_${t}_${e}` : `fp_${e}`;
            const n = localStorage.getItem(r);
            if (!n) {
                C.debug(`No stored item found for: ${r}`);
                return null;
            }
            const s = JSON.parse(n);
            if (s.expiry && s.expiry < Date.now()) {
                C.debug(`Stored item has expired: ${r}`);
                localStorage.removeItem(r);
                return null;
            }
            C.debug(`Loaded from localStorage:`, {
                key: r,
                data: s
            });
            return s.data;
        } catch (e) {
            C.error(`Failed to load from localStorage: ${e.message}`);
            return null;
        }
    }
    const u = {
        isRestoringFormStates: false,
        restoreFormStates(e, t) {
            try {
                if (this.isRestoringFormStates) {
                    C.debug("Already restoring form states, skipping");
                    return;
                }
                this.isRestoringFormStates = true;
                const r = e.getElementsByTagName("form");
                Array.from(r).forEach(e => this.restoreSingleFormState(e, t));
            } catch (e) {
                C.error(`Error restoring form states: ${e.message}`);
            } finally {
                this.isRestoringFormStates = false;
            }
        },
        restoreSingleFormState(e, t) {
            if (!e.id) return false;
            const r = this.handleFormStorage(e, null, "load");
            if (!r) {
                C.debug(`No stored state found for form: ${e.id}`);
                return false;
            }
            const n = this.collectDebugInfo(e, "restore", {
                restoredElements: [],
                customVisualUpdates: [],
                skippedElements: [],
                storageType: this.shouldUseLocalStorage(e) ? "localStorage" : "sessionStorage"
            });
            this.processFormElements(e, e => {
                if (!(e.name in r)) return;
                n.restoredElements.push({
                    name: e.name,
                    value: r[e.name]
                });
                this.restoreElementValue(e, r[e.name]);
            });
            C.debug(`Form state restoration summary for ${e.id}`, {
                storageType: n.storageType,
                source: t || "unknown",
                restoredElements: n.restoredElements.map(e => ({
                    name: e.name,
                    value: e.value
                })),
                updatedCustomVisualStates: n.customVisualUpdates,
                skippedElements: n.skippedElements
            });
            O.publish("formState:afterRestore", {
                formId: e.id,
                formElement: e,
                state: r,
                source: t || "unknown"
            });
            return true;
        },
        clearFormState(e) {
            try {
                const t = document.getElementById(e);
                if (!t) return;
                this.handleFormStorage(t, null, "clear");
                O.publish("formState:clear", {
                    formId: e,
                    formElement: t
                });
            } catch (e) {
                C.error(`Error clearing form state: ${e.message}`);
            }
        },
        collectDebugInfo(e, t, r = {}) {
            return {
                formId: e.id,
                type: t,
                persistenceEnabled: this.isPersistenceEnabledForElement(e),
                ...r
            };
        },
        handleFormStorage(e, t, r = "save") {
            const n = this.shouldUseLocalStorage(e);
            const s = `fp_form_${e.id}`;
            if (r === "save") {
                if (n) {
                    R(e.id, t, "form");
                } else {
                    sessionStorage.setItem(s, JSON.stringify(t));
                }
            } else if (r === "load") {
                return n ? L(e.id, "form") : JSON.parse(sessionStorage.getItem(s));
            } else if (r === "clear") {
                if (n) localStorage.removeItem(s);
                sessionStorage.removeItem(s);
            }
        },
        processFormElements(e, t) {
            Array.from(e.elements).forEach(e => {
                if (!e.name || e.type === "file") return;
                if (!this.isPersistenceEnabledForElement(e)) return;
                t(e);
            });
        },
        restoreElementValue(e, t) {
            if (e.type === "checkbox" || e.type === "radio") {
                e.checked = t;
                this.updateCustomVisualState(e);
            } else if (e instanceof HTMLSelectElement && e.multiple) {
                Array.from(e.options).forEach(e => {
                    e.selected = t.includes(e.value);
                });
            } else {
                e.value = t;
            }
        },
        updateCustomVisualState(e) {
            const t = e.closest(e.type === "checkbox" ? ".w-checkbox" : ".w-radio");
            if (!t) return;
            const r = t.querySelector(`.w-${e.type}-input`);
            if (r) {
                r.checked = e.checked;
            }
        },
        isPersistenceEnabledForElement(e) {
            if (e.hasAttribute("fp-persist")) {
                return e.getAttribute("fp-persist") !== "false";
            }
            const t = e.closest("form");
            if (t && t.hasAttribute("fp-persist")) {
                return t.getAttribute("fp-persist") !== "false";
            }
            const r = e.closest("[fp-persist]");
            if (r) {
                return r.getAttribute("fp-persist") !== "false";
            }
            return I.config?.persistForm !== false;
        },
        shouldUseLocalStorage(e) {
            return e.hasAttribute("fp-persist-local") || I.config?.storage?.enabled === true;
        },
        shouldRestoreForm(e) {
            const t = e.querySelectorAll('[fp-persist="true"]');
            if (t.length > 0) {
                return true;
            }
            if (e.tagName === "FORM" && e.hasAttribute("fp-persist")) {
                return e.getAttribute("fp-persist") !== "false";
            }
            const r = e.closest("form");
            if (r) {
                if (r.getAttribute("fp-persist") === "false") {
                    return false;
                }
                const s = r.elements;
                for (const i of s) {
                    if (!i.name || i.type === "file") continue;
                    const o = i.closest('[fp-persist="false"]');
                    if (o) {
                        continue;
                    }
                    return true;
                }
            }
            const n = e.getElementsByTagName("form");
            for (const a of n) {
                if (this.shouldRestoreForm(a)) {
                    return true;
                }
            }
            return false;
        }
    };
    function c(e, t, r = {}) {
        return {
            formId: e.id,
            type: t,
            persistenceEnabled: s(e),
            ...r
        };
    }
    function q(e, t, r = "save") {
        const n = h(e);
        const s = `fp_form_${e.id}`;
        if (r === "save") {
            if (n) {
                R(e.id, t, "form");
            } else {
                sessionStorage.setItem(s, JSON.stringify(t));
            }
        } else if (r === "load") {
            return n ? L(e.id, "form") : JSON.parse(sessionStorage.getItem(s));
        } else if (r === "clear") {
            if (n) localStorage.removeItem(s);
            sessionStorage.removeItem(s);
        }
    }
    function f(e, t) {
        Array.from(e.elements).forEach(e => {
            if (!e.name || e.type === "file") return;
            if (!s(e)) return;
            t(e);
        });
    }
    function B(t, e, r, n = "add") {
        const s = e === "change" ? [ "change", t.type !== "checkbox" && t.type !== "radio" ? "input" : null ] : [ e ];
        s.filter(Boolean).forEach(e => {
            t[`${n}EventListener`](e, r);
        });
    }
    function j(e, t) {
        if (e.type === "checkbox" || e.type === "radio") {
            e.checked = t;
            V(e);
        } else if (e instanceof HTMLSelectElement && e.multiple) {
            Array.from(e.options).forEach(e => {
                e.selected = t.includes(e.value);
            });
        } else {
            e.value = t;
        }
    }
    function V(e) {
        const t = e.closest(e.type === "checkbox" ? ".w-checkbox" : ".w-radio");
        if (!t) return;
        const r = t.querySelector(`.w-${e.type}-input`);
        if (r) {
            r.classList.toggle("w--redirected-checked", e.checked);
        }
    }
    function U(e) {
        let t = false;
        let r = false;
        if (e.hasAttribute("fp-persist")) {
            t = e.getAttribute("fp-persist") !== "false";
            r = e.getAttribute("fp-persist") === "true";
        } else {
            const n = e.form;
            if (n && n.hasAttribute("fp-persist")) {
                t = n.getAttribute("fp-persist") !== "false";
                r = n.getAttribute("fp-persist") === "true";
            } else if (I.config?.storage?.enabled && !I.config?.persistForm) {
                t = false;
                r = false;
            } else {
                t = I.config?.persistForm;
                r = I.config?.storage?.enabled && I.config?.persistForm;
            }
        }
        if (e.tagName === "FORM") {
            const s = Array.from(e.elements).some(e => e.getAttribute("fp-persist") === "true");
            if (s) {
                r = I.config?.storage?.enabled;
            }
        }
        return {
            shouldPersist: t,
            useLocalStorage: r && I.config?.storage?.enabled
        };
    }
    function s(e) {
        return U(e).shouldPersist;
    }
    function h(e) {
        return U(e).useLocalStorage;
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
            C.error(`Error capturing element state: ${e.message}`);
            return null;
        }
    }
    function J(r, e) {
        try {
            if (!e) return;
            if (r instanceof HTMLSelectElement) {
                if (e.selected) {
                    if (r.multiple && Array.isArray(e.selected)) {
                        e.selected.forEach(e => {
                            const t = r.querySelector(`option[value="${e}"]`);
                            if (t) t.selected = true;
                        });
                    } else {
                        const t = r.querySelector(`option[value="${e.selected}"]`);
                        if (t) {
                            t.selected = true;
                            r.value = e.selected;
                        }
                    }
                }
            } else if (r instanceof HTMLTextAreaElement) {
                r.value = e.value;
                if (e.selectionStart !== null && e.selectionEnd !== null) {
                    r.setSelectionRange(e.selectionStart, e.selectionEnd);
                }
                if (e.scrollTop !== null) r.scrollTop = e.scrollTop;
                if (e.scrollLeft !== null) r.scrollLeft = e.scrollLeft;
            } else {
                r.value = e.value;
                r.checked = e.checked;
            }
        } catch (e) {
            C.error(`Error restoring element state: ${e.message}`);
        }
    }
    function z(t, e) {
        try {
            Array.from(e.attributes).forEach(e => {
                if (e.name !== "value" && e.name !== "checked" && !e.name.startsWith("w-")) {
                    t.setAttribute(e.name, e.value);
                }
            });
        } catch (e) {
            C.error(`Error updating element attributes: ${e.message}`);
        }
    }
    function X(e, t) {
        try {
            if (e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement) {
                const r = W(e);
                z(e, t);
                J(e, r);
            }
        } catch (e) {
            C.error(`Error preserving element state: ${e.message}`);
        }
    }
    function G(e) {
        try {
            const t = e.getElementsByTagName("form");
            const n = {};
            Array.from(t).forEach(e => {
                if (!e.id) return;
                const t = {};
                const r = e.elements;
                Array.from(r).forEach(e => {
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
                    O.publish("formState:beforeCapture", {
                        formId: e.id,
                        formElement: e,
                        state: t
                    });
                    n[e.id] = t;
                    if (h(e)) {
                        R(e.id, t, "form");
                    } else {
                        sessionStorage.setItem(`fp_form_${e.id}`, JSON.stringify(t));
                    }
                }
            });
            return n;
        } catch (e) {
            C.error(`Error capturing form states: ${e.message}`);
            return {};
        }
    }
    function K(e, t) {
        if (!e.id) return false;
        const r = q(e, null, "load");
        if (!r) {
            C.debug(`No stored state found for form: ${e.id}`);
            return false;
        }
        const n = c(e, "restore", {
            restoredElements: [],
            customVisualUpdates: [],
            skippedElements: [],
            storageType: h(e) ? "localStorage" : "sessionStorage"
        });
        f(e, e => {
            if (!(e.name in r)) return;
            n.restoredElements.push({
                name: e.name,
                value: r[e.name]
            });
            j(e, r[e.name]);
        });
        C.debug(`Form state restoration summary for ${e.id}`, {
            storageType: n.storageType,
            source: t || "unknown",
            restoredElements: n.restoredElements.map(e => ({
                name: e.name,
                value: e.value
            })),
            updatedCustomVisualStates: n.customVisualUpdates,
            skippedElements: n.skippedElements
        });
        O.publish("formState:afterRestore", {
            formId: e.id,
            formElement: e,
            state: r,
            source: t || "unknown"
        });
        return true;
    }
    function Y(e) {
        u.clearFormState(e);
    }
    function Q(r) {
        try {
            if (!r.id) {
                C.debug("Skipping form without ID");
                return;
            }
            const n = c(r, "setup", {
                formElements: r.elements.length,
                checkboxWrappers: r.querySelectorAll(".w-checkbox").length,
                listenersAdded: [],
                skippedElements: []
            });
            if (!r._fpChangeListeners) {
                r._fpChangeListeners = [];
            }
            f(r, t => {
                if (r._fpChangeListeners.some(({
                    element: e
                }) => e === t)) {
                    return;
                }
                const e = e => ee(e);
                B(t, "change", e);
                r._fpChangeListeners.push({
                    element: t,
                    handler: e
                });
                n.listenersAdded.push(t.name);
            });
            C.debug(`Form setup summary for ${r.id}`, {
                totalFormElements: n.formElements,
                checkboxWrappers: n.checkboxWrappers,
                formPersistence: n.persistenceEnabled ? "enabled" : "disabled",
                listenersAdded: n.listenersAdded.join(", "),
                skippedElements: n.skippedElements.join(", ")
            });
        } catch (e) {
            C.error(`Error setting up form change listeners: ${e.message}`);
        }
    }
    function Z(e) {
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
            C.error(`Error cleaning up form change listeners: ${e.message}`);
        }
    }
    function ee(e) {
        try {
            const n = e.target;
            const s = n.form;
            if (!s || !s.id) {
                C.debug("Skipping change handler - no form or form ID");
                return;
            }
            const i = c(s, "change", {
                changedValues: {},
                skippedElements: []
            });
            function t(e) {
                if (typeof e !== "string") return false;
                if (e.includes("{{") || e.includes("}}")) return true;
                if (e.includes("[[") || e.includes("]]")) return true;
                if (e.includes("this.")) return true;
                return false;
            }
            function r(e) {
                if (t(e.name)) return true;
                if (t(e.value)) return true;
                if (e.getAttribute("fp-bind")) return true;
                return false;
            }
            const o = {};
            f(s, e => {
                if (r(e)) {
                    i.skippedElements.push({
                        name: e.name,
                        reason: "Template binding detected",
                        value: e.value
                    });
                    return;
                }
                const t = e.type === "checkbox" || e.type === "radio" ? e.checked : e instanceof HTMLSelectElement && e.multiple ? Array.from(e.selectedOptions).map(e => e.value) : e.value;
                o[e.name] = t;
                i.changedValues[e.name] = t;
            });
            if (Object.keys(o).length > 0) {
                q(s, o, "save");
                C.debug("Form state update for " + s.id + ":", {
                    "Changed element": n.name,
                    "Storage type": h(s) ? "localStorage" : "sessionStorage",
                    "Updated values": i.changedValues,
                    "Skipped elements": i.skippedElements
                });
                let e = null;
                for (const [ a, l ] of Object.entries(I.instances)) {
                    if (Array.from(l.elements).some(e => e.contains(s) || s.contains(e) || e === s)) {
                        e = l;
                        break;
                    }
                }
                N.executeHook("updateForm", e, {
                    element: s,
                    id: s.id,
                    data: o,
                    changedElement: n
                });
                O.publish("formState:changed", {
                    formId: s.id,
                    formElement: s,
                    state: o,
                    changedElement: n
                });
            }
        } catch (e) {
            C.error(`Error handling form element change: ${e.message}`);
        }
    }
    function te(e) {
        const t = new Set();
        if (e.tagName === "FORM") {
            t.add(e);
        }
        const r = e.closest("form");
        if (r) {
            t.add(r);
        }
        const n = e.getElementsByTagName("form");
        Array.from(n).forEach(e => t.add(e));
        return t;
    }
    function b(e, t) {
        try {
            C.debug("Setting up form submit handlers for element:", e);
            const r = te(e);
            C.debug(`Found ${r.size} forms`);
            r.forEach(e => {
                re(e, t || "setupFormSubmitHandlers");
            });
        } catch (e) {
            C.error(`Error setting up form submit handlers: ${e.message}`);
        }
    }
    function re(e, t) {
        if (!e.id) {
            C.debug("Skipping form without ID");
            return;
        }
        C.debug(`Setting up handlers for form: ${e.id}`);
        e.removeEventListener("submit", ne);
        e.addEventListener("submit", ne);
        Q(e);
        e._fpHandlersSetup = true;
        if (ie(e)) {
            C.debug(`Restoring state for form: ${e.id}`);
            K(e, t || "setupSingleFormHandlers");
        } else {
            C.debug(`Skipping form restoration - no persistent elements: ${e.id}`);
        }
    }
    function ne(e) {
        try {
            const t = e.target;
            if (t.id) {
                Y(t.id);
            }
        } catch (e) {
            C.error(`Error handling form submit: ${e.message}`);
        }
    }
    function se(e) {
        try {
            const t = new MutationObserver(e => {
                e.forEach(e => {
                    e.addedNodes.forEach(e => {
                        if (e.tagName === "FORM") {
                            b(e);
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
            C.error(`Error setting up dynamic form observer: ${e.message}`);
            return null;
        }
    }
    function ie(e) {
        return u.shouldRestoreForm(e);
    }
    function oe(a, e, i, t) {
        if (!a.childNodes.length) {
            a.innerHTML = e.innerHTML;
            if (I.config?.persistForm) {
                b(a, "updateDOM - form state restoration - setupFormSubmitHandlers");
            }
            return;
        }
        if (a instanceof HTMLInputElement) {
            X(a, e);
            return;
        }
        const l = a instanceof SVGElement;
        if (ae(a)) {
            if (a instanceof HTMLIFrameElement || a instanceof HTMLScriptElement) {
                z(a, e);
            } else {
                X(a, e);
            }
            return;
        }
        if (!a.children.length && a.childNodes.length || !e.children.length && e.childNodes.length) {
            le(a, e);
            return;
        }
        if (I.config?.persistForm) {
            G(a);
        }
        const u = Array.from(a.childNodes);
        const r = Array.from(e.childNodes);
        if (u.length === 1 && r.length === 1 && u[0].nodeType === r[0].nodeType && u[0].nodeName === r[0].nodeName) {
            oe(u[0], r[0], i);
            return;
        }
        const c = new Set();
        r.forEach((e, t) => {
            if (e.nodeType === Node.ELEMENT_NODE) {
                const r = e.getAttribute("data-key");
                if (r) {
                    const n = i.get(r);
                    if (n) {
                        const s = u.indexOf(n);
                        if (s !== -1) {
                            a.insertBefore(n, u[t] || null);
                            c.add(s);
                        }
                    }
                }
            }
        });
        r.forEach((r, e) => {
            const t = u.findIndex((e, t) => !c.has(t) && ue(e, r));
            if (t !== -1) {
                c.add(t);
                const n = u[t];
                const s = Array.from(a.childNodes).indexOf(n);
                if (s !== e) {
                    const i = u[e];
                    if (i && i !== n) {
                        a.insertBefore(n, i);
                    }
                }
            } else {
                const o = l ? ce(r) : r.cloneNode(true);
                const i = u[e] || null;
                a.insertBefore(o, i);
            }
        });
        u.forEach((e, t) => {
            if (!c.has(t)) {
                a.removeChild(e);
            }
        });
    }
    function ae(e) {
        const t = [ "INPUT", "SELECT", "TEXTAREA", "IFRAME", "SCRIPT" ];
        return t.includes(e.tagName);
    }
    function le(n, e) {
        const t = Array.from(n.childNodes);
        const s = Array.from(e.childNodes);
        if (t.length === s.length) {
            t.forEach((e, t) => {
                const r = s[t];
                if (!ue(e, r)) {
                    n.replaceChild(r.cloneNode(true), e);
                }
            });
        } else {
            n.innerHTML = e.innerHTML;
        }
    }
    function ue(e, t) {
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
    function ce(e) {
        if (!(e instanceof Element)) return e.cloneNode(true);
        const t = e.namespaceURI;
        const r = t ? document.createElementNS(t, e.tagName) : document.createElement(e.tagName);
        Array.from(e.attributes).forEach(e => {
            const t = e.namespaceURI;
            if (t) {
                r.setAttributeNS(t, e.name, e.value);
            } else {
                r.setAttribute(e.name, e.value);
            }
        });
        Array.from(e.childNodes).forEach(e => {
            r.appendChild(ce(e));
        });
        return r;
    }
    async function D(i, o, a = false, l = null) {
        T.start("updateDOM");
        const e = i.hasAttribute("fp-restoring");
        if (e) {
            C.debug("Already restoring, skipping");
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
            C.debug("Starting updateDOM with config:", I.config);
            C.debug(`Form persistence enabled: ${I.config?.persistForm}, Should restore form: ${u.shouldRestoreForm(i)}`);
            let s = null;
            if (I.config?.persistForm && u.shouldRestoreForm(i)) {
                C.debug("Capturing form states before update");
                s = G(i);
                C.debug("Captured form states:", s);
            }
            let e = null;
            if (I.config?.persistForm && u.shouldRestoreForm(i)) {
                C.debug("Setting up dynamic form observer");
                e = se(i);
            }
            const t = () => {
                return new Promise(e => {
                    O.publish("beforeDomUpdate", {
                        element: i,
                        newHTML: o,
                        animate: a,
                        formStates: s
                    });
                    if (l) {
                        N.executeHook("beforeDomUpdate", l, {
                            element: i,
                            newHTML: o,
                            animate: a,
                            formStates: s
                        });
                    }
                    const t = document.createElement("div");
                    t.innerHTML = o.trim();
                    const r = new Map();
                    const n = new Map();
                    fe(i, r);
                    fe(t, n);
                    oe(i, t, r, n);
                    if (I.config?.persistForm && u.shouldRestoreForm(i) && s) {
                        C.debug("Restoring form states after update");
                        u.restoreFormStates(i, "updateDOM - form state restoration - restoreFormStates");
                        b(i, "updateDOM - form state restoration - setupFormSubmitHandlers");
                    }
                    if (l) {
                        N.executeHook("afterDomUpdate", l, {
                            element: i,
                            newHTML: o,
                            animate: a,
                            formStates: s
                        });
                    }
                    O.publish("afterDomUpdate", {
                        element: i,
                        newHTML: o,
                        animate: a,
                        formStates: s
                    });
                    e();
                });
            };
            if (document.startViewTransition && a) {
                await document.startViewTransition(() => t()).finished;
            } else {
                await t();
            }
            if (I.config?.persistForm && u.shouldRestoreForm(i)) {
                C.debug("Restoring form states after update");
                const r = i.querySelectorAll('[fp-persist="true"]');
                C.debug(`Found ${r.length} inputs to restore`);
                u.restoreFormStates(i, "updateDOM - final form state restoration - restoreFormStates");
                b(i, "updateDOM - final form state restoration - setupFormSubmitHandlers");
            }
            if (e) {
                C.debug("Disconnecting form observer");
                e.disconnect();
            }
        } catch (e) {
            C.error("Error in updateDOM:", e);
            console.error("UpdateDOM error:", e);
            throw e;
        } finally {
            i.removeAttribute("fp-restoring");
            T.end("updateDOM");
        }
    }
    function fe(e, t) {
        const r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, null, false);
        let n;
        while (n = r.nextNode()) {
            const s = n.getAttribute("data-key");
            if (s) {
                t.set(s, n);
            }
        }
    }
    function he(e) {
        if (e.startsWith("#") || e.startsWith(".")) {
            return true;
        }
        return /[[]>+~:()]/.test(e) || /^[a-z]+[a-z-]+$/i.test(e);
    }
    function pe(t, e = true) {
        if (!t) return null;
        try {
            if (he(t)) {
                const n = document.querySelector(t);
                if (n) {
                    const s = N.getPlugin("data-extractor");
                    if (s && typeof s.globalMethods.processHtml === "function") {
                        try {
                            const i = s.globalMethods.processHtml(n.outerHTML);
                            C.debug(`Extracted data from element "${t}":`, i);
                            return i;
                        } catch (e) {
                            C.error(`DataExtractor failed for "${t}": ${e.message}`);
                            return null;
                        }
                    } else {
                        C.warn("DataExtractor plugin not available for element extraction");
                        return null;
                    }
                }
            }
            const r = window[t];
            if (r !== undefined) {
                if (e && (typeof r !== "object" || r === null)) {
                    return {
                        [t]: r
                    };
                }
                return r;
            }
            C.warn(`Neither variable nor element found for "${t}"`);
            return null;
        } catch (e) {
            C.info(`Error extracting local data "${t}": ${e.message}`);
            return null;
        }
    }
    function de(c) {
        function t(e) {
            const t = I.instances[c];
            if (!t) {
                C.error("Instance not found: " + c);
                return undefined;
            }
            const r = e.split(/[\.\[\]'"]/);
            let n = t.data;
            for (let e = 0; e < r.length; e++) {
                const s = r[e];
                if (s === "") continue;
                if (n === undefined || n === null || !n.hasOwnProperty(s)) {
                    return undefined;
                }
                n = n[s];
            }
            return n;
        }
        function o(e) {
            if (typeof e === "string" && e.trim().startsWith("<!DOCTYPE")) {
                C.debug("Data is HTML, skipping validation", c);
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
            C.error("Invalid data type: " + typeof e);
            return {
                valid: false,
                isHtml: false
            };
        }
        return {
            instanceName: c,
            animate: I.defaults.animation,
            _updateDOM: function() {
                const r = I.instances[c];
                if (!r) {
                    C.error("Instance not found: " + c);
                    return;
                }
                const {
                    valid: e,
                    isHtml: t
                } = o(r.data);
                if (!e || t) {
                    return;
                }
                try {
                    let t;
                    if (r.templateId === "self" || r.templateId === null) {
                        const s = Array.from(r.elements)[0];
                        if (!s) {
                            C.error("No template element found for self template", r.instanceName);
                            return;
                        }
                        t = s.innerHTML;
                    } else if (!r.template) {
                        C.error("No template found for instance", r.instanceName);
                        return;
                    } else {
                        const i = N.applyTransformations(r, r.data, "transformDataBeforeRender", "json");
                        t = r.template(i);
                        C.debug("Rendered template with data:", {
                            template: r.templateId,
                            data: i,
                            rendered: t
                        });
                    }
                    const n = Array.from(r.elements).filter(e => document.body.contains(e));
                    if (n.length === 0) {
                        C.error("No active elements found for instance", r.instanceName);
                        return;
                    }
                    n.forEach(e => {
                        D(e, t, r.animate, r);
                    });
                } catch (e) {
                    C.error("Error updating DOM for instance", r.instanceName, e);
                }
            },
            setData: function(e) {
                const t = I.instances[c];
                if (!t) {
                    C.error("Instance not found: " + c);
                    return this;
                }
                if (!("data" in e)) {
                    C.warn(`[setData] Received unnamed root object, automatically wrapping in 'data' property`);
                    e = {
                        data: e
                    };
                }
                if (typeof e !== "object" || e === null || Array.isArray(e)) {
                    C.error("Invalid newData type provided to setData: " + typeof e);
                    return this;
                }
                const r = t.data;
                C.debug(`[setData] Replacing data for ${c}. Current keys: ${Object.keys(r).join(", ")}, New keys: ${Object.keys(e).join(", ")}`);
                let n = [];
                for (const s in r) {
                    if (Object.hasOwnProperty.call(r, s) && !Object.hasOwnProperty.call(e, s)) {
                        n.push(s);
                        delete r[s];
                    }
                }
                if (n.length > 0) {
                    C.debug(`[setData] Deleted stale keys for ${c}: ${n.join(", ")}`);
                }
                Object.assign(r, e);
                C.debug(`[setData] Data replacement processing complete for ${c}.`);
                return this;
            },
            remove: function() {
                const e = I.instances[c];
                if (!e) {
                    throw new Error("Instance not found: " + c);
                }
                O.publish("beforeRemove", {
                    instanceName: c,
                    elements: e.elements
                });
                try {
                    if (I.config?.storage?.enabled) {
                        localStorage.removeItem(`fp_${c}`);
                    }
                    e.elements.forEach(function(e) {
                        try {
                            e.innerHTML = "";
                        } catch (e) {
                            C.error("Error removing instance: " + e.message);
                        }
                    });
                    e.elements = [];
                    delete I.instances[c];
                    delete I.templateCache[e.templateId];
                    O.publish("afterRemove", {
                        instanceName: c,
                        elements: []
                    });
                    C.info("Removed instance: " + c);
                    return true;
                } catch (e) {
                    throw e;
                }
            },
            refresh: async function(o = {
                remote: true,
                recompile: false,
                ignoreLocalVar: false
            }) {
                const a = I.instances[c];
                if (!a) {
                    C.error("Instance not found: " + c);
                    return Promise.reject(new Error("Instance not found: " + c));
                }
                const e = a.template(a.data);
                const t = o.recompile || !e && a.data;
                if (t) {
                    a.template = H(a.templateId, true);
                }
                C.debug("Refresh - Template check:", {
                    templateId: a.templateId,
                    templateElement: document.querySelector(a.templateId),
                    compiledTemplate: a.template(a.data)
                });
                let l = false;
                if (a.localVarName && !o.ignoreLocalVar) {
                    const r = pe(a.localVarName);
                    if (r) {
                        Object.assign(a.data, r);
                        l = true;
                        C.debug(`Refreshed data from local variable "${a.localVarName}"`);
                    }
                }
                const u = [];
                a.elements.forEach(function(t) {
                    try {
                        if (o.remote && !l) {
                            const e = [ "get", "post", "put", "patch", "delete" ];
                            const r = e.some(e => t.getAttribute(`hx-${e}`));
                            if (r) {
                                const n = e.find(e => t.getAttribute(`hx-${e}`));
                                const s = t.getAttribute(`hx-${n}`);
                                const i = fetch(s, {
                                    method: n.toUpperCase()
                                }).then(e => {
                                    if (!e.ok) {
                                        throw new Error(`HTTP error! status: ${e.status}`);
                                    }
                                    return e.json();
                                }).then(e => {
                                    Object.assign(a.data, e);
                                    if (I.config?.storage?.enabled) {
                                        R(c, a.data, "instance");
                                    }
                                    return e;
                                });
                                u.push(i);
                            }
                        } else {
                            D(t, a.template(a.data), a.animate, a);
                        }
                    } catch (e) {
                        t.innerHTML = `<div class="fp-error">Error refreshing template: ${e.message}</div>`;
                        C.error(`Failed to refresh template: ${e.message}`);
                        u.push(Promise.reject(e));
                    }
                });
                await Promise.all(u);
                return this;
            },
            getData: function() {
                const e = I.instances[c].data;
                return JSON.parse(JSON.stringify(e));
            },
            getElements: function() {
                return I.instances[c].elements;
            },
            get: function(e) {
                return !e ? this.getData() : t.call(this, e);
            },
            refreshTemplate: function(e, t = false) {
                T.start("refreshTemplate:" + e);
                const r = H(e, t);
                if (!r) {
                    C.error("Failed to compile template: " + e);
                    T.end("refreshTemplate:" + e);
                    return false;
                }
            }
        };
    }
    const M = {
        getOrCreateInstance(e, t = {}) {
            const r = e.getAttribute("fp-instance") || e.id;
            if (!r) {
                C.error("No instance name found for element");
                return null;
            }
            let n = I.instances[r];
            if (!n) {
                n = {
                    elements: new Set([ e ]),
                    template: null,
                    templateId: e.getAttribute("fp-template"),
                    data: t,
                    cleanup: () => {
                        n.elements.clear();
                    }
                };
                Object.assign(n, de(r));
                const s = N.instanceMethods;
                for (const [ i ] of s.entries()) {
                    n[i] = (...e) => N.executeInstanceMethod(i, n, ...e);
                }
                I.instances[r] = n;
                N.executeHook("newInstance", n);
                C.info(`Created new instance: ${r}`);
            } else {
                n.elements.add(e);
                C.debug(`Added element to existing instance: ${r}`);
            }
            return n;
        },
        updateInstanceData(e, t) {
            if (!e || !e.data) {
                C.error("Cannot update data: Instance or instance.data is invalid.");
                return;
            }
            Object.assign(e.data, t);
        }
    };
    function me(e, n) {
        if (typeof e !== "object" || e === null) {
            return e;
        }
        const t = {
            get(e, t) {
                const r = e[t];
                return r && typeof r === "object" ? me(r, n) : r;
            },
            set(e, t, r) {
                e[t] = r;
                n(e);
                return true;
            },
            deleteProperty(e, t) {
                delete e[t];
                n(e);
                return true;
            }
        };
        return new Proxy(e, t);
    }
    function v({
        template: e,
        data: t,
        target: r,
        returnHtml: n = false,
        instanceName: o,
        animate: s = I.defaults.animation,
        recompile: i = false,
        skipLocalStorageLoad: a = false,
        skipRender: l = false,
        isStoredDataRender: u = false
    }) {
        T.start("render:" + (o || "anonymous"));
        if (!I._initTracking) {
            I._initTracking = {};
        }
        let c;
        if (o) {
            c = o;
        } else if (r instanceof Element && r.hasAttribute("fp-instance")) {
            c = r.getAttribute("fp-instance");
        } else if (r instanceof Element && r.id) {
            c = r.id;
        } else if (typeof r === "string" && r.startsWith("#")) {
            c = r.substring(1);
        }
        if (c && I._initTracking[c] && !u) {
            const y = Date.now() - I._initTracking[c];
            if (y < 100) {
                C.warn(`[Template] Skipping redundant initialization for ${c}, last init was ${y}ms ago`);
                return I.instances[c] || null;
            }
        }
        if (c) {
            I._initTracking[c] = Date.now();
        }
        O.publish("beforeRender", {
            instanceName: o,
            template: e,
            data: t,
            target: r,
            returnHtml: n,
            recompile: i
        });
        if (!e || e === "self") {
            const E = typeof r === "string" ? document.querySelector(r) : r;
            e = "#" + E.id;
        }
        let f = [];
        if (r instanceof NodeList) {
            f = Array.from(r);
        } else if (typeof r === "string") {
            f = Array.from(document.querySelectorAll(r));
        } else if (r instanceof Element) {
            f = [ r ];
        }
        if (f.length === 0) {
            C.error("No target elements found");
            return;
        }
        if (f.length === undefined) {
            f = [ f ];
        }
        if (o) {
            o = o;
        } else if (f[0].hasAttribute("fp-instance")) {
            o = f[0].getAttribute("fp-instance");
        } else if (f[0].id) {
            o = f[0].id;
        } else {
            o = I.length;
        }
        var h = H(e, i);
        I.length++;
        if (!h) {
            C.error("Template not found: " + e);
            return;
        }
        if (f.length === 0) {
            C.error("Target not found: " + r);
            return;
        }
        let p = t || {};
        let d = null;
        let m = null;
        const g = f[0].getAttribute("fp-local");
        let b = null;
        if (g) {
            b = pe(g);
            if (b) {
                p = {
                    ...p,
                    ...b
                };
            }
        }
        if (!I.instances[o] || !I.instances[o].data) {
            if (!a && I.config?.storage?.enabled) {
                d = L(o, "instance");
                if (d) {
                    if (d.isHtml === true || typeof d === "string" && typeof d.trim === "function" && (d.trim().startsWith("<!DOCTYPE html") || d.trim().startsWith("<html"))) {
                        const k = {
                            swapStyle: f[0].getAttribute("hx-swap")?.split(" ")[0] || "innerHTML",
                            swapDelay: 0,
                            settleDelay: 0,
                            transition: f[0].getAttribute("hx-swap")?.includes("transition:true") || false
                        };
                        if (n) {
                            return d;
                        }
                        f.forEach(e => {
                            htmx.swap(e, d, k);
                        });
                        return I.instances[o];
                    }
                    const w = d?.data || d;
                    p = {
                        ...w,
                        ...p
                    };
                    C.debug(`[Template] Merged persisted data for ${o}:`, p);
                }
            }
            const x = M.getOrCreateInstance(f[0], p);
            if (g) {
                x.localVarName = g;
            }
            if (!x) {
                C.error("Failed to get or create instance: " + o);
                return null;
            }
            if (!x._updateTimer) {
                x._updateTimer = null;
            }
            if (!x._stateBeforeDebounce) {
                x._stateBeforeDebounce = null;
            }
            const S = 50;
            m = me(p, e => {
                if (x) {
                    if (x._updateTimer === null) {
                        try {
                            x._stateBeforeDebounce = JSON.parse(JSON.stringify(m));
                            C.debug(`[Debounce Start] Captured pre-debounce state for ${o}:`, x._stateBeforeDebounce);
                        } catch (e) {
                            C.error(`[Debounce Start] Failed to capture pre-debounce state for ${o}:`, e);
                            x._stateBeforeDebounce = null;
                        }
                    }
                    clearTimeout(x._updateTimer);
                    x._updateTimer = setTimeout(() => {
                        const e = x._stateBeforeDebounce;
                        const t = m;
                        const r = JSON.parse(JSON.stringify(e));
                        const n = JSON.parse(JSON.stringify(t));
                        const s = JSON.stringify(r) !== JSON.stringify(n);
                        if (s) {
                            C.info(`[Debounced Update] State changed for ${o}. Firing updateData hook.`);
                            N.executeHook("updateData", x, {
                                newData: n,
                                oldData: r,
                                source: "proxy"
                            });
                            O.publish("updateData", {
                                instanceName: o,
                                newData: n,
                                oldData: r,
                                source: "proxy"
                            });
                        } else {
                            C.debug(`[Debounced Update] No state change detected for ${o}. Skipping updateData hook.`);
                        }
                        C.debug(`[Debounced Update] Triggering _updateDOM for ${o}`);
                        x._updateDOM();
                        const i = x.instanceName.replace("#", "");
                        C.debug(`[Debounced Update] Saving root proxy object for ${i}.`);
                        if (I.config?.storage?.enabled) {
                            R(i, t, "instance");
                        }
                        x._updateTimer = null;
                        x._stateBeforeDebounce = null;
                    }, S);
                }
            });
            x.elements = new Set(f);
            x.template = h;
            x.templateId = f[0].getAttribute("fp-template") || e;
            x.data = m;
            C.debug(`[Initial Render] ${l ? "Skipping" : "Triggering"} _updateDOM for ${o}`);
            if (!l) {
                x._updateDOM();
            }
            if (I.config?.storage?.enabled && !d) {
                const P = o.replace("#", "");
                C.debug(`[Initial Save] Saving initial data for ${P}`);
                R(P, p, "instance");
            }
        } else {
            m = I.instances[o].data;
        }
        const v = I.instances[o];
        C.info("Final instance data: ", v.data);
        if (m) {
            const x = M.getOrCreateInstance(f[0], p);
            x.elements = new Set(f);
            x.template = h;
            x.templateId = f[0].getAttribute("fp-template") || e;
            x.data = m;
            if (!l) {
                C.debug(`[Render Template] Executing render for ${o}`);
                try {
                    if (n) {
                        const A = N.applyTransformations(v, v.data, "transformDataBeforeRender", "json");
                        return h(A);
                    }
                    f.forEach(e => {
                        const t = N.applyTransformations(v, v.data, "transformDataBeforeRender", "json");
                        D(e, h(t), s, v);
                    });
                } catch (e) {
                    if (!(e instanceof _)) {
                        C.error(`Failed to render template: ${e.message}`);
                    }
                    throw e;
                }
            } else {
                C.debug(`[Render Template] Skipping render for ${o} as requested`);
            }
        } else if (!l) {
            C.debug(`[Template] Skipping render for ${o} because no data is available yet.`);
        }
        return v || null;
    }
    function ge(e, t, r) {
        if (!isNaN(e)) e = Number(e);
        if (!isNaN(r)) r = Number(r);
        function n(e) {
            return e === null || e === undefined;
        }
        if (n(e) || n(r)) {
            switch (t) {
              case "==":
                return e == r;

              case "!=":
                return e != r;

              case "&&":
                return Boolean(e) && Boolean(r);

              case "||":
                return Boolean(e) || Boolean(r);

              default:
                return false;
            }
        }
        if (typeof e === "string" && typeof r === "string") {
            switch (t) {
              case "==":
                return e.localeCompare(r) === 0;

              case "!=":
                return e.localeCompare(r) !== 0;

              case "<":
                return e.localeCompare(r) < 0;

              case ">":
                return e.localeCompare(r) > 0;

              case "<=":
                return e.localeCompare(r) <= 0;

              case ">=":
                return e.localeCompare(r) >= 0;

              default:
                throw new _("Unsupported operator for strings: " + t);
            }
        }
        switch (t) {
          case "==":
            return e == r;

          case "!=":
            return e != r;

          case "<":
            return e < r;

          case ">":
            return e > r;

          case "<=":
            return e <= r;

          case ">=":
            return e >= r;

          case "&&":
            return Boolean(e) && Boolean(r);

          case "||":
            return Boolean(e) || Boolean(r);

          case "regex":
            return new RegExp(r).test(e);

          default:
            throw new _("Unsupported operator: " + t);
        }
    }
    function be() {
        Handlebars.registerHelper("if", function(e, t) {
            function r(t, e, r) {
                if (t.startsWith('"') && t.endsWith('"') || t.startsWith("'") && t.endsWith("'")) {
                    return t.slice(1, -1);
                }
                if (!isNaN(t)) {
                    return parseFloat(t);
                }
                if (t === "this") {
                    return r;
                }
                if (t.startsWith("this.")) {
                    const n = t.split(".").slice(1);
                    let e = r;
                    for (const i of n) {
                        if (e && typeof e === "object" && i in e) {
                            e = e[i];
                        } else {
                            return undefined;
                        }
                    }
                    return e;
                }
                const n = t.split(".");
                let s = e;
                for (const i of n) {
                    if (s && typeof s === "object" && i in s) {
                        s = s[i];
                    } else {
                        return undefined;
                    }
                }
                return s;
            }
            try {
                const n = e.trim();
                const [ s, i, o ] = n.split(/\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/);
                if (!s || !i || !o) {
                    throw new _(`Invalid expression format: ${n}`);
                }
                const a = r(s, t.data.root, this);
                const l = r(o, t.data.root, this);
                C.info("Evaluating expression:", {
                    raw: n,
                    leftValue: a,
                    operator: i,
                    rightValue: l
                });
                const u = ge(a, i, l);
                if (u) {
                    return t.fn(this);
                } else {
                    return t.inverse(this);
                }
            } catch (e) {
                if (!(e instanceof _)) {
                    C.error("Error evaluating if condition:", e.stack);
                }
                throw e;
            }
        });
    }
    function ve() {
        Handlebars.registerHelper("sum", function() {
            var t = 0;
            for (var e = 0; e < arguments.length - 1; e++) {
                var r = arguments[e];
                if (Array.isArray(r)) {
                    r.forEach(function(e) {
                        t += e;
                    });
                } else {
                    t += r;
                }
            }
            return t;
        });
    }
    function* o(e) {
        var t = new RegExp(o.lang, "g");
        var r;
        while ((r = t.exec(e)) !== null) {
            var [ n ] = r;
            for (var s in o.categories) {
                if (new RegExp(o.categories[s]).test(n)) {
                    yield {
                        token: n,
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
    class a {
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
                return a.ans = this.stack.pop();
            } catch (e) {
                C.error("Error in expression evaluation:", e);
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
                this.stack.push(a._val(this.w));
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
        _wrapped_expr_min_max(t, r, e = "(", n = ")") {
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
                if (this.w && this.w.token === n) {
                    this.w = this._next();
                    if (t instanceof Function) {
                        t.call(this, r, e);
                    }
                    return true;
                }
            }
            return false;
        }
        _lrecmut(e, t) {
            return e.call(this) && t.call(this);
        }
        _ophit(e, t, r, n) {
            if (this.w && e.some(e => e === this.w.token)) {
                var s = this.w.token;
                var i = this.stack.pop();
                this.w = this._next();
                if (t.call(this)) {
                    var o = this.stack.pop();
                    this.stack.push(a._chooseOp(s)(i, o));
                    return r.call(this);
                }
            } else if (!this.w || n.some(e => e === this.w.token)) {
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
                const r = this.stack.pop();
                this.stack.push(a._chooseOp(e)(r, t));
            }
            return true;
        }
        t() {
            let e = this.f();
            while (this.w && (this.w.token === "*" || this.w.token === "/")) {
                const t = this.w.token;
                this.w = this._next();
                if (!this.f()) return false;
                const r = this.stack.pop();
                const n = this.stack.pop();
                this.stack.push(a._chooseOp(t)(n, r));
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
        _wrapped_expr(e, t, r = "(", n = ")") {
            if (!this.w) {
                return false;
            }
            if (this.w.token === r) {
                this.w = this._next();
                if (this.e()) {
                    if (this.w && this.w.token === n) {
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
                this.stack.push(a._chooseFn(e).apply(null, t));
            } else {
                const r = this.stack.pop();
                if (r === undefined) {
                    throw new Error(`Function ${e} requires an argument`);
                }
                this.stack.push(a._chooseFn(e)(r));
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
    a.ans = 0;
    function ye() {
        Handlebars.registerHelper("math", function(e, r) {
            const n = [ "min", "max", "sqrt", "abs", "log", "ln", "sin", "cos", "tan" ];
            const t = e.replace(/@{([^}]+)}/g, (e, t) => {
                try {
                    let e;
                    if (t.includes(".")) {
                        e = t.split(".").reduce((e, t) => e[t], r.data.root);
                    } else {
                        e = r.data.root[t] || r.hash[t];
                    }
                    return e;
                } catch (e) {
                    console.warn(`Could not resolve ${t}`);
                    return NaN;
                }
            });
            const s = t.replace(/[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*/g, t => {
                if (n.includes(t) && !t.includes(".")) {
                    return t;
                }
                try {
                    let e;
                    if (t.includes(".")) {
                        e = t.split(".").reduce((e, t) => e[t], r.data.root);
                    } else {
                        e = r.data.root[t] || r.hash[t];
                    }
                    return e;
                } catch (e) {
                    console.warn(`Could not resolve ${t}`);
                    return NaN;
                }
            });
            C.debug("Evaluating expression:", s);
            try {
                const i = new a();
                const o = i.exec(s);
                return o;
            } catch (e) {
                if (!(e instanceof _)) {
                    throw new _(`Error evaluating expression: ${e.message}`, e.stack);
                }
                throw e;
            }
        });
    }
    function Ee(s, i) {
        return function(e, t) {
            let r = s ? e[s] : e;
            let n = s ? t[s] : t;
            if (r === null || r === undefined) return i ? -1 : 1;
            if (n === null || n === undefined) return i ? 1 : -1;
            if (typeof r === "string" && typeof n === "string") {
                return i ? n.localeCompare(r) : r.localeCompare(n);
            }
            if (r < n) return i ? 1 : -1;
            if (r > n) return i ? -1 : 1;
            return 0;
        };
    }
    function xe() {
        Handlebars.registerHelper("each", function(e, t) {
            var r = "";
            var n = t.hash.limit;
            var s = t.hash.startAt || 0;
            var i = t.hash.sortBy;
            var o = t.hash.descending;
            var a = t.hash.sortBeforeLimit;
            var l = t.inverse;
            var u = t.fn;
            var c;
            var f;
            a = typeof a === "boolean" ? a : true;
            if (t.data && t.ids) {
                f = Handlebars.Utils.appendContextPath(t.data.contextPath, t.ids[0]) + ".";
            }
            if (Handlebars.Utils.isFunction(e)) {
                e = e.call(this);
            }
            if (t.data) {
                c = Handlebars.createFrame(t.data);
            }
            if (!Array.isArray(e) && typeof e !== "object") {
                return l(this);
            }
            var h = Array.isArray(e) ? e.slice() : Object.entries(e);
            if (n === undefined) {
                n = h.length;
            }
            if (a) {
                h.sort(Ee(i, o));
                h = h.slice(s, n + s);
            } else {
                h = h.slice(s, n + s);
                h.sort(Ee(i, o));
            }
            for (var p = 0; p < h.length; p++) {
                var d = Array.isArray(e) ? h[p] : h[p][1];
                c.key = Array.isArray(e) ? p : h[p][0];
                c.index = p;
                c.first = p === 0;
                c.last = p === h.length - 1;
                if (f) {
                    c.contextPath = f + c.key;
                }
                r += u(d, {
                    data: c,
                    blockParams: Handlebars.Utils.blockParams([ d, c.key ], [ f + c.key, null ])
                });
            }
            if (p === 0) {
                r = l(this);
            }
            return r;
        });
    }
    function Se() {
        Handlebars.registerHelper("execute", function(e, ...t) {
            t.pop();
            const r = String(e);
            const n = this[r] || window[r];
            if (typeof n === "function") {
                return n(...t);
            } else {
                C.error("Function not found or is not a function: " + e);
            }
        });
    }
    function we() {
        Handlebars.registerHelper("set", function(e, t, r) {
            if (!e || !t) {
                C.error("setHelper: varName and varValue are required");
                return "";
            }
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(e)) {
                C.error(`setHelper: varName ${e} is not a valid variable name`);
                return "";
            }
            r.data.root[e] = t;
        });
    }
    function ke() {
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
    function Pe() {
        Handlebars.registerHelper("default", function(e, t) {
            return e || t;
        });
    }
    function Ae() {
        be();
        ve();
        ye();
        xe();
        Se();
        we();
        ke();
        Pe();
    }
    const y = {
        processingElements: new Map(),
        currentRequestId: 0,
        generateRequestId() {
            return `fp-${Date.now()}-${this.currentRequestId++}`;
        },
        handleRequest(e, t, r) {
            if (!e || !e.hasAttribute("fp-template")) return;
            const n = this.processingElements.get(e);
            t = t || this.generateRequestId();
            switch (r) {
              case "start":
                if (!n || n.requestId !== t) {
                    this.processingElements.set(e, {
                        requestId: t,
                        timestamp: Date.now(),
                        processed: false
                    });
                    C.debug("Added element to processing set", e, t);
                }
                break;

              case "process":
                if (n && n.requestId === t && !n.processed) {
                    n.processed = true;
                    this.processingElements.set(e, n);
                    return true;
                }
                return false;

              case "cleanup":
                if (n && n.requestId === t && n.processed) {
                    this.processingElements.delete(e);
                    C.debug("Cleaned up after request", e, t);
                } else {
                    C.debug("Skipping cleanup - request mismatch or not processed", {
                        current: n?.requestId,
                        received: t
                    });
                }
                break;
            }
        },
        cleanupStale() {
            const e = Date.now();
            const t = 1e4;
            for (const [ r, n ] of this.processingElements.entries()) {
                if (e - n.timestamp > t) {
                    this.processingElements.delete(r);
                    C.debug("Cleaned up stale processing entry", r, n.requestId);
                }
            }
        },
        setupEventListeners() {
            document.body.addEventListener("htmx:configRequest", e => {
                const t = e.detail.elt;
                const r = M.getOrCreateInstance(t);
                if (r) {
                    e = N.applyTransformations(r, e, "transformRequest", "json");
                }
                e.detail.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
            });
            document.body.addEventListener("htmx:beforeRequest", e => {
                const t = e.detail.elt;
                const r = e.detail.requestId || this.generateRequestId();
                e.detail.requestId = r;
                this.handleRequest(t, r, "start");
                let n = null;
                let s = null;
                for (const [ i, o ] of Object.entries(I.instances)) {
                    if (Array.from(o.elements).some(e => e.contains(t))) {
                        n = o;
                        s = i;
                        break;
                    }
                }
                if (n) {
                    O.publish("request-start", {
                        instanceName: s,
                        ...e.detail
                    });
                }
            });
            document.body.addEventListener("htmx:beforeSwap", e => {
                const t = e.detail.elt;
                const r = e.detail.requestId;
                const n = this.processingElements.get(t);
                if (n && n.requestId !== r) {
                    e.preventDefault();
                    C.debug("Prevented swap - request ID mismatch");
                }
            });
            document.body.addEventListener("htmx:responseError", e => {
                if (e.detail.failed) {
                    this.handleRequest(e.detail.elt, e.detail.requestId, "cleanup");
                }
            });
            setInterval(() => this.cleanupStale(), 1e4);
            window.addEventListener("unload", () => {
                this.processingElements.clear();
            });
        }
    };
    function Ce(e) {
        function l(e) {
            var t = {};
            if (e.attributes) {
                for (var r = 0; r < e.attributes.length; r++) {
                    var n = e.attributes.item(r);
                    t["_" + n.nodeName] = n.nodeValue;
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
            t = Object.keys(t).length > 0 ? t : "";
            return t;
        }
        var t = new DOMParser();
        var r = t.parseFromString(e, "text/xml");
        return l(r.documentElement);
    }
    function _e() {
        htmx.defineExtension("flowplater", {
            transformResponse: function(e, t, r) {
                const n = M.getOrCreateInstance(r);
                const s = t.getResponseHeader("Content-Type") || "";
                const i = s.startsWith("text/xml");
                const o = s.startsWith("text/html");
                let a = e;
                let l = false;
                if (i) {
                    try {
                        var u = new DOMParser();
                        var c = u.parseFromString(e, "text/xml");
                        a = JSON.stringify(Ce(c));
                        l = true;
                    } catch (e) {
                        C.error("Failed to parse XML response:", e);
                    }
                } else if (!o) {
                    l = true;
                }
                const f = o ? "html" : "json";
                if (n) {
                    a = N.applyTransformations(n, a, "transformResponse", f);
                } else {
                    C.debug(`[transformResponse] No instance found for elt ${r.id}. Skipping transformations.`);
                }
                const h = t.requestId;
                const p = y.processingElements.get(r);
                if (!p || p.requestId !== h) {
                    return a;
                }
                if (!l) {
                    if (I.config?.storage?.enabled) {
                        const m = n ? n.instanceName : r.getAttribute("fp-instance") || r.id;
                        if (m) {
                            R(m, {
                                data: a,
                                isHtml: true,
                                timestamp: Date.now()
                            }, "instance");
                        }
                    }
                    return a;
                }
                let d;
                try {
                    d = JSON.parse(a);
                } catch (e) {
                    C.error("Failed to parse JSON response:", e);
                    return a;
                }
                if (!d) return a;
                if (n) {
                    const m = n.instanceName;
                    C.debug(`[transformResponse] Calling instance.setData for ${m} with new data.`);
                    n.setData(d);
                    C.debug(`[transformResponse] setData called for request ${h} on elt ${r.id}. Returning empty string.`);
                    return "";
                }
                return a;
            },
            handleSwap: function(e, t, r, n) {
                const s = r.textContent?.trim() === "";
                if (s) {
                    C.debug(`[handleSwap] Detected empty string signal for target ${t.id || "[no id]"}. Preventing htmx default swap.`);
                    return true;
                } else {
                    C.debug(`[handleSwap] Fragment is not empty signal for target ${t.id || "[no id]"}. Letting htmx swap.`);
                    return false;
                }
            },
            onEvent: function(e, t) {
                const r = t.detail.elt;
                if (!r) {
                    C.warn(`[onEvent] Event ${e} has no triggering element (evt.detail.elt). Skipping.`);
                    return;
                }
                const n = t.detail.requestId || y.generateRequestId();
                if (!t.detail.requestId) t.detail.requestId = n;
                switch (e) {
                  case "htmx:confirm":
                    if (r.hasAttribute("fp-template")) {
                        const s = M.getOrCreateInstance(r);
                        t = N.applyTransformations(s || null, t, "confirm", "json");
                    }
                    break;

                  case "htmx:configRequest":
                    const s = M.getOrCreateInstance(r);
                    t = N.applyTransformations(s || null, t, "configRequest", "json");
                    break;

                  case "htmx:beforeRequest":
                    if (!t.detail.xhr.requestId) {
                        t.detail.xhr.requestId = n;
                    }
                    y.handleRequest(r, n, "start");
                    if (r.hasAttribute("fp-template")) {
                        const s = M.getOrCreateInstance(r);
                        N.executeHook("beforeRequest", s || null, t);
                    }
                    break;

                  case "htmx:beforeSwap":
                    l("beforeSwap", r, t);
                    break;

                  case "htmx:afterSwap":
                    l("afterSwap", r, t);
                    const i = te(r);
                    i.forEach(Z);
                    break;

                  case "htmx:afterRequest":
                    if (r.hasAttribute("fp-template")) {
                        const s = M.getOrCreateInstance(r);
                        if (s) {
                            N.executeHook("afterRequest", s, t);
                            O.publish("request-end", {
                                instanceName: s.instanceName,
                                ...t.detail
                            });
                        }
                    }
                    y.handleRequest(r, n, "cleanup");
                    Oe(r, true, t);
                    break;

                  case "htmx:afterSettle":
                    l("afterSettle", r, t);
                    C.debug(`Setting up form handlers after DOM settle for target: ${r.id || "unknown"}, ` + `has fp-template: ${r.hasAttribute("fp-template")}, ` + `parent form: ${r.closest("form")?.id || "none"}`);
                    b(r);
                    break;
                }
            }
        });
    }
    function l(e, t, r) {
        if (t.hasAttribute("fp-instance") || t.hasAttribute("id")) {
            const n = M.getOrCreateInstance(t);
            if (n) {
                N.executeHook(e, n, r?.detail);
            }
        }
    }
    function Oe(e, t = true, r) {
        if (u.isRestoringFormStates) {
            C.debug("Already restoring form states, skipping");
            return;
        }
        if (t && r?.detail?.failed) {
            return;
        }
        u.restoreFormStates(e);
    }
    function Ie(t) {
        if (!t) {
            C.error("No URL provided for preloading");
            return;
        }
        const e = document.createElement("link");
        e.rel = "preload";
        e.href = t;
        e.as = "fetch";
        e.crossOrigin = "anonymous";
        const r = () => {
            if (e.parentNode) {
                e.remove();
            }
        };
        e.onerror = e => {
            C.error(`Failed to preload URL: ${t}`, e);
            r();
        };
        const n = setTimeout(r, 3e3);
        document.head.appendChild(e);
        return {
            cleanup: r,
            timeoutId: n
        };
    }
    function Te(n) {
        const e = n.getAttribute("fp-preload") || "mouseover";
        if (e === "mouseover") {
            let t = true;
            let e;
            let r;
            const s = () => {
                t = true;
                e = setTimeout(() => {
                    if (t) {
                        const e = n.getAttribute("href") || n.getAttribute("hx-get") || n.getAttribute("fp-get");
                        r = Ie(e);
                    }
                }, 100);
            };
            const i = () => {
                t = false;
                if (e) {
                    clearTimeout(e);
                }
                if (r) {
                    clearTimeout(r.timeoutId);
                    r.cleanup();
                }
            };
            n.addEventListener("mouseover", s);
            n.addEventListener("mouseout", i);
            n._preloadCleanup = () => {
                n.removeEventListener("mouseover", s);
                n.removeEventListener("mouseout", i);
                i();
            };
        } else {
            const t = () => {
                const e = n.getAttribute("href") || n.getAttribute("hx-get") || n.getAttribute("fp-get");
                Ie(e);
            };
            n.addEventListener(e, t);
            n._preloadCleanup = () => {
                n.removeEventListener(e, t);
            };
        }
    }
    function Ne(t) {
        try {
            if (t.hasAttribute("data-fp-preload-processed")) {
                return t;
            }
            if (t.hasAttribute("fp-preload")) {
                Te(t);
                t.setAttribute("data-fp-preload-processed", "true");
            }
            return t;
        } catch (e) {
            C.error(`Error in processPreload: ${e.message}`);
            return t;
        }
    }
    const He = [ "boost", "get", "post", "on", "push-url", "select", "select-oob", "swap", "swap-oob", "target", "trigger", "vals", "confirm", "delete", "disable", "disabled-elt", "disinherit", "encoding", "ext", "headers", "history", "history-elt", "include", "indicator", "params", "patch", "preserve", "prompt", "put", "replace-url", "request", "sync", "validate", "vars" ];
    function Re(n) {
        try {
            const s = "fp-";
            const i = "hx-";
            He.forEach(e => {
                const t = s + e;
                if (n.hasAttribute(t)) {
                    const r = n.getAttribute(t);
                    n.setAttribute(i + e, r);
                    n.removeAttribute(t);
                }
            });
            return n;
        } catch (e) {
            C.error(`Error in translateCustomHTMXAttributes: ${e.message}`);
            return n;
        }
    }
    function Le(t) {
        try {
            const r = [ "get", "post", "put", "patch", "delete" ];
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
                r.forEach(function(e) {
                    var t = "hx-" + e;
                    if (o.hasAttribute(t)) {
                        var r = o.getAttribute(t);
                        C.info("Original URL: " + r);
                        var n = a(o, "fp-prepend");
                        var s = a(o, "fp-append");
                        var i = r;
                        if (n) {
                            i = n + i;
                        }
                        if (s) {
                            i += s;
                        }
                        o.setAttribute(t, i);
                        C.info("Modified URL: " + i);
                        if (i !== r) {
                            C.info("Modification successful for", e, "on element", o);
                        } else {
                            C.error("Modification failed for", e, "on element", o);
                        }
                    }
                });
            }
            if ((t.hasAttribute("fp-prepend") || t.hasAttribute("fp-append")) && r.some(e => t.hasAttribute("hx-" + e))) {
                e(t);
            }
            return t;
        } catch (e) {
            C.error(`Error in processUrlAffixes: ${e.message}`);
            return t;
        }
    }
    function De(t) {
        try {
            var e = t.getAttribute("fp-animation") || I.defaults.animation;
            if (e === "true") {
                var r = t.getAttribute("hx-swap");
                if (!r) {
                    t.setAttribute("hx-swap", "innerHTML transition:true");
                } else {
                    t.setAttribute("hx-swap", r + " transition:true");
                }
            }
            return t;
        } catch (e) {
            C.error(`Error in setupAnimation: ${e.message}`);
            return t;
        }
    }
    function Me(t) {
        try {
            var e = t.getAttribute("hx-ext") || "";
            if (!e.includes("flowplater")) {
                var r = e ? e + ", flowplater" : "flowplater";
                t.setAttribute("hx-ext", r);
                C.info("Added hx-ext attribute to " + t.id);
            }
            return t;
        } catch (e) {
            C.info(`Error in addHtmxExtensionAttribute: ${e.message}`);
            return t;
        }
    }
    const $e = "1.4.26";
    const Fe = "JWSLS";
    const qe = "Flowplater standard licence";
    const r = {
        debug: {
            level: window.location.hostname.endsWith(".webflow.io") || window.location.hostname.endsWith(".canvas.webflow.com") || window.location.hostname.endsWith("localhost") ? 3 : 1
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
        throw new p("FlowPlater requires Handlebars. Get it at https://handlebarsjs.com/");
    }
    if (typeof htmx === "undefined") {
        throw new p("FlowPlater requires htmx. Get it at https://htmx.org/");
    }
    I.config = JSON.parse(JSON.stringify(r));
    y.setupEventListeners();
    _e();
    const E = {
        processors: [ {
            name: "customTags",
            process: F
        }, {
            name: "htmxAttributes",
            process: Re
        }, {
            name: "htmxExtensionAttribute",
            process: Me
        }, {
            name: "urlAffixes",
            process: Le
        }, {
            name: "animation",
            process: De
        }, {
            name: "preload",
            process: Ne
        }, {
            name: "htmxProcess",
            process: e => {
                htmx.process(e);
                return e;
            }
        } ],
        FP_SELECTOR: I.config.selectors.fp,
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
            i.finalElement = this.processors.reduce((t, r, e) => {
                if (!t) {
                    i.errors.push({
                        phase: r.name,
                        error: `Element became undefined at processor index ${e}`,
                        processor: this.processors[e - 1]
                    });
                    i.success = false;
                    return s;
                }
                try {
                    const n = r.process(t);
                    return n;
                } catch (e) {
                    i.errors.push({
                        phase: r.name,
                        error: e.message,
                        stack: e.stack
                    });
                    C.error(`Error in processor ${r.name}: ${e.message}`, e);
                    if (e instanceof _) {
                        i.warnings.push({
                            phase: r.name,
                            message: "Falling back to original template"
                        });
                        return t;
                    }
                    return t;
                }
            }, s);
            if (i.errors.length > 0) {
                O.publish("processingChain:error", i);
            }
            if (i.warnings.length > 0) {
                O.publish("processingChain:warning", i);
            }
            return i.finalElement;
        }
    };
    function Be(e = document) {
        if (e === document || !e.matches(E.FP_SELECTOR)) {
            const t = e.querySelectorAll(E.FP_SELECTOR);
            t.forEach(e => E.processElement(e));
        } else {
            E.processElement(e);
        }
    }
    Handlebars.unregisterHelper("each");
    Handlebars.unregisterHelper("if");
    Ae(Handlebars);
    const x = {
        compileTemplate: H,
        render: v,
        getInstance: i,
        getInstances: P,
        PluginManager: N,
        log: function(e, ...t) {
            t.unshift(`[PLUGIN]`);
            C.log(e, ...t);
            return this;
        },
        logLevels: C.levels,
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
        on: (...e) => O.subscribe(...e),
        off: (...e) => O.unsubscribe(...e),
        emit: (...e) => O.publish(...e),
        debug: function(e) {
            C.level = e;
            return this;
        },
        templateCache: {
            set: function(e, t) {
                const r = I.config.templates.cacheSize;
                const n = I.templateCache;
                if (Object.keys(n).length >= r) {
                    const s = Object.keys(n)[0];
                    delete n[s];
                    C.info(`Cache limit reached. Removed template: ${s}`);
                }
                n[e] = t;
                return t;
            },
            get: function(e) {
                if (e) {
                    return I.templateCache[e];
                }
                return I.templateCache;
            },
            isCached: function(e) {
                return !!I.templateCache[e];
            },
            clear: function(e) {
                if (e) {
                    delete I.templateCache[e];
                    C.info(`Cleared template cache for: ${e}`);
                } else {
                    I.templateCache = {};
                    C.info("Cleared entire template cache");
                }
            },
            size: function() {
                return Object.keys(I.templateCache).length;
            }
        },
        init: function(e = document, u = {
            render: true
        }) {
            if (I.initialized) {
                if (e !== document) {
                    Be(e);
                }
                return this;
            }
            T.start("init");
            C.info("Initializing FlowPlater...");
            const t = document.querySelectorAll("[fp-template]");
            t.forEach(t => {
                let r = t.getAttribute("fp-template");
                if (r === "self" || r === "") {
                    r = t.id;
                }
                if (r) {
                    const e = document.querySelector(r);
                    if (e) {
                        C.info("replacing template content", e);
                        const n = e.getElementsByTagName("script");
                        const s = Array.from(n).map(e => e.innerHTML);
                        Array.from(n).forEach((e, t) => {
                            e.innerHTML = `##FP_SCRIPT_${t}##`;
                        });
                        e.innerHTML = e.innerHTML.replace(/\[\[(.*?)\]\]/g, "{{$1}}");
                        Array.from(e.getElementsByTagName("script")).forEach((e, t) => {
                            e.innerHTML = s[t];
                        });
                    }
                    H(r, true);
                    if (u.render) {
                        const i = [ "get", "post", "put", "patch", "delete" ];
                        let e = false;
                        e = i.some(e => t.hasAttribute(`hx-${e}`) || t.hasAttribute(`fp-${e}`));
                        if (!e) {
                            const o = [ "hx-trigger", "fp-trigger", "hx-boost", "fp-boost", "hx-ws", "fp-ws", "hx-sse", "fp-sse" ];
                            e = o.some(e => t.hasAttribute(e));
                        }
                        C.debug(`[Template ${r}] Has request method: ${e}`, t);
                        v({
                            template: r,
                            data: {},
                            target: t,
                            skipRender: e
                        });
                        if (e && I.config?.storage?.enabled) {
                            const a = t.getAttribute("fp-instance") || t.id || r;
                            const l = L(a, "instance");
                            if (l) {
                                C.info(`Found stored data for instance: ${a}, rendering with stored data`);
                                v({
                                    template: r,
                                    data: l,
                                    target: t,
                                    instanceName: a,
                                    skipRender: false,
                                    isStoredDataRender: true
                                });
                            } else {
                                C.debug(`Skipping initial render for instance: ${a} - no stored data found`);
                            }
                        }
                    }
                } else {
                    C.error(`No template ID found for element: ${t.id}`, t, "Make sure your template has an ID attribute");
                }
            });
            Be(e);
            I.initialized = true;
            d.isReady = true;
            C.info("FlowPlater initialized successfully");
            T.end("init");
            d.processQueue();
            O.publish("initialized");
            this.PluginManager.executeHook("initComplete", this, I.instances);
            return this;
        },
        ready: function(e) {
            if (d.isReady) {
                e(this);
            } else {
                d.queue.push(() => e(this));
            }
            return this;
        },
        cleanup: function(e) {
            if (e) {
                const t = I.instances[e];
                if (t) {
                    t.elements.forEach(e => {
                        if (e._preloadCleanup) {
                            e._preloadCleanup();
                        }
                        e.removeEventListeners();
                    });
                    delete I.instances[e];
                    C.info(`Cleaned up instance: ${e}`);
                }
            } else {
                Object.keys(I.instances).forEach(e => {
                    this.cleanup(e);
                });
                I.initialized = false;
                C.info("Cleaned up all instances");
            }
            return this;
        },
        version: $e,
        author: Fe,
        license: qe,
        setCustomTags: t,
        config: function(e = {}) {
            if ("storage" in e) {
                e.storage = je(e.storage, r.storage);
            }
            function n(e, t) {
                for (const r in t) {
                    if (t[r] instanceof Object && r in e) {
                        n(e[r], t[r]);
                    } else {
                        e[r] = t[r];
                    }
                }
                return e;
            }
            I.config = n(JSON.parse(JSON.stringify(I.config)), e);
            C.level = I.config.debug.level;
            E.FP_SELECTOR = I.config.selectors.fp;
            if (typeof htmx !== "undefined") {
                htmx.config.timeout = I.config.htmx.timeout;
                htmx.config.defaultSwapStyle = I.config.htmx.swapStyle;
                htmx.config.selfRequestsOnly = I.config.htmx.selfRequestsOnly;
            }
            if (e.customTags) {
                t(e.customTags);
            }
            C.info("FlowPlater configured with:", I.config);
            return this;
        },
        getConfig: function() {
            return JSON.parse(JSON.stringify(I.config));
        },
        registerHelper: function(e, t) {
            Handlebars.registerHelper(e, t);
            this.templateCache.clear();
            Object.keys(I.instances).forEach(e => {
                const t = I.instances[e];
                if (t.templateId) {
                    t.template = H(t.templateId, true);
                }
            });
            C.info(`Registered Handlebars helper: ${e}`);
            return this;
        },
        destroy: function() {
            Object.keys(I.instances).forEach(e => {
                this.cleanup(e);
            });
            I.templateCache = {};
            I.instances = {};
            O.unsubscribeAll();
            C.info("Cleaned up all instances");
        },
        create: function(e, t = {
            refresh: true
        }) {
            T.start(`createInstance:${e}`);
            C.info(`Creating FlowPlater instance: ${e}`);
            let r;
            if (e.startsWith("#")) {
                r = document.getElementById(e.slice(1));
            } else {
                r = document.querySelector(`[fp-instance="${e}"]`);
            }
            if (!r) {
                throw new p(`Could not find element for instance: ${e}`);
            }
            const n = r.getAttribute("fp-template");
            if (n) {
                this.templateCache.clear(n);
            }
            this.init(r);
            const s = i(e);
            if (!s) {
                throw new p(`Failed to create instance: ${e}`);
            }
            this.PluginManager.executeHook("newInstance", s);
            if (t.refresh) {
                s.refresh();
            }
            C.info(`Instance created successfully: ${e}`);
            T.end(`createInstance:${e}`);
            return s;
        }
    };
    function je(e, t) {
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
    let S = JSON.parse(JSON.stringify(r));
    const w = document.querySelector('meta[name="fp-config"]');
    if (w) {
        try {
            const k = JSON.parse(w.content);
            if ("storage" in k) {
                k.storage = je(k.storage, r.storage);
            }
            S = {
                ...S,
                ...k
            };
        } catch (e) {
            C.error("Error parsing fp-config meta tag:", w, "Make sure your meta tag is valid");
        }
    }
    x.config(S);
    O.publish("loaded");
    if (document.readyState === "complete" || document.readyState !== "loading") {
        x.init();
    } else {
        document.addEventListener("DOMContentLoaded", () => x.init());
    }
    return x;
}();