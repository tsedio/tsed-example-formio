import { createReducer } from '../../utils/redux'
import { hideLoader, showLoader } from './loader.actions'

const createInitialState = (options = {}) => ({
  isActive: false,
  ...options
})

export const loaderReducer = createReducer({
  [hideLoader] (state) {
    return {
      ...state,
      isActive: false
    }
  },
  [showLoader] (state) {
    return {
      ...state,
      isActive: true
    }
  }
}, createInitialState)
