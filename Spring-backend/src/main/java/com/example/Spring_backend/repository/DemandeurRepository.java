package com.example.Spring_backend.repository;

import com.example.Spring_backend.entity.Demandeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeurRepository extends JpaRepository<Demandeur, Long> {
}


