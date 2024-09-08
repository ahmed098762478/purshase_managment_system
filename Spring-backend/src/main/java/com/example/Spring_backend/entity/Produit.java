package com.example.Spring_backend.entity;

import jakarta.persistence.*;

@Entity
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProduit;

    private String nom;
    private String description;
    private Double prix;
    private String categorie;
    private String marque;

    public Long getIdProduit() {
        return idProduit;
    }

    public String getNom() {
        return nom;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrix() {
        return prix;
    }

    public String getCategorie() {
        return categorie;
    }

    public String getMarque() {
        return marque;
    }

    public void setIdProduit(Long idProduit) {
        this.idProduit = idProduit;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }
}