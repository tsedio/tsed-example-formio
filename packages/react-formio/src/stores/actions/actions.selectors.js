import { selectRoot } from '../root'

export const selectActions = (state) => selectRoot('actions', state).data
export const selectAvailableActions = (state) => selectRoot('actions', state).availableActions
