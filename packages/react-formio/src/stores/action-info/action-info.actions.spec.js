import Formiojs from 'formiojs/Formio'
import { getActionInfo, receiveActionInfo, requestActionInfo } from './action-info.actions'

jest.mock('formiojs/Formio')

describe('ActionInfo actions', () => {
  describe('getAction', () => {
    it('should get action', async () => {
      const formId = 'formId'
      const actionType = 'oidc'
      const dispatch = jest.fn()

      Formiojs.getProjectUrl.mockReturnValue('http://localhost')
      Formiojs.prototype.actionInfo.mockReturnValue({
        _id: 'actionId',
        name: 'oidc',
        settingsForm: {
          action: '/action'
        }
      })

      await getActionInfo(formId, actionType)(dispatch)

      expect(dispatch).toHaveBeenCalledWith({
        type: requestActionInfo.toString(),
        name: 'actionInfo'
      })
      expect(Formiojs).toHaveBeenCalledWith('http://localhost/formId')
      expect(Formiojs.prototype.actionInfo).toHaveBeenCalledWith('oidc')
      expect(dispatch).toHaveBeenCalledWith({
        type: receiveActionInfo.toString(),
        name: 'actionInfo',
        payload: {
          actionInfo: {
            _id: 'actionId',
            name: 'oidc',
            settingsForm: {
              action: 'http://localhost/action'
            }
          }
        }
      })
    })
  })
})
