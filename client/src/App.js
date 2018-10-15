import React from 'react'

import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { setAutoFreeze } from 'immer'

import { StoreService } from 'services'

import Root from 'containers/Root'

import configureStore from './configureStore'

const history = createHistory()

const { store, persistor } = configureStore({}, history)

StoreService.setStore(store)

setAutoFreeze(false)

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
)

export default App
