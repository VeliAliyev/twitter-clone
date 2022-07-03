package com.velialiyev.twitterclone.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequestDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
}
