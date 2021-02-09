import { failSubmissions, receiveSubmissions, requestSubmissions, resetSubmissions } from './submissions.actions'
import { submissionsReducer } from './submissions.reducers'

describe('Submissions reducers', () => {
  it('should return state (resetSubmissions)', () => {
    const reducer = submissionsReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(resetSubmissions, state, payload)).toEqual({
      error: '',
      data: [],
      isActive: false,
      formId: '',
      parameters: {
        pageCount: 0,
        pageIndex: 0,
        pageSize: 10,
        query: {},
        select: '',
        sortBy: []
      }
    })
  })
  it('should return state (requestSubmissions)', () => {
    const reducer = submissionsReducers()
    const state = {}
    const payload = {
      parameters: {
        pageSize: 10,
        pageIndex: 1,
        sortBy: [],
        filters: [],
        filterId: 'id',
        select: 'select'
      }
    }

    expect(reducer.$emit(requestSubmissions, state, payload)).toEqual({
      error: null,
      formId: undefined,
      parameters: {
        filterId: 'id',
        filters: [],
        pageIndex: 1,
        pageSize: 10,
        select: 'select',
        sortBy: []
      },
      data: [],
      isActive: true
    })
  })
  it('should return state (receiveSubmissions)', () => {
    const reducer = submissionsReducer()
    const state = {
      parameters: {
        pageSize: 10
      }
    }
    const payload = {
      submissions:  [
        { _id: 'id' }
      ],
      url: 'url',
      success: 'success'
    }
    payload.submissions.serverCount = 100

    expect(reducer.$emit(receiveSubmissions, state, payload)).toEqual({
      data: [
        {
          _id: 'id'
        }
      ],
      isActive: false,
      parameters: {
        pageCount: 10,
        pageSize: 10,
        totalLength: 100
      }
    })
  })
  it('should return state (failSubmissions)', () => {
    const reducer = submissionsReducer()
    const state = {}
    const payload = {
      error: new Error('message')
    }

    expect(reducer.$emit(failSubmissions, state, payload)).toEqual({
      error: payload.error,
      isActive: false
    })
  })
})
