package com.softwareeducativo.boa.dto;

public class FaseStatusDTO {

    private Long id;
    private String nome;
    private String status;
    private boolean bloqueado;

    public FaseStatusDTO() {}

    public FaseStatusDTO(Long id, String nome, String status, boolean bloqueado) {
        this.id = id;
        this.nome = nome;
        this.status = status;
        this.bloqueado = bloqueado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isBloqueado() {
        return bloqueado;
    }

    public void setBloqueado(boolean bloqueado) {
        this.bloqueado = bloqueado;
    }
}
