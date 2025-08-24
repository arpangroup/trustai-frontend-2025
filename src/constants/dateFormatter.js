// src/utils/dateFormatter.js

/**
 * Format ISO 8601 date string to human-readable date
 * Example: "2025-08-05T20:29:33.613459" => "Aug 5, 2025"
 */
export function formatDateShort(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Full readable format with time
 * Example: "Aug 5, 2025 at 8:29 PM"
 */
export function formatDateTime(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

