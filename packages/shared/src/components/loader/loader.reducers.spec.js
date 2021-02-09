import reducer from './loader.reducers'
import { hideLoader, showLoader } from './loader.actions'

const loaderReducer = reducer('loader')

describe('Loader reducer', () => {
  it('should hide loader', () => {
    // GIVEN

    // WHEN
    const state = loaderReducer.loader({}, hideLoader('loader'))

    // THEN
    expect(state).toEqual({
      name: 'loader',
      isActive: false
    })
  })

  it('should show loader', () => {
    // GIVEN

    // WHEN
    const state = loaderReducer.loader({}, showLoader('loader'))

    // THEN
    expect(state).toEqual({
      name: 'loader',
      isActive: true
    })
  })
})
