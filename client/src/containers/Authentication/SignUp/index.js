import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { compose, withStateHandlers, withProps } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { push, goBack } from 'react-router-redux'

import { Link } from 'react-router-dom'

import cx from 'classnames'

import isEmpty from 'lodash/isEmpty'
import castArray from 'lodash/castArray'
import set from 'lodash/set'

import { Auth } from 'store'

import Form from 'components/Form'

import { ROUTES } from 'constants'

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

    <Field
      name="password"
      type="password"
      label="Password"
      component={Form.Input}
    />

    <Field
      name="passwordConfirmation"
      type="password"
      label="Confirm password"
      component={Form.Input}
    />

    <div className="layout-row layout-align-end-center">
      <Link
        to={ROUTES.SIGN_IN}
        className="action-btn empty"
      >
        Sign In
      </Link>
      <button
        type="submit"
        className="action-btn"
        disabled={pristine || submitting}
      >
        Sign Up
      </button>
    </div>
  </Form>
)

formRenderer.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

formRenderer.defaultProps = {
  error: null,
}

const confirmationRenderer = () => (
  <div>
    We just sent you an email.
    To verify we have the right email, please click the link in the email to activate your account
  </div>
)

const SignUp = ({
  error, submitting, pristine, handleSubmit, isConfirmationSent,
}) => {
  const Component = isConfirmationSent ? confirmationRenderer : formRenderer

  return (
    <div className="sign-up">
      <Component
        error={error}
        submitting={submitting}
        pristine={pristine}
        handleSubmit={handleSubmit}

      />
    </div>
  )
}

SignUp.propTypes = {
  isConfirmationSent: PropTypes.bool.isRequired,
  error: PropTypes.string,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

SignUp.defaultProps = {
  error: null,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signUp: Auth.signUp,
  pushRoute: push,
  goBackRoute: goBack,
}, dispatch)

export default compose(
  withProps({
    title: 'Sign Up',
  }),
  AuthenticationContainerHOC,
  connect(null, mapDispatchToProps),
  withStateHandlers({
    isConfirmationSent: false,
  }, {
    awaitConfirmation: () => () => ({ isConfirmationSent: true }),
  }),
  reduxForm({
    form: 'sign-up',
    asyncBlurFields: [],
    asyncValidate: values => validate(values),
    onSubmit: (values, dispatch, props) => {
      const {
        email,
        password,
      } = values

      return props.signUp(email, password)
        .catch(error => {
          const { details } = error
          const errors = {}

          if (!isEmpty(details)) {
            Object.entries(details)
              .reduce((errorsAggr, [field, message]) => set(errorsAggr, field, castArray(message)), errors)
          } else {
            errors._error = error.message
          }

          throw new SubmissionError(errors)
        })
    },
    onSubmitSuccess: (result, dispatch, props) => {
      props.awaitConfirmation()
    },
  }),
)(SignUp)
