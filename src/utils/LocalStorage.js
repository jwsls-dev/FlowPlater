import { _state } from "../core/State";
import { Debug } from "../core/Debug";

export function saveToLocalStorage(key, data, prefix = "") {
  Debug.debug(`Storage config:`, _state.config?.storage);
  if (!_state.config?.storage?.enabled) {
    Debug.debug(`Storage is disabled, skipping save`);
    return false;
  }

  try {
    const storageKey = prefix ? `fp_${prefix}_${key}` : `fp_${key}`;

    // Always serialize/deserialize to ensure we have raw, deep-cloned data (removes Proxies)
    let rawData;
    try {
      // This effectively deep clones the target data, removing any proxy wrappers
      rawData = JSON.parse(JSON.stringify(data));
    } catch (e) {
      Debug.error(`Failed to serialize data for localStorage: ${e.message}`);
      // Fallback or decide how to handle non-serializable data
      rawData = {}; // Save empty object as fallback?
    }

    const storageData = {
      data: rawData,
      expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    };

    Debug.debug(`Saving to localStorage:`, {
      key: storageKey,
      data: storageData,
    });

    localStorage.setItem(storageKey, JSON.stringify(storageData));
    return true;
  } catch (error) {
    Debug.error(`Failed to save to localStorage: ${error.message}`);
    return false;
  }
}

export function loadFromLocalStorage(key, prefix = "") {
  Debug.debug(`Storage config:`, _state.config?.storage);
  if (!_state.config?.storage?.enabled) {
    Debug.debug(`Storage is disabled, skipping load`);
    return null;
  }

  try {
    const storageKey = prefix ? `fp_${prefix}_${key}` : `fp_${key}`;
    const storedItem = localStorage.getItem(storageKey);
    if (!storedItem) {
      Debug.debug(`No stored item found for: ${storageKey}`);
      return null;
    }

    const storageData = JSON.parse(storedItem);

    // Check if data has expired
    if (storageData.expiry && storageData.expiry < Date.now()) {
      Debug.debug(`Stored item has expired: ${storageKey}`);
      localStorage.removeItem(storageKey);
      return null;
    }

    Debug.debug(`Loaded from localStorage:`, {
      key: storageKey,
      data: storageData,
    });

    // Return just the data portion, not the wrapper object
    return storageData.data;
  } catch (error) {
    Debug.error(`Failed to load from localStorage: ${error.message}`);
    return null;
  }
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
    Debug.error(`Failed to clear expired data: ${error.message}`);
  }
}
