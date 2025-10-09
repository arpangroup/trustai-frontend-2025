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

/**
 * Input TimeStamp, Output: "YYYY-MM-DD HH:mm:ss"
 * Example Input: 2025-09-05T04:11:35.379138
 * Output: 2025-05-14 06:06:16
 * @returns 
 */

export function formatTimestampTo_YY_MM_DD_HH_MM_SS(dateString) {
    const date = new Date(dateString);

    const pad = (num) => num.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are 0-based
    const day = pad(date.getDate());

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

