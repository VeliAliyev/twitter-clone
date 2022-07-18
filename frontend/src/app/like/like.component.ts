import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { LikeService } from '../services/like.service';
import { SingleAction } from '../single-action';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent extends SingleAction implements OnInit {
  
  constructor(private likeService: LikeService, private router: Router) { 
    super();
    this.faIcon = faHeart;
    this.faSolidIcon = faSolidHeart;
  }

  ngOnInit(): void {
    this.likeService.isLiked(this.tweet.id).subscribe(response => this.isActive = response);
  }

  like() {
    const self = this;
    this.likeService.like(this.tweet.id).subscribe({
      complete() {
        self.likeService.getLikeCounter(self.tweet.id).subscribe(likeCounter => self.tweet.likeCounter = likeCounter);
        self.isActive = !self.isActive;
        
        if(self.router.url == "/profile/likes"){
          console.log("URL : " + self.router.url);
          self.router.navigateByUrl(self.router.url);
        }
          
      }
    });
  }
}
