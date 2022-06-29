package com.velialiyev.twitterclone.repository;

import com.velialiyev.twitterclone.entity.LikeEntity;
import com.velialiyev.twitterclone.entity.ReplyEntity;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<LikeEntity, Long> {
    Optional<LikeEntity> findByUserAndTweet(UserEntity user, TweetEntity tweet);
    Optional<LikeEntity> findByUserAndReply(UserEntity user, ReplyEntity reply);
}
