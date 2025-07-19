package com.softwareeducativo.boa.controller;

import com.softwareeducativo.boa.model.Usuario;
import com.softwareeducativo.boa.repository.UsuarioRepository;
import com.softwareeducativo.boa.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String nickname = loginData.get("nickname");
        String senha = loginData.get("senha");

        Optional<Usuario> usuarioOpt = usuarioRepository.findByNickname(nickname);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario nao encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        if (!encoder.matches(senha, usuario.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
        }

        String token = jwtUtil.gerarToken(usuario.getNickname(), usuario.getTipo());
        return ResponseEntity.ok(Map.of("token", token));
    }
}
