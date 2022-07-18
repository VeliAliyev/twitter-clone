package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.LikeRetweetBookmarkDto;
import com.velialiyev.twitterclone.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/likes")
@RequiredArgsConstructor
public class LikeController {

    private final TweetService tweetService;

    @PostMapping("/like")
    public ResponseEntity<HttpStatus> like(@RequestBody LikeRetweetBookmarkDto likeRetweetBookmarkDto){
        this.tweetService.like(likeRetweetBookmarkDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/is-liked")
    public ResponseEntity<Boolean> isLiked(@RequestBody LikeRetweetBookmarkDto likeRetweetBookmarkDto){
        return ResponseEntity.ok(this.tweetService.isLiked(likeRetweetBookmarkDto));
    }

    @GetMapping("/like-counter/{id}")
    public ResponseEntity<Integer> likeCounter(@PathVariable(name = "id") Long id){
        return ResponseEntity.ok(this.tweetService.likeCounter(id));
    }

}
