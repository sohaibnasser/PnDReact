import moment from "moment";

// Function to get the day name from a given date string
export const getDayFromDateString = (dateString) => {
  const dateObj = moment(dateString);
  return dateObj.format("DD/MM/YYYY");
};
