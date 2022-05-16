import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  data: any;
  searchText: string = "";
  
  constructor(
    public service: UserService,
    public router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.getAllUsers().subscribe({
      next: r => {
        this.data = (<any[]>r);
        this.spinner.hide();
      },
      error: err => {
        this.spinner.hide();
        console.log(err)
        this.onError(err);
      }
    });
  }

  isCurrentUser(loginId: string) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.loginId == loginId) {
      return true;
    }
    else {
      return false;
    }
  }

  onUserHandleClick(username: string) {
    var url = '/user/' + username;
    return url;
  }

  onError(err: any) {
    err.status == 500 ? this.router.navigate(['/error/500']) : err.status == 404 ? this.router.navigate(['/error/404']) : this.router.navigate(['/login']);
  }

}
