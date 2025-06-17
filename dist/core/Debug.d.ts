export declare const Debug: {
    level: number;
    levels: {
        ERROR: number;
        WARN: number;
        INFO: number;
        DEBUG: number;
    };
    log: (level: number, ...args: any[]) => void;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    info: (...args: any[]) => void;
    debug: (...args: any[]) => void;
};
export declare class FlowPlaterError extends Error {
    constructor(message: string, stack?: string);
}
export declare class TemplateError extends FlowPlaterError {
    constructor(message: string, stack?: string);
}
export declare class RenderError extends FlowPlaterError {
    constructor(message: string, stack: string | undefined);
}
