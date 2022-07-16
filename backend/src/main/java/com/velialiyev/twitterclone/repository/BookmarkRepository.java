package com.velialiyev.twitterclone.repository;

import com.velialiyev.twitterclone.entity.BookmarkEntity;
import com.velialiyev.twitterclone.entity.TweetEntity;
import com.velialiyev.twitterclone.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<BookmarkEntity, Long> {

    Optional<BookmarkEntity> findByUserAndTweet(UserEntity user, TweetEntity tweet);
    Optional<List<BookmarkEntity>> findAllByUser(UserEntity user);
}
