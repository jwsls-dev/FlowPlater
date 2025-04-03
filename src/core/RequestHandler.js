import { Debug } from "./Debug";
import { EventSystem } from "./EventSystem";
import PluginManager from "./PluginManager";
import { _state } from "./State";
import { InstanceManager } from "./InstanceManager";

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
  handleRequest(target, requestId, action) {
    if (!target || !target.hasAttribute("fp-template")) return;

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
          Debug.log(
            Debug.levels.DEBUG,
            "Added element to processing set",
            target,
            requestId,
          );
        }
        break;

      case "process":
        if (
          currentInfo &&
          currentInfo.requestId === requestId &&
          !currentInfo.processed
        ) {
          currentInfo.processed = true;
          this.processingElements.set(target, currentInfo);
          return true;
        }
        return false;

      case "cleanup":
        if (
          currentInfo &&
          currentInfo.requestId === requestId &&
          currentInfo.processed
        ) {
          this.processingElements.delete(target);
          Debug.log(
            Debug.levels.DEBUG,
            "Cleaned up after request",
            target,
            requestId,
          );
        } else {
          Debug.log(
            Debug.levels.DEBUG,
            "Skipping cleanup - request mismatch or not processed",
            { current: currentInfo?.requestId, received: requestId },
          );
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
        Debug.log(
          Debug.levels.DEBUG,
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
    document.body.addEventListener("htmx:configRequest", (event) => {
      // Apply plugin transformations to the request
      const target = event.detail.elt;
      const instance = InstanceManager.getOrCreateInstance(target);
      if (instance) {
        event = PluginManager.applyTransformations(
          instance,
          event,
          "transformRequest",
          "json",
        );
      }

      event.detail.headers["Content-Type"] =
        "application/x-www-form-urlencoded; charset=UTF-8";
    });

    // Add consolidated event listeners
    document.body.addEventListener("htmx:beforeRequest", (event) => {
      const target = event.detail.elt;
      const requestId = event.detail.requestId || this.generateRequestId();
      event.detail.requestId = requestId; // Ensure requestId is set
      this.handleRequest(target, requestId, "start");

      // Find instance that contains this element
      let instance = null;
      let instanceName = null;
      for (const [name, inst] of Object.entries(_state.instances)) {
        if (Array.from(inst.elements).some((el) => el.contains(target))) {
          instance = inst;
          instanceName = name;
          break;
        }
      }

      if (instance) {
        // Execute beforeRequest hook
        EventSystem.publish("request-start", {
          instanceName,
          ...event.detail,
        });
      }
    });

    document.body.addEventListener("htmx:beforeSwap", (event) => {
      const target = event.detail.elt;
      const requestId = event.detail.requestId;
      const info = this.processingElements.get(target);

      // Only prevent swap if request IDs don't match
      if (info && info.requestId !== requestId) {
        event.preventDefault();
        Debug.log(Debug.levels.DEBUG, "Prevented swap - request ID mismatch");
      }
    });

    // Cleanup handlers
    document.body.addEventListener("htmx:responseError", (event) => {
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
