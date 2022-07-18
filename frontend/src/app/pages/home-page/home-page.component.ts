import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostRequest } from 'src/app/payloads/request/post';
import { PostResponse } from 'src/app/payloads/response/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  navigationSubscription;
  newTweetForm: FormGroup;
  payload: PostRequest;
  tweets: Array<PostResponse>;
  username: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private postService: PostService,
    private router: Router,
    private auhtService: AuthService) {

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
  
      this.navigationSubscription = this.router.events.subscribe((event: any) => {
  
        if (event instanceof NavigationEnd) {
          this.router.navigated = false;
        }
      })
  

    this.username = this.auhtService.getUsername();

    this.newTweetForm = new FormGroup({
      text: new FormControl("", Validators.required)
    })
    this.tweets = new Array();
    this.payload = {
      text: "",
      type: ""
    }


  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      if (params["signedIn"] !== undefined && params["signedIn"] === "true") {
        this.toastr.success("Sign In Successful");
      }
    })
    this.fetchTweets();
  }

  fetchTweets() {
    const self = this;
    this.postService.getAll().subscribe({
      next(data) {
        self.tweets = data;

      }
    })
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  tweet() {

    this.payload.text = this.newTweetForm.get("text")?.value;
    this.payload.type = "TWEET";
    const self = this;
    this.postService.tweet(this.payload).subscribe({
      next(response) {
        console.log(response)
        self.newTweetForm.reset();
        self.router.navigateByUrl("home");
      },
      complete() { },
      error(error) {
        console.log(error)
      }
    })

  }
}