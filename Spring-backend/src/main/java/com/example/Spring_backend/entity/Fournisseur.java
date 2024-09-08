package com.example.Spring_backend.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Fournisseur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFournisseur;

    private String nomFournisseur;
    private String adresse;
    private String telephone;
    private String email;

    // Relation OneToMany avec PrestationService

    public Fournisseur() {
    }

    public Fournisseur(String nomFournisseur, String adresse, String telephone, String email) {
        this.nomFournisseur = nomFournisseur;
        this.adresse = adresse;
        this.telephone = telephone;
        this.email = email;
    }

    public Long getIdFournisseur() {
        return idFournisseur;
    }

    public String getNomFournisseur() {
        return nomFournisseur;
    }

    public String getAdresse() {
        return adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public String getEmail() {
        return email;
    }


    public void setIdFournisseur(Long idFournisseur) {
        this.idFournisseur = idFournisseur;
    }

    public void setNomFournisseur(String nomFournisseur) {
        this.nomFournisseur = nomFournisseur;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}