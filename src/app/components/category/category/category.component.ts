import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../models/category";
import {ElementService} from "../../../services/element/element.service";
import {MatDialog} from "@angular/material/dialog";
import {AddFriendComponent} from "./modal/add-friend/add-friend.component";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddElementComponent} from "./modal/add-element/add-element.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public user: User;
  public category: Category | undefined;
  elementsModel: any = {};

  private categoryCode: string = '';

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService, private elementService: ElementService, private userService: UserService) {
    this.user = this.userService.getCurrentUser() as User;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(e => {
      this.categoryCode = e.get('code') as string;
      this.updateCategory();
    });
  }

  check(code: string, state: boolean) {
    this.elementService.check(code, state).subscribe({
      next: e => {
        if (e.message != "success") {
          let errorMsg: string = e.errorMsg != undefined ? e.errorMsg : e.message;
          this._snackBar.open(errorMsg);
        }
      },
      error: err => {
        let errorMsg: string = err.error.errorMsg != undefined ? err.error.errorMsg : err.error.message;
        this._snackBar.open(errorMsg, 'ok');
      }
    });

  }

  updateCategory(){
    this.categoryService.getCategoryById(this.categoryCode).subscribe({
      next: ctg => {
        this.category = ctg;
        ctg.elements.forEach(e => {
          this.elementsModel[e.code] = e.checked;
        })
      },
      error: err => {
        let errorMsg: string = err.error.errorMsg != undefined ? err.error.errorMsg : err.error.message;
        this._snackBar.open(errorMsg, 'ok');
      }
    })
  }

  getBackToIndex() {
    this.router.navigateByUrl('/');
  }

  showAddFriendDialog() {
    const dialogRef = this.dialog.open(AddFriendComponent, {
      width: '60vw',
      height: '45vh',
      data: this.category
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateCategory();
    });
  }

  showAddElementDialog() {
    const dialogRef = this.dialog.open(AddElementComponent, {
      width: '60vw',
      height: '45vh',
      data: this.category
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateCategory();
    });
  }
}
