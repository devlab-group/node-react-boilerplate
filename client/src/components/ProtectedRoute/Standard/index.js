import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

import { ROUTES } from 'constants'

/* eslint-disable react/prop-types */

const createRouteRenderer = (Component, props) => componentProps => {
  const redirectPath = {
    pathname: ROUTES.MAIN,
    state: {
      redirect: componentProps.location,
    },
  }

  if (props.isAuthorized) {
    return (
      <Component {...componentProps} />
    )
  }

  return (
    <Redirect to={redirectPath} />
  )
}

/* eslint-enable react/prop-types */

const StandardProtectedRoute = ({
  component, isAuthorized, ...routeProps
}) => (
  <Route
    {...routeProps}
    render={createRouteRenderer(component, { isAuthorized })}
  />
)

StandardProtectedRoute.propTypes = {
  component: Route.propTypes.component, // eslint-disable-line
  isAuthorized: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthorized: state.auth.isAuthorized,
})

export default connect(mapStateToProps)(StandardProtectedRoute)
