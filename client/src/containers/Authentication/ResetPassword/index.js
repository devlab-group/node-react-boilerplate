import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { compose, withProps } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { push } from 'react-router-redux'

import cx from 'classnames'

import { Auth } from 'store'

import Form from 'components/Form'

import { ROUTES } from 'constants'

import AuthenticationContainerHOC from '../Container'

import validate from './validation'

const ResetPassword = ({
  error, submitting, pristine, handleSubmit,
}) => (
  <div className="reset-password">
    <Form onSubmit={handleSubmit}>
      <div className={cx('error', { show: error })}>
        {error}
      </div>

      <Field
        name="password"
        type="password"
        label="New password"
        component={Form.Input}
      />

      <Field
        name="passwordConfirmation"
        type="password"
        label="New password confirmation"
        component={Form.Input}
      />

      <div className="layout-row layout-align-end-center">
        <button
          type="submit"
          className="action-btn"
          disabled={pristine || submitting}
        >
          Send
        </button>
      </div>
    </Form>
  </div>
)

ResetPassword.propTypes = {
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

ResetPassword.defaultProps = {
  error: null,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  resetPassword: Auth.resetPassword,
  pushPath: push,
}, dispatch)

export default compose(
  withProps(props => ({
    title: 'Reset password',
    token: props.match.params.token,
  })),
  AuthenticationContainerHOC,
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'reset-password',
    asyncBlurFields: [],
    asyncValidate: values => validate(values),
    onSubmit: (values, dispatch, props) => props.resetPassword(props.token, values.password)
      .catch(error => {
        throw new SubmissionError({
          _error: error.message,
        })
      }),
    onSubmitSuccess: (result, dispatch, props) => {
      props.pushPath(ROUTES.MAIN)
    },
  }),
)(ResetPassword)
