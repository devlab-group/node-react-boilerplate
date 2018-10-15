import { bindActionCreators } from 'redux'
import { compose, lifecycle, withProps } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Auth } from 'store'

import { ROUTES } from 'constants'

import AuthenticationContainerHOC from '../Container'

const ConfirmEmail = () => (null)

const mapDispatchToProps = dispatch => bindActionCreators({
  confirmEmail: Auth.confirmEmail,
  pushRoute: push,
}, dispatch)

export default compose(
  AuthenticationContainerHOC,
  connect(null, mapDispatchToProps),
  withProps(props => ({
    token: props.match.params.token,
  })),
  lifecycle({
    componentDidMount() {
      const {
        token,
        confirmEmail,
        pushRoute,
      } = this.props

      confirmEmail(token)
        .finally(() => {
          pushRoute(ROUTES.MAIN)
        })
    },
  }),
)(ConfirmEmail)
