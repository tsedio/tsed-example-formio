export const selectRoot = (name, state) => state[name]
export const selectError = (name, state) => selectRoot(name, state).error
export const selectSuccess = (name, state) => selectRoot(name, state).success
export const selectIsActive = (name, state) => selectRoot(name, state).isActive
