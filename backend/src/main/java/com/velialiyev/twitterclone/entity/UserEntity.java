package com.velialiyev.twitterclone.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.nio.file.Path;
import java.text.SimpleDateFormat;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotBlank
    @NotEmpty

    private String firstName;
    @NotNull
    @NotBlank
    @NotEmpty
    private String lastName;

    @NotNull
    @NotBlank
    @NotEmpty
    @Column(unique = true)
    private String username;


    @Email
    @NotNull
    private String email;

    @NotNull
    private String password;

    private String bannerPicturePath;
    private String profilePicturePath;
    private String bio;
    private String location;
    private String personalWebsite;
    private String birthDate;
}
