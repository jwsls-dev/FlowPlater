import { FlowPlaterConfig } from "../types";
export declare const ConfigManager: {
    /**
     * Sets or updates the FlowPlater configuration.
     * @param {Object} newConfig - Configuration options to apply.
     */
    setConfig(newConfig?: Partial<FlowPlaterConfig>): void;
    /**
     * Gets the current configuration.
     * @returns {Object} A deep copy of the current configuration.
     */
    getConfig(): any;
    /**
     * Gets the default configuration.
     * @returns {Object} A deep copy of the default configuration.
     */
    getDefaultConfig(): any;
};
