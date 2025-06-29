package com.softwareeducativo.boa.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        System.out.println("Interceptando: " + method + " " + path);

        if ((path.equals("/usuarios") || path.equals("/usuarios/")) && method.equals("POST") || path.equals("/auth/login")) {
            System.out.println("Rota publica, passando direto...");
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        System.out.println("Header Authorization: " + header);

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            System.out.println("Token extraido: " + token);

            if (jwtUtil.isTokenValido(token)) {
                System.out.println("Token valido");
                String nickname = jwtUtil.getNickname(token);
                String tipo = jwtUtil.getTipo(token);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        nickname, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + tipo.toUpperCase())));
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                System.out.println("Token invalido");
            }
        } else {
            System.out.println("Token ausente ou malformado");
        }

        filterChain.doFilter(request, response);
    }
}
