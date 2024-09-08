package com.example.Spring_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @ManyToOne
    @JoinColumn(name = "fournisseur_id")  // Clé étrangère pour Fournisseur
    @JsonIgnoreProperties("produits")  // Avoid infinite recursion
    private Fournisseur fournisseur;

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

    public Fournisseur getFournisseur() {
        return fournisseur;
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

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }
}