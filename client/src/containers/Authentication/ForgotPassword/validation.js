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
}, { fullMessages: false })
