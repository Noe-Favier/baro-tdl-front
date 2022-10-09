import {Component, Inject, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../../../services/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../../../models/category";
import {CategoryService} from "../../../../../services/category/category.service";
import {User} from "../../../../../models/user";
import {ElementService} from "../../../../../services/element/element.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  public currentUser: User;
  public category: Category;

  public labelControl: FormControl = new FormControl('', Validators.required);
  public element: FormGroup = this._formBuilder.group({
    label: this.labelControl,
  });

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private categoryService: CategoryService,
    private elementService: ElementService,
    private _formBuilder: FormBuilder,
  ) {
    this.currentUser = userService.getCurrentUser() as User;
    this.category = data;
  }

  ngOnInit(): void {
  }

  validate(label: string) {
    this.elementService.addToCategory(this.category.code, label, this.currentUser.username).subscribe({
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
