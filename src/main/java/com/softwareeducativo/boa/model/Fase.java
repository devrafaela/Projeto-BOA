package com.softwareeducativo.boa.model;

import com.softwareeducativo.boa.converter.ListaIntegerConverter;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "fase")
public class Fase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Convert(converter = ListaIntegerConverter.class)
    @Column(name = "array_inicial", columnDefinition = "TEXT", nullable = false)
    private List<Integer> arrayInicial;

    @Column(nullable = false)
    private String algoritmo;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<Integer> getArrayInicial() {
        return arrayInicial;
    }
    public void setArrayInicial(List<Integer> arrayInicial) {
        this.arrayInicial = arrayInicial;
    }

    public String getAlgoritmo() {
        return algoritmo;
    }
    public void setAlgoritmo(String algoritmo) {
        this.algoritmo = algoritmo;
    }
}
