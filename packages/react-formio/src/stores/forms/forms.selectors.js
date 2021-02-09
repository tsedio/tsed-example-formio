import { selectRoot } from '../root'

export const selectForms = (name, state) => selectRoot(name, state).data
export const selectFormsParameters = (name, state) => selectRoot(name, state).parameters
