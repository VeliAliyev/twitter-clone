import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../landing-page/auth.service';
import { RetweetResponsePayload } from './retweet/retweet-response.payload';
import { TweetRequestPayload } from './tweet-request.payload';
import { TweetResponsePayload } from './tweet-response.payload';
import { TweetService } from './tweet.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  navigationSubscription;
  newTweetForm: FormGroup;
  tweetRequestPayload: TweetRequestPayload;
  tweets: Array<TweetResponsePayload>;
  username: string;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private toastr: ToastrService, 
    private tweetService: TweetService, 
    private router: Router,
    private auhtService: AuthService) { 
    
      this.navigationSubscription = this.router.events.subscribe((event: any)=>{
      if(event instanceof NavigationEnd){
        this.fetchTweets();
      }
    })

    this.username = this.auhtService.getUsername();
    
    this.newTweetForm = new FormGroup({
      text: new FormControl("", Validators.required)
    })
    this.tweets = new Array();
    this.tweetRequestPayload = {
      text: "",
      type: ""
    }


  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params=>{
      if(params["signedIn"] !== undefined && params["signedIn"] === "true"){
        this.toastr.success("Sign In Successful");
      }
    })
    this.fetchTweets();
  }

  fetchTweets(){
    const self = this;
    this.tweetService.getAll().subscribe({
      next(data){
        self.tweets = data;
       
      }
    })
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  tweet(){
    
    this.tweetRequestPayload.text = this.newTweetForm.get("text")?.value;
    this.tweetRequestPayload.type = "TWEET";
    const self = this;
    this.tweetService.tweet(this.tweetRequestPayload).subscribe({
      next(response){
        console.log(response)
        self.newTweetForm.reset();
        self.router.navigateByUrl("home");
      },
      complete(){},
      error(error){
        console.log(error)
      }
    })

  }


  
}
