import { _state } from "../core/State";
import { errorLog, log } from "../core/Debug";

export function saveToLocalStorage(instanceName, data) {
  if (_state.config?.storage?.enabled) {
    try {
      const ttl = _state.config.storage.ttl || 30 * 24 * 60 * 60; // default 30 days in seconds
      const storageData = {
        data,
        expiry: ttl === -1 ? -1 : Date.now() + ttl * 1000, // -1 for infinite TTL
      };

      localStorage.setItem(`fp_${instanceName}`, JSON.stringify(storageData));
    } catch (error) {
      errorLog(`Failed to save to localStorage: ${error.message}`);
    }
  }
}

export function loadFromLocalStorage(instanceName) {
  if (_state.config?.storage?.enabled) {
    try {
      const storedItem = localStorage.getItem(`fp_${instanceName}`);
      if (!storedItem) return null;

      const storageData = JSON.parse(storedItem);

      // Check if data has expired (skip check for infinite TTL)
      if (storageData.expiry !== -1 && Date.now() > storageData.expiry) {
        localStorage.removeItem(`fp_${instanceName}`);
        return null;
      }

      return storageData.data;
    } catch (error) {
      errorLog(`Failed to load from localStorage: ${error.message}`);
      return null;
    }
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
