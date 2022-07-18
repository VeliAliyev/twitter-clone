package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.LikeRetweetBookmarkDto;
import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.dto.TweetResponseDto;
import com.velialiyev.twitterclone.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/posts")
@RequiredArgsConstructor
public class TweetController {

    private final TweetService tweetService;

    @PostMapping("/create")
    public ResponseEntity<HttpStatus> createTweet(@RequestBody TweetDto tweetDto){
        this.tweetService.tweet(tweetDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteTweet(@PathVariable(name = "id") Long id){
        this.tweetService.deleteTweet(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/tweets-by-username/{username}")
    public ResponseEntity<List<TweetResponseDto>> getTweetsByUsername(@PathVariable(name = "username") String username){
        return ResponseEntity.ok( this.tweetService.getTweetsByUsername(username));
    }

    @GetMapping("/retweets-by-username/{username}")
    public ResponseEntity<List<TweetResponseDto>> getRetweetsByUsername(@PathVariable(name = "username") String username){
        return ResponseEntity.ok( this.tweetService.getRetweetsByUsername(username));
    }

    @GetMapping("/replies-by-username/{username}")
    public ResponseEntity<List<TweetResponseDto>> getRepliesByUsername(@PathVariable(name = "username") String username){
        return ResponseEntity.ok( this.tweetService.getRepliesByUsername(username));
    }

    @GetMapping("/liked-by-username/{username}")
    public ResponseEntity<List<TweetResponseDto>> getLikedByUsername(@PathVariable(name = "username") String username){
        return ResponseEntity.ok( this.tweetService.getLikedByUsername(username));
    }

    @GetMapping
    public ResponseEntity<List<TweetResponseDto>> getAll(){
        List<TweetResponseDto> tweets = this.tweetService.getAll();
        return ResponseEntity.ok(tweets);
    }

    @GetMapping("/replies-for-tweet/{id}")
    public ResponseEntity<List<TweetResponseDto>> getRepliesForTweet(@PathVariable(name = "id") Long id){
        List<TweetResponseDto> tweets = this.tweetService.getRepliesForTweet(id);
        return ResponseEntity.ok(tweets);
    }
}
