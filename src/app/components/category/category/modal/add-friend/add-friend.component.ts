import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../../models/user";
import {UserService} from "../../../../../services/user/user.service";
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {GlobalConstants} from "../../../../../common/global-constants";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Category} from "../../../../../models/category";
import {CategoryService} from "../../../../../services/category/category.service";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {
  public users: User[] = [];
  public _userControl: FormControl | undefined;
  public filteredOptions: Observable<User[]> | undefined;

  public selectedUsers: string[] = [];

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: Category, private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(e => {
      this.users = e;
      this._userControl = new FormControl('', [this.validUsername(this.users), Validators.required]);
      this.filteredOptions = this._userControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });


  }

  private _filter(username: string): User[] {
    const filterValue = username.toLowerCase();

    return this.users.filter(option => option.username.toLowerCase().includes(filterValue) && !this.selectedUsers.includes(option.username) && option.username !== GlobalConstants.currentUser?.username)
  }

  validUsername(users: User[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;
      if (!value) {
        return null;
      }

      let valid: boolean = (users.filter(usr => usr.username === value)).length > 0;
      return valid ? null : {invalidUsername: true};
    }
  }

  get userControl(): FormControl{
    return this._userControl as FormControl;
  }

  addMore(value: string) {
    this.selectedUsers.push(value);
    this._userControl?.reset();
  }

  cantValidate() {
    return (this.selectedUsers.length==0 && this.userControl?.invalid);
  }

  validate() {
    this.categoryService.replaceLinkedUsersBy(this.selectedUsers, this.data.code).subscribe(e=>{
      if(e.message != "success"){
        console.log("error");
      }
    });
  }
}
