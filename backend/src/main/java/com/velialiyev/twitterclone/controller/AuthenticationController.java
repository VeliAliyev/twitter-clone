package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.dto.LoginRequestDto;
import com.velialiyev.twitterclone.dto.LoginResponseDto;
import com.velialiyev.twitterclone.dto.LogoutRequestDto;
import com.velialiyev.twitterclone.dto.SignUpRequestDto;
import com.velialiyev.twitterclone.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<HttpStatus> signup(@RequestBody SignUpRequestDto signUpRequestDto){
        this.authenticationService.signup(signUpRequestDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok().body(this.authenticationService.login(loginRequestDto));
    }

    @PostMapping("/logout")
    public ResponseEntity<HttpStatus> logout(@RequestBody LogoutRequestDto logoutRequestDto){
        this.authenticationService.logout(logoutRequestDto);
        return ResponseEntity.ok().build();
    };
}
