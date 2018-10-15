import { handleActions, combineActions } from 'redux-actions'

import produce from 'immer'

import {
  signInRequestSuccessed,
  signUpRequestSuccessed,
  signOutRequestSuccessed,
} from 'store/Auth/actions'

import {
  userProfileRequestDone,
  userProfileRequestFailed,
} from './actions'

const initialState = {
  profile: undefined,
  error: null,
}

/* eslint-disable no-param-reassign */

export default handleActions({
  [userProfileRequestDone]: (
    state,
    { payload: { profile } },
  ) => produce(state, next => {
    next.profile = profile
  }),

  [userProfileRequestFailed]: (
    state,
    { payload: { error } },
  ) => produce(state, next => {
    next.error = error
  }),

  [combineActions(signInRequestSuccessed, signUpRequestSuccessed)]: (
    state,
    { payload: { user } },
  ) => produce(state, next => {
    next.profile = user
  }),

  [signOutRequestSuccessed]: state => produce(state, next => {
    next.profile = null
  }),
}, initialState)
