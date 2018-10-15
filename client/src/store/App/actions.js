import { createAction } from 'redux-actions'

const appInitStarted = createAction('APP/INIT_STARTED')
const appInitSuccessed = createAction('APP/INIT_SUCCESSED')
const appInitFailed = createAction('APP/INIT_FAILED')

function init() {
  return async dispatch => {
    dispatch(appInitStarted())

    try {
      dispatch(appInitSuccessed())
    } catch (error) {
      dispatch(appInitFailed({
        error: error.message || 'Invalid login or password.',
      }))
    }
  }
}

export {
  init,

  appInitStarted,
  appInitSuccessed,
  appInitFailed,
}
