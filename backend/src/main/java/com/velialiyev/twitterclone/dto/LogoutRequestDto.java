package com.velialiyev.twitterclone.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LogoutRequestDto {
    private String refreshToken;
}
