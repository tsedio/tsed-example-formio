import { mount } from 'enzyme'
import React from 'react'
import { BxIcon } from './bxIcon.component'
import { ICONS } from './icons'

describe('BxIcon', () => {
  it('should render the bx-icon (bx-archive)', () => {
    const component = mount(<BxIcon name={'archive'} color={'blue'} className={'w-full'}/>)

    const i = component.find('i')
    expect(i.hasClass('bx-archive')).toEqual(true)
    expect(i.hasClass('text-blue')).toEqual(true)
    expect(i.hasClass('w-full')).toEqual(true)
  })

  it('should render the bx-icon (bxl)', () => {
    const component = mount(<BxIcon name={ICONS['bxl-adobe']} className={'w-full'}/>)

    const i = component.find('i')
    expect(i.hasClass('bxl-adobe')).toEqual(true)
    expect(i.hasClass('text-blue')).toEqual(false)
    expect(i.hasClass('w-full')).toEqual(true)
  })
})