export const maskCNIC = (cnic) => {
  let formattedCNIC = cnic.replace(/\D/g, "");
  if (formattedCNIC.length > 5) {
    formattedCNIC = `${formattedCNIC.substring(0, 5)}-${formattedCNIC.substring(
      5
    )}`;
  }
  if (formattedCNIC.length > 13) {
    formattedCNIC = `${formattedCNIC.substring(
      0,
      13
    )}-${formattedCNIC.substring(13)}`;
  }
  console.log("asas", formattedCNIC);
  return formattedCNIC;
};

export const maskPhoneNumber = (phoneNumber) => {
  let formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
  if (formattedPhoneNumber.length > 4) {
    formattedPhoneNumber = `${formattedPhoneNumber.substring(
      0,
      4
    )}-${formattedPhoneNumber.substring(4)}`;
  }
  if (formattedPhoneNumber.length > 9) {
    formattedPhoneNumber = `${formattedPhoneNumber.substring(
      0,
      9
    )}-${formattedPhoneNumber.substring(9)}`;
  }
  return formattedPhoneNumber;
};
