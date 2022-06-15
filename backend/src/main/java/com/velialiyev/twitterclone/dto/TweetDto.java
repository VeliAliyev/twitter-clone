package com.velialiyev.twitterclone.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TweetDto {
    private String text;
    private Long tweetId;
    private String type;
}
