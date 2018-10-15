import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import { ReactUtils } from 'utils'
import { ROUTES } from 'constants'

import './styles.css'

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuthorized,
})

const AuthenticationContainerHOC = WrappedComponent => {
  const AuthenticationContainer = props => {
    if (props.isAuthorized) {
      return (
        <Redirect to={ROUTES.MEMBERS.BASE} />
      )
    }

    return (
      <div className="auth-container">
        <WrappedComponent {...props} />
      </div>
    )
  }

  AuthenticationContainer.displayName = `AuthenticationContainer(${ReactUtils.getDisplayName(WrappedComponent)})`
  AuthenticationContainer.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
  }

  return connect(mapStateToProps)(AuthenticationContainer)
}

export default AuthenticationContainerHOC
