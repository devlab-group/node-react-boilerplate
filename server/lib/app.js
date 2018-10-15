const BaseService = require('./base-service')

const freeze = rootRequire('lib/utils/deep-freeze')
const copy = rootRequire('lib/utils/deep-copy')

/**
 * App
 *
 * Contains initialized instances (services, adapters etc) and provides an access to them
 */
class App {
  constructor(config = {}) {
    this.services = new Map()
    this.config = freeze(copy(config))
    this._api = {}
  }

  /**
   * Getter of an object containing all registered services
   */
  get api() {
    return { ...this._api }
  }

  /**
   * Checks whether App has an initialized service with a name.
   *
   * @param   {String}   name  The name of the service
   * @return  {Boolean}        .
   */
  has(name) {
    return this.services.has(name)
  }

  /**
   * Stores new service in an App instance.
   *
   * @param   {String}    name     The name of the service
   * @param   {Service}   service  The service instance
   * @return  {undefined}
   */
  register(name, service) {
    if (this.has(name)) {
      throw new Error(`Service ${name} already exists`)
    }

    if (! service instanceof BaseService) {
      throw new Error('Argument #2 should be an instance of BaseService')
    }

    this.services.set(name, service)
    this._api[name] = service
  }

  /**
   * Removes already registered service.
   *
   * @param   {String}    name     The name of the service
   * @return  {undefined}
   */
  unregister(name) {
    if (! this.has(name)) {
      throw new Error(`Service ${name} not found`)
    }

    this.services.delete(name)
    delete this._api[name]
  }

  /**
   * Runs all registered services in a loop
   *
   * @return  {undefined}
   */
  async start() {
    for (let service of this.services.values()) {
      await service.startService()
    }
  }

  /**
   * Stops all registered services in a loop
   *
   * @return  {undefined}
   */
  async stop() {
    for (let service of this.services.values()) {
      await service.stopService()
    }
  }
}

module.exports = App
