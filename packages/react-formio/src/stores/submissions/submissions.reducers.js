import { createReducer } from '@project/redux-utils'
import { failSubmissions, receiveSubmissions, requestSubmissions, resetSubmissions } from './submissions.actions'

export function createInitialState ({
                                      pageIndex = 0,
                                      pageSize = 10,
                                      query = {},
                                      select = '',
                                      sortBy = []
                                    } = {}) {
  return {
    error: '',
    formId: '',
    isActive: false,
    parameters: {
      pageSize,
      pageIndex,
      pageCount: 0,
      query,
      select,
      sortBy
    },
    data: []
  }
}

export const submissionsReducer = createReducer({
  [resetSubmissions] (state, payload, reset) {
    return reset()
  },
  [requestSubmissions] (state, { parameters, formId }) {
    return {
      ...state,
      formId,
      parameters: {
        ...state.parameters,
        ...parameters
      },
      error: null,
      data: [],
      isActive: true
    }
  },
  [receiveSubmissions] (state, { submissions }) {
    const total = submissions.serverCount
    const pageCount = Math.ceil(total / (state.pageSize || 10))

    delete submissions.serverCount

    return {
      ...state,
      data: submissions,
      isActive: false,
      parameters: {
        ...state.parameters,
        pageCount,
        totalLength: total
      }
    }
  },
  [failSubmissions] (state, { error }) {
    return {
      ...state,
      error,
      isActive: false
    }
  }
}, createInitialState)