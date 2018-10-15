import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { compose, withStateHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'

import cx from 'classnames'

import { Auth } from 'store'

import Form from 'components/Form'

import AuthenticationContainerHOC from '../Container'

import validate from './validation'

const formRenderer = ({
  error, submitting, pristine, handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <div className={cx('error', { show: error })}>
      {error}
    </div>

    <Field
      name="email"
      type="email"
      label="Email"
      component={Form.Input}
    />

    <div className="layout-row layout-align-end-center">
      <button
        type="submit"
        className="action-btn"
        disabled={pristine || submitting}
      >
        Reset
      </button>
    </div>
  </Form>
)

formRenderer.propTypes = {
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

formRenderer.defaultProps = {
  error: '',
}

const resetRenderer = () => (
  <div>
    We just sent you an email.
    Please click the link in the email to reset your account password
  </div>
)

const ForgotPassword = ({
  error, submitting, pristine, handleSubmit, isResetSent,
}) => {
  const Component = isResetSent ? resetRenderer : formRenderer

  return (
    <div className="forgot-password">
      <Component
        error={error}
        submitting={submitting}
        pristine={pristine}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

ForgotPassword.propTypes = {
  error: PropTypes.string,
  isResetSent: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

ForgotPassword.defaultProps = {
  error: null,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  recoverPassword: Auth.recoverPassword,
}, dispatch)

export default compose(
  withProps({
    title: 'Forgot password',
  }),
  AuthenticationContainerHOC,
  connect(null, mapDispatchToProps),
  withStateHandlers({
    isResetSent: false,
  }, {
    onResetSent: () => () => ({ isResetSent: true }),
  }),
  reduxForm({
    form: 'forgot-password',
    asyncValidate: values => validate(values),
    onSubmit: (values, dispatch, props) => {
      const { email } = values

      return props.recoverPassword(email)
    },
    onSubmitSuccess: (result, dispatch, props) => {
      props.onResetSent()
    },
  }),
)(ForgotPassword)
