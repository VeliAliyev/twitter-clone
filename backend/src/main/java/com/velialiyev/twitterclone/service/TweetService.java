package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.LikeDto;
import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.dto.TweetResponseDto;
import com.velialiyev.twitterclone.entity.LikeEntity;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.TweetType;
import com.velialiyev.twitterclone.entity.UserEntity;
import com.velialiyev.twitterclone.repository.LikeRepository;
import com.velialiyev.twitterclone.repository.TweetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TweetService {

    private final LikeRepository likeRepository;
    private final TweetRepository tweetRepository;
    private final AuthenticationService authenticationService;

    @Transactional
    public void tweet(TweetDto tweetDto) {
        UserEntity user = this.authenticationService.getUserFromJwt();
        TweetType type = TweetType.valueOf(tweetDto.getType());

        if(tweetDto.getTweetId() != null){
            TweetEntity tweet = tweetRepository.findById(tweetDto.getTweetId()).orElseThrow();

            if(type == TweetType.REPLY){
                tweet.setReplyCounter(tweet.getReplyCounter() + 1);
                this.createTweet(user, tweetDto.getText(), tweet, type);
            }
            else if(type == TweetType.RETWEET){

                Optional<TweetEntity> retweet = this.tweetRepository.findByUserAndTweetAndType(user, tweet, type);
                if(retweet.isPresent()){
                    tweet.setRetweetCounter(tweet.getRetweetCounter() - 1);
                    this.deleteTweet(retweet.get().getId());
                }
                else{
                    tweet.setRetweetCounter(tweet.getRetweetCounter() + 1);
                    this.createTweet(user, null, tweet, type);
                }

            }
            else if(type == TweetType.QUOTE){
                tweet.setRetweetCounter(tweet.getRetweetCounter() + 1);
                this.createTweet(user, tweetDto.getText(), tweet, type);
            }
            this.tweetRepository.save(tweet);
        }

        else{
            this.createTweet(user, tweetDto.getText(), null, type);
        }

    }

    private void createTweet(UserEntity user, String text, TweetEntity tweet, TweetType type){
        this.tweetRepository.save(
                TweetEntity.builder()
                        .user(user)
                        .text(text)
                        .replyCounter(0)
                        .retweetCounter(0)
                        .likeCounter(0)
                        .tweet(tweet)
                        .type(type)
                        .createdDate(Instant.now())
                        .build()
        );
    }

    @Transactional
    public void deleteTweet(Long id){
        TweetEntity tweet = this.tweetRepository.findById(id).orElseThrow();
        if(tweet.getType() != TweetType.TWEET)
        {
            TweetEntity parentTweet = this.tweetRepository.findById(tweet.getTweet().getId()).orElseThrow();
            if(tweet.getType() == TweetType.REPLY){
                parentTweet.setReplyCounter(parentTweet.getReplyCounter() - 1);
            }
            else{
                parentTweet.setRetweetCounter(parentTweet.getRetweetCounter() - 1);
            }
            this.tweetRepository.save(parentTweet);
        }
        this.tweetRepository.deleteById(id);
    }

    public void like(LikeDto likeDto) {
        UserEntity user = this.authenticationService.getUserFromJwt();
        TweetEntity tweet = this.tweetRepository.findById(likeDto.getTweetId()).orElseThrow();
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
                            .user(user)
                            .tweet(tweet)
                            .build()
            );
        }
    }

    public List<TweetResponseDto> getAllTweets(TweetType type) {
        List<TweetEntity> tweets = this.tweetRepository.findAllByType(type).orElseThrow();
        return tweets.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private TweetResponseDto mapToDto(TweetEntity entity){
        UserEntity user = this.authenticationService.getUserFromJwt();
        return TweetResponseDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .duration(null)
                .tweetText(entity.getText())
                .replyCounter(entity.getReplyCounter())
                .retweetCounter(entity.getRetweetCounter())
                .likeCounter(entity.getLikeCounter())
                .build();
    }
}
