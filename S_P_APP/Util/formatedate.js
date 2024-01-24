export function extractDateFromTimestamp(timestamp) {
  // Extract the date part of the timestamp string (e.g., "2020-09-22")
  const datePart = timestamp.slice(0, 10);
  return datePart;
}
