package com.example.Spring_backend.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matricule;

    private Date dateCommande;
    private String statut;
    private Double montantTotal;

    public Long getMatricule() {
        return matricule;
    }

    public Date getDateCommande() {
        return dateCommande;
    }

    public String getStatut() {
        return statut;
    }

    public Double getMontantTotal() {
        return montantTotal;
    }

    public void setMatricule(Long matricule) {
        this.matricule = matricule;
    }

    public void setDateCommande(Date dateCommande) {
        this.dateCommande = dateCommande;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public void setMontantTotal(Double montantTotal) {
        this.montantTotal = montantTotal;
    }
}