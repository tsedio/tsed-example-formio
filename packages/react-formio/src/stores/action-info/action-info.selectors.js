import { selectRoot } from '../root'

export const selectActionInfo = (state) => selectRoot('actionInfo', state).data
