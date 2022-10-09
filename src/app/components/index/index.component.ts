import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category/category.service";
import {User} from "../../models/user";
import {ElementService} from "../../services/element/element.service";
import {Element} from "../../models/element";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public categories: Category[] | undefined;
  public user: User;

  constructor(public router: Router, private categoryService: CategoryService, private elementService: ElementService, userService: UserService) {
    this.user = userService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    this.categoryService.getCategoriesByUser(this.user.username).subscribe(e => {
      this.categories = e;
    })
  }

  countCheckedElements(elements: Element[]): number {
    return this.elementService.countCheckedFromList(elements);
  }

  categorySelected(code: string) {
    this.router.navigateByUrl(`/category/${code}`);
  }
}
