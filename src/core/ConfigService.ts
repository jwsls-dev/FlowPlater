import { ConfigManager } from "./ConfigManager";
import { DEFAULTS } from "./DefaultConfig";
import { FlowPlaterConfig } from "../types";

/**
 * Centralized ConfigService providing typed, stable access to configuration values.
 * Use these getters instead of accessing ConfigManager.getConfig() directly.
 */
export class ConfigService {
  // Raw access when absolutely necessary (prefer specific getters below)
  static getConfig(): FlowPlaterConfig {
    try {
      const fp = (globalThis as any)?.FlowPlater;
      if (fp && typeof fp.getConfig === "function") {
        return fp.getConfig();
      }
    } catch {}
    return ConfigManager.getConfig();
  }

  // Storage
  static isStorageEnabled(): boolean {
    const enabled = ConfigManager.getConfig().storage?.enabled;
    return enabled ?? DEFAULTS.STORAGE.ENABLED;
  }

  static getStorageTtl(): number {
    const ttl = ConfigManager.getConfig().storage?.ttl;
    return ttl ?? DEFAULTS.STORAGE.TTL;
  }

  // Performance / DOM batching
  static isDomBatchingEnabled(): boolean {
    const enabled = ConfigManager.getConfig().performance?.batchDomUpdates;
    return enabled ?? DEFAULTS.PERFORMANCE.BATCH_DOM_UPDATES;
  }

  static getBatchingDelay(): number {
    const delay = ConfigManager.getConfig().performance?.batchingDelay;
    return delay ?? DEFAULTS.PERFORMANCE.BATCHING_DELAY;
  }

  // DOM / Virtual DOM
  static getDomMaxPatchesThreshold(): number {
    const threshold = ConfigManager.getConfig().dom?.maxPatchesThreshold;
    return threshold ?? DEFAULTS.DOM.MAX_PATCHES_THRESHOLD;
  }

  // Templates
  static getTemplateCacheSize(): number {
    const cacheSize = ConfigManager.getConfig().templates?.cacheSize;
    return cacheSize ?? DEFAULTS.TEMPLATE.CACHE_SIZE;
  }

  // Forms
  static shouldPersistForms(): boolean {
    const persist = ConfigManager.getConfig().persistForm;
    return persist ?? DEFAULTS.FORMS.PERSIST_FORMS;
  }

  // Security
  static isExecuteAllowed(): boolean {
    const allowed = ConfigManager.getConfig().allowExecute;
    return allowed ?? DEFAULTS.SECURITY.ALLOW_EXECUTE;
  }
}


