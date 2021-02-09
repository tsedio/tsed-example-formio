import { createAction } from '@project/redux-utils'
import Formiojs from 'formiojs/Formio'
import noop from 'lodash/noop'
import { getFormUrl } from '../../utils/url'
import { getActions } from '../actions'
import { selectForm } from './form.selectors'

export const clearFormError = createAction()
export const requestForm = createAction()
export const receiveForm = createAction()
export const failForm = createAction()
export const resetForm = createAction()
export const sendForm = createAction()

function shouldGet (form, id) {
  return form && form.components && Array.isArray(form.components) && form.components.length && form._id === id
}

export const getForm = (name, id = '', done = noop) =>
  async (dispatch, getState) => {
    dispatch(clearFormError(name))
    // Check to see if the form is already loaded.
    const form = selectForm(name, getState())

    if (shouldGet(form, id)) {
      return
    }

    const url = getFormUrl(id)
    const formio = new Formiojs(url)

    dispatch(requestForm(name, { id, url }))

    try {
      const form = await formio.loadForm()

      dispatch(receiveForm(name, { form, url }))
      dispatch(getActions(form._id))
      done(null, form)
    } catch (error) {
      dispatch(failForm(name, { error }))
      done({ error })
    }
  }

export const saveForm = (name, form, done = noop) =>
  async (dispatch) => {
    dispatch(clearFormError(name))
    dispatch(sendForm(name, { form }))

    const id = form._id || ''
    const url = getFormUrl(id)
    const formio = new Formiojs(url)

    try {
      const result = await formio.saveForm(form)
      dispatch(receiveForm(name, { form: result, url: getFormUrl(result._id) }))
      done(null, result)
    } catch (error) {
      dispatch(failForm(name, { error }))
      done(error)
    }
  }

export const deleteForm = (name, id, done = noop) =>
  async (dispatch) => {
    dispatch(clearFormError(name))
    const url = getFormUrl(id)
    const formio = new Formiojs(url)

    try {
      await formio.deleteForm()
      dispatch(resetForm(name))
      done()
    } catch (error) {
      dispatch(failForm(name, { error }))
      done({ error })
    }
  }
