package com.example.Spring_backend.repository;

import com.example.Spring_backend.entity.CA;

import java.util.Optional;

public interface CARepository {
    Optional<CA> findByEmail(String email);

}
