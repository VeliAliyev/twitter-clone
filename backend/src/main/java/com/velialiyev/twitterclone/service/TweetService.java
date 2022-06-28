package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.entity.ReplyEntity;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.UserEntity;
import com.velialiyev.twitterclone.repository.ReplyRepository;
import com.velialiyev.twitterclone.repository.TweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TweetService {

    private final TweetRepository tweetRepository;
    private final ReplyRepository replyRepository;
    private final AuthenticationService authenticationService;

    @Transactional
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

    @Transactional
    public void deleteTweet(Long id){
        this.tweetRepository.deleteById(id);
    }

    @Transactional
    public void reply(TweetDto tweetDto) {
        UserEntity user = this.authenticationService.getUserFromJwt();
        TweetEntity tweet = this.tweetRepository.findById(tweetDto.getTweetId()).orElseThrow();
        this.replyRepository.save(
                ReplyEntity.builder()
                        .tweet(tweet)
                        .text(tweetDto.getText())
                        .user(user)
                        .replyCounter(0)
                        .retweetCounter(0)
                        .likeCounter(0)
                        .build()
        );

    }
}
