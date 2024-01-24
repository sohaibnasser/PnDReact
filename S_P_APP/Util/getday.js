import moment from "moment";
export const getDayFromDateString = (dateString) => {
  const dateObj = moment(dateString);
  return dateObj.format("DD/MM/YYYY");
};
