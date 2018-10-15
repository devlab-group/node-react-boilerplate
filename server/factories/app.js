const App = rootRequire('lib/app')

/**
 * CreateApp module
 *
 * Initializes the main Application
 *
 * @param   {Object}  config  The entire application config object
 * @return  {App}             The initialized Application instance
 */
module.exports = function createApp(config) {
  const app = new App(config)

  return app
}
