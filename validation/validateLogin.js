const Validator = require("validator");
// Function for check if the string is empty or not, return a bool
const isEmpty = require("./isEmpty");

// Real function of this module
module.exports = function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email invalide";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Veuillez renseigner un email";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Votre mot de passe doit contenir au moins 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Veuillez renseigner un mot de passe";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
