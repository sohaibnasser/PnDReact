export function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateParts = dateString.split("T")[0].split("-");
  const year = dateParts[0];
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  const formattedDate = `${months[month - 1]} ${day}, ${year}`;
  return formattedDate;
}
