import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

export function BxIcon ({ name, color, className = '' }) {
  className = classnames('bx', name.includes('bx') ? name : `bx-${name}`, color ? `text-${color}` : '', className)

  return <i className={className}/>
}

BxIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string
}
