package com.example.Spring_backend.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Prestation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPrestation;

    private String nomPrestation;
    private Date datePrestation;

    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;

    public Long getIdPrestation() {
        return idPrestation;
    }

    public String getNomPrestation() {
        return nomPrestation;
    }

    public Date getDatePrestation() {
        return datePrestation;
    }

    public Fournisseur getFournisseur() {
        return fournisseur;
    }

    public void setIdPrestation(Long idPrestation) {
        this.idPrestation = idPrestation;
    }

    public void setNomPrestation(String nomPrestation) {
        this.nomPrestation = nomPrestation;
    }

    public void setDatePrestation(Date datePrestation) {
        this.datePrestation = datePrestation;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }
}