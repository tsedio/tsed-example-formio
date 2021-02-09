import { createAction } from '@project/redux-utils'
import formiojs from 'formiojs/Formio'
import noop from 'lodash/noop'

const name = 'auth'

export const requestUser = createAction()
export const receiveUser = createAction()
export const failUser = createAction()
export const logoutUser = createAction()
export const submissionAccessUser = createAction()
export const formAccessUser = createAction()
export const projectAccessUser = createAction()
export const userRoles = createAction()
export const userForms = createAction()

function transformSubmissionAccess (forms) {
  return Object.values(forms).reduce((result, form) => ({
    ...result,
    [form.name]: form.submissionAccess.reduce((formSubmissionAccess, access) => ({
      ...formSubmissionAccess,
      [access.type]: access.roles
    }), {})
  }), {})
}

function transformFormAccess (forms) {
  return Object.values(forms).reduce((result, form) => ({
    ...result,
    [form.name]: form.access.reduce((formAccess, access) => ({
      ...formAccess,
      [access.type]: access.roles
    }), {})
  }), {})
}

function transformProjectAccess (projectAccess) {
  return projectAccess.reduce((result, access) => ({
    ...result,
    [access.type]: access.roles
  }), {})
}

async function getAccess (dispatch) {
  const projectUrl = formiojs.getProjectUrl()

  try {
    const result = await formiojs.makeStaticRequest(`${projectUrl}/access`)

    const submissionAccess = transformSubmissionAccess(result.forms)
    const formAccess = transformFormAccess(result.forms)

    dispatch(submissionAccessUser(name, { submissionAccess }))
    dispatch(formAccessUser(name, { formAccess }))
    dispatch(userRoles(name, { roles: result.roles }))
    dispatch(userForms(name, { forms: result.forms }))
  } catch (err) {
  }
}

async function getProjectAccess (dispatch) {
  const projectUrl = formiojs.getProjectUrl()

  try {
    const project = await formiojs.makeStaticRequest(projectUrl)
    const projectAccess = transformProjectAccess(project.access)

    dispatch(projectAccessUser(name, projectAccess))
  } catch (er) {
  }
}

export const initAuth = (done = noop) => async (dispatch) => {
  dispatch(requestUser(name))

  try {
    const [user] = await Promise.all([
      formiojs.currentUser(),
      getAccess(dispatch),
      getProjectAccess(dispatch)
    ])

    if (user) {
      dispatch(receiveUser(name, user))
    } else {
      dispatch(logoutUser(name))
    }
  } catch (error) {
    dispatch(failUser(name, { error }))
  }

  done()
}

export const setUser = (user) => (dispatch) => {
  formiojs.setUser(user)
  dispatch(receiveUser(name, { user }))
}

export const logout = () => (dispatch) => {
  formiojs.logout()
  dispatch(logoutUser(name))
}
