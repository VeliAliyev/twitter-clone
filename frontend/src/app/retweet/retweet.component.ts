import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayForm } from '../overlay-form';
import { PostService } from '../services/post.service';
import { RetweetService } from '../services/retweet.service';
import { SingleAction } from '../single-action';


@Component({
  selector: 'app-retweet',
  templateUrl: './retweet.component.html',
  styleUrls: ['./retweet.component.css']
})
export class RetweetComponent extends OverlayForm implements OnInit {

  showDropdown: boolean = false;

  constructor(private retweetService: RetweetService, private router: Router, private postService: PostService) {
    super();
  }

  //WINDOOW LISTENER FOR DROPDOWN MENU
  ngOnInit(): void {

    this.retweetService.isRetweeted(this.tweet.id).subscribe(response => this.isActive = response);

    const self = this;
    window.addEventListener('click', function handleClick(event) {
      if (!(event.target as HTMLElement).matches(".dropbtn")) {
        self.show(false);
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');

          }
        }
      }
    });
  }

  show(status: boolean) {

    if (status === true && this.showDropdown === true)
      this.showDropdown = false;
    else
      this.showDropdown = status;
  }

  retweet() {
    const self = this;
    this.retweetService.retweet(this.tweet.id).subscribe({
      complete() {
        self.router.navigateByUrl("home");
      },
      error(err) {
        console.log(err);
      },
    });
    this.isActive = !this.isActive;
  }

  quote() {
    const self = this;
    this.payload = {
      text: this.form?.get("text")?.value,
      tweetId: this.tweet.id,
      type: "QUOTE"
    }
    this.postService.tweet(this.payload).subscribe({
      complete() {
        self.router.navigateByUrl("home");
       self.form.reset();
      }, error(err) {
        console.log(err);
      },
    });

  }


}
