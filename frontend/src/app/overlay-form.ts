import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { PostRequest } from "./payloads/request/post";
import { TweetInput } from "./tweet-input";

@Component({
  template: ''
})

export abstract class OverlayForm extends TweetInput {

  isOverlay: boolean = false;
  payload: PostRequest;
  form: FormGroup;
  isActive: boolean = false;
  constructor() {
    super();
    this.payload = {
      text: "",
      tweetId: 0,
      type: ""
    }

    this.form = new FormGroup({
      text: new FormControl(""),
      firstName: new FormControl(""),
      bio: new FormControl(""),
      location: new FormControl(""),
      personalWebsite: new FormControl(""),
      birthDate: new FormControl(""),
    })
  }

  hideOverlay(event: Event) {
    if ((event.target as HTMLElement).classList.contains("overlay"))
      this.isOverlay = false;

  }

  showOverlay() {
    this.isOverlay = true;
  }
}