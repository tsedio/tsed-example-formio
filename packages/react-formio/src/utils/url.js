import Formiojs from 'formiojs/Formio'

export const isMongoId = (text) => {
  return text.toString().match(/^[0-9a-fA-F]{24}$/)
}

export function getFormUrl (formId) {
  const url = [Formiojs.getProjectUrl()]

  if (isMongoId(formId)) {
    url.push('form')
  } else if (formId.includes('__')) {
    formId = formId.replace(/__/gi, '/')
  }

  url.push(formId)

  return url.join('/')
}

export function getActionUrl (formId, actionId) {
  return [
    getFormUrl(formId),
    'action',
    actionId
  ]
    .filter(Boolean)
    .join('/')
}

export function getSubmissionUrl (formId, submissionId) {
  return [
    getFormUrl(formId),
    'submission',
    submissionId
  ]
    .filter(Boolean)
    .join('/')
}
