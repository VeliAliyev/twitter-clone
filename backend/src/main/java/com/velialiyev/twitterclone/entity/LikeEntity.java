package com.velialiyev.twitterclone.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "tweet_id", referencedColumnName = "id")
    private TweetEntity tweet;

    @ManyToOne
    @JoinColumn(name = "reply_id", referencedColumnName = "id")
    private ReplyEntity reply;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;
}
