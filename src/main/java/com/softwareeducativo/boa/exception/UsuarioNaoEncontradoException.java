package com.softwareeducativo.boa.exception;

public class UsuarioNaoEncontradoException  extends RuntimeException {
    public UsuarioNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}
