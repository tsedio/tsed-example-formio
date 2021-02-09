import { selectRoot } from '../root'

export const selectSubmissions = (name, state) => selectRoot(name, state).data
export const selectSubmissionsParameters = (name, state) => selectRoot(name, state).parameters
