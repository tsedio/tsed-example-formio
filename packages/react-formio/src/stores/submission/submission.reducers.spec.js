import {
  failSubmission,
  receiveSubmission,
  requestSubmission,
  resetSubmission,
  sendSubmission
} from './submission.actions'
import { submissionReducer } from './submission.reducers'

describe('Submission reducers', () => {
  it('should return state (resetSubmission)', () => {
    const reducer = submissionReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(resetSubmission, state, payload)).toEqual({
      error: '',
      formId: '',
      id: '',
      isActive: false,
      lastUpdated: 0,
      submission: {},
      url: ''
    })
  })
  it('should return state (requestSubmission)', () => {
    const reducer = submissionReducer()
    const state = {}
    const payload = {
      formId: 'formId',
      id: 'id',
      url: 'url'
    }

    expect(reducer.$emit(requestSubmission, state, payload)).toEqual({
      formId: 'formId',
      id: 'id',
      isActive: true,
      data: {},
      url: 'url'
    })
  })

  it('should return state (sendSubmission)', () => {
    const reducer = submissionReducer()
    const state = {}
    const payload = {
      formId: 'formId',
      id: 'id',
      url: 'url'
    }

    expect(reducer.$emit(sendSubmission, state, payload)).toEqual({
      formId: 'formId',
      id: 'id',
      isActive: true,
      data: {},
      url: 'url'
    })
  })

  it('should return state (receiveSubmission)', () => {
    const reducer = submissionReducer()
    const state = {}
    const payload = {
      formId: 'formId',
      id: 'id',
      url: 'url',
      submission: {
        _id: 'id'
      }
    }

    expect(reducer.$emit(receiveSubmission, state, payload)).toEqual({
      url: 'url',
      error: null,
      isActive: false,
      data: {
        _id: 'id'
      }
    })
  })

  it('should return state (failSubmission)', () => {
    const reducer = submissionReducer()
    const state = {}
    const payload = {
      error: new Error('message')
    }

    expect(reducer.$emit(failSubmission, state, payload)).toEqual({
      error: payload.error,
      isActive: false
    })
  })
})
