const { EventEmitter } = require('events')

/**
 * Service
 *
 * The base class for services/adapters/schedulers etc.
 */
class BaseService extends EventEmitter {
  constructor(app, options = {}) {
    super()

    this.app = app
    this.options = options
  }

  /**
   * Getter to the App registered services (aka api)
   */
  get api() {
    return this.app.api
  }

  /**
   * Interface method to start a service
   *
   * @return  {undefined}
   */
  async startService() {}

  /**
   * Interface method to stop a service
   *
   * @return  {undefined}
   */
  async stopService() {}
}

module.exports = BaseService
