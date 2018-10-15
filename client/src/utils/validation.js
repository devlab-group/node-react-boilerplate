import validate from 'validate.js'

import { UserService } from 'services'

class ValidationUtils {
  static validate = (values, format, options = {}) => validate(
    values,
    format,
    Object.assign({}, { fullMessages: true }, options),
  ) || {};

  static validateAsync = (values, format, options = {}) => validate.async(
    values,
    format,
    Object.assign({}, { fullMessages: true }, options),
  ).then(() => ({}));
}

validate.validators.uniqueEmail = function uniqueEmail(value) {
  if (!value) {
    return Promise.resolve()
  }

  return UserService.checkUniqueness('email', value)
    .catch(error => error.message)
}

validate.validators.uniqueUsername = function uniqueUsername(value) {
  if (!value) {
    return Promise.resolve()
  }

  return UserService.checkUniqueness('username', value)
    .catch(error => error.message)
}

export default ValidationUtils
