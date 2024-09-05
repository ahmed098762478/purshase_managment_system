package com.example.Spring_backend.controller;

import com.example.Spring_backend.entity.CA;
import com.example.Spring_backend.service.CAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5177")
public class CAController {
    @Autowired
    private CAService caService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
                loginRequest.getMotDePasse() == null || loginRequest.getMotDePasse().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password are required");
        }
        try {
            CA ca = caService.login(loginRequest.getEmail(), loginRequest.getMotDePasse());
            return ResponseEntity.ok("Login successful for user: " + ca.getNom_CA());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }


static class LoginRequest {
    private String email;
    private String motDePasse;

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
} }
