import { FlowPlaterConfig, FlowPlaterGroup, FlowPlaterInstance } from "../types";
export declare const _state: {
    templateCache: Record<string, any>;
    instances: Record<string, FlowPlaterInstance>;
    groups: Record<string, FlowPlaterGroup>;
    length: number;
    initialized: boolean;
    defaults: {
        animation: boolean;
        debug: boolean;
    };
    config: FlowPlaterConfig;
    _initTracking: Record<string, number>;
};
export declare function getInstance(instanceName: string): FlowPlaterInstance | undefined;
export declare function getInstances(): Record<string, FlowPlaterInstance>;
export declare function incrementLength(): number;
export declare function getGroup(groupName: string): FlowPlaterGroup | undefined;
export declare function getGroups(): Record<string, FlowPlaterGroup>;
