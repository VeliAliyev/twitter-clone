package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.UserDto;
import com.velialiyev.twitterclone.entity.UserEntity;
import com.velialiyev.twitterclone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;

    @Transactional
    public void savePicture(MultipartFile picture, String username, String pictureDirectory) {

        String userFolder = "/uploads/" + username;
        String pictureName = "/" + username+ "." + FilenameUtils.getExtension(picture.getOriginalFilename());
        File directory = new File(userFolder + pictureDirectory);

        if(!directory.exists()){
            directory.mkdirs();
        }

        try {
            byte[] profilePictureBytes = picture.getBytes();
            Path picturePath = Paths.get(directory.getPath() + pictureName);
            FileUtils.cleanDirectory(directory);
            Files.write(picturePath, profilePictureBytes);
            UserEntity userEntity = this.userRepository.findByUsername(username).orElseThrow();

            if(pictureDirectory.equals("/profilePicture"))
                userEntity.setProfilePicturePath(picturePath.toAbsolutePath().toString());

            else if(pictureDirectory.equals("/bannerPicture")){
                userEntity.setBannerPicturePath(picturePath.toAbsolutePath().toString());
                System.out.println("PATH : " + picturePath.toAbsolutePath());

            }


            this.userRepository.save(userEntity);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }



    public UserDto getUser(String username) {

        UserEntity user = this.userRepository.findByUsername(username).orElseThrow();



        UserDto userDto = UserDto.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .bio(user.getBio())
                .location(user.getLocation())
                .personalWebsite(user.getPersonalWebsite())
                .birthDate(user.getBirthDate())
                .build();

        return userDto;
    }

    public ByteArrayResource getPicture(String username, String directory) {

        Path picturePath = this.fetchPicturePath(username, directory);
        try {
          ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(picturePath));
          return resource;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }

    public Path fetchPicturePath(String username, String directory){
        UserEntity user = this.userRepository.findByUsername(username).orElseThrow();
        Path picturePath = null;
        if(directory.equals("/profilePicture"))
             picturePath = Paths.get(user.getProfilePicturePath());

        else if(directory.equals("/bannerPicture"))
            picturePath = Paths.get(user.getBannerPicturePath());

        return picturePath;
    }

    public void editProfile(UserDto user) {
        UserEntity userEntity = this.userRepository.findByUsername(user.getUsername()).orElseThrow();
        userEntity.setFirstName(user.getFirstName());
        userEntity.setBio(user.getBio());
        userEntity.setBirthDate(user.getBirthDate());
        userEntity.setLocation(user.getLocation());
        userEntity.setPersonalWebsite(user.getPersonalWebsite());
        this.userRepository.save(userEntity);
    }
}
