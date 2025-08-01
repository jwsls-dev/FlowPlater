import { FlowPlaterPlugin, FlowPlaterInstance } from "../types";
export declare const PluginManager: {
    plugins: Map<any, any>;
    globalMethods: Map<any, any>;
    instanceMethods: Map<any, any>;
    customTransformers: Map<any, any>;
    registerPlugin(plugin: FlowPlaterPlugin | string | Function, config?: {}): any;
    updateExistingInstances(): void;
    getPlugin(name: string): FlowPlaterPlugin | undefined;
    getAllPlugins(): FlowPlaterPlugin[];
    getEnabledPlugins(): FlowPlaterPlugin[];
    removePlugin(name: string): boolean;
    disablePlugin(name: string): boolean;
    enablePlugin(name: string): boolean;
    pluginConfig(name: string): import("../types").FlowPlaterPluginConfig | null;
    getSortedPlugins(): FlowPlaterPlugin[];
    _determineDataType(data: any): "json" | "html";
    applyTransformations(instance: FlowPlaterInstance, data: any, transformationType: string, dataType?: string): any;
    addTransformer(transformationType: string, transformerFn: Function): /*elided*/ any;
    removeTransformer(transformationType: string, transformerFn: Function): boolean;
    clearTransformers(transformationType: string): /*elided*/ any;
    executeHook(hookName: string, ...args: any[]): any;
    executeGlobalMethod(methodName: string, ...args: any[]): any;
    executeInstanceMethod(methodName: string, instance: FlowPlaterInstance, ...args: any[]): any;
    destroyPlugin(name: string): Promise<boolean>;
    destroyAll(): Promise<void>;
};
