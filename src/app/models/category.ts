import {Element} from './element'
import {CategoryPermission} from './category-permission.js'

export interface Category {
  label: string,
  UpdatedAt: string

  creator: string,
  code: string,

  elements: Element[],
}
