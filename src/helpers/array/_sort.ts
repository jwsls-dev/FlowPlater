export function sortFunction(key: string, descending: boolean) {
  return function (a: any, b: any) {
    let left = key ? a[key] : a;
    let right = key ? b[key] : b;

    // Handle null/undefined values
    if (left === null || left === undefined) return descending ? -1 : 1;
    if (right === null || right === undefined) return descending ? 1 : -1;

    // String comparison
    if (typeof left === "string" && typeof right === "string") {
      return descending ? right.localeCompare(left) : left.localeCompare(right);
    }

    // Numeric comparison
    if (left < right) return descending ? 1 : -1;
    if (left > right) return descending ? -1 : 1;
    return 0;
  };
}
