import Store from 'lib/store'

import Auth from './auth'
import User from './user'
import Notifications from './notifications'

const StoreService = new Store()

const AuthService = new Auth(StoreService)
const UserService = new User(StoreService)
const NotificationsService = new Notifications()

export {
  StoreService,

  AuthService,
  UserService,

  NotificationsService,
}
