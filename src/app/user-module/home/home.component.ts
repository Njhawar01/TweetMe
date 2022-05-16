import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/core/model/tweet.model';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { TweetService } from 'src/app/core/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;
  addData: Tweet = new Tweet();
  editData: any;
  deleteData: any;
  isaddClicked: boolean = false;
  isEditClicked: boolean = false;
  isDeleteClicked: boolean = false;
  addDisplayStyle = "none";
  editDisplayStyle = "none";
  deleteDisplayStyle = "none";
  hasTweets: boolean = true;
  errorMessage: string = "";
  addError: string = "";
  changeText: boolean = false;

  constructor(
    public service: UserService,
    public tweetService: TweetService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.addData = new Tweet();
    this.tweetService.getUserTweets().subscribe({
      next: r => {
        this.data = (<any[]>r);
        if (this.data.length > 0) {
          this.hasTweets = true;
        }
        else {
          this.hasTweets = false;
        }
        this.spinner.hide();
      },
      error: err => {
        console.log(err)
        this.spinner.hide();
        this.onError(err);
      }
    });
  }

  addModal() {
    this.isaddClicked = true;
    this.addDisplayStyle = "block";
  }

  addClicked(addedTweet: string) {
    this.spinner.show();
    if (!addedTweet) {
      this.addError = "Field cannot be blank"
    }
    else {
      this.addError = ""
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.addData.name = currentUser.name;
      this.addData.post = addedTweet;
      this.addData.login_Id = currentUser.loginId;
      this.tweetService.addUserTweet(this.addData).subscribe({
        next: n => {
          this.isaddClicked = false;
          this.addDisplayStyle = "none";
          this.spinner.hide();
          this.ngOnInit();
          this.toastr.success('Tweet posted successfully');
        },
        error: err => {
          console.log(err)
          this.isaddClicked = false;
          this.addDisplayStyle = "none";
          this.spinner.hide();
          this.onError(err);
        }
      })
    }
    this.spinner.hide();
  }

  editModal(modalEditData: Tweet) {
    this.editData = modalEditData;
    this.isEditClicked = true;
    this.editDisplayStyle = "block";
  }

  updateClicked(editedTweet: any) {
    if (!editedTweet) {
      this.errorMessage = "Field cannot be blank"
    }
    else {
      this.errorMessage = ""
      this.editData.post = editedTweet;
      this.tweetService.editUserTweet(this.editData).subscribe({
        next: n => {
          this.isEditClicked = false;
          this.editDisplayStyle = "none";
          this.toastr.success('Tweet updated successfully');
        },
        error: err => {
          console.log(err)
          this.isEditClicked = false;
          this.editDisplayStyle = "none";
          this.onError(err);
        }
      })
    }
  }

  deleteModal(data: Tweet) {
    this.deleteData = data;
    this.isDeleteClicked = true;
    this.deleteDisplayStyle = "block";
  }

  deleteClicked() {
    this.tweetService.deleteUserTweet(this.deleteData).subscribe({
      next: n => {
        this.isDeleteClicked = false;
        this.deleteDisplayStyle = "none";
        this.ngOnInit();
        this.toastr.success('Tweet deleted successfully');
      },
      error: err => {
        this.isDeleteClicked = false;
        this.deleteDisplayStyle = "none";
        this.onError(err);
      }
    })
  }

  onUserHandleClick(username: string) {
    var url = '/user/' + username;
    return url;
  }

  closePopup() {
    this.errorMessage = ""
    this.isEditClicked = false;
    this.editDisplayStyle = "none";
    this.isDeleteClicked = false;
    this.deleteDisplayStyle = "none";
    this.isaddClicked = false;
    this.addDisplayStyle = "none";
  }

  onError(err: any) {
    err.status == 500 ? this.router.navigate(['/error/500']) : err.status == 404 ? this.router.navigate(['/error/404']) : this.router.navigate(['/login']);
  }
}
