import { mount } from 'enzyme'
import React from 'react'
import { Button } from './button.component'

describe('Button', () => {
  describe('rendering', () => {
    it('should render a button with default tag and label', () => {
      // WHEN
      const component = mount(<Button>Label</Button>)

      // THEN
      const button = component.find('button')
      expect(component.find('button span span').contains('Label')).toEqual(true)
      expect(button.hasClass('bg-primary')).toEqual(true)
      expect(button.hasClass('border-primary')).toEqual(true)
      expect(button.hasClass('text-white')).toEqual(true)
      expect(button.hasClass('focus:bg-primary-active')).toEqual(true)
      expect(button.hasClass('focus:border-primary-active')).toEqual(true)
      expect(button.hasClass('hover:bg-primary-active')).toEqual(true)
      expect(button.hasClass('hover:border-primary-active')).toEqual(true)
      expect(button.hasClass('cursor-pointer')).toEqual(true)
      expect(component.find('button > span').hasClass('font-bold')).toEqual(true)
      expect(component.find('button > span').hasClass('px-4')).toEqual(true)
      expect(component.find('button > span').hasClass('py-1')).toEqual(true)
    })

    it('should render a custom  given tag with default tag and label', () => {
      // WHEN
      const component = mount(<Button component="a">Label</Button>)

      // THEN
      expect(component.find('a span span').contains('Label')).toEqual(true)
    })

    it('should render a disabled component', () => {
      // WHEN
      const component = mount(<Button disabled={true}>Label</Button>)

      // THEN
      const button = component.find('button')

      expect(button.hasClass('opacity-50')).toEqual(true)
    })

    it('should render button with customer color', () => {
      // WHEN
      const component = mount(<Button
        bgColor={'red'}
        borderColor={'yellow'}
        color={'black'}
        fontWeight={'lighter'}
        paddingX={2}
        paddingY={3}>Label</Button>)

      // THEN
      const button = component.find('button')

      expect(button.hasClass('bg-red')).toEqual(true)
      expect(button.hasClass('text-black')).toEqual(true)
      expect(button.hasClass('border-yellow')).toEqual(true)
      expect(button.hasClass('focus:bg-red-800')).toEqual(true)
      expect(button.hasClass('focus:border-yellow-800')).toEqual(true)
      expect(button.hasClass('hover:bg-red-800')).toEqual(true)
      expect(button.hasClass('hover:border-yellow-800')).toEqual(true)
      expect(button.hasClass('focus:text-black-800')).toEqual(true)
      expect(button.hasClass('hover:text-black-800')).toEqual(true)
      expect(component.find('button > span').hasClass('font-lighter')).toEqual(true)
      expect(component.find('button > span').hasClass('px-2')).toEqual(true)
      expect(component.find('button > span').hasClass('py-3')).toEqual(true)
    })
  })
})
