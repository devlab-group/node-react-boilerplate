const { Router } = require('express')

const createControllers = rootRequire('factories/controllers')

/**
 * Initializes API V1
 *
 * @param   {App}     app  App instance
 * @returns {Router}       Express Router instance
 */
module.exports = function APIV1(app) {
  const router = Router()
  const controllers = createControllers(app, require('./controllers'))

  router.post('/sign-in', controllers['auth'].signIn)
  router.post('/sign-up', controllers['auth'].signUp)
  router.put('/confirm-email', controllers['auth'].confirmEmail)
  router.put('/recover-password', controllers['auth'].recoverPassword)
  router.put('/reset-password', controllers['auth'].resetPassword)

  router.get('/user/profile', controllers['users'].profile)
  router.put('/user/change-password', controllers['users'].changePassword)

  return router
}
