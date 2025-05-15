package com.softwareeducativo.boa.repository;

import com.softwareeducativo.boa.model.Progresso;
import com.softwareeducativo.boa.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgressoRepository extends JpaRepository<Progresso, Long> {
    List<Progresso> findByUsuario(Usuario usuario);
}