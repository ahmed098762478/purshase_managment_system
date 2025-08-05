package com.example.Spring_backend.controller;

import com.example.Spring_backend.entity.Fournisseur;
import com.example.Spring_backend.service.FournisseurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fournisseurs")
@CrossOrigin(origins = "http://localhost:5174")
public class FournisseurController {

    @Autowired
    private FournisseurService fournisseurService;

    // Créer un fournisseur (POST)
    @PostMapping
    public Fournisseur creerFournisseur(@RequestBody Fournisseur fournisseur) {
        return fournisseurService.creerFournisseur(fournisseur);
    }

    // Lire tous les fournisseurs (GET)
    @GetMapping
    public List<Fournisseur> obtenirTousLesFournisseurs() {
        return fournisseurService.obtenirTousLesFournisseurs();
    }

    // Lire un fournisseur par ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Fournisseur> obtenirFournisseurParId(@PathVariable Long id) {
        Optional<Fournisseur> fournisseur = fournisseurService.obtenirFournisseurParId(id);
        return fournisseur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour un fournisseur (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> modifierFournisseur(@PathVariable Long id, @RequestBody Fournisseur fournisseurDetails) {
        try {
            Fournisseur updatedFournisseur = fournisseurService.modifierFournisseur(id, fournisseurDetails);
            return ResponseEntity.ok(updatedFournisseur);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur inattendue s'est produite");
        }
    }

    // Supprimer un fournisseur (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerFournisseur(@PathVariable Long id) {
        try {
            fournisseurService.supprimerFournisseur(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}