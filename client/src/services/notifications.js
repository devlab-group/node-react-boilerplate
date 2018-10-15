import uuid from 'uuid/v4'
import each from 'lodash/each'

import { LEVELS } from 'constants'

class NotificationsService {
  _subscriptions = {};

  subscribe = onNotification => {
    const id = uuid()

    this._subscriptions[id] = onNotification

    return () => {
      delete this._subscriptions[id]
    }
  };

  addNotification = ({
    title = null,
    message = '',
    position = 'br',
    level = LEVELS.SUCCESS,
  }) => {
    const notification = {
      title,
      message,
      position,
      level,
    }

    each(this._subscriptions, subscription => {
      subscription(notification)
    })
  };
}

each(LEVELS, level => {
  NotificationsService.prototype[level] = function ({
    title,
    message,
    position,
  }) {
    this.addNotification({
      title, message, position, level,
    })
  }
})

export default NotificationsService
