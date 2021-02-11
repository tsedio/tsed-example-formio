import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { rootReducers } from './rootReducer'

export const history = createBrowserHistory({
  basename: process.env.NODE_ENV === 'development' ? '/' : process.env.PUBLIC_URL
})

const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

export default function configureStore (preloadedState) {
  return createStore(
    rootReducers(history),
    preloadedState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
}
