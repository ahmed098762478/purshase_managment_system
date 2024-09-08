package com.example.Spring_backend.controller;

import com.example.Spring_backend.entity.Magasin;
import com.example.Spring_backend.service.MagasinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/magazins")
@CrossOrigin(origins = "http://localhost:5175")
public class MagasinController {

    @Autowired
    private MagasinService magasinService;

    @GetMapping
    public List<Magasin> getAllMagasins() {
        return magasinService.getAllMagasins();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Magasin> getMagasinById(@PathVariable Long id) {
        return magasinService.getMagasinById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Magasin createMagasin(@RequestBody Magasin magasin) {
        return magasinService.createMagasin(magasin);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Magasin> updateMagasin(@PathVariable Long id, @RequestBody Magasin updatedMagasin) {
        return ResponseEntity.ok(magasinService.updateMagasin(id, updatedMagasin));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMagasin(@PathVariable Long id) {
        magasinService.deleteMagasin(id);
        return ResponseEntity.noContent().build();
    }
}
