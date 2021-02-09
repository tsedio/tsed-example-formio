import { Formio } from 'formiojs'
import Webform from 'formiojs/Webform'
import WebformBuilder from 'formiojs/WebformBuilder'
import Wizard from 'formiojs/Wizard'
import WizardBuilder from 'formiojs/WizardBuilder'
import './styles/index.css'
import tailwind from './tailwind/tailwind'

export {
  Webform,
  WebformBuilder,
  Wizard,
  WizardBuilder
  // editFormUtils,
}

export * from './stores'
export * from './types'
export * from './components'

export { Components, Formio, Utils, Templates } from 'formiojs'

Formio.use(tailwind)