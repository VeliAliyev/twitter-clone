package com.velialiyev.twitterclone.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class TweetEntity extends BaseTweetEntity{
}
