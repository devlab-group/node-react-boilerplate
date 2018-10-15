require('./polyfills')

const appConfig = rootRequire('config')
const logger = require('./logger')

const createApp = rootRequire('factories/app')
const initSequelize = rootRequire('factories/sequelize')
const createServices = rootRequire('factories/services')
const createWebapp = rootRequire('factories/webapp')
const createHttp = rootRequire('factories/http')

/* eslint-disable max-statements */

async function main(config) {
  logger.info('Create application')
  const app = createApp(config)

  logger.info('Initialize database')
  const db = await initSequelize(config.postgres, rootRequire('models'))

  app.logger = logger
  app.db = db

  logger.info('Initialize adapters')
  const adapters = createServices(app, rootRequire('adapters'))

  logger.info('Bind adapters')
  adapters.forEach((service, name) => {
    app.register(name, service)
  })

  logger.info('Initialize services')
  const services = createServices(app, rootRequire('services'))

  logger.info('Bind services')
  services.forEach((service, name) => {
    app.register(name, service)
  })

  logger.info('Start application')
  await app.start()

  logger.info('Create WebApp')
  const webapp = createWebapp(app)

  await createHttp(config.http, webapp)
  logger.info(`Server started at ${config.http.host}:${config.http.port} (${config.env})`)

  return app
}

main(appConfig)
.then(app => {
  process.on('SIGINT', async () => {
    logger.info('Stop application')
    await app.stop()
  })
})
.catch((error) => {
  logger.error(error)
  process.exit(1)
})
