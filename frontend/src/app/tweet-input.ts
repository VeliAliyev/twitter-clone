import { Component, Input } from "@angular/core";
import { PostResponse } from "./payloads/response/post";

@Component({
    template: ''
})

export abstract class TweetInput {
    @Input() tweet!: PostResponse;
}