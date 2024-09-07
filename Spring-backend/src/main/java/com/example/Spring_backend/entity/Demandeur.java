package com.example.Spring_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Demandeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_demandeur;

    private String nom_demandeur;
    private String type;
    private String email_demandeur;
    private String telephone_demandeur;

    // Getters et Setters
    public Long getId_demandeur() {
        return id_demandeur;
    }

    public void setId_demandeur(Long id_demandeur) {
        this.id_demandeur = id_demandeur;
    }

    public String getNom_demandeur() {
        return nom_demandeur;
    }

    public void setNom_demandeur(String nom_demandeur) {
        this.nom_demandeur = nom_demandeur;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail_demandeur() {
        return email_demandeur;
    }

    public void setEmail_demandeur(String email_demandeur) {
        this.email_demandeur = email_demandeur;
    }

    public String getTelephone_demandeur() {
        return telephone_demandeur;
    }

    public void setTelephone_demandeur(String telephone_demandeur) {
        this.telephone_demandeur = telephone_demandeur;
    }
}

