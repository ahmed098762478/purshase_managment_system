package com.example.Spring_backend.service;

import com.example.Spring_backend.entity.CA;
import com.example.Spring_backend.repository.CARepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CAService {
    @Autowired
    private CARepository caRepository;

    public CA login(String email, String motDePasse) throws Exception {
        Optional<CA> optionalCA = caRepository.findByEmail(email);
        if (optionalCA.isPresent()) {
            CA ca = optionalCA.get();
            if (ca.getMot_de_passe().equals(motDePasse)) {
                return ca;
            }
        }
        throw new Exception("Invalid credentials");
    }
}
