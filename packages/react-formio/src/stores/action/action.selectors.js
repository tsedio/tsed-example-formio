import { selectRoot } from '../root'

export const selectAction = (state) => selectRoot('action', state).data
