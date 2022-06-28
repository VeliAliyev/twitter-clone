package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.service.TweetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class TweetController {

    private final TweetService tweetService;

    @PostMapping("/tweet")
    private ResponseEntity<HttpStatus> tweet(@RequestBody TweetDto tweetDto){
        this.tweetService.tweet(tweetDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/tweet/{id}")
    private ResponseEntity<HttpStatus> deleteTweet(@PathVariable(name = "id") Long id){
        this.tweetService.deleteTweet(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reply")
    private ResponseEntity<HttpStatus> reply(@RequestBody TweetDto tweetDto){
        this.tweetService.reply(tweetDto);
        return ResponseEntity.ok().build();
    }

}
