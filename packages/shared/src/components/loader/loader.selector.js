import get from 'lodash/get'

export function getIsActive (name = 'loader') {
  return (state) => {
    return state[name].isActive
  }
}

export function oneOfIsActive (...names) {
  return (state) => {
    return !!names.find((name) => {
      return get(state, `${name}.isActive`, get(state, name + '.current.isActive'))
    })
  }
}
