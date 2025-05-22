package com.softwareeducativo.boa.controller;

import com.softwareeducativo.boa.model.Usuario;
import com.softwareeducativo.boa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Usuario atualizarSenha(@PathVariable Long id, @RequestBody Usuario dados) {
        return usuarioRepository.findById(id).map(user -> {
            user.setSenha(encoder.encode(dados.getSenha()));
            return usuarioRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void excluir(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }
}