package com.example.Spring_backend.service;

import com.example.Spring_backend.entity.Demandeur;
import com.example.Spring_backend.repository.DemandeurRepository;
import com.example.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DemandeurService {

    @Autowired
    private DemandeurRepository demandeurRepository;

    public List<Demandeur> getAllDemandeurs() {
        return demandeurRepository.findAll();
    }

    public Optional<Demandeur> getDemandeurById(Long id) {
        return demandeurRepository.findById(id);
    }

    public Demandeur createDemandeur(Demandeur demandeur) {
        return demandeurRepository.save(demandeur);
    }

    public Demandeur updateDemandeur(Long id, Demandeur updatedDemandeur) {
        return demandeurRepository.findById(id).map(demandeur -> {
            demandeur.setNom_demandeur(updatedDemandeur.getNom_demandeur());
            demandeur.setType(updatedDemandeur.getType());
            demandeur.setEmail_demandeur(updatedDemandeur.getEmail_demandeur());
            demandeur.setTelephone_demandeur(updatedDemandeur.getTelephone_demandeur());
            return demandeurRepository.save(demandeur);
        }).orElseThrow(() -> new ResourceNotFoundException("Demandeur not found"));
    }

    public void deleteDemandeur(Long id) {
        demandeurRepository.deleteById(id);
    }
}
