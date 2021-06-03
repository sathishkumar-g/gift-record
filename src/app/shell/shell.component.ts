import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  currentUser: User;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.currentUser.subscribe(x => this.currentUser = x);
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }




}
