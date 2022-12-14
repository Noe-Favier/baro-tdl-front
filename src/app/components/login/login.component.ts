import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {TokenService} from "../../auth/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private userService: UserService,
    public router: Router,
    private tokenService: TokenService
  ) {
  }

  usernameControl: FormControl = new FormControl('', [Validators.required]);
  passwdControl: FormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

  login() {
    console.log("login")
    if (this.passwdControl.valid && this.usernameControl.valid) {
      this.userService.login(this.usernameControl.value, this.passwdControl.value).subscribe({
        next: e => {
          //API returns the JWT token
          //logins are good !
          this.tokenService.setToken(e.token);
          this.router.navigateByUrl('/').then(e=>{
            if (!e){
              window.location.reload();
            }
          });
        },
        error: err => {
          //logins arren't good
          let errorMsg: string = err.error.errorMsg != undefined ? err.error.errorMsg : err.error.message;
          this._snackBar.open(errorMsg, 'ok');
        }
      });
    }
  }

  signup() {
    console.log('signup')
    this.router.navigateByUrl('/signup').then(e=>{
      if(!e){
        console.log('nok')
        window.location.reload();
      }else{
        console.log('ok')
      }
    });
  }
}
