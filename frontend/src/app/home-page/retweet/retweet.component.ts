import { Component, Input, OnInit } from '@angular/core';
import { TweetResponsePayload } from '../tweet-response.payload';

import { faRepeat }  from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { TweetService } from '../tweet.service';
import { TweetRequestPayload } from '../tweet-request.payload';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-retweet',
  templateUrl: './retweet.component.html',
  styleUrls: ['./retweet.component.css']
})
export class RetweetComponent implements OnInit {
  @Input() tweet: TweetResponsePayload;
  faRepeat = faRepeat;
  showDropdown: BehaviorSubject<boolean>;
  overlay:BehaviorSubject<boolean>;
  quoteForm: FormGroup;
  quotePayload: TweetRequestPayload;
  constructor(private tweetService:TweetService, private router: Router) {
    
    this.showDropdown = new BehaviorSubject(false); 
    
    this.overlay=new BehaviorSubject(false);
    
    this.quoteForm = new FormGroup({
      text: new FormControl("")
    })

    this.tweet = {
      id: 0,
      firstName: "",
      lastName: "",
      username: "",
      duration: "",
      tweetText: "",
      replyCounter: 0,
      retweetCounter: 0,
      likeCounter: 0,
      }

     this.quotePayload = {
      text: "",
      tweetId: 0,
      type: ""
     }
   }

  ngOnInit(): void {
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
  show(status:boolean){
    if(status == true && this.showDropdown.getValue()==true)
      this.showDropdown.next(false);
    else
      this.showDropdown.next(status);
    console.log(this.showDropdown.getValue());
  }

  retweet(tweetId: number){
    const self = this;
    this.tweetService.retweet(tweetId).subscribe({
      next(response){console.log(response)},
      complete(){
        self.router.navigateByUrl("home");
      },
      error(error){console.log(error)}
    })
  }

  quote(){
    const self = this;
    this.quotePayload.text = this.quoteForm.get("text")?.value;
    this.quotePayload.tweetId = this.tweet.id;
    this.quotePayload.type = "QUOTE";
    this.tweetService.quote(this.quotePayload).subscribe({
      next(response){console.log(response)},
      complete(){
        self.router.navigateByUrl("home");
      },
      error(error){console.log(error)}
    });
  }

  hideOverlay(event:Event){
    if((event.target as HTMLElement).classList.contains("overlay"))
      this.overlay.next(false);
  
  }

  showOverlay(){
    this.overlay.next(true);
  }
}
