export interface Reduce {
  (type: string, state: any, payload: any): any;

  $emit (type: string, state: any, payload: any): any;

  toString (): string;
}

/**
 * Create a new Reducer
 * @param createInitialState
 * @param reducers
 */
export function createReducer (reducers: any, createInitialState?: (state: any) => any) {
  return (name: string, defaultStateOptions: any): Reduce => {
    const initialState = { name, ...createInitialState(defaultStateOptions) }

    const reduce = (state = initialState, { type, name: actionName, payload }) => {
      if (actionName !== name) {
        return state
      }

      if (reducers[type]) {
        return reduce.$emit(type, state, payload)
      }

      return state
    }

    reduce.$emit = (type, state, payload) => {
      return {
        ...reducers[type](state, payload, () => createInitialState(defaultStateOptions)),
        name
      }
    }

    reduce.toString = () => name

    return reduce
  }
}

export function combine (...args: Reduce[]) {
  return args.reduce((reducers, reduce) => {
    return {
      ...reducers,
      [reduce]: reduce
    }
  }, {})
}