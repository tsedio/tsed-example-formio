import React from 'react'
import { COLORS, COLORS_LIST } from '../../utils/colors/colors'
import { Button } from './button.component'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    bgColor: {
      control: {
        type: 'select',
        options: COLORS_LIST
      }
    },
    borderColor: {
      control: {
        type: 'select',
        options: COLORS_LIST
      }
    },
    color: {
      control: {
        type: 'select',
        options: COLORS_LIST
      }
    },
    component: {
      control: {
        type: 'select',
        options: ['a', 'span', 'button']
      }
    }
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}

export const Sandbox = (args) => {
  return (
    <Button {...args}>{args.children}</Button>
  )
}

Sandbox.args = {
  children: 'Hello world',
  bgColor: COLORS.primary,
  borderColor: COLORS.primary,
  color: COLORS.white,
  disabled: false,
  fontWeight: 'bold',
  paddingX: 4,
  paddingY: 1,
  className: '',
  component: 'button'
}
