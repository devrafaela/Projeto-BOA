package com.softwareeducativo.boa.controller;

import com.softwareeducativo.boa.dto.FaseStatusDTO;
import com.softwareeducativo.boa.model.Fase;
import com.softwareeducativo.boa.model.Progresso;
import com.softwareeducativo.boa.model.Usuario;
import com.softwareeducativo.boa.repository.FaseRepository;
import com.softwareeducativo.boa.repository.ProgressoRepository;
import com.softwareeducativo.boa.repository.UsuarioRepository;
import com.softwareeducativo.boa.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/fases")
public class FaseController {

    @Autowired
    private FaseRepository faseRepository;

    @Autowired
    private ProgressoRepository progressoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<Fase> criarFase(@RequestBody Fase fase) {
        return ResponseEntity.ok(faseRepository.save(fase));
    }

    @GetMapping
    public List<Fase> listarFases() {
        return faseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fase> buscarPorId(@PathVariable Long id) {
        Optional<Fase> fase = faseRepository.findById(id);
        return fase.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fase> atualizarFase(@PathVariable Long id, @RequestBody Fase dados) {
        Optional<Fase> faseOpt = faseRepository.findById(id);
        if (faseOpt.isEmpty()) return ResponseEntity.notFound().build();

        Fase fase = faseOpt.get();
        fase.setNome(dados.getNome());
        fase.setDescricao(dados.getDescricao());
        fase.setArrayInicial(dados.getArrayInicial());
        fase.setAlgoritmo(dados.getAlgoritmo());

        return ResponseEntity.ok(faseRepository.save(fase));
    }

    @GetMapping("/status")
    public ResponseEntity<List<FaseStatusDTO>> listarStatusFases(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String nickname = jwtUtil.getNickname(token);
        Usuario usuario = usuarioRepository.findByNickname(nickname)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        List<Fase> todasFases = faseRepository.findAll();
        List<Progresso> progressoUsuario = progressoRepository.findByUsuario(usuario);

        Map<Long, String> statusPorFaseId = progressoUsuario.stream()
                .collect(Collectors.toMap(p -> p.getFase().getId(), Progresso::getStatus));

        List<FaseStatusDTO> resultado = new ArrayList<>();

        for (int i = 0; i < todasFases.size(); i++) {
            Fase fase = todasFases.get(i);
            String status = statusPorFaseId.get(fase.getId());

            boolean bloqueado = false;
            if (i > 0) {
                Long faseAnteriorId = todasFases.get(i - 1).getId();
                String statusAnterior = statusPorFaseId.get(faseAnteriorId);
                bloqueado = !"Concluido".equals(statusAnterior);
            }

            resultado.add(new FaseStatusDTO(
                    fase.getId(),
                    fase.getNome(),
                    status,
                    bloqueado
            ));
        }

        return ResponseEntity.ok(resultado);
    }
}
