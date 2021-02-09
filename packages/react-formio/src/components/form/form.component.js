import EventEmitter from 'eventemitter2'
import AllComponents from 'formiojs/components'
import Components from 'formiojs/components/Components'
import FormioForm from 'formiojs/Form'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

Components.setComponents(AllComponents)

const useFormioRef = ({ src, form, options, submission, url, ...props }) => {
  let element = useRef()
  let instance
  let createPromise
  let formio

  useEffect(() => () => formio ? formio.destroy(true) : null, [formio])

  const createWebFormInstance = (srcOrForm) => {
    const { formioform, formReady } = props
    instance = new (formioform || FormioForm)(element.current, srcOrForm, options)

    createPromise = instance.ready.then(formioInstance => {
      formio = formioInstance

      if (formReady) {
        formReady(formioInstance)
      }
    })

    return createPromise
  }

  const onAnyEvent = (event, ...args) => {
    if (event.startsWith('formio.')) {
      const funcName = `on${event.charAt(7).toUpperCase()}${event.slice(8)}`
      if (props.hasOwnProperty(funcName) && typeof (props[funcName]) === 'function') {
        props[funcName](...args)
      }
    }
  }

  const initializeFormio = () => {
    const { submission } = props
    if (createPromise) {
      instance.onAny(onAnyEvent)
      createPromise.then(() => {
        if (submission) {
          formio.submission = submission
        }
      })
    }
  }

  useEffect(() => {
    if (src) {
      createWebFormInstance(src).then(() => {
        formio.src = src
      })
      initializeFormio()
    }
  }, [src])

  useEffect(() => {
    if (form) {
      createWebFormInstance(form).then(() => {
        formio.form = form

        if (url) {
          formio.url = url
        }

        return formio
      })
      initializeFormio()
    }
  }, [form])

  useEffect(() => {
    const { events } = options || {}
    if (!events) {
      options.events = Form.getDefaultEmitter()
    }
  }, [options])

  useEffect(() => {
    if (formio && submission) {
      formio.submission = submission
    }
  }, [submission])

  return { element }
}

export const Form = (props) => {
  const { element } = useFormioRef(props)

  return <div ref={el => element.current = el}/>
}

Form.propTypes = {
  /**
   *
   */
  src: PropTypes.string,
  /**
   * url to fetch form
   */
  url: PropTypes.string,
  /**
   * Raw form object
   */
  form: PropTypes.object,
  /**
   * Data submission
   */
  submission: PropTypes.object,
  /**
   * Configuration option
   */
  options: PropTypes.shape({
    readOnly: PropTypes.bool,
    noAlerts: PropTypes.bool,
    i18n: PropTypes.object,
    template: PropTypes.string,
    saveDraft: PropTypes.bool
  }),
  onPrevPage: PropTypes.func,
  onNextPage: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onCustomEvent: PropTypes.func,
  onComponentChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmitDone: PropTypes.func,
  onFormLoad: PropTypes.func,
  onError: PropTypes.func,
  onRender: PropTypes.func,
  onAttach: PropTypes.func,
  onBuild: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onInitialized: PropTypes.func,
  formReady: PropTypes.func,
  formioform: PropTypes.any
}

Form.getDefaultEmitter = () => {
  return new EventEmitter({
    wildcard: false,
    maxListeners: 0
  })
}

export default Form
