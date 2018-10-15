// const nodemailer = require('nodemailer')
const mailgun = require('mailgun-js')

const BaseService = rootRequire('lib/base-service')

/**
 * MailerAdapter
 *
 * Wrapper for standard emails sending
 */
class MailerAdapter extends BaseService {
  /**
   * Initialize mailer transport from options on service start
   *
   * @return  {undefined}
   */
  startService() {
    if (this.client) {
      throw new Error('MailerAdapter already started')
    }

    const { apiKey, domain } = this.options.mailgun
    this.client = mailgun({ apiKey, domain })
  }

  /**
   * Sends combined email
   *
   * @param   {Object}   envelope  The mail content object
   * @return  {Promise}            The promise will be resolved/rejected with a result of sending
   */
  send(envelope) {
    return new Promise((resolve, reject) => {
      this.client.messages().send({
        ...envelope,
        ...this.options.mail,
      }, function(error, body) {
        if (error) {
          reject(error)
        } else {
          resolve(body)
        }
      })
    })
  }
}

module.exports = MailerAdapter
