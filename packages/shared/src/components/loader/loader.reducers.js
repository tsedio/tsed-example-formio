import { createReducer } from '@clubmed/components'
import { HIDE_LOADER, SHOW_LOADER } from './loader.actions'

const createInitialState = () => ({
  isActive: false
})

const reducers = {
  [HIDE_LOADER] (state) {
    return {
      ...state,
      isActive: false
    }
  },
  [SHOW_LOADER] (state) {
    return {
      ...state,
      isActive: true
    }
  }
}

export default createReducer(createInitialState, reducers)
