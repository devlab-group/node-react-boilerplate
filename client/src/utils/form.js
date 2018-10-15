import { SubmissionError } from 'redux-form'

import set from 'lodash/set'
import isEmpty from 'lodash/isEmpty'
import castArray from 'lodash/castArray'

export default class FormUtils {
  static handleSubmissionError = error => {
    const { details } = error
    const errors = {}

    if (!isEmpty(details)) {
      Object.entries(details)
        .reduce((errorsAggr, [field, message]) => set(errorsAggr, field, castArray(message)), errors)
    } else {
      errors._error = error.message
    }

    throw new SubmissionError(errors)
  };
}
