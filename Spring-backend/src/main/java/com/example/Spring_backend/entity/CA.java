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
    private String mot_de_passe; // Hashed password
    private String telephone;

    // Getters and setters
    public Long getId_CA() {
        return id_CA;
    }

    public void setId_CA(Long id_CA) {
        this.id_CA = id_CA;
    }

    public String getNom_CA() {
        return nom_CA;
    }

    public void setNom_CA(String nom_CA) {
        this.nom_CA = nom_CA;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMot_de_passe() {
        return mot_de_passe;
    }

    public void setMot_de_passe(String mot_de_passe) {
        this.mot_de_passe = mot_de_passe;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
}

