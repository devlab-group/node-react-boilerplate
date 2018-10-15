const jwt = require('express-jwt')

const { User } = rootRequire('models')

/**
 * Set of middlewares to verify JWT token and populate user from the database
 * in case of valid JWT token
 *
 * @param   {Object}  config  The app config object
 * @return  {Array}           The array of auth middlewares
 */
module.exports = function(config) {
  const verifyToken = jwt({
    secret: config.http.sessionSecret,
    requestProperty: 'auth',
    getToken: function(req) {

      const { authorization } = req.headers

      if (authorization) {
        return authorization
      }

      return null
    },
  })
  // Paths to skip on verification
  .unless({
    path: [
      '/api/v1/sign-in',
      '/api/v1/sign-up',
      '/api/v1/confirm-email',
      '/api/v1/recover-password',
      '/api/v1/reset-password',
    ],
  })

  /**
   * Fetches user from the database
   *
   * @param   {Request}   req    The express Request object
   * @param   {Response}  res    The express Response object
   * @param   {Function}  next   The express middleware callback function
   * @return  {*}                The result of next() call
   */
  const loadUser = async (req, res, next) => {
    if (req.auth) {
      req.user = await User.findById(req.auth.id)
    }
    next()
  }

  return [verifyToken, loadUser]
}
