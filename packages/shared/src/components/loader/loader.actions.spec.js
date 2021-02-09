import { hideLoader, showLoader } from './loader.actions'

describe('Loader actions', () => {
  describe('showLoader()', () => {
    it('should return action data', () => {
      expect(showLoader('loader')).toEqual({
        'name': 'loader',
        'type': 'HIDE_LOADER'
      })
    })
  })
  describe('hideLoader()', () => {
    it('should return action data', () => {
      expect(hideLoader('loader')).toEqual({
        'name': 'loader',
        'type': 'SHOW_LOADER'
      })
    })
  })
})