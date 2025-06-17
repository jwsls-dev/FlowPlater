export declare function memoize<T extends (...args: any[]) => any>(fn: T): T & {
    original: T;
    cache: Map<string, any>;
};
