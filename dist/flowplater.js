/**!

 @license FlowPlater v1.4.19 | (c) 2024 FlowPlater | https://flowplater.io
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
        function i(e) {
            if (n[e]) return n[e].exports;
            var t = n[e] = {
                exports: {},
                id: e,
                loaded: false
            };
            r[e].call(t.exports, t, t.exports, i);
            t.loaded = true;
            return t.exports;
        }
        i.m = r;
        i.c = n;
        i.p = "";
        return i(0);
    }([ function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var i = r(2);
        var a = n(i);
        var s = r(84);
        var o = n(s);
        var l = r(85);
        var u = r(90);
        var c = r(91);
        var f = n(c);
        var h = r(88);
        var p = n(h);
        var d = r(83);
        var m = n(d);
        var g = a["default"].create;
        function v() {
            var r = g();
            r.compile = function(e, t) {
                return u.compile(e, t, r);
            };
            r.precompile = function(e, t) {
                return u.precompile(e, t, r);
            };
            r.AST = o["default"];
            r.Compiler = u.Compiler;
            r.JavaScriptCompiler = f["default"];
            r.Parser = l.parser;
            r.parse = l.parse;
            r.parseWithoutProcessing = l.parseWithoutProcessing;
            return r;
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
    }, function(e, t, r) {
        "use strict";
        var n = r(3)["default"];
        var i = r(1)["default"];
        t.__esModule = true;
        var a = r(4);
        var s = n(a);
        var o = r(77);
        var l = i(o);
        var u = r(6);
        var c = i(u);
        var f = r(5);
        var h = n(f);
        var p = r(78);
        var d = n(p);
        var m = r(83);
        var g = i(m);
        function v() {
            var t = new s.HandlebarsEnvironment();
            h.extend(t, s);
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
        t.HandlebarsEnvironment = v;
        var i = r(5);
        var a = r(6);
        var s = n(a);
        var o = r(10);
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
        function v(e, t, r) {
            this.helpers = e || {};
            this.partials = t || {};
            this.decorators = r || {};
            o.registerDefaultHelpers(this);
            l.registerDefaultDecorators(this);
        }
        v.prototype = {
            constructor: v,
            logger: c["default"],
            log: c["default"].log,
            registerHelper: function e(t, r) {
                if (i.toString.call(t) === g) {
                    if (r) {
                        throw new s["default"]("Arg not supported with multiple helpers");
                    }
                    i.extend(this.helpers, t);
                } else {
                    this.helpers[t] = r;
                }
            },
            unregisterHelper: function e(t) {
                delete this.helpers[t];
            },
            registerPartial: function e(t, r) {
                if (i.toString.call(t) === g) {
                    i.extend(this.partials, t);
                } else {
                    if (typeof r === "undefined") {
                        throw new s["default"]('Attempting to register a partial called "' + t + '" as undefined');
                    }
                    this.partials[t] = r;
                }
            },
            unregisterPartial: function e(t) {
                delete this.partials[t];
            },
            registerDecorator: function e(t, r) {
                if (i.toString.call(t) === g) {
                    if (r) {
                        throw new s["default"]("Arg not supported with multiple decorators");
                    }
                    i.extend(this.decorators, t);
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
        var y = c["default"].log;
        t.log = y;
        t.createFrame = i.createFrame;
        t.logger = c["default"];
    }, function(e, t) {
        "use strict";
        t.__esModule = true;
        t.extend = s;
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
        var n = /[&<>"'`=]/g, i = /[&<>"'`=]/;
        function a(e) {
            return r[e];
        }
        function s(e) {
            for (var t = 1; t < arguments.length; t++) {
                for (var r in arguments[t]) {
                    if (Object.prototype.hasOwnProperty.call(arguments[t], r)) {
                        e[r] = arguments[t][r];
                    }
                }
            }
            return e;
        }
        var o = Object.prototype.toString;
        t.toString = o;
        var l = function e(t) {
            return typeof t === "function";
        };
        if (l(/x/)) {
            t.isFunction = l = function(e) {
                return typeof e === "function" && o.call(e) === "[object Function]";
            };
        }
        t.isFunction = l;
        var u = Array.isArray || function(e) {
            return e && typeof e === "object" ? o.call(e) === "[object Array]" : false;
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
            if (!i.test(e)) {
                return e;
            }
            return e.replace(n, a);
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
            var t = s({}, e);
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
            var r = t && t.loc, n = undefined, i = undefined, a = undefined, s = undefined;
            if (r) {
                n = r.start.line;
                i = r.end.line;
                a = r.start.column;
                s = r.end.column;
                e += " - " + n + ":" + a;
            }
            var o = Error.prototype.constructor.call(this, e);
            for (var l = 0; l < c.length; l++) {
                this[c[l]] = o[c[l]];
            }
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, f);
            }
            try {
                if (r) {
                    this.lineNumber = n;
                    this.endLineNumber = i;
                    if (u) {
                        Object.defineProperty(this, "column", {
                            value: a,
                            enumerable: true
                        });
                        Object.defineProperty(this, "endColumn", {
                            value: s,
                            enumerable: true
                        });
                    } else {
                        this.column = a;
                        this.endColumn = s;
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
        var i = r(9);
        e.exports = function e(t, r, n) {
            return i.setDesc(t, r, n);
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
        t.registerDefaultHelpers = y;
        t.moveHelperToHooks = b;
        var i = r(11);
        var a = n(i);
        var s = r(12);
        var o = n(s);
        var l = r(65);
        var u = n(l);
        var c = r(66);
        var f = n(c);
        var h = r(67);
        var p = n(h);
        var d = r(68);
        var m = n(d);
        var g = r(69);
        var v = n(g);
        function y(e) {
            a["default"](e);
            o["default"](e);
            u["default"](e);
            f["default"](e);
            p["default"](e);
            m["default"](e);
            v["default"](e);
        }
        function b(e, t, r) {
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
        var s = r(5);
        t["default"] = function(a) {
            a.registerHelper("blockHelperMissing", function(e, t) {
                var r = t.inverse, n = t.fn;
                if (e === true) {
                    return n(this);
                } else if (e === false || e == null) {
                    return r(this);
                } else if (s.isArray(e)) {
                    if (e.length > 0) {
                        if (t.ids) {
                            t.ids = [ t.name ];
                        }
                        return a.helpers.each(e, t);
                    } else {
                        return r(this);
                    }
                } else {
                    if (t.data && t.ids) {
                        var i = s.createFrame(t.data);
                        i.contextPath = s.appendContextPath(t.data.contextPath, t.name);
                        t = {
                            data: i
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
        var v = r(5);
        var i = r(6);
        var y = n(i);
        t["default"] = function(e) {
            e.registerHelper("each", function(n, e) {
                if (!e) {
                    throw new y["default"]("Must pass iterator to #each");
                }
                var i = e.fn, t = e.inverse, r = 0, a = "", s = undefined, o = undefined;
                if (e.data && e.ids) {
                    o = v.appendContextPath(e.data.contextPath, e.ids[0]) + ".";
                }
                if (v.isFunction(n)) {
                    n = n.call(this);
                }
                if (e.data) {
                    s = v.createFrame(e.data);
                }
                function l(e, t, r) {
                    if (s) {
                        s.key = e;
                        s.index = t;
                        s.first = t === 0;
                        s.last = !!r;
                        if (o) {
                            s.contextPath = o + e;
                        }
                    }
                    a = a + i(n[e], {
                        data: s,
                        blockParams: v.blockParams([ n[e], e ], [ o + e, null ])
                    });
                }
                if (n && typeof n === "object") {
                    if (v.isArray(n)) {
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
                    a = t(this);
                }
                return a;
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
        var t = e(9), r = e(16), s = e(17), n = e(18), i = e(20), a = e(24), o = e(19), l = e(27), u = e(28), B = e(30), c = e(29), $ = e(31), f = e(36), F = e(37), q = e(38), U = e(39), h = e(32), p = e(26), d = t.getDesc, m = t.setDesc, g = t.create, v = f.get, y = r.Symbol, b = r.JSON, E = b && b.stringify, x = false, S = c("_hidden"), V = t.isEnum, w = l("symbol-registry"), k = l("symbols"), A = typeof y == "function", C = Object.prototype;
        var _ = n && o(function() {
            return g(m({}, "a", {
                get: function() {
                    return m(this, "a", {
                        value: 7
                    }).a;
                }
            })).a != 7;
        }) ? function(e, t, r) {
            var n = d(C, t);
            if (n) delete C[t];
            m(e, t, r);
            if (n && e !== C) m(C, t, n);
        } : m;
        var I = function(t) {
            var e = k[t] = g(y.prototype);
            e._k = t;
            n && x && _(C, t, {
                configurable: true,
                set: function(e) {
                    if (s(this, S) && s(this[S], t)) this[S][t] = false;
                    _(this, t, p(1, e));
                }
            });
            return e;
        };
        var T = function(e) {
            return typeof e == "symbol";
        };
        var O = function e(t, r, n) {
            if (n && s(k, r)) {
                if (!n.enumerable) {
                    if (!s(t, S)) m(t, S, p(1, {}));
                    t[S][r] = true;
                } else {
                    if (s(t, S) && t[S][r]) t[S][r] = false;
                    n = g(n, {
                        enumerable: p(0, false)
                    });
                }
                return _(t, r, n);
            }
            return m(t, r, n);
        };
        var P = function e(t, r) {
            U(t);
            var n = F(r = h(r)), i = 0, a = n.length, s;
            while (a > i) O(t, s = n[i++], r[s]);
            return t;
        };
        var N = function e(t, r) {
            return r === undefined ? g(t) : P(g(t), r);
        };
        var R = function e(t) {
            var r = V.call(this, t);
            return r || !s(this, t) || !s(k, t) || s(this, S) && this[S][t] ? r : true;
        };
        var L = function e(t, r) {
            var n = d(t = h(t), r);
            if (n && s(k, r) && !(s(t, S) && t[S][r])) n.enumerable = true;
            return n;
        };
        var H = function e(t) {
            var r = v(h(t)), n = [], i = 0, a;
            while (r.length > i) if (!s(k, a = r[i++]) && a != S) n.push(a);
            return n;
        };
        var j = function e(t) {
            var r = v(h(t)), n = [], i = 0, a;
            while (r.length > i) if (s(k, a = r[i++])) n.push(k[a]);
            return n;
        };
        var W = function e(t) {
            if (t === undefined || T(t)) return;
            var r = [ t ], n = 1, i = arguments, a, s;
            while (i.length > n) r.push(i[n++]);
            a = r[1];
            if (typeof a == "function") s = a;
            if (s || !q(a)) a = function(e, t) {
                if (s) t = s.call(this, e, t);
                if (!T(t)) return t;
            };
            r[1] = a;
            return E.apply(b, r);
        };
        var G = o(function() {
            var e = y();
            return E([ e ]) != "[null]" || E({
                a: e
            }) != "{}" || E(Object(e)) != "{}";
        });
        if (!A) {
            y = function e() {
                if (T(this)) throw TypeError("Symbol is not a constructor");
                return I(B(arguments.length > 0 ? arguments[0] : undefined));
            };
            a(y.prototype, "toString", function e() {
                return this._k;
            });
            T = function(e) {
                return e instanceof y;
            };
            t.create = N;
            t.isEnum = R;
            t.getDesc = L;
            t.setDesc = O;
            t.setDescs = P;
            t.getNames = f.get = H;
            t.getSymbols = j;
            if (n && !e(41)) {
                a(C, "propertyIsEnumerable", R, true);
            }
        }
        var X = {
            for: function(e) {
                return s(w, e += "") ? w[e] : w[e] = y(e);
            },
            keyFor: function e(t) {
                return $(w, t);
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
            X[e] = A ? t : I(t);
        });
        x = true;
        i(i.G + i.W, {
            Symbol: y
        });
        i(i.S, "Symbol", X);
        i(i.S + i.F * !A, "Object", {
            create: N,
            defineProperty: O,
            defineProperties: P,
            getOwnPropertyDescriptor: L,
            getOwnPropertyNames: H,
            getOwnPropertySymbols: j
        });
        b && i(i.S + i.F * (!A || G), "JSON", {
            stringify: W
        });
        u(y, "Symbol");
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
        var d = r(16), m = r(21), g = r(22), v = "prototype";
        var y = function(e, t, r) {
            var n = e & y.F, i = e & y.G, a = e & y.S, s = e & y.P, o = e & y.B, l = e & y.W, u = i ? m : m[t] || (m[t] = {}), c = i ? d : a ? d[t] : (d[t] || {})[v], f, h, p;
            if (i) r = t;
            for (f in r) {
                h = !n && c && f in c;
                if (h && f in u) continue;
                p = h ? c[f] : r[f];
                u[f] = i && typeof c[f] != "function" ? r[f] : o && h ? g(p, d) : l && c[f] == p ? function(t) {
                    var e = function(e) {
                        return this instanceof t ? new t(e) : t(e);
                    };
                    e[v] = t[v];
                    return e;
                }(p) : s && typeof p == "function" ? g(Function.call, p) : p;
                if (s) (u[v] || (u[v] = {}))[f] = p;
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
        var r = e.exports = {
            version: "1.2.6"
        };
        if (typeof __e == "number") __e = r;
    }, function(e, t, r) {
        var a = r(23);
        e.exports = function(n, i, e) {
            a(n);
            if (i === undefined) return n;
            switch (e) {
              case 1:
                return function(e) {
                    return n.call(i, e);
                };

              case 2:
                return function(e, t) {
                    return n.call(i, e, t);
                };

              case 3:
                return function(e, t, r) {
                    return n.call(i, e, t, r);
                };
            }
            return function() {
                return n.apply(i, arguments);
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
        var n = r(9), i = r(26);
        e.exports = r(18) ? function(e, t, r) {
            return n.setDesc(e, t, i(1, r));
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
        var n = r(16), i = "__core-js_shared__", a = n[i] || (n[i] = {});
        e.exports = function(e) {
            return a[e] || (a[e] = {});
        };
    }, function(e, t, r) {
        var n = r(9).setDesc, i = r(17), a = r(29)("toStringTag");
        e.exports = function(e, t, r) {
            if (e && !i(e = r ? e : e.prototype, a)) n(e, a, {
                configurable: true,
                value: t
            });
        };
    }, function(e, t, r) {
        var n = r(27)("wks"), i = r(30), a = r(16).Symbol;
        e.exports = function(e) {
            return n[e] || (n[e] = a && a[e] || (a || i)("Symbol." + e));
        };
    }, function(e, t) {
        var r = 0, n = Math.random();
        e.exports = function(e) {
            return "Symbol(".concat(e === undefined ? "" : e, ")_", (++r + n).toString(36));
        };
    }, function(e, t, r) {
        var o = r(9), l = r(32);
        e.exports = function(e, t) {
            var r = l(e), n = o.getKeys(r), i = n.length, a = 0, s;
            while (i > a) if (r[s = n[a++]] === t) return s;
        };
    }, function(e, t, r) {
        var n = r(33), i = r(35);
        e.exports = function(e) {
            return n(i(e));
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
        var n = r(32), i = r(9).getNames, a = {}.toString;
        var s = typeof window == "object" && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        var o = function(e) {
            try {
                return i(e);
            } catch (e) {
                return s.slice();
            }
        };
        e.exports.get = function e(t) {
            if (s && a.call(t) == "[object Window]") return o(t);
            return i(n(t));
        };
    }, function(e, t, r) {
        var o = r(9);
        e.exports = function(e) {
            var t = o.getKeys(e), r = o.getSymbols;
            if (r) {
                var n = r(e), i = o.isEnum, a = 0, s;
                while (n.length > a) if (i.call(e, s = n[a++])) t.push(s);
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
        e.exports = function(o) {
            return function(e, t) {
                var r = String(u(e)), n = l(t), i = r.length, a, s;
                if (n < 0 || n >= i) return o ? "" : undefined;
                a = r.charCodeAt(n);
                return a < 55296 || a > 56319 || n + 1 === i || (s = r.charCodeAt(n + 1)) < 56320 || s > 57343 ? o ? r.charAt(n) : a : o ? r.slice(n, n + 2) : (a - 55296 << 10) + (s - 56320) + 65536;
            };
        };
    }, function(e, t) {
        var r = Math.ceil, n = Math.floor;
        e.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? n : r)(e);
        };
    }, function(e, t, r) {
        "use strict";
        var v = r(41), y = r(20), b = r(24), E = r(25), x = r(17), S = r(49), w = r(50), k = r(28), A = r(9).getProto, C = r(29)("iterator"), _ = !([].keys && "next" in [].keys()), I = "@@iterator", T = "keys", O = "values";
        var P = function() {
            return this;
        };
        e.exports = function(e, t, r, n, i, a, s) {
            w(r, t, n);
            var o = function(t) {
                if (!_ && t in f) return f[t];
                switch (t) {
                  case T:
                    return function e() {
                        return new r(this, t);
                    };

                  case O:
                    return function e() {
                        return new r(this, t);
                    };
                }
                return function e() {
                    return new r(this, t);
                };
            };
            var l = t + " Iterator", u = i == O, c = false, f = e.prototype, h = f[C] || f[I] || i && f[i], p = h || o(i), d, m;
            if (h) {
                var g = A(p.call(new e()));
                k(g, l, true);
                if (!v && x(f, I)) E(g, C, P);
                if (u && h.name !== O) {
                    c = true;
                    p = function e() {
                        return h.call(this);
                    };
                }
            }
            if ((!v || s) && (_ || c || !f[C])) {
                E(f, C, p);
            }
            S[t] = p;
            S[l] = P;
            if (i) {
                d = {
                    values: u ? p : o(O),
                    keys: a ? p : o(T),
                    entries: !u ? p : o("entries")
                };
                if (s) for (m in d) {
                    if (!(m in f)) b(f, m, d[m]);
                } else y(y.P + y.F * (_ || c), t, d);
            }
            return d;
        };
    }, function(e, t) {
        e.exports = {};
    }, function(e, t, r) {
        "use strict";
        var n = r(9), i = r(26), a = r(28), s = {};
        r(25)(s, r(29)("iterator"), function() {
            return this;
        });
        e.exports = function(e, t, r) {
            e.prototype = n.create(s, {
                next: i(1, r)
            });
            a(e, t + " Iterator");
        };
    }, function(e, t, r) {
        r(52);
        var n = r(49);
        n.NodeList = n.HTMLCollection = n.Array;
    }, function(e, t, r) {
        "use strict";
        var n = r(53), i = r(54), a = r(49), s = r(32);
        e.exports = r(48)(Array, "Array", function(e, t) {
            this._t = s(e);
            this._i = 0;
            this._k = t;
        }, function() {
            var e = this._t, t = this._k, r = this._i++;
            if (!e || r >= e.length) {
                this._t = undefined;
                return i(1);
            }
            if (t == "keys") return i(0, r);
            if (t == "values") return i(0, e[r]);
            return i(0, [ r, e[r] ]);
        }, "values");
        a.Arguments = a.Array;
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
        var n = r(39), i = r(58);
        e.exports = r(21).getIterator = function(e) {
            var t = i(e);
            if (typeof t != "function") throw TypeError(e + " is not iterable!");
            return n(t.call(e));
        };
    }, function(e, t, r) {
        var n = r(59), i = r(29)("iterator"), a = r(49);
        e.exports = r(21).getIteratorMethod = function(e) {
            if (e != undefined) return e[i] || e["@@iterator"] || a[n(e)];
        };
    }, function(e, t, r) {
        var i = r(34), a = r(29)("toStringTag"), s = i(function() {
            return arguments;
        }()) == "Arguments";
        e.exports = function(e) {
            var t, r, n;
            return e === undefined ? "Undefined" : e === null ? "Null" : typeof (r = (t = Object(e))[a]) == "string" ? r : s ? i(t) : (n = i(t)) == "Object" && typeof t.callee == "function" ? "Arguments" : n;
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
        var i = r(20), a = r(21), s = r(19);
        e.exports = function(e, t) {
            var r = (a.Object || {})[e] || Object[e], n = {};
            n[e] = t(r);
            i(i.S + i.F * s(function() {
                r(1);
            }), "Object", n);
        };
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var i = r(6);
        var a = n(i);
        t["default"] = function(e) {
            e.registerHelper("helperMissing", function() {
                if (arguments.length === 1) {
                    return undefined;
                } else {
                    throw new a["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
                }
            });
        };
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var i = r(5);
        var a = r(6);
        var s = n(a);
        t["default"] = function(r) {
            r.registerHelper("if", function(e, t) {
                if (arguments.length != 2) {
                    throw new s["default"]("#if requires exactly one argument");
                }
                if (i.isFunction(e)) {
                    e = e.call(this);
                }
                if (!t.hash.includeZero && !e || i.isEmpty(e)) {
                    return t.inverse(this);
                } else {
                    return t.fn(this);
                }
            });
            r.registerHelper("unless", function(e, t) {
                if (arguments.length != 2) {
                    throw new s["default"]("#unless requires exactly one argument");
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
        t["default"] = function(i) {
            i.registerHelper("log", function() {
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
                i.log.apply(i, e);
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
        var i = r(5);
        var a = r(6);
        var s = n(a);
        t["default"] = function(e) {
            e.registerHelper("with", function(e, t) {
                if (arguments.length != 2) {
                    throw new s["default"]("#with requires exactly one argument");
                }
                if (i.isFunction(e)) {
                    e = e.call(this);
                }
                var r = t.fn;
                if (!i.isEmpty(e)) {
                    var n = t.data;
                    if (t.data && t.ids) {
                        n = i.createFrame(t.data);
                        n.contextPath = i.appendContextPath(t.data.contextPath, t.ids[0]);
                    }
                    return r(e, {
                        data: n,
                        blockParams: i.blockParams([ e ], [ n && n.contextPath ])
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
        t.registerDefaultDecorators = s;
        var i = r(71);
        var a = n(i);
        function s(e) {
            a["default"](e);
        }
    }, function(e, t, r) {
        "use strict";
        t.__esModule = true;
        var o = r(5);
        t["default"] = function(e) {
            e.registerDecorator("inline", function(i, a, s, e) {
                var t = i;
                if (!a.partials) {
                    a.partials = {};
                    t = function(e, t) {
                        var r = s.partials;
                        s.partials = o.extend({}, r, a.partials);
                        var n = i(e, t);
                        s.partials = r;
                        return n;
                    };
                }
                a.partials[e.args[0]] = e.fn;
                return t;
            });
        };
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        t.__esModule = true;
        var n = r(5);
        var s = {
            methodMap: [ "debug", "info", "warn", "error" ],
            level: "info",
            lookupLevel: function e(t) {
                if (typeof t === "string") {
                    var r = n.indexOf(s.methodMap, t.toLowerCase());
                    if (r >= 0) {
                        t = r;
                    } else {
                        t = parseInt(t, 10);
                    }
                }
                return t;
            },
            log: function e(t) {
                t = s.lookupLevel(t);
                if (typeof console !== "undefined" && s.lookupLevel(s.level) <= t) {
                    var r = s.methodMap[t];
                    if (!console[r]) {
                        r = "log";
                    }
                    for (var n = arguments.length, i = Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++) {
                        i[a - 1] = arguments[a];
                    }
                    console[r].apply(console, i);
                }
            }
        };
        t["default"] = s;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(74)["default"];
        var i = r(60)["default"];
        var a = r(1)["default"];
        t.__esModule = true;
        t.createProtoAccessControl = c;
        t.resultIsAllowed = f;
        t.resetLoggedProperties = d;
        var s = r(76);
        var o = r(72);
        var l = a(o);
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
                    whitelist: s.createNewLookupObject(r, e.allowedProtoProperties),
                    defaultValue: e.allowProtoPropertiesByDefault
                },
                methods: {
                    whitelist: s.createNewLookupObject(t, e.allowedProtoMethods),
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
            i(u).forEach(function(e) {
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
        t.createNewLookupObject = a;
        var i = r(5);
        function a() {
            for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) {
                t[r] = arguments[r];
            }
            return i.extend.apply(undefined, [ n(null) ].concat(t));
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
        var i = r(79)["default"];
        var a = r(60)["default"];
        var n = r(3)["default"];
        var s = r(1)["default"];
        t.__esModule = true;
        t.checkRevision = m;
        t.template = g;
        t.wrapProgram = v;
        t.resolvePartial = y;
        t.invokePartial = b;
        t.noop = E;
        var o = r(5);
        var c = n(o);
        var l = r(6);
        var f = s(l);
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
                var n = u.REVISION_CHANGES[r], i = u.REVISION_CHANGES[t];
                throw new f["default"]("Template was precompiled with an older version of Handlebars than the current runtime. " + "Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + i + ").");
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
                var i = u.VM.invokePartial.call(this, e, t, n);
                if (i == null && u.compile) {
                    r.partials[r.name] = u.compile(e, l.compilerOptions, u);
                    i = r.partials[r.name](t, n);
                }
                if (i != null) {
                    if (r.indent) {
                        var a = i.split("\n");
                        for (var s = 0, o = a.length; s < o; s++) {
                            if (!a[s] && s + 1 === o) {
                                break;
                            }
                            a[s] = r.indent + a[s];
                        }
                        i = a.join("\n");
                    }
                    return i;
                } else {
                    throw new f["default"]("The partial " + r.name + " could not be compiled when running in runtime-only mode");
                }
            }
            var s = {
                strict: function e(t, r, n) {
                    if (!t || !(r in t)) {
                        throw new f["default"]('"' + r + '" not defined in ' + t, {
                            loc: n
                        });
                    }
                    return s.lookupProperty(t, r);
                },
                lookupProperty: function e(t, r) {
                    var n = t[r];
                    if (n == null) {
                        return n;
                    }
                    if (Object.prototype.hasOwnProperty.call(t, r)) {
                        return n;
                    }
                    if (d.resultIsAllowed(n, s.protoAccessControl, r)) {
                        return n;
                    }
                    return undefined;
                },
                lookup: function e(t, r) {
                    var n = t.length;
                    for (var i = 0; i < n; i++) {
                        var a = t[i] && s.lookupProperty(t[i], r);
                        if (a != null) {
                            return t[i][r];
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
                program: function e(t, r, n, i, a) {
                    var s = this.programs[t], o = this.fn(t);
                    if (r || a || i || n) {
                        s = v(this, t, o, r, n, i, a);
                    } else if (!s) {
                        s = this.programs[t] = v(this, t, o);
                    }
                    return s;
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
                nullContext: i({}),
                noop: u.VM.noop,
                compilerInfo: l.compiler
            };
            function o(e) {
                var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var r = t.data;
                o._setup(t);
                if (!t.partial && l.useData) {
                    r = x(e, r);
                }
                var n = undefined, i = l.useBlockParams ? [] : undefined;
                if (l.useDepths) {
                    if (t.depths) {
                        n = e != t.depths[0] ? [ e ].concat(t.depths) : t.depths;
                    } else {
                        n = [ e ];
                    }
                }
                function a(e) {
                    return "" + l.main(s, e, s.helpers, s.partials, r, i, n);
                }
                a = S(l.main, a, s, t.depths || [], r, i);
                return a(e, t);
            }
            o.isTop = true;
            o._setup = function(e) {
                if (!e.partial) {
                    var t = c.extend({}, u.helpers, e.helpers);
                    w(t, s);
                    s.helpers = t;
                    if (l.usePartial) {
                        s.partials = s.mergeIfNeeded(e.partials, u.partials);
                    }
                    if (l.usePartial || l.useDecorators) {
                        s.decorators = c.extend({}, u.decorators, e.decorators);
                    }
                    s.hooks = {};
                    s.protoAccessControl = d.createProtoAccessControl(e);
                    var r = e.allowCallsToHelperMissing || n;
                    h.moveHelperToHooks(s, "helperMissing", r);
                    h.moveHelperToHooks(s, "blockHelperMissing", r);
                } else {
                    s.protoAccessControl = e.protoAccessControl;
                    s.helpers = e.helpers;
                    s.partials = e.partials;
                    s.decorators = e.decorators;
                    s.hooks = e.hooks;
                }
            };
            o._child = function(e, t, r, n) {
                if (l.useBlockParams && !r) {
                    throw new f["default"]("must pass block params");
                }
                if (l.useDepths && !n) {
                    throw new f["default"]("must pass parent depths");
                }
                return v(s, e, l[e], t, 0, r, n);
            };
            return o;
        }
        function v(n, e, i, a, t, s, o) {
            function r(e) {
                var t = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                var r = o;
                if (o && e != o[0] && !(e === n.nullContext && o[0] === null)) {
                    r = [ e ].concat(o);
                }
                return i(n, e, n.helpers, n.partials, t.data || a, s && [ t.blockParams ].concat(s), r);
            }
            r = S(i, r, n, o, a, s);
            r.program = e;
            r.depth = o ? o.length : 0;
            r.blockParams = t || 0;
            return r;
        }
        function y(e, t, r) {
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
        function b(e, t, r) {
            var i = r.data && r.data["partial-block"];
            r.partial = true;
            if (r.ids) {
                r.data.contextPath = r.ids[0] || r.data.contextPath;
            }
            var a = undefined;
            if (r.fn && r.fn !== E) {
                (function() {
                    r.data = u.createFrame(r.data);
                    var n = r.fn;
                    a = r.data["partial-block"] = function e(t) {
                        var r = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
                        r.data = u.createFrame(r.data);
                        r.data["partial-block"] = i;
                        return n(t, r);
                    };
                    if (n.partials) {
                        r.partials = c.extend({}, r.partials, n.partials);
                    }
                })();
            }
            if (e === undefined && a) {
                e = a;
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
        function S(e, t, r, n, i, a) {
            if (e.decorator) {
                var s = {};
                t = e.decorator(t, s, r, n && n[0], i, a, n);
                c.extend(t, s);
            }
            return t;
        }
        function w(r, n) {
            a(r).forEach(function(e) {
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
        var i = r(3)["default"];
        t.__esModule = true;
        t.parseWithoutProcessing = p;
        t.parse = d;
        var a = r(86);
        var s = n(a);
        var o = r(87);
        var l = n(o);
        var u = r(89);
        var c = i(u);
        var f = r(5);
        t.parser = s["default"];
        var h = {};
        f.extend(h, c);
        function p(e, t) {
            if (e.type === "Program") {
                return e;
            }
            s["default"].yy = h;
            h.locInfo = function(e) {
                return new h.SourceLocation(t && t.srcName, e);
            };
            var r = s["default"].parse(e);
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
                performAction: function e(t, r, n, i, a, s, o) {
                    var l = s.length - 1;
                    switch (a) {
                      case 1:
                        return s[l - 1];
                        break;

                      case 2:
                        this.$ = i.prepareProgram(s[l]);
                        break;

                      case 3:
                        this.$ = s[l];
                        break;

                      case 4:
                        this.$ = s[l];
                        break;

                      case 5:
                        this.$ = s[l];
                        break;

                      case 6:
                        this.$ = s[l];
                        break;

                      case 7:
                        this.$ = s[l];
                        break;

                      case 8:
                        this.$ = s[l];
                        break;

                      case 9:
                        this.$ = {
                            type: "CommentStatement",
                            value: i.stripComment(s[l]),
                            strip: i.stripFlags(s[l], s[l]),
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 10:
                        this.$ = {
                            type: "ContentStatement",
                            original: s[l],
                            value: s[l],
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 11:
                        this.$ = i.prepareRawBlock(s[l - 2], s[l - 1], s[l], this._$);
                        break;

                      case 12:
                        this.$ = {
                            path: s[l - 3],
                            params: s[l - 2],
                            hash: s[l - 1]
                        };
                        break;

                      case 13:
                        this.$ = i.prepareBlock(s[l - 3], s[l - 2], s[l - 1], s[l], false, this._$);
                        break;

                      case 14:
                        this.$ = i.prepareBlock(s[l - 3], s[l - 2], s[l - 1], s[l], true, this._$);
                        break;

                      case 15:
                        this.$ = {
                            open: s[l - 5],
                            path: s[l - 4],
                            params: s[l - 3],
                            hash: s[l - 2],
                            blockParams: s[l - 1],
                            strip: i.stripFlags(s[l - 5], s[l])
                        };
                        break;

                      case 16:
                        this.$ = {
                            path: s[l - 4],
                            params: s[l - 3],
                            hash: s[l - 2],
                            blockParams: s[l - 1],
                            strip: i.stripFlags(s[l - 5], s[l])
                        };
                        break;

                      case 17:
                        this.$ = {
                            path: s[l - 4],
                            params: s[l - 3],
                            hash: s[l - 2],
                            blockParams: s[l - 1],
                            strip: i.stripFlags(s[l - 5], s[l])
                        };
                        break;

                      case 18:
                        this.$ = {
                            strip: i.stripFlags(s[l - 1], s[l - 1]),
                            program: s[l]
                        };
                        break;

                      case 19:
                        var u = i.prepareBlock(s[l - 2], s[l - 1], s[l], s[l], false, this._$), c = i.prepareProgram([ u ], s[l - 1].loc);
                        c.chained = true;
                        this.$ = {
                            strip: s[l - 2].strip,
                            program: c,
                            chain: true
                        };
                        break;

                      case 20:
                        this.$ = s[l];
                        break;

                      case 21:
                        this.$ = {
                            path: s[l - 1],
                            strip: i.stripFlags(s[l - 2], s[l])
                        };
                        break;

                      case 22:
                        this.$ = i.prepareMustache(s[l - 3], s[l - 2], s[l - 1], s[l - 4], i.stripFlags(s[l - 4], s[l]), this._$);
                        break;

                      case 23:
                        this.$ = i.prepareMustache(s[l - 3], s[l - 2], s[l - 1], s[l - 4], i.stripFlags(s[l - 4], s[l]), this._$);
                        break;

                      case 24:
                        this.$ = {
                            type: "PartialStatement",
                            name: s[l - 3],
                            params: s[l - 2],
                            hash: s[l - 1],
                            indent: "",
                            strip: i.stripFlags(s[l - 4], s[l]),
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 25:
                        this.$ = i.preparePartialBlock(s[l - 2], s[l - 1], s[l], this._$);
                        break;

                      case 26:
                        this.$ = {
                            path: s[l - 3],
                            params: s[l - 2],
                            hash: s[l - 1],
                            strip: i.stripFlags(s[l - 4], s[l])
                        };
                        break;

                      case 27:
                        this.$ = s[l];
                        break;

                      case 28:
                        this.$ = s[l];
                        break;

                      case 29:
                        this.$ = {
                            type: "SubExpression",
                            path: s[l - 3],
                            params: s[l - 2],
                            hash: s[l - 1],
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 30:
                        this.$ = {
                            type: "Hash",
                            pairs: s[l],
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 31:
                        this.$ = {
                            type: "HashPair",
                            key: i.id(s[l - 2]),
                            value: s[l],
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 32:
                        this.$ = i.id(s[l - 1]);
                        break;

                      case 33:
                        this.$ = s[l];
                        break;

                      case 34:
                        this.$ = s[l];
                        break;

                      case 35:
                        this.$ = {
                            type: "StringLiteral",
                            value: s[l],
                            original: s[l],
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 36:
                        this.$ = {
                            type: "NumberLiteral",
                            value: Number(s[l]),
                            original: Number(s[l]),
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 37:
                        this.$ = {
                            type: "BooleanLiteral",
                            value: s[l] === "true",
                            original: s[l] === "true",
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 38:
                        this.$ = {
                            type: "UndefinedLiteral",
                            original: undefined,
                            value: undefined,
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 39:
                        this.$ = {
                            type: "NullLiteral",
                            original: null,
                            value: null,
                            loc: i.locInfo(this._$)
                        };
                        break;

                      case 40:
                        this.$ = s[l];
                        break;

                      case 41:
                        this.$ = s[l];
                        break;

                      case 42:
                        this.$ = i.preparePath(true, s[l], this._$);
                        break;

                      case 43:
                        this.$ = i.preparePath(false, s[l], this._$);
                        break;

                      case 44:
                        s[l - 2].push({
                            part: i.id(s[l]),
                            original: s[l],
                            separator: s[l - 1]
                        });
                        this.$ = s[l - 2];
                        break;

                      case 45:
                        this.$ = [ {
                            part: i.id(s[l]),
                            original: s[l]
                        } ];
                        break;

                      case 46:
                        this.$ = [];
                        break;

                      case 47:
                        s[l - 1].push(s[l]);
                        break;

                      case 48:
                        this.$ = [];
                        break;

                      case 49:
                        s[l - 1].push(s[l]);
                        break;

                      case 50:
                        this.$ = [];
                        break;

                      case 51:
                        s[l - 1].push(s[l]);
                        break;

                      case 58:
                        this.$ = [];
                        break;

                      case 59:
                        s[l - 1].push(s[l]);
                        break;

                      case 64:
                        this.$ = [];
                        break;

                      case 65:
                        s[l - 1].push(s[l]);
                        break;

                      case 70:
                        this.$ = [];
                        break;

                      case 71:
                        s[l - 1].push(s[l]);
                        break;

                      case 78:
                        this.$ = [];
                        break;

                      case 79:
                        s[l - 1].push(s[l]);
                        break;

                      case 82:
                        this.$ = [];
                        break;

                      case 83:
                        s[l - 1].push(s[l]);
                        break;

                      case 86:
                        this.$ = [];
                        break;

                      case 87:
                        s[l - 1].push(s[l]);
                        break;

                      case 90:
                        this.$ = [];
                        break;

                      case 91:
                        s[l - 1].push(s[l]);
                        break;

                      case 94:
                        this.$ = [];
                        break;

                      case 95:
                        s[l - 1].push(s[l]);
                        break;

                      case 98:
                        this.$ = [ s[l] ];
                        break;

                      case 99:
                        s[l - 1].push(s[l]);
                        break;

                      case 100:
                        this.$ = [ s[l] ];
                        break;

                      case 101:
                        s[l - 1].push(s[l]);
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
                    var r = this, n = [ 0 ], i = [ null ], a = [], s = this.table, o = "", l = 0, u = 0, c = 0, f = 2, h = 1;
                    this.lexer.setInput(t);
                    this.lexer.yy = this.yy;
                    this.yy.lexer = this.lexer;
                    this.yy.parser = this;
                    if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
                    var p = this.lexer.yylloc;
                    a.push(p);
                    var d = this.lexer.options && this.lexer.options.ranges;
                    if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
                    function m(e) {
                        n.length = n.length - 2 * e;
                        i.length = i.length - e;
                        a.length = a.length - e;
                    }
                    function g() {
                        var e;
                        e = r.lexer.lex() || 1;
                        if (typeof e !== "number") {
                            e = r.symbols_[e] || e;
                        }
                        return e;
                    }
                    var v, y, b, E, x, S, w = {}, k, A, C, _;
                    while (true) {
                        b = n[n.length - 1];
                        if (this.defaultActions[b]) {
                            E = this.defaultActions[b];
                        } else {
                            if (v === null || typeof v == "undefined") {
                                v = g();
                            }
                            E = s[b] && s[b][v];
                        }
                        if (typeof E === "undefined" || !E.length || !E[0]) {
                            var I = "";
                            if (!c) {
                                _ = [];
                                for (k in s[b]) if (this.terminals_[k] && k > 2) {
                                    _.push("'" + this.terminals_[k] + "'");
                                }
                                if (this.lexer.showPosition) {
                                    I = "Parse error on line " + (l + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + _.join(", ") + ", got '" + (this.terminals_[v] || v) + "'";
                                } else {
                                    I = "Parse error on line " + (l + 1) + ": Unexpected " + (v == 1 ? "end of input" : "'" + (this.terminals_[v] || v) + "'");
                                }
                                this.parseError(I, {
                                    text: this.lexer.match,
                                    token: this.terminals_[v] || v,
                                    line: this.lexer.yylineno,
                                    loc: p,
                                    expected: _
                                });
                            }
                        }
                        if (E[0] instanceof Array && E.length > 1) {
                            throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + v);
                        }
                        switch (E[0]) {
                          case 1:
                            n.push(v);
                            i.push(this.lexer.yytext);
                            a.push(this.lexer.yylloc);
                            n.push(E[1]);
                            v = null;
                            if (!y) {
                                u = this.lexer.yyleng;
                                o = this.lexer.yytext;
                                l = this.lexer.yylineno;
                                p = this.lexer.yylloc;
                                if (c > 0) c--;
                            } else {
                                v = y;
                                y = null;
                            }
                            break;

                          case 2:
                            A = this.productions_[E[1]][1];
                            w.$ = i[i.length - A];
                            w._$ = {
                                first_line: a[a.length - (A || 1)].first_line,
                                last_line: a[a.length - 1].last_line,
                                first_column: a[a.length - (A || 1)].first_column,
                                last_column: a[a.length - 1].last_column
                            };
                            if (d) {
                                w._$.range = [ a[a.length - (A || 1)].range[0], a[a.length - 1].range[1] ];
                            }
                            S = this.performAction.call(w, o, u, l, this.yy, E[1], i, a);
                            if (typeof S !== "undefined") {
                                return S;
                            }
                            if (A) {
                                n = n.slice(0, -1 * A * 2);
                                i = i.slice(0, -1 * A);
                                a = a.slice(0, -1 * A);
                            }
                            n.push(this.productions_[E[1]][0]);
                            i.push(w.$);
                            a.push(w._$);
                            C = s[n[n.length - 2]][n[n.length - 1]];
                            n.push(C);
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
                        var i = this.match.split(/(?:\r\n?|\n)/g);
                        this.match = this.match.substr(0, this.match.length - 1);
                        this.matched = this.matched.substr(0, this.matched.length - 1);
                        if (n.length - 1) this.yylineno -= n.length - 1;
                        var a = this.yylloc.range;
                        this.yylloc = {
                            first_line: this.yylloc.first_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.first_column,
                            last_column: n ? (n.length === i.length ? this.yylloc.first_column : 0) + i[i.length - n.length].length - n[0].length : this.yylloc.first_column - r
                        };
                        if (this.options.ranges) {
                            this.yylloc.range = [ a[0], a[0] + this.yyleng - r ];
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
                        var t, r, n, i, a, s;
                        if (!this._more) {
                            this.yytext = "";
                            this.match = "";
                        }
                        var o = this._currentRules();
                        for (var l = 0; l < o.length; l++) {
                            n = this._input.match(this.rules[o[l]]);
                            if (n && (!r || n[0].length > r[0].length)) {
                                r = n;
                                i = l;
                                if (!this.options.flex) break;
                            }
                        }
                        if (r) {
                            s = r[0].match(/(?:\r\n?|\n).*/g);
                            if (s) this.yylineno += s.length;
                            this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + r[0].length
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
                            t = this.performAction.call(this, this.yy, this, o[i], this.conditionStack[this.conditionStack.length - 1]);
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
                e.performAction = function e(t, r, n, i) {
                    function a(e, t) {
                        return r.yytext = r.yytext.substring(e, r.yyleng - t + e);
                    }
                    var s = i;
                    switch (n) {
                      case 0:
                        if (r.yytext.slice(-2) === "\\\\") {
                            a(0, 1);
                            this.begin("mu");
                        } else if (r.yytext.slice(-1) === "\\") {
                            a(0, 1);
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
                            a(5, 9);
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
                        r.yytext = a(1, 2).replace(/\\"/g, '"');
                        return 80;
                        break;

                      case 32:
                        r.yytext = a(1, 2).replace(/\\'/g, "'");
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
        var i = r(88);
        var a = n(i);
        function s() {
            var e = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            this.options = e;
        }
        s.prototype = new a["default"]();
        s.prototype.Program = function(e) {
            var t = !this.options.ignoreStandalone;
            var r = !this.isRootSeen;
            this.isRootSeen = true;
            var n = e.body;
            for (var i = 0, a = n.length; i < a; i++) {
                var s = n[i], o = this.accept(s);
                if (!o) {
                    continue;
                }
                var l = p(n, i, r), u = d(n, i, r), c = o.openStandalone && l, f = o.closeStandalone && u, h = o.inlineStandalone && l && u;
                if (o.close) {
                    m(n, i, true);
                }
                if (o.open) {
                    g(n, i, true);
                }
                if (t && h) {
                    m(n, i);
                    if (g(n, i)) {
                        if (s.type === "PartialStatement") {
                            s.indent = /([ \t]+$)/.exec(n[i - 1].original)[1];
                        }
                    }
                }
                if (t && c) {
                    m((s.program || s.inverse).body);
                    g(n, i);
                }
                if (t && f) {
                    m(n, i);
                    g((s.inverse || s.program).body);
                }
            }
            return e;
        };
        s.prototype.BlockStatement = s.prototype.DecoratorBlock = s.prototype.PartialBlockStatement = function(e) {
            this.accept(e.program);
            this.accept(e.inverse);
            var t = e.program || e.inverse, r = e.program && e.inverse, n = r, i = r;
            if (r && r.chained) {
                n = r.body[0].program;
                while (i.chained) {
                    i = i.body[i.body.length - 1].program;
                }
            }
            var a = {
                open: e.openStrip.open,
                close: e.closeStrip.close,
                openStandalone: d(t.body),
                closeStandalone: p((n || t).body)
            };
            if (e.openStrip.close) {
                m(t.body, null, true);
            }
            if (r) {
                var s = e.inverseStrip;
                if (s.open) {
                    g(t.body, null, true);
                }
                if (s.close) {
                    m(n.body, null, true);
                }
                if (e.closeStrip.open) {
                    g(i.body, null, true);
                }
                if (!this.options.ignoreStandalone && p(t.body) && d(n.body)) {
                    g(t.body);
                    m(n.body);
                }
            } else if (e.closeStrip.open) {
                g(t.body, null, true);
            }
            return a;
        };
        s.prototype.Decorator = s.prototype.MustacheStatement = function(e) {
            return e.strip;
        };
        s.prototype.PartialStatement = s.prototype.CommentStatement = function(e) {
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
            var n = e[t - 1], i = e[t - 2];
            if (!n) {
                return r;
            }
            if (n.type === "ContentStatement") {
                return (i || !r ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(n.original);
            }
        }
        function d(e, t, r) {
            if (t === undefined) {
                t = -1;
            }
            var n = e[t + 1], i = e[t + 2];
            if (!n) {
                return r;
            }
            if (n.type === "ContentStatement") {
                return (i || !r ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(n.original);
            }
        }
        function m(e, t, r) {
            var n = e[t == null ? 0 : t + 1];
            if (!n || n.type !== "ContentStatement" || !r && n.rightStripped) {
                return;
            }
            var i = n.value;
            n.value = n.value.replace(r ? /^\s+/ : /^[ \t]*\r?\n?/, "");
            n.rightStripped = n.value !== i;
        }
        function g(e, t, r) {
            var n = e[t == null ? e.length - 1 : t - 1];
            if (!n || n.type !== "ContentStatement" || !r && n.leftStripped) {
                return;
            }
            var i = n.value;
            n.value = n.value.replace(r ? /\s+$/ : /[ \t]+$/, "");
            n.leftStripped = n.value !== i;
            return n.leftStripped;
        }
        t["default"] = s;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        var i = r(6);
        var a = n(i);
        function s() {
            this.parents = [];
        }
        s.prototype = {
            constructor: s,
            mutating: false,
            acceptKey: function e(t, r) {
                var n = this.accept(t[r]);
                if (this.mutating) {
                    if (n && !s.prototype[n.type]) {
                        throw new a["default"]('Unexpected node type "' + n.type + '" found when accepting ' + r + " on " + t.type);
                    }
                    t[r] = n;
                }
            },
            acceptRequired: function e(t, r) {
                this.acceptKey(t, r);
                if (!t[r]) {
                    throw new a["default"](t.type + " requires " + r);
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
                    throw new a["default"]("Unknown type: " + t.type, t);
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
            MustacheStatement: o,
            Decorator: o,
            BlockStatement: l,
            DecoratorBlock: l,
            PartialStatement: u,
            PartialBlockStatement: function e(t) {
                u.call(this, t);
                this.acceptKey(t, "program");
            },
            ContentStatement: function e() {},
            CommentStatement: function e() {},
            SubExpression: o,
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
        function o(e) {
            this.acceptRequired(e, "path");
            this.acceptArray(e.params);
            this.acceptKey(e, "hash");
        }
        function l(e) {
            o.call(this, e);
            this.acceptKey(e, "program");
            this.acceptKey(e, "inverse");
        }
        function u(e) {
            this.acceptRequired(e, "name");
            this.acceptArray(e.params);
            this.acceptKey(e, "hash");
        }
        t["default"] = s;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var n = r(1)["default"];
        t.__esModule = true;
        t.SourceLocation = a;
        t.id = s;
        t.stripFlags = o;
        t.stripComment = l;
        t.preparePath = f;
        t.prepareMustache = h;
        t.prepareRawBlock = p;
        t.prepareBlock = d;
        t.prepareProgram = m;
        t.preparePartialBlock = g;
        var i = r(6);
        var c = n(i);
        function u(e, t) {
            t = t.path ? t.path.original : t;
            if (e.path.original !== t) {
                var r = {
                    loc: e.path.loc
                };
                throw new c["default"](e.path.original + " doesn't match " + t, r);
            }
        }
        function a(e, t) {
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
        function s(e) {
            if (/^\[.*\]$/.test(e)) {
                return e.substring(1, e.length - 1);
            } else {
                return e;
            }
        }
        function o(e, t) {
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
            var n = e ? "@" : "", i = [], a = 0;
            for (var s = 0, o = t.length; s < o; s++) {
                var l = t[s].part, u = t[s].original !== l;
                n += (t[s].separator || "") + l;
                if (!u && (l === ".." || l === "." || l === "this")) {
                    if (i.length > 0) {
                        throw new c["default"]("Invalid path: " + n, {
                            loc: r
                        });
                    } else if (l === "..") {
                        a++;
                    }
                } else {
                    i.push(l);
                }
            }
            return {
                type: "PathExpression",
                data: e,
                depth: a,
                parts: i,
                original: n,
                loc: r
            };
        }
        function h(e, t, r, n, i, a) {
            var s = n.charAt(3) || n.charAt(2), o = s !== "{" && s !== "&";
            var l = /\*/.test(n);
            return {
                type: l ? "Decorator" : "MustacheStatement",
                path: e,
                params: t,
                hash: r,
                escaped: o,
                strip: i,
                loc: this.locInfo(a)
            };
        }
        function p(e, t, r, n) {
            u(e, r);
            n = this.locInfo(n);
            var i = {
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
                program: i,
                openStrip: {},
                inverseStrip: {},
                closeStrip: {},
                loc: n
            };
        }
        function d(e, t, r, n, i, a) {
            if (n && n.path) {
                u(e, n);
            }
            var s = /\*/.test(e.open);
            t.blockParams = e.blockParams;
            var o = undefined, l = undefined;
            if (r) {
                if (s) {
                    throw new c["default"]("Unexpected inverse block on decorator", r);
                }
                if (r.chain) {
                    r.program.body[0].closeStrip = n.strip;
                }
                l = r.strip;
                o = r.program;
            }
            if (i) {
                i = o;
                o = t;
                t = i;
            }
            return {
                type: s ? "DecoratorBlock" : "BlockStatement",
                path: e.path,
                params: e.params,
                hash: e.hash,
                program: t,
                inverse: o,
                openStrip: e.strip,
                inverseStrip: l,
                closeStrip: n && n.strip,
                loc: this.locInfo(a)
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
        var i = r(1)["default"];
        t.__esModule = true;
        t.Compiler = f;
        t.precompile = h;
        t.compile = p;
        var a = r(6);
        var l = i(a);
        var u = r(5);
        var s = r(84);
        var c = i(s);
        var o = [].slice;
        function f() {}
        f.prototype = {
            compiler: f,
            equals: function e(t) {
                var r = this.opcodes.length;
                if (t.opcodes.length !== r) {
                    return false;
                }
                for (var n = 0; n < r; n++) {
                    var i = this.opcodes[n], a = t.opcodes[n];
                    if (i.opcode !== a.opcode || !d(i.args, a.args)) {
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
                var r = new this.compiler(), n = r.compile(t, this.options), i = this.guid++;
                this.usePartial = this.usePartial || n.usePartial;
                this.children[i] = n;
                this.useDepths = this.useDepths || n.useDepths;
                return i;
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
                for (var i = 0; i < n; i++) {
                    this.accept(r[i]);
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
                var i = this.classifySexpr(t);
                if (i === "helper") {
                    this.helperSexpr(t, r, n);
                } else if (i === "simple") {
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
                var n = this.setupFullMustacheParams(t, r, undefined), i = t.path;
                this.useDecorators = true;
                this.opcode("registerDecorator", n.length, i.original);
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
                var i = t.name.original, a = t.name.type === "SubExpression";
                if (a) {
                    this.accept(t.name);
                }
                this.setupFullMustacheParams(t, r, undefined, true);
                var s = t.indent || "";
                if (this.options.preventIndent && s) {
                    this.opcode("appendContent", s);
                    s = "";
                }
                this.opcode("invokePartial", a, i, s);
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
                var i = t.path, a = i.parts[0], s = r != null || n != null;
                this.opcode("getContext", i.depth);
                this.opcode("pushProgram", r);
                this.opcode("pushProgram", n);
                i.strict = true;
                this.accept(i);
                this.opcode("invokeAmbiguous", a, s);
            },
            simpleSexpr: function e(t) {
                var r = t.path;
                r.strict = true;
                this.accept(r);
                this.opcode("resolvePossibleLambda");
            },
            helperSexpr: function e(t, r, n) {
                var i = this.setupFullMustacheParams(t, r, n), a = t.path, s = a.parts[0];
                if (this.options.knownHelpers[s]) {
                    this.opcode("invokeKnownHelper", i.length, s);
                } else if (this.options.knownHelpersOnly) {
                    throw new l["default"]("You specified knownHelpersOnly, but used the unknown helper " + s, t);
                } else {
                    a.strict = true;
                    a.falsy = true;
                    this.accept(a);
                    this.opcode("invokeHelper", i.length, a.original, c["default"].helpers.simpleId(a));
                }
            },
            PathExpression: function e(t) {
                this.addDepth(t.depth);
                this.opcode("getContext", t.depth);
                var r = t.parts[0], n = c["default"].helpers.scopedId(t), i = !t.depth && !n && this.blockParamIndex(r);
                if (i) {
                    this.opcode("lookupBlockParam", i, t.parts);
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
                var r = t.pairs, n = 0, i = r.length;
                this.opcode("pushHash");
                for (;n < i; n++) {
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
                    args: o.call(arguments, 1),
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
                var i = !n && c["default"].helpers.helperExpression(t);
                var a = !n && (i || r);
                if (a && !i) {
                    var s = t.path.parts[0], o = this.options;
                    if (o.knownHelpers[s]) {
                        i = true;
                    } else if (o.knownHelpersOnly) {
                        a = false;
                    }
                }
                if (i) {
                    return "helper";
                } else if (a) {
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
                            var i = t.parts.slice(1).join(".");
                            this.opcode("pushId", "BlockParam", n, i);
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
            setupFullMustacheParams: function e(t, r, n, i) {
                var a = t.params;
                this.pushParams(a);
                this.opcode("pushProgram", r);
                this.opcode("pushProgram", n);
                if (t.hash) {
                    this.accept(t.hash);
                } else {
                    this.opcode("emptyHash", i);
                }
                return a;
            },
            blockParamIndex: function e(t) {
                for (var r = 0, n = this.options.blockParams.length; r < n; r++) {
                    var i = this.options.blockParams[r], a = i && u.indexOf(i, t);
                    if (i && a >= 0) {
                        return [ r, a ];
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
            var n = r.parse(e, t), i = new r.Compiler().compile(n, t);
            return new r.JavaScriptCompiler().compile(i, t);
        }
        function p(n, i, a) {
            if (i === undefined) i = {};
            if (n == null || typeof n !== "string" && n.type !== "Program") {
                throw new l["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + n);
            }
            i = u.extend({}, i);
            if (!("data" in i)) {
                i.data = true;
            }
            if (i.compat) {
                i.useDepths = true;
            }
            var s = undefined;
            function o() {
                var e = a.parse(n, i), t = new a.Compiler().compile(e, i), r = new a.JavaScriptCompiler().compile(t, i, undefined, true);
                return a.template(r);
            }
            function e(e, t) {
                if (!s) {
                    s = o();
                }
                return s.call(this, e, t);
            }
            e._setup = function(e) {
                if (!s) {
                    s = o();
                }
                return s._setup(e);
            };
            e._child = function(e, t, r, n) {
                if (!s) {
                    s = o();
                }
                return s._child(e, t, r, n);
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
        var i = r(4);
        var a = r(6);
        var m = n(a);
        var s = r(5);
        var o = r(92);
        var u = n(o);
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
                var t = i.COMPILER_REVISION, r = i.REVISION_CHANGES[t];
                return [ t, r ];
            },
            appendToBuffer: function e(t, r, n) {
                if (!s.isArray(t)) {
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
            compile: function e(t, r, n, i) {
                this.environment = t;
                this.options = r;
                this.stringParams = this.options.stringParams;
                this.trackIds = this.options.trackIds;
                this.precompile = !i;
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
                var a = t.opcodes, s = undefined, o = undefined, l = undefined, u = undefined;
                for (l = 0, u = a.length; l < u; l++) {
                    s = a[l];
                    this.source.currentLocation = s.loc;
                    o = o || s.loc;
                    this[s.opcode].apply(this, s.args);
                }
                this.source.currentLocation = o;
                this.pushSource("");
                if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
                    throw new m["default"]("Compile completed with content left on stack");
                }
                if (!this.decorators.isEmpty()) {
                    this.useDecorators = true;
                    this.decorators.prepend([ "var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n" ]);
                    this.decorators.push("return fn;");
                    if (i) {
                        this.decorators = Function.apply(this, [ "fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge() ]);
                    } else {
                        this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
                        this.decorators.push("}\n");
                        this.decorators = this.decorators.merge();
                    }
                } else {
                    this.decorators = undefined;
                }
                var c = this.createFunctionContext(i);
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
                    if (!i) {
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
                var i = this.stackVars.concat(this.registers.list);
                if (i.length > 0) {
                    n += ", " + i.join(", ");
                }
                var a = 0;
                l(this.aliases).forEach(function(e) {
                    var t = r.aliases[e];
                    if (t.children && t.referenceCount > 1) {
                        n += ", alias" + ++a + "=" + e;
                        t.children[0] = "alias" + a;
                    }
                });
                if (this.lookupPropertyFunctionIsUsed) {
                    n += ", " + this.lookupPropertyFunctionVarDeclaration();
                }
                var s = [ "container", "depth0", "helpers", "partials", "data" ];
                if (this.useBlockParams || this.useDepths) {
                    s.push("blockParams");
                }
                if (this.useDepths) {
                    s.push("depths");
                }
                var o = this.mergeSource(n);
                if (t) {
                    s.push(o);
                    return Function.apply(this, s);
                } else {
                    return this.source.wrap([ "function(", s.join(","), ") {\n  ", o, "}" ]);
                }
            },
            mergeSource: function e(t) {
                var r = this.environment.isSimple, n = !this.forceBuffer, i = undefined, a = undefined, s = undefined, o = undefined;
                this.source.each(function(e) {
                    if (e.appendToBuffer) {
                        if (s) {
                            e.prepend("  + ");
                        } else {
                            s = e;
                        }
                        o = e;
                    } else {
                        if (s) {
                            if (!a) {
                                i = true;
                            } else {
                                s.prepend("buffer += ");
                            }
                            o.add(";");
                            s = o = undefined;
                        }
                        a = true;
                        if (!r) {
                            n = false;
                        }
                    }
                });
                if (n) {
                    if (s) {
                        s.prepend("return ");
                        o.add(";");
                    } else if (!a) {
                        this.source.push('return "";');
                    }
                } else {
                    t += ", buffer = " + (i ? "" : this.initializeBuffer());
                    if (s) {
                        s.prepend("return buffer + ");
                        o.add(";");
                    } else {
                        this.source.push("return buffer;");
                    }
                }
                if (t) {
                    this.source.prepend("var " + t.substring(2) + (i ? "" : ";\n"));
                }
                return this.source.merge();
            },
            lookupPropertyFunctionVarDeclaration: function e() {
                return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim();
            },
            blockValue: function e(t) {
                var r = this.aliasable("container.hooks.blockHelperMissing"), n = [ this.contextName(0) ];
                this.setupHelperArgs(t, 0, n);
                var i = this.popStack();
                n.splice(1, 0, i);
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
            lookupOnContext: function e(t, r, n, i) {
                var a = 0;
                if (!i && this.options.compat && !this.lastContext) {
                    this.push(this.depthedLookup(t[a++]));
                } else {
                    this.pushContext();
                }
                this.resolvePath("context", t, a, r, n);
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
            resolvePath: function e(r, n, i, a, t) {
                var s = this;
                if (this.options.strict || this.options.assumeObjects) {
                    this.push(h(this.options.strict && t, this, n, i, r));
                    return;
                }
                var o = n.length;
                for (;i < o; i++) {
                    this.replaceStack(function(e) {
                        var t = s.nameLookup(e, n[i], r);
                        if (!a) {
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
                var n = this.nameLookup("decorators", r, "decorator"), i = this.setupHelperArgs(r, t);
                this.decorators.push([ "fn = ", this.decorators.functionCall(n, "", [ "fn", "props", "container", i ]), " || fn;" ]);
            },
            invokeHelper: function e(t, r, n) {
                var i = this.popStack(), a = this.setupHelper(t, r);
                var s = [];
                if (n) {
                    s.push(a.name);
                }
                s.push(i);
                if (!this.options.strict) {
                    s.push(this.aliasable("container.hooks.helperMissing"));
                }
                var o = [ "(", this.itemsSeparatedBy(s, "||"), ")" ];
                var l = this.source.functionCall(o, "call", a.callParams);
                this.push(l);
            },
            itemsSeparatedBy: function e(t, r) {
                var n = [];
                n.push(t[0]);
                for (var i = 1; i < t.length; i++) {
                    n.push(r, t[i]);
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
                var i = this.setupHelper(0, t, r);
                var a = this.lastHelper = this.nameLookup("helpers", t, "helper");
                var s = [ "(", "(helper = ", a, " || ", n, ")" ];
                if (!this.options.strict) {
                    s[0] = "(helper = ";
                    s.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"));
                }
                this.push([ "(", s, i.paramsInit ? [ "),(", i.paramsInit ] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", i.callParams), " : helper))" ]);
            },
            invokePartial: function e(t, r, n) {
                var i = [], a = this.setupParams(r, 1, i);
                if (t) {
                    r = this.popStack();
                    delete a.name;
                }
                if (n) {
                    a.indent = JSON.stringify(n);
                }
                a.helpers = "helpers";
                a.partials = "partials";
                a.decorators = "container.decorators";
                if (!t) {
                    i.unshift(this.nameLookup("partials", r, "partial"));
                } else {
                    i.unshift(r);
                }
                if (this.options.compat) {
                    a.depths = "depths";
                }
                a = this.objectLiteral(a);
                i.push(a);
                this.push(this.source.functionCall("container.invokePartial", "", i));
            },
            assignToHash: function e(t) {
                var r = this.popStack(), n = undefined, i = undefined, a = undefined;
                if (this.trackIds) {
                    a = this.popStack();
                }
                if (this.stringParams) {
                    i = this.popStack();
                    n = this.popStack();
                }
                var s = this.hash;
                if (n) {
                    s.contexts[t] = n;
                }
                if (i) {
                    s.types[t] = i;
                }
                if (a) {
                    s.ids[t] = a;
                }
                s.values[t] = r;
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
                var n = t.children, i = undefined, a = undefined;
                for (var s = 0, o = n.length; s < o; s++) {
                    i = n[s];
                    a = new this.compiler();
                    var l = this.matchExistingProgram(i);
                    if (l == null) {
                        this.context.programs.push("");
                        var u = this.context.programs.length;
                        i.index = u;
                        i.name = "program" + u;
                        this.context.programs[u] = a.compile(i, r, this.context, !this.precompile);
                        this.context.decorators[u] = a.decorators;
                        this.context.environments[u] = i;
                        this.useDepths = this.useDepths || a.useDepths;
                        this.useBlockParams = this.useBlockParams || a.useBlockParams;
                        i.useDepths = this.useDepths;
                        i.useBlockParams = this.useBlockParams;
                    } else {
                        i.index = l.index;
                        i.name = "program" + l.index;
                        this.useDepths = this.useDepths || l.useDepths;
                        this.useBlockParams = this.useBlockParams || l.useBlockParams;
                    }
                }
            },
            matchExistingProgram: function e(t) {
                for (var r = 0, n = this.context.environments.length; r < n; r++) {
                    var i = this.context.environments[r];
                    if (i && i.equals(t)) {
                        return i;
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
                var r = [ "(" ], n = undefined, i = undefined, a = undefined;
                if (!this.isInline()) {
                    throw new m["default"]("replaceStack on non-inline");
                }
                var s = this.popStack(true);
                if (s instanceof c) {
                    n = [ s.value ];
                    r = [ "(", n ];
                    a = true;
                } else {
                    i = true;
                    var o = this.incrStack();
                    r = [ "((", this.push(o), " = ", s, ")" ];
                    n = this.topStack();
                }
                var l = t.call(this, n);
                if (!a) {
                    this.popStack();
                }
                if (i) {
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
                    var i = t[r];
                    if (i instanceof c) {
                        this.compileStack.push(i);
                    } else {
                        var a = this.incrStack();
                        this.pushSource([ a, " = ", i, ";" ]);
                        this.compileStack.push(a);
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
                var i = [], a = this.setupHelperArgs(r, t, i, n);
                var s = this.nameLookup("helpers", r, "helper"), o = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
                return {
                    params: i,
                    paramsInit: a,
                    name: s,
                    callParams: [ o ].concat(i)
                };
            },
            setupParams: function e(t, r, n) {
                var i = {}, a = [], s = [], o = [], l = !n, u = undefined;
                if (l) {
                    n = [];
                }
                i.name = this.quotedString(t);
                i.hash = this.popStack();
                if (this.trackIds) {
                    i.hashIds = this.popStack();
                }
                if (this.stringParams) {
                    i.hashTypes = this.popStack();
                    i.hashContexts = this.popStack();
                }
                var c = this.popStack(), f = this.popStack();
                if (f || c) {
                    i.fn = f || "container.noop";
                    i.inverse = c || "container.noop";
                }
                var h = r;
                while (h--) {
                    u = this.popStack();
                    n[h] = u;
                    if (this.trackIds) {
                        o[h] = this.popStack();
                    }
                    if (this.stringParams) {
                        s[h] = this.popStack();
                        a[h] = this.popStack();
                    }
                }
                if (l) {
                    i.args = this.source.generateArray(n);
                }
                if (this.trackIds) {
                    i.ids = this.source.generateArray(o);
                }
                if (this.stringParams) {
                    i.types = this.source.generateArray(s);
                    i.contexts = this.source.generateArray(a);
                }
                if (this.options.data) {
                    i.data = "data";
                }
                if (this.useBlockParams) {
                    i.blockParams = "blockParams";
                }
                return i;
            },
            setupHelperArgs: function e(t, r, n, i) {
                var a = this.setupParams(t, r, n);
                a.loc = JSON.stringify(this.source.currentLocation);
                a = this.objectLiteral(a);
                if (i) {
                    this.useRegister("options");
                    n.push("options");
                    return [ "options=", a ];
                } else if (n) {
                    n.push(a);
                    return "";
                } else {
                    return a;
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
        function h(e, t, r, n, i) {
            var a = t.popStack(), s = r.length;
            if (e) {
                s--;
            }
            for (;n < s; n++) {
                a = t.nameLookup(a, r[n], i);
            }
            if (e) {
                return [ t.aliasable("container.strict"), "(", a, ", ", t.quotedString(r[n]), ", ", JSON.stringify(t.source.currentLocation), " )" ];
            } else {
                return a;
            }
        }
        t["default"] = f;
        e.exports = t["default"];
    }, function(e, t, r) {
        "use strict";
        var a = r(60)["default"];
        t.__esModule = true;
        var s = r(5);
        var n = undefined;
        try {
            if (false) {
                var i = require("source-map");
                n = i.SourceNode;
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
                    if (s.isArray(t)) {
                        t = t.join("");
                    }
                    this.src += t;
                },
                prepend: function e(t) {
                    if (s.isArray(t)) {
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
        function o(e, t, r) {
            if (s.isArray(e)) {
                var n = [];
                for (var i = 0, a = e.length; i < a; i++) {
                    n.push(t.wrap(e[i], r));
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
                t = o(t, this, r);
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
                var i = [];
                a(r).forEach(function(e) {
                    var t = o(r[e], n);
                    if (t !== "undefined") {
                        i.push([ n.quotedString(e), ":", t ]);
                    }
                });
                var t = this.generateList(i);
                t.prepend("{");
                t.add("}");
                return t;
            },
            generateList: function e(t) {
                var r = this.empty();
                for (var n = 0, i = t.length; n < i; n++) {
                    if (n) {
                        r.add(",");
                    }
                    r.add(o(t[n], this));
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
(function(e, t) {
    if (typeof define === "function" && define.amd) {
        define([], t);
    } else if (typeof module === "object" && module.exports) {
        module.exports = t();
    } else {
        e.htmx = e.htmx || t();
    }
})(typeof self !== "undefined" ? self : this, function() {
    return function() {
        "use strict";
        var htmx = {
            onLoad: onLoadHelper,
            process: processNode,
            on: addEventListenerImpl,
            off: removeEventListenerImpl,
            trigger: triggerEvent,
            ajax: ajaxHelper,
            find: find,
            findAll: findAll,
            closest: closest,
            values: function(e, t) {
                var r = getInputValues(e, t || "post");
                return r.values;
            },
            remove: removeElement,
            addClass: addClassToElement,
            removeClass: removeClassFromElement,
            toggleClass: toggleClassOnElement,
            takeClass: takeClassForElement,
            defineExtension: defineExtension,
            removeExtension: removeExtension,
            logAll: logAll,
            logNone: logNone,
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
                attributesToSettle: [ "class", "style", "width", "height" ],
                withCredentials: false,
                timeout: 0,
                wsReconnectDelay: "full-jitter",
                wsBinaryType: "blob",
                disableSelector: "[hx-disable], [data-hx-disable]",
                useTemplateFragments: false,
                scrollBehavior: "smooth",
                defaultFocusScroll: false,
                getCacheBusterParam: false,
                globalViewTransitions: false,
                methodsThatUseUrlParams: [ "get" ],
                selfRequestsOnly: false,
                ignoreTitle: false,
                scrollIntoViewOnBoost: true,
                triggerSpecsCache: null
            },
            parseInterval: parseInterval,
            _: internalEval,
            createEventSource: function(e) {
                return new EventSource(e, {
                    withCredentials: true
                });
            },
            createWebSocket: function(e) {
                var t = new WebSocket(e, []);
                t.binaryType = htmx.config.wsBinaryType;
                return t;
            },
            version: "1.9.12"
        };
        var internalAPI = {
            addTriggerHandler: addTriggerHandler,
            bodyContains: bodyContains,
            canAccessLocalStorage: canAccessLocalStorage,
            findThisElement: findThisElement,
            filterValues: filterValues,
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
            selectAndSwap: selectAndSwap,
            settleImmediately: settleImmediately,
            shouldCancel: shouldCancel,
            triggerEvent: triggerEvent,
            triggerErrorEvent: triggerErrorEvent,
            withExtensions: withExtensions
        };
        var VERBS = [ "get", "post", "put", "delete", "patch" ];
        var VERB_SELECTOR = VERBS.map(function(e) {
            return "[hx-" + e + "], [data-hx-" + e + "]";
        }).join(", ");
        var HEAD_TAG_REGEX = makeTagRegEx("head"), TITLE_TAG_REGEX = makeTagRegEx("title"), SVG_TAGS_REGEX = makeTagRegEx("svg", true);
        function makeTagRegEx(e, t) {
            return new RegExp("<" + e + "(\\s[^>]*>|>)([\\s\\S]*?)<\\/" + e + ">", !!t ? "gim" : "im");
        }
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
            return e.getAttribute && e.getAttribute(t);
        }
        function hasAttribute(e, t) {
            return e.hasAttribute && (e.hasAttribute(t) || e.hasAttribute("data-" + t));
        }
        function getAttributeValue(e, t) {
            return getRawAttribute(e, t) || getRawAttribute(e, "data-" + t);
        }
        function parentElt(e) {
            return e.parentElement;
        }
        function getDocument() {
            return document;
        }
        function getClosestMatch(e, t) {
            while (e && !t(e)) {
                e = parentElt(e);
            }
            return e ? e : null;
        }
        function getAttributeValueWithDisinheritance(e, t, r) {
            var n = getAttributeValue(t, r);
            var i = getAttributeValue(t, "hx-disinherit");
            if (e !== t && i && (i === "*" || i.split(" ").indexOf(r) >= 0)) {
                return "unset";
            } else {
                return n;
            }
        }
        function getClosestAttributeValue(t, r) {
            var n = null;
            getClosestMatch(t, function(e) {
                return n = getAttributeValueWithDisinheritance(t, e, r);
            });
            if (n !== "unset") {
                return n;
            }
        }
        function matches(e, t) {
            var r = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector;
            return r && r.call(e, t);
        }
        function getStartTag(e) {
            var t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
            var r = t.exec(e);
            if (r) {
                return r[1].toLowerCase();
            } else {
                return "";
            }
        }
        function parseHTML(e, t) {
            var r = new DOMParser();
            var n = r.parseFromString(e, "text/html");
            var i = n.body;
            while (t > 0) {
                t--;
                i = i.firstChild;
            }
            if (i == null) {
                i = getDocument().createDocumentFragment();
            }
            return i;
        }
        function aFullPageResponse(e) {
            return /<body/.test(e);
        }
        function makeFragment(e) {
            var t = !aFullPageResponse(e);
            var r = getStartTag(e);
            var n = e;
            if (r === "head") {
                n = n.replace(HEAD_TAG_REGEX, "");
            }
            if (htmx.config.useTemplateFragments && t) {
                var i = parseHTML("<body><template>" + n + "</template></body>", 0);
                var a = i.querySelector("template").content;
                if (htmx.config.allowScriptTags) {
                    forEach(a.querySelectorAll("script"), function(e) {
                        if (htmx.config.inlineScriptNonce) {
                            e.nonce = htmx.config.inlineScriptNonce;
                        }
                        e.htmxExecuted = navigator.userAgent.indexOf("Firefox") === -1;
                    });
                } else {
                    forEach(a.querySelectorAll("script"), function(e) {
                        removeElement(e);
                    });
                }
                return a;
            }
            switch (r) {
              case "thead":
              case "tbody":
              case "tfoot":
              case "colgroup":
              case "caption":
                return parseHTML("<table>" + n + "</table>", 1);

              case "col":
                return parseHTML("<table><colgroup>" + n + "</colgroup></table>", 2);

              case "tr":
                return parseHTML("<table><tbody>" + n + "</tbody></table>", 2);

              case "td":
              case "th":
                return parseHTML("<table><tbody><tr>" + n + "</tr></tbody></table>", 3);

              case "script":
              case "style":
                return parseHTML("<div>" + n + "</div>", 1);

              default:
                return parseHTML(n, 0);
            }
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
            return isType(e, "Function");
        }
        function isRawObject(e) {
            return isType(e, "Object");
        }
        function getInternalData(e) {
            var t = "htmx-internal-data";
            var r = e[t];
            if (!r) {
                r = e[t] = {};
            }
            return r;
        }
        function toArray(e) {
            var t = [];
            if (e) {
                for (var r = 0; r < e.length; r++) {
                    t.push(e[r]);
                }
            }
            return t;
        }
        function forEach(e, t) {
            if (e) {
                for (var r = 0; r < e.length; r++) {
                    t(e[r]);
                }
            }
        }
        function isScrolledIntoView(e) {
            var t = e.getBoundingClientRect();
            var r = t.top;
            var n = t.bottom;
            return r < window.innerHeight && n >= 0;
        }
        function bodyContains(e) {
            if (e.getRootNode && e.getRootNode() instanceof window.ShadowRoot) {
                return getDocument().body.contains(e.getRootNode().host);
            } else {
                return getDocument().body.contains(e);
            }
        }
        function splitOnWhitespace(e) {
            return e.trim().split(/\s+/);
        }
        function mergeObjects(e, t) {
            for (var r in t) {
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
            var e = "htmx:localStorageTest";
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
                var e = new URL(t);
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
            var e = htmx.on("htmx:load", function(e) {
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
            if (t) {
                return e.querySelector(t);
            } else {
                return find(getDocument(), e);
            }
        }
        function findAll(e, t) {
            if (t) {
                return e.querySelectorAll(t);
            } else {
                return findAll(getDocument(), e);
            }
        }
        function removeElement(e, t) {
            e = resolveTarget(e);
            if (t) {
                setTimeout(function() {
                    removeElement(e);
                    e = null;
                }, t);
            } else {
                e.parentElement.removeChild(e);
            }
        }
        function addClassToElement(e, t, r) {
            e = resolveTarget(e);
            if (r) {
                setTimeout(function() {
                    addClassToElement(e, t);
                    e = null;
                }, r);
            } else {
                e.classList && e.classList.add(t);
            }
        }
        function removeClassFromElement(e, t, r) {
            e = resolveTarget(e);
            if (r) {
                setTimeout(function() {
                    removeClassFromElement(e, t);
                    e = null;
                }, r);
            } else {
                if (e.classList) {
                    e.classList.remove(t);
                    if (e.classList.length === 0) {
                        e.removeAttribute("class");
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
            addClassToElement(e, t);
        }
        function closest(e, t) {
            e = resolveTarget(e);
            if (e.closest) {
                return e.closest(t);
            } else {
                do {
                    if (e == null || matches(e, t)) {
                        return e;
                    }
                } while (e = e && parentElt(e));
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
            var t = e.trim();
            if (startsWith(t, "<") && endsWith(t, "/>")) {
                return t.substring(1, t.length - 2);
            } else {
                return t;
            }
        }
        function querySelectorAllExt(e, t) {
            if (t.indexOf("closest ") === 0) {
                return [ closest(e, normalizeSelector(t.substr(8))) ];
            } else if (t.indexOf("find ") === 0) {
                return [ find(e, normalizeSelector(t.substr(5))) ];
            } else if (t === "next") {
                return [ e.nextElementSibling ];
            } else if (t.indexOf("next ") === 0) {
                return [ scanForwardQuery(e, normalizeSelector(t.substr(5))) ];
            } else if (t === "previous") {
                return [ e.previousElementSibling ];
            } else if (t.indexOf("previous ") === 0) {
                return [ scanBackwardsQuery(e, normalizeSelector(t.substr(9))) ];
            } else if (t === "document") {
                return [ document ];
            } else if (t === "window") {
                return [ window ];
            } else if (t === "body") {
                return [ document.body ];
            } else {
                return getDocument().querySelectorAll(normalizeSelector(t));
            }
        }
        var scanForwardQuery = function(e, t) {
            var r = getDocument().querySelectorAll(t);
            for (var n = 0; n < r.length; n++) {
                var i = r[n];
                if (i.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_PRECEDING) {
                    return i;
                }
            }
        };
        var scanBackwardsQuery = function(e, t) {
            var r = getDocument().querySelectorAll(t);
            for (var n = r.length - 1; n >= 0; n--) {
                var i = r[n];
                if (i.compareDocumentPosition(e) === Node.DOCUMENT_POSITION_FOLLOWING) {
                    return i;
                }
            }
        };
        function querySelectorExt(e, t) {
            if (t) {
                return querySelectorAllExt(e, t)[0];
            } else {
                return querySelectorAllExt(getDocument().body, e)[0];
            }
        }
        function resolveTarget(e) {
            if (isType(e, "String")) {
                return find(e);
            } else {
                return e;
            }
        }
        function processEventArgs(e, t, r) {
            if (isFunction(t)) {
                return {
                    target: getDocument().body,
                    event: e,
                    listener: t
                };
            } else {
                return {
                    target: resolveTarget(e),
                    event: t,
                    listener: r
                };
            }
        }
        function addEventListenerImpl(t, r, n) {
            ready(function() {
                var e = processEventArgs(t, r, n);
                e.target.addEventListener(e.event, e.listener);
            });
            var e = isFunction(r);
            return e ? r : n;
        }
        function removeEventListenerImpl(t, r, n) {
            ready(function() {
                var e = processEventArgs(t, r, n);
                e.target.removeEventListener(e.event, e.listener);
            });
            return isFunction(r) ? r : n;
        }
        var DUMMY_ELT = getDocument().createElement("output");
        function findAttributeTargets(e, t) {
            var r = getClosestAttributeValue(e, t);
            if (r) {
                if (r === "this") {
                    return [ findThisElement(e, t) ];
                } else {
                    var n = querySelectorAllExt(e, r);
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
            return getClosestMatch(e, function(e) {
                return getAttributeValue(e, t) != null;
            });
        }
        function getTarget(e) {
            var t = getClosestAttributeValue(e, "hx-target");
            if (t) {
                if (t === "this") {
                    return findThisElement(e, "hx-target");
                } else {
                    return querySelectorExt(e, t);
                }
            } else {
                var r = getInternalData(e);
                if (r.boosted) {
                    return getDocument().body;
                } else {
                    return e;
                }
            }
        }
        function shouldSettleAttribute(e) {
            var t = htmx.config.attributesToSettle;
            for (var r = 0; r < t.length; r++) {
                if (e === t[r]) {
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
        function isInlineSwap(e, t) {
            var r = getExtensions(t);
            for (var n = 0; n < r.length; n++) {
                var i = r[n];
                try {
                    if (i.isInlineSwap(e)) {
                        return true;
                    }
                } catch (e) {
                    logError(e);
                }
            }
            return e === "outerHTML";
        }
        function oobSwap(e, i, a) {
            var t = "#" + getRawAttribute(i, "id");
            var s = "outerHTML";
            if (e === "true") {} else if (e.indexOf(":") > 0) {
                s = e.substr(0, e.indexOf(":"));
                t = e.substr(e.indexOf(":") + 1, e.length);
            } else {
                s = e;
            }
            var r = getDocument().querySelectorAll(t);
            if (r) {
                forEach(r, function(e) {
                    var t;
                    var r = i.cloneNode(true);
                    t = getDocument().createDocumentFragment();
                    t.appendChild(r);
                    if (!isInlineSwap(s, e)) {
                        t = r;
                    }
                    var n = {
                        shouldSwap: true,
                        target: e,
                        fragment: t
                    };
                    if (!triggerEvent(e, "htmx:oobBeforeSwap", n)) return;
                    e = n.target;
                    if (n["shouldSwap"]) {
                        swap(s, e, e, t, a);
                    }
                    forEach(a.elts, function(e) {
                        triggerEvent(e, "htmx:oobAfterSwap", n);
                    });
                });
                i.parentNode.removeChild(i);
            } else {
                i.parentNode.removeChild(i);
                triggerErrorEvent(getDocument().body, "htmx:oobErrorNoTarget", {
                    content: i
                });
            }
            return e;
        }
        function handleOutOfBandSwaps(e, t, r) {
            var n = getClosestAttributeValue(e, "hx-select-oob");
            if (n) {
                var i = n.split(",");
                for (var a = 0; a < i.length; a++) {
                    var s = i[a].split(":", 2);
                    var o = s[0].trim();
                    if (o.indexOf("#") === 0) {
                        o = o.substring(1);
                    }
                    var l = s[1] || "true";
                    var u = t.querySelector("#" + o);
                    if (u) {
                        oobSwap(l, u, r);
                    }
                }
            }
            forEach(findAll(t, "[hx-swap-oob], [data-hx-swap-oob]"), function(e) {
                var t = getAttributeValue(e, "hx-swap-oob");
                if (t != null) {
                    oobSwap(t, e, r);
                }
            });
        }
        function handlePreservedElements(e) {
            forEach(findAll(e, "[hx-preserve], [data-hx-preserve]"), function(e) {
                var t = getAttributeValue(e, "id");
                var r = getDocument().getElementById(t);
                if (r != null) {
                    e.parentNode.replaceChild(r, e);
                }
            });
        }
        function handleAttributes(s, e, o) {
            forEach(e.querySelectorAll("[id]"), function(e) {
                var t = getRawAttribute(e, "id");
                if (t && t.length > 0) {
                    var r = t.replace("'", "\\'");
                    var n = e.tagName.replace(":", "\\:");
                    var i = s.querySelector(n + "[id='" + r + "']");
                    if (i && i !== s) {
                        var a = e.cloneNode();
                        cloneAttributes(e, i);
                        o.tasks.push(function() {
                            cloneAttributes(e, a);
                        });
                    }
                }
            });
        }
        function makeAjaxLoadTask(e) {
            return function() {
                removeClassFromElement(e, htmx.config.addedClass);
                processNode(e);
                processScripts(e);
                processFocus(e);
                triggerEvent(e, "htmx:load");
            };
        }
        function processFocus(e) {
            var t = "[autofocus]";
            var r = matches(e, t) ? e : e.querySelector(t);
            if (r != null) {
                r.focus();
            }
        }
        function insertNodesBefore(e, t, r, n) {
            handleAttributes(e, r, n);
            while (r.childNodes.length > 0) {
                var i = r.firstChild;
                addClassToElement(i, htmx.config.addedClass);
                e.insertBefore(i, t);
                if (i.nodeType !== Node.TEXT_NODE && i.nodeType !== Node.COMMENT_NODE) {
                    n.tasks.push(makeAjaxLoadTask(i));
                }
            }
        }
        function stringHash(e, t) {
            var r = 0;
            while (r < e.length) {
                t = (t << 5) - t + e.charCodeAt(r++) | 0;
            }
            return t;
        }
        function attributeHash(e) {
            var t = 0;
            if (e.attributes) {
                for (var r = 0; r < e.attributes.length; r++) {
                    var n = e.attributes[r];
                    if (n.value) {
                        t = stringHash(n.name, t);
                        t = stringHash(n.value, t);
                    }
                }
            }
            return t;
        }
        function deInitOnHandlers(e) {
            var t = getInternalData(e);
            if (t.onHandlers) {
                for (var r = 0; r < t.onHandlers.length; r++) {
                    const n = t.onHandlers[r];
                    e.removeEventListener(n.event, n.listener);
                }
                delete t.onHandlers;
            }
        }
        function deInitNode(e) {
            var t = getInternalData(e);
            if (t.timeout) {
                clearTimeout(t.timeout);
            }
            if (t.webSocket) {
                t.webSocket.close();
            }
            if (t.sseEventSource) {
                t.sseEventSource.close();
            }
            if (t.listenerInfos) {
                forEach(t.listenerInfos, function(e) {
                    if (e.on) {
                        e.on.removeEventListener(e.trigger, e.listener);
                    }
                });
            }
            deInitOnHandlers(e);
            forEach(Object.keys(t), function(e) {
                delete t[e];
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
            if (t.tagName === "BODY") {
                return swapInnerHTML(t, e, r);
            } else {
                var n;
                var i = t.previousSibling;
                insertNodesBefore(parentElt(t), t, e, r);
                if (i == null) {
                    n = parentElt(t).firstChild;
                } else {
                    n = i.nextSibling;
                }
                r.elts = r.elts.filter(function(e) {
                    return e != t;
                });
                while (n && n !== t) {
                    if (n.nodeType === Node.ELEMENT_NODE) {
                        r.elts.push(n);
                    }
                    n = n.nextElementSibling;
                }
                cleanUpElement(t);
                parentElt(t).removeChild(t);
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
        function swapDelete(e, t, r) {
            cleanUpElement(e);
            return parentElt(e).removeChild(e);
        }
        function swapInnerHTML(e, t, r) {
            var n = e.firstChild;
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
        function maybeSelectFromResponse(e, t, r) {
            var n = r || getClosestAttributeValue(e, "hx-select");
            if (n) {
                var i = getDocument().createDocumentFragment();
                forEach(t.querySelectorAll(n), function(e) {
                    i.appendChild(e);
                });
                t = i;
            }
            return t;
        }
        function swap(e, t, r, n, i) {
            switch (e) {
              case "none":
                return;

              case "outerHTML":
                swapOuterHTML(r, n, i);
                return;

              case "afterbegin":
                swapAfterBegin(r, n, i);
                return;

              case "beforebegin":
                swapBeforeBegin(r, n, i);
                return;

              case "beforeend":
                swapBeforeEnd(r, n, i);
                return;

              case "afterend":
                swapAfterEnd(r, n, i);
                return;

              case "delete":
                swapDelete(r, n, i);
                return;

              default:
                var a = getExtensions(t);
                for (var s = 0; s < a.length; s++) {
                    var o = a[s];
                    try {
                        var l = o.handleSwap(e, r, n, i);
                        if (l) {
                            if (typeof l.length !== "undefined") {
                                for (var u = 0; u < l.length; u++) {
                                    var c = l[u];
                                    if (c.nodeType !== Node.TEXT_NODE && c.nodeType !== Node.COMMENT_NODE) {
                                        i.tasks.push(makeAjaxLoadTask(c));
                                    }
                                }
                            }
                            return;
                        }
                    } catch (e) {
                        logError(e);
                    }
                }
                if (e === "innerHTML") {
                    swapInnerHTML(r, n, i);
                } else {
                    swap(htmx.config.defaultSwapStyle, t, r, n, i);
                }
            }
        }
        function findTitle(e) {
            if (e.indexOf("<title") > -1) {
                var t = e.replace(SVG_TAGS_REGEX, "");
                var r = t.match(TITLE_TAG_REGEX);
                if (r) {
                    return r[2];
                }
            }
        }
        function selectAndSwap(e, t, r, n, i, a) {
            i.title = findTitle(n);
            var s = makeFragment(n);
            if (s) {
                handleOutOfBandSwaps(r, s, i);
                s = maybeSelectFromResponse(r, s, a);
                handlePreservedElements(s);
                return swap(e, r, t, s, i);
            }
        }
        function handleTrigger(e, t, r) {
            var n = e.getResponseHeader(t);
            if (n.indexOf("{") === 0) {
                var i = parseJSON(n);
                for (var a in i) {
                    if (i.hasOwnProperty(a)) {
                        var s = i[a];
                        if (!isRawObject(s)) {
                            s = {
                                value: s
                            };
                        }
                        triggerEvent(r, a, s);
                    }
                }
            } else {
                var o = n.split(",");
                for (var l = 0; l < o.length; l++) {
                    triggerEvent(r, o[l].trim(), []);
                }
            }
        }
        var WHITESPACE = /\s/;
        var WHITESPACE_OR_COMMA = /[\s,]/;
        var SYMBOL_START = /[_$a-zA-Z]/;
        var SYMBOL_CONT = /[_$a-zA-Z0-9]/;
        var STRINGISH_START = [ '"', "'", "/" ];
        var NOT_WHITESPACE = /[^\s]/;
        var COMBINED_SELECTOR_START = /[{(]/;
        var COMBINED_SELECTOR_END = /[})]/;
        function tokenizeString(e) {
            var t = [];
            var r = 0;
            while (r < e.length) {
                if (SYMBOL_START.exec(e.charAt(r))) {
                    var n = r;
                    while (SYMBOL_CONT.exec(e.charAt(r + 1))) {
                        r++;
                    }
                    t.push(e.substr(n, r - n + 1));
                } else if (STRINGISH_START.indexOf(e.charAt(r)) !== -1) {
                    var i = e.charAt(r);
                    var n = r;
                    r++;
                    while (r < e.length && e.charAt(r) !== i) {
                        if (e.charAt(r) === "\\") {
                            r++;
                        }
                        r++;
                    }
                    t.push(e.substr(n, r - n + 1));
                } else {
                    var a = e.charAt(r);
                    t.push(a);
                }
                r++;
            }
            return t;
        }
        function isPossibleRelativeReference(e, t, r) {
            return SYMBOL_START.exec(e.charAt(0)) && e !== "true" && e !== "false" && e !== "this" && e !== r && t !== ".";
        }
        function maybeGenerateConditional(e, t, r) {
            if (t[0] === "[") {
                t.shift();
                var n = 1;
                var i = " return (function(" + r + "){ return (";
                var a = null;
                while (t.length > 0) {
                    var s = t[0];
                    if (s === "]") {
                        n--;
                        if (n === 0) {
                            if (a === null) {
                                i = i + "true";
                            }
                            t.shift();
                            i += ")})";
                            try {
                                var o = maybeEval(e, function() {
                                    return Function(i)();
                                }, function() {
                                    return true;
                                });
                                o.source = i;
                                return o;
                            } catch (e) {
                                triggerErrorEvent(getDocument().body, "htmx:syntax:error", {
                                    error: e,
                                    source: i
                                });
                                return null;
                            }
                        }
                    } else if (s === "[") {
                        n++;
                    }
                    if (isPossibleRelativeReference(s, a, r)) {
                        i += "((" + r + "." + s + ") ? (" + r + "." + s + ") : (window." + s + "))";
                    } else {
                        i = i + s;
                    }
                    a = t.shift();
                }
            }
        }
        function consumeUntil(e, t) {
            var r = "";
            while (e.length > 0 && !t.test(e[0])) {
                r += e.shift();
            }
            return r;
        }
        function consumeCSSSelector(e) {
            var t;
            if (e.length > 0 && COMBINED_SELECTOR_START.test(e[0])) {
                e.shift();
                t = consumeUntil(e, COMBINED_SELECTOR_END).trim();
                e.shift();
            } else {
                t = consumeUntil(e, WHITESPACE_OR_COMMA);
            }
            return t;
        }
        var INPUT_SELECTOR = "input, textarea, select";
        function parseAndCacheTrigger(e, t, r) {
            var n = [];
            var i = tokenizeString(t);
            do {
                consumeUntil(i, NOT_WHITESPACE);
                var a = i.length;
                var s = consumeUntil(i, /[,\[\s]/);
                if (s !== "") {
                    if (s === "every") {
                        var o = {
                            trigger: "every"
                        };
                        consumeUntil(i, NOT_WHITESPACE);
                        o.pollInterval = parseInterval(consumeUntil(i, /[,\[\s]/));
                        consumeUntil(i, NOT_WHITESPACE);
                        var l = maybeGenerateConditional(e, i, "event");
                        if (l) {
                            o.eventFilter = l;
                        }
                        n.push(o);
                    } else if (s.indexOf("sse:") === 0) {
                        n.push({
                            trigger: "sse",
                            sseEvent: s.substr(4)
                        });
                    } else {
                        var u = {
                            trigger: s
                        };
                        var l = maybeGenerateConditional(e, i, "event");
                        if (l) {
                            u.eventFilter = l;
                        }
                        while (i.length > 0 && i[0] !== ",") {
                            consumeUntil(i, NOT_WHITESPACE);
                            var c = i.shift();
                            if (c === "changed") {
                                u.changed = true;
                            } else if (c === "once") {
                                u.once = true;
                            } else if (c === "consume") {
                                u.consume = true;
                            } else if (c === "delay" && i[0] === ":") {
                                i.shift();
                                u.delay = parseInterval(consumeUntil(i, WHITESPACE_OR_COMMA));
                            } else if (c === "from" && i[0] === ":") {
                                i.shift();
                                if (COMBINED_SELECTOR_START.test(i[0])) {
                                    var f = consumeCSSSelector(i);
                                } else {
                                    var f = consumeUntil(i, WHITESPACE_OR_COMMA);
                                    if (f === "closest" || f === "find" || f === "next" || f === "previous") {
                                        i.shift();
                                        var h = consumeCSSSelector(i);
                                        if (h.length > 0) {
                                            f += " " + h;
                                        }
                                    }
                                }
                                u.from = f;
                            } else if (c === "target" && i[0] === ":") {
                                i.shift();
                                u.target = consumeCSSSelector(i);
                            } else if (c === "throttle" && i[0] === ":") {
                                i.shift();
                                u.throttle = parseInterval(consumeUntil(i, WHITESPACE_OR_COMMA));
                            } else if (c === "queue" && i[0] === ":") {
                                i.shift();
                                u.queue = consumeUntil(i, WHITESPACE_OR_COMMA);
                            } else if (c === "root" && i[0] === ":") {
                                i.shift();
                                u[c] = consumeCSSSelector(i);
                            } else if (c === "threshold" && i[0] === ":") {
                                i.shift();
                                u[c] = consumeUntil(i, WHITESPACE_OR_COMMA);
                            } else {
                                triggerErrorEvent(e, "htmx:syntax:error", {
                                    token: i.shift()
                                });
                            }
                        }
                        n.push(u);
                    }
                }
                if (i.length === a) {
                    triggerErrorEvent(e, "htmx:syntax:error", {
                        token: i.shift()
                    });
                }
                consumeUntil(i, NOT_WHITESPACE);
            } while (i[0] === "," && i.shift());
            if (r) {
                r[t] = n;
            }
            return n;
        }
        function getTriggerSpecs(e) {
            var t = getAttributeValue(e, "hx-trigger");
            var r = [];
            if (t) {
                var n = htmx.config.triggerSpecsCache;
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
            var n = getInternalData(e);
            n.timeout = setTimeout(function() {
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
        function boostElement(t, r, e) {
            if (t.tagName === "A" && isLocalLink(t) && (t.target === "" || t.target === "_self") || t.tagName === "FORM") {
                r.boosted = true;
                var n, i;
                if (t.tagName === "A") {
                    n = "get";
                    i = getRawAttribute(t, "href");
                } else {
                    var a = getRawAttribute(t, "method");
                    n = a ? a.toLowerCase() : "get";
                    if (n === "get") {}
                    i = getRawAttribute(t, "action");
                }
                e.forEach(function(e) {
                    addEventListener(t, function(e, t) {
                        if (closest(e, htmx.config.disableSelector)) {
                            cleanUpElement(e);
                            return;
                        }
                        issueAjaxRequest(n, i, e, t);
                    }, r, e, true);
                });
            }
        }
        function shouldCancel(e, t) {
            if (e.type === "submit" || e.type === "click") {
                if (t.tagName === "FORM") {
                    return true;
                }
                if (matches(t, 'input[type="submit"], button') && closest(t, "form") !== null) {
                    return true;
                }
                if (t.tagName === "A" && t.href && (t.getAttribute("href") === "#" || t.getAttribute("href").indexOf("#") !== 0)) {
                    return true;
                }
            }
            return false;
        }
        function ignoreBoostedAnchorCtrlClick(e, t) {
            return getInternalData(e).boosted && e.tagName === "A" && t.type === "click" && (t.ctrlKey || t.metaKey);
        }
        function maybeFilterEvent(e, t, r) {
            var n = e.eventFilter;
            if (n) {
                try {
                    return n.call(t, r) !== true;
                } catch (e) {
                    triggerErrorEvent(getDocument().body, "htmx:eventFilter:error", {
                        error: e,
                        source: n.source
                    });
                    return true;
                }
            }
            return false;
        }
        function addEventListener(a, s, e, o, l) {
            var u = getInternalData(a);
            var t;
            if (o.from) {
                t = querySelectorAllExt(a, o.from);
            } else {
                t = [ a ];
            }
            if (o.changed) {
                t.forEach(function(e) {
                    var t = getInternalData(e);
                    t.lastValue = e.value;
                });
            }
            forEach(t, function(n) {
                var i = function(e) {
                    if (!bodyContains(a)) {
                        n.removeEventListener(o.trigger, i);
                        return;
                    }
                    if (ignoreBoostedAnchorCtrlClick(a, e)) {
                        return;
                    }
                    if (l || shouldCancel(e, a)) {
                        e.preventDefault();
                    }
                    if (maybeFilterEvent(o, a, e)) {
                        return;
                    }
                    var t = getInternalData(e);
                    t.triggerSpec = o;
                    if (t.handledFor == null) {
                        t.handledFor = [];
                    }
                    if (t.handledFor.indexOf(a) < 0) {
                        t.handledFor.push(a);
                        if (o.consume) {
                            e.stopPropagation();
                        }
                        if (o.target && e.target) {
                            if (!matches(e.target, o.target)) {
                                return;
                            }
                        }
                        if (o.once) {
                            if (u.triggeredOnce) {
                                return;
                            } else {
                                u.triggeredOnce = true;
                            }
                        }
                        if (o.changed) {
                            var r = getInternalData(n);
                            if (r.lastValue === n.value) {
                                return;
                            }
                            r.lastValue = n.value;
                        }
                        if (u.delayed) {
                            clearTimeout(u.delayed);
                        }
                        if (u.throttle) {
                            return;
                        }
                        if (o.throttle > 0) {
                            if (!u.throttle) {
                                s(a, e);
                                u.throttle = setTimeout(function() {
                                    u.throttle = null;
                                }, o.throttle);
                            }
                        } else if (o.delay > 0) {
                            u.delayed = setTimeout(function() {
                                s(a, e);
                            }, o.delay);
                        } else {
                            triggerEvent(a, "htmx:trigger");
                            s(a, e);
                        }
                    }
                };
                if (e.listenerInfos == null) {
                    e.listenerInfos = [];
                }
                e.listenerInfos.push({
                    trigger: o.trigger,
                    listener: i,
                    on: n
                });
                n.addEventListener(o.trigger, i);
            });
        }
        var windowIsScrolling = false;
        var scrollHandler = null;
        function initScrollHandler() {
            if (!scrollHandler) {
                scrollHandler = function() {
                    windowIsScrolling = true;
                };
                window.addEventListener("scroll", scrollHandler);
                setInterval(function() {
                    if (windowIsScrolling) {
                        windowIsScrolling = false;
                        forEach(getDocument().querySelectorAll("[hx-trigger='revealed'],[data-hx-trigger='revealed']"), function(e) {
                            maybeReveal(e);
                        });
                    }
                }, 200);
            }
        }
        function maybeReveal(t) {
            if (!hasAttribute(t, "data-hx-revealed") && isScrolledIntoView(t)) {
                t.setAttribute("data-hx-revealed", "true");
                var e = getInternalData(t);
                if (e.initHash) {
                    triggerEvent(t, "revealed");
                } else {
                    t.addEventListener("htmx:afterProcessNode", function(e) {
                        triggerEvent(t, "revealed");
                    }, {
                        once: true
                    });
                }
            }
        }
        function processWebSocketInfo(e, t, r) {
            var n = splitOnWhitespace(r);
            for (var i = 0; i < n.length; i++) {
                var a = n[i].split(/:(.+)/);
                if (a[0] === "connect") {
                    ensureWebSocket(e, a[1], 0);
                }
                if (a[0] === "send") {
                    processWebSocketSend(e);
                }
            }
        }
        function ensureWebSocket(o, r, n) {
            if (!bodyContains(o)) {
                return;
            }
            if (r.indexOf("/") == 0) {
                var e = location.hostname + (location.port ? ":" + location.port : "");
                if (location.protocol == "https:") {
                    r = "wss://" + e + r;
                } else if (location.protocol == "http:") {
                    r = "ws://" + e + r;
                }
            }
            var t = htmx.createWebSocket(r);
            t.onerror = function(e) {
                triggerErrorEvent(o, "htmx:wsError", {
                    error: e,
                    socket: t
                });
                maybeCloseWebSocketSource(o);
            };
            t.onclose = function(e) {
                if ([ 1006, 1012, 1013 ].indexOf(e.code) >= 0) {
                    var t = getWebSocketReconnectDelay(n);
                    setTimeout(function() {
                        ensureWebSocket(o, r, n + 1);
                    }, t);
                }
            };
            t.onopen = function(e) {
                n = 0;
            };
            getInternalData(o).webSocket = t;
            t.addEventListener("message", function(e) {
                if (maybeCloseWebSocketSource(o)) {
                    return;
                }
                var t = e.data;
                withExtensions(o, function(e) {
                    t = e.transformResponse(t, null, o);
                });
                var r = makeSettleInfo(o);
                var n = makeFragment(t);
                var i = toArray(n.children);
                for (var a = 0; a < i.length; a++) {
                    var s = i[a];
                    oobSwap(getAttributeValue(s, "hx-swap-oob") || "true", s, r);
                }
                settleImmediately(r.tasks);
            });
        }
        function maybeCloseWebSocketSource(e) {
            if (!bodyContains(e)) {
                getInternalData(e).webSocket.close();
                return true;
            }
        }
        function processWebSocketSend(u) {
            var c = getClosestMatch(u, function(e) {
                return getInternalData(e).webSocket != null;
            });
            if (c) {
                u.addEventListener(getTriggerSpecs(u)[0].trigger, function(e) {
                    var t = getInternalData(c).webSocket;
                    var r = getHeaders(u, c);
                    var n = getInputValues(u, "post");
                    var i = n.errors;
                    var a = n.values;
                    var s = getExpressionVars(u);
                    var o = mergeObjects(a, s);
                    var l = filterValues(o, u);
                    l["HEADERS"] = r;
                    if (i && i.length > 0) {
                        triggerEvent(u, "htmx:validation:halted", i);
                        return;
                    }
                    t.send(JSON.stringify(l));
                    if (shouldCancel(e, u)) {
                        e.preventDefault();
                    }
                });
            } else {
                triggerErrorEvent(u, "htmx:noWebSocketSourceError");
            }
        }
        function getWebSocketReconnectDelay(e) {
            var t = htmx.config.wsReconnectDelay;
            if (typeof t === "function") {
                return t(e);
            }
            if (t === "full-jitter") {
                var r = Math.min(e, 6);
                var n = 1e3 * Math.pow(2, r);
                return n * Math.random();
            }
            logError('htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"');
        }
        function processSSEInfo(e, t, r) {
            var n = splitOnWhitespace(r);
            for (var i = 0; i < n.length; i++) {
                var a = n[i].split(/:(.+)/);
                if (a[0] === "connect") {
                    processSSESource(e, a[1]);
                }
                if (a[0] === "swap") {
                    processSSESwap(e, a[1]);
                }
            }
        }
        function processSSESource(t, e) {
            var r = htmx.createEventSource(e);
            r.onerror = function(e) {
                triggerErrorEvent(t, "htmx:sseError", {
                    error: e,
                    source: r
                });
                maybeCloseSSESource(t);
            };
            getInternalData(t).sseEventSource = r;
        }
        function processSSESwap(a, s) {
            var o = getClosestMatch(a, hasEventSource);
            if (o) {
                var l = getInternalData(o).sseEventSource;
                var u = function(e) {
                    if (maybeCloseSSESource(o)) {
                        return;
                    }
                    if (!bodyContains(a)) {
                        l.removeEventListener(s, u);
                        return;
                    }
                    var t = e.data;
                    withExtensions(a, function(e) {
                        t = e.transformResponse(t, null, a);
                    });
                    var r = getSwapSpecification(a);
                    var n = getTarget(a);
                    var i = makeSettleInfo(a);
                    selectAndSwap(r.swapStyle, n, a, t, i);
                    settleImmediately(i.tasks);
                    triggerEvent(a, "htmx:sseMessage", e);
                };
                getInternalData(a).sseListener = u;
                l.addEventListener(s, u);
            } else {
                triggerErrorEvent(a, "htmx:noSSESourceError");
            }
        }
        function processSSETrigger(e, t, r) {
            var n = getClosestMatch(e, hasEventSource);
            if (n) {
                var i = getInternalData(n).sseEventSource;
                var a = function() {
                    if (!maybeCloseSSESource(n)) {
                        if (bodyContains(e)) {
                            t(e);
                        } else {
                            i.removeEventListener(r, a);
                        }
                    }
                };
                getInternalData(e).sseListener = a;
                i.addEventListener(r, a);
            } else {
                triggerErrorEvent(e, "htmx:noSSESourceError");
            }
        }
        function maybeCloseSSESource(e) {
            if (!bodyContains(e)) {
                getInternalData(e).sseEventSource.close();
                return true;
            }
        }
        function hasEventSource(e) {
            return getInternalData(e).sseEventSource != null;
        }
        function loadImmediately(e, t, r, n) {
            var i = function() {
                if (!r.loaded) {
                    r.loaded = true;
                    t(e);
                }
            };
            if (n > 0) {
                setTimeout(i, n);
            } else {
                i();
            }
        }
        function processVerbs(t, i, e) {
            var a = false;
            forEach(VERBS, function(r) {
                if (hasAttribute(t, "hx-" + r)) {
                    var n = getAttributeValue(t, "hx-" + r);
                    a = true;
                    i.path = n;
                    i.verb = r;
                    e.forEach(function(e) {
                        addTriggerHandler(t, e, i, function(e, t) {
                            if (closest(e, htmx.config.disableSelector)) {
                                cleanUpElement(e);
                                return;
                            }
                            issueAjaxRequest(r, n, e, t);
                        });
                    });
                }
            });
            return a;
        }
        function addTriggerHandler(n, e, t, r) {
            if (e.sseEvent) {
                processSSETrigger(n, r, e.sseEvent);
            } else if (e.trigger === "revealed") {
                initScrollHandler();
                addEventListener(n, r, t, e);
                maybeReveal(n);
            } else if (e.trigger === "intersect") {
                var i = {};
                if (e.root) {
                    i.root = querySelectorExt(n, e.root);
                }
                if (e.threshold) {
                    i.threshold = parseFloat(e.threshold);
                }
                var a = new IntersectionObserver(function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        if (r.isIntersecting) {
                            triggerEvent(n, "intersect");
                            break;
                        }
                    }
                }, i);
                a.observe(n);
                addEventListener(n, r, t, e);
            } else if (e.trigger === "load") {
                if (!maybeFilterEvent(e, n, makeEvent("load", {
                    elt: n
                }))) {
                    loadImmediately(n, r, t, e.delay);
                }
            } else if (e.pollInterval > 0) {
                t.polling = true;
                processPolling(n, r, e);
            } else {
                addEventListener(n, r, t, e);
            }
        }
        function evalScript(e) {
            if (!e.htmxExecuted && htmx.config.allowScriptTags && (e.type === "text/javascript" || e.type === "module" || e.type === "")) {
                var t = getDocument().createElement("script");
                forEach(e.attributes, function(e) {
                    t.setAttribute(e.name, e.value);
                });
                t.textContent = e.textContent;
                t.async = false;
                if (htmx.config.inlineScriptNonce) {
                    t.nonce = htmx.config.inlineScriptNonce;
                }
                var r = e.parentElement;
                try {
                    r.insertBefore(t, e);
                } catch (e) {
                    logError(e);
                } finally {
                    if (e.parentElement) {
                        e.parentElement.removeChild(e);
                    }
                }
            }
        }
        function processScripts(e) {
            if (matches(e, "script")) {
                evalScript(e);
            }
            forEach(findAll(e, "script"), function(e) {
                evalScript(e);
            });
        }
        function shouldProcessHxOn(e) {
            var t = e.attributes;
            if (!t) {
                return false;
            }
            for (var r = 0; r < t.length; r++) {
                var n = t[r].name;
                if (startsWith(n, "hx-on:") || startsWith(n, "data-hx-on:") || startsWith(n, "hx-on-") || startsWith(n, "data-hx-on-")) {
                    return true;
                }
            }
            return false;
        }
        function findHxOnWildcardElements(e) {
            var t = null;
            var r = [];
            if (shouldProcessHxOn(e)) {
                r.push(e);
            }
            if (document.evaluate) {
                var n = document.evaluate('.//*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or' + ' starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]', e);
                while (t = n.iterateNext()) r.push(t);
            } else if (typeof e.getElementsByTagName === "function") {
                var i = e.getElementsByTagName("*");
                for (var a = 0; a < i.length; a++) {
                    if (shouldProcessHxOn(i[a])) {
                        r.push(i[a]);
                    }
                }
            }
            return r;
        }
        function findElementsToProcess(e) {
            if (e.querySelectorAll) {
                var t = ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost]";
                var r = e.querySelectorAll(VERB_SELECTOR + t + ", form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws]," + " [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]");
                return r;
            } else {
                return [];
            }
        }
        function maybeSetLastButtonClicked(e) {
            var t = closest(e.target, "button, input[type='submit']");
            var r = getRelatedFormData(e);
            if (r) {
                r.lastButtonClicked = t;
            }
        }
        function maybeUnsetLastButtonClicked(e) {
            var t = getRelatedFormData(e);
            if (t) {
                t.lastButtonClicked = null;
            }
        }
        function getRelatedFormData(e) {
            var t = closest(e.target, "button, input[type='submit']");
            if (!t) {
                return;
            }
            var r = resolveTarget("#" + getRawAttribute(t, "form")) || closest(t, "form");
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
        function countCurlies(e) {
            var t = tokenizeString(e);
            var r = 0;
            for (var n = 0; n < t.length; n++) {
                const i = t[n];
                if (i === "{") {
                    r++;
                } else if (i === "}") {
                    r--;
                }
            }
            return r;
        }
        function addHxOnEventHandler(t, e, r) {
            var n = getInternalData(t);
            if (!Array.isArray(n.onHandlers)) {
                n.onHandlers = [];
            }
            var i;
            var a = function(e) {
                return maybeEval(t, function() {
                    if (!i) {
                        i = new Function("event", r);
                    }
                    i.call(t, e);
                });
            };
            t.addEventListener(e, a);
            n.onHandlers.push({
                event: e,
                listener: a
            });
        }
        function processHxOn(e) {
            var t = getAttributeValue(e, "hx-on");
            if (t) {
                var r = {};
                var n = t.split("\n");
                var i = null;
                var a = 0;
                while (n.length > 0) {
                    var s = n.shift();
                    var o = s.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
                    if (a === 0 && o) {
                        s.split(":");
                        i = o[1].slice(0, -1);
                        r[i] = o[2];
                    } else {
                        r[i] += s;
                    }
                    a += countCurlies(s);
                }
                for (var l in r) {
                    addHxOnEventHandler(e, l, r[l]);
                }
            }
        }
        function processHxOnWildcard(e) {
            deInitOnHandlers(e);
            for (var t = 0; t < e.attributes.length; t++) {
                var r = e.attributes[t].name;
                var n = e.attributes[t].value;
                if (startsWith(r, "hx-on") || startsWith(r, "data-hx-on")) {
                    var i = r.indexOf("-on") + 3;
                    var a = r.slice(i, i + 1);
                    if (a === "-" || a === ":") {
                        var s = r.slice(i + 1);
                        if (startsWith(s, ":")) {
                            s = "htmx" + s;
                        } else if (startsWith(s, "-")) {
                            s = "htmx:" + s.slice(1);
                        } else if (startsWith(s, "htmx-")) {
                            s = "htmx:" + s.slice(5);
                        }
                        addHxOnEventHandler(e, s, n);
                    }
                }
            }
        }
        function initNode(t) {
            if (closest(t, htmx.config.disableSelector)) {
                cleanUpElement(t);
                return;
            }
            var r = getInternalData(t);
            if (r.initHash !== attributeHash(t)) {
                deInitNode(t);
                r.initHash = attributeHash(t);
                processHxOn(t);
                triggerEvent(t, "htmx:beforeProcessNode");
                if (t.value) {
                    r.lastValue = t.value;
                }
                var e = getTriggerSpecs(t);
                var n = processVerbs(t, r, e);
                if (!n) {
                    if (getClosestAttributeValue(t, "hx-boost") === "true") {
                        boostElement(t, r, e);
                    } else if (hasAttribute(t, "hx-trigger")) {
                        e.forEach(function(e) {
                            addTriggerHandler(t, e, r, function() {});
                        });
                    }
                }
                if (t.tagName === "FORM" || getRawAttribute(t, "type") === "submit" && hasAttribute(t, "form")) {
                    initButtonTracking(t);
                }
                var i = getAttributeValue(t, "hx-sse");
                if (i) {
                    processSSEInfo(t, r, i);
                }
                var a = getAttributeValue(t, "hx-ws");
                if (a) {
                    processWebSocketInfo(t, r, a);
                }
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
            var r;
            if (window.CustomEvent && typeof window.CustomEvent === "function") {
                r = new CustomEvent(e, {
                    bubbles: true,
                    cancelable: true,
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
            r["elt"] = e;
            var n = makeEvent(t, r);
            if (htmx.logger && !ignoreEventForLogging(t)) {
                htmx.logger(e, t, r);
            }
            if (r.error) {
                logError(r.error);
                triggerEvent(e, "htmx:error", {
                    errorInfo: r
                });
            }
            var i = e.dispatchEvent(n);
            var a = kebabEventName(t);
            if (i && a !== t) {
                var s = makeEvent(a, n.detail);
                i = i && e.dispatchEvent(s);
            }
            withExtensions(e, function(e) {
                i = i && (e.onEvent(t, n) !== false && !n.defaultPrevented);
            });
            return i;
        }
        var currentPathForHistory = location.pathname + location.search;
        function getHistoryElement() {
            var e = getDocument().querySelector("[hx-history-elt],[data-hx-history-elt]");
            return e || getDocument().body;
        }
        function saveToHistoryCache(e, t, r, n) {
            if (!canAccessLocalStorage()) {
                return;
            }
            if (htmx.config.historyCacheSize <= 0) {
                localStorage.removeItem("htmx-history-cache");
                return;
            }
            e = normalizePath(e);
            var i = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
            for (var a = 0; a < i.length; a++) {
                if (i[a].url === e) {
                    i.splice(a, 1);
                    break;
                }
            }
            var s = {
                url: e,
                content: t,
                title: r,
                scroll: n
            };
            triggerEvent(getDocument().body, "htmx:historyItemCreated", {
                item: s,
                cache: i
            });
            i.push(s);
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
        function getCachedHistory(e) {
            if (!canAccessLocalStorage()) {
                return null;
            }
            e = normalizePath(e);
            var t = parseJSON(localStorage.getItem("htmx-history-cache")) || [];
            for (var r = 0; r < t.length; r++) {
                if (t[r].url === e) {
                    return t[r];
                }
            }
            return null;
        }
        function cleanInnerHtmlForHistory(e) {
            var t = htmx.config.requestClass;
            var r = e.cloneNode(true);
            forEach(findAll(r, "." + t), function(e) {
                removeClassFromElement(e, t);
            });
            return r.innerHTML;
        }
        function saveCurrentPageToHistory() {
            var e = getHistoryElement();
            var t = currentPathForHistory || location.pathname + location.search;
            var r;
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
                saveToHistoryCache(t, cleanInnerHtmlForHistory(e), getDocument().title, window.scrollY);
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
                e.call();
            });
        }
        function loadHistoryFromServer(a) {
            var e = new XMLHttpRequest();
            var s = {
                path: a,
                xhr: e
            };
            triggerEvent(getDocument().body, "htmx:historyCacheMiss", s);
            e.open("GET", a, true);
            e.setRequestHeader("HX-Request", "true");
            e.setRequestHeader("HX-History-Restore-Request", "true");
            e.setRequestHeader("HX-Current-URL", getDocument().location.href);
            e.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    triggerEvent(getDocument().body, "htmx:historyCacheMissLoad", s);
                    var e = makeFragment(this.response);
                    e = e.querySelector("[hx-history-elt],[data-hx-history-elt]") || e;
                    var t = getHistoryElement();
                    var r = makeSettleInfo(t);
                    var n = findTitle(this.response);
                    if (n) {
                        var i = find("title");
                        if (i) {
                            i.innerHTML = n;
                        } else {
                            window.document.title = n;
                        }
                    }
                    swapInnerHTML(t, e, r);
                    settleImmediately(r.tasks);
                    currentPathForHistory = a;
                    triggerEvent(getDocument().body, "htmx:historyRestore", {
                        path: a,
                        cacheMiss: true,
                        serverResponse: this.response
                    });
                } else {
                    triggerErrorEvent(getDocument().body, "htmx:historyCacheMissLoadError", s);
                }
            };
            e.send();
        }
        function restoreHistory(e) {
            saveCurrentPageToHistory();
            e = e || location.pathname + location.search;
            var t = getCachedHistory(e);
            if (t) {
                var r = makeFragment(t.content);
                var n = getHistoryElement();
                var i = makeSettleInfo(n);
                swapInnerHTML(n, r, i);
                settleImmediately(i.tasks);
                document.title = t.title;
                setTimeout(function() {
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
            var t = findAttributeTargets(e, "hx-indicator");
            if (t == null) {
                t = [ e ];
            }
            forEach(t, function(e) {
                var t = getInternalData(e);
                t.requestCount = (t.requestCount || 0) + 1;
                e.classList["add"].call(e.classList, htmx.config.requestClass);
            });
            return t;
        }
        function disableElements(e) {
            var t = findAttributeTargets(e, "hx-disabled-elt");
            if (t == null) {
                t = [];
            }
            forEach(t, function(e) {
                var t = getInternalData(e);
                t.requestCount = (t.requestCount || 0) + 1;
                e.setAttribute("disabled", "");
            });
            return t;
        }
        function removeRequestIndicators(e, t) {
            forEach(e, function(e) {
                var t = getInternalData(e);
                t.requestCount = (t.requestCount || 0) - 1;
                if (t.requestCount === 0) {
                    e.classList["remove"].call(e.classList, htmx.config.requestClass);
                }
            });
            forEach(t, function(e) {
                var t = getInternalData(e);
                t.requestCount = (t.requestCount || 0) - 1;
                if (t.requestCount === 0) {
                    e.removeAttribute("disabled");
                }
            });
        }
        function haveSeenNode(e, t) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                if (n.isSameNode(t)) {
                    return true;
                }
            }
            return false;
        }
        function shouldInclude(e) {
            if (e.name === "" || e.name == null || e.disabled || closest(e, "fieldset[disabled]")) {
                return false;
            }
            if (e.type === "button" || e.type === "submit" || e.tagName === "image" || e.tagName === "reset" || e.tagName === "file") {
                return false;
            }
            if (e.type === "checkbox" || e.type === "radio") {
                return e.checked;
            }
            return true;
        }
        function addValueToValues(e, t, r) {
            if (e != null && t != null) {
                var n = r[e];
                if (n === undefined) {
                    r[e] = t;
                } else if (Array.isArray(n)) {
                    if (Array.isArray(t)) {
                        r[e] = n.concat(t);
                    } else {
                        n.push(t);
                    }
                } else {
                    if (Array.isArray(t)) {
                        r[e] = [ n ].concat(t);
                    } else {
                        r[e] = [ n, t ];
                    }
                }
            }
        }
        function processInputValue(t, r, n, e, i) {
            if (e == null || haveSeenNode(t, e)) {
                return;
            } else {
                t.push(e);
            }
            if (shouldInclude(e)) {
                var a = getRawAttribute(e, "name");
                var s = e.value;
                if (e.multiple && e.tagName === "SELECT") {
                    s = toArray(e.querySelectorAll("option:checked")).map(function(e) {
                        return e.value;
                    });
                }
                if (e.files) {
                    s = toArray(e.files);
                }
                addValueToValues(a, s, r);
                if (i) {
                    validateElement(e, n);
                }
            }
            if (matches(e, "form")) {
                var o = e.elements;
                forEach(o, function(e) {
                    processInputValue(t, r, n, e, i);
                });
            }
        }
        function validateElement(e, t) {
            if (e.willValidate) {
                triggerEvent(e, "htmx:validation:validate");
                if (!e.checkValidity()) {
                    t.push({
                        elt: e,
                        message: e.validationMessage,
                        validity: e.validity
                    });
                    triggerEvent(e, "htmx:validation:failed", {
                        message: e.validationMessage,
                        validity: e.validity
                    });
                }
            }
        }
        function getInputValues(e, t) {
            var r = [];
            var n = {};
            var i = {};
            var a = [];
            var s = getInternalData(e);
            if (s.lastButtonClicked && !bodyContains(s.lastButtonClicked)) {
                s.lastButtonClicked = null;
            }
            var o = matches(e, "form") && e.noValidate !== true || getAttributeValue(e, "hx-validate") === "true";
            if (s.lastButtonClicked) {
                o = o && s.lastButtonClicked.formNoValidate !== true;
            }
            if (t !== "get") {
                processInputValue(r, i, a, closest(e, "form"), o);
            }
            processInputValue(r, n, a, e, o);
            if (s.lastButtonClicked || e.tagName === "BUTTON" || e.tagName === "INPUT" && getRawAttribute(e, "type") === "submit") {
                var l = s.lastButtonClicked || e;
                var u = getRawAttribute(l, "name");
                addValueToValues(u, l.value, i);
            }
            var c = findAttributeTargets(e, "hx-include");
            forEach(c, function(e) {
                processInputValue(r, n, a, e, o);
                if (!matches(e, "form")) {
                    forEach(e.querySelectorAll(INPUT_SELECTOR), function(e) {
                        processInputValue(r, n, a, e, o);
                    });
                }
            });
            n = mergeObjects(n, i);
            return {
                errors: a,
                values: n
            };
        }
        function appendParam(e, t, r) {
            if (e !== "") {
                e += "&";
            }
            if (String(r) === "[object Object]") {
                r = JSON.stringify(r);
            }
            var n = encodeURIComponent(r);
            e += encodeURIComponent(t) + "=" + n;
            return e;
        }
        function urlEncode(e) {
            var t = "";
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    var n = e[r];
                    if (Array.isArray(n)) {
                        forEach(n, function(e) {
                            t = appendParam(t, r, e);
                        });
                    } else {
                        t = appendParam(t, r, n);
                    }
                }
            }
            return t;
        }
        function makeFormData(e) {
            var t = new FormData();
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    var n = e[r];
                    if (Array.isArray(n)) {
                        forEach(n, function(e) {
                            t.append(r, e);
                        });
                    } else {
                        t.append(r, n);
                    }
                }
            }
            return t;
        }
        function getHeaders(e, t, r) {
            var n = {
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
        function filterValues(t, e) {
            var r = getClosestAttributeValue(e, "hx-params");
            if (r) {
                if (r === "none") {
                    return {};
                } else if (r === "*") {
                    return t;
                } else if (r.indexOf("not ") === 0) {
                    forEach(r.substr(4).split(","), function(e) {
                        e = e.trim();
                        delete t[e];
                    });
                    return t;
                } else {
                    var n = {};
                    forEach(r.split(","), function(e) {
                        e = e.trim();
                        n[e] = t[e];
                    });
                    return n;
                }
            } else {
                return t;
            }
        }
        function isAnchorLink(e) {
            return getRawAttribute(e, "href") && getRawAttribute(e, "href").indexOf("#") >= 0;
        }
        function getSwapSpecification(e, t) {
            var r = t ? t : getClosestAttributeValue(e, "hx-swap");
            var n = {
                swapStyle: getInternalData(e).boosted ? "innerHTML" : htmx.config.defaultSwapStyle,
                swapDelay: htmx.config.defaultSwapDelay,
                settleDelay: htmx.config.defaultSettleDelay
            };
            if (htmx.config.scrollIntoViewOnBoost && getInternalData(e).boosted && !isAnchorLink(e)) {
                n["show"] = "top";
            }
            if (r) {
                var i = splitOnWhitespace(r);
                if (i.length > 0) {
                    for (var a = 0; a < i.length; a++) {
                        var s = i[a];
                        if (s.indexOf("swap:") === 0) {
                            n["swapDelay"] = parseInterval(s.substr(5));
                        } else if (s.indexOf("settle:") === 0) {
                            n["settleDelay"] = parseInterval(s.substr(7));
                        } else if (s.indexOf("transition:") === 0) {
                            n["transition"] = s.substr(11) === "true";
                        } else if (s.indexOf("ignoreTitle:") === 0) {
                            n["ignoreTitle"] = s.substr(12) === "true";
                        } else if (s.indexOf("scroll:") === 0) {
                            var o = s.substr(7);
                            var l = o.split(":");
                            var u = l.pop();
                            var c = l.length > 0 ? l.join(":") : null;
                            n["scroll"] = u;
                            n["scrollTarget"] = c;
                        } else if (s.indexOf("show:") === 0) {
                            var f = s.substr(5);
                            var l = f.split(":");
                            var h = l.pop();
                            var c = l.length > 0 ? l.join(":") : null;
                            n["show"] = h;
                            n["showTarget"] = c;
                        } else if (s.indexOf("focus-scroll:") === 0) {
                            var p = s.substr("focus-scroll:".length);
                            n["focusScroll"] = p == "true";
                        } else if (a == 0) {
                            n["swapStyle"] = s;
                        } else {
                            logError("Unknown modifier in hx-swap: " + s);
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
            var i = null;
            withExtensions(r, function(e) {
                if (i == null) {
                    i = e.encodeParameters(t, n, r);
                }
            });
            if (i != null) {
                return i;
            } else {
                if (usesFormData(r)) {
                    return makeFormData(n);
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
            var r = e[0];
            var n = e[e.length - 1];
            if (t.scroll) {
                var i = null;
                if (t.scrollTarget) {
                    i = querySelectorExt(r, t.scrollTarget);
                }
                if (t.scroll === "top" && (r || i)) {
                    i = i || r;
                    i.scrollTop = 0;
                }
                if (t.scroll === "bottom" && (n || i)) {
                    i = i || n;
                    i.scrollTop = i.scrollHeight;
                }
            }
            if (t.show) {
                var i = null;
                if (t.showTarget) {
                    var a = t.showTarget;
                    if (t.showTarget === "window") {
                        a = "body";
                    }
                    i = querySelectorExt(r, a);
                }
                if (t.show === "top" && (r || i)) {
                    i = i || r;
                    i.scrollIntoView({
                        block: "start",
                        behavior: htmx.config.scrollBehavior
                    });
                }
                if (t.show === "bottom" && (n || i)) {
                    i = i || n;
                    i.scrollIntoView({
                        block: "end",
                        behavior: htmx.config.scrollBehavior
                    });
                }
            }
        }
        function getValuesForElement(e, t, r, n) {
            if (n == null) {
                n = {};
            }
            if (e == null) {
                return n;
            }
            var i = getAttributeValue(e, t);
            if (i) {
                var a = i.trim();
                var s = r;
                if (a === "unset") {
                    return null;
                }
                if (a.indexOf("javascript:") === 0) {
                    a = a.substr(11);
                    s = true;
                } else if (a.indexOf("js:") === 0) {
                    a = a.substr(3);
                    s = true;
                }
                if (a.indexOf("{") !== 0) {
                    a = "{" + a + "}";
                }
                var o;
                if (s) {
                    o = maybeEval(e, function() {
                        return Function("return (" + a + ")")();
                    }, {});
                } else {
                    o = parseJSON(a);
                }
                for (var l in o) {
                    if (o.hasOwnProperty(l)) {
                        if (n[l] == null) {
                            n[l] = o[l];
                        }
                    }
                }
            }
            return getValuesForElement(parentElt(e), t, r, n);
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
                    var e = new URL(t.responseURL);
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
        function ajaxHelper(e, t, r) {
            e = e.toLowerCase();
            if (r) {
                if (r instanceof Element || isType(r, "String")) {
                    return issueAjaxRequest(e, t, null, null, {
                        targetOverride: resolveTarget(r),
                        returnPromise: true
                    });
                } else {
                    return issueAjaxRequest(e, t, resolveTarget(r.source), r.event, {
                        handler: r.handler,
                        headers: r.headers,
                        values: r.values,
                        targetOverride: resolveTarget(r.target),
                        swapOverride: r.swap,
                        select: r.select,
                        returnPromise: true
                    });
                }
            } else {
                return issueAjaxRequest(e, t, null, null, {
                    returnPromise: true
                });
            }
        }
        function hierarchyForElt(e) {
            var t = [];
            while (e) {
                t.push(e);
                e = e.parentElement;
            }
            return t;
        }
        function verifyPath(e, t, r) {
            var n;
            var i;
            if (typeof URL === "function") {
                i = new URL(t, document.location.href);
                var a = document.location.origin;
                n = a === i.origin;
            } else {
                i = t;
                n = startsWith(t, document.location.origin);
            }
            if (htmx.config.selfRequestsOnly) {
                if (!n) {
                    return false;
                }
            }
            return triggerEvent(e, "htmx:validateUrl", mergeObjects({
                url: i,
                sameHost: n
            }, r));
        }
        function issueAjaxRequest(t, r, n, i, a, e) {
            var s = null;
            var o = null;
            a = a != null ? a : {};
            if (a.returnPromise && typeof Promise !== "undefined") {
                var l = new Promise(function(e, t) {
                    s = e;
                    o = t;
                });
            }
            if (n == null) {
                n = getDocument().body;
            }
            var D = a.handler || handleAjaxResponse;
            var M = a.select || null;
            if (!bodyContains(n)) {
                maybeCall(s);
                return l;
            }
            var u = a.targetOverride || getTarget(n);
            if (u == null || u == DUMMY_ELT) {
                triggerErrorEvent(n, "htmx:targetError", {
                    target: getAttributeValue(n, "hx-target")
                });
                maybeCall(o);
                return l;
            }
            var c = getInternalData(n);
            var f = c.lastButtonClicked;
            if (f) {
                var h = getRawAttribute(f, "formaction");
                if (h != null) {
                    r = h;
                }
                var p = getRawAttribute(f, "formmethod");
                if (p != null) {
                    if (p.toLowerCase() !== "dialog") {
                        t = p;
                    }
                }
            }
            var d = getClosestAttributeValue(n, "hx-confirm");
            if (e === undefined) {
                var B = function(e) {
                    return issueAjaxRequest(t, r, n, i, a, !!e);
                };
                var $ = {
                    target: u,
                    elt: n,
                    path: r,
                    verb: t,
                    triggeringEvent: i,
                    etc: a,
                    issueRequest: B,
                    question: d
                };
                if (triggerEvent(n, "htmx:confirm", $) === false) {
                    maybeCall(s);
                    return l;
                }
            }
            var m = n;
            var g = getClosestAttributeValue(n, "hx-sync");
            var v = null;
            var y = false;
            if (g) {
                var F = g.split(":");
                var q = F[0].trim();
                if (q === "this") {
                    m = findThisElement(n, "hx-sync");
                } else {
                    m = querySelectorExt(n, q);
                }
                g = (F[1] || "drop").trim();
                c = getInternalData(m);
                if (g === "drop" && c.xhr && c.abortable !== true) {
                    maybeCall(s);
                    return l;
                } else if (g === "abort") {
                    if (c.xhr) {
                        maybeCall(s);
                        return l;
                    } else {
                        y = true;
                    }
                } else if (g === "replace") {
                    triggerEvent(m, "htmx:abort");
                } else if (g.indexOf("queue") === 0) {
                    var U = g.split(" ");
                    v = (U[1] || "last").trim();
                }
            }
            if (c.xhr) {
                if (c.abortable) {
                    triggerEvent(m, "htmx:abort");
                } else {
                    if (v == null) {
                        if (i) {
                            var b = getInternalData(i);
                            if (b && b.triggerSpec && b.triggerSpec.queue) {
                                v = b.triggerSpec.queue;
                            }
                        }
                        if (v == null) {
                            v = "last";
                        }
                    }
                    if (c.queuedRequests == null) {
                        c.queuedRequests = [];
                    }
                    if (v === "first" && c.queuedRequests.length === 0) {
                        c.queuedRequests.push(function() {
                            issueAjaxRequest(t, r, n, i, a);
                        });
                    } else if (v === "all") {
                        c.queuedRequests.push(function() {
                            issueAjaxRequest(t, r, n, i, a);
                        });
                    } else if (v === "last") {
                        c.queuedRequests = [];
                        c.queuedRequests.push(function() {
                            issueAjaxRequest(t, r, n, i, a);
                        });
                    }
                    maybeCall(s);
                    return l;
                }
            }
            var E = new XMLHttpRequest();
            c.xhr = E;
            c.abortable = y;
            var x = function() {
                c.xhr = null;
                c.abortable = false;
                if (c.queuedRequests != null && c.queuedRequests.length > 0) {
                    var e = c.queuedRequests.shift();
                    e();
                }
            };
            var V = getClosestAttributeValue(n, "hx-prompt");
            if (V) {
                var S = prompt(V);
                if (S === null || !triggerEvent(n, "htmx:prompt", {
                    prompt: S,
                    target: u
                })) {
                    maybeCall(s);
                    x();
                    return l;
                }
            }
            if (d && !e) {
                if (!confirm(d)) {
                    maybeCall(s);
                    x();
                    return l;
                }
            }
            var w = getHeaders(n, u, S);
            if (t !== "get" && !usesFormData(n)) {
                w["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if (a.headers) {
                w = mergeObjects(w, a.headers);
            }
            var j = getInputValues(n, t);
            var k = j.errors;
            var A = j.values;
            if (a.values) {
                A = mergeObjects(A, a.values);
            }
            var W = getExpressionVars(n);
            var G = mergeObjects(A, W);
            var C = filterValues(G, n);
            if (htmx.config.getCacheBusterParam && t === "get") {
                C["org.htmx.cache-buster"] = getRawAttribute(u, "id") || "true";
            }
            if (r == null || r === "") {
                r = getDocument().location.href;
            }
            var _ = getValuesForElement(n, "hx-request");
            var X = getInternalData(n).boosted;
            var I = htmx.config.methodsThatUseUrlParams.indexOf(t) >= 0;
            var T = {
                boosted: X,
                useUrlParams: I,
                parameters: C,
                unfilteredParameters: G,
                headers: w,
                target: u,
                verb: t,
                errors: k,
                withCredentials: a.credentials || _.credentials || htmx.config.withCredentials,
                timeout: a.timeout || _.timeout || htmx.config.timeout,
                path: r,
                triggeringEvent: i
            };
            if (!triggerEvent(n, "htmx:configRequest", T)) {
                maybeCall(s);
                x();
                return l;
            }
            r = T.path;
            t = T.verb;
            w = T.headers;
            C = T.parameters;
            k = T.errors;
            I = T.useUrlParams;
            if (k && k.length > 0) {
                triggerEvent(n, "htmx:validation:halted", T);
                maybeCall(s);
                x();
                return l;
            }
            var z = r.split("#");
            var J = z[0];
            var O = z[1];
            var P = r;
            if (I) {
                P = J;
                var K = Object.keys(C).length !== 0;
                if (K) {
                    if (P.indexOf("?") < 0) {
                        P += "?";
                    } else {
                        P += "&";
                    }
                    P += urlEncode(C);
                    if (O) {
                        P += "#" + O;
                    }
                }
            }
            if (!verifyPath(n, P, T)) {
                triggerErrorEvent(n, "htmx:invalidPath", T);
                maybeCall(o);
                return l;
            }
            E.open(t.toUpperCase(), P, true);
            E.overrideMimeType("text/html");
            E.withCredentials = T.withCredentials;
            E.timeout = T.timeout;
            if (_.noHeaders) {} else {
                for (var N in w) {
                    if (w.hasOwnProperty(N)) {
                        var Y = w[N];
                        safelySetHeaderValue(E, N, Y);
                    }
                }
            }
            var R = {
                xhr: E,
                target: u,
                requestConfig: T,
                etc: a,
                boosted: X,
                select: M,
                pathInfo: {
                    requestPath: r,
                    finalRequestPath: P,
                    anchor: O
                }
            };
            E.onload = function() {
                try {
                    var e = hierarchyForElt(n);
                    R.pathInfo.responsePath = getPathFromResponse(E);
                    D(n, R);
                    removeRequestIndicators(L, H);
                    triggerEvent(n, "htmx:afterRequest", R);
                    triggerEvent(n, "htmx:afterOnLoad", R);
                    if (!bodyContains(n)) {
                        var t = null;
                        while (e.length > 0 && t == null) {
                            var r = e.shift();
                            if (bodyContains(r)) {
                                t = r;
                            }
                        }
                        if (t) {
                            triggerEvent(t, "htmx:afterRequest", R);
                            triggerEvent(t, "htmx:afterOnLoad", R);
                        }
                    }
                    maybeCall(s);
                    x();
                } catch (e) {
                    triggerErrorEvent(n, "htmx:onLoadError", mergeObjects({
                        error: e
                    }, R));
                    throw e;
                }
            };
            E.onerror = function() {
                removeRequestIndicators(L, H);
                triggerErrorEvent(n, "htmx:afterRequest", R);
                triggerErrorEvent(n, "htmx:sendError", R);
                maybeCall(o);
                x();
            };
            E.onabort = function() {
                removeRequestIndicators(L, H);
                triggerErrorEvent(n, "htmx:afterRequest", R);
                triggerErrorEvent(n, "htmx:sendAbort", R);
                maybeCall(o);
                x();
            };
            E.ontimeout = function() {
                removeRequestIndicators(L, H);
                triggerErrorEvent(n, "htmx:afterRequest", R);
                triggerErrorEvent(n, "htmx:timeout", R);
                maybeCall(o);
                x();
            };
            if (!triggerEvent(n, "htmx:beforeRequest", R)) {
                maybeCall(s);
                x();
                return l;
            }
            var L = addRequestIndicatorClasses(n);
            var H = disableElements(n);
            forEach([ "loadstart", "loadend", "progress", "abort" ], function(t) {
                forEach([ E, E.upload ], function(e) {
                    e.addEventListener(t, function(e) {
                        triggerEvent(n, "htmx:xhr:" + t, {
                            lengthComputable: e.lengthComputable,
                            loaded: e.loaded,
                            total: e.total
                        });
                    });
                });
            });
            triggerEvent(n, "htmx:beforeSend", R);
            var Z = I ? null : encodeParamsForBody(E, n, C);
            E.send(Z);
            return l;
        }
        function determineHistoryUpdates(e, t) {
            var r = t.xhr;
            var n = null;
            var i = null;
            if (hasHeader(r, /HX-Push:/i)) {
                n = r.getResponseHeader("HX-Push");
                i = "push";
            } else if (hasHeader(r, /HX-Push-Url:/i)) {
                n = r.getResponseHeader("HX-Push-Url");
                i = "push";
            } else if (hasHeader(r, /HX-Replace-Url:/i)) {
                n = r.getResponseHeader("HX-Replace-Url");
                i = "replace";
            }
            if (n) {
                if (n === "false") {
                    return {};
                } else {
                    return {
                        type: i,
                        path: n
                    };
                }
            }
            var a = t.pathInfo.finalRequestPath;
            var s = t.pathInfo.responsePath;
            var o = getClosestAttributeValue(e, "hx-push-url");
            var l = getClosestAttributeValue(e, "hx-replace-url");
            var u = getInternalData(e).boosted;
            var c = null;
            var f = null;
            if (o) {
                c = "push";
                f = o;
            } else if (l) {
                c = "replace";
                f = l;
            } else if (u) {
                c = "push";
                f = s || a;
            }
            if (f) {
                if (f === "false") {
                    return {};
                }
                if (f === "true") {
                    f = s || a;
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
        function handleAjaxResponse(l, u) {
            var c = u.xhr;
            var f = u.target;
            var e = u.etc;
            var t = u.requestConfig;
            var h = u.select;
            if (!triggerEvent(l, "htmx:beforeOnLoad", u)) return;
            if (hasHeader(c, /HX-Trigger:/i)) {
                handleTrigger(c, "HX-Trigger", l);
            }
            if (hasHeader(c, /HX-Location:/i)) {
                saveCurrentPageToHistory();
                var r = c.getResponseHeader("HX-Location");
                var p;
                if (r.indexOf("{") === 0) {
                    p = parseJSON(r);
                    r = p["path"];
                    delete p["path"];
                }
                ajaxHelper("GET", r, p).then(function() {
                    pushUrlIntoHistory(r);
                });
                return;
            }
            var n = hasHeader(c, /HX-Refresh:/i) && "true" === c.getResponseHeader("HX-Refresh");
            if (hasHeader(c, /HX-Redirect:/i)) {
                location.href = c.getResponseHeader("HX-Redirect");
                n && location.reload();
                return;
            }
            if (n) {
                location.reload();
                return;
            }
            if (hasHeader(c, /HX-Retarget:/i)) {
                if (c.getResponseHeader("HX-Retarget") === "this") {
                    u.target = l;
                } else {
                    u.target = querySelectorExt(l, c.getResponseHeader("HX-Retarget"));
                }
            }
            var d = determineHistoryUpdates(l, u);
            var i = c.status >= 200 && c.status < 400 && c.status !== 204;
            var m = c.response;
            var a = c.status >= 400;
            var g = htmx.config.ignoreTitle;
            var s = mergeObjects({
                shouldSwap: i,
                serverResponse: m,
                isError: a,
                ignoreTitle: g
            }, u);
            if (!triggerEvent(f, "htmx:beforeSwap", s)) return;
            f = s.target;
            m = s.serverResponse;
            a = s.isError;
            g = s.ignoreTitle;
            u.target = f;
            u.failed = a;
            u.successful = !a;
            if (s.shouldSwap) {
                if (c.status === 286) {
                    cancelPolling(l);
                }
                withExtensions(l, function(e) {
                    m = e.transformResponse(m, c, l);
                });
                if (d.type) {
                    saveCurrentPageToHistory();
                }
                var o = e.swapOverride;
                if (hasHeader(c, /HX-Reswap:/i)) {
                    o = c.getResponseHeader("HX-Reswap");
                }
                var p = getSwapSpecification(l, o);
                if (p.hasOwnProperty("ignoreTitle")) {
                    g = p.ignoreTitle;
                }
                f.classList.add(htmx.config.swappingClass);
                var v = null;
                var y = null;
                var b = function() {
                    try {
                        var e = document.activeElement;
                        var t = {};
                        try {
                            t = {
                                elt: e,
                                start: e ? e.selectionStart : null,
                                end: e ? e.selectionEnd : null
                            };
                        } catch (e) {}
                        var r;
                        if (h) {
                            r = h;
                        }
                        if (hasHeader(c, /HX-Reselect:/i)) {
                            r = c.getResponseHeader("HX-Reselect");
                        }
                        if (d.type) {
                            triggerEvent(getDocument().body, "htmx:beforeHistoryUpdate", mergeObjects({
                                history: d
                            }, u));
                            if (d.type === "push") {
                                pushUrlIntoHistory(d.path);
                                triggerEvent(getDocument().body, "htmx:pushedIntoHistory", {
                                    path: d.path
                                });
                            } else {
                                replaceUrlInHistory(d.path);
                                triggerEvent(getDocument().body, "htmx:replacedInHistory", {
                                    path: d.path
                                });
                            }
                        }
                        var n = makeSettleInfo(f);
                        selectAndSwap(p.swapStyle, f, l, m, n, r);
                        if (t.elt && !bodyContains(t.elt) && getRawAttribute(t.elt, "id")) {
                            var i = document.getElementById(getRawAttribute(t.elt, "id"));
                            var a = {
                                preventScroll: p.focusScroll !== undefined ? !p.focusScroll : !htmx.config.defaultFocusScroll
                            };
                            if (i) {
                                if (t.start && i.setSelectionRange) {
                                    try {
                                        i.setSelectionRange(t.start, t.end);
                                    } catch (e) {}
                                }
                                i.focus(a);
                            }
                        }
                        f.classList.remove(htmx.config.swappingClass);
                        forEach(n.elts, function(e) {
                            if (e.classList) {
                                e.classList.add(htmx.config.settlingClass);
                            }
                            triggerEvent(e, "htmx:afterSwap", u);
                        });
                        if (hasHeader(c, /HX-Trigger-After-Swap:/i)) {
                            var s = l;
                            if (!bodyContains(l)) {
                                s = getDocument().body;
                            }
                            handleTrigger(c, "HX-Trigger-After-Swap", s);
                        }
                        var o = function() {
                            forEach(n.tasks, function(e) {
                                e.call();
                            });
                            forEach(n.elts, function(e) {
                                if (e.classList) {
                                    e.classList.remove(htmx.config.settlingClass);
                                }
                                triggerEvent(e, "htmx:afterSettle", u);
                            });
                            if (u.pathInfo.anchor) {
                                var e = getDocument().getElementById(u.pathInfo.anchor);
                                if (e) {
                                    e.scrollIntoView({
                                        block: "start",
                                        behavior: "auto"
                                    });
                                }
                            }
                            if (n.title && !g) {
                                var t = find("title");
                                if (t) {
                                    t.innerHTML = n.title;
                                } else {
                                    window.document.title = n.title;
                                }
                            }
                            updateScrollState(n.elts, p);
                            if (hasHeader(c, /HX-Trigger-After-Settle:/i)) {
                                var r = l;
                                if (!bodyContains(l)) {
                                    r = getDocument().body;
                                }
                                handleTrigger(c, "HX-Trigger-After-Settle", r);
                            }
                            maybeCall(v);
                        };
                        if (p.settleDelay > 0) {
                            setTimeout(o, p.settleDelay);
                        } else {
                            o();
                        }
                    } catch (e) {
                        triggerErrorEvent(l, "htmx:swapError", u);
                        maybeCall(y);
                        throw e;
                    }
                };
                var E = htmx.config.globalViewTransitions;
                if (p.hasOwnProperty("transition")) {
                    E = p.transition;
                }
                if (E && triggerEvent(l, "htmx:beforeTransition", u) && typeof Promise !== "undefined" && document.startViewTransition) {
                    var x = new Promise(function(e, t) {
                        v = e;
                        y = t;
                    });
                    var S = b;
                    b = function() {
                        document.startViewTransition(function() {
                            S();
                            return x;
                        });
                    };
                }
                if (p.swapDelay > 0) {
                    setTimeout(b, p.swapDelay);
                } else {
                    b();
                }
            }
            if (a) {
                triggerErrorEvent(l, "htmx:responseError", mergeObjects({
                    error: "Response Status Error Code " + c.status + " from " + u.pathInfo.requestPath
                }, u));
            }
        }
        var extensions = {};
        function extensionBase() {
            return {
                init: function(e) {
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
            if (e == undefined) {
                return r;
            }
            if (r == undefined) {
                r = [];
            }
            if (n == undefined) {
                n = [];
            }
            var t = getAttributeValue(e, "hx-ext");
            if (t) {
                forEach(t.split(","), function(e) {
                    e = e.replace(/ /g, "");
                    if (e.slice(0, 7) == "ignore:") {
                        n.push(e.slice(7));
                        return;
                    }
                    if (n.indexOf(e) < 0) {
                        var t = extensions[e];
                        if (t && r.indexOf(t) < 0) {
                            r.push(t);
                        }
                    }
                });
            }
            return getExtensions(parentElt(e), r, n);
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
                getDocument().head.insertAdjacentHTML("beforeend", "<style>                      ." + htmx.config.indicatorClass + "{opacity:0}                      ." + htmx.config.requestClass + " ." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                      ." + htmx.config.requestClass + "." + htmx.config.indicatorClass + "{opacity:1; transition: opacity 200ms ease-in;}                    </style>");
            }
        }
        function getMetaConfig() {
            var e = getDocument().querySelector('meta[name="htmx-config"]');
            if (e) {
                return parseJSON(e.content);
            } else {
                return null;
            }
        }
        function mergeMetaConfig() {
            var e = getMetaConfig();
            if (e) {
                htmx.config = mergeObjects(htmx.config, e);
            }
        }
        ready(function() {
            mergeMetaConfig();
            insertIndicatorStyles();
            var e = getDocument().body;
            processNode(e);
            var t = getDocument().querySelectorAll("[hx-trigger='restored'],[data-hx-trigger='restored']");
            e.addEventListener("htmx:abort", function(e) {
                var t = e.target;
                var r = getInternalData(t);
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
            setTimeout(function() {
                triggerEvent(e, "htmx:load", {});
                e = null;
            }, 0);
        });
        return htmx;
    }();
});
/**!
@preserve FlowPlater starts here 
*/

var FlowPlater = function() {
    "use strict";
    const f = function() {
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
            }
        };
    }();
    function m(...e) {
        f.log(f.levels.INFO, ...e);
    }
    function g(...e) {
        f.log(f.levels.ERROR, ...e);
    }
    class s extends Error {
        constructor(e, t) {
            super(e);
            this.name = "FlowPlaterError";
            this.stack = t;
        }
    }
    class v extends s {
        constructor(e, t) {
            super(e);
            this.name = "TemplateError";
            this.stack = t;
        }
    }
    const y = function() {
        const a = new Map();
        return {
            subscribe(e, t, r = null) {
                if (!e || typeof e !== "string") {
                    s("Invalid event name. Event name must be a non-empty string.");
                }
                if (!t || typeof t !== "function") {
                    s(`Invalid callback for event "${e}". Callback must be a function.`);
                }
                if (!a.has(e)) {
                    a.set(e, []);
                }
                a.get(e).push({
                    callback: t,
                    context: r
                });
                f.log(f.levels.DEBUG, `Subscribed to event: ${e}`);
                return () => this.unsubscribe(e, t);
            },
            unsubscribe(e, t) {
                if (!e || typeof e !== "string") {
                    s("Invalid event name. Event name must be a non-empty string. If you are trying to unsubscribe from all events, use unsubscribeAll() instead.");
                }
                if (!a.has(e)) return;
                const r = a.get(e);
                a.set(e, r.filter(e => e.callback !== t));
            },
            unsubscribeAll() {
                a.clear();
                f.log(f.levels.INFO, "Cleared all event subscribers");
            },
            publish(r, n) {
                if (!a.has(r)) return;
                a.get(r).forEach(({
                    callback: e,
                    context: t
                }) => {
                    try {
                        e.call(t, n);
                    } catch (e) {
                        g(`Error in event subscriber for ${r}:`, e);
                    }
                });
                if (n && n.instanceName) {
                    const i = `${n.instanceName}:${r}`;
                    if (a.has(i)) {
                        a.get(i).forEach(({
                            callback: e,
                            context: t
                        }) => {
                            try {
                                e.call(t, n);
                            } catch (e) {
                                g(`Error in instance event subscriber for ${i}:`, e);
                            }
                        });
                    }
                }
            }
        };
    }();
    const b = {
        templateCache: {},
        instances: {},
        length: 0,
        defaults: {
            animation: false,
            debug: false
        }
    };
    function a(e) {
        return b.instances[e];
    }
    function D() {
        return b.instances;
    }
    const E = {
        marks: {},
        start: function(e) {
            this.marks[e] = performance.now();
        },
        end: function(e) {
            if (!this.marks[e]) return;
            const t = performance.now() - this.marks[e];
            delete this.marks[e];
            f.log(f.levels.DEBUG, `${e} took ${t.toFixed(2)}ms`);
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
                f.log(f.levels.DEBUG, "Cache hit:", t);
                return this.cache.get(t);
            }
            f.log(f.levels.DEBUG, "Cache miss:", t);
            const r = this.original.apply(this, e);
            this.cache.set(t, r);
            return r;
        }
    }
    function B(e) {
        const t = new M(e);
        const r = (...e) => t.apply(...e);
        r.original = t.original;
        r.cache = t.cache;
        return r;
    }
    const e = [ {
        tag: "fpselect",
        replaceWith: "select"
    } ];
    let h = e;
    function t(e) {
        h = e;
    }
    function $(e) {
        let t = false;
        for (const r of h) {
            const n = e.getElementsByTagName(r.tag);
            if (n.length > 0) {
                t = true;
                const i = Array.from(n);
                for (const a of i) {
                    const s = document.createElement(r.replaceWith);
                    s.innerHTML = a.innerHTML;
                    for (const o of a.attributes) {
                        s.setAttribute(o.name, o.value);
                    }
                    a.parentNode.replaceChild(s, a);
                }
            }
        }
        if (t) {
            m("replaced custom tags", e);
        }
        return e;
    }
    function x(e, t = false) {
        if (!t) {
            return n(e);
        }
        delete b.templateCache[e];
        const r = n.original(e);
        n.cache.set(JSON.stringify([ e ]), r);
        return r;
    }
    const n = B(function(t) {
        E.start("compile:" + t);
        const e = t.startsWith("#") ? t : "#" + t;
        var r = document.querySelector(e);
        m("Trying to compile template: " + t);
        if (!r) {
            g("Template not found: " + t);
            E.end("compile:" + t);
            return null;
        }
        if (!b.templateCache[t] || r.hasAttribute("fp-dynamic") && r.getAttribute("fp-dynamic") !== "false") {
            m("compiling template: " + t);
            function u(t) {
                let r = t.tagName.toLowerCase();
                h.forEach(e => {
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
            function c(e) {
                let l = "";
                e.childNodes.forEach(e => {
                    if (e.nodeType === Node.TEXT_NODE) {
                        l += e.textContent;
                    } else if (e.nodeType === Node.ELEMENT_NODE) {
                        if (e.hasAttribute("fp")) {
                            const t = e.tagName.toLowerCase();
                            const r = e.getAttribute("fp").split(" ").map(e => e.replace(/&quot;/g, '"')).join(" ");
                            const n = c(e);
                            if (t === "log" || t === "lookup" || t === "execute") {
                                if (n) {
                                    l += `{{${t} ${n} ${r}}}`;
                                } else {
                                    l += `{{${t} ${r}}}`;
                                }
                            } else if (t === "comment") {
                                l += `{{!-- ${r} --}}`;
                            } else if (t === "if") {
                                const i = r.replace(/"/g, '\\"');
                                l += `{{#${t} "${i}"}}${n}{{/${t}}}`;
                            } else if (t === "else") {
                                l += `{{${t}}}${n}`;
                            } else if (t === "math") {
                                if (n) {
                                    console.warn(`FlowPlater: The <${t}> helper does not accept inner content.`);
                                }
                                l += `{{#${t} "${r}"}}`;
                            } else {
                                l += `{{#${t} ${r}}}${n}{{/${t}}}`;
                            }
                        } else if (e.tagName === "else") {
                            const n = c(e);
                            l += `{{${e.tagName.toLowerCase()}}}${n}`;
                        } else if (e.tagName === "template" || e.tagName === "fptemplate" || e.hasAttribute("fp-template")) {
                            l += e.outerHTML;
                        } else {
                            const a = c(e);
                            const s = u(e);
                            let t = e.tagName.toLowerCase();
                            h.forEach(e => {
                                if (t === e.tag) {
                                    t = e.replaceWith;
                                }
                            });
                            const o = `</${t}>`;
                            l += `${s}${a}${o}`;
                        }
                    }
                });
                return l;
            }
            const n = c(r);
            m("Compiling Handlebars template: " + n);
            try {
                const i = Handlebars.compile(n);
                const a = b.config?.templates?.cacheSize || 100;
                if (Object.keys(b.templateCache).length >= a) {
                    const s = Object.keys(b.templateCache)[0];
                    delete b.templateCache[s];
                    m(`Cache limit reached. Removed template: ${s}`);
                }
                b.templateCache[t] = i;
                E.end("compile:" + t);
                return i;
            } catch (e) {
                g("Template not valid: " + n + " | Error: " + e.message);
                E.end("compile:" + t);
                return null;
            }
        }
        E.end("compile:" + t);
        return b.templateCache[t];
    });
    function S(e, t, r = "") {
        f.log(f.levels.DEBUG, `Storage config:`, b.config?.storage);
        if (b.config?.storage?.enabled) {
            try {
                const n = b.config.storage.ttl || 30 * 24 * 60 * 60;
                const i = {
                    data: t,
                    expiry: n === -1 ? -1 : Date.now() + n * 1e3
                };
                const a = `fp_${r}${r ? "_" : ""}${e}`;
                f.log(f.levels.DEBUG, `Saving to localStorage:`, {
                    key: a,
                    data: i
                });
                localStorage.setItem(a, JSON.stringify(i));
            } catch (e) {
                g(`Failed to save to localStorage: ${e.message}`);
            }
        } else {
            f.log(f.levels.DEBUG, `Storage is disabled, skipping save`);
        }
    }
    function w(e, t = "") {
        f.log(f.levels.DEBUG, `Storage config:`, b.config?.storage);
        if (b.config?.storage?.enabled) {
            try {
                const r = `fp_${t}${t ? "_" : ""}${e}`;
                const n = localStorage.getItem(r);
                if (!n) {
                    f.log(f.levels.DEBUG, `No stored item found for: ${r}`);
                    return null;
                }
                const i = JSON.parse(n);
                if (i.expiry !== -1 && Date.now() > i.expiry) {
                    f.log(f.levels.DEBUG, `Stored item has expired: ${r}`);
                    localStorage.removeItem(r);
                    return null;
                }
                f.log(f.levels.DEBUG, `Loaded from localStorage:`, {
                    key: r,
                    data: i
                });
                return i.data;
            } catch (e) {
                g(`Failed to load from localStorage: ${e.message}`);
                return null;
            }
        } else {
            f.log(f.levels.DEBUG, `Storage is disabled, skipping load`);
        }
        return null;
    }
    function o(e, t, r = {}) {
        return {
            formId: e.id,
            type: t,
            persistenceEnabled: i(e),
            ...r
        };
    }
    function l(e, t, r = "save") {
        const n = c(e);
        const i = `fp_form_${e.id}`;
        if (r === "save") {
            if (n) {
                S(e.id, t, "form");
            } else {
                sessionStorage.setItem(i, JSON.stringify(t));
            }
        } else if (r === "load") {
            return n ? w(e.id, "form") : JSON.parse(sessionStorage.getItem(i));
        } else if (r === "clear") {
            if (n) localStorage.removeItem(i);
            sessionStorage.removeItem(i);
        }
    }
    function u(e, t) {
        Array.from(e.elements).forEach(e => {
            if (!e.name || e.type === "file") return;
            if (!i(e)) return;
            t(e);
        });
    }
    function F(t, e, r, n = "add") {
        const i = e === "change" ? [ "change", t.type !== "checkbox" && t.type !== "radio" ? "input" : null ] : [ e ];
        i.filter(Boolean).forEach(e => {
            t[`${n}EventListener`](e, r);
        });
    }
    function q(e, t) {
        if (e.type === "checkbox" || e.type === "radio") {
            e.checked = t;
            U(e);
        } else if (e instanceof HTMLSelectElement && e.multiple) {
            Array.from(e.options).forEach(e => {
                e.selected = t.includes(e.value);
            });
        } else {
            e.value = t;
        }
    }
    function U(e) {
        const t = e.closest(e.type === "checkbox" ? ".w-checkbox" : ".w-radio");
        if (!t) return;
        const r = t.querySelector(`.w-${e.type}-input`);
        if (r) {
            r.classList.toggle("w--redirected-checked", e.checked);
        }
    }
    function r(t) {
        let e = false;
        let r = false;
        let n = false;
        for (const [ i, a ] of Object.entries(b.instances)) {
            if (Array.from(a.elements).some(e => e.contains(t))) {
                e = true;
                break;
            }
        }
        if (t.hasAttribute("fp-persist")) {
            r = t.getAttribute("fp-persist") !== "false";
            n = t.getAttribute("fp-persist") === "true";
        } else {
            const s = t.form;
            if (s && s.hasAttribute("fp-persist")) {
                r = s.getAttribute("fp-persist") !== "false";
                n = s.getAttribute("fp-persist") === "true";
            } else if (b.config?.storage?.enabled && !b.config?.persistForm) {
                r = false;
                n = false;
            } else {
                r = b.config?.persistForm;
                n = b.config?.storage?.enabled && b.config?.persistForm;
            }
        }
        if (t.tagName === "FORM") {
            const o = Array.from(t.elements).some(e => e.getAttribute("fp-persist") === "true");
            if (o) {
                n = b.config?.storage?.enabled;
            }
        }
        return {
            shouldPersist: e && r,
            useLocalStorage: n && b.config?.storage?.enabled
        };
    }
    function i(e) {
        return r(e).shouldPersist;
    }
    function c(e) {
        return r(e).useLocalStorage;
    }
    function V(e) {
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
            f.log(f.levels.ERROR, `Error capturing element state: ${e.message}`);
            return null;
        }
    }
    function j(r, e) {
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
            f.log(f.levels.ERROR, `Error restoring element state: ${e.message}`);
        }
    }
    function p(t, e) {
        try {
            Array.from(e.attributes).forEach(e => {
                if (e.name !== "value" && e.name !== "checked" && !e.name.startsWith("w-")) {
                    t.setAttribute(e.name, e.value);
                }
            });
        } catch (e) {
            f.log(f.levels.ERROR, `Error updating element attributes: ${e.message}`);
        }
    }
    function d(e, t) {
        try {
            if (e instanceof HTMLInputElement || e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement) {
                const r = V(e);
                p(e, t);
                j(e, r);
            }
        } catch (e) {
            f.log(f.levels.ERROR, `Error preserving element state: ${e.message}`);
        }
    }
    function W(e) {
        try {
            const t = e.getElementsByTagName("form");
            const n = {};
            Array.from(t).forEach(e => {
                if (!e.id) return;
                const t = {};
                const r = e.elements;
                Array.from(r).forEach(e => {
                    if (!e.name || e.type === "file") return;
                    if (!i(e)) return;
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
                    y.publish("formState:beforeCapture", {
                        formId: e.id,
                        formElement: e,
                        state: t
                    });
                    n[e.id] = t;
                    if (c(e)) {
                        S(e.id, t, "form");
                    } else {
                        sessionStorage.setItem(`fp_form_${e.id}`, JSON.stringify(t));
                    }
                }
            });
            return n;
        } catch (e) {
            f.log(f.levels.ERROR, `Error capturing form states: ${e.message}`);
            return {};
        }
    }
    function G(e) {
        if (!e.id) return false;
        const t = l(e, null, "load");
        if (!t) {
            f.log(f.levels.DEBUG, `No stored state found for form: ${e.id}`);
            return false;
        }
        const r = o(e, "restore", {
            restoredElements: [],
            customVisualUpdates: [],
            skippedElements: [],
            storageType: c(e) ? "localStorage" : "sessionStorage"
        });
        u(e, e => {
            if (!(e.name in t)) return;
            r.restoredElements.push({
                name: e.name,
                value: t[e.name]
            });
            q(e, t[e.name]);
        });
        f.log(f.levels.DEBUG, `Form state restoration summary for ${e.id}:
    Storage type: ${r.storageType}
    Restored elements:
    ${r.restoredElements.map(e => `- ${e.name}: ${e.value}`).join("\n    ")}
    
    Updated custom visual states for:
    ${r.customVisualUpdates.join(", ")}
    
    Skipped elements (persistence disabled):
    ${r.skippedElements.join(", ")}`);
        y.publish("formState:afterRestore", {
            formId: e.id,
            formElement: e,
            state: t
        });
        return true;
    }
    function X(e) {
        try {
            const t = e.getElementsByTagName("form");
            Array.from(t).forEach(G);
        } catch (e) {
            f.log(f.levels.ERROR, `Error restoring form states: ${e.message}`);
        }
    }
    function z(e) {
        try {
            const t = document.getElementById(e);
            if (!t) return;
            l(t, null, "clear");
            y.publish("formState:clear", {
                formId: e,
                formElement: t
            });
        } catch (e) {
            f.log(f.levels.ERROR, `Error clearing form state: ${e.message}`);
        }
    }
    function J(r) {
        try {
            if (!r.id) {
                f.log(f.levels.DEBUG, "Skipping form without ID");
                return;
            }
            const n = o(r, "setup", {
                formElements: r.elements.length,
                checkboxWrappers: r.querySelectorAll(".w-checkbox").length,
                listenersAdded: [],
                skippedElements: []
            });
            if (!r._fpChangeListeners) {
                r._fpChangeListeners = [];
            }
            u(r, t => {
                if (r._fpChangeListeners.some(({
                    element: e
                }) => e === t)) {
                    return;
                }
                const e = e => Y(e);
                F(t, "change", e);
                r._fpChangeListeners.push({
                    element: t,
                    handler: e
                });
                n.listenersAdded.push(t.name);
            });
            f.log(f.levels.DEBUG, `Form setup summary for ${r.id}:
      - Total form elements: ${n.formElements}
      - Checkbox wrappers: ${n.checkboxWrappers}
      - Form persistence: ${n.persistenceEnabled ? "enabled" : "disabled"}
      - Listeners added to: ${n.listenersAdded.join(", ")}
      - Skipped elements: ${n.skippedElements.join(", ")}`);
        } catch (e) {
            f.log(f.levels.ERROR, `Error setting up form change listeners: ${e.message}`);
        }
    }
    function K(e) {
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
            f.log(f.levels.ERROR, `Error cleaning up form change listeners: ${e.message}`);
        }
    }
    function Y(e) {
        try {
            const t = e.target;
            const r = t.form;
            if (!r || !r.id) {
                f.log(f.levels.DEBUG, "Skipping change handler - no form or form ID");
                return;
            }
            const n = o(r, "change", {
                changedValues: {},
                skippedElements: []
            });
            const i = {};
            u(r, e => {
                const t = e.type === "checkbox" || e.type === "radio" ? e.checked : e instanceof HTMLSelectElement && e.multiple ? Array.from(e.selectedOptions).map(e => e.value) : e.value;
                i[e.name] = t;
                n.changedValues[e.name] = t;
            });
            if (Object.keys(i).length > 0) {
                l(r, i, "save");
                f.log(f.levels.DEBUG, `Form state update for ${r.id}:
        - Changed element: ${t.name}
        - Storage type: ${c(r) ? "localStorage" : "sessionStorage"}
        - Updated values: ${JSON.stringify(n.changedValues, null, 2)}
        - Skipped elements (persistence disabled): ${n.skippedElements.join(", ")}`);
                y.publish("formState:changed", {
                    formId: r.id,
                    formElement: r,
                    state: i,
                    changedElement: t
                });
            }
        } catch (e) {
            f.log(f.levels.ERROR, `Error handling form element change: ${e.message}`);
        }
    }
    function Z(e) {
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
    function k(e) {
        try {
            f.log(f.levels.DEBUG, "Setting up form submit handlers for element:", e);
            const t = Z(e);
            f.log(f.levels.DEBUG, `Found ${t.size} forms`);
            t.forEach(e => {
                Q(e);
            });
        } catch (e) {
            f.log(f.levels.ERROR, `Error setting up form submit handlers: ${e.message}`);
        }
    }
    function Q(e) {
        if (!e.id) {
            f.log(f.levels.DEBUG, "Skipping form without ID");
            return;
        }
        f.log(f.levels.DEBUG, `Setting up handlers for form: ${e.id}`);
        e.removeEventListener("submit", ee);
        e.addEventListener("submit", ee);
        J(e);
        e._fpHandlersSetup = true;
        if (A(e)) {
            f.log(f.levels.DEBUG, `Restoring state for form: ${e.id}`);
            G(e);
        } else {
            f.log(f.levels.DEBUG, `Skipping form restoration - no persistent elements: ${e.id}`);
        }
    }
    function ee(e) {
        try {
            const t = e.target;
            if (t.id) {
                z(t.id);
            }
        } catch (e) {
            f.log(f.levels.ERROR, `Error handling form submit: ${e.message}`);
        }
    }
    function te(e) {
        try {
            const t = new MutationObserver(e => {
                e.forEach(e => {
                    e.addedNodes.forEach(e => {
                        if (e.tagName === "FORM") {
                            k(e);
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
            f.log(f.levels.ERROR, `Error setting up dynamic form observer: ${e.message}`);
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
        const r = e.tagName === "FORM" ? [ e ] : e.getElementsByTagName("form");
        for (const n of r) {
            if (n.getAttribute("fp-persist") === "false") {
                continue;
            }
            const i = n.elements;
            for (const a of i) {
                if (!a.name || a.type === "file") continue;
                const s = a.closest('[fp-persist="false"]');
                if (!s) {
                    if (!a.hasAttribute("fp-persist") && b.config?.persistForm) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function re(o, e, a, t) {
        if (!o.childNodes.length) {
            o.innerHTML = e.innerHTML;
            if (b.config?.persistForm) {
                k(o);
            }
            return;
        }
        if (o instanceof HTMLInputElement) {
            d(o, e);
            return;
        }
        const l = o instanceof SVGElement;
        if (ne(o)) {
            if (o instanceof HTMLIFrameElement || o instanceof HTMLScriptElement) {
                p(o, e);
            } else {
                d(o, e);
            }
            return;
        }
        if (!o.children.length && o.childNodes.length || !e.children.length && e.childNodes.length) {
            ie(o, e);
            return;
        }
        if (b.config?.persistForm) {
            W(o);
        }
        const u = Array.from(o.childNodes);
        const r = Array.from(e.childNodes);
        if (u.length === 1 && r.length === 1 && u[0].nodeType === r[0].nodeType && u[0].nodeName === r[0].nodeName) {
            re(u[0], r[0], a);
            return;
        }
        const c = new Set();
        r.forEach((e, t) => {
            if (e.nodeType === Node.ELEMENT_NODE) {
                const r = e.getAttribute("data-key");
                if (r) {
                    const n = a.get(r);
                    if (n) {
                        const i = u.indexOf(n);
                        if (i !== -1) {
                            o.insertBefore(n, u[t] || null);
                            c.add(i);
                        }
                    }
                }
            }
        });
        r.forEach((r, e) => {
            const t = u.findIndex((e, t) => !c.has(t) && ae(e, r));
            if (t !== -1) {
                c.add(t);
                const n = u[t];
                const i = Array.from(o.childNodes).indexOf(n);
                if (i !== e) {
                    const a = u[e];
                    if (a && a !== n) {
                        o.insertBefore(n, a);
                    }
                }
            } else {
                const s = l ? se(r) : r.cloneNode(true);
                const a = u[e] || null;
                o.insertBefore(s, a);
            }
        });
        u.forEach((e, t) => {
            if (!c.has(t)) {
                o.removeChild(e);
            }
        });
    }
    function ne(e) {
        const t = [ "INPUT", "SELECT", "TEXTAREA", "IFRAME", "SCRIPT" ];
        return t.includes(e.tagName);
    }
    function ie(n, e) {
        const t = Array.from(n.childNodes);
        const i = Array.from(e.childNodes);
        if (t.length === i.length) {
            t.forEach((e, t) => {
                const r = i[t];
                if (!ae(e, r)) {
                    n.replaceChild(r.cloneNode(true), e);
                }
            });
        } else {
            n.innerHTML = e.innerHTML;
        }
    }
    function ae(e, t) {
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
    function se(e) {
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
            r.appendChild(se(e));
        });
        return r;
    }
    async function C(a, s, t = false) {
        E.start("updateDOM");
        const e = a.hasAttribute("fp-restoring");
        if (e) {
            f.log(f.levels.DEBUG, "Already restoring, skipping");
            return;
        }
        a.setAttribute("fp-restoring", "true");
        try {
            if (!a || !(a instanceof HTMLElement)) {
                throw new Error("Invalid target element");
            }
            if (typeof s !== "string") {
                throw new Error("newHTML must be a string");
            }
            f.log(f.levels.DEBUG, "Starting updateDOM with config:", b.config);
            f.log(f.levels.DEBUG, `Form persistence enabled: ${b.config?.persistForm}, Should restore form: ${A(a)}`);
            let i = null;
            if (A(a)) {
                f.log(f.levels.DEBUG, "Capturing form states before update");
                i = W(a);
                f.log(f.levels.DEBUG, "Captured form states:", i);
            }
            let e = null;
            if (A(a)) {
                f.log(f.levels.DEBUG, "Setting up dynamic form observer");
                e = te(a);
            }
            const r = () => {
                return new Promise(e => {
                    const t = document.createElement("div");
                    t.innerHTML = s.trim();
                    const r = new Map();
                    const n = new Map();
                    oe(a, r);
                    oe(t, n);
                    re(a, t, r, n);
                    if (A(a) && i) {
                        f.log(f.levels.DEBUG, "Restoring form states after update");
                        X(a);
                        k(a);
                    }
                    e();
                });
            };
            if (document.startViewTransition && t) {
                await document.startViewTransition(() => r()).finished;
            } else {
                await r();
            }
            if (b.config?.persistForm && A(a)) {
                f.log(f.levels.DEBUG, "Restoring form states after update");
                const n = a.querySelectorAll('[fp-persist="true"]');
                f.log(f.levels.DEBUG, `Found ${n.length} inputs to restore`);
                X(a);
            }
            if (e) {
                f.log(f.levels.DEBUG, "Disconnecting form observer");
                e.disconnect();
            }
        } catch (e) {
            f.log(f.levels.ERROR, "Error in updateDOM:", e);
            console.error("UpdateDOM error:", e);
            throw e;
        } finally {
            a.removeAttribute("fp-restoring");
            E.end("updateDOM");
        }
    }
    function oe(e, t) {
        const r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, null, false);
        let n;
        while (n = r.nextNode()) {
            const i = n.getAttribute("data-key");
            if (i) {
                t.set(i, n);
            }
        }
    }
    function le(c) {
        function a(e) {
            const t = e.split(/[\.\[\]'"]/);
            let r = this.data;
            for (let e = 0; e < t.length; e++) {
                const n = t[e];
                if (n === "") continue;
                if (r === undefined || r === null || !r.hasOwnProperty(n)) {
                    return undefined;
                }
                r = r[n];
            }
            return r;
        }
        return {
            _updateDOM: function() {
                const e = b.instances[c];
                if (!e) {
                    g("Instance not found: " + c);
                    return this;
                }
                e.elements.forEach(function(t) {
                    try {
                        C(t, e.template(e.proxy), e.animate);
                    } catch (e) {
                        t.innerHTML = `<div class="fp-error">Error refreshing template: ${e.message}</div>`;
                        g(`Failed to refresh template: ${e.message}`);
                    }
                });
                return this;
            },
            update: function(e) {
                const t = b.instances[c];
                if (!t) {
                    g("Instance not found: " + c);
                    return this;
                }
                Object.assign(t.data, e);
                Object.assign(t.proxy, e);
                const r = c.replace("#", "");
                S(r, t.data, "instance");
                return this._updateDOM();
            },
            remove: function() {
                const e = b.instances[c];
                if (!e) {
                    throw new Error("Instance not found: " + c);
                }
                y.publish("beforeRemove", {
                    instanceName: c,
                    elements: e.elements
                });
                try {
                    if (b.config?.storage?.enabled) {
                        localStorage.removeItem(`fp_${c}`);
                    }
                    e.elements.forEach(function(e) {
                        try {
                            e.innerHTML = "";
                        } catch (e) {
                            g("Error removing instance: " + e.message);
                        }
                    });
                    e.elements = [];
                    delete b.instances[c];
                    delete b.templateCache[e.templateId];
                    y.publish("afterRemove", {
                        instanceName: c,
                        elements: []
                    });
                    m("Removed instance: " + c);
                    return true;
                } catch (e) {
                    throw e;
                }
            },
            refresh: async function(s = {
                remote: true,
                recompile: false
            }) {
                const o = b.instances[c];
                if (!o) {
                    g("Instance not found: " + c);
                    return Promise.reject(new Error("Instance not found: " + c));
                }
                const e = o.template(o.data);
                const t = s.recompile || !e && o.data;
                if (t) {
                    o.template = x(o.templateId, true);
                }
                f.log(f.levels.DEBUG, "Refresh - Template check:", {
                    templateId: o.templateId,
                    templateElement: document.querySelector(o.templateId),
                    compiledTemplate: o.template(o.data)
                });
                const l = [];
                o.elements.forEach(function(r) {
                    try {
                        if (s.remote) {
                            const e = [ "get", "post", "put", "patch", "delete" ];
                            const t = e.some(e => r.getAttribute(`hx-${e}`));
                            if (t) {
                                const n = e.find(e => r.getAttribute(`hx-${e}`));
                                const i = r.getAttribute(`hx-${n}`);
                                const a = fetch(i, {
                                    method: n.toUpperCase()
                                }).then(e => {
                                    if (!e.ok) {
                                        throw new Error(`HTTP error! status: ${e.status}`);
                                    }
                                    return e.json();
                                }).then(e => {
                                    Object.assign(o.data, e);
                                    Object.assign(o.proxy, e);
                                    const t = o.template(o.proxy);
                                    f.log(f.levels.DEBUG, "Refresh - Template render:", {
                                        data: o.data,
                                        rendered: t
                                    });
                                    C(r, t, o.animate);
                                    return e;
                                });
                                l.push(a);
                            }
                        } else {
                            C(r, o.template(o.proxy), o.animate);
                        }
                    } catch (e) {
                        r.innerHTML = `<div class="fp-error">Error refreshing template: ${e.message}</div>`;
                        g(`Failed to refresh template: ${e.message}`);
                        l.push(Promise.reject(e));
                    }
                });
                await Promise.all(l);
                return this;
            },
            getData: function() {
                return b.instances[c].data;
            },
            getProxy: function() {
                return b.instances[c].proxy;
            },
            getElements: function() {
                return b.instances[c].elements;
            },
            merge: function(e, r) {
                const t = b.instances[c];
                if (!t) {
                    g("Instance not found: " + c);
                    return this;
                }
                let n = r !== undefined ? r : e;
                try {
                    function i(t, e) {
                        for (const r in e) {
                            if (e.hasOwnProperty(r)) {
                                if (Array.isArray(e[r]) && Array.isArray(t[r])) {
                                    const n = new Map(t[r].map(e => [ e.id, e ]));
                                    e[r].forEach(e => {
                                        if (e.id && n.has(e.id)) {
                                            i(n.get(e.id), e);
                                        } else {
                                            t[r].push(e);
                                        }
                                    });
                                } else if (e[r] && typeof e[r] === "object" && !Array.isArray(e[r])) {
                                    t[r] = t[r] || {};
                                    i(t[r], e[r]);
                                } else {
                                    t[r] = e[r];
                                }
                            }
                        }
                        return t;
                    }
                    if (e && r !== undefined) {
                        let t = this.getData();
                        const a = e.split(/[\.\[\]'"]/);
                        for (let e = 0; e < a.length - 1; e++) {
                            const o = a[e];
                            if (o === "") continue;
                            if (!t[o]) t[o] = {};
                            t = t[o];
                        }
                        const s = a[a.length - 1];
                        if (s !== "") {
                            if (!t[s]) {
                                t[s] = Array.isArray(r) ? [] : {};
                            }
                            if (Array.isArray(r)) {
                                if (!Array.isArray(t[s])) {
                                    t[s] = [];
                                }
                                const l = t[s];
                                r.forEach(t => {
                                    if (t.id) {
                                        const e = l.findIndex(e => e.id === t.id);
                                        if (e >= 0) {
                                            i(l[e], t);
                                        } else {
                                            l.push(t);
                                        }
                                    } else {
                                        l.push(t);
                                    }
                                });
                            } else if (typeof r === "object") {
                                i(t[s], r);
                            } else {
                                t[s] = r;
                            }
                        }
                    } else {
                        i(this.getData(), n);
                    }
                    if (b.config?.storage?.enabled) {
                        const u = c.replace("#", "");
                        S(u, t.data, "instance");
                    }
                    return this._updateDOM();
                } catch (e) {
                    g(e.message);
                    return this;
                }
            },
            set: function(e, t) {
                const r = b.instances[c];
                if (!r) {
                    g("Instance not found: " + c);
                    return this;
                }
                try {
                    const n = e.split(/[\.\[\]'"]/g).filter(Boolean);
                    const i = n.pop();
                    const a = n.reduce((e, t) => {
                        if (!e[t]) e[t] = {};
                        return e[t];
                    }, r.data);
                    a[i] = t;
                    Object.assign(r.proxy, r.data);
                    const s = c.replace("#", "");
                    S(s, r.data, "instance");
                    return this._updateDOM();
                } catch (e) {
                    g(e.message);
                    return this;
                }
            },
            push: function(e, t) {
                let r = a.call(this, e);
                if (!Array.isArray(r)) {
                    g("Target at path is not an array: " + e);
                    return this;
                }
                try {
                    r.push(t);
                    if (b.config?.storage?.enabled) {
                        const n = c.replace("#", "");
                        S(n, instance.data, "instance");
                    }
                    return this._updateDOM();
                } catch (e) {
                    g(e.message);
                    return this;
                }
            },
            updateWhere: function(e, t, n) {
                let r = a.call(this, e);
                if (!Array.isArray(r)) {
                    g("Target at path is not an array: " + e);
                    return this;
                }
                try {
                    r.forEach(r => {
                        const e = Object.entries(t).every(([ e, t ]) => r[e] === t);
                        if (e) {
                            Object.assign(r, n);
                        }
                    });
                    if (b.config?.storage?.enabled) {
                        const i = c.replace("#", "");
                        S(i, instance.data, "instance");
                    }
                    return this._updateDOM();
                } catch (e) {
                    g(e.message);
                    return this;
                }
            },
            get: function(e) {
                return !e ? this.getData() : a.call(this, e);
            },
            refreshTemplate: function(e, t = false) {
                E.start("refreshTemplate:" + e);
                const r = x(e, t);
                if (!r) {
                    g("Failed to compile template: " + e);
                    E.end("refreshTemplate:" + e);
                    return false;
                }
            }
        };
    }
    function _({
        template: e,
        data: t,
        target: r,
        returnHtml: n = false,
        instanceName: i,
        animate: a = b.defaults.animation,
        recompile: s = false
    }) {
        E.start("render:" + (i || "anonymous"));
        y.publish("beforeRender", {
            instanceName: i,
            template: e,
            data: t,
            target: r,
            returnHtml: n,
            recompile: s
        });
        if (!e || e === "self") {
            const h = typeof r === "string" ? document.querySelector(r) : r;
            e = "#" + h.id;
        }
        let o = [];
        if (r instanceof NodeList) {
            o = Array.from(r);
        } else if (typeof r === "string") {
            o = Array.from(document.querySelectorAll(r));
        } else if (r instanceof Element) {
            o = [ r ];
        }
        if (o.length === 0) {
            g("No target elements found");
            return;
        }
        if (o.length === undefined) {
            o = [ o ];
        }
        if (i) {
            i = i;
        } else if (o[0].hasAttribute("fp-instance")) {
            i = o[0].getAttribute("fp-instance");
        } else if (o[0].id) {
            i = o[0].id;
        } else {
            i = b.length;
        }
        m("Rendering instance: " + i, e, t, r);
        var l = x(e, s);
        b.length++;
        if (!l) {
            g("Template not found: " + e);
            return;
        }
        if (o.length === 0) {
            g("Target not found: " + r);
            return;
        }
        if (!b.instances[i] || b.instances[i].data !== t) {
            const p = w(i, "instance");
            if (p) {
                t = {
                    ...t,
                    ...p
                };
            }
            var u = ue(t, t => {
                const e = o.filter(e => document.body.contains(e));
                e.forEach(e => {
                    C(e, l(t));
                });
            });
            b.instances[i] = {
                elements: new Set(o),
                template: l,
                templateId: o[0].getAttribute("fp-template") || e,
                proxy: u,
                data: t,
                cleanup: () => {
                    this.elements.clear();
                },
                ...le(i)
            };
            if (b.config?.storage?.enabled) {
                const d = i.replace("#", "");
                S(d, t, "instance");
            }
        }
        const c = b.instances[i];
        m("Proxy created: ", c.proxy);
        try {
            if (n) {
                var f = c.template(c.proxy);
                return f;
            }
            o.forEach(function(t) {
                try {
                    C(t, c.template(c.proxy), c.animate);
                } catch (e) {
                    t.innerHTML = `<div class="fp-error">Error rendering template: ${e.message}</div>`;
                    g(`Failed to render template: ${e.message}`);
                }
            });
            return c;
        } catch (e) {
            if (!(e instanceof v)) {
                g(`Failed to render template: ${e.message}`);
            }
            throw e;
        } finally {
            y.publish("afterRender", {
                instanceName: i,
                template: e,
                data: t,
                target: r,
                elements: o,
                returnHtml: n
            });
            m("Rendered instance: " + i, e, t, r);
            E.end("render:" + (i || "anonymous"));
        }
    }
    function ue(e, n) {
        if (typeof e !== "object" || e === null) {
            return e;
        }
        const t = {
            get(e, t) {
                const r = e[t];
                return r && typeof r === "object" ? ue(r, n) : r;
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
    function ce(e, t, r) {
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
                throw new v("Unsupported operator for strings: " + t);
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
            throw new v("Unsupported operator: " + t);
        }
    }
    function fe() {
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
                    for (const a of n) {
                        if (e && typeof e === "object" && a in e) {
                            e = e[a];
                        } else {
                            return undefined;
                        }
                    }
                    return e;
                }
                const n = t.split(".");
                let i = e;
                for (const a of n) {
                    if (i && typeof i === "object" && a in i) {
                        i = i[a];
                    } else {
                        return undefined;
                    }
                }
                return i;
            }
            try {
                const n = e.trim();
                const [ i, a, s ] = n.split(/\s*(==|!=|<=|>=|<|>|\|\||&&)\s*/);
                if (!i || !a || !s) {
                    throw new v(`Invalid expression format: ${n}`);
                }
                const o = r(i, t.data.root, this);
                const l = r(s, t.data.root, this);
                f.log(f.levels.INFO, "Evaluating expression:", {
                    raw: n,
                    leftValue: o,
                    operator: a,
                    rightValue: l
                });
                const u = ce(o, a, l);
                if (u) {
                    return t.fn(this);
                } else {
                    return t.inverse(this);
                }
            } catch (e) {
                if (!(e instanceof v)) {
                    f.log(f.levels.ERROR, "Error evaluating if condition:", e.stack);
                }
                throw e;
            }
        });
    }
    function he() {
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
    function* I(e) {
        var t = new RegExp(I.lang, "g");
        var r;
        while ((r = t.exec(e)) !== null) {
            var [ n ] = r;
            for (var i in I.categories) {
                if (new RegExp(I.categories[i]).test(n)) {
                    yield {
                        token: n,
                        category: i
                    };
                    break;
                }
            }
        }
    }
    I.categories = {
        op: "[+*/^]|-(?!\\d)",
        num: "-?\\d+(?:\\.\\d+)?%?",
        group: "[\\[()\\]]",
        sep: ",",
        ident: "\\b(ans|pi|e)\\b",
        func: "\\b(sqrt|abs|log|ln|sin|cos|tan|min|max)\\b"
    };
    I.lang = [ I.categories.op, I.categories.num, I.categories.group, I.categories.sep, I.categories.ident, I.categories.func ].join("|");
    I.cat = {
        INT: "num",
        IDENT: "ident",
        PCNT: "num",
        FUNC: "func",
        SEP: "sep"
    };
    class T {
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
                this.l = I(e);
                this.w = this._next();
                if (!this.e()) {
                    throw new SyntaxError(this.w ? this.w.token : "Unexpected end of expression");
                }
                if (this.w !== null) {
                    throw new SyntaxError(`Unexpected token: ${this.w.token}`);
                }
                return T.ans = this.stack.pop();
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
            } else if (this.w && [ "INT", "IDENT", "PCNT" ].some(e => I.cat[e] === this.w.category)) {
                this.stack.push(T._val(this.w));
                this.w = this._next();
                return true;
            } else if (this.w && this.w.category === I.cat.FUNC) {
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
                var i = this.w.token;
                var a = this.stack.pop();
                this.w = this._next();
                if (t.call(this)) {
                    var s = this.stack.pop();
                    this.stack.push(T._chooseOp(i)(a, s));
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
                this.stack.push(T._chooseOp(e)(r, t));
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
                this.stack.push(T._chooseOp(t)(n, r));
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
                this.stack.push(T._chooseFn(e).apply(null, t));
            } else {
                const r = this.stack.pop();
                if (r === undefined) {
                    throw new Error(`Function ${e} requires an argument`);
                }
                this.stack.push(T._chooseFn(e)(r));
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
            if (e.category === I.cat.INT || e.category === I.cat.PCNT) {
                t = parseFloat(e.token);
                if (e.token.endsWith("%")) t /= 100;
            } else if (e.category === I.cat.IDENT) {
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
    T.ans = 0;
    function pe() {
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
            const i = t.replace(/[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z0-9_]+)*/g, t => {
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
            f.log(f.levels.DEBUG, "Evaluating expression:", i);
            try {
                const a = new T();
                const s = a.exec(i);
                return s;
            } catch (e) {
                if (!(e instanceof v)) {
                    throw new v(`Error evaluating expression: ${e.message}`, e.stack);
                }
                throw e;
            }
        });
    }
    function de(i, a) {
        return function(e, t) {
            let r = i ? e[i] : e;
            let n = i ? t[i] : t;
            if (r === null || r === undefined) return a ? -1 : 1;
            if (n === null || n === undefined) return a ? 1 : -1;
            if (typeof r === "string" && typeof n === "string") {
                return a ? n.localeCompare(r) : r.localeCompare(n);
            }
            if (r < n) return a ? 1 : -1;
            if (r > n) return a ? -1 : 1;
            return 0;
        };
    }
    function me() {
        Handlebars.registerHelper("each", function(e, t) {
            var r = "";
            var n = t.hash.limit;
            var i = t.hash.startAt || 0;
            var a = t.hash.sortBy;
            var s = t.hash.descending;
            var o = t.hash.sortBeforeLimit;
            var l = t.inverse;
            var u = t.fn;
            var c;
            var f;
            o = typeof o === "boolean" ? o : true;
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
            if (o) {
                h.sort(de(a, s));
                h = h.slice(i, n + i);
            } else {
                h = h.slice(i, n + i);
                h.sort(de(a, s));
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
    function ge() {
        Handlebars.registerHelper("execute", function(e, ...t) {
            t.pop();
            const r = String(e);
            const n = this[r] || window[r];
            if (typeof n === "function") {
                return n(...t);
            } else {
                g("Function not found or is not a function: " + e);
            }
        });
    }
    function ve() {
        Handlebars.registerHelper("set", function(e, t, r) {
            if (!e || !t) {
                g("setHelper: varName and varValue are required");
                return "";
            }
            if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(e)) {
                g(`setHelper: varName ${e} is not a valid variable name`);
                return "";
            }
            r.data.root[e] = t;
        });
    }
    function ye() {
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
    function be() {
        fe();
        he();
        pe();
        me();
        ge();
        ve();
        ye();
    }
    const O = {
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
                    f.log(f.levels.DEBUG, "Added element to processing set", e, t);
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
                if (n && n.requestId === t) {
                    this.processingElements.delete(e);
                    f.log(f.levels.DEBUG, "Cleaned up after request", e, t);
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
                    f.log(f.levels.DEBUG, "Cleaned up stale processing entry", r, n.requestId);
                }
            }
        },
        setupEventListeners() {
            document.body.addEventListener("htmx:configRequest", e => {
                e.detail.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
            });
            document.body.addEventListener("htmx:beforeRequest", e => {
                const t = e.detail.elt;
                const r = e.detail.requestId || this.generateRequestId();
                e.detail.requestId = r;
                this.handleRequest(t, r, "start");
                var n = e.detail.elt;
                if (n.hasAttribute("fp-instance")) {
                    var i = n.getAttribute("fp-instance");
                    y.publish("request-start", {
                        instanceName: i,
                        ...e.detail
                    });
                }
            });
            document.body.addEventListener("htmx:afterRequest", e => {
                var t = e.detail.elt;
                if (t.hasAttribute("fp-instance")) {
                    var r = t.getAttribute("fp-instance");
                    y.publish("request-end", {
                        instanceName: r,
                        ...e.detail
                    });
                }
            });
            document.body.addEventListener("htmx:beforeSwap", e => {
                const t = e.detail.elt;
                const r = e.detail.requestId;
                const n = this.processingElements.get(t);
                if (!n || n.requestId !== r) {
                    e.preventDefault();
                    f.log(f.levels.DEBUG, "Prevented swap - request ID mismatch");
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
    function Ee(e) {
        function l(e) {
            var t = {};
            if (e.attributes) {
                for (var r = 0; r < e.attributes.length; r++) {
                    var n = e.attributes.item(r);
                    t["_" + n.nodeName] = n.nodeValue;
                }
            }
            var i = e.childNodes;
            if (i.length === 1 && i[0].nodeType === 3) {
                return i[0].nodeValue.trim();
            } else {
                for (var a = 0; a < i.length; a++) {
                    var s = i[a];
                    if (s.nodeType === 1) {
                        var o = l(s);
                        if (t[s.nodeName]) {
                            if (!Array.isArray(t[s.nodeName])) {
                                t[s.nodeName] = [ t[s.nodeName] ];
                            }
                            t[s.nodeName].push(o);
                        } else {
                            t[s.nodeName] = o;
                        }
                    }
                }
            }
            return t;
        }
        var t = new DOMParser();
        var r = t.parseFromString(e, "text/xml");
        return l(r.documentElement);
    }
    function xe() {
        htmx.defineExtension("flowplater", {
            transformResponse: function(t, e, r) {
                const n = e.requestId;
                const i = O.processingElements.get(r);
                f.log(f.levels.DEBUG, "Transform response for request", n, "current info:", i);
                if (!i || i.requestId !== n) {
                    f.log(f.levels.DEBUG, "Skipping transformation - request ID mismatch", {
                        current: i?.requestId,
                        received: n
                    });
                    return t;
                }
                if (!r.hasAttribute("fp-template")) {
                    return t;
                }
                let a;
                try {
                    if (e.getResponseHeader("Content-Type")?.startsWith("text/xml")) {
                        var s = new DOMParser();
                        var o = s.parseFromString(t, "text/xml");
                        a = Ee(o);
                    } else {
                        a = JSON.parse(t);
                    }
                } catch (e) {
                    g("Failed to parse response:", e);
                    return t;
                }
                var l = r.getAttribute("fp-template");
                m("Response received for request " + n + ": ", a);
                const u = r.getAttribute("fp-instance") || r.id;
                w(u, "instance");
                try {
                    let e;
                    if (l) {
                        m("Rendering html to " + l + " based on htmx response");
                        e = _({
                            template: l,
                            data: a,
                            target: r,
                            returnHtml: true
                        });
                    } else {
                        if (!r.id) {
                            g("No template found. If the current element is a template, it must have an id.");
                            return t;
                        }
                        m("Rendering html to current element based on htmx response");
                        var c = "#" + r.id;
                        e = _({
                            template: c,
                            data: a,
                            target: r,
                            returnHtml: true
                        });
                    }
                    if (e) {
                        f.log(f.levels.DEBUG, "Template rendered successfully for request", n);
                        return e;
                    }
                    return t;
                } catch (e) {
                    g("Error rendering template:", e);
                    return "<div class='fp-error'>Error rendering template: " + e + "</div>";
                }
            },
            handleSwap: function(e, t, r, n) {
                if (!t.hasAttribute("fp-template")) {
                    f.log(f.levels.DEBUG, "No fp-template attribute, skipping handleSwap");
                    return false;
                }
                try {
                    const i = t.getAttribute("fp-instance") || t.id;
                    if (!i) {
                        f.log(f.levels.DEBUG, "No instance name found for element, falling back to default swap");
                        return false;
                    }
                    const a = b.instances[i];
                    if (!a) {
                        f.log(f.levels.DEBUG, "No instance found for name: " + i);
                        return false;
                    }
                    const s = [ "innerHTML" ];
                    if (!s.includes(e)) {
                        f.log(f.levels.DEBUG, "Unsupported swap style for smart DOM swap: " + e + ", falling back to default swap");
                        const o = [ "outerHTML", "beforebegin", "afterbegin", "afterend" ];
                        if (o.includes(e)) {
                            f.log(f.levels.WARN, "Breaking swap style: " + e + ", instance methods will not work as expected. Target container was removed from the DOM.");
                        }
                        return false;
                    }
                    f.log(f.levels.DEBUG, "Using updateDOM for swap with config:", b.config);
                    C(t, r.innerHTML, a.animate);
                    f.log(f.levels.DEBUG, "HTMX smart innerHTML swap completed for instance: " + i);
                    return true;
                } catch (e) {
                    g("Error in handleSwap:", e);
                    return false;
                }
            },
            onEvent: function(e, t) {
                if (t.detail.handled) return;
                const r = t.detail.elt;
                const n = t.detail.requestId || O.generateRequestId();
                switch (e) {
                  case "htmx:beforeRequest":
                    t.detail.requestId = n;
                    t.detail.xhr.requestId = n;
                    O.handleRequest(r, n, "start");
                    break;

                  case "htmx:beforeSwap":
                    const i = O.processingElements.get(r);
                    if (!i || i.requestId !== n) {
                        t.preventDefault();
                        f.log(f.levels.DEBUG, "Prevented swap - request ID mismatch");
                        return;
                    }
                    break;

                  case "htmx:afterSwap":
                    O.handleRequest(r, n, "cleanup");
                    const a = Z(r);
                    a.forEach(K);
                    break;

                  case "htmx:afterSettle":
                    f.log(f.levels.DEBUG, `Setting up form handlers after DOM settle for target: ${r.id || "unknown"}, ` + `has fp-template: ${r.hasAttribute("fp-template")}, ` + `parent form: ${r.closest("form")?.id || "none"}`);
                    k(r);
                    break;
                }
            }
        });
    }
    function Se(r) {
        try {
            if (r.hasAttribute("data-fp-proxy-processed") || !r.hasAttribute("fp-proxy") || r.getAttribute("fp-proxy") === "false") {
                return r;
            }
            const n = r.getAttribute("fp-proxy").startsWith("http") ? r.getAttribute("fp-proxy") : "https://corsproxy.io/?";
            const e = [ "get", "post", "put", "patch", "delete" ];
            e.forEach(function(e) {
                if (r.hasAttribute("hx-" + e)) {
                    const t = r.getAttribute("hx-" + e);
                    r.setAttribute("hx-" + e, n + encodeURIComponent(t));
                }
            });
            r.setAttribute("data-fp-proxy-processed", "true");
            return r;
        } catch (e) {
            f.log(f.levels.ERROR, `Error in setupProxy: ${e.message}`);
            return r;
        }
    }
    function we(t) {
        if (!t) {
            errorLog("No URL provided for preloading");
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
            errorLog(`Failed to preload URL: ${t}`, e);
            r();
        };
        const n = setTimeout(r, 3e3);
        document.head.appendChild(e);
        return {
            cleanup: r,
            timeoutId: n
        };
    }
    function ke(n) {
        const e = n.getAttribute("fp-preload") || "mouseover";
        if (e === "mouseover") {
            let t = true;
            let e;
            let r;
            const i = () => {
                t = true;
                e = setTimeout(() => {
                    if (t) {
                        const e = n.getAttribute("href") || n.getAttribute("hx-get") || n.getAttribute("fp-get");
                        r = we(e);
                    }
                }, 100);
            };
            const a = () => {
                t = false;
                if (e) {
                    clearTimeout(e);
                }
                if (r) {
                    clearTimeout(r.timeoutId);
                    r.cleanup();
                }
            };
            n.addEventListener("mouseover", i);
            n.addEventListener("mouseout", a);
            n._preloadCleanup = () => {
                n.removeEventListener("mouseover", i);
                n.removeEventListener("mouseout", a);
                a();
            };
        } else {
            const t = () => {
                const e = n.getAttribute("href") || n.getAttribute("hx-get") || n.getAttribute("fp-get");
                we(e);
            };
            n.addEventListener(e, t);
            n._preloadCleanup = () => {
                n.removeEventListener(e, t);
            };
        }
    }
    function Ae(t) {
        try {
            if (t.hasAttribute("data-fp-preload-processed")) {
                return t;
            }
            if (t.hasAttribute("fp-preload")) {
                ke(t);
                t.setAttribute("data-fp-preload-processed", "true");
            }
            return t;
        } catch (e) {
            f.log(f.levels.ERROR, `Error in processPreload: ${e.message}`);
            return t;
        }
    }
    const Ce = [ "boost", "get", "post", "on", "push-url", "select", "select-oob", "swap", "swap-oob", "target", "trigger", "vals", "confirm", "delete", "disable", "disabled-elt", "disinherit", "encoding", "ext", "headers", "history", "history-elt", "include", "indicator", "params", "patch", "preserve", "prompt", "put", "replace-url", "request", "sync", "validate", "vars" ];
    function _e(n) {
        try {
            const i = "fp-";
            const a = "hx-";
            Ce.forEach(e => {
                const t = i + e;
                if (n.hasAttribute(t)) {
                    const r = n.getAttribute(t);
                    n.setAttribute(a + e, r);
                    n.removeAttribute(t);
                }
            });
            return n;
        } catch (e) {
            errorLog(`Error in translateCustomHTMXAttributes: ${e.message}`);
            return n;
        }
    }
    function Ie(t) {
        try {
            const r = [ "get", "post", "put", "patch", "delete" ];
            function o(e, t) {
                while (e) {
                    if (e.hasAttribute(t)) {
                        return e.getAttribute(t);
                    }
                    e = e.parentElement;
                }
                return null;
            }
            function e(s) {
                r.forEach(function(e) {
                    var t = "hx-" + e;
                    if (s.hasAttribute(t)) {
                        var r = s.getAttribute(t);
                        m("Original URL: " + r);
                        var n = o(s, "fp-prepend");
                        var i = o(s, "fp-append");
                        var a = r;
                        if (n) {
                            a = n + a;
                        }
                        if (i) {
                            a += i;
                        }
                        s.setAttribute(t, a);
                        m("Modified URL: " + a);
                        if (a !== r) {
                            m("Modification successful for", e, "on element", s);
                        } else {
                            g("Modification failed for", e, "on element", s);
                        }
                    }
                });
            }
            if ((t.hasAttribute("fp-prepend") || t.hasAttribute("fp-append")) && r.some(e => t.hasAttribute("hx-" + e))) {
                e(t);
            }
            return t;
        } catch (e) {
            g(`Error in processUrlAffixes: ${e.message}`);
            return t;
        }
    }
    function Te(t) {
        try {
            var e = t.getAttribute("fp-animation") || b.defaults.animation;
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
            f.log(f.levels.ERROR, `Error in setupAnimation: ${e.message}`);
            return t;
        }
    }
    function Oe(t) {
        try {
            var e = t.getAttribute("hx-ext") || "";
            if (!e.includes("flowplater")) {
                var r = e ? e + ", flowplater" : "flowplater";
                t.setAttribute("hx-ext", r);
                f.log(f.levels.INFO, "Added hx-ext attribute to " + t.id);
            }
            return t;
        } catch (e) {
            f.log(f.levels.ERROR, `Error in addHtmxExtensionAttribute: ${e.message}`);
            return t;
        }
    }
    /**
   * @namespace FlowPlater
   * @description Core FlowPlater module that provides template processing and dynamic content management.
   * Integrates with HTMX and Handlebars to provide a seamless templating and interaction experience.
   * @version 1.4.19
   * @author JWSLS
   * @license Flowplater standard licence
   */
    const Pe = "1.4.19";
    const Ne = "JWSLS";
    const Re = "Flowplater standard licence";
    const P = {
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
            swapStyle: "innerHTML"
        },
        customTags: e,
        storage: {
            enabled: false,
            ttl: 30 * 24 * 60 * 60
        },
        persistForm: true
    };
    if (typeof Handlebars === "undefined") {
        throw new s("FlowPlater requires Handlebars. Get it at https://handlebarsjs.com/");
    }
    if (typeof htmx === "undefined") {
        throw new s("FlowPlater requires htmx. Get it at https://htmx.org/");
    }
    b.config = JSON.parse(JSON.stringify(P));
    O.setupEventListeners();
    xe();
    const N = {
        processors: [ {
            name: "customTags",
            process: $
        }, {
            name: "htmxAttributes",
            process: _e
        }, {
            name: "htmxExtensionAttribute",
            process: Oe
        }, {
            name: "urlAffixes",
            process: Ie
        }, {
            name: "animation",
            process: Te
        }, {
            name: "proxy",
            process: Se
        }, {
            name: "preload",
            process: Ae
        }, {
            name: "htmxProcess",
            process: e => {
                htmx.process(e);
                return e;
            }
        } ],
        FP_SELECTOR: b.config.selectors.fp,
        processElement: function(i) {
            if (i._preloadCleanup) {
                i._preloadCleanup();
            }
            let a = {
                success: true,
                errors: [],
                warnings: [],
                finalElement: i
            };
            a.finalElement = this.processors.reduce((t, r, e) => {
                if (!t) {
                    a.errors.push({
                        phase: r.name,
                        error: `Element became undefined at processor index ${e}`,
                        processor: this.processors[e - 1]
                    });
                    a.success = false;
                    return i;
                }
                try {
                    const n = r.process(t);
                    return n;
                } catch (e) {
                    a.errors.push({
                        phase: r.name,
                        error: e.message,
                        stack: e.stack
                    });
                    f.log(f.levels.ERROR, `Error in processor ${r.name}: ${e.message}`, e);
                    if (e instanceof v) {
                        a.warnings.push({
                            phase: r.name,
                            message: "Falling back to original template"
                        });
                        return t;
                    }
                    return t;
                }
            }, i);
            if (a.errors.length > 0) {
                y.publish("processingChain:error", a);
            }
            if (a.warnings.length > 0) {
                y.publish("processingChain:warning", a);
            }
            return a.finalElement;
        }
    };
    function Le(e = document) {
        if (e === document || !e.matches(N.FP_SELECTOR)) {
            const t = e.querySelectorAll(N.FP_SELECTOR);
            t.forEach(e => {
                N.processElement(e);
                const t = e.getAttribute("fp-template");
                if (t && t !== "self" && t !== "") {
                    const r = document.querySelector(t.startsWith("#") ? t : `#${t}`);
                    if (r) {
                        N.processElement(r);
                    }
                }
            });
            return;
        }
        N.processElement(e);
    }
    Handlebars.unregisterHelper("each");
    Handlebars.unregisterHelper("if");
    be(Handlebars);
    const He = {
        compileTemplate: x,
        render: _,
        getInstance: a,
        getInstances: D,
        on: (...e) => y.subscribe(...e),
        off: (...e) => y.unsubscribe(...e),
        emit: (...e) => y.publish(...e),
        debug: function(e) {
            f.level = e;
            return this;
        },
        templateCache: {
            set: function(e, t) {
                const r = b.config.templates.cacheSize;
                const n = b.templateCache;
                if (Object.keys(n).length >= r) {
                    const i = Object.keys(n)[0];
                    delete n[i];
                    f.log(f.levels.INFO, `Cache limit reached. Removed template: ${i}`);
                }
                n[e] = t;
                return t;
            },
            get: function(e) {
                if (e) {
                    return b.templateCache[e];
                }
                return b.templateCache;
            },
            isCached: function(e) {
                return !!b.templateCache[e];
            },
            clear: function(e) {
                if (e) {
                    delete b.templateCache[e];
                    f.log(f.levels.INFO, `Cleared template cache for: ${e}`);
                } else {
                    b.templateCache = {};
                    f.log(f.levels.INFO, "Cleared entire template cache");
                }
            },
            size: function() {
                return Object.keys(b.templateCache).length;
            }
        },
        init: function(e = document, u = {
            render: true
        }) {
            E.start("init");
            f.log(f.levels.INFO, "Initializing FlowPlater...");
            const t = document.querySelectorAll("[fp-template]");
            t.forEach(t => {
                let e = t.getAttribute("fp-template");
                if (e === "self" || e === "") {
                    e = t.id;
                }
                if (e) {
                    const r = document.querySelector(e);
                    if (r) {
                        m("replacing template content", r);
                        const n = r.getElementsByTagName("script");
                        const i = Array.from(n).map(e => e.innerHTML);
                        Array.from(n).forEach((e, t) => {
                            e.innerHTML = `##FP_SCRIPT_${t}##`;
                        });
                        r.innerHTML = r.innerHTML.replace(/\[\[(.*?)\]\]/g, "{{$1}}");
                        Array.from(r.getElementsByTagName("script")).forEach((e, t) => {
                            e.innerHTML = i[t];
                        });
                    }
                    x(e, true);
                    if (u.render) {
                        const a = [ "get", "post", "put", "patch", "delete" ];
                        const s = a.some(e => t.hasAttribute(`hx-${e}`) || t.hasAttribute(`fp-${e}`));
                        if (!s) {
                            _({
                                template: e,
                                data: {},
                                target: t
                            });
                        } else {
                            if (b.config?.storage?.enabled) {
                                const o = t.getAttribute("fp-instance") || e;
                                const l = w(o, "instance");
                                if (l) {
                                    f.log(f.levels.INFO, `Found stored data for instance: ${o}, rendering with stored data`);
                                    _({
                                        template: e,
                                        data: l,
                                        target: t
                                    });
                                } else {
                                    f.log(f.levels.INFO, `Skipping initial render for instance: ${o}`);
                                }
                            } else {
                                f.log(f.levels.INFO, `Skipping initial render for template with HTMX/FP methods: ${e}`);
                            }
                        }
                    }
                } else {
                    g(`No template ID found for element: ${t.id}`, t, "Make sure your template has an ID attribute");
                }
            });
            Le(e);
            f.log(f.levels.INFO, "FlowPlater initialized successfully");
            E.end("init");
            return this;
        },
        cleanup: function(e) {
            if (e) {
                const t = b.instances[e];
                if (t) {
                    t.elements.forEach(e => {
                        if (e._preloadCleanup) {
                            e._preloadCleanup();
                        }
                        e.removeEventListeners();
                    });
                    delete b.instances[e];
                    m(`Cleaned up instance: ${e}`);
                }
            } else {
                Object.keys(b.instances).forEach(e => {
                    this.cleanup(e);
                });
                m("Cleaned up all instances");
            }
            return this;
        },
        version: Pe,
        author: Ne,
        license: Re,
        setCustomTags: t,
        config: function(e = {}) {
            if ("storage" in e) {
                e.storage = De(e.storage, P.storage);
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
            b.config = n(JSON.parse(JSON.stringify(b.config)), e);
            f.level = b.config.debug.level;
            N.FP_SELECTOR = b.config.selectors.fp;
            if (typeof htmx !== "undefined") {
                htmx.config.timeout = b.config.htmx.timeout;
                htmx.config.defaultSwapStyle = b.config.htmx.swapStyle;
            }
            if (e.customTags) {
                t(e.customTags);
            }
            f.log(f.levels.INFO, "FlowPlater configured with:", b.config);
            return this;
        },
        getConfig: function() {
            return JSON.parse(JSON.stringify(b.config));
        },
        destroy: function() {
            Object.keys(b.instances).forEach(e => {
                this.cleanup(e);
            });
            b.templateCache = {};
            b.instances = {};
            y.unsubscribeAll();
            m("Cleaned up all instances");
        },
        create: function(e, t = {
            refresh: true
        }) {
            E.start(`createInstance:${e}`);
            f.log(f.levels.INFO, `Creating FlowPlater instance: ${e}`);
            let r;
            if (e.startsWith("#")) {
                r = document.getElementById(e.slice(1));
            } else {
                r = document.querySelector(`[fp-instance="${e}"]`);
            }
            if (!r) {
                throw new s(`Could not find element for instance: ${e}`);
            }
            const n = r.getAttribute("fp-template");
            if (n) {
                this.templateCache.clear(n);
            }
            this.init(r);
            const i = a(e);
            if (!i) {
                throw new s(`Failed to create instance: ${e}`);
            }
            if (t.refresh) {
                i.refresh();
            }
            f.log(f.levels.INFO, `Instance created successfully: ${e}`);
            E.end(`createInstance:${e}`);
            return i;
        }
    };
    function De(e, t) {
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
    let R = JSON.parse(JSON.stringify(P));
    const L = document.querySelector('meta[name="fp-config"]');
    if (L) {
        try {
            const H = JSON.parse(L.content);
            if ("storage" in H) {
                H.storage = De(H.storage, P.storage);
            }
            R = {
                ...R,
                ...H
            };
        } catch (e) {
            g("Error parsing fp-config meta tag:", L, "Make sure your meta tag is valid");
        }
    }
    He.config(R);
    if (document.readyState === "complete" || document.readyState !== "loading") {
        setTimeout(() => {
            try {
                FlowPlater.init();
            } catch (e) {
                g("FlowPlater initialization failed:", e);
            }
        }, 1);
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            setTimeout(() => {
                try {
                    FlowPlater.init();
                } catch (e) {
                    g("FlowPlater initialization failed:", e);
                }
            }, 1);
        });
    }
    return He;
}();