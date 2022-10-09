import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../models/user";
import {Category} from "../../../../models/category";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../../services/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../../services/category/category.service";
import {ElementService} from "../../../../services/element/element.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  public currentUser: User;

  public labelControl: FormControl = new FormControl('', Validators.required);
  public element: FormGroup = this._formBuilder.group({
    label: this.labelControl,
  });

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private categoryService: CategoryService,
    private elementService: ElementService,
    private _formBuilder: FormBuilder,
  ) {
    this.currentUser = userService.getCurrentUser() as User;
  }

  ngOnInit(): void {
  }

  validate(label: string) {
    this.categoryService.addCategory(label, this.currentUser.username).subscribe({
      next: value => {
        if (value.message != "success") {
          let errorMsg: string = value.errorMsg != undefined ? value.errorMsg : value.message;
          this._snackBar.open(errorMsg);
        } else {
          this.dialogRef.close();
        }
      },
      error: err => {
        let errorMsg: string = err.error.errorMsg != undefined ? err.error.errorMsg : err.error.message;
        this._snackBar.open(errorMsg, 'ok');
      }
    });
  }
}
