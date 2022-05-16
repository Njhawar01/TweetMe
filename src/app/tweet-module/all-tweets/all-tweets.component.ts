import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TweetReply } from 'src/app/core/model/tweet-reply.model';
import { Tweet } from 'src/app/core/model/tweet.model';
import { TweetService } from 'src/app/core/services/tweet.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-all-tweets',
  templateUrl: './all-tweets.component.html',
  styleUrls: ['./all-tweets.component.scss']
})
export class AllTweetsComponent implements OnInit {

  data: any;
  userHandle: any;
  currentTweet: Tweet = new Tweet();
  replyData: TweetReply = new TweetReply();
  isReplyClicked: boolean = false;
  replyDisplayStyle: string = "";
  searchText: string = "";
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
    this.replyData = new TweetReply();
    this.tweetService.getAllTweets().subscribe({
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

  onUserHandleClick(username: string) {
    var url = '/user/' + username;
    return url;
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
