import { failForms, receiveForms, requestForms, resetForms } from './forms.actions'
import { formsReducer } from './forms.reducers'

describe('Forms reducer', () => {
  it('should return state (resetForms)', () => {
    const reducer = formsReducer()
    const state = {}
    const payload = {}

    expect(reducer.$emit(resetForms, state, payload)).toEqual({
      error: '',
      data: [],
      isActive: false,
      parameters: {
        filters: [],
        pageCount: 0,
        pageIndex: 0,
        pageSize: 10,
        query: {},
        select: '',
        sortBy: []
      }
    })
  })
  it('should return state (requestForms)', () => {
    const reducer = formsReducer()
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

    expect(reducer.$emit(requestForms, state, payload)).toEqual({
      error: null,
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
  it('should return state (receiveForms)', () => {
    const reducer = formsReducer()
    const state = {
      parameters: {
        pageSize: 10
      }
    }
    const payload = {
      forms:  [
        { _id: 'id' }
      ],
      url: 'url',
      success: 'success'
    }
    payload.forms.serverCount = 100

    expect(reducer.$emit(receiveForms, state, payload)).toEqual({
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
  it('should return state (failForms)', () => {
    const reducer = formsReducer()
    const state = {}
    const payload = {
      error: new Error('message')
    }

    expect(reducer.$emit(failForms, state, payload)).toEqual({
      error: payload.error,
      isActive: false
    })
  })
})
