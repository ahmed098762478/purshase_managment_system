import { Box, Button, Input, Select } from "@chakra-ui/react";
import { useState } from "react";

export default function AddCommand() {
  const [commandData, setCommandData] = useState({
    nomMagazin: "",
    nomDemandeur: "",
    dateCommande: "",
    statut: "pending",
    produits: [],
  });

  const [newProduct, setNewProduct] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommandData({
      ...commandData,
      [name]: value,
    });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const addProduct = () => {
    setCommandData({
      ...commandData,
      produits: [...commandData.produits, newProduct],
    });
    // Clear product form
    setNewProduct({ nom: "", description: "", prix: "", quantite: "" });
  };

  const handleSaveCommand = () => {
    console.log("Command saved:", commandData);
    // Submit the form or save the data
  };

  return (
    <Box className="p-10">
      {/* Command Information */}
      <div className="grid grid-cols-2 gap-4">
        {/* Select inputs for nomMagazin and nomDemandeur */}
        <Box>
          <Select
            placeholder="Select Magazin"
            name="nomMagazin"
            value={commandData.nomMagazin}
            onChange={handleInputChange}
            mb={4}
          >
            {/* Options would be fetched from backend */}
            <option value="magazin1">Magazin 1</option>
            <option value="magazin2">Magazin 2</option>
          </Select>

          <Select
            placeholder="Select Demandeur"
            name="nomDemandeur"
            value={commandData.nomDemandeur}
            onChange={handleInputChange}
            mb={4}
          >
            {/* Options would be fetched from backend */}
            <option value="demandeur1">Demandeur 1</option>
            <option value="demandeur2">Demandeur 2</option>
          </Select>
        </Box>

        {/* Date Command */}
        <Box>
          <Input
            type="date"
            name="dateCommande"
            value={commandData.dateCommande}
            onChange={handleInputChange}
            mb={4}
          />
        </Box>
      </div>

      {/* Product Information */}
      <Box mt={6}>
        <div className="grid grid-cols-4 gap-4">
          <Input
            placeholder="Nom Produit"
            name="nom"
            value={newProduct.nom}
            onChange={handleProductChange}
          />
          <Input
            placeholder="Description"
            name="description"
            value={newProduct.description}
            onChange={handleProductChange}
          />
          <Input
            placeholder="Prix"
            name="prix"
            value={newProduct.prix}
            onChange={handleProductChange}
          />
          <Input
            placeholder="Quantité"
            name="quantite"
            value={newProduct.quantite}
            onChange={handleProductChange}
          />
        </div>

        <Button mt={4} colorScheme="blue" onClick={addProduct}>
          Add Product
        </Button>
      </Box>

      {/* Product Table */}
      <Box mt={6}>
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">Nom</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
              <th className="border border-gray-200 px-4 py-2">Prix</th>
              <th className="border border-gray-200 px-4 py-2">Quantité</th>
            </tr>
          </thead>
          <tbody>
            {commandData.produits.map((product, index) => (
              <tr key={index}>
                <td className="border border-gray-200 px-4 py-2">{product.nom}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {product.description}
                </td>
                <td className="border border-gray-200 px-4 py-2">{product.prix}</td>
                <td className="border border-gray-200 px-4 py-2">{product.quantite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      {/* Save Button */}
      <Button mt={6} colorScheme="green" onClick={handleSaveCommand}>
        Save Command
      </Button>
    </Box>
  );
}
