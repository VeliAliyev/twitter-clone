import { Component, Input } from "@angular/core";
import { PostResponse } from "./payloads/response/post";
import { TweetInput } from "./tweet-input";



@Component({
    template: ''
  })

export abstract class SingleAction extends TweetInput {
    faIcon: any;
    faSolidIcon: any;
    isActive: boolean = false;
}