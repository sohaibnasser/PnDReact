export const maskCNIC = (cnic) => {
  console.log("cnic", cnic.length);
  // Remove all non-numeric characters from the CNIC
  let formattedCNIC = cnic.replace(/\D/g, "");

  // Check if the CNIC has more than 5 characters and insert a hyphen after the 5th character
  if (formattedCNIC.length > 5) {
    formattedCNIC = `${formattedCNIC.substring(0, 5)}-${formattedCNIC.substring(
      5
    )}`;
  }

  // Check if the CNIC has more than 13 characters and insert a hyphen after the 13th character
  if (formattedCNIC.length > 13) {
    formattedCNIC = `${formattedCNIC.substring(
      0,
      13
    )}-${formattedCNIC.substring(13)}`;
  }

  // Check if the CNIC has fewer than 13 characters and remove any trailing hyphens
  if (formattedCNIC.length < 13) {
    formattedCNIC = formattedCNIC.replace(/-+$/, "");
  }

  return formattedCNIC;
};

export const maskPhoneNumber = (phoneNumber) => {
  console.log("maskphone", phoneNumber.length);
  let formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
  console.log("formattedPhoneNumber", formattedPhoneNumber.length);
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
