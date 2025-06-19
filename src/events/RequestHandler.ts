import { Debug } from "../core/Debug";
import { EventSystem } from "./EventSystem";
import { _state } from "../core/State";
import { AttributeMatcher } from "../dom";
import { FlowPlaterElement } from "../types";

/**
 * @module RequestHandler
 * @description Manages HTMX request processing and lifecycle events for form processing elements
 */
export const RequestHandler = {
  /** @type {Map<HTMLElement, {requestId: string, timestamp: number, processed: boolean}>} */
  processingElements: new Map(),
  /** @type {number} Counter for generating unique request IDs */
  currentRequestId: 0,

  /**
   * Generates a unique request ID using timestamp and counter
   * @returns {string} Unique request identifier
   */
  generateRequestId() {
    return `fp-${Date.now()}-${this.currentRequestId++}`;
  },

  /**
   * Handles different stages of request processing for a target element
   * @param {HTMLElement} target - The DOM element being processed
   * @param {string} requestId - Unique identifier for the request
   * @param {'start'|'process'|'cleanup'} action - The action to perform
   * @returns {boolean|void} Returns true if processing succeeded for 'process' action
   */
  handleRequest(target: FlowPlaterElement, requestId: string, action: "start" | "process" | "cleanup") {
    if (!target || !AttributeMatcher._hasAttribute(target, "template")) return;

    const currentInfo = this.processingElements.get(target);
    requestId = requestId || this.generateRequestId();

    switch (action) {
      case "start":
        if (!currentInfo || currentInfo.requestId !== requestId) {
          this.processingElements.set(target, {
            requestId: requestId,
            timestamp: Date.now(),
            processed: false,
          });
          Debug.debug("Added element to processing set", target, requestId);
        }
        break;

      case "process":
        // Mark as processed during HTMX transformResponse
        if (currentInfo && currentInfo.requestId === requestId) {
          currentInfo.processed = true;
          this.processingElements.set(target, currentInfo);
          Debug.debug(
            `Marked request ${requestId} as processed for ${
              target.id || "unknown"
            }`,
          );
          return true;
        }
        return false;

      case "cleanup":
        // Always clean up if we have the same requestId, regardless of processed state
        // This ensures cleanup happens even if group updates are still in progress
        if (currentInfo && currentInfo.requestId === requestId) {
          this.processingElements.delete(target);
          Debug.debug("Cleaned up after request", target, requestId);
        } else {
          Debug.debug("Skipping cleanup - request mismatch", {
            current: currentInfo?.requestId,
            received: requestId,
          });
        }
        break;
    }
  },

  /**
   * Removes stale processing entries that are older than the timeout threshold
   */
  cleanupStale() {
    const now = Date.now();
    const staleTimeout = 10000; // 10 seconds

    for (const [target, info] of this.processingElements.entries()) {
      if (now - info.timestamp > staleTimeout) {
        this.processingElements.delete(target);
        Debug.debug(
          "Cleaned up stale processing entry",
          target,
          info.requestId,
        );
      }
    }
  },

  /**
   * Sets up all necessary event listeners for HTMX integration and request handling
   */
  setupEventListeners() {
    // Add consolidated event listeners
    document.body.addEventListener("htmx:beforeRequest", (event: any) => {
      const target = event.detail.elt;
      const requestId = event.detail.requestId || this.generateRequestId();
      event.detail.requestId = requestId; // Ensure requestId is set
      this.handleRequest(target, requestId, "start");

      // Find instance that contains this element
      let instance = null;
      let instanceName = null;
      for (const [name, inst] of Object.entries(_state.instances) as [string, { elements: FlowPlaterElement[] }][]) {
        if (Array.from(inst.elements as FlowPlaterElement[]).some((el) => el.contains(target))) {
          instance = inst;
          instanceName = name;
          break;
        }
      }

      if (instance) {
        // Execute beforeRequest hook
        EventSystem.publish("requestStart", {
          instanceName,
          ...event.detail,
        });
      }
    });

    document.body.addEventListener("htmx:beforeSwap", (event: any) => {
      const target = event.detail.elt;
      const requestId = event.detail.requestId;
      const info = this.processingElements.get(target);

      // Only prevent swap if request IDs don't match
      if (info && info.requestId !== requestId) {
        event.preventDefault();
        Debug.debug("Prevented swap - request ID mismatch");
      }
    });

    // Cleanup handlers
    document.body.addEventListener("htmx:responseError", (event: any) => {
      // Only cleanup on actual errors, not on successful responses
      if (event.detail.failed) {
        this.handleRequest(event.detail.elt, event.detail.requestId, "cleanup");
      }
    });

    // Set up stale cleanup interval
    setInterval(() => this.cleanupStale(), 10000);

    // Clear all on unload
    window.addEventListener("unload", () => {
      this.processingElements.clear();
    });
  },
};
