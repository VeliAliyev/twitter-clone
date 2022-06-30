package com.velialiyev.twitterclone.repository;

import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.TweetType;
import com.velialiyev.twitterclone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TweetRepository extends JpaRepository<TweetEntity, Long> {
    Optional<TweetEntity> findByUserAndTweetAndType(UserEntity user, TweetEntity tweet, TweetType type);
}
