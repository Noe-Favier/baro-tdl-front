import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {NavigationStart, Router} from "@angular/router";
import {User} from "./models/user";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Baro\'s TodoList';
  public user: User | undefined;

  constructor(public readonly router: Router, private readonly userService: UserService) {
    this.checkUser();
    router.events.forEach((event) => {
        this.checkUser();
    });
  }

  checkUser(){
    console.log('check on : '+this.router.url);
    if(
      this.router.url != '/login' &&
      this.router.url != '/logout' &&
      this.router.url != '/signup'
    ){
      this.user = this.userService.getCurrentUser();
      if (this.user === undefined) { //user can't be read from token
        this.userService.logout(); //delete token
        this.router.navigateByUrl('/login'); //login user
      }
    }
  }

  clickedLogout(){
    this.router.navigateByUrl('/logout');
  }

  clickedGitHub(){
    let url: string = 'https://github.com/Noe-Favier/baro-tdl-front';
    window.open(url,'_blank');
  }
}
