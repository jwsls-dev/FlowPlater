export declare function registerExecutableFunction(name: string, fn: Function): void;
export declare function unregisterExecutableFunction(name: string): boolean;
export declare function clearExecutableFunctions(): void;
export declare function getRegisteredFunctions(): string[];
export declare function executeHelper(): void;
