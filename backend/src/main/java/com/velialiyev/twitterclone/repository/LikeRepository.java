package com.velialiyev.twitterclone.repository;

import com.velialiyev.twitterclone.entity.LikeEntity;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<LikeEntity, Long> {
    Optional<LikeEntity> findByUserAndTweet(UserEntity user, TweetEntity tweet);
    Optional<List<LikeEntity>> findAllByUser(UserEntity user);
}
