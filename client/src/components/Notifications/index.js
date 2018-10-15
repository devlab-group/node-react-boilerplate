import React, { PureComponent } from 'react'

import NotificationSystem from 'react-notification-system'

import { NotificationsService } from 'services'

export default class Notifications extends PureComponent {
  componentDidMount() {
    this._unsubscribe = NotificationsService.subscribe(this.handleNotification)
  }

  componentWillUnmount() {
    if (this._unsubscribe && typeof this._unsubscribe === 'function') {
      this._unsubscribe()
    }
  }

  setRef = notificationSystem => {
    this._notificationSystem = notificationSystem
  }

  _notificationSystem = null;

  handleNotification = notification => {
    this._notificationSystem.addNotification({
      ...notification,
    })
  }

  render() {
    return (
      <NotificationSystem ref={this.setRef} />
    )
  }
}
