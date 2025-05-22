package com.softwareeducativo.boa.controller;

import com.softwareeducativo.boa.model.Fase;
import com.softwareeducativo.boa.repository.FaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fases")
public class FaseController {

    @Autowired
    private FaseRepository faseRepository;

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
}
