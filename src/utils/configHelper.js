// utils/configHelper.js
export function getConfigValue(key, fallback) {
  if (typeof localStorage !== 'undefined') {
    const value = localStorage.getItem(key);
    if (value !== null) {
      try {
        return JSON.parse(value); // Supports strings, numbers, booleans, objects
      } catch {
        return value; // fallback if JSON parsing fails
      }
    }
  }
  return fallback;
}
