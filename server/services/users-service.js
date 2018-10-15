const BaseService = rootRequire('lib/base-service')

const { BadParamsError } = rootRequire('errors')

const { User } = rootRequire('models')

/**
 * UsersService.
 *
 * The wrapper class for User objects manipulation.
 */
class UsersService extends BaseService {
  /**
   * Creates new User
   *
   * @param   {User}     user  The User object to create
   * @return  {Promise}        The Promise will be resolved with new user
   * @throws  {BadParamsError}
   */
  async create(user) {
    try {
      // Encrypt and assign password
      await user.setPassword(user.password)
      await user.save()

      // Send confirmation email in non blocking way
      this.sendConfirmationEmail(user)

      return user
    }
    catch (error) {
      throw new BadParamsError('bad_user', error)
    }
  }

  /**
   * Updates User document with the data
   *
   * @param   {User}    user  The User object should be updated
   * @param   {Object}  data  The data to update the User
   * @return  {Promise}       The promise will be resolved with updated user
   * @throws  {BadParamsError}
   */
  async update(user, data) {
    try {
      const { password, ...updateParams } = data

      if (password) {
        await user.setPassword(password)
      }

      user.set(updateParams)

      return await user.save()
    }
    catch (error) {
      const { errorType, errors } = parseError(error, 'user')

      throw new BadParamsError(errorType, errors)
    }
  }

  /**
   * Finds User with the email
   *
   * @param   {String}   email  The email of the User should be returned
   * @return  {Promise}         The promise will be resolved with found user
   */
  async findByEmail(email) {
    return await User.findOne({
      where: { email },
    })
  }

  /**
   * Finds User document with the id
   *
   * @param   {String}  id  The id of the User should be returned
   * @return  {Promise}     The promise will be resolved with found user
   */
  async findById(id) {
    return await User.findById(id)
  }

  /**
   * Sends confirmation email to the user
   *
   * @param   {User}     user  The User object to send an email
   * @return  {Promise}        The promise will be resolved with a result of sending
   */
  async sendConfirmationEmail(user) {
    user.setConfirmationCode()

    await user.save()

    await this.api.Mailer.sendConfirmationLink(user.email, user.get('emailConfirmationCode'))
  }

  /**
   * Sends reset password email to the user
   *
   * @param   {String}   email  The email of the user
   * @return  {Promise}         The promise will be resolved with a result of sending
   */
  async sendRecoverPasswordEmail(email) {
    const user = await this.findByEmail(email)

    // Just skip further logic, if there is no user with email
    if (! user) {
      return Promise.resolve()
    }

    user.setResetCode()

    await user.save()

    this.api.Mailer.sendResetPasswordLink(user.email, user.get('resetCode'))
  }

  /**
   * Confirms user with token
   *
   * @param   {String}  token  The confirmation token
   * @return  {Promise}        The promise will be resolved with confirmed user
   * @throws  {BadParamsError}
   */
  async confirmEmail(token) {
    const user = await User.findOne({
      where: {
        emailConfirmationCode: token,
      },
    })

    if (! user || !token) {
      throw new BadParamsError('invalid_token', 'Invalid confirmation code', {
        emailConfirmationCode: token,
      })
    }

    if (user.emailIsConfirmed) {
      throw new BadParamsError('confirmed_user', 'User is already confirmed')
    }

    user.emailIsConfirmed = true
    user.emailConfirmationCode = null
    user.emailIsConfirmedAt = new Date()

    return await user.save()
  }

  /**
   * Sets new password to the user with the reset token
   *
   * @param   {String}  token     The reset token
   * @param   {String}  password  The new password
   * @return  {Promise}           The promise will be resolved with updated user
   * @throws  {BadParamsError}
   */
  async resetPassword(token, password) {
    const user = await User.findOne({
      where: {
        resetCode: token,
      },
    })

    if (! user) {
      throw new BadParamsError('invalid_token', 'Invalid reset code', {
        resetCode: token,
      })
    }

    await user.setPassword(password)
    user.resetCode = undefined

    return await user.save()
  }
}

module.exports = UsersService
