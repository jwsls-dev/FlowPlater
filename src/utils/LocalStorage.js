import { _state } from "../core/State";
import { errorLog, log, Debug } from "../core/Debug";

export function saveToLocalStorage(instanceName, data, prefix = "") {
  Debug.log(Debug.levels.DEBUG, `Storage config:`, _state.config?.storage);
  if (_state.config?.storage?.enabled) {
    try {
      const ttl = _state.config.storage.ttl || 30 * 24 * 60 * 60; // default 30 days in seconds
      const storageData = {
        data,
        expiry: ttl === -1 ? -1 : Date.now() + ttl * 1000, // -1 for infinite TTL
      };

      const key = `fp_${prefix}${prefix ? "_" : ""}${instanceName}`;
      Debug.log(Debug.levels.DEBUG, `Saving to localStorage:`, {
        key,
        data: storageData,
      });
      localStorage.setItem(key, JSON.stringify(storageData));
    } catch (error) {
      errorLog(`Failed to save to localStorage: ${error.message}`);
    }
  } else {
    Debug.log(Debug.levels.DEBUG, `Storage is disabled, skipping save`);
  }
}

export function loadFromLocalStorage(instanceName, prefix = "") {
  Debug.log(Debug.levels.DEBUG, `Storage config:`, _state.config?.storage);
  if (_state.config?.storage?.enabled) {
    try {
      const key = `fp_${prefix}${prefix ? "_" : ""}${instanceName}`;
      const storedItem = localStorage.getItem(key);
      if (!storedItem) {
        Debug.log(Debug.levels.DEBUG, `No stored item found for: ${key}`);
        return null;
      }

      const storageData = JSON.parse(storedItem);

      // Check if data has expired (skip check for infinite TTL)
      if (storageData.expiry !== -1 && Date.now() > storageData.expiry) {
        Debug.log(Debug.levels.DEBUG, `Stored item has expired: ${key}`);
        localStorage.removeItem(key);
        return null;
      }

      Debug.log(Debug.levels.DEBUG, `Loaded from localStorage:`, {
        key,
        data: storageData,
      });
      return storageData.data;
    } catch (error) {
      errorLog(`Failed to load from localStorage: ${error.message}`);
      return null;
    }
  } else {
    Debug.log(Debug.levels.DEBUG, `Storage is disabled, skipping load`);
  }
  return null;
}

export function clearExpiredData() {
  try {
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("fp_")) {
        const storedItem = localStorage.getItem(key);
        try {
          const storageData = JSON.parse(storedItem);
          // Only remove if not infinite TTL and expired
          if (storageData.expiry !== -1 && now > storageData.expiry) {
            localStorage.removeItem(key);
          }
        } catch (e) {
          // Skip invalid items
          continue;
        }
      }
    }
  } catch (error) {
    errorLog(`Failed to clear expired data: ${error.message}`);
  }
}
