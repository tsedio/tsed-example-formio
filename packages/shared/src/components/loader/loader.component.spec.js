import { shallow } from 'enzyme'
import React from 'react'
import { Fade } from '../fade/fade.component'
import { BxIcon } from '../icon/bxIcon.component'
import { Loader } from './loader.component'

describe('Loader', () => {
  const shallowComponent = props => {
    return shallow(<Loader {...props} />)
  }

  it('should render a component (with isActive = true)', () => {
    const cmp = shallowComponent({ isActive: true })

    expect(cmp.find(BxIcon)).toHaveLength(1)
    expect(cmp.find(Fade).props().show).toEqual(true)
  })

  it('should render a component (with isActive = false)', () => {
    const cmp = shallowComponent({ isActive: false })

    expect(cmp.find(BxIcon)).toHaveLength(1)
    expect(cmp.find(Fade).props().show).toEqual(false)
  })
})
