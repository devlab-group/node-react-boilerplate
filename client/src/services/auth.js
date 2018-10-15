import HttpApi from 'lib/http-api'

function onResponse({ data }) {
  return data
}

class AuthApi extends HttpApi {
  async signIn(user) {
    return this.write('POST', '/sign-in', user)
      .then(onResponse)
  }

  async signUp(user) {
    return this.write('POST', '/sign-up', user)
      .then(onResponse)
  }

  async confirmEmail(token) {
    return this.write('PUT', '/confirm-email', { token })
      .then(onResponse)
  }

  async recoverPassword(email) {
    return this.write('PUT', '/recover-password', { email })
      .then(onResponse)
  }

  async resetPassword(token, password) {
    return this.write('PUT', '/reset-password', { token, password })
      .then(onResponse)
  }
}

export default AuthApi
