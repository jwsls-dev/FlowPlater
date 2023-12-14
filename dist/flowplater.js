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
        animation: false,
        debug: true
    };
    document.querySelectorAll("[fp-template]").forEach(function(e) {
        var t = e.getAttribute("fp-animation") || m.animation;
        if (t === "true") {
            var n = e.getAttribute("hx-swap");
            if (!n) {
                e.setAttribute("hx-swap", "innerHTML transition:true");
            } else {
                e.setAttribute("hx-swap", n + " transition:true");
            }
        }
    });
    function e(e, t) {
        var n = e.getAttribute("fp-animation") || m.animation;
        if (!n) {
            t();
            return;
        } else {
            var r = document.startViewTransition(e);
            t();
        }
    }
    function p(e, t) {
        var n = new CustomEvent("flowplater:" + e, {
            detail: t
        });
        document.dispatchEvent(n);
    }
    function v(e) {
        if (m.debug) {
            console.log("Flowplater: " + e);
        }
    }
    document.addEventListener("htmx:beforeRequest", function(e) {
        var t = e.detail.elt;
        if (t.hasAttribute("fp-instance")) {
            var n = t.getAttribute("fp-instance");
            p("request-start", {
                instanceName: n,
                ...e.detail
            });
        }
    });
    document.addEventListener("htmx:afterRequest", function(e) {
        var t = e.detail.elt;
        if (t.hasAttribute("fp-instance")) {
            var n = t.getAttribute("fp-instance");
            p("request-end", {
                instanceName: n,
                ...e.detail
            });
        }
    });
    function h(e) {
        if (!s[e]) {
            var t = document.querySelector(e);
            if (!t) {
                b("Template not found: " + e);
                return null;
            }
            var l = t.innerHTML;
            var n = new DOMParser();
            var r = n.parseFromString(l, "text/html");
            var a = r.querySelectorAll("[fp]");
            a.forEach(function(e) {
                var t = e.tagName.toLowerCase();
                if (e.outerHTML.indexOf("/>") !== -1) {
                    b("Self-closing tag not supported: " + e.outerHTML);
                    return;
                }
                var n = e.getAttribute("fp");
                var r = document.createElement("textarea");
                r.innerHTML = n;
                var a = r.value;
                var i = new RegExp("<" + t + '(.*?) fp="(.*?)"', "g");
                var o = "{{#" + t + " " + a + "}}";
                l = l.replace(i, o);
                l = l.replace(new RegExp("</" + t + ">", "g"), "{{/" + t + "}}");
                v("Template compiled: " + l);
            });
            try {
                s[e] = Handlebars.compile(l);
                return s[e];
            } catch (e) {
                b("Template not valid: " + l + " | Error: " + e.message);
                return null;
            }
        }
        return s[e];
    }
    function u({
        template: r,
        data: e,
        target: t,
        returnHtml: n,
        onRender: a = m.onRender,
        onRendered: i = m.onRendered,
        instanceName: o = c
    }) {
        l.forEach(function(e) {
            a.call(e);
        });
        p("render", {
            instanceName: o,
            template: r,
            data: e,
            target: t,
            returnHtml: n
        });
        v("Rendering instance: " + o, r, e, t);
        var l;
        var o;
        if (typeof t === "string") {
            l = document.querySelectorAll(t);
        } else if (typeof t === "object" && t.jquery) {
            l = t.toArray();
        } else if (typeof t === "object") {
            l = t;
        } else {
            b("Invalid target type: " + typeof t);
            return;
        }
        if (l.length === undefined) {
            l = [ l ];
        }
        if (o !== c) {
            o = o;
        } else if (l[0].hasAttribute("fp-instance")) {
            o = l[0].getAttribute("fp-instance");
        } else if (l[0].id) {
            o = l[0].id;
        }
        if (!s[r]) {
            h(r);
            c++;
        }
        var r = s[r];
        if (!r) {
            b("Template not found: " + r);
            return;
        }
        if (l.length === 0) {
            b("Target not found: " + t);
            return;
        }
        if (!d[o] || d[o].data !== e) {
            var f = new Proxy(e, {
                set: function(t, e, n) {
                    t[e] = n;
                    l.forEach(function(e) {
                        e.innerHTML = r(t);
                    });
                    return true;
                }
            });
            d[o] = {
                elements: l,
                template: r,
                proxy: f,
                data: e,
                ...x(o)
            };
        }
        v("Proxy created: " + d[o].proxy);
        if (n) {
            try {
                var u = r(d[o].proxy);
                l.forEach(function(e) {
                    i.call(e);
                });
                p("rendered", {
                    instance: o,
                    template: r,
                    data: e,
                    target: t,
                    elements: l,
                    returnHtml: n,
                    html: u
                });
                v("Rendered HTML: " + u);
                return u;
            } catch (e) {
                b("Error rendering template: " + e.message);
            }
        } else {
            try {
                l.forEach(function(e) {
                    e.innerHTML = r(d[o].proxy);
                    i.call(e);
                });
                p("rendered", {
                    instance: o,
                    template: r,
                    data: e,
                    target: t,
                    elements: l,
                    returnHtml: n
                });
                v("Rendered instance: " + o, r, e, t);
                return d[o];
            } catch (e) {
                b("Error rendering template: " + e.message);
            }
        }
    }
    function g(e) {
        var t = {};
        if (e.nodeType == 1) {
            if (e.attributes.length > 0) {
                t["@attributes"] = {};
                for (var n = 0; n < e.attributes.length; n++) {
                    var r = e.attributes.item(n);
                    t["@attributes"][r.nodeName] = r.nodeValue;
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
                    t[o] = g(i);
                } else {
                    if (typeof t[o].push == "undefined") {
                        var l = t[o];
                        t[o] = [];
                        t[o].push(l);
                    }
                    t[o].push(g(i));
                }
            }
        }
        return t;
    }
    htmx.defineExtension("flowplater", {
        transformResponse: function(e, t, n) {
            var r = n.getAttribute("fp-template");
            v("Response received: " + e, t, n, r);
            if (t.getResponseHeader("Content-Type") === "text/xml") {
                var a = new DOMParser();
                var i = a.parseFromString(e, "text/xml");
                e = JSON.stringify(g(i));
            }
            if (r) {
                v("Rendering html to " + r + " based on htmx response");
                var o = JSON.parse(e);
                var l = u({
                    template: r,
                    data: o,
                    target: n,
                    returnHtml: true
                });
                return l;
            } else {
                v("Rendering html to current element based on htmx response");
                var o = JSON.parse(e);
                var f = h("#" + n.id);
                if (!f) {
                    b("No template found. If the current element is a template, it must have an id.");
                    return null;
                }
            }
            return e;
        }
    });
    document.querySelectorAll("[fp-template]").forEach(function(e) {
        e.setAttribute("hx-ext", "flowplater");
        v("Added hx-ext attribute to " + e.id);
    });
    function t(e) {
        if (typeof e === "string") {
            var t = e;
            if (t) {
                var n = d[t];
                if (n) {
                    a(n);
                } else {
                    b("Instance not found: " + t);
                }
            } else {
                for (var r in d) {
                    var n = d[r];
                    a(n);
                }
            }
        } else if (typeof e === "object") {
            var n = e;
            a(n);
        }
        if (t) {
            var n = d[t];
            if (n) {
                a(n);
            } else {
                b("Instance not found: " + t);
            }
        } else {
            for (var r in d) {
                var n = d[r];
                a(n);
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
    function b(e) {
        console.error("%cFlowPlater:%c " + e, "font-weight: bold", "font-weight: normal");
    }
    var x = function(e) {
        return {
            refresh: function() {
                t(e);
            },
            render: function({
                template: e = this.template,
                data: t = this.data,
                target: n = this.elements,
                returnHtml: r = false,
                onRender: a = m.onRender,
                onRendered: i = m.onRendered,
                animate: o = m.animate
            }) {
                o(n, function() {
                    u({
                        template: e,
                        data: t,
                        target: n,
                        returnHtml: r,
                        onRender: a,
                        onRendered: i,
                        animate: o
                    });
                });
            }
        };
    };
    return {
        compileTemplate: h,
        render: u,
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