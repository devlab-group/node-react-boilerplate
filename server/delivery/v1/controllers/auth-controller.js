const BaseController = rootRequire('lib/base-controller')

const { AccessError, BadParamsError } = rootRequire('errors')

const { User } = rootRequire('models')

/**
 * AuthController.
 *
 * Provides an API for an authentication.
 */
class AuthController extends BaseController {
  constructor(app, options) {
    super(app, options)

    this.signIn = this.signIn.bind(this)
    this.signUp = this.signUp.bind(this)
    this.confirmEmail = this.confirmEmail.bind(this)
    this.recoverPassword = this.recoverPassword.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  }

  /**
   * Authenticates user with email and password.
   * Generates and sends in the server response new JWT token
   *
   * @param   {Request}   req    The express Request object
   * @param   {Response}  res    The express Response object
   * @param   {Function}  next   The express middleware callback function
   * @return  {undefined}
   */
  async signIn(req, res, next) {
    const { Users } = this.api
    const { email, password } = req.body

    try {
      let user = await Users.findByEmail(email)
      if (! user || ! await user.comparePassword(password)) {
        throw new BadParamsError('invalid_credentials', 'Invalid Email or Password')
      }

      if (! user.emailIsConfirmed) {
        throw new AccessError('not_confirmed', 'Email is not confirmed')
      }

      // Generate new JWT token
      const token = user.generateJWT()
      user.updateSignInCount()
      res.json({
        user,
        token,
        isAdmin: user.isAdmin(),
      })
    }
    catch (error) {
      return next(error)
    }
  }

  /**
   * Registers new user.
   * Generates and sends in the server response new JWT token
   *
   * @param   {Request}   req    The express Request object
   * @param   {Response}  res    The express Response object
   * @param   {Function}  next   The express middleware callback function
   * @return  {undefined}
   */
  async signUp(req, res, next) {
    const { Users } = this.api
    const userData = req.body

    const user = User.build({
      ...userData,
    })

    try {
      const newUser = await Users.create(user)

      const token = newUser.generateJWT()

      res.json({
        user: newUser,
        token,
      })
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Confirms user with token.
   *
   * @param   {Request}   req    The express Request object
   * @param   {Response}  res    The express Response object
   * @param   {Function}  next   The express middleware callback function
   * @return  {undefined}
   */
  async confirmEmail(req, res, next) {
    const { Users } = this.api
    const { token } = req.body

    try {
      await Users.confirmEmail(token)

      return res.end()
    }
    catch (error) {
      next(error)
    }
  }

  /**
   * Sends reset password link to the user.
   *
   * @param   {Request}   req    The express Request object
   * @param   {Response}  res    The express Response object
   * @param   {Function}  next   The express middleware callback function
   * @return  {undefined}
   */
  async recoverPassword(req, res) {
    const { Users } = this.api
    const { email } = req.body

    try {
      await Users.sendRecoverPasswordEmail(email)

      return res.end()
    }
    catch (error) {
      // Ignore errors in case user with email was not found
    }
  }

  /**
   * Changes password of the user with reset token
   *
   * @param   {Request}   req    The express Request object
   * @param   {Response}  res    The express Response object
   * @param   {Function}  next   The express middleware callback function
   * @return  {undefined}
   */
  async resetPassword(req, res, next) {
    const { Users } = this.api
    const { token, password } = req.body

    try {
      await Users.resetPassword(token, password)

      return res.end()
    }
    catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController
