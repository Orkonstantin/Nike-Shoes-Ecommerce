export default function validateForm(formState) {
  // function to validate form fields with regex patterns and error messages for each field and return errors object with error messages for each field if not valid or empty if valid (no errors)
  const errors = {}; //create empty errors object

  const validationPatterns = {
    name: [/^[a-zA-Z\sא-ת]+$/, "Name should only contain letters and spaces."], //validate name with regex (only letters and spaces) and error message if not valid
    email: [/\S+@\S+\.\S+/, "Email address is invalid"], //validate email with regex and error message if not valid
    city: [/^[a-zA-Z\sא-ת]+$/, "City should only contain letters and spaces."], //validate city with regex and error message if not valid
    postalCode: [
      //validate postal code with regex and error message if not valid
      /^(\d{5}(-\d{4})?|\d{7})$/,
      "Postal code should be in the format XXXXX or XXXXX-XXXX (US) or XXXXXXX (Israel).",
    ],
    streetAddress: [
      //validate street address with regex and error message if not valid
      /^[a-zA-Z0-9\sא-ת]+$/,
      "Street address should only contain letters, numbers and spaces.",
    ],
    country: [
      //validate country with regex and error message if not valid
      /^[a-zA-Z\sא-ת]+$/,
      "Country should only contain letters and spaces.",
    ],
  };

  for (const field in formState) {
    //loop through formState object
    const value = formState[field]; //get value of each field
    const [pattern, errorMessage] = validationPatterns[field]; //get regex and error message for each field

    if (!value.trim()) {
      //if value is empty
      errors[field] = `${
        //add error message to errors object
        field.charAt(0).toUpperCase() + field.slice(1) //capitalize first letter of field name
      } is required`; //add "is required" to error message
    } else if (!pattern.test(value.trim())) {
      //if value is not empty, test value with regex pattern and if not valid add error message to errors object
      errors[field] = errorMessage; //add error message to errors object
    }
  }

  return errors; //return errors object
}
