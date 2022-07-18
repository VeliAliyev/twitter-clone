import { Component, Input, OnInit } from '@angular/core';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faSolidBookmark }  from '@fortawesome/free-solid-svg-icons';
import { BookmarkService } from '../services/bookmark.service';
import { Router } from '@angular/router';
import { SingleAction } from '../single-action';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent extends SingleAction implements OnInit {
  
  constructor(private bookmarkService: BookmarkService, private router: Router) { 
    super();
    this.faIcon = faBookmark;
    this.faSolidIcon = faSolidBookmark;
  }

  ngOnInit(): void {
    this.bookmarkService.isBookmarked(this.tweet.id).subscribe(response => this.isActive = response);
  }

  bookmark(){
    const self = this;
    this.bookmarkService.bookmark(this.tweet.id).subscribe({complete(){
      self.isActive = !self.isActive;
      if(self.router.url === "/bookmarks")
        self.router.navigateByUrl(self.router.url);
    }});
  }

}
