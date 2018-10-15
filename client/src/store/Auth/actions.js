import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'

import { AuthService } from 'services'

const signInRequestStarted = createAction('AUTH/SIGN_IN_REQUEST_STARTED')
const signInRequestSuccessed = createAction('AUTH/SIGN_IN_REQUEST_SUCCESSED')
const signInRequestFailed = createAction('AUTH/SIGN_IN_REQUEST_FAILED')

function signIn(email, password) {
  return async dispatch => {
    dispatch(signInRequestStarted())

    const response = await AuthService.signIn({ email, password })

    const { user, token } = response

    dispatch(signInRequestSuccessed({ user, token }))
  }
}

const signUpRequestStarted = createAction('AUTH/SIGN_UP_REQUEST_STARTED')
const signUpRequestSuccessed = createAction('AUTH/SIGN_UP_REQUEST_SUCCESSED')
const signUpRequestFailed = createAction('AUTH/SIGN_UP_REQUEST_FAILED')

function signUp(email, password) {
  return async dispatch => {
    dispatch(signUpRequestStarted())

    const response = await AuthService.signUp({
      email,
      password,
    })

    const { user, token } = response

    dispatch(signUpRequestSuccessed({ user, token }))
  }
}

const signOutRequestStarted = createAction('AUTH/SIGN_OUT_REQUEST_STARTED')
const signOutRequestSuccessed = createAction('AUTH/SIGN_OUT_REQUEST_SUCCESSED')
const signOutRequestFailed = createAction('AUTH/SIGN_OUT_REQUEST_FAILED')

function signOut() {
  return dispatch => {
    dispatch(signOutRequestSuccessed())
    dispatch(push('/'))
  }
}

function confirmEmail(token) {
  return async () => {
    await AuthService.confirmEmail(token)
  }
}

function recoverPassword(email) {
  return async () => {
    await AuthService.recoverPassword(email)
  }
}

function resetPassword(token, password) {
  return async () => {
    await AuthService.resetPassword(token, password)
  }
}

export {
  signIn,
  signUp,
  signOut,
  confirmEmail,
  recoverPassword,
  resetPassword,

  signInRequestStarted,
  signInRequestSuccessed,
  signInRequestFailed,
  signUpRequestStarted,
  signUpRequestSuccessed,
  signUpRequestFailed,
  signOutRequestStarted,
  signOutRequestSuccessed,
  signOutRequestFailed,
}
