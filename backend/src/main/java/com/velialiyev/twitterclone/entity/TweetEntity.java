package com.velialiyev.twitterclone.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class TweetEntity extends BaseTweetEntity {

    @OneToMany(mappedBy = "tweet",cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<ReplyEntity> replies;
}
