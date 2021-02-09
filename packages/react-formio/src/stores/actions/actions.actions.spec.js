import Formiojs from 'formiojs/Formio'
import { getActions, receiveActions, requestActions, resetActions } from './actions.actions'

jest.mock('formiojs/Formio')

describe('Actions actions', () => {
  describe('getActions', () => {
    it('should return a result', async () => {
      const formId = 'formId'
      const actionId = 'actionId'
      const dispatch = jest.fn()

      Formiojs.prototype.loadActions.mockReturnValue([{
        _id: actionId,
        name: 'oidc'
      }])
      Formiojs.prototype.availableActions.mockReturnValue([{
        name: 'oidc'
      }])

      await getActions(formId)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: resetActions.toString(),
        name: 'actions'
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: requestActions.toString(),
        name: 'actions'
      })

      expect(Formiojs).toHaveBeenCalledWith('/formId')
      expect(Formiojs.prototype.loadActions).toHaveBeenCalledWith({ params: {} })
      expect(Formiojs.prototype.availableActions).toHaveBeenCalledWith({ params: {} })

      expect(dispatch).toHaveBeenCalledWith({
        type: receiveActions.toString(),
        name: 'actions',
        payload: {
          actions: [
            {
              _id: actionId,
              name: 'oidc'
            }
          ],
          availableActions: [
            {
              name: 'oidc'
            }
          ]
        }
      })
    })
  })
})
