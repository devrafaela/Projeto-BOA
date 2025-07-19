package com.softwareeducativo.boa.controller;

import com.softwareeducativo.boa.dto.MensagemDTO;
import com.softwareeducativo.boa.exception.UsuarioJaExisteException;
import com.softwareeducativo.boa.exception.UsuarioNaoEncontradoException;
import com.softwareeducativo.boa.model.Usuario;
import com.softwareeducativo.boa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<Usuario> buscarPorNickname(@PathVariable String nickname) {
        Usuario usuario = usuarioRepository.findByNickname(nickname)
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário com nickname '" + nickname + "' não encontrado."));
        return ResponseEntity.ok(usuario);
    }

    @PostMapping
    public ResponseEntity<Object> cadastrar(@RequestBody Usuario usuario) {
        if (usuarioRepository.existsByNickname(usuario.getNickname())) {
            throw new UsuarioJaExisteException((usuario.getNickname()));
        }
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        return ResponseEntity.status(201).body(usuarioSalvo);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Optional<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioRepository.findById(id);
    }

    @PutMapping("recuperar-senha/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Usuario> atualizarSenha(@PathVariable Long id, @RequestBody Usuario dados) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuário com ID " + id + " não encontrado."));

        usuario.setSenha(encoder.encode(dados.getSenha()));
        Usuario atualizado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new UsuarioNaoEncontradoException("Usuário com ID " + id + " não encontrado.");
        }
        usuarioRepository.deleteById(id);
        return ResponseEntity.noContent().build();

    }
}