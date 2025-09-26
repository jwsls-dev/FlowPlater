import { describe, it, expect, beforeEach, vi } from "vitest";
import path from "path";
import fs from "fs";
import { JSDOM } from "jsdom";
// We intentionally avoid importing source modules here to ensure we only test the dist bundle

const distPath = path.resolve(process.cwd(), "dist/flowplater.min.js");

declare global {
    interface Window {
        FlowPlater?: any;
        htmx?: any;
        Handlebars?: any;
    }
}

function createDomWithPatchedXPath() {
    const dom = new JSDOM("<!doctype html><html><head></head><body></body></html>", {
        runScripts: "dangerously",
        resources: "usable",
        url: "https://example.com/",
        beforeParse(win) {
            const ANY_TYPE = 0;
            (win as any).XPathResult = {
                ANY_TYPE,
                NUMBER_TYPE: 1,
                STRING_TYPE: 2,
                BOOLEAN_TYPE: 3,
                UNORDERED_NODE_ITERATOR_TYPE: 4,
                ORDERED_NODE_ITERATOR_TYPE: 5,
                UNORDERED_NODE_SNAPSHOT_TYPE: 6,
                ORDERED_NODE_SNAPSHOT_TYPE: 7,
                ANY_UNORDERED_NODE_TYPE: 8,
                FIRST_ORDERED_NODE_TYPE: 9,
            };
            const proto = (win as any).Document?.prototype;
            if (proto) {
                const original = proto.evaluate;
                Object.defineProperty(proto, "evaluate", {
                    configurable: true,
                    writable: true,
                    value: function(expression: string, contextNode?: Node | null, resolver?: any, type?: number, result?: any) {
                        const safeType = typeof type === "number" ? type : (win as any).XPathResult.ANY_TYPE;
                        return original.call(this, expression, contextNode ?? (this as any), resolver ?? null, safeType, result ?? null);
                    },
                });
            }
        },
    });
    return dom;
}

describe("dist bundle", () => {
    it("exposes FlowPlater, htmx and Handlebars on window", async () => {
        const dom = createDomWithPatchedXPath();
        const code = fs.readFileSync(distPath, "utf-8");
        dom.window.eval(code);
        expect(dom.window.FlowPlater).toBeTruthy();
        expect(typeof dom.window.FlowPlater?.VERSION).toBe("string");
        expect(dom.window.htmx).toBeTruthy();
        expect(dom.window.Handlebars).toBeTruthy();
    });

    it("can find attribute via FlowPlater API", async () => {
        const dom = createDomWithPatchedXPath();
        const code = fs.readFileSync(distPath, "utf-8");
        dom.window.eval(code);
        const el = dom.window.document.createElement("div");
        el.setAttribute("data-fp-target", "this");
        const value = dom.window.FlowPlater?.findAttribute(el, "target");
        expect(value).toBe("this");
    });
});


