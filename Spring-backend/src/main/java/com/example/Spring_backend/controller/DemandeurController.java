package com.example.Spring_backend.controller;

import com.example.Spring_backend.entity.Demandeur;
import com.example.Spring_backend.service.DemandeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demandeurs")
@CrossOrigin(origins = "http://localhost:5173")
public class DemandeurController {

    @Autowired
    private DemandeurService demandeurService;

    @GetMapping
    public List<Demandeur> getAllDemandeurs() {
        return demandeurService.getAllDemandeurs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Demandeur> getDemandeurById(@PathVariable Long id) {
        return demandeurService.getDemandeurById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Demandeur createDemandeur(@RequestBody Demandeur demandeur) {
        return demandeurService.createDemandeur(demandeur);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Demandeur> updateDemandeur(@PathVariable Long id, @RequestBody Demandeur updatedDemandeur) {
        return ResponseEntity.ok(demandeurService.updateDemandeur(id, updatedDemandeur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDemandeur(@PathVariable Long id) {
        demandeurService.deleteDemandeur(id);
        return ResponseEntity.noContent().build();
    }
}
