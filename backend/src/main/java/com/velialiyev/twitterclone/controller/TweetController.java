package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.LikeDto;
import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.dto.TweetResponseDto;
import com.velialiyev.twitterclone.entity.LikeEntity;
import com.velialiyev.twitterclone.entity.TweetType;
import com.velialiyev.twitterclone.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/tweet")
@RequiredArgsConstructor
public class TweetController {

    private final TweetService tweetService;

    @PostMapping("/post")
    public ResponseEntity<HttpStatus> createTweet(@RequestBody TweetDto tweetDto){
        this.tweetService.tweet(tweetDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteTweet(@PathVariable(name = "id") Long id){
        this.tweetService.deleteTweet(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/like")
    public ResponseEntity<HttpStatus> like(@RequestBody LikeDto likeDto){
        this.tweetService.like(likeDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/isLiked")
    public ResponseEntity<Boolean> isLiked(@RequestBody LikeDto likeDto){
         return ResponseEntity.ok(this.tweetService.getLike(likeDto));
    }

    @GetMapping("/tweets")
    public ResponseEntity<List<TweetResponseDto>> getAllTweets(){
        List<TweetResponseDto> tweets = this.tweetService.getAllTweets(TweetType.TWEET);
        return ResponseEntity.ok(tweets);
    }


    @GetMapping("/{id}")
    public ResponseEntity<TweetResponseDto> getTweet(@PathVariable(name = "id") Long id){
        TweetResponseDto tweet = this.tweetService.getTweet(id);
        return ResponseEntity.ok(tweet);
    }
}
