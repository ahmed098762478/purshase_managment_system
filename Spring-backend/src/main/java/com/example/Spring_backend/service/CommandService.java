package com.example.Spring_backend.service;
import com.example.Spring_backend.entity.Command;
import com.example.Spring_backend.entity.CommandLineItem;
import com.example.Spring_backend.entity.Produit;
import com.example.Spring_backend.repository.CommandRepository;
import com.example.Spring_backend.repository.ProduitRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
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

    public byte[] generateReceiptPdf(Long id) throws Exception {
        Command command = getCommandById(id);
        if (command == null) {
            throw new RuntimeException("Command not found");
        }

        Document document = new Document();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            // Title
            Font titleFont = new Font(Font.FontFamily.HELVETICA, 20, Font.BOLD);
            Paragraph title = new Paragraph("Command Receipt", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            // Command Details
            Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            Font normalFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);

            // Add a section header
            Paragraph sectionHeader = new Paragraph("Command Details", headerFont);
            sectionHeader.setSpacingBefore(20);
            sectionHeader.setSpacingAfter(10);
            document.add(sectionHeader);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10);

            table.addCell(createCell("Command ID:", headerFont, BaseColor.LIGHT_GRAY));
            table.addCell(createCell(String.valueOf(command.getMatricule()), normalFont));
            table.addCell(createCell("Date:", headerFont, BaseColor.LIGHT_GRAY));
            table.addCell(createCell(command.getDateCommande().toString(), normalFont));
            table.addCell(createCell("Status:", headerFont, BaseColor.LIGHT_GRAY));
            table.addCell(createCell(command.getStatut().toString(), normalFont));
            table.addCell(createCell("Total Amount:", headerFont, BaseColor.LIGHT_GRAY));
            table.addCell(createCell(String.format("$%.2f", command.getMontantTotal()), normalFont));

            document.add(table);


            addSection(document, "Demandeur Details", headerFont, normalFont,
                    "Name: " + command.getDemandeur().getNom_demandeur(),
                    "Type: " + command.getDemandeur().getType(),
                    "Phone: " + command.getDemandeur().getTelephone_demandeur(),
                    "Email: " + command.getDemandeur().getEmail_demandeur()
            );

            addSection(document, "Magasin Details", headerFont, normalFont,
                    "Name: " + command.getMagasin().getNom_magasin(),
                    "Address: " + command.getMagasin().getAdresse_magasin(),
                    "Phone: " + command.getMagasin().getTelephone_magasin()
            );

            // Line Items
            Paragraph lineItemsHeader = new Paragraph("Line Items", headerFont);
            lineItemsHeader.setSpacingBefore(20);
            lineItemsHeader.setSpacingAfter(10);
            document.add(lineItemsHeader);

            PdfPTable lineItemsTable = new PdfPTable(4);
            lineItemsTable.setWidthPercentage(100);
            lineItemsTable.setSpacingBefore(10);

            lineItemsTable.addCell(createCell("Product Name", headerFont, BaseColor.LIGHT_GRAY));
            lineItemsTable.addCell(createCell("Description", headerFont, BaseColor.LIGHT_GRAY));
            lineItemsTable.addCell(createCell("Price", headerFont, BaseColor.LIGHT_GRAY));
            lineItemsTable.addCell(createCell("Quantity", headerFont, BaseColor.LIGHT_GRAY));

            for (CommandLineItem item : command.getLineItems()) {
                lineItemsTable.addCell(createCell(item.getProduit().getNom(), normalFont));
                lineItemsTable.addCell(createCell(item.getProduit().getDescription(), normalFont));
                lineItemsTable.addCell(createCell(String.format("$%.2f", item.getProduit().getPrix()), normalFont));
                lineItemsTable.addCell(createCell(String.valueOf(item.getQuantite()), normalFont));
            }

            document.add(lineItemsTable);

            // Footer
            Paragraph footer = new Paragraph("Thank you for your business!", normalFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            footer.setSpacingBefore(20);
            document.add(footer);

        } finally {
            if (document.isOpen()) {
                document.close();
            }
        }

        return baos.toByteArray();
    }

    private PdfPCell createCell(String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setPadding(8);
        cell.setBorderWidth(1);
        cell.setBorderColor(BaseColor.LIGHT_GRAY);
        return cell;
    }

    private PdfPCell createCell(String text, Font font, BaseColor backgroundColor) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setPadding(8);
        cell.setBorderWidth(1);
        cell.setBorderColor(BaseColor.LIGHT_GRAY);
        cell.setBackgroundColor(backgroundColor);
        return cell;
    }

    private void addSection(Document document, String title, Font headerFont, Font normalFont, String... details) throws DocumentException {
        Paragraph sectionHeader = new Paragraph(title, headerFont);
        sectionHeader.setSpacingBefore(20);
        sectionHeader.setSpacingAfter(10);
        document.add(sectionHeader);

        for (String detail : details) {
            document.add(new Paragraph(detail, normalFont));
        }

        document.add(new Paragraph(" "));
    }


    public void deleteCommand(Long id) {
        commandRepository.deleteById(id);
    }
}
