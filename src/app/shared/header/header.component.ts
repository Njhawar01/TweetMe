import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth-guard.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: string = "";
  constructor(
    public userService: UserService,
    private router: Router,
    public authService: AuthGuard
    ) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUser = currentUser.loginId;
    return currentUser.email ? true : false;
  }

  logOut() {
    this.userService.userLogout().subscribe({
      next: r => { 
        localStorage.removeItem("currentUser");
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err)
        err.status == 500 ? this.router.navigate(['/error/500']) : err.status == 404 ? this.router.navigate(['/error/404']) : this.router.navigate(['/login']);
      }
    });
  }
 }
