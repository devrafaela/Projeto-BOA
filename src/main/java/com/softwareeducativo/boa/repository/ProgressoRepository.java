package com.softwareeducativo.boa.repository;

import com.softwareeducativo.boa.model.Fase;
import com.softwareeducativo.boa.model.Progresso;
import com.softwareeducativo.boa.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProgressoRepository extends JpaRepository<Progresso, Long> {
    List<Progresso> findByUsuario(Usuario usuario);
    Optional<Progresso> findByUsuarioAndFase(Usuario usuario, Fase fase);
}