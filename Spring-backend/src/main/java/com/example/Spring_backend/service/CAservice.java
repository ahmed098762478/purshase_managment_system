package com.example.Spring_backend.service;

import com.example.Spring_backend.entity.CA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CAService {
    @Autowired
    private CARepository  caRepository;

    public CA login(String email, String motDePasse) throws Exception {
        CA ca = caRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("Email not found"));

        if (!ca.getMot_de_passe().equals(motDePasse)) {
            throw new Exception("Incorrect password");
        }
        return ca;
    }
}

