package com.example.Spring_backend.service;

import com.example.Spring_backend.entity.Fournisseur;
import com.example.Spring_backend.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class FournisseurService {

    @Autowired
    private FournisseurRepository fournisseurRepository;

    // Créer un fournisseur
    public Fournisseur creerFournisseur(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }

    // Lire un fournisseur par ID
    public Optional<Fournisseur> obtenirFournisseurParId(Long id) {
        return fournisseurRepository.findById(id);
    }

    // Lire tous les fournisseurs
    public List<Fournisseur> obtenirTousLesFournisseurs() {
        return fournisseurRepository.findAll();
    }

    // Mettre à jour un fournisseur
    public Fournisseur modifierFournisseur(Long id, Fournisseur fournisseurDetails) {
        Fournisseur fournisseur = fournisseurRepository.findById(id).orElseThrow(() -> new RuntimeException("Fournisseur non trouvé"));
        fournisseur.setNomFournisseur(fournisseurDetails.getNomFournisseur());
        fournisseur.setAdresse(fournisseurDetails.getAdresse());
        fournisseur.setTelephone(fournisseurDetails.getTelephone());
        fournisseur.setEmail(fournisseurDetails.getEmail());
        return fournisseurRepository.save(fournisseur);
    }

    // Supprimer un fournisseur
    public void supprimerFournisseur(Long id) {
        Fournisseur fournisseur = fournisseurRepository.findById(id).orElseThrow(() -> new RuntimeException("Fournisseur non trouvé"));
        fournisseurRepository.delete(fournisseur);
    }
}