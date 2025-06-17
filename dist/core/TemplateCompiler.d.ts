export declare function compileTemplate(templateId: string, recompile?: boolean): any;
export declare const memoizedCompile: ((templateId: any) => any) & {
    original: (templateId: any) => any;
    cache: Map<string, any>;
};
