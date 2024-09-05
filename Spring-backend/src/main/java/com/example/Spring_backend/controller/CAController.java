package com.example.Spring_backend.controller;

import com.example.Spring_backend.entity.CA;
import com.example.Spring_backend.service.CAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class CAController {
    @Autowired
    private CAService caService;

    @PostMapping("/login")
    public ResponseEntity<CA> login(@RequestBody LoginRequest loginRequest) {
        try {
            CA ca = caService.login(loginRequest.getEmail(), loginRequest.getMotDePasse());
            return ResponseEntity.ok(ca);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}

class LoginRequest {
    private String email;
    private String motDePasse;

    // Getter for email
    public String getEmail() {
        return email;
    }

    // Setter for email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter for motDePasse
    public String getMotDePasse() {
        return motDePasse;
    }

    // Setter for motDePasse
    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}


