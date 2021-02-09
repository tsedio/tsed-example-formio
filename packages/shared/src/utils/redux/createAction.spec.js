import { createAction } from './createAction'

describe('createAction', () => {
  it('should create an action with default name', () => {
    const action1 = createAction()
    const action2 = createAction()

    expect(action1.toString()).toContain('ACTION:')
    expect(action1.toString()).not.toEqual(action2.toString())

    expect(action1('name')).toEqual({ 'name': 'name', 'payload': {}, 'type': 'ACTION:0' })
  })

  it('should create an action with name', () => {
    const action1 = createAction("test")

    expect(action1.toString()).toContain('test')

    expect(action1('name')).toEqual({ 'name': 'name', 'payload': {}, 'type': 'test' })
  })
})