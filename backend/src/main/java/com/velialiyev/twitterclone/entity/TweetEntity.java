package com.velialiyev.twitterclone.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Entity
@SuperBuilder
@NoArgsConstructor
public class TweetEntity extends BaseTweetEntity{

    @OneToMany(mappedBy = "tweet",cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<ReplyEntity> replies;
}
