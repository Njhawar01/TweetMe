import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tweet } from '../model/tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  readonly _baseUrlTweet = "http://localhost:38201/api/v1.0/tweet"; 

  constructor(private http: HttpClient) {}  
    httpOptions = {  
      headers: new HttpHeaders({  
        'Content-Type': 'application/json'
      })  
    }  

  getAllTweets() {
    return this.http.get(this._baseUrlTweet + '/all', {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getUserTweets() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.get(this._baseUrlTweet + '/user' + '/' + currentUser.loginId, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  getUserHandle(username: string) {
    return this.http.get(this._baseUrlTweet + '/user' + '/' + username, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  addUserTweet(addedTweet: Tweet) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.post(this._baseUrlTweet + '/' + currentUser.loginId + '/add', addedTweet, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  editUserTweet(modifiedTweet: Tweet) {
    modifiedTweet.date = new Date();
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.put(this._baseUrlTweet + '/' + currentUser.loginId + '/' + 'update', modifiedTweet, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  deleteUserTweet(modifiedTweet: Tweet) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.delete(this._baseUrlTweet + '/' + currentUser.loginId + '/' + 'delete' + '/' + modifiedTweet.id, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  likeUserTweet(modifiedTweet: Tweet) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.put(this._baseUrlTweet + '/' + currentUser.loginId + '/' + 'like' + '/' + modifiedTweet.id, modifiedTweet, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }

  replyUserTweet(repliedTweet: Tweet) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return this.http.put(this._baseUrlTweet + '/' + currentUser.loginId + '/reply' +'/' + repliedTweet.id, repliedTweet, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
