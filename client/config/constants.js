const paths = require('./paths');

module.exports = {
  cssModulesScopedNameInterpolatedString: '[local]',
  packages: Object.keys(require(paths.appPackageJson).dependencies),
};
