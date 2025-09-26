// Provide Handlebars on the global object for helpers that expect window.Handlebars
import * as Handlebars from "handlebars";

(globalThis as any).Handlebars = Handlebars;


