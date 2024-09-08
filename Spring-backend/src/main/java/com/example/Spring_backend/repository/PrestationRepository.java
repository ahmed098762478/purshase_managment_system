package com.example.Spring_backend.repository;

import com.example.Spring_backend.entity.Prestation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestationRepository extends JpaRepository<Prestation, Long> {
}
