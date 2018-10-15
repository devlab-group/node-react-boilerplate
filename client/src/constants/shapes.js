import PropTypes from 'prop-types'

export default {
  ROUTER: {
    MATCH: {
      isExact: PropTypes.bool.isRequired,
      params: PropTypes.object,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    },
  },
}
