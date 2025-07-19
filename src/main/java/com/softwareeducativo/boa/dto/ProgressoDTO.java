package com.softwareeducativo.boa.dto;

public class ProgressoDTO {
    private Long faseId;
    private String status;

    // getters e setters
    public Long getFaseId() { return faseId; }
    public void setFaseId(Long faseId) { this.faseId = faseId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}