import { createReducer } from '@project/redux-utils'
import { failForms, receiveForms, requestForms, resetForms } from './forms.actions'

const createInitialState = ({ pageIndex = 0, pageSize = 10, query = {}, select = '', sortBy = [] } = {}) => {
  return ({
    error: '',
    isActive: false,
    parameters: {
      pageSize,
      pageIndex,
      pageCount: 0,
      query,
      select,
      sortBy,
      filters: [],
    },
    data: []
  })
}

export const formsReducer = createReducer({
  [resetForms]: (state, payload, reset) => {
    return reset()
  },
  [requestForms]: (state, { parameters }) => {
    return {
      ...state,
      parameters: {
        ...state.parameters,
        ...parameters
      },
      error: null,
      data: [],
      isActive: true
    }
  },
  [receiveForms]: (state, { forms }) => {
    const total = forms.serverCount
    const pageCount = Math.ceil(total / (state.pageSize || 10))

    delete forms.serverCount

    return {
      ...state,
      data: forms,
      isActive: false,
      parameters: {
        ...state.parameters,
        pageCount,
        totalLength: total
      }
    }
  },
  [failForms]: (state, { error }) => {
    return {
      ...state,
      error,
      isActive: false
    }
  }
}, createInitialState)
