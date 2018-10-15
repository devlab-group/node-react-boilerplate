const camelCase = require('lodash/camelCase')

const copy = rootRequire('lib/utils/deep-copy')
const freeze = rootRequire('lib/utils/deep-freeze')

/**
 * CreateServices module.
 *
 * Initializes passed services.
 *
 * @param   {App}     app       The application instance
 * @param   {Array}   services  The list of the services for initialization
 * @return  {Array}             The list of initialized services
 */
module.exports = function createServices(app, services) {
  const { config } = app

  return Object.entries(services)
    .reduce((result, [name, srv]) => {
      const name_ = camelCase(name)
      /**
       * Config file may contain options specific to a service.
       * Try to find it, copy and freeze
       */
      const options = freeze(copy(config[`${name_}`]))

      result.set(name, new srv(app, options))

      return result
    }, new Map())
}
