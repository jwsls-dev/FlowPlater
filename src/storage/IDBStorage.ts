import { Debug } from "../core/Debug";
import { ConfigService } from "../core/ConfigService";
import { openDB } from "idb";

// Helper function to handle Map serialization
// @ts-ignore
function replacer(key: string, value: any): any {
  if (value instanceof Map) {
    return {
      _dataType: "Map",
      value: Array.from(value.entries()),
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

type StoredItem = {
  data: string;
  expiry: number | null;
};

const DB_NAME = "flowplater";
const DB_VERSION = 1;
const STORE_NAME = "storage";

// Lazily initialized DB connection
let dbPromise: Promise<any> | null = null;

async function getDb(): Promise<any> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db: any) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }
  return dbPromise;
}

function buildKey(key: string, type = ""): string {
  return type ? `fp_${type}_${key}` : `fp_${key}`;
}

// Background helpers to mirror to/from IndexedDB without blocking callers
async function mirrorSaveToIdb(storageKey: string, item: StoredItem) {
  try {
    const db = await getDb();
    const tx = db.transaction(STORE_NAME, "readwrite");
    await tx.store.put(item, storageKey);
    await tx.done;
  } catch (e: any) {
    Debug.error(`[IDBStorage] Mirror save failed for ${storageKey}: ${e?.message || e}`);
  }
}

async function hydrateLocalFromIdb(storageKey: string) {
  try {
    const db = await getDb();
    const tx = db.transaction(STORE_NAME, "readonly");
    const item = (await tx.store.get(storageKey)) as StoredItem | undefined;
    await tx.done;
    if (!item) return;
    if (item.expiry && item.expiry < Date.now()) return; // don't hydrate expired
    localStorage.setItem(storageKey, JSON.stringify(item));
  } catch (e: any) {
    Debug.error(`[IDBStorage] Hydration from IDB failed for ${storageKey}: ${e?.message || e}`);
  }
}

/**
 * Saves data with expiry (synchronous API). Writes to localStorage immediately
 * and mirrors to IndexedDB asynchronously.
 */
export function saveToLocalStorage(
  key: string,
  data: any,
  type = "",
): boolean {
  const enabled = ConfigService.isStorageEnabled();
  if (!enabled) {
    Debug.debug(
      `[IDBStorage] Storage is disabled, skipping save for key: ${key}`,
    );
    return false;
  }

  try {
    const storageKey = buildKey(key, type);
    let dataToStore: string;
    try {
      dataToStore = JSON.stringify(data, replacer);
    } catch (e: any) {
      Debug.error(
        `[IDBStorage] Failed to serialize data for key ${storageKey}: ${e.message}`,
      );
      return false;
    }

    const ttl = ConfigService.getStorageTtl();
    const item: StoredItem = {
      data: dataToStore,
      expiry: ttl === -1 ? null : Date.now() + ttl * 1000,
    };

    Debug.debug(`[IDBStorage] Saving to IndexedDB:`, {
      key: storageKey,
      item,
    });

    // Write-through to localStorage synchronously for immediate availability
    localStorage.setItem(storageKey, JSON.stringify(item));
    // Mirror to IndexedDB asynchronously
    mirrorSaveToIdb(storageKey, item);
    return true;
  } catch (e: any) {
    Debug.error(
      `[IDBStorage] Failed to save to IndexedDB for key ${key}: ${e.message}`,
    );
    return false;
  }
}

/**
 * Loads data synchronously from localStorage. If missing, hydrates from
 * IndexedDB asynchronously for next access.
 */
export function loadFromLocalStorage(
  key: string,
  type = "",
): any | null {
  try {
    const storageKey = buildKey(key, type);
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      // Attempt background hydration for subsequent calls
      hydrateLocalFromIdb(storageKey);
      Debug.debug(`[IDBStorage] No stored item in local cache for key: ${storageKey}`);
      return null;
    }

    const item = JSON.parse(raw) as StoredItem;

    if (item.expiry && item.expiry < Date.now()) {
      Debug.debug(`[IDBStorage] Cached item has expired for key: ${storageKey}`);
      localStorage.removeItem(storageKey);
      // Also clean up IDB asynchronously
      (async () => {
        try {
          const db = await getDb();
          const rwTx = db.transaction(STORE_NAME, "readwrite");
          await rwTx.store.delete(storageKey);
          await rwTx.done;
        } catch {}
      })();
      return null;
    }

    const loadedData = JSON.parse(item.data, reviver);
    Debug.debug(`[IDBStorage] Loaded from cache:`, { key: storageKey, data: loadedData });
    return loadedData;
  } catch (e: any) {
    Debug.error(
      `[IDBStorage] Failed to load or parse from IndexedDB for key ${key}: ${e.message}`,
    );
    return null;
  }
}

/**
 * Clears expired data in the local cache and attempts to clean IDB entries too.
 */
export function clearExpiredData(): void {
  try {
    const now = Date.now();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("fp_")) {
        const raw = localStorage.getItem(key);
        try {
          const item = JSON.parse(raw as string) as StoredItem;
          if (item.expiry !== null && item.expiry < now) {
            localStorage.removeItem(key);
            // Clean IDB asynchronously
            (async () => {
              try {
                const db = await getDb();
                const tx = db.transaction(STORE_NAME, "readwrite");
                await tx.store.delete(key);
                await tx.done;
              } catch {}
            })();
          }
        } catch {}
      }
    }
  } catch (error: any) {
    Debug.error(`[IDBStorage] Failed to clear expired data: ${error.message}`);
  }
}

/**
 * Removes a specific stored item (mirrors LocalStorage API removeItem)
 */
export function removeFromLocalStorage(key: string, type = ""): boolean {
  try {
    const storageKey = buildKey(key, type);
    localStorage.removeItem(storageKey);
    // Best-effort async cleanup from IDB as well
    (async () => {
      try {
        const db = await getDb();
        const tx = db.transaction(STORE_NAME, "readwrite");
        await tx.store.delete(storageKey);
        await tx.done;
      } catch {}
    })();
    return true;
  } catch (error: any) {
    Debug.error(`[IDBStorage] Failed to remove key ${key}: ${error.message}`);
    return false;
  }
}


