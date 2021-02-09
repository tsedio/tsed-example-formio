import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

export const Button = ({
                         component: Component = 'button',
                         children,
                         borderColor,
                         bgColor = 'primary',
                         variant = 800,
                         color = 'white',
                         fontWeight = 'bold',
                         rounded = 'sm',
                         paddingX = 4,
                         paddingY = 1,
                         disabled,
                         shadow = 'none',
                         className = '',
                         ...otherProps
                       }) => {

  if (bgColor === 'primary') {
    variant = 'active'
  }

  if (!borderColor) {
    borderColor = bgColor
  }

  const classNames = `inline-flex flex-col items-stretch overflow-hidden text-base transition-colors
  bg-${bgColor} border-${borderColor} text-${color} focus:bg-${bgColor}-${variant} focus:border-${borderColor}-${variant}
  hover:bg-${bgColor}-${variant} hover:border-${borderColor}-${variant} focus:text-${color}-${variant} hover:text-${color}-${variant}
  border-1 border-solid rounded-${rounded} shadow-${shadow} ${disabled ? 'opacity-50' : 'cursor-pointer'}`

  return (
    <Component
      {...otherProps}
      disabled={disabled}
      className={classnames(classNames, className)}>
      <span
        className={`reset-link flex justify-center items-center w-full font-${fontWeight} px-${paddingX} py-${paddingY}`}>
        <span className="m-1 text-center flex justify-center items-center">{children}</span>
      </span>
    </Component>
  )
}

Button.propTypes = {
  component: PropTypes.any,
  children: PropTypes.node,
  borderColor: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  rounded: PropTypes.string,
  paddingX: PropTypes.number,
  paddingY: PropTypes.number,
  disabled: PropTypes.bool,
  shadow: PropTypes.string
}
