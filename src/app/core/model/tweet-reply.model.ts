export class TweetReply {
    username: string;
    content: string;
    date: Date;
  constructor() {
      this.username = "";
      this.content = "";
      this.date = new Date();
    }
  }