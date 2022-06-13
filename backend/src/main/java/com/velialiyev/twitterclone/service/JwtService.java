package com.velialiyev.twitterclone.service;

import com.velialiyev.twitterclone.entity.RefreshTokenEntity;
import com.velialiyev.twitterclone.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtEncoder jwtEncoder;
    @Value("${jwt.expiration.time}")
    private Long jwtExpirationInMillis;

    private final RefreshTokenRepository refreshTokenRepository;

    public String generateToken(Authentication authentication){
        User principal = (User) authentication.getPrincipal();
        return generateTokenWithUsername(principal.getUsername());
    }

    public String generateTokenWithUsername(String username) {
        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusMillis(this.jwtExpirationInMillis))
                .subject(username)
                .claim("scope", "ROLE_USER")
                .build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    public Long getJwtExpirationInMillis(){return this.jwtExpirationInMillis;}

    @Transactional
    public RefreshTokenEntity generateRefreshToken(){
        return this.refreshTokenRepository.save(
                RefreshTokenEntity.builder()
                        .refreshToken(UUID.randomUUID().toString())
                        .createdDate(Instant.now())
                        .build());
    }
    @Transactional(readOnly = true)
    public void validateRefreshToken(String refreshToken){
        this.refreshTokenRepository.findByRefreshToken(refreshToken).orElseThrow();
    }
    @Transactional
    public void deleteRefreshToken(String refreshToken){
            this.refreshTokenRepository.deleteByRefreshToken(refreshToken);
    }
}
