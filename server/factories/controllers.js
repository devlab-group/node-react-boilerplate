const camelCase = require('lodash/camelCase')

const copy = rootRequire('lib/utils/deep-copy')
const freeze = rootRequire('lib/utils/deep-freeze')

/**
 * CreateControllers module.
 *
 * Initializes passed controllers.
 *
 * @param   {App}     app          The application instance
 * @param   {Array}   controllers  The list of the controllers for initialization
 * @return  {Array}                The list of initialized controllers
 */
module.exports = function createControllers(app, controllers) {
  const { config } = app

  return Object.entries(controllers)
    .reduce((result, [name, ctor]) => {
      const options = freeze(copy(config[`${camelCase(name)}Ctrl`] || {}))

      result[name] = new ctor(app, options)

      return result
    }, {})
}
