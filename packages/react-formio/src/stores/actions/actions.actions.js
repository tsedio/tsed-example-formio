import { createAction } from '@project/redux-utils'
import Formiojs from 'formiojs/Formio'
import noop from 'lodash/noop'
import { getFormUrl } from '../../utils/url'

export const resetActions = createAction()
export const requestActions = createAction()
export const receiveActions = createAction()
export const failActions = createAction()

const name = 'actions'

export const getActions = (id, done = noop) => async (dispatch) => {
  dispatch(resetActions(name))
  dispatch(requestActions(name))

  const url = getFormUrl(id)
  const formio = new Formiojs(url)

  try {
    const [actions, availableActions] = await Promise.all([
      formio.loadActions({ params: {} }),
      formio.availableActions({ params: {} })
    ])

    dispatch(receiveActions(name, { actions, availableActions }))
    done(null, actions, availableActions)
  } catch (error) {
    dispatch(failActions(name, { error }))
    done(error)
  }
}
