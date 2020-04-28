const Validator = require("validator");
// Function for check if the string is empty or not, return a bool
const isEmpty = require("./isEmpty");

// Real function of this module
module.exports = function validateRegister(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "Votre prénom doit contenir au moins 2 characters et au plus 30";
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "Veuillez renseigner un prénom";
  }

  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = "Votre nom doit contenir au moins 2 characters et au plus 30";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Veuillez renseigner un nom";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Veuillez renseigner un email";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email invalide";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Votre mot de passe doit contenir au moins 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Veuillez renseigner un mot de passe";
  }

  

//   if (Validator.isEmpty(data.password2)) {
//     errors.password2 = "Confirm Password field is required";
//   }

//   if (!Validator.equals(data.password, data.password2)) {
//     errors.password2 = "Password must match";
//   }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
