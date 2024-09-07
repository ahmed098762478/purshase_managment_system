package com.example.Spring_backend.service;

import com.example.Spring_backend.entity.Prestation;
import com.example.Spring_backend.repository.PrestationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrestationService {

    private final PrestationRepository prestationRepository;

    public PrestationService(PrestationRepository prestationRepository) {
        this.prestationRepository = prestationRepository;
    }

    // CRUD : Create
    public Prestation ajouterPrestation(Prestation prestation) {
        return prestationRepository.save(prestation);
    }

    // CRUD : Read
    public Prestation obtenirPrestationParId(Long id) {
        return prestationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prestation non trouvée"));
    }

    public List<Prestation> obtenirToutesLesPrestations() {
        return prestationRepository.findAll();
    }

    // CRUD : Update
    public Prestation modifierPrestation(Long id, Prestation prestationDetails) {
        Prestation prestation = obtenirPrestationParId(id);
        prestation.setNomPrestation(prestationDetails.getNomPrestation());
        prestation.setDatePrestation(prestationDetails.getDatePrestation());
        prestation.setFournisseur(prestationDetails.getFournisseur());
        return prestationRepository.save(prestation);
    }

    // CRUD : Delete
    public void supprimerPrestation(Long id) {
        Prestation prestation = obtenirPrestationParId(id);
        prestationRepository.delete(prestation);
    }
}