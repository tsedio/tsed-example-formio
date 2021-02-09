import { createReducer } from '@project/redux-utils'
import {
  failUser,
  logoutUser,
  projectAccessUser,
  receiveUser,
  requestUser,
  submissionAccessUser,
  userForms,
  userRoles
} from './auth.actions'

function createInitialState () {
  return {
    init: false,
    isActive: false,
    user: null,
    authenticated: false,
    submissionAccess: {},
    formAccess: {},
    projectAccess: {},
    roles: {},
    forms: {},
    is: {},
    error: null
  }
}

function mapProjectRolesToUserRoles (projectRoles, userRoles) {
  return Object.entries(projectRoles).reduce((result, [name, role]) => ({
    ...result,
    [name]: userRoles.includes(role._id)
  }), {})
}

function getUserRoles (projectRoles) {
  return Object.keys(projectRoles).reduce((result, name) => ({
    ...result,
    [name]: name === 'anonymous'
  }), {})
}

export const authReducer = createReducer({
  [requestUser] (state) {
    return {
      ...state,
      init: true,
      submissionAccess: false,
      isActive: true
    }
  },
  [receiveUser] (state, { user }) {
    return {
      ...state,
      isActive: false,
      user,
      authenticated: true,
      is: mapProjectRolesToUserRoles(state.roles, user.roles),
      error: null
    }
  },
  [failUser] (state, { error }) {
    return {
      ...state,
      isActive: false,
      is: getUserRoles(state.roles),
      error
    }
  },
  [logoutUser()] (state) {
    return {
      ...state,
      user: null,
      isActive: false,
      authenticated: false,
      is: getUserRoles(state.roles),
      error: null
    }
  },
  [submissionAccessUser] (state, { submissionAccess }) {
    return {
      ...state,
      submissionAccess
    }
  },
  [userForms] (state, { formAccess }) {
    return {
      ...state,
      formAccess
    }
  },
  [projectAccessUser] (state, { projectAccess }) {
    return {
      ...state,
      projectAccess
    }
  },
  [userRoles] (state, { roles }) {
    return {
      ...state,
      roles
    }
  },
  default (state) {
    if (!window.localStorage.getItem('formioUser')) {
      return {
        ...state,
        user: null,
        isActive: false,
        authenticated: false,
        is: getUserRoles(state.roles),
        error: null
      }
    }
    return state
  }
}, createInitialState)
