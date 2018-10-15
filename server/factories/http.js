const http = require('http')

function createServer(listener) {
  return http.createServer(listener)
}

/**
 * CreateHttp module.
 *
 * Initializes application server
 *
 * @param   {Object}   config    The server configuration object
 * @param   {Object}   listener  The express application object
 * @return  {Promise}            The promise will be resolved with ran server
 */
module.exports = function createHttp(config, listener) {
  return new Promise((resolve, reject) => {
    const server = createServer(listener)

    server.on('error', reject)

    server.listen(config.port, config.host, () => resolve(server))
  })
}
