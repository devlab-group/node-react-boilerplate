global.Promise = require('bluebird')

/*
 * Wrapper to require inner modules with absolute path
 */
global.rootRequire = function(name) {
  return require(__dirname + '/' + name)
}
