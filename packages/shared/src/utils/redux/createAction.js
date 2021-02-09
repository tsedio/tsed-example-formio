// @flow

let AUTO_INC = 0

function getActionType () {
  return `ACTION:${AUTO_INC++}`
}

export function createAction (type: string = getActionType()) {
  const action = (name, payload = {}) => ({
    type,
    name,
    payload
  })

  action.toString = () => type

  return action
}
