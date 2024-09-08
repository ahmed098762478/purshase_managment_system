package com.example.Spring_backend.controller;
import com.example.Spring_backend.entity.Command;
import com.example.Spring_backend.entity.Statut;
import com.example.Spring_backend.repository.CommandRepository;
import com.example.Spring_backend.service.CommandService;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/commands")
@CrossOrigin(origins = "http://localhost:5173")
public class CommandController {

    @Autowired
    private CommandService commandService;
    @Autowired
    private CommandRepository commandRepository;

    // Get all commands
    @GetMapping
    public List<Command> getAllCommands() {
        return commandService.getAllCommands();
    }

    // Get command by ID
    @GetMapping("/{id}")
    public ResponseEntity<Command> getCommandById(@PathVariable Long id) {
        Command command = commandService.getCommandById(id);
        if (command == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(command);
    }

    // Create a new command
    @PostMapping
    public Command createCommand(@RequestBody Command command) {
        return commandService.createCommand(command);
    }

    // Delete a command by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommand(@PathVariable Long id) {
        commandService.deleteCommand(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/receipt")
    public ResponseEntity<byte[]> downloadReceipt(@PathVariable Long id) {
        try {
            byte[] pdfBytes = commandService.generateReceiptPdf(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "command-receipt-" + id + ".pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
