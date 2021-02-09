import { failActions, receiveActions, requestActions, resetActions } from './actions.actions'
import { actionsReducer } from './actions.reducers'

describe('Actions reducers', () => {
  it('should return state (resetActions)', () => {
    const reducer = actionsReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(resetActions, state, payload)).toEqual({
      data: [],
      availableActions: [],
      error: null,
      isActive: false
    })
  })
  it('should return state (requestActions)', () => {
    const reducer = actionsReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(requestActions, state, payload)).toEqual({
      data: [],
      availableActions: [],
      error: null,
      isActive: true
    })
  })

  it('should return state (receiveActions)', () => {
    const reducer = actionsReducer()
    const state = {}
    const payload = {
      actions: [{ _id: 'id' }]
    }

    expect(reducer.$emit(receiveActions, state, payload)).toEqual({
      error: null,
      data: [{ _id: 'id' }],
      isActive: false
    })
  })

  it('should return state (failActions)', () => {
    const reducer = actionsReducer()
    const state = {}
    const payload = {
      error: new Error('message')
    }

    expect(reducer.$emit(failActions, state, payload)).toEqual({
      data: [],
      error: payload.error,
      isActive: false
    })
  })
})
