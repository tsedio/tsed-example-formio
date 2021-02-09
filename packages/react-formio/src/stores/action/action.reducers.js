import { createReducer } from '@project/redux-utils'
import { clearActionError, failAction, receiveAction, requestAction, resetAction, sendAction } from './action.actions'

const createInitialState = () => ({
  error: null,
  data: {},
  isActive: false
})

export const actionReducer = createReducer({
  [resetAction]: (_, _2, reset) => reset(),
  [clearActionError]: (state) => ({
    ...state,
    error: null
  }),
  [requestAction]: (state) => ({
    ...state,
    error: null,
    data: {},
    isActive: true
  }),
  [sendAction]: (state, { action }) => ({
    ...state,
    error: null,
    data: action,
    isActive: true
  }),
  [receiveAction]: (state, { action }) => ({
    ...state,
    error: null,
    data: action,
    isActive: false
  }),
  [failAction]: (state, { error }) => ({
    ...state,
    data: {},
    error,
    isActive: false
  })
}, createInitialState)
