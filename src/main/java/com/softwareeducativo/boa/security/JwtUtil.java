package com.softwareeducativo.boa.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    public String gerarToken(String nickname, String tipo) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("tipo", tipo);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(nickname)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()), SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValido(String token) {
        try {
            Claims claims = getClaims(token);
            Date dataExp = claims.getExpiration();
            return dataExp.after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public String getNickname(String token) {
        return getClaims(token).getSubject();
    }

    public String getTipo(String token) {
        return getClaims(token).get("tipo", String.class);
    }
}