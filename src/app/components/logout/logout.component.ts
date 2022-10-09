import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  public statusPercent: number = 0;
  public statusSeconds: number = 0;

  public maxTimeout: number = 3000;
  public initialDate: number = 0;

  private interval: number | undefined;
  private timeout: number | undefined;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.initialDate = Date.now();

    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);
      clearInterval(this.interval);
      this.userService.logout();
      this.router.navigateByUrl('/login');

    }, this.maxTimeout);

    this.interval = setInterval(() => {
      this.statusPercent = (Date.now() - this.initialDate + 1000) * 100 / this.maxTimeout;
      this.statusSeconds = Math.floor(this.maxTimeout / 1000 - ((Date.now() - this.initialDate) / 1000));
    }, 100);
  }


  cancelLogout() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.router.navigateByUrl('/index');
  }
}
