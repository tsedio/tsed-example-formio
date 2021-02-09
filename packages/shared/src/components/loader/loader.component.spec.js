import React from 'react'
import { shallow } from 'enzyme'
import Loader from './loader.component'
import { Fade, Spinner } from '@clubmed/components'

describe('Loader', () => {
  const shallowComponent = props => {
    return shallow(<Loader {...props} />)
  }

  it('should render a component (with show = true)', () => {
    const cmp = shallowComponent({ isActive: true })

    expect(cmp.find(Spinner)).toHaveLength(1)
    expect(cmp.find(Fade).props().show).toEqual(true)
  })

  it('should render a component (with show = false)', () => {
    const cmp = shallowComponent({ isActive: false })

    expect(cmp.find(Spinner)).toHaveLength(1)
    expect(cmp.find(Fade).props().show).toEqual(false)
  })
})
