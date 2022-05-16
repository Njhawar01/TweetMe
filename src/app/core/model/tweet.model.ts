import { TweetReply } from "./tweet-reply.model";

export class Tweet {
    name: string;
    id: string
    login_Id: string;
    post: string;
    date: Date;
    like: number;
    liked_By: string[];
    reply: TweetReply[];
  constructor() {
      this.name = "";
      this.id = "";
      this.login_Id = "";
      this.post = "";
      this.date = new Date();
      this.liked_By =  [];
      this.reply = [];
      this.like = 0;
    }
  }