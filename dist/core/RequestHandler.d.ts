import { FlowPlaterElement } from "../types";
/**
 * @module RequestHandler
 * @description Manages HTMX request processing and lifecycle events for form processing elements
 */
export declare const RequestHandler: {
    /** @type {Map<HTMLElement, {requestId: string, timestamp: number, processed: boolean}>} */
    processingElements: Map<any, any>;
    /** @type {number} Counter for generating unique request IDs */
    currentRequestId: number;
    /**
     * Generates a unique request ID using timestamp and counter
     * @returns {string} Unique request identifier
     */
    generateRequestId(): string;
    /**
     * Handles different stages of request processing for a target element
     * @param {HTMLElement} target - The DOM element being processed
     * @param {string} requestId - Unique identifier for the request
     * @param {'start'|'process'|'cleanup'} action - The action to perform
     * @returns {boolean|void} Returns true if processing succeeded for 'process' action
     */
    handleRequest(target: FlowPlaterElement, requestId: string, action: "start" | "process" | "cleanup"): boolean | undefined;
    /**
     * Removes stale processing entries that are older than the timeout threshold
     */
    cleanupStale(): void;
    /**
     * Sets up all necessary event listeners for HTMX integration and request handling
     */
    setupEventListeners(): void;
};
