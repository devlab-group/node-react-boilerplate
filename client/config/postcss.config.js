const paths = require('./paths');

module.exports = {
  // Necessary for external CSS imports to work
  // https://github.com/facebookincubator/create-react-app/issues/2677
  ident: 'postcss',
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-import': {
      path: paths.appSrc,
    },
    'postcss-global-import': {},
    'postcss-nested': {},
    'postcss-for': {},
    'postcss-cssnext': {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    },
  },
};
