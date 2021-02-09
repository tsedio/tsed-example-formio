export function hasRole (auth, role) {
  return Object.hasOwnProperty.call(auth.is, role) && auth.is[role]
}

export function hasRoles (auth, roles) {
  roles = [].concat(roles)

  if (roles.includes('go') && !auth.user.data.isGo) {
    return false
  }

  return !!roles.filter(item => item !== 'go').find(role => hasRole(auth, role))
}

export function isAuthorized (auth, roles = []) {
  if (auth && auth.authenticated) {
    if (roles.length) {
      return !!hasRoles(auth, roles)
    }
    return true
  }

  return false
}
