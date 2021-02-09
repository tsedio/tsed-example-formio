import { createAction } from '@project/redux-utils'
import Formiojs from 'formiojs/Formio'
import noop from 'lodash/noop'
import { getSubmissionUrl } from '../../utils/url'

export const clearSubmissionError = createAction()
export const requestSubmission = createAction()
export const sendSubmission = createAction()
export const receiveSubmission = createAction()
export const failSubmission = createAction()
export const resetSubmission = createAction()

export const getSubmission = (name, formId, id, done = noop) =>
  async (dispatch, getState) => {
    // Check to see if the submission is already loaded.
    if (getState().id === id) {
      return
    }

    const url = getSubmissionUrl(formId, id)
    const formio = new Formiojs(url)

    dispatch(clearSubmissionError(name))
    dispatch(requestSubmission(name, { id, formId, url }))

    try {
      const result = await formio.loadSubmission()

      dispatch(receiveSubmission(name, { submission: result, url }))
      done(null, result)
    } catch (error) {
      dispatch(failSubmission(name, { error }))
      done(error)
    }
  }

export const saveSubmission = (name, formId, data, done = noop) =>
  async (dispatch) => {
    dispatch(clearSubmissionError(name))
    dispatch(sendSubmission(name, { submission: data, formId }))

    const id = data._id
    const url = getSubmissionUrl(formId, id)
    const formio = new Formiojs(url)

    try {
      const result = await formio.saveSubmission(data)
      dispatch(receiveSubmission(name, {
        submission: result,
        url: getSubmissionUrl(formId, result._id)
      }))
      done(null, result)
    } catch (error) {
      dispatch(failSubmission(name, { error }))
      done(error)
    }
  }

export const deleteSubmission = (name, formId, id, done = noop) =>
  async (dispatch) => {
    dispatch(clearSubmissionError(name))

    const url = getSubmissionUrl(formId, id)
    const formio = new Formiojs(url)

    try {
      await formio.deleteSubmission()
      dispatch(resetSubmission(name))
      done(null)
    } catch (error) {
      dispatch(failSubmission(name, { error }))
      done(error)
    }
  }
