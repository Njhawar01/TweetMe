import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showLoader: boolean = false;
  error: boolean = false;
  errorMessage: string = "";

  constructor(
    public service: UserService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.service.formData = new User();
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
    this.login(form);
  }

  login(form: NgForm) {
    this.service.userLogin().subscribe({
      next: r => {
        const token = (<any>r).token;
        const email = (<any>r).userDetails.result.email;
        const loginId = (<any>r).userDetails.result.login_Id;
        const name = (<any>r).userDetails.result.first_Name + ' ' + (<any>r).userDetails.result.last_Name;
        localStorage.setItem('currentUser', JSON.stringify({ token: token, name: name, email: email, loginId: loginId }));
        this.spinner.hide();
        this.router.navigate(['/home']);
      },
      error: err => {
        this.spinner.hide();
        console.log(err);
        this.errorMessage = err.status == '401' ? 'Incorrect username or password' : 'User does not exist';
        this.error = true;
      }
    });
  }

}
