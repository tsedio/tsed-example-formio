import Formiojs from 'formiojs/Formio'
import noop from 'lodash/noop'
import { createAction } from '../../../../redux-utils'
import { getFormUrl } from '../../utils/url'

export const resetActionInfo = createAction()
export const requestActionInfo = createAction()
export const receiveActionInfo = createAction()
export const failActionInfo = createAction()

const name = 'actionInfo'

export const getActionInfo = (formId, actionType, done = noop) => async (dispatch, getState) => {
  dispatch(requestActionInfo(name))

  const url = getFormUrl(formId)
  const formio = new Formiojs(url)

  try {
    const actionInfo = await formio.actionInfo(actionType)

    actionInfo.settingsForm.action = Formiojs.getProjectUrl() + actionInfo.settingsForm.action

    dispatch(receiveActionInfo(name, { actionInfo }))
    done(null, actionInfo)
  } catch (error) {
    dispatch(failActionInfo(name, { error }))
    done(error)
  }
}
