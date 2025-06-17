import { _state } from "../core/State";
import { Debug } from "../core/Debug";
import { ConfigManager } from "../core/ConfigManager";

// Helper function to handle Map serialization
// @ts-ignore
function replacer(key: string, value: any): any {
  if (value instanceof Map) {
    return {
      _dataType: "Map",
      value: Array.from(value.entries()), // Convert Map to array of [key, value] pairs
    };
  } else {
    return value;
  }
}

// Helper function to handle Map deserialization
// @ts-ignore
function reviver(key: string, value: any): any {
  if (
    typeof value === "object" &&
    value !== null &&
    value._dataType === "Map"
  ) {
    return new Map(value.value);
  }
  return value;
}

/**
 * Saves data to localStorage with expiry
 * @param {string} key - The key to save under
 * @param {*} data - The data to save
 * @param {string} type - Type prefix (e.g., 'instance', 'group')
 * @returns {boolean} True if save was successful, false otherwise
 */
export function saveToLocalStorage(key: string, data: any, type = ""): boolean {
  const config = ConfigManager.getConfig().storage;
  if (!config?.enabled) {
    Debug.debug(
      `[LocalStorage] Storage is disabled, skipping save for key: ${key}`,
    );
    return false;
  }

  try {
    const storageKey = type ? `fp_${type}_${key}` : `fp_${key}`;
    let dataToStore;
    try {
      // Use the replacer here
      dataToStore = JSON.stringify(data, replacer);
    } catch (e: any) {
      Debug.error(
        `[LocalStorage] Failed to serialize data for key ${storageKey}: ${e.message}`,
      );
      return false; // Don't save corrupted data
    }

    const item = {
      data: dataToStore, // Store the stringified data
      expiry: config.ttl === -1 ? null : Date.now() + config.ttl * 1000,
    };

    Debug.debug(`[LocalStorage] Saving to localStorage:`, {
      key: storageKey,
      item,
    });
    localStorage.setItem(storageKey, JSON.stringify(item)); // Store the wrapper object
    return true;
  } catch (e: any) {
    Debug.error(
      `[LocalStorage] Failed to save to localStorage for key ${key}: ${e.message}`,
    );
    return false;
  }
}

/**
 * Loads data from localStorage, checks expiry
 * @param {string} key - The key to load
 * @param {string} type - Type prefix (e.g., 'instance', 'group')
 * @returns {*} The loaded data or null if not found or expired
 */
export function loadFromLocalStorage(key: string, type = ""): any | null {
  try {
    const storageKey = type ? `fp_${type}_${key}` : `fp_${key}`;
    const storedItem = localStorage.getItem(storageKey);

    if (!storedItem) {
      Debug.debug(`[LocalStorage] No stored item found for key: ${storageKey}`);
      return null;
    }

    const item = JSON.parse(storedItem);

    // Check expiry
    if (item.expiry && item.expiry < Date.now()) {
      Debug.debug(
        `[LocalStorage] Stored item has expired for key: ${storageKey}`,
      );
      localStorage.removeItem(storageKey);
      return null;
    }

    // Use the reviver here when parsing the stored data string
    const loadedData = JSON.parse(item.data, reviver);

    Debug.debug(`[LocalStorage] Loaded from localStorage:`, {
      key: storageKey,
      data: loadedData,
    });
    return loadedData;
  } catch (e: any) {
    Debug.error(
      `[LocalStorage] Failed to load or parse from localStorage for key ${key}: ${e.message}`,
    );
    return null;
  }
}

export function clearExpiredData() {
  try {
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("fp_")) {
        const storedItem = localStorage.getItem(key);
        try {
          const storageData = JSON.parse(storedItem as string);
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
  } catch (error: any) {
    Debug.error(`Failed to clear expired data: ${error.message}`);
  }
}
