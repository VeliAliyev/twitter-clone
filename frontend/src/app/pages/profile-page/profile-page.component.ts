import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OverlayForm } from 'src/app/overlay-form';
import { PostResponse } from 'src/app/payloads/response/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user-model';
import { ImageCroppedEvent, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent extends OverlayForm implements OnInit {

  user: User;
  bannerPicture: any;
  profilePicture: any;
  cropImgPreview: any;
  bannerChangeEvt: any;
  isBannerChanged: boolean;
  isUploadingBanner: boolean;
  tweets: Array<PostResponse>;
  navigationSubscription: any;
  profilePictureChangeEvt: any;
  isProfilePictureChanged: boolean;
  isUploadingProfilePicture: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private postService: PostService) {

    super();

    this.isBannerChanged = false;
    this.isUploadingBanner = false;
    this.isProfilePictureChanged = false;
    this.isUploadingProfilePicture = false;

    this.tweets = new Array();

    this.user = {
      firstName: "",
      lastName: "",
      username: this.authService.getUsername(),
      bio: "",
      location: "",
      personalWebsite: "",
      birthDate: ""
    };

    this.userService.getUser(this.user.username).subscribe(user => {
      this.user = user;
        
      this.form.patchValue({
        firstName: this.user.firstName,
        bio: this.user.bio,
        location: this.user.location,
        personalWebsite: this.user.personalWebsite,
        birthDate: this.user.birthDate
      })
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.navigationSubscription = this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        
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
    
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getUrl(){
    return this.router.url;
  }

  fetchLikes() {
    this.postService.getLikesByUsername(this.user.username).subscribe(response => this.tweets = response);
  }

  fetchReplies() {
    this.postService.getRepliesByUsername(this.user.username).subscribe(response => this.tweets = response);
  }

  fetchRetweets() {
    this.postService.getRetweetsByUsername(this.user.username).subscribe(response => this.tweets = response);
  }

  fetchTweets() {
    this.postService.getTweetsByUsername(this.user.username).subscribe(response => this.tweets = response);
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

    if (this.isBannerChanged) {
      pictureBeforeCrop = <File>this.bannerChangeEvt.target.files[0];
      picture = new File([base64ToFile(this.bannerPicture)], pictureBeforeCrop.name);
      this.userService.saveBannerPicture(picture).subscribe({
        complete() {
          window.location.reload();
        }
      });
    }

    if (this.isProfilePictureChanged) {
      pictureBeforeCrop = <File>this.profilePictureChangeEvt.target.files[0];
      picture = new File([base64ToFile(this.profilePicture)], pictureBeforeCrop.name);
      this.userService.saveProfilePicture(picture).subscribe({
        complete() {
          window.location.reload();
        }
      });
    }

    let payload = {
      firstName: this.form.get("firstName")?.value,
      bio: this.form.get("bio")?.value,
      location: this.form.get("location")?.value,
      personalWebsite: this.form.get("personalWebsite")?.value,
      birthDate: this.form.get("birthDate")?.value,
      username: this.user.username
    }
    
    this.userService.editProfile(payload).subscribe(res => this.router.navigateByUrl(this.router.url));

    this.isOverlay = false;
  }
}
