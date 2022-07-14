package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.UserDto;
import com.velialiyev.twitterclone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/edit")
    public ResponseEntity<HttpStatus> editProfile(@RequestParam(name = "profilePicture") MultipartFile image){

       this.userService.saveImage(image);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<UserDto> getCurrentUser(){
        return ResponseEntity.ok(this.userService.getCurrentUser());
    }

}
