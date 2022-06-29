package com.velialiyev.twitterclone.controller;

import com.velialiyev.twitterclone.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @DeleteMapping("/user/{id}")
    private void delete(@PathVariable(name = "id") Long id){
        this.userService.delete(id);
    }

}
