package com.velialiyev.twitterclone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class TwitterCloneApplication {

    public static void main(String[] args) {
        SpringApplication.run(TwitterCloneApplication.class, args);
    }

}
