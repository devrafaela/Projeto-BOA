package com.softwareeducativo.boa.repository;

import com.softwareeducativo.boa.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByNickname(String nickname);

}
