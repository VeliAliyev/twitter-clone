import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayForm } from '../overlay-form';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent extends OverlayForm implements OnInit {

  constructor(private postService: PostService, private router: Router) {
    super();
  }

  ngOnInit(): void {
  }

  reply(){
    const self = this;
    this.payload = {
      text: this.form.get("text")?.value,
      tweetId: this.tweet.id,
      type: "REPLY"
    }

    this.postService.tweet(this.payload).subscribe({
      complete() {
        self.form.reset();
        self.router.navigate(["/tweet/" + self.tweet.id], {state: {data: self.tweet}});
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
