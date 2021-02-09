import Formiojs from 'formiojs/Formio'
import { mapRequestParams } from '../../utils/mapRequestParams'
import { failForms, getForms, receiveForms, requestForms } from './forms.actions'

jest.mock('formiojs/Formio')
jest.mock('../../utils/mapRequestParams')

describe('Forms actions', () => {
  beforeEach(() => {
    mapRequestParams.mockImplementation(o => o)
  })
  afterEach(() => jest.resetAllMocks())
  describe('getForms', () => {
    it('should return a result', async () => {
      // GIVEN
      Formiojs.prototype.loadForms.mockReturnValue(Promise.resolve([{}]))
      Formiojs.getProjectUrl.mockReturnValue('https://formio')
      const dispatch = jest.fn()
      const name = 'name'
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
      await new Promise((resolve) => getForms(name, parameters, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('https://formio/form')
      expect(Formiojs.prototype.loadForms).toHaveBeenCalledWith({
        params: parameters
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: requestForms.toString(),
        payload: { parameters }
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        payload: {
          forms: [{}]
        },
        type: receiveForms.toString()
      })
    })
    it('should return a error', async () => {
      // GIVEN
      Formiojs.prototype.loadForms.mockReturnValue(Promise.reject(new Error('message')))
      Formiojs.getProjectUrl.mockReturnValue('https://formio')

      const dispatch = jest.fn()
      const name = 'name'
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
      await new Promise((resolve) => getForms(name, parameters, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('https://formio/form')
      expect(Formiojs.prototype.loadForms).toHaveBeenCalledWith({
        params: parameters
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: requestForms.toString(),
        payload: { parameters }
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        payload: { error: new Error('message') },
        type: failForms.toString()
      })
    })
  })
})
