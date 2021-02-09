import Formiojs from 'formiojs/Formio'
import {
  clearSubmissionError,
  deleteSubmission,
  failSubmission,
  getSubmission,
  receiveSubmission,
  requestSubmission,
  resetSubmission,
  saveSubmission,
  sendSubmission
} from './submission.actions'

jest.mock('formiojs/Formio')

describe('Submission actions', () => {
  describe('getSubmission', () => {
    beforeEach(() => {
      Formiojs.mockClear()
    })
    it('should return a result', async () => {
      // GIVEN
      Formiojs.prototype.loadSubmission.mockReturnValue(Promise.resolve({}))

      const dispatch = jest.fn()
      const name = 'name'
      const id = '123454'
      const formId = 'formId'

      const getState = () => ({
        [name]: {}
      })

      // WHEN
      await new Promise((resolve) => getSubmission(name, formId, id, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('/formId/submission/123454')
      expect(Formiojs.prototype.loadSubmission).toHaveBeenCalledWith()
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: requestSubmission.toString(),
        payload: {
          formId: 'formId',
          id: '123454',
          url: '/formId/submission/123454'
        }
      })
      expect(dispatch).toHaveBeenCalledWith({
        type: receiveSubmission.toString(),
        name: 'name',
        payload: {
          submission: {},
          url: '/formId/submission/123454'
        }
      })
    })
    it('should do nothing when submission is already loaded', async () => {
      // GIVEN
      Formiojs.prototype.loadSubmission.mockReturnValue(Promise.resolve({}))

      const dispatch = jest.fn()
      const name = 'name'
      const id = '123454'
      const formId = 'formId'

      const getState = () => ({
        id
      })

      // WHEN
      await getSubmission(name, formId, id)(dispatch, getState)

      // THEN
      expect(Formiojs).not.toHaveBeenCalled()
    })
    it('should throw error', async () => {
      // GIVEN
      Formiojs.prototype.loadSubmission.mockReturnValue(Promise.reject(new Error('message')))

      const dispatch = jest.fn()
      const name = 'name'
      const id = '123454'
      const formId = 'formId'

      const getState = () => ({
        [name]: {}
      })

      // WHEN
      await new Promise((resolve) => getSubmission(name, formId, id, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('/formId/submission/123454')
      expect(Formiojs.prototype.loadSubmission).toHaveBeenCalledWith()
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: failSubmission.toString(),
        payload: {
          error: new Error('message')
        }
      })
    })
  })
  describe('saveSubmission', () => {
    it('should return a result', async () => {
      // GIVEN
      const dispatch = jest.fn()
      const name = 'name'
      const data = { _id: '123454' }
      const formId = 'formId'
      const getState = () => ({
        [name]: {}
      })

      Formiojs.prototype.saveSubmission.mockReturnValue(Promise.resolve(data))
      // WHEN
      await new Promise((resolve) => saveSubmission(name, formId, data, resolve)(dispatch, getState))

      // THEN
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: clearSubmissionError.toString()
      })
      expect(Formiojs).toHaveBeenCalledWith('/formId/submission/123454')
      expect(Formiojs.prototype.saveSubmission).toHaveBeenCalledWith(data)
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: sendSubmission.toString(),
        payload: {
          formId,
          submission: { _id: '123454' }
        }
      })
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        payload: {
          url: '/formId/submission/123454',
          submission: data
        },
        type: receiveSubmission.toString()
      })
    })
    it('should throw error', async () => {
      // GIVEN
      Formiojs.prototype.saveSubmission.mockImplementation(() => {
        throw new Error('message')
      })

      const dispatch = jest.fn()
      const name = 'name'
      const data = { _id: '123454' }
      const formId = 'formId'

      const getState = () => ({
        [name]: {}
      })

      // WHEN
      await new Promise((resolve) => saveSubmission(name, formId, data, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('/formId/submission/123454')
      expect(Formiojs.prototype.saveSubmission).toHaveBeenCalledWith(data)
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: failSubmission.toString(),
        payload: {
          error: new Error('message')
        }
      })
    })
  })
  describe('deleteSubmission', () => {
    it('should return a result', async () => {
      // GIVEN
      Formiojs.prototype.deleteSubmission.mockReturnValue(Promise.resolve({}))

      const dispatch = jest.fn()
      const name = 'name'
      const id = '123454'
      const formId = 'formId'
      const getState = () => ({
        [name]: {}
      })

      // WHEN
      await new Promise((resolve) => deleteSubmission(name, formId, id, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('/formId/submission/123454')
      expect(Formiojs.prototype.deleteSubmission).toHaveBeenCalledWith()
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: resetSubmission.toString()
      })
    })
    it('should throw error', async () => {
      // GIVEN
      Formiojs.prototype.deleteSubmission.mockImplementation(() => {
        throw new Error('message')
      })
      const dispatch = jest.fn()
      const name = 'name'
      const id = '123454'
      const formId = 'formId'

      const getState = () => ({
        [name]: {}
      })

      // WHEN
      await new Promise((resolve) => deleteSubmission(name, formId, id, resolve)(dispatch, getState))

      // THEN
      expect(Formiojs).toHaveBeenCalledWith('/formId/submission/123454')
      expect(Formiojs.prototype.deleteSubmission).toHaveBeenCalledWith()
      expect(dispatch).toHaveBeenCalledWith({
        name: 'name',
        type: failSubmission.toString(),
        payload: {
          error: new Error('message')
        }
      })
    })
  })
})
