import { createStore, applyMiddleware, compose } from 'redux'

import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'

import { persistStore } from 'redux-persist'

import rootReducer from './store'

const loggerMiddleware = createLogger()

const configureStore = (initialState, history) => {
  const reduxDevTool = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const composeWithDevTools = !reduxDevTool ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})

  const appliedMiddlewares = [
    routerMiddleware(history),
    thunkMiddleware,
    loggerMiddleware,
  ]

  const middlewares = composeWithDevTools(applyMiddleware(...appliedMiddlewares))
  const store = createStore(rootReducer, initialState, middlewares)

  const persistor = persistStore(store)

  return {
    store,
    persistor,
  }
}

export default configureStore
