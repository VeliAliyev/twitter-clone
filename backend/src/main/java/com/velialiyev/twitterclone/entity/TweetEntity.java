package com.velialiyev.twitterclone.entity;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TweetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    private String text;
    private Integer replyCounter;
    private Integer retweetCounter;
    private Integer likeCounter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tweet_id", referencedColumnName = "id")
    private TweetEntity tweet;

    @OneToMany(mappedBy = "tweet",fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<TweetEntity> replies;

    private TweetType type;
    private Instant createdDate;
}
