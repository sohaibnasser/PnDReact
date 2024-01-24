export function formatTimeWithAMPM(time) {
  const dateTimeParts = time.match(/\d+/g);

  const year = parseInt(dateTimeParts[0]);
  const month = parseInt(dateTimeParts[1]) - 1;
  const day = parseInt(dateTimeParts[2]);
  const hours = parseInt(dateTimeParts[3]);
  const minutes = parseInt(dateTimeParts[4]);
  const seconds = parseInt(dateTimeParts[5]);

  const dateTime = new Date(year, month, day, hours, minutes, seconds);

  const formattedHours = dateTime.getHours() % 12 || 12;
  const formattedMinutes = dateTime.getMinutes().toString().padStart(2, "0");
  const period = dateTime.getHours() >= 12 ? "PM" : "AM";

  return `${formattedHours}:${formattedMinutes} ${period}`;
}
