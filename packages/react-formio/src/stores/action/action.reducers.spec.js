import { clearActionError, failAction, receiveAction, requestAction, resetAction, sendAction } from './action.actions'
import { actionReducer } from './action.reducers'

describe('Action reducer', () => {
  it('should return state (resetAction)', () => {
    const reducer = actionReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(resetAction, state, payload)).toEqual({
      data: {},
      error: null,
      isActive: false
    })
  })

  it('should return state (clearActionError)', () => {
    const reducer = actionReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(clearActionError, state, payload)).toEqual({
      error: null
    })
  })

  it('should return state (requestAction)', () => {
    const reducer = actionReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(requestAction, state, payload)).toEqual({
      data: {},
      error: null,
      isActive: true
    })
  })

  it('should return state (sendAction)', () => {
    const reducer = actionReducer()
    const state = {}
    const payload = {
      action: {
        _id: 'id'
      }
    }

    expect(reducer.$emit(sendAction, state, payload)).toEqual({
      data: {
        _id: 'id'
      },
      error: null,
      isActive: true
    })
  })

  it('should return state (receiveAction)', () => {
    const reducer = actionReducer()
    const state = {}
    const payload = {
      action: { _id: 'id' }
    }

    expect(reducer.$emit(receiveAction, state, payload)).toEqual({
      error: null,
      data: { _id: 'id' },
      isActive: false
    })
  })

  it('should return state (failAction)', () => {
    const reducer = actionReducer()
    const state = {}
    const payload = {
      error: new Error('message')
    }

    expect(reducer.$emit(failAction, state, payload)).toEqual({
      data: {},
      error: payload.error,
      isActive: false
    })
  })
})
