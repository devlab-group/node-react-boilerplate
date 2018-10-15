import { ValidationUtils } from 'utils'

export default values => ValidationUtils.validateAsync(values, {
  email: {
    presence: {
      allowEmpty: false,
      message: 'Email is required',
    },
    email: {
      message: 'Email is invalid',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: 'Password is required',
    },
    length: {
      minimum: 8,
      message: 'Password min length is 8',
    },
  },
  passwordConfirmation: {
    presence: {
      allowEmpty: false,
      message: 'Password confirmation is required',
    },
    equality: {
      attribute: 'password',
      message: 'Passwords are not equal',
    },
  },
}, { fullMessages: false })
