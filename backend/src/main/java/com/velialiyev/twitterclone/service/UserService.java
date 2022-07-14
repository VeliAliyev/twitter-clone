package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.UserDto;
import com.velialiyev.twitterclone.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthenticationService authenticationService;

    public void saveImage(MultipartFile picture) {
        UserEntity user = this.authenticationService.getUserFromJwt();

        Path path = Paths.get("/uploads/picture/" + user.getUsername());
        String pictureName = "/" + user.getUsername()+ "." + FilenameUtils.getExtension(picture.getOriginalFilename());

        File directory = new File(path.toString());
        if(!directory.exists()){
            directory.mkdirs();
        }

        try {
            byte[] pictureBytes = picture.getBytes();
            System.out.println("PATH : " + path);
            System.out.println("Picture Name : " + pictureName);
            Path picturePath = Paths.get(path + pictureName);
            System.out.println("Picture Path : " + picturePath);
            FileUtils.cleanDirectory(directory);
            Files.write(picturePath, pictureBytes);


        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public UserDto getCurrentUser() {

        UserEntity user = this.authenticationService.getUserFromJwt();

        return UserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .build();
    }
}
