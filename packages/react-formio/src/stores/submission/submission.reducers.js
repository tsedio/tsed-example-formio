import { createReducer } from '@project/redux-utils'
import {
  clearSubmissionError, failSubmission,
  receiveSubmission,
  requestSubmission,
  resetSubmission,
  sendSubmission
} from './submission.actions'

const createInitialState = () => ({
  formId: '',
  id: '',
  isActive: false,
  lastUpdated: 0,
  submission: {},
  url: '',
  error: ''
})

export const submissionReducer = createReducer({
  [resetSubmission]: (state, payload, reset) => reset(),
  [clearSubmissionError]: (state) => ({
    ...state,
    error: null
  }),
  [requestSubmission]: (state, { formId, id, url }) => ({
    ...state,
    formId,
    id,
    url,
    data: {},
    isActive: true
  }),
  [sendSubmission]: (state, { formId, id, url }) => ({
    ...state,
    formId,
    id,
    url: url || state.url,
    data: {},
    isActive: true
  }),
  [receiveSubmission]: (state, { submission, url }) => ({
    ...state,
    data: submission,
    url: url || state.url,
    isActive: false,
    error: null
  }),
  [failSubmission]: (state, { error }) => ({
    ...state,
    isActive: false,
    error
  })
}, createInitialState)
