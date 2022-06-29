package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.LikeDto;
import com.velialiyev.twitterclone.entity.*;
import com.velialiyev.twitterclone.repository.LikeRepository;
import com.velialiyev.twitterclone.repository.ReplyRepository;
import com.velialiyev.twitterclone.repository.TweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final TweetRepository tweetRepository;
    private final ReplyRepository replyRepository;
    private final AuthenticationService authenticationService;


    @Transactional
    public void like(LikeDto likeDto){
        UserEntity user = this.authenticationService.getUserFromJwt();

        if(likeDto.getType().equals("TWEET"))
            this.likeTweet(user, likeDto.getTweetId());

        else if(likeDto.getType().equals("REPLY")){
            this.likeReply(user, likeDto.getTweetId());
        }
    }

    @Transactional
    public void likeTweet(UserEntity user, Long id){

        TweetEntity tweet = this.tweetRepository.findById(id).orElseThrow();
        Optional<LikeEntity> optional = this.likeRepository.findByUserAndTweet(user, tweet);

        if(optional.isPresent()){
            tweet.setLikeCounter(tweet.getLikeCounter() - 1);
            this.tweetRepository.save(tweet);
            this.likeRepository.delete(optional.get());
        }
        else{
            tweet.setLikeCounter(tweet.getLikeCounter() + 1);
            this.tweetRepository.save(tweet);
            this.likeRepository.save(
                    LikeEntity.builder()
                            .tweet(tweet)
                            .reply(null)
                            .user(user)
                            .build()
            );
        }
    }

    @Transactional
    public void likeReply(UserEntity user, Long id){

        ReplyEntity reply = this.replyRepository.findById(id).orElseThrow();
        Optional<LikeEntity> optional = this.likeRepository.findByUserAndReply(user, reply);

        if(optional.isPresent()){
            reply.setLikeCounter(reply.getLikeCounter() - 1);
            this.replyRepository.save(reply);
            this.likeRepository.delete(optional.get());
        }
        else{
            reply.setLikeCounter(reply.getLikeCounter() + 1);
            this.replyRepository.save(reply);
            this.likeRepository.save(
                    LikeEntity.builder()
                            .tweet(null)
                            .reply(reply)
                            .user(user)
                            .build()
            );
        }
    }
}
