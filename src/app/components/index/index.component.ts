import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category/category.service";
import {User} from "../../models/user";
import {ElementService} from "../../services/element/element.service";
import {Element} from "../../models/element";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddElementComponent} from "../category/category/modal/add-element/add-element.component";
import {MatDialog} from "@angular/material/dialog";
import {AddCategoryComponent} from "./modal/add-category/add-category.component";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public categories: Category[] | undefined;
  public user: User;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, public router: Router, private categoryService: CategoryService, private elementService: ElementService, userService: UserService) {
    this.user = userService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    this.updateCategories();
  }

  countCheckedElements(elements: Element[]): number {
    return this.elementService.countCheckedFromList(elements);
  }

  categorySelected(code: string) {
    this.router.navigateByUrl(`/category/${code}`);
  }

  showAddCategoryDialog() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '60vw',
      height: '45vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateCategories();
    });
  }

  updateCategories() {
    this.categoryService.getCategoriesByUser(this.user.username).subscribe({
      next: e => {
        this.categories = e;
      },
      error: err => {
        let errorMsg: string = err.error.errorMsg != undefined ? err.error.errorMsg : err.error.message;
        this._snackBar.open(errorMsg, 'ok');
      }
    });
  }
}
