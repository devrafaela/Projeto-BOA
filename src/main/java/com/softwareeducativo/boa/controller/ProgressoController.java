package com.softwareeducativo.boa.controller;

import com.softwareeducativo.boa.model.Progresso;
import com.softwareeducativo.boa.model.Usuario;
import com.softwareeducativo.boa.repository.ProgressoRepository;
import com.softwareeducativo.boa.repository.UsuarioRepository;
import com.softwareeducativo.boa.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/progresso")
public class ProgressoController {

    @Autowired
    private ProgressoRepository progressoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private Usuario getUsuarioAutenticado(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String nickname = jwtUtil.getNickname(token);
        return usuarioRepository.findByNickname(nickname)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @PostMapping
    public ResponseEntity<?> criarProgresso(@RequestBody Progresso progresso, HttpServletRequest request) {
        Usuario usuario = getUsuarioAutenticado(request);
        progresso.setUsuario(usuario);
        return ResponseEntity.ok(progressoRepository.save(progresso));
    }

    @GetMapping
    public ResponseEntity<List<Progresso>> listarProgresso(HttpServletRequest request) {
        Usuario usuario = getUsuarioAutenticado(request);
        List<Progresso> lista = progressoRepository.findByUsuario(usuario);
        return ResponseEntity.ok(lista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarStatus(@PathVariable Long id, @RequestBody Progresso dados, HttpServletRequest request) {
        Usuario usuario = getUsuarioAutenticado(request);

        Optional<Progresso> progressoOpt = progressoRepository.findById(id); //o findById eh gerado automaticamente
        if (progressoOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Progresso progresso = progressoOpt.get();
        if (!progresso.getUsuario().getId().equals(usuario.getId())) {
            return ResponseEntity.status(403).body("Voce nao pode modificar progresso de outro usuario.");
        }

        if (dados.getStatus() != null) {
            progresso.setStatus(dados.getStatus());
        }
        if (dados.getNivel() != null) {
            progresso.setNivel(dados.getNivel());
        }

        return ResponseEntity.ok(progressoRepository.save(progresso));
    }
}
