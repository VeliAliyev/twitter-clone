package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.LikeDto;
import com.velialiyev.twitterclone.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/like")
    private ResponseEntity<HttpStatus> like(@RequestBody LikeDto likeDto){
        this.likeService.like(likeDto);
        return ResponseEntity.ok().build();
    }

}
