import { selectRoot } from '../root'

export const selectForm = (name, state) => selectRoot(name, state).data
