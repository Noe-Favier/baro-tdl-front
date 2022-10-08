import {CategoryPermission} from "./category-permission";
import {Category} from "./category";

export interface Element {
  label: string,
  checked: boolean,

  creator: string,
  code: string,

  category: Category,
}
