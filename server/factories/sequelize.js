const Sequelize = require('sequelize')
const reduce = require('lodash/reduce')

const logger = rootRequire('logger')

module.exports = async function initSequelize(config, models) {
  const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: logger.debug.bind(logger),
  })

  try {
    logger.info('Authenticate database')
    await sequelize.authenticate()

    logger.info('Initialize models')

    const readyModels = reduce(models, (accum, model) => {
      accum[model.name] = model.init(sequelize)
      return accum
    }, {})

    // Load model associations
    for (const model of Object.keys(readyModels)) {
        typeof models[model].associate === 'function' && models[model].associate(readyModels)
    }

    logger.info('Syncing sequelize')
    await sequelize.sync()

    return sequelize
  } catch (error) {
    logger.error('Unable to connect to the database', error)
  }
}
