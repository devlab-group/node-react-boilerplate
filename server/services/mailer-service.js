const fs = require('fs')
const url = require('url')
const Handlebars = require('handlebars')

const BaseService = rootRequire('lib/base-service')

/**
 * MailerService.
 *
 * The wrapper class for emails sending.
 */
class MailerService extends BaseService {
  /**
   * Compile necessary templates on the service start
   *
   * @return  {undefined}
   */
  startService() {
    this.confirmByLinkView = Handlebars.compile(
      fs.readFileSync('views/mail/confirm-email-link.hbs', 'utf-8')
    )

    this.resetPasswordLinkView = Handlebars.compile(
      fs.readFileSync('views/mail/reset-password-link.hbs', 'utf-8')
    )
  }

  /**
   * Sends user confirmation email
   *
   * @param    {String}  email  The user email
   * @param    {String}  code   The confirmation code
   * @return  {Promise}        The promise will be resolved/rejected with a result of sending
   */
  async sendConfirmationLink(email, code) {
    const { MailerAdapter } = this.api

    await MailerAdapter.send({
      to: email,
      subject: 'Email Confirmation',
      html: this.confirmByLinkView({
        email,
        url: this._buildUrl(`/confirm-email/${code}`),
      }),
    })
  }

  /**
   * Sends password reset link
   *
   * @param    {String}  email  The user email
   * @param    {String}  code   The reset code
   * @return  {Promise}        The promise will be resolved/rejected with a result of sending
   */
  async sendResetPasswordLink(email, code) {
    const { MailerAdapter } = this.api

    await MailerAdapter.send({
      to: email,
      subject: 'Reset Password',
      html: this.resetPasswordLinkView({
        email,
        url: this._buildUrl(`/reset-password/${code}`),
      }),
    })
  }

  /**
   * Builds email url with path
   *
   * @param   {String}  pathname  The path of the url
   * @return  {String}            The url
   */
  _buildUrl(pathname) {
    const config = this.app.config.http

    return url.format({
      protocol: config.frontHttps ? 'https' : 'http',
      hostname: config.frontHostname,
      port: config.frontPort,
      pathname,
    })
  }
}

module.exports = MailerService
