import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import noop from 'lodash/noop'
import stubTrue from 'lodash/stubTrue'
import get from 'lodash/get'

import cx from 'classnames'

import { ReactUtils } from 'utils'

import styles from './styles.css'

class Input extends PureComponent {
  static propTypes = {
    inputId: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['string', 'number', 'email', 'password']),
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    className: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    placeholder: PropTypes.string,
    filter: PropTypes.func,
    postfix: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    hideError: PropTypes.bool,
    onlyInteger: PropTypes.bool,
    meta: PropTypes.shape({}),
  };

  static defaultProps = {
    inputId: '',
    name: '',
    title: '',
    label: '',
    type: 'string',
    size: 'medium',
    className: null,
    value: '',
    placeholder: '',
    postfix: '',
    filter: stubTrue,
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    disabled: false,
    readOnly: false,
    hideError: false,
    onlyInteger: false,
    meta: {},
  };

  state = {
    inputId: this.props.inputId || ReactUtils.getRandomInputId(),
    value: this.props.value,
  };

  componentWillReceiveProps(nextProps) {
    const {
      value,
      type,
    } = nextProps

    if ((value !== parseFloat(this.state.value)) || type !== 'number') {
      this.setState({ value })
    }
  }

  getInputType = type => {
    if (type === 'password') {
      return 'password'
    } else if (type === 'email') {
      return 'email'
    }

    return 'text'
  };

  filterValue = (type, filter, value) => {
    if (value.trim().length === 0) {
      return true
    }

    switch (type) {
      case 'number': {
        const regex = this.props.onlyInteger ? /^-?\d*$/i : /^-?\d*\.?\d*$/i

        if (regex.test(value)) {
          return !Number.isNaN(parseFloat(value))
        }

        return false
      }
      default: {
        return filter(value)
      }
    }
  };

  parseValue = (type, value) => {
    switch (type) {
      case 'number': {
        const parsed = parseFloat(value)

        return Number.isNaN(parsed) ? '' : parsed
      }
      default: {
        return value
      }
    }
  };

  handleInputChange = ({ currentTarget: { value } }) => {
    const {
      type,
      filter,
      onChange,
    } = this.props

    if (this.filterValue(type, filter, value)) {
      this.setState({ value })

      onChange(this.parseValue(type, value))
    }
  };

  handleInputBlur = () => {
    this.props.onBlur(this.state.value)
  };

  handleInputFocus = () => {
    this.props.onFocus(this.state.value)
  };

  renderTitle = title => {
    if (title && title.trim().length > 0) {
      return (
        <div className="title">
          {title}
        </div>
      )
    }

    return null
  };

  renderLabel = label => {
    if (label && label.trim().length > 0) {
      const { inputId } = this.state

      return (
        <label htmlFor={inputId}>
          {label}
        </label>
      )
    }

    return null
  };

  renderError = meta => {
    const {
      touched,
      error,
    } = meta

    const classes = cx('error', {
      show: touched && error && error.length > 0,
    })

    return (
      <div className={classes}>
        {get(error, '[0]', null)}
      </div>
    )
  };

  render() {
    const {
      name,
      label,
      title,
      type,
      size,
      className,
      placeholder,
      postfix,
      disabled,
      readOnly,
      hideError,
      meta,
    } = this.props

    const {
      inputId,
      value,
    } = this.state

    const hasPostfix = postfix && postfix.length > 0

    const classes = cx(styles.input, styles[size], {
      [styles.disabled]: disabled,
      [styles['has-postfix']]: hasPostfix,
    }, className)

    return (
      <div className={classes}>
        {this.renderTitle(title)}
        {this.renderLabel(label)}
        <div className="input-box">
          <input
            id={inputId}
            className="input-el"
            name={name}
            type={this.getInputType(type)}
            value={value}
            placeholder={placeholder}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            disabled={disabled}
            readOnly={readOnly}
          />
          {hasPostfix && (
            <div className="postfix">
              { postfix }
            </div>
          )}
        </div>
        {!hideError && this.renderError(meta)}
      </div>
    )
  }
}

export default Input
