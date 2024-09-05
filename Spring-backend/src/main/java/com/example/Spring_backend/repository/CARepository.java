package com.example.Spring_backend.repository;

import com.example.Spring_backend.entity.CA;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CARepository extends JpaRepository<CA, Long> {
    Optional<CA> findByEmail(String email);
}
