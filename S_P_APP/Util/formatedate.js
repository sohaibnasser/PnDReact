export function extractDateFromTimestamp(timestamp) {
  // Extract the date part of the timestamp string (e.g., "2020-09-22")
  const datePart = timestamp.slice(0, 10);
  return datePart;
}


export function formatDate(dateString) {
  // Split dateString into date and time parts
  const [datePart, timePart] = dateString.split("T");
  const dateParts = datePart.split("-");
  const year = dateParts[0];
  const month = dateParts[1].padStart(2, '0'); // Ensure two digits with leading zeros
  const day = dateParts[2].padStart(2, '0'); // Ensure two digits with leading zeros

  // Extract hours and minutes from timePart
  const [hours, minutes] = timePart.split(":");
  
  // Format the date
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  return formattedDate;
}
