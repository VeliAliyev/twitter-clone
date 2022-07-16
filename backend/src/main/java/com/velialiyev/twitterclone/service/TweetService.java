package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.LikeRetweetBookmarkDto;
import com.velialiyev.twitterclone.dto.TweetDto;
import com.velialiyev.twitterclone.dto.TweetResponseDto;
import com.velialiyev.twitterclone.dto.UserDto;
import com.velialiyev.twitterclone.entity.*;
import com.velialiyev.twitterclone.repository.*;
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
    private final RetweetRepository retweetRepository;
    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;

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

    @Transactional
    public void like(LikeRetweetBookmarkDto likeRetweetBookmarkDto) {
        UserEntity user = this.authenticationService.getUserFromJwt();
        TweetEntity tweet = this.tweetRepository.findById(likeRetweetBookmarkDto.getTweetId()).orElseThrow();
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

    @Transactional
    public void retweet(LikeRetweetBookmarkDto likeRetweetBookmarkDto) {
        UserEntity user = this.authenticationService.getUserFromJwt();
        TweetEntity tweet = this.tweetRepository.findById(likeRetweetBookmarkDto.getTweetId()).orElseThrow();
        Optional<RetweetEntity> retweet = this.retweetRepository.findByUserAndTweet(user, tweet);
        if(retweet.isPresent()){
            tweet.setRetweetCounter(tweet.getRetweetCounter() - 1);
            this.retweetRepository.delete(retweet.get());
        }
        else{
            tweet.setRetweetCounter(tweet.getRetweetCounter() + 1);
            this.retweetRepository.save(
                    RetweetEntity.builder()
                            .tweet(tweet)
                            .user(user)
                            .build()
            );
        }
        this.tweetRepository.save(tweet);
    }

    @Transactional(readOnly = true)
    public List<TweetResponseDto> getAllTweets() {
        List<TweetEntity> tweets = this.tweetRepository.findAllByType(TweetType.TWEET).orElseThrow();
        return tweets.stream().map(this::mapTweetToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TweetResponseDto> getRepliesForTweet(Long id) {
        TweetEntity tweet = this.tweetRepository.findById(id).orElseThrow();
        List<TweetEntity> replies = this.tweetRepository.findAllByTweetAndType(tweet, TweetType.REPLY).orElseThrow();
        return replies.stream().map(this::mapTweetToDto).collect(Collectors.toList());
    }

    @Transactional
    public TweetResponseDto getTweet(Long id) {
        return this.mapTweetToDto(this.tweetRepository.findById(id).orElseThrow());
    }

    @Transactional(readOnly = true)
    public Boolean isLiked(LikeRetweetBookmarkDto likeRetweetBookmarkDto) {
        UserEntity user = this.authenticationService.getUserFromJwt();
        TweetEntity tweet = this.tweetRepository.findById(likeRetweetBookmarkDto.getTweetId()).orElseThrow();
        return this.likeRepository.findByUserAndTweet(user, tweet).isPresent();
    }

    @Transactional
    public List<TweetResponseDto> getAll() {
        List<TweetResponseDto> tweets = this.tweetRepository.findAll().stream()
                .filter(tweet-> tweet.getType() != TweetType.REPLY)
                .map(this::mapTweetToDto)
                .collect(Collectors.toList());
        tweets.addAll(this.retweetRepository.findAll().stream().map(this::mapRetweetToDto).collect(Collectors.toList()));
        return tweets;
    }

    @Transactional
    public List<TweetResponseDto> getTweetsByUsername(String username) {
        UserEntity user = this.userRepository.findByUsername(username).orElseThrow();
        return this.tweetRepository.findAllByUserAndType(user, TweetType.TWEET).orElseThrow().stream().map(this::mapTweetToDto).collect(Collectors.toList());

    }

    @Transactional
    public List<TweetResponseDto> getRetweetsByUsername(String username) {
        UserEntity user = this.userRepository.findByUsername(username).orElseThrow();
        List<TweetResponseDto> tweetResponseDtos = this.tweetRepository.findAllByUserAndType(user, TweetType.QUOTE)
                .orElseThrow().stream().map(this::mapTweetToDto).collect(Collectors.toList());
        tweetResponseDtos.addAll(this.retweetRepository.findAllByUser(user).orElseThrow().stream().map(this::mapRetweetToDto).collect(Collectors.toList()));

        return tweetResponseDtos;

    }

    @Transactional
    public List<TweetResponseDto> getRepliesByUsername(String username) {
        UserEntity user = this.userRepository.findByUsername(username).orElseThrow();
        return this.tweetRepository.findAllByUserAndType(user, TweetType.REPLY).orElseThrow().stream().map(this::mapTweetToDto).collect(Collectors.toList());
    }

    @Transactional
    public List<TweetResponseDto> getLikedByUsername(String username) {
        UserEntity user = this.userRepository.findByUsername(username).orElseThrow();
        List<LikeEntity> likes = this.likeRepository.findAllByUser(user).orElseThrow();

        return likes.stream().map(LikeEntity::getTweet).map(this::mapTweetToDto).collect(Collectors.toList());
    }

    private TweetResponseDto mapTweetToDto(TweetEntity entity){

        UserEntity user = entity.getUser();
        TweetResponseDto tweetResponseDto = TweetResponseDto.builder()
                .id(entity.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .duration(null)
                .tweetText(entity.getText())
                .replyCounter(entity.getReplyCounter())
                .retweetCounter(entity.getRetweetCounter())
                .likeCounter(entity.getLikeCounter())
                .build();

        if(entity.getType() == TweetType.QUOTE && entity.getTweet() != null){
            tweetResponseDto.setQuote(mapTweetToDto(entity.getTweet()));
        }

        return tweetResponseDto;
    }

    private TweetResponseDto mapRetweetToDto(RetweetEntity retweetEntity) {
        TweetEntity tweet = retweetEntity.getTweet();
        UserEntity publisher = tweet.getUser();

        UserDto retweeter = UserDto.builder()
                .firstName(retweetEntity.getUser().getFirstName())
                .lastName(retweetEntity.getUser().getLastName())
                .username(retweetEntity.getUser().getUsername())
                .build();

        TweetResponseDto tweetResponseDto = TweetResponseDto.builder()
                .id(tweet.getId())
                .firstName(publisher.getFirstName())
                .lastName(publisher.getLastName())
                .username(publisher.getUsername())
                .duration(null)
                .tweetText(tweet.getText())
                .replyCounter(tweet.getReplyCounter())
                .retweetCounter(tweet.getRetweetCounter())
                .likeCounter(tweet.getLikeCounter())
                .retweetedBy(retweeter)
                .build();

        if(retweetEntity.getTweet().getType() == TweetType.QUOTE){
            tweetResponseDto.setQuote(mapTweetToDto(retweetEntity.getTweet().getTweet()));
        }

        return tweetResponseDto;
    }

    @Transactional
    public void bookmark(LikeRetweetBookmarkDto likeRetweetBookmarkDto) {
        UserEntity user = this.authenticationService.getUserFromJwt();
        TweetEntity tweet = this.tweetRepository.findById(likeRetweetBookmarkDto.getTweetId()).orElseThrow();
        Optional<BookmarkEntity> optional = this.bookmarkRepository.findByUserAndTweet(user, tweet);

        if(optional.isPresent()){
            this.bookmarkRepository.delete(optional.get());
        }
        else{
            this.bookmarkRepository.save(BookmarkEntity.builder().tweet(tweet).user(user).build());
        }
    }

    @Transactional
    public List<TweetResponseDto> getBookmarksByUsername(String username) {
        UserEntity user = this.userRepository.findByUsername(username).orElseThrow();
        return this.bookmarkRepository
                .findAllByUser(user)
                .orElseThrow()
                .stream()
                .map(BookmarkEntity::getTweet).map(this::mapTweetToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Boolean isBookmarked(LikeRetweetBookmarkDto likeRetweetBookmarkDto) {
        UserEntity user = this.authenticationService.getUserFromJwt();
        TweetEntity tweet = this.tweetRepository.findById(likeRetweetBookmarkDto.getTweetId()).orElseThrow();
        return this.bookmarkRepository.findByUserAndTweet(user, tweet).isPresent();
    }
}
