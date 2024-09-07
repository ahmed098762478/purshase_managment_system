package com.example.Spring_backend.entity;

import jakarta.persistence.*;

@Entity
public class Magasin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMagazin;

    private String nomMagazin;
    private String telephone;
    private String adresse;

    public Long getIdMagazin() {
        return idMagazin;
    }

    public String getNomMagazin() {
        return nomMagazin;
    }

    public String getTelephone() {
        return telephone;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setIdMagazin(Long idMagazin) {
        this.idMagazin = idMagazin;
    }

    public void setNomMagazin(String nomMagazin) {
        this.nomMagazin = nomMagazin;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
}