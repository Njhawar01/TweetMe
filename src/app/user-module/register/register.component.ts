import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = ""

  constructor(
    public service: UserService,
    private route: Router,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
    var formDetails = form.value;
    console.log(formDetails);
    if (formDetails.password !== formDetails.repassword) {
      this.errorMessage = "Password does not match"
      this.spinner.hide();
    }
    else if (isNaN(formDetails.contactNumber)) {
      this.errorMessage = "Enter a valid contact number";
      this.spinner.hide();
    }
    else {
      this.errorMessage = "";
      this.insertRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.registerUser().subscribe({
      next: r => {
        this.spinner.hide();
        this.toastr.success("User registration successful");
        this.route.navigate(['/login']);
      },
      error: err => {
        console.log(err);
        this.spinner.hide();
        if (err.status == 400) {
          this.errorMessage = err.error;
        }
        else {
          err.status == 500 ? this.route.navigate(['/error/500']) : err.status == 404 ? this.route.navigate(['/error/404']) : this.route.navigate(['/login']);
        }
      }
    });
  }
}
