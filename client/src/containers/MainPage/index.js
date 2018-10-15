import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { ROUTES } from 'constants'

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuthorized,
})

class MainPage extends PureComponent {
  static propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
  };

  render() {
    const { isAuthorized } = this.props

    return (
      <div>
        {isAuthorized ? (
          <Link to={ROUTES.MAIN}>Main</Link>
        ) : (
          <div>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            {' '}
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(MainPage)
