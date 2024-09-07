package com.example.Spring_backend.controller;

import com.example.Spring_backend.entity.Produit;
import com.example.Spring_backend.service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/produits")
@CrossOrigin(origins = "http://localhost:5173")
public class ProduitController {

    @Autowired
    private ProduitService produitService;

    // Créer un fournisseur (POST)
    @PostMapping
    public Produit creerProduit(@RequestBody Produit produit) {
        return produitService.creerProduit(produit);
    }

    // Lire tous les fournisseurs (GET)
    @GetMapping
    public List<Produit> obtenirTousLesProduits() {
        return produitService.obtenirTousLesProduits();
    }

    // Lire un fournisseur par ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Produit> obtenirProduitParId(@PathVariable Long id) {
        Optional<Produit> produit = produitService.obtenirProduitParId(id);
        return produit.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour un fournisseur (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> modifierProduit(@PathVariable Long id, @RequestBody Produit produitDetails) {
        try {
            Produit updatedProduit = produitService.modifierProduit(id,produitDetails);
            return ResponseEntity.ok(updatedProduit);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur inattendue s'est produite");
        }
    }

    // Supprimer un fournisseur (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerProduit(@PathVariable Long id) {
        try {
            produitService.supprimerProduit(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
