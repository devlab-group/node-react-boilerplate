const log4js = require('log4js')

const logger = log4js.getLogger()

logger.level = 'info'

if (process.env.LOG_LEVEL) {
  logger.level = process.env.LOG_LEVEL
} else if (process.env.NODE_ENV !== 'production') {
  logger.level = 'debug'
}

module.exports = logger
