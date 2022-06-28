package com.velialiyev.twitterclone.entity;

import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@SuperBuilder
@MappedSuperclass
public abstract class BaseTweetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;
    private String text;
    private Integer replyCounter;
    private Integer retweetCounter;
    private Integer likeCounter;

}
