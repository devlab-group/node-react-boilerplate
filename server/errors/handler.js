const http = require('http')

const logger = rootRequire('logger')
const error3 = rootRequire('lib/error3')
const errors = rootRequire('errors')

/**
 * Web server error handler.
 *
 * Catches all errors might arise on web server requests. Formats errors into
 * standard view and returns as JSON in server response.
 *
 * @param   {*}         error  The error object
 * @param   {Request}   req    The express Request object
 * @param   {Response}  res    The express Response object
 * @param   {Function}  next   The express middleware callback function
 * @return  {undefined}
 */
module.exports = function(error, req, res, next) {
  logger.error(error)

  if (typeof error === 'number') {
    res.status(error)
    res.json({
      error: {
        code: error,
        message: http.STATUS_CODES[error],
      },
    })
  }
  else if (error instanceof error3) {
    switch (error.constructor) {
    case errors.AccessError:
      res.status(403)
      break
    case errors.BadParamsError:
      if (error.code === 'not_found') {
        res.status(404)
      }
      else {
        res.status(400)
      }
      break
    default:
      res.status(500)
    }

    const response = {
      code: error.code,
      message: error.message,
      details: error.details,
    }

    res.json({
      error: response,
    })
  }
  else if (error.name === 'UnauthorizedError') {
    res.status(401)
    res.json({
      error: {
        code: error.code,
        message: error.message,
      },
    })
  }
  else {
    res.status(500)
    res.json({
      error: {
        code: 'unknown_error',
        message: 'Unknown error',
      },
    })
  }
}
