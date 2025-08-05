package com.example.Spring_backend.controller;

import com.example.Spring_backend.entity.Prestation;
import com.example.Spring_backend.service.PrestationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestations")
@CrossOrigin(origins = "http://localhost:5174")
public class PrestationController {

    private final PrestationService prestationService;

    public PrestationController(PrestationService prestationService) {
        this.prestationService = prestationService;
    }

    // CREATE : Ajouter une nouvelle prestation
    @PostMapping
    public ResponseEntity<Prestation> ajouterPrestation(@RequestBody Prestation prestation) {
        Prestation nouvellePrestation = prestationService.ajouterPrestation(prestation);
        return ResponseEntity.ok(nouvellePrestation);
    }

    // READ : Obtenir une prestation par ID
    @GetMapping("/{id}")
    public ResponseEntity<Prestation> obtenirPrestation(@PathVariable Long id) {
        Prestation prestation = prestationService.obtenirPrestationParId(id);
        return ResponseEntity.ok(prestation);
    }

    // READ : Obtenir toutes les prestations
    @GetMapping
    public ResponseEntity<List<Prestation>> obtenirToutesLesPrestations() {
        List<Prestation> prestations = prestationService.obtenirToutesLesPrestations();
        return ResponseEntity.ok(prestations);
    }

    // UPDATE : Modifier une prestation existante
    @PutMapping("/{id}")
    public ResponseEntity<Prestation> modifierPrestation(@PathVariable Long id, @RequestBody Prestation prestationDetails) {
        Prestation prestationMiseAJour = prestationService.modifierPrestation(id, prestationDetails);
        return ResponseEntity.ok(prestationMiseAJour);
    }

    // DELETE : Supprimer une prestation par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerPrestation(@PathVariable Long id) {
        prestationService.supprimerPrestation(id);
        return ResponseEntity.noContent().build();
    }
}