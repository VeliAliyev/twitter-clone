import { LocalizedString } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import Cropper from 'cropperjs';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';
import { BehaviorSubject } from 'rxjs';
import { TweetResponsePayload } from '../home-page/tweet-response.payload';
import { TweetService } from '../home-page/tweet.service';
import { AuthService } from '../landing-page/auth.service';
import { User } from '../user-model';
import { UserService } from './user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  isOverlay: BehaviorSubject<boolean>;
  url: string;
  tweets: Array<TweetResponsePayload>;
  user: User;
  navigationSubscription;
  profileForm: FormGroup;
  profilePayload: any;
  isUploadingBanner: Boolean = false;
  isUploadingProfilePicture: Boolean = false;
  selectedFile?: File;
  bannerPicture: any;
  profilePicture: any;
  bannerChangeEvt: any = '';
  profilePictureChangeEvt: any = '';
  cropImgPreview: any = '';
  username: string;
  isBannerChanged: Boolean = false;
  isProfilePictureChanged: Boolean = false;

  constructor(
    private router: Router,
    private tweetService: TweetService,
    private authService: AuthService,
    private userService: UserService) {

    this.username = this.authService.getUsername();

    this.user = {

      firstName: "",
      lastName: "",
      username: "",
      bio: "",
      location: "",
      personalWebsite: "",
      birthDate: ""
    };


    this.userService.getUser(this.username).subscribe(user => {
      this.user = user;
    });



    this.isOverlay = new BehaviorSubject(false);
    this.url = this.router.url;
    this.tweets = new Array();


    this.profileForm = new FormGroup({
      firstName: new FormControl(""),
      bio: new FormControl(""),
      location: new FormControl(""),
      website: new FormControl(""),
      birthDate: new FormControl(""),
    })
    
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      
        if(event instanceof NavigationEnd){
          this.router.navigated = false;
        

       
          if (this.router.url === "/profile/tweets") {
            this.fetchTweets();
         
          }
          else if (this.router.url === "/profile/retweets") {
            this.fetchRetweets();
          }
          else if (this.router.url === "/profile/replies") {
            this.fetchReplies();
          }
  
          else if (this.router.url === "/profile/likes") {
            this.fetchLikes();
          }
        
        }
      
    })

  }
  ngOnInit(): void {
   
    this.profileForm.setValue({
      firstName: this.user.firstName,
      bio: this.user.bio,
      location: this.user.location,
      website: this.user.personalWebsite,
      birthDate: this.user.birthDate,
    });
  }



  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }


  fetchTweets() {
    const self = this;
    this.tweetService.getTweetsByUsername(this.username).subscribe(response => self.tweets = response);
  }

  fetchRetweets() {
    const self = this;
    this.tweetService.getRetweetsByUsername(this.username).subscribe(response => self.tweets = response);
  }

  fetchReplies() {
    const self = this;
    this.tweetService.getRepliesByUsername(this.username).subscribe(response => self.tweets = response);
  }

  fetchLikes() {
    const self = this;
    this.tweetService.getLikesByUsername(this.username).subscribe(response => self.tweets = response);
  }

  hideOverlay(event: Event) {
    if ((event.target as HTMLElement).classList.contains("overlay"))
      this.isOverlay.next(false);
  }

  showOverlay() {
    this.isOverlay.next(true);
  }

  onBannerPictureChanged(event: any) {
    this.isUploadingBanner = true;
    this.bannerPicture = <File>event.target.files[0];
    this.bannerChangeEvt = event;
  }
  onProfilePictureChanged(event: any) {
    this.isUploadingProfilePicture = true;
    this.profilePicture = <File>event.target.files[0];
    console.log(this.profilePicture.name);
    this.profilePictureChangeEvt = event;
  }

  cropImg(event: ImageCroppedEvent) {

    this.cropImgPreview = event.base64;

  }

  cropBanner() {
    this.isUploadingBanner = false;
    this.bannerPicture = this.cropImgPreview;
    this.isBannerChanged = true;
  }

  cropProfilePicture() {
    this.isUploadingProfilePicture = false;
    this.profilePicture = this.cropImgPreview;
    this.isProfilePictureChanged = true;
  }

  save() {

    let picture;
    let pictureBeforeCrop;

    if(this.isBannerChanged){
      pictureBeforeCrop = <File>this.bannerChangeEvt.target.files[0];
      picture = new File([base64ToFile(this.bannerPicture)], pictureBeforeCrop.name);
      this.userService.saveBannerPicture(picture).subscribe({
        complete() {
          window.location.reload();
        }
      });
    }

    if(this.isProfilePictureChanged){
      pictureBeforeCrop = <File>this.profilePictureChangeEvt.target.files[0];
      picture = new File([base64ToFile(this.profilePicture)], pictureBeforeCrop.name);
      this.userService.saveProfilePicture(picture).subscribe({
        complete() {
          window.location.reload();
        }
      });
    }
    
    this.isOverlay.next(false);

  }

}
