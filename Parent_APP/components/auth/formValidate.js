export const validateForm = (inputValues) => {
  const errors = {};

  // Check if all fields are empty
  if (
    !inputValues.parentName ||
    !inputValues.parentContact ||
    !inputValues.parentEmail ||
    !inputValues.parentAddress ||
    !inputValues.parentAge ||
    !inputValues.parentCnic ||
    !inputValues.parentOtherContact ||
    !inputValues.parentPassword ||
    !inputValues.confirmPass
  ) {
    errors.allFieldsRequired = "All fields are required.";
  }

  // Validate each field
  if (!inputValues.parentName) {
    errors.parentName = "Name is required.";
  }
  if (!inputValues.parentContact) {
    errors.parentContact = "Contact is required.";
  }
  if (
    inputValues.parentContact.length < 11 ||
    inputValues.parentOtherContact.length < 11
  ) {
    errors.parentContact = "Contact numbers should not exceed 11 characters.";
    errors.parentOtherContact =
      "Contact numbers should not exceed 11 characters.";
  }
  if (!inputValues.parentEmail) {
    errors.parentEmail = "Email is required.";
  }
  const emailPattern = /\S+@\S+\.\S+/;
  if (!emailPattern.test(inputValues.parentEmail)) {
    errors.parentEmail = "Invalid email format.";
  }
  if (!inputValues.parentAddress) {
    errors.parentAddress = "Address is required.";
  }
  if (!inputValues.parentAge) {
    errors.parentAge = "Age is required.";
  } else if (
    isNaN(parseInt(inputValues.parentAge, 10)) ||
    parseInt(inputValues.parentAge, 10) < 0
  ) {
    errors.parentAge = "Age should be a number greater than or equal to 0.";
  }
  if (!inputValues.parentCnic) {
    errors.parentCnic = "CNIC is required.";
  } else if (inputValues.parentCnic.length < 14) {
    errors.parentCnic = "CNIC should be at least 14 characters.";
  }
  if (!inputValues.parentOtherContact) {
    errors.parentOtherContact = "Other contact is required.";
  }
  if (!inputValues.parentPassword) {
    errors.parentPassword = "Password is required.";
  }
  if (!inputValues.confirmPass) {
    errors.confirmPass = "Confirm Password is required.";
  }

  // Add more validations for other fields here...

  return errors;
};
