import { clearFormError, failForm, receiveForm, requestForm, resetForm } from './form.actions'
import { formReducer } from './form.reducers'

describe('Form reducer', () => {
  it('should return state (resetForm)', () => {
    const reducer = formReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(resetForm, state, payload)).toEqual({
      error: '',
      data: {},
      id: '',
      isActive: false,
      lastUpdated: 0,
      url: ''
    })
  })
  it('should return state (clearFormError)', () => {
    const reducer = formReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(clearFormError, state, payload)).toEqual({
      error: ''
    })
  })
  it('should return state (requestForm)', () => {
    const reducer = formReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(requestForm, state, payload)).toEqual({
      error: '',
      data: {},
      isActive: true
    })
  })

  it('should return state (receiveForm)', () => {
    const reducer = formReducer()
    const state = {}
    const payload = {
      form: {
        _id: 'id'
      },
      url: 'url'
    }

    expect(reducer.$emit(receiveForm, state, payload)).toEqual({
      error: '',
      data: {
        _id: 'id'
      },
      id: 'id',
      isActive: false,
      url: 'url'
    })
  })

  it('should return state (failForm)', () => {
    const reducer = formReducer()
    const state = {}
    const payload = {
      error: new Error('message')
    }

    expect(reducer.$emit(failForm, state, payload)).toEqual({
      error: payload.error,
      isActive: false
    })
  })
})
