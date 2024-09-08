package com.example.Spring_backend.service;

import com.example.Spring_backend.entity.Magasin;
import com.example.Spring_backend.repository.MagasinRepository;
import com.example.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MagasinService {

    @Autowired
    private MagasinRepository magasinRepository;

    public List<Magasin> getAllMagasins() {
        return magasinRepository.findAll();
    }

    public Optional<Magasin> getMagasinById(Long id) {
        return magasinRepository.findById(id);
    }

    public Magasin createMagasin(Magasin magasin) {
        return magasinRepository.save(magasin);
    }

    public Magasin updateMagasin(Long id, Magasin updatedMagasin) {
        return magasinRepository.findById(id).map(magasin -> {
            magasin.setNom_magasin(updatedMagasin.getNom_magasin());
            magasin.setAdresse_magasin(updatedMagasin.getAdresse_magasin());
            magasin.setTelephone_magasin(updatedMagasin.getTelephone_magasin());
            return magasinRepository.save(magasin);
        }).orElseThrow(() -> new ResourceNotFoundException("Magasin not found"));
    }

    public void deleteMagasin(Long id) {
        magasinRepository.deleteById(id);
    }
}
