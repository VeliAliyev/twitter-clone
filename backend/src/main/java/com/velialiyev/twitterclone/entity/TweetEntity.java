package com.velialiyev.twitterclone.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@SuperBuilder
@NoArgsConstructor
public class TweetEntity extends BaseTweetEntity{

    @OneToMany(mappedBy = "tweet",cascade = CascadeType.REMOVE)
    private List<ReplyEntity> replies;
}
