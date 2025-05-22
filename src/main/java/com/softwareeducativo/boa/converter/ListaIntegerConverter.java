package com.softwareeducativo.boa.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.List;

@Converter
public class ListaIntegerConverter implements AttributeConverter<List<Integer>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Integer> lista) {
        try {
            return mapper.writeValueAsString(lista);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Erro ao serializar arrayInicial", e);
        }
    }

    @Override
    public List<Integer> convertToEntityAttribute(String json) {
        try {
            return mapper.readValue(json, new TypeReference<List<Integer>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Erro ao desserializar arrayInicial", e);
        }
    }
}
