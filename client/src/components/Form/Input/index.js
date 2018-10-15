import React from 'react'

import Input from 'components/Input'

import { FORM } from 'constants'

const FormInput = props => {
  const { input, meta, ...rest } = props

  return (
    <Input {...input} meta={meta} {...rest} />
  )
}

/* eslint-disable react/require-default-props */

FormInput.propTypes = {
  input: FORM.FIELD_PROP_TYPES.INPUT,
  meta: FORM.FIELD_PROP_TYPES.META,
}

/* eslint-enable react/require-default-props */

export default FormInput
