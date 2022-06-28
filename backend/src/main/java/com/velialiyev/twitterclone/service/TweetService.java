package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.UserEntity;
import com.velialiyev.twitterclone.repository.TweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TweetService {

    private final TweetRepository tweetRepository;
    private final AuthenticationService authenticationService;

    public void tweet(TweetDto tweetDto){

        UserEntity user = this.authenticationService.getUserFromJwt();

        this.tweetRepository.save(
                TweetEntity.builder()
                        .text(tweetDto.getText())
                        .user(user)
                        .retweetCounter(0)
                        .replyCounter(0)
                        .likeCounter(0)
                        .build()
        );
    }

}
