package com.velialiyev.twitterclone.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ReplyEntity extends BaseTweetEntity {

    @ManyToOne
    @JoinColumn(name = "tweet_id", referencedColumnName = "id")
    private TweetEntity tweet;

}
