import moment from "moment";
export function formatTimeWithAMPM(time) {
  // console.log("checkingTime", time);
  const formattedTimestamp = time.slice(0, -5);
  const datee = new Date(formattedTimestamp);
  // console.log("dateeeeeeeeeeee", datee);
  // const dateString = 'Mon Jun 12 11:43:10 2023';
  // const date = new Date(datee);
  let hours = datee.getHours();
  const minutes = datee.getMinutes();
  const amPM = hours >= 12 ? "PM" : "AM";

  hours %= 12;
  hours = hours || 12;
  const timeWithAMPM = `${hours}:${minutes
    .toString()
    .padStart(2, "0")} ${amPM}`;

  return timeWithAMPM;
}
export const convertDateFormat = (originalDate) => {
  const parsedDate = moment(originalDate, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const convertedDate = parsedDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  return convertedDate;
};
