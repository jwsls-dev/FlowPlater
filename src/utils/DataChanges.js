/**
 * Helper function to track changes between old and new data states.
 * Supports nested objects and arrays.
 * @param {Object} oldData - The original data state.
 * @param {Object} newData - The new data state.
 * @param {string} [path=''] - Optional base path for nested changes (e.g., "myObject.myArray")
 * @returns {{added: Object, removed: Object}} Object containing added and removed changes.
 */
export function trackChanges(oldData, newData, path = "") {
  const changes = {
    added: {},
    removed: {},
  };

  function findArrayChanges(oldArray, newArray, arrayPath) {
    // Handle new or removed items
    const maxLength = Math.max(oldArray?.length || 0, newArray?.length || 0);

    for (let i = 0; i < maxLength; i++) {
      const oldItem = oldArray?.[i];
      const newItem = newArray?.[i];

      if (i >= (oldArray?.length || 0)) {
        // New item added
        changes.added[`${arrayPath}[${i}]`] = newItem;
      } else if (i >= (newArray?.length || 0)) {
        // Item removed
        changes.removed[`${arrayPath}[${i}]`] = oldItem;
      } else if (typeof newItem === "object" && newItem !== null) {
        // For objects in arrays, compare individual properties
        if (typeof oldItem === "object" && oldItem !== null) {
          // Compare each property
          for (const key in newItem) {
            if (oldItem[key] !== newItem[key]) {
              changes.added[`${arrayPath}[${i}].${key}`] = newItem[key];
              if (key in oldItem) {
                changes.removed[`${arrayPath}[${i}].${key}`] = oldItem[key];
              }
            }
          }
          // Check for removed properties
          for (const key in oldItem) {
            if (!(key in newItem)) {
              changes.removed[`${arrayPath}[${i}].${key}`] = oldItem[key];
            }
          }
        } else {
          // Old item wasn't an object, track entire new object
          changes.added[`${arrayPath}[${i}]`] = newItem;
          changes.removed[`${arrayPath}[${i}]`] = oldItem;
        }
      } else if (oldItem !== newItem) {
        // Value changed
        changes.added[`${arrayPath}[${i}]`] = newItem;
        changes.removed[`${arrayPath}[${i}]`] = oldItem;
      }
    }
  }

  function findChanges(oldObj, newObj, currentPath = "") {
    if (!oldObj || typeof oldObj !== "object") oldObj = {};
    if (!newObj || typeof newObj !== "object") newObj = {};

    // Handle arrays
    if (Array.isArray(newObj)) {
      findArrayChanges(oldObj, newObj, currentPath);
      return;
    }

    // Find added or modified values
    for (const key in newObj) {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;

      if (!(key in oldObj)) {
        // New key added
        changes.added[fullPath] = newObj[key];
        // If it's an object or array, recursively track all its contents as new
        if (typeof newObj[key] === "object" && newObj[key] !== null) {
          if (Array.isArray(newObj[key])) {
            findArrayChanges([], newObj[key], fullPath);
          } else {
            findChanges({}, newObj[key], fullPath);
          }
        }
      } else if (typeof newObj[key] === "object" && newObj[key] !== null) {
        // Handle nested objects and arrays
        if (Array.isArray(newObj[key])) {
          findArrayChanges(oldObj[key], newObj[key], fullPath);
        } else {
          findChanges(oldObj[key], newObj[key], fullPath);
        }
      } else if (oldObj[key] !== newObj[key]) {
        // Simple value changed
        changes.added[fullPath] = newObj[key];
        changes.removed[fullPath] = oldObj[key];
      }
    }

    // Find removed keys
    for (const key in oldObj) {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;
      if (!(key in newObj)) {
        changes.removed[fullPath] = oldObj[key];
        // If it's an object or array, recursively track all its contents as removed
        if (typeof oldObj[key] === "object" && oldObj[key] !== null) {
          if (Array.isArray(oldObj[key])) {
            findArrayChanges(oldObj[key], [], fullPath);
          } else {
            findChanges(oldObj[key], {}, fullPath);
          }
        }
      }
    }
  }

  // If a specific path is provided, navigate to that path first
  if (path) {
    const pathParts = path.split(".");
    let oldValue = oldData;
    let newValue = newData;

    // Navigate to the path in both old and new data
    for (const part of pathParts) {
      oldValue = oldValue?.[part];
      newValue = newValue?.[part];
    }

    // Track changes at and below the specified path
    if (Array.isArray(newValue)) {
      findArrayChanges(oldValue, newValue, path);
    } else if (typeof newValue === "object" && newValue !== null) {
      findChanges(oldValue, newValue, path);
    } else {
      if (oldValue !== newValue) {
        changes.added[path] = newValue;
        changes.removed[path] = oldValue;
      }
    }
  } else {
    // No specific path, track all changes
    findChanges(oldData, newData);
  }

  return changes;
}
