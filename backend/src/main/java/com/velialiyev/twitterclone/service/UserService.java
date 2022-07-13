package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.UserDto;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Service
public class UserService {


    public void saveImage(UserDto user) {
        String folder = "/uploads/";

        String pictureName = user.getUsername()+ "." + FilenameUtils.getExtension(user.getProfilePicture().getOriginalFilename());
        String pictureFolder = folder.concat("picture/" + user.getUsername() + "/");

        Path path = Paths.get(pictureFolder);
        File directory = new File(path.toString());
        if(!directory.exists()){
            directory.mkdirs();
        }

        try {
            byte[] pictureBytes = user.getProfilePicture().getBytes();

            Path picturePath = Paths.get(pictureFolder + pictureName);
            FileUtils.cleanDirectory(directory);
            Files.write(picturePath, pictureBytes);


        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
