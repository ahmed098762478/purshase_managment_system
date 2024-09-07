package com.example.Spring_backend.service;


import com.example.Spring_backend.entity.Produit;
import com.example.Spring_backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {

    @Autowired
    private ProduitRepository produitRepository;

    // Créer un fournisseur
    public Produit creerProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    // Lire un fournisseur par ID
    public Optional<Produit> obtenirProduitParId(Long id) {
        return produitRepository.findById(id);
    }

    // Lire tous les fournisseurs
    public List<Produit> obtenirTousLesProduits() {
        return produitRepository.findAll();
    }

    // Mettre à jour un fournisseur
    public Produit modifierProduit(Long id, Produit produitDetails) {
        Produit produit = produitRepository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        produit.setNom(produitDetails.getNom());
        produit.setDescription(produitDetails.getDescription());
        produit.setPrix(produitDetails.getPrix());
        produit.setCategorie(produitDetails.getCategorie());
        produit.setMarque(produitDetails.getMarque());
        return produitRepository.save(produit);
    }

    // Supprimer un fournisseur
    public void supprimerProduit(Long id) {
        Produit produit = produitRepository.findById(id).orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        produitRepository.delete(produit);
    }
}