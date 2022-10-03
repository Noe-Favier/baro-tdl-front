import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  public status: number = 0;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout();
  }

  ngOnInit(): void {
    let router: Router = this.router;
    let status = this.status;
    let maxTimeout: number = 3000;

    this.authService.logout();
    console.log('removed item')
    let initialDate = new Date();
    let timeout = setTimeout(function () {
      router.navigateByUrl('/login');
    }, maxTimeout);
    let interval: number = setInterval(function () {
      status = (new Date().getMilliseconds() - initialDate.getMilliseconds())*100/maxTimeout;
    });
  }


}
