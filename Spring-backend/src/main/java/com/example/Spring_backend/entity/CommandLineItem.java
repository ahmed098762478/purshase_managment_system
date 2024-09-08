package com.example.Spring_backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class CommandLineItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "command_id")
    @JsonBackReference  // Avoid infinite recursion
    private Command command;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties("commandLineItems")  // Avoid infinite recursion
    private Produit produit;

    private int quantite;

    public Long getId() {
        return id;
    }

    public Command getCommand() {
        return command;
    }

    public Produit getProduit() {
        return produit;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public void setProduit(Produit produit) {
        this.produit = produit;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
