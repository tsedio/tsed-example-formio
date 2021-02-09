import { createAction } from '@project/redux-utils'
import Formiojs from 'formiojs/Formio'
import noop from 'lodash/noop'
import { mapRequestParams } from '../../utils/mapRequestParams'
import { getSubmissionUrl } from '../../utils/url'
import { selectSubmissionsParameters } from './submissions.selectors'

export const resetSubmissions = createAction()
export const requestSubmissions = createAction()
export const receiveSubmissions = createAction()
export const failSubmissions = createAction()

export const getSubmissions = (name, formId, parameters = {}, done = noop) =>
  async (dispatch, getState) => {
    dispatch(requestSubmissions(name, { formId, parameters }))

    const url = getSubmissionUrl(formId)
    const formio = new Formiojs(url)
    const requestParams = mapRequestParams(selectSubmissionsParameters(name, getState()))

    try {
      const submissions = await formio.loadSubmissions({ params: requestParams })
      dispatch(receiveSubmissions(name, { submissions }))
      done(null, submissions)
    } catch (error) {
      dispatch(failSubmissions(name, { error }))
      done(error)
    }
  }
