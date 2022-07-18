package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.UserDto;
import com.velialiyev.twitterclone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    String profilePictureDirectory = "/profilePicture";
    String bannerPictureDirectory = "/bannerPicture";

    @GetMapping("/profile-picture/get/{username}")
    public ResponseEntity<?> getProfilePicture(@PathVariable(name = "username") String username){

        Path path = this.userService.fetchPicturePath(username, this.profilePictureDirectory);
        ByteArrayResource resource = this.userService.getPicture(username, this.profilePictureDirectory);

        return ResponseEntity.ok().contentLength(path.toFile().length()).contentType(MediaType.IMAGE_JPEG).body(resource);
    }

    @PostMapping("/profile-picture/save")
    public ResponseEntity<HttpStatus> saveProfilePicture(
            @RequestParam(name = "profilePicture") MultipartFile profilePicture,
            @RequestParam(name = "username") String username){

       this.userService.savePicture(profilePicture, username, this.profilePictureDirectory);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/banner-picture/get/{username}")
    public ResponseEntity<?> getBannerPicture(@PathVariable(name = "username") String username){
        Path path = this.userService.fetchPicturePath(username, this.bannerPictureDirectory);
        ByteArrayResource resource = this.userService.getPicture(username, this.bannerPictureDirectory);

        return ResponseEntity.ok().contentLength(path.toFile().length()).contentType(MediaType.IMAGE_JPEG).body(resource);
    }

    @PostMapping("/banner-picture/save")
    public ResponseEntity<HttpStatus> saveBannerPicture(
            @RequestParam(name = "bannerPicture") MultipartFile bannerPicture,
            @RequestParam(name = "username") String username){

        this.userService.savePicture(bannerPicture, username, this.bannerPictureDirectory);

        return ResponseEntity.ok().build();
    }


    @GetMapping("{username}")
    public ResponseEntity<UserDto> getUser(@PathVariable(name = "username") String username){
        return ResponseEntity.ok(this.userService.getUser(username));
    }

    @PostMapping("/edit-profile")
    public void editProfile(@RequestBody UserDto user){
        this.userService.editProfile(user);
    }



}
