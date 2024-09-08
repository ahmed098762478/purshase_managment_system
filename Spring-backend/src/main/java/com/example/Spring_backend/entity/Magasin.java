package com.example.Spring_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Magasin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_magasin;

    private String nom_magasin;
    private String adresse_magasin;
    private String telephone_magasin;

    // Getters et Setters
    public Long getId_magasin() {
        return id_magasin;
    }

    public void setId_magasin(Long id_magasin) {
        this.id_magasin = id_magasin;
    }

    public String getNom_magasin() {
        return nom_magasin;
    }

    public void setNom_magasin(String nom_magasin) {
        this.nom_magasin = nom_magasin;
    }

    public String getAdresse_magasin() {
        return adresse_magasin;
    }

    public void setAdresse_magasin(String adresse_magasin) {
        this.adresse_magasin = adresse_magasin;
    }

    public String getTelephone_magasin() {
        return telephone_magasin;
    }

    public void setTelephone_magasin(String telephone_magasin) {
        this.telephone_magasin = telephone_magasin;
    }
}

