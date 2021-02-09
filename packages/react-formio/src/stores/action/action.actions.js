import { createAction } from '@project/redux-utils'
import Formiojs from 'formiojs/Formio'
import get from 'lodash/get'
import noop from 'lodash/noop'
import { getActionUrl } from '../../utils/url'
import { getActionInfo } from '../action-info'
import { selectForm } from '../form'

const name = 'action'

export const clearActionError = createAction()
export const resetAction = createAction()
export const requestAction = createAction()
export const receiveAction = createAction()
export const failAction = createAction()
export const sendAction = createAction()

function getFormio (formId, id) {
  const url = getActionUrl(formId, id)
  return new Formiojs(url)
}

export const getAction = (formId, actionId, done = noop) =>
  async (dispatch) => {
    dispatch(clearActionError(name))
    dispatch(requestAction(name))

    const formio = getFormio(formId, actionId)

    try {
      const action = await formio.loadAction()

      dispatch(getActionInfo(formId, action.name))
      dispatch(receiveAction(name, { action }))
      done(null, action)
    } catch (error) {
      dispatch(failAction(name, { error }))
      done(error)
    }
  }

export const saveAction = (formId, action, done = noop) =>
  async (dispatch) => {
    dispatch(clearActionError(name))
    dispatch(sendAction(name, { action }))

    const formio = getFormio(formId, get(action, 'data._id', ''))

    try {
      const result = await formio.saveAction(action)
      dispatch(receiveAction(name, { action: result }))
      done(null, result)
    } catch (error) {
      dispatch(failAction(name, { error }))
      done(error)
    }
  }

export const deleteAction = (formId, actionId, done = noop) => {
  return async (dispatch, getState) => {
    dispatch(clearActionError(name))

    const state = getState()
    const path = formId.replace('__', '/')
    const form = selectForm('form', state)
    const resource = selectForm('resource', state)

    formId = (path === form.path ? form._id : resource._id) || formId

    const formio = getFormio(formId, actionId)

    try {
      await formio.deleteAction()
      dispatch(resetAction(name))
      done(null)
    } catch (error) {
      dispatch(failAction(name, { error }))
      done(error)
    }
  }
}
