package com.example.Spring_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
public class Command {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matricule;

    private LocalDate dateCommande;

    @Enumerated(EnumType.STRING)
    private Statut statut;

    private Double montantTotal;

    @ManyToOne
    @JoinColumn(name = "idDemandeur")
    private Demandeur demandeur;

    @ManyToOne
    @JoinColumn(name = "idMagazin")
    private Magasin magasin;

    @OneToMany(mappedBy = "command", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CommandLineItem> lineItems;

    public Command() {

    }
    public Command(Statut statut) {
        this.statut = statut;
    }


    public Long getMatricule() {
        return matricule;
    }

    public List<CommandLineItem> getLineItems() {
        return lineItems;
    }

    public void setLineItems(List<CommandLineItem> lineItems) {
        this.lineItems = lineItems;
    }

    public LocalDate getDateCommande() {
        return dateCommande;
    }

    public Statut getStatut() {
        return statut;
    }

    public Double getMontantTotal() {
        return montantTotal;
    }

    public Demandeur getDemandeur() {
        return demandeur;
    }

    public Magasin getMagasin() {
        return magasin;
    }

    public void setDateCommande(LocalDate dateCommande) {
        this.dateCommande = dateCommande;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public void setMontantTotal(Double montantTotal) {
        this.montantTotal = montantTotal;
    }

    public void setDemandeur(Demandeur demandeur) {
        this.demandeur = demandeur;
    }

    public void setMagasin(Magasin magasin) {
        this.magasin = magasin;
    }
}
