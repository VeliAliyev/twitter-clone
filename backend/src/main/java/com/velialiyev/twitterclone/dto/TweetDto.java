package com.velialiyev.twitterclone.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TweetDto {

    private String text;
    private Long tweetId;
    private String type;
}
