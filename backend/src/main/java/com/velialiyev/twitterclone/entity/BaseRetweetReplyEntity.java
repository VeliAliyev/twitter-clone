package com.velialiyev.twitterclone.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@SuperBuilder
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public abstract class BaseRetweetReplyEntity extends BaseTweetEntity{

    @ManyToOne
    @JoinColumn(name = "tweet_id", referencedColumnName = "id")
    private TweetEntity tweet;

    @ManyToOne
    @JoinColumn(name = "reply_id", referencedColumnName = "id")
    private ReplyEntity reply;

    @ManyToOne
    @JoinColumn(name = "retweet_id", referencedColumnName = "id")
    private RetweetEntity retweet;
}
