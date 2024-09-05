package com.example.Spring_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class CA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_CA;

    private String nom_CA;
    private String email;
    private String mot_de_passe;
    private String telephone;

    public Object getMot_de_passe() {

    }


    // Getters and setters
}
