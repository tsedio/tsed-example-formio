export const HIDE_LOADER = 'SHOW_LOADER'
export const SHOW_LOADER = 'HIDE_LOADER'

export function showLoader (name) {
  return {
    name,
    type: SHOW_LOADER
  }
}

export function hideLoader (name) {
  return {
    name,
    type: HIDE_LOADER
  }
}
