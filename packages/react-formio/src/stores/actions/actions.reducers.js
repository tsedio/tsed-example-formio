import { createReducer } from '@project/redux-utils'
import { failActions, receiveActions, requestActions, resetActions } from './actions.actions'

const createInitialState = () => ({
  error: null,
  data: [],
  availableActions: [],
  isActive: false
})

export const actionsReducer = createReducer({
  [resetActions]: (_, _2, reset) => {
    return reset()
  },
  [requestActions]: (state) => ({
    ...state,
    error: null,
    data: [],
    availableActions: [],
    isActive: true
  }),
  [receiveActions]: (state, { actions, availableActions }) => ({
    ...state,
    error: null,
    data: actions,
    availableActions,
    isActive: false
  }),
  [failActions]: (state, { error }) => ({
    ...state,
    error,
    data: [],
    isActive: false
  })
}, createInitialState)
