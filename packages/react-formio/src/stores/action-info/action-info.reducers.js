import { createReducer } from '../../../../redux-utils'
import { failActionInfo, receiveActionInfo, requestActionInfo, resetActionInfo } from './action-info.actions'

const createInitialState = () => ({
  error: null,
  data: {},
  isActive: false
})

export const actionInfoReducer = createReducer({
  [resetActionInfo]: (_, _2, reset) => {
    return reset()
  },
  [requestActionInfo]: (state) => ({
    ...state,
    error: null,
    data: {},
    isActive: true
  }),
  [receiveActionInfo]: (state, { actionInfo }) => ({
    ...state,
    error: null,
    data: actionInfo,
    isActive: false
  }),
  [failActionInfo]: (state, { error }) => ({
    ...state,
    data: {},
    error,
    isActive: false
  })
}, createInitialState)
