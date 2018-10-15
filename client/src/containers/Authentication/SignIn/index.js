import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import { Link } from 'react-router-dom'

import cx from 'classnames'

import { Auth } from 'store'

import Form from 'components/Form'

import { ROUTES } from 'constants'

import AuthenticationContainerHOC from '../Container'

import validate from './validation'

import './styles.css'

const SignIn = ({
  error, submitting, pristine, handleSubmit,
}) => (
  <div className="sign-in form-wrapper d-flex flex-column flex-lg-row align-items-center">
    <div className="form d-flex justify-content-between">
      <Form onSubmit={handleSubmit}>
        <div className={cx('error', { show: error })}>
          {error}
        </div>
        <div className="form-inner">
          <div className="input-wrapper__sign-in">
            <Field
              name="email"
              type="email"
              autoComplete="off"
              placeholder="Your Email"
              component={Form.Input}
            />
          </div>
          <div className="input-wrapper__sign-in">
            <Field
              name="password"
              type="password"
              autoComplete="off"
              placeholder="Password"
              component={Form.Input}
            />
          </div>
        </div>
        <div className="panel-wrapper">
          <div className="forgot-password-link">
            <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
          </div>

          <div className="layout-row layout-align-end-center">
            <button
              className="action-btn"
              type="submit"
              disabled={pristine || submitting}
            >
              Sign In
            </button>
          </div>
        </div>
      </Form>
    </div>
  </div>
)

SignIn.propTypes = {
  error: PropTypes.string,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

SignIn.defaultProps = {
  error: null,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signIn: Auth.signIn,
  pushRoute: push,
}, dispatch)

export default compose(
  withProps({
    title: 'Sign In',
  }),
  AuthenticationContainerHOC,
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'sign-in',
    asyncBlurFields: [],
    asyncValidate: values => validate(values),
    onSubmit: (values, dispatch, props) => {
      const { email, password } = values

      return props.signIn(email, password)
        .catch(error => {
          throw new SubmissionError({
            _error: error.message,
          })
        })
    },
    onSubmitSuccess: () => {},
  }),
)(SignIn)
