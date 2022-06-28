package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.dto.LoginRequestDto;
import com.velialiyev.twitterclone.dto.LoginResponseDto;
import com.velialiyev.twitterclone.dto.RefreshTokenDto;
import com.velialiyev.twitterclone.dto.SignUpRequestDto;
import com.velialiyev.twitterclone.entity.UserEntity;
import com.velialiyev.twitterclone.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void signup(SignUpRequestDto signUpRequestDto){
        userRepository.save(
                UserEntity.builder()
                        .email(signUpRequestDto.getEmail())
                        .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                        .build()
        );
    }

    public LoginResponseDto login(LoginRequestDto loginRequestDto){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String accessToken = jwtService.generateToken(authentication);
        String refreshToken = jwtService.generateRefreshToken().getRefreshToken();
        String username = loginRequestDto.getEmail();

        return LoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .username(username)
                .build();
    }

    public void logout(RefreshTokenDto refreshTokenDto){
        jwtService.deleteRefreshToken(refreshTokenDto.getRefreshToken());
        SecurityContextHolder.clearContext();
    }

    public LoginResponseDto refreshToken(RefreshTokenDto refreshTokenDto){
        this.jwtService.validateRefreshToken(refreshTokenDto.getRefreshToken());
        String accessToken = this.jwtService.generateTokenWithUsername(refreshTokenDto.getEmail());
        return LoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshTokenDto.getRefreshToken())
                .username(refreshTokenDto.getEmail())
                .build();
    }

    @Transactional(readOnly = true)
    public UserEntity getUserFromJwt() {
        Jwt principal = (Jwt) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return userRepository.findByEmail(principal.getSubject())
                .orElseThrow(() -> new UsernameNotFoundException("User name not found - " + principal.getSubject()));
    }
}
