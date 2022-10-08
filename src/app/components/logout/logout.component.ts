import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

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

  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.initialDate = Date.now();

    this.timeout = setTimeout(() => {
      clearTimeout(this.timeout);
      clearInterval(this.interval);
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
