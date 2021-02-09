import { createReducer } from '@project/redux-utils'
import { clearFormError, failForm, receiveForm, requestForm, resetForm, sendForm } from './form.actions'

const createInitialState = () => ({
  id: '',
  isActive: false,
  lastUpdated: 0,
  data: {},
  url: '',
  error: ''
})

export const formReducer = createReducer({
  [resetForm]: (state, payload, reset) => reset(),
  [clearFormError]: (state) => ({
    ...state,
    error: ''
  }),
  [requestForm]: (state, { id, url }) => ({
    ...state,
    isActive: true,
    id,
    url,
    data: {},
    error: ''
  }),
  [receiveForm]: (state, { form, url }) => ({
    ...state,
    isActive: false,
    id: form._id,
    data: form,
    url: url || state.url,
    error: ''
  }),
  [failForm]: (state, payload) => ({
    error: payload.error,
    isActive: false
  }),
  [sendForm]: (state) => ({
    ...state,
    isActive: true
  })
}, createInitialState)
