package com.softwareeducativo.boa.exception;

public class UsuarioJaExisteException extends RuntimeException {
    public UsuarioJaExisteException(String nickname) {
        super("Já existe um usuário cadastrado com o nickname: " + nickname);
    }
}