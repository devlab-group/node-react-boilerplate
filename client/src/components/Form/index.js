import React from 'react'
import PropTypes from 'prop-types'

import noop from 'lodash/noop'

import Input from './Input'

import './styles.css'

const Form = ({ className, children, onSubmit }) => (
  <form className={className} onSubmit={onSubmit}>
    {children}
  </form>
)

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onSubmit: PropTypes.func,
}

Form.defaultProps = {
  className: '',
  children: null,
  onSubmit: noop,
}

Form.Input = Input

export default Form
