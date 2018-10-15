const BaseController = rootRequire('lib/base-controller')

const { BadParamsError } = rootRequire('errors')

/**
 * UsersController.
 *
 * Provides an API to the User model.
 */
class UsersController extends BaseController {
  constructor(app, options) {
    super(app, options)

    this.profile = this.profile.bind(this)
    this.changePassword = this.changePassword.bind(this)
  }

  /**
   * Returns logged in user data
   *
   * @param   {Request}   req    The express Request object
   * @param   {Response}  res    The express Response object
   * @param   {Function}  next   The express middleware callback function
   * @return  {undefined}
   */
  async profile(req, res) {
    const { user } = req

    res.json(user)
  }

  /**
   * Updates password for logged in user
   *
   * @param   {Request}   req    The express Request object
   * @param   {Response}  res    The express Response object
   * @param   {Function}  next   The express middleware callback function
   * @return  {undefined}
   */
  async changePassword(req, res, next) {
    const { user } = req
    const {
      currentPassword,
      newPassword,
    } = req.body

    try {
      if (! await user.comparePassword(currentPassword)) {
        throw new BadParamsError('invalid_password', {
          currentPassword: ['Invalid current password'],
        })
      }

      await user.setPassword(newPassword)
      await user.save()

      return res.end()
    }
    catch (error) {
      return next(error)
    }
  }
}

module.exports = UsersController
