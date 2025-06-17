import { compileTemplate, memoizedCompile } from "./TemplateCompiler";
import { FlowPlaterElement } from "../types";
export { compileTemplate, memoizedCompile };
export declare function render({ template, data, target, returnHtml, instanceName, animate, recompile, skipLocalStorageLoad, skipRender, isStoredDataRender, }: {
    template: string;
    data: any;
    target: FlowPlaterElement | string;
    returnHtml?: boolean;
    instanceName?: string;
    animate?: boolean;
    recompile?: boolean;
    skipLocalStorageLoad?: boolean;
    skipRender?: boolean;
    isStoredDataRender?: boolean;
}): any;
