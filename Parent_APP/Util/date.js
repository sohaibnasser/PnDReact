import moment from "moment";
// export const formatTimeWithAMPM = (dateTimeString) => {
//   // console.log("utc time string", dateTimeString);

//   const dateTime = new Date(dateTimeString);

//   const hours = dateTime.getUTCHours();
//   const minutes = dateTime.getUTCMinutes();
//   const seconds = dateTime.getUTCSeconds();

//   const formattedTime = `${hours}:${minutes}:${seconds}`;
//   console.log(formattedTime);
//   // console.log(formattedTime);
//   // const localTime = moment.utc(utcTimeString).local();

//   // // moment(selectedTime).format("YYYY-MM-DD HH:mm:ss")

//   // return localTime.format("h:mm A");
// };
export function formatTimeWithAMPM(time) {
  const localTime = moment.utc(time);
  return localTime.format("h:mm A");
  console.log("checkingTime", localTime);
  // const formattedTimestamp = time.slice(0, 19); // Extract only the relevant part
  // const datee = new Date(formattedTimestamp + "Z");
  // // const dateString = 'Mon Jun 12 11:43:10 2023';
  // // const date = new Date(datee);
  // let hours = datee.getUTCHours();
  // const minutes = datee.getUTCMinutes();
  // const amPM = hours >= 12 ? "PM" : "AM";

  // hours %= 12;
  // hours = hours || 12;
  // const timeWithAMPM = `${hours}:${minutes
  //   .toString()
  //   .padStart(2, "0")} ${amPM}`;

  // return timeWithAMPM;
}
export const getDateFromDateTimestring = (dateTimeString) => {
  const date = moment(dateTimeString).format("YYYY-MM-DD");
  return date;
};
