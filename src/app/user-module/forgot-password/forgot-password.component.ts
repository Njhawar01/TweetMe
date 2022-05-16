import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  errorMessage: string = "";

  constructor(
    public service: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    ) {
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
    var formDetails = form.value;
    if(formDetails.password !== formDetails.confirmPassword) {
      this.errorMessage = "Password does not match"
      this.spinner.hide();
    }
    else {
      this.errorMessage = "";
      this.resetPassword(form);
    }
  }

  resetPassword(form: NgForm) {
    this.service.resetPassword().subscribe({
      next: r => { 
        this.spinner.hide();
        this.resetForm(form)
        this.toastr.success("Password reset successful");
        this.router.navigate(['/login']);
      },
      error: err => {
        this.spinner.hide();
        console.log(err)
        err.status == 400 ? this.errorMessage = err.error : err.status == 404 ? this.errorMessage = "User does not exist" : err.status == 500 ? this.router.navigate(['/error/500']) : this.router.navigate(['/login']);
      }
    });
  }

  resetForm(form: NgForm) {
    form.form.reset();
  }

}
