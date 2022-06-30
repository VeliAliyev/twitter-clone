package com.velialiyev.twitterclone.repository;

import com.velialiyev.twitterclone.entity.ReplyEntity;
import com.velialiyev.twitterclone.entity.RetweetEntity;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RetweetRepository extends JpaRepository<RetweetEntity, Long> {
    Optional<RetweetEntity> findByUserAndTweet(UserEntity user, TweetEntity tweet);
    Optional<RetweetEntity> findByUserAndReply(UserEntity user, ReplyEntity reply);
    Optional<RetweetEntity> findByUserAndRetweet(UserEntity user, RetweetEntity retweet);
}
