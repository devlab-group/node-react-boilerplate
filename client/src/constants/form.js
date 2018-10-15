import PropTypes from 'prop-types'

/* eslint-disable import/prefer-default-export */

export const FIELD_PROP_TYPES = {
  INPUT: PropTypes.shape({
    checked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
  }).isRequired,
  META: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    autofilled: PropTypes.bool.isRequired,
    asyncValidating: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    form: PropTypes.string.isRequired,
    initial: PropTypes.any,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    touched: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    visited: PropTypes.bool.isRequired,
    warning: PropTypes.string,
  }).isRequired,
}
