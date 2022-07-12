package com.velialiyev.twitterclone.repository;

import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.TweetType;
import com.velialiyev.twitterclone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TweetRepository extends JpaRepository<TweetEntity, Long> {
    Optional<List<TweetEntity>> findAllByUserAndType(UserEntity user, TweetType type);
    Optional<List<TweetEntity>> findAllByTweetAndType(TweetEntity tweet, TweetType type);
    Optional<List<TweetEntity>> findAllByType(TweetType type);

}
