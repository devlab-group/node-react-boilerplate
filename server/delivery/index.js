const { Router } = require('express')
const APIV1 = require('./v1')

/**
 * Initializes API
 *
 * @param   {App}    app  The application instance
 * @return  {Router}      The express router
 */
module.exports = function createApi(app) {
  const router = Router()

  router.use('/api/v1', APIV1(app))

  return router
}
