package com.softwareeducativo.boa.security;

import com.softwareeducativo.boa.model.Usuario;
import com.softwareeducativo.boa.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class ServicoDetalhesUsuario implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UserDetails carregarPorApelido(String apelido) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByNickname(apelido)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return new User(
                usuario.getNickname(),
                usuario.getSenha(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + usuario.getTipo().toUpperCase()))
        );
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return carregarPorApelido(username);
    }
}