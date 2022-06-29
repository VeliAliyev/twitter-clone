package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void delete(Long id){
        this.userRepository.deleteById(id);
    }

}
