package com.example.Spring_backend.controller;
import com.example.Spring_backend.entity.Command;
import com.example.Spring_backend.service.CommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/commands")
public class CommandController {

    @Autowired
    private CommandService commandService;

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
}
