import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import {TokenService} from "../../auth/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private tokenService: TokenService) { }

  usernameControl: FormControl = new FormControl('', [Validators.required]);
  passwdControl: FormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
  }

  login(){
    if(this.passwdControl.valid && this.usernameControl.valid){
      this.userService.login(this.usernameControl.value, this.passwdControl.value).subscribe(e=>{
        //API returns the JWT token
        if((e as any).message == undefined){
          this.tokenService.setToken(e);
          this.router.navigateByUrl('/');
        }else{
          console.log('invalid');
          //TODO: ERROR MSG ON INVALID LOGINS
        }
      });
    }
  }
}
