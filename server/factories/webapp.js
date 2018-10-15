const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const auth = rootRequire('lib/delivery/middlewares/auth')

const appHandler = rootRequire('delivery')
const errorHandler = rootRequire('errors/handler')

/**
 * WebApp module.
 *
 * Initializes main Web application with appropriate handlers, middlewares etc.
 *
 * @param   {App}     app  The main application object
 * @return  {Object}       The express application
 */
module.exports = function createWebapp(app) {
  const WebApp = express()
  const { config } = app

  // Expose public directory with images
  // WebApp.use('/images', express.static(path.join(__dirname, '../public/images')));

  WebApp.use(helmet())
  WebApp.use(cors({
    origin: config.http.frontOrigin,
    credentials: true,
  }))
  WebApp.use(logger((config.env === 'dev' && config.env) || 'tiny'))

  WebApp.use(bodyParser.json())
  WebApp.use(bodyParser.urlencoded({ extended: true }))

  // Bind auth middleware
  WebApp.use(auth(config))

  // Bind route handlers
  WebApp.use(appHandler(app))
  // Bind application level error handler
  WebApp.use(errorHandler)

  return WebApp
}
