import {Element} from './element'
import {CategoryPermission} from './category-permission.js'
import {User} from "./user";

export interface Category {
  label: string,
  UpdatedAt: string

  creator: string,
  code: string,

  users: User[],
  elements: Element[],
}
