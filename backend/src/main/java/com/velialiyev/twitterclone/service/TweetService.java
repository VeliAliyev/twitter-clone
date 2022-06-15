package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.TweetType;
import com.velialiyev.twitterclone.entity.UserEntity;
import com.velialiyev.twitterclone.repository.TweetRepository;
import com.velialiyev.twitterclone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class TweetService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final TweetRepository tweetRepository;

    public void createTweet(TweetDto tweetDto) {
        TweetEntity tweet = null;
        TweetType type;
        String email = this.authenticationService.getUserFromJwt().getEmail();
        UserEntity currentUser = userRepository.findByEmail(email).orElseThrow();
        if(tweetDto.getTweetId() != null){
            tweet = tweetRepository.findById(tweetDto.getTweetId()).orElseThrow();
        }
        switch (tweetDto.getType()){
            case "TWEET":
                type = TweetType.TWEET;
                break;
            case "REPLY":
                type = TweetType.REPLY;
                break;
            case "RETWEET":
                type = TweetType.RETWEET;
                break;
            default:
                type = null;
        }

        tweetRepository.save(TweetEntity.builder()
                        .user(currentUser)
                        .text(tweetDto.getText())
                        .tweet(tweet)
                        .type(type)
                        .likeCounter(0)
                        .replyCounter(0)
                        .retweetCounter(0)
                        .createdDate(Instant.now())
                .build());
    }
}
