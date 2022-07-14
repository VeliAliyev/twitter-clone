package com.velialiyev.twitterclone.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String bannerPicture;
    private MultipartFile profilePicture;
    private String firstName;
    private String lastName;
    private String username;
    private String bio;
    private String location;
    private String personalWebsite;
    private String birthDate;
}
