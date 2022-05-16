import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TweetReply } from 'src/app/core/model/tweet-reply.model';
import { Tweet } from 'src/app/core/model/tweet.model';
import { TweetService } from 'src/app/core/services/tweet.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-handle',
  templateUrl: './user-handle.component.html',
  styleUrls: ['./user-handle.component.scss']
})
export class UserHandleComponent implements OnInit {

  data: any;
  userData: any;
  currentTweet: Tweet = new Tweet();
  replyData: TweetReply = new TweetReply();
  isReplyClicked: boolean = false;
  replyDisplayStyle: string = "";
  searchText: string = "";
  hasTweets: boolean = true;
  userDetailsLoaded: boolean = false;
  url: string = "";
  errorMessage: string = "";

  constructor(
    public service: UserService,
    public tweetService: TweetService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.url = this.router.url.slice(6);
    this.service.getCurrentUser(this.url).subscribe({
      next: r => {
        this.userData = (<any[]>r);
        console.log(this.userData.first_Name);
        this.userDetailsLoaded = true;
        this.getUserTweets(this.url);
      },
      error: err => {
        this.spinner.hide();
        console.log(err)
        this.userDetailsLoaded = false;
        this.onError(err);
      }
    });
  }

  getUserTweets(url: string) {
    this.tweetService.getUserHandle(url).subscribe({
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
        this.spinner.hide();
        console.log(err)
        this.userDetailsLoaded = false;
        this.onError(err);
      }
    });
  }

  isLiked(tweet: Tweet) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (tweet.liked_By.includes(currentUser.loginId)) {
      return true;
    }
    else {
      return false;
    }
  }

  onLike(likedTweet: Tweet) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    likedTweet.liked_By.push(currentUser.loginId);
    this.tweetService.likeUserTweet(likedTweet).subscribe({
      next: n => {
        this.ngOnInit();
        this.toastr.success('Tweet liked');
      },
      error: e => {
        console.log(e);
        this.onError(e);
      }
    })
  }

  onReply(reply: Tweet) {
    this.currentTweet = reply;
    this.isReplyClicked = true;
    this.replyDisplayStyle = "block";
  }

  onReplyConfirm(reply: string) {
    if (!reply) {
      this.errorMessage = "Field cannot be blank"
    }
    else {
      this.errorMessage = ""
      var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.replyData.username = currentUser.loginId;
      this.replyData.content = reply;
      this.replyData.date = new Date();

      this.currentTweet.reply.push(this.replyData);
      this.tweetService.replyUserTweet(this.currentTweet).subscribe({
        next: n => {
          this.ngOnInit();
          this.isReplyClicked = false;
          this.replyDisplayStyle = "none";
          this.toastr.success('Reply posted successfully');
        },
        error: e => {
          console.log(e)
          this.isReplyClicked = false;
          this.replyDisplayStyle = "none";
          this.onError(e);
        }
      })
    }
  }

  closePopup() {
    this.errorMessage = ""
    this.isReplyClicked = false;
    this.replyDisplayStyle = "none";
  }

  onError(err: any) {
    err.status == 500 ? this.router.navigate(['/error/500']) : err.status == 404 ? this.router.navigate(['/error/404']) : this.router.navigate(['/login']);
  }

}
