package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.UserDto;
import com.velialiyev.twitterclone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/edit")
    public ResponseEntity<HttpStatus> editProfile(@ModelAttribute UserDto user){

       this.userService.saveImage(user);

        return ResponseEntity.ok().build();
    }

}
