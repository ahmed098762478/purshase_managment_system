package com.example.Spring_backend.entity;

import jakarta.persistence.*;

@Entity
public class DemandeurAchat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDemandeur;

    private String nomDemandeur;
    private String type;
    private String telephone;
    private String email;

    public Long getIdDemandeur() {
        return idDemandeur;
    }

    public String getNomDemandeur() {
        return nomDemandeur;
    }

    public String getType() {
        return type;
    }

    public String getTelephone() {
        return telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setIdDemandeur(Long idDemandeur) {
        this.idDemandeur = idDemandeur;
    }

    public void setNomDemandeur(String nomDemandeur) {
        this.nomDemandeur = nomDemandeur;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}