import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUser: string;
  timeoutId;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }
  ngOnInit(): void {
    //this.loginService.currentUser.subscribe(x => this.currentUser = x);
    this.checkTimeOut();
  }
  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  @HostListener('window:scroll')
  checkUserActivity() {
    clearTimeout(this.timeoutId);
    this.checkTimeOut();
  }
  checkTimeOut() {
    this.timeoutId = setTimeout(this.logout, 60000, this.loginService, this.router);
  }

  logout(authService, route) {
    authService.logout();
    route.navigate(['/login']);
  }
}
