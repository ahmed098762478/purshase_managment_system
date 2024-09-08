package com.example.Spring_backend.service;
import com.example.Spring_backend.entity.Command;
import com.example.Spring_backend.entity.CommandLineItem;
import com.example.Spring_backend.entity.Produit;
import com.example.Spring_backend.repository.CommandRepository;
import com.example.Spring_backend.repository.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommandService {
    @Autowired
    private CommandRepository commandRepository;
    @Autowired
    private ProduitRepository produitRepository;

    public List<Command> getAllCommands() {
        return commandRepository.findAll();
    }

    public Command getCommandById(Long id) {
        return commandRepository.findById(id).orElse(null);
    }

    public Command createCommand(Command command) {
        double total = 0.0;

        for (CommandLineItem item : command.getLineItems()) {
            // Fetch the product from the database using the ID provided in the request
            Produit produit = produitRepository.findById(item.getProduit().getIdProduit())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // Calculate total based on the product price and quantity
            double prix = produit.getPrix();
            int quantite = item.getQuantite();
            total += prix * quantite;

            // Link the product and the command to the line item
            item.setProduit(produit);
            item.setCommand(command);
        }

        // Set the total amount on the command
        command.setMontantTotal(total);

        // Save the command and return it
        return commandRepository.save(command);
    }




    public void deleteCommand(Long id) {
        commandRepository.deleteById(id);
    }
}
