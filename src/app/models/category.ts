import {Element} from './element'
import {CategoryPermission} from './category-permission.js'

export interface Category {
  label: string,
  permissions: CategoryPermission[],
  elements: Element[],
}
