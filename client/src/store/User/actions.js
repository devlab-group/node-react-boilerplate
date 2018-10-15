import { createAction } from 'redux-actions'

import { UserService } from 'services'

const userProfileRequestSent = createAction('USER/PROFILE_REQUEST_SENT')
const userProfileRequestDone = createAction('USER/PROFILE_REQUEST_DONE')
const userProfileRequestFailed = createAction('USER/PROFILE_REQUEST_FAILED')

function fetchProfile() {
  return async dispatch => {
    dispatch(userProfileRequestSent())

    try {
      const profile = await UserService.profile()
      dispatch(userProfileRequestDone({ profile }))
    } catch (error) {
      dispatch(userProfileRequestFailed({ error }))
    }
  }
}

const userChangePasswordRequestSent = createAction('USER/CHANGE_PASSWORD_REQUEST_SENT')
const userChangePasswordRequestSuccessed = createAction('USER/CHANGE_PASSWORD_REQUEST_SUCCESSED')
const userChangePasswordRequestFailed = createAction('USER/CHANGE_PASSWORD_REQUEST_FAILED')

function changePassword(currentPassword, newPassword) {
  return async dispatch => {
    dispatch(userChangePasswordRequestSent())

    await UserService.changePassword(currentPassword, newPassword)

    dispatch(userChangePasswordRequestSuccessed())
  }
}

export {
  fetchProfile,
  changePassword,

  userProfileRequestSent,
  userProfileRequestDone,
  userProfileRequestFailed,

  userChangePasswordRequestSent,
  userChangePasswordRequestSuccessed,
  userChangePasswordRequestFailed,
}
