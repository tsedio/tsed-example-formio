import { initAuth } from '@project/react-formio'
import '@project/shared'
import { ConnectedRouter } from 'connected-react-router'
import 'formiojs'
import { Formio } from 'formiojs'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import App from './App'
import { Config } from './config'
import reportWebVitals from './reportWebVitals'
import configureStore, { history } from './store'

Formio.setProjectUrl(Config.formioUrl)
Formio.setBaseUrl(Config.apiUrl)

const store = configureStore({
  loader: {
    isActive: true
  }
})

store.dispatch(initAuth())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div>
        <ConnectedRouter history={history}>
          <div>
            <App/>
          </div>
        </ConnectedRouter>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          getState={(state) => state.toastr} // This is the default
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick/>
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
