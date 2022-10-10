import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {TokenService} from "../../auth/token.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public usernameControl: FormControl = new FormControl('', [Validators.required]);
  public emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwdControl: FormControl = new FormControl('', [Validators.required]);
  public passwdCheckControl: FormControl = new FormControl('', [Validators.required, this.validPasswords()]);

  public formSignup: FormGroup;


  constructor(
    private userService: UserService,
    public router: Router,
    private tokenService: TokenService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
  ) {
    this.formSignup = this._formBuilder.group({
      username: this.usernameControl,
      email: this.emailControl,
      password: this.passwdControl,
      pc: this.passwdCheckControl
    });
  }

  ngOnInit(): void {
  }

  signup() {
    if (this.formSignup.valid) {
      this.userService.signup(this.usernameControl.value, this.passwdControl.value, this.emailControl.value).subscribe({
        next: e => {
          if (e.message != "success") {
            let errorMsg: string = e.errorMsg != undefined ? e.errorMsg : e.message;
            this._snackBar.open(errorMsg);
          } else {
            this.router.navigateByUrl('/login')
          }
        },
        error: err => {
          console.log('nok')
          //logins arren't good
          let errorMsg: string = err.error.errorMsg != undefined ? err.error.errorMsg : err.error.message;
          this._snackBar.open(errorMsg, 'ok');
        }
      });
    } else {
      this._snackBar.open('The form is invalid', 'ok');
    }
  }

  validPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      let valid: boolean = this.passwdControl.value == this.passwdCheckControl.value;
      return valid ? null : {invalidPsswds: true};
    }
  }
}
