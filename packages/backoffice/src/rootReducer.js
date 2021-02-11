import { defaultFormioReducer } from '@project/react-formio'
import { combine } from '@project/redux-utils'
import { loaderReducer } from '@project/shared'
import { connectRouter } from 'connected-react-router'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { combineReducers } from 'redux'

export const rootReducers = (history) => combineReducers({
  router: connectRouter(history),
  toastr: toastrReducer,
  ...defaultFormioReducer,
  ...combine(
    loaderReducer('loader', { isActive: false })
  )
})
