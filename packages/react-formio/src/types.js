export type OnClickOperation = (data: any, action: string) => void
export type PermissionsResolver = (data: any, ctx: any) => void

export type Operation = {
  /**
   * Action identifier
   */
  action: string,
  title?: string,
  /**
   * Alias action
   */
  alias?: string,
  path?: string,
  color?: string,
  bgColor?: string,
  borderColor?: string,
  icon?: string,
  /**
   * Custom ActionButton
   */
  ActionButton?: Node,
  /**
   * Permission resolver to display ActionButton
   */
  permissionsResolver?: PermissionsResolver
}

export type Column = {
  /**
   * Custom Header ReactComponent
   */
  Header: Node | string,
  /**
   * Path to display value in the data collection
   */
  accessor: string,
  /**
   * Column identifier
   */
  id: string,
  /**
   * Custom Cell ReactComponent
   */
  Cell?: Node,
  /**
   * Custom filter ReactComponent
   */
  Filter?: Node
}

export type ColumnIdentifier = {
  /**
   * Column identifier
   */
  id: string,
  /**
   * Filter value
   */
  value?: any,
  /**
   * Sort order
   */
  desc?: boolean
}

export type Query = {
  /**
   * Current displayed page
   */
  pageIndex: any,
  /**
   * Pagination size
   */
  pageSize: any,
  /**
   * SortBy state
   */
  sortBy: ColumnIdentifier[],
  /**
   * Filters state
   */
  filters: ColumnIdentifier[],
  /**
   * Focused input filter (let the Table component retrieve focus state when we fill the filter)
   */
  filterId: string,
}

export type Component = {
  type: string,
  key: string,
}

export type FormSchema = {
  _id: string,
  title: string,
  name: string,
  machineName: string,
  components: Component[]
}

export interface Submission<T = any> {
  _id: string,
  data: T
}

export interface Action {
  name: string,
  title: string,
  description: string,
  priority: number,
  defaults: {
    handler: string[],
    method: string[],
    priority: number,
    name: string,
    title: string,
  },
  access?: {
    handler: boolean,
    method: boolean
  }
}
