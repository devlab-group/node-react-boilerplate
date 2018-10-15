import { handleActions } from 'redux-actions'
import { persistReducer } from 'redux-persist'

import storage from 'localforage'

import produce from 'immer'

import {
  signInRequestSuccessed,
  signOutRequestSuccessed,
} from './actions'

const initialState = {
  isAuthorized: false,
  accessToken: null,
}

/* eslint-disable no-param-reassign */

const reducer = handleActions({
  [signInRequestSuccessed]: (state, { payload }) => produce(state, next => {
    next.isAuthorized = true
    next.accessToken = payload.token
  }),
  [signOutRequestSuccessed]: state => produce(state, next => {
    next.isAuthorized = false
    next.accessToken = null
  }),
}, initialState)

/* eslint-enable no-param-reassign */

export default persistReducer({
  key: 'auth',
  storage,
}, reducer)
