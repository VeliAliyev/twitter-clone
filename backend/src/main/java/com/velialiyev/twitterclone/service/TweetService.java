package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.entity.ReplyEntity;
import com.velialiyev.twitterclone.entity.RetweetEntity;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.UserEntity;
import com.velialiyev.twitterclone.repository.ReplyRepository;
import com.velialiyev.twitterclone.repository.RetweetRepository;
import com.velialiyev.twitterclone.repository.TweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TweetService {

    private final TweetRepository tweetRepository;
    private final ReplyRepository replyRepository;
    private final RetweetRepository retweetRepository;
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

        if(tweetDto.getType().equals("TWEET")){
            this.replyToTweet(user, tweetDto.getTweetId(), tweetDto.getText());
        }
        else if(tweetDto.getType().equals("REPLY")){
            this.replyToReply(user, tweetDto.getTweetId(), tweetDto.getText());
        }
        else if(tweetDto.getType().equals("RETWEET")){
            this.replyToRetweet(user, tweetDto.getTweetId(), tweetDto.getText());
        }

    }

    private void replyToTweet(UserEntity user, Long tweetId, String text){
        TweetEntity tweet = this.tweetRepository.findById(tweetId).orElseThrow();

        tweet.setReplyCounter(tweet.getReplyCounter() + 1);
        this.tweetRepository.save(tweet);

        this.replyRepository.save(
                ReplyEntity.builder()
                        .tweet(tweet)
                        .text(text)
                        .user(user)
                        .replyCounter(0)
                        .retweetCounter(0)
                        .likeCounter(0)
                        .build()
        );
    }
    private void replyToReply(UserEntity user, Long replyId, String text){
        ReplyEntity reply = this.replyRepository.findById(replyId).orElseThrow();

        reply.setReplyCounter(reply.getReplyCounter() + 1);
        this.replyRepository.save(reply);

        this.replyRepository.save(
                ReplyEntity.builder()
                        .reply(reply)
                        .text(text)
                        .user(user)
                        .replyCounter(0)
                        .retweetCounter(0)
                        .likeCounter(0)
                        .build()
        );
    }
    private void replyToRetweet(UserEntity user, Long retweetId, String text){
        RetweetEntity retweet = this.retweetRepository.findById(retweetId).orElseThrow();

        retweet.setReplyCounter(retweet.getReplyCounter() + 1);
        this.retweetRepository.save(retweet);

        this.replyRepository.save(
                ReplyEntity.builder()
                        .retweet(retweet)
                        .text(text)
                        .user(user)
                        .replyCounter(0)
                        .retweetCounter(0)
                        .likeCounter(0)
                        .build()
        );
    }

    @Transactional
    public void deleteReply(Long id){
        ReplyEntity reply = this.replyRepository.findById(id).orElseThrow();
        if(reply.getTweet() != null){
            TweetEntity tweet = this.tweetRepository.findById(reply.getTweet().getId()).orElseThrow();
            tweet.setReplyCounter(tweet.getReplyCounter() - 1);
            this.tweetRepository.save(tweet);
        }
        else if(reply.getReply() != null){
            ReplyEntity replyEntity = this.replyRepository.findById(reply.getReply().getId()).orElseThrow();
            replyEntity.setReplyCounter(replyEntity.getReplyCounter() - 1);
            this.replyRepository.save(replyEntity);
        }
        else if(reply.getRetweet() != null){
            RetweetEntity retweet = this.retweetRepository.findById(reply.getRetweet().getId()).orElseThrow();
            retweet.setReplyCounter(retweet.getReplyCounter() - 1);
            this.retweetRepository.save(retweet);
        }
        this.replyRepository.deleteById(id);
    }

    @Transactional
    public void retweet(TweetDto tweetDto){
        UserEntity user = this.authenticationService.getUserFromJwt();

        if(tweetDto.getType().equals("TWEET")){
            this.retweetTweet(user, tweetDto.getTweetId(), tweetDto.getText());
        }
        else if(tweetDto.getType().equals("REPLY")){
            this.retweetReply(user, tweetDto.getTweetId(), tweetDto.getText());
        }
        else if(tweetDto.getType().equals("RETWEET")){
            this.retweetRetweet(user, tweetDto.getTweetId(), tweetDto.getText());
        }
    }

    private void retweetTweet(UserEntity user, Long tweetId, String text){
        TweetEntity tweet = this.tweetRepository.findById(tweetId).orElseThrow();
        Optional<RetweetEntity> optional = this.retweetRepository.findByUserAndTweet(user, tweet);
        if(optional.isPresent()){
            tweet.setRetweetCounter(tweet.getRetweetCounter() - 1);
            this.retweetRepository.delete(optional.get());
        }
        else{
            tweet.setRetweetCounter(tweet.getRetweetCounter() + 1);
            this.retweetRepository.save(
                    RetweetEntity.builder()
                            .user(user)
                            .tweet(tweet)
                            .text(text)
                            .replyCounter(0)
                            .retweetCounter(0)
                            .likeCounter(0)
                            .build()
            );
        }
        this.tweetRepository.save(tweet);
    }

    private void retweetReply(UserEntity user, Long replyId, String text){
        ReplyEntity reply = this.replyRepository.findById(replyId).orElseThrow();
        Optional<RetweetEntity> optional = this.retweetRepository.findByUserAndReply(user, reply);

        if(optional.isPresent()){
            reply.setRetweetCounter(reply.getRetweetCounter() - 1);
            this.retweetRepository.delete(optional.get());
        }
        else{
            reply.setRetweetCounter(reply.getRetweetCounter() + 1);
            this.retweetRepository.save(
                    RetweetEntity.builder()
                            .user(user)
                            .reply(reply)
                            .text(text)
                            .replyCounter(0)
                            .retweetCounter(0)
                            .likeCounter(0)
                            .build()
            );
        }
        this.replyRepository.save(reply);
    }

    private void retweetRetweet(UserEntity user, Long retweetId, String text){
        RetweetEntity retweet = this.retweetRepository.findById(retweetId).orElseThrow();
        Optional<RetweetEntity> optional = this.retweetRepository.findByUserAndRetweet(user, retweet);

        if(optional.isPresent()){
            retweet.setRetweetCounter(retweet.getRetweetCounter() - 1);
            this.retweetRepository.delete(optional.get());
        }
        else{
            retweet.setRetweetCounter(retweet.getRetweetCounter() + 1);
            this.retweetRepository.save(
                    RetweetEntity.builder()
                            .user(user)
                            .retweet(retweet)
                            .text(text)
                            .replyCounter(0)
                            .retweetCounter(0)
                            .likeCounter(0)
                            .build()
            );
        }
        this.retweetRepository.save(retweet);
    }

    @Transactional
    public void deleteRetweet(Long id){
        RetweetEntity retweet = this.retweetRepository.findById(id).orElseThrow();

        if(retweet.getTweet() != null){
            TweetEntity tweet = this.tweetRepository.findById(retweet.getTweet().getId()).orElseThrow();
            tweet.setRetweetCounter(tweet.getRetweetCounter() - 1);
            this.tweetRepository.save(tweet);
        }
        else if(retweet.getReply() != null){
            ReplyEntity reply = this.replyRepository.findById(retweet.getReply().getId()).orElseThrow();
            reply.setRetweetCounter(reply.getRetweetCounter() - 1);
            this.replyRepository.save(reply);
        }

        else if(retweet.getRetweet() != null){
            RetweetEntity retweetEntity = this.retweetRepository.findById(retweet.getRetweet().getId()).orElseThrow();
            retweetEntity.setRetweetCounter(retweetEntity.getRetweetCounter() - 1);
            this.retweetRepository.save(retweetEntity);
        }

        this.retweetRepository.deleteById(id);
    }
}
