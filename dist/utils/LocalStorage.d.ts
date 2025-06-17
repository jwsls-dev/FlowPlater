/**
 * Saves data to localStorage with expiry
 * @param {string} key - The key to save under
 * @param {*} data - The data to save
 * @param {string} type - Type prefix (e.g., 'instance', 'group')
 * @returns {boolean} True if save was successful, false otherwise
 */
export declare function saveToLocalStorage(key: string, data: any, type?: string): boolean;
/**
 * Loads data from localStorage, checks expiry
 * @param {string} key - The key to load
 * @param {string} type - Type prefix (e.g., 'instance', 'group')
 * @returns {*} The loaded data or null if not found or expired
 */
export declare function loadFromLocalStorage(key: string, type?: string): any | null;
export declare function clearExpiredData(): void;
