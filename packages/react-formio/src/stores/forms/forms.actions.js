// @flow
import { createAction } from '@project/redux-utils'
import Formiojs from 'formiojs/Formio'
import noop from 'lodash/noop'
import type { FormSchema } from '../../types'
import type { RequestParamsOptions } from '../../utils/mapRequestParams'
import { mapRequestParams } from '../../utils/mapRequestParams'
import { selectFormsParameters } from './forms.selectors'

export const resetForms = createAction()
export const requestForms: (name: string, options: RequestParamsOptions) => any = createAction()
export const receiveForms: (name: string, forms: FormSchema[]) => any = createAction()
export const failForms = createAction()

export type GetFormsCB = (err: any, forms: FormSchema[]) => void

export const getForms = (name: string, parameters: RequestParamsOptions, done: GetFormsCB = noop) =>
  async (dispatch, getState) => {
    dispatch(requestForms(name, { parameters }))

    const formio = new Formiojs(`${Formiojs.getProjectUrl()}/form`)
    const requestParams = mapRequestParams(selectFormsParameters(name, getState()))

    try {
      const result: FormSchema[] = await formio.loadForms({ params: requestParams })
      dispatch(receiveForms(name, { forms: result }))
      done(null, result)
    } catch (error) {
      dispatch(failForms(name, { error }))
      done(error)
    }
  }
