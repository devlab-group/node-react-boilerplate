import { handleActions } from 'redux-actions'

import produce from 'immer'

import {
  appInitStarted,
  appInitSuccessed,
  appInitFailed,
} from './actions'

const initialState = {
  loading: false,
  error: null,
}

/* eslint-disable no-param-reassign */

export default handleActions({
  [appInitStarted]: state => produce(state, next => {
    next.loading = true
    next.error = null
  }),

  [appInitSuccessed]: state => produce(state, next => {
    next.loading = false
    next.error = null
  }),

  [appInitFailed]: (state, { payload: { error } }) => produce(state, next => {
    next.loading = false
    next.error = error
  }),
}, initialState)

/* eslint-enable no-param-reassign */
