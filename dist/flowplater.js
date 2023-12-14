var FlowPlater = function() {
    if (typeof Handlebars === "undefined") {
        throw new Error("FlowPlater requires Handlebars. Get it at https://handlebarsjs.com/");
    }
    if (typeof htmx === "undefined") {
        throw new Error("FlowPlater requires htmx. Get it at https://htmx.org/");
    }
    var s = {};
    var d = {};
    var c = 0;
    var m = {
        onRender: function() {},
        onRendered: function() {},
        onRemove: function() {},
        onRemoved: function() {},
        animation: false
    };
    document.querySelectorAll("[fp-template]").forEach(function(e) {
        var t = e.getAttribute("fp-animation") || m.animation;
        if (t === "true") {
            var r = e.getAttribute("hx-swap");
            if (!r) {
                e.setAttribute("hx-swap", "innerHTML transition:true");
            } else {
                e.setAttribute("hx-swap", r + " transition:true");
            }
        }
    });
    function e(e, t) {
        var r = e.getAttribute("fp-animation") || m.animation;
        if (!r) {
            t();
            return;
        } else {
            var n = document.startViewTransition(e);
            t();
        }
    }
    function p(e, t) {
        var r = new CustomEvent("flowplater:" + e, {
            detail: t
        });
        document.dispatchEvent(r);
    }
    document.addEventListener("htmx:beforeRequest", function(e) {
        var t = e.detail.elt;
        if (t.hasAttribute("fp-instance")) {
            var r = t.getAttribute("fp-instance");
            p("request-start", {
                instanceName: r,
                ...e.detail
            });
        }
    });
    document.addEventListener("htmx:afterRequest", function(e) {
        var t = e.detail.elt;
        if (t.hasAttribute("fp-instance")) {
            var r = t.getAttribute("fp-instance");
            p("request-end", {
                instanceName: r,
                ...e.detail
            });
        }
    });
    function v(e) {
        if (!s[e]) {
            var t = document.querySelector(e);
            if (!t) {
                g("Template not found: " + e);
                return null;
            }
            var f = t.innerHTML;
            var r = new DOMParser();
            var n = r.parseFromString(f, "text/html");
            var a = n.querySelectorAll("[fp]");
            a.forEach(function(e) {
                var t = e.tagName.toLowerCase();
                if (e.outerHTML.indexOf("/>") !== -1) {
                    g("Self-closing tag not supported: " + e.outerHTML);
                    return;
                }
                var r = e.getAttribute("fp");
                var n = document.createElement("textarea");
                n.innerHTML = r;
                var a = n.value;
                var i = new RegExp("<" + t + '(.*?) fp="(.*?)"', "g");
                var o = "{{#" + t + " " + a + "}}";
                f = f.replace(i, o);
                f = f.replace(new RegExp("</" + t + ">", "g"), "{{/" + t + "}}");
            });
            try {
                s[e] = Handlebars.compile(f);
                return s[e];
            } catch (e) {
                g("Template not valid: " + f + " | Error: " + e.message);
                return null;
            }
        }
        return s[e];
    }
    function l({
        template: n,
        data: e,
        target: t,
        returnHtml: r,
        onRender: a = m.onRender,
        onRendered: i = m.onRendered,
        instanceName: o = c
    }) {
        f.forEach(function(e) {
            a.call(e);
        });
        p("render", {
            instanceName: o,
            template: n,
            data: e,
            target: t,
            returnHtml: r
        });
        var f;
        var o;
        if (typeof t === "string") {
            f = document.querySelectorAll(t);
        } else if (typeof t === "object" && t.jquery) {
            f = t.toArray();
        } else if (typeof t === "object") {
            f = t;
        } else {
            g("Invalid target type: " + typeof t);
            return;
        }
        if (f.length === undefined) {
            f = [ f ];
        }
        if (o !== c) {
            o = o;
        } else if (f[0].hasAttribute("fp-instance")) {
            o = f[0].getAttribute("fp-instance");
        } else if (f[0].id) {
            o = f[0].id;
        }
        if (!s[n]) {
            v(n);
            c++;
        }
        var n = s[n];
        if (!n) {
            g("Template not found: " + n);
            return;
        }
        if (f.length === 0) {
            g("Target not found: " + t);
            return;
        }
        if (!d[o] || d[o].data !== e) {
            var u = new Proxy(e, {
                set: function(t, e, r) {
                    t[e] = r;
                    f.forEach(function(e) {
                        e.innerHTML = n(t);
                    });
                    return true;
                }
            });
            d[o] = {
                elements: f,
                template: n,
                proxy: u,
                data: e,
                ...y(o)
            };
        }
        if (r) {
            try {
                var l = n(d[o].proxy);
                f.forEach(function(e) {
                    i.call(e);
                });
                p("rendered", {
                    instance: o,
                    template: n,
                    data: e,
                    target: t,
                    elements: f,
                    returnHtml: r,
                    html: l
                });
                return l;
            } catch (e) {
                g("Error rendering template: " + e.message);
            }
        } else {
            try {
                f.forEach(function(e) {
                    e.innerHTML = n(d[o].proxy);
                    i.call(e);
                });
                p("rendered", {
                    instance: o,
                    template: n,
                    data: e,
                    target: t,
                    elements: f,
                    returnHtml: r
                });
                return d[o];
            } catch (e) {
                g("Error rendering template: " + e.message);
            }
        }
    }
    function h(e) {
        var t = {};
        if (e.nodeType == 1) {
            if (e.attributes.length > 0) {
                t["@attributes"] = {};
                for (var r = 0; r < e.attributes.length; r++) {
                    var n = e.attributes.item(r);
                    t["@attributes"][n.nodeName] = n.nodeValue;
                }
            }
        } else if (e.nodeType == 3) {
            t = e.nodeValue;
        }
        if (e.hasChildNodes()) {
            for (var a = 0; a < e.childNodes.length; a++) {
                var i = e.childNodes.item(a);
                var o = i.nodeName;
                if (typeof t[o] == "undefined") {
                    t[o] = h(i);
                } else {
                    if (typeof t[o].push == "undefined") {
                        var f = t[o];
                        t[o] = [];
                        t[o].push(f);
                    }
                    t[o].push(h(i));
                }
            }
        }
        return t;
    }
    htmx.defineExtension("flowplater", {
        transformResponse: function(e, t, r) {
            var n = r.getAttribute("fp-template");
            if (t.getResponseHeader("Content-Type") === "text/xml") {
                var a = new DOMParser();
                var i = a.parseFromString(e, "text/xml");
                e = JSON.stringify(h(i));
            }
            if (n) {
                var o = JSON.parse(e);
                var f = l({
                    template: n,
                    data: o,
                    target: r,
                    returnHtml: true
                });
                return f;
            } else {
                var o = JSON.parse(e);
                var u = v("#" + r.id);
                if (!u) {
                    g("No template found. If the current element is a template, it must have an id.");
                    return null;
                }
            }
            return e;
        }
    });
    document.querySelectorAll("[fp-template]").forEach(function(e) {
        e.setAttribute("hx-ext", "flowplater");
    });
    function t(e) {
        if (typeof e === "string") {
            var t = e;
            if (t) {
                var r = d[t];
                if (r) {
                    a(r);
                } else {
                    g("Instance not found: " + t);
                }
            } else {
                for (var n in d) {
                    var r = d[n];
                    a(r);
                }
            }
        } else if (typeof e === "object") {
            var r = e;
            a(r);
        }
        if (t) {
            var r = d[t];
            if (r) {
                a(r);
            } else {
                g("Instance not found: " + t);
            }
        } else {
            for (var n in d) {
                var r = d[n];
                a(r);
            }
        }
        function a(t) {
            t.elements.forEach(function(e) {
                if (e.getAttribute("hx-get")) {
                    htmx.trigger(e, "get");
                } else {
                    e.innerHTML = t.template(t.proxy);
                }
            });
        }
    }
    function g(e) {
        console.error("%cFlowPlater:%c " + e, "font-weight: bold", "font-weight: normal");
    }
    var y = function(e) {
        return {
            refresh: function() {
                t(e);
            },
            render: function({
                template: e = this.template,
                data: t = this.data,
                target: r = this.elements,
                returnHtml: n = false,
                onRender: a = m.onRender,
                onRendered: i = m.onRendered,
                animate: o = m.animate
            }) {
                o(r, function() {
                    l({
                        template: e,
                        data: t,
                        target: r,
                        returnHtml: n,
                        onRender: a,
                        onRendered: i,
                        animate: o
                    });
                });
            }
        };
    };
    return {
        compileTemplate: v,
        render: l,
        refresh: t,
        getInstance: function(e) {
            return d[e];
        },
        getInstances: function() {
            return d;
        },
        options: function(e) {
            for (var t in e) {
                m[t] = e[t];
            }
        }
    };
}();