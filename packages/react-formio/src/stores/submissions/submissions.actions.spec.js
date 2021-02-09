import Formiojs from 'formiojs/Formio'
import { mapRequestParams } from '../../utils/mapRequestParams'
import { failSubmissions, getSubmissions, receiveSubmissions, requestSubmissions } from './submissions.actions'

jest.mock('formiojs/Formio')
jest.mock('../../utils/mapRequestParams')

describe('Submissions actions', () => {
  beforeEach(() => {
    mapRequestParams.mockImplementation(o => o)
  })
  describe('getSubmissions', () => {
    it('should return a result', async () => {
      // GIVEN
      Formiojs.prototype.loadSubmissions.mockReturnValue(Promise.resolve([{}]))
      Formiojs.getProjectUrl.mockReturnValue('https://formio')
      const dispatch = jest.fn()
      const name = 'name'
      const formId = 'formId'
      const parameters = {
        pageSize: 10,
        pageIndex: 0
      }

      const getState = () => ({
        [name]: {
          parameters
        }
      })

      // WHEN
      await new Promise((resolve) => getSubmissions(name, formId, parameters, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('https://formio/formId/submission')
      expect(Formiojs.prototype.loadSubmissions).toHaveBeenCalledWith({
        params: parameters
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: requestSubmissions.toString(),
        payload: {
          formId,
          parameters
        }
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        payload: {
          submissions: [{}]
        },
        type: receiveSubmissions.toString()
      })
    })
    it('should return a error', async () => {
      // GIVEN
      Formiojs.prototype.loadSubmissions.mockReturnValue(Promise.reject(new Error('message')))
      Formiojs.getProjectUrl.mockReturnValue('https://formio')

      const dispatch = jest.fn()
      const name = 'name'
      const formId = 'formId'
      const parameters = {
        pageSize: 10,
        pageIndex: 0
      }

      const getState = () => ({
        [name]: {
          parameters
        }
      })

      // WHEN
      await new Promise((resolve) => getSubmissions(name, formId, parameters, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('https://formio/formId/submission')
      expect(Formiojs.prototype.loadSubmissions).toHaveBeenCalledWith({
        params: parameters
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: requestSubmissions.toString(),
        payload: {
          formId,
          parameters
        }
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        payload: { error: new Error('message') },
        type: failSubmissions.toString()
      })
    })
  })
})
