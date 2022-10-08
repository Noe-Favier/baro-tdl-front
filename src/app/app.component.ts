import {Component} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
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

  constructor(public router: Router, userService: UserService) {
      this.user = userService.getCurrentUser();
  }

}
