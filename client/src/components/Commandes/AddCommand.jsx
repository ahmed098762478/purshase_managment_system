import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCommand() {
  const [commandData, setCommandData] = useState({
    idMagasin: "",
    idDemandeur: "",
    dateCommande: "",
    statut: "PENDING",
    produits: [],
  });

  const [newProduct, setNewProduct] = useState({
    idProduit: "",
    quantite: "",
  });

  const [magasins, setMagasins] = useState([]);
  const [demandeurs, setDemandeurs] = useState([]);
  const [produits, setProduits] = useState([]);

  const navigate = useNavigate();

  // Fetch magasins, demandeurs, and produits
  useEffect(() => {
    async function fetchData() {
      try {
        const [magasinRes, demandeurRes, produitRes] = await Promise.all([
          axios.get("http://localhost:8080/api/magazins"),
          axios.get("http://localhost:8080/api/demandeurs"),
          axios.get("http://localhost:8080/produits"),
        ]);

        setMagasins(magasinRes.data);
        setDemandeurs(demandeurRes.data);
        setProduits(produitRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

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
    const { idProduit, quantite } = newProduct;
    if (idProduit && quantite) {
      const productToAdd = {
        produit: produits.find((p) => p.idProduit === parseInt(idProduit)),
        quantite: parseInt(quantite),
      };

      setCommandData({
        ...commandData,
        produits: [...commandData.produits, productToAdd],
      });
      setNewProduct({ idProduit: "", quantite: "" });
    }
  };

  const handleSaveCommand = async () => {
    try {
      await axios.post("http://localhost:8080/commands", {
        dateCommande: commandData.dateCommande,
        statut: commandData.statut,
        demandeur: { id_demandeur: parseInt(commandData.idDemandeur) },
        magasin: { id_magasin: parseInt(commandData.idMagasin) },
        lineItems: commandData.produits.map((product) => ({
          produit: { idProduit: product.produit.idProduit },
          quantite: product.quantite,
        })),
      });

      alert("Command saved successfully!");
      navigate("/admin/commandes"); // Replace "/success" with the desired route
    } catch (error) {
      console.error("Error saving command:", error);
      alert("Failed to save command.");
    }
  };

  return (
    <form className="max-w-md mx-auto">
      {/* Form fields for magasin, demandeur, dateCommande */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">Selectionner le magasin</label>
        <select
          name="idMagasin"
          onChange={handleInputChange}
          value={commandData.idMagasin}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        >
          <option value="">Select magasin</option>
          {magasins.map((mag) => (
            <option key={mag.id_magasin} value={mag.id_magasin}>
              {mag.nom_magasin}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">Selectionner le demandeur</label>
        <select
          name="idDemandeur"
          onChange={handleInputChange}
          value={commandData.idDemandeur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        >
          <option value="">Select demandeur</option>
          {demandeurs.map((dem) => (
            <option key={dem.id_demandeur} value={dem.id_demandeur}>
              {dem.nom_demandeur}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">Date de commande</label>
        <input
          type="date"
          name="dateCommande"
          onChange={handleInputChange}
          value={commandData.dateCommande}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        />
      </div>

      {/* Product Form */}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Nom produit</label>
          <select
            name="idProduit"
            onChange={handleProductChange}
            value={newProduct.idProduit}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          >
            <option value="">Select produit</option>
            {produits.map((prod) => (
              <option key={prod.idProduit} value={prod.idProduit}>
                {prod.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Quantité</label>
          <input
            type="number"
            name="quantite"
            onChange={handleProductChange}
            value={newProduct.quantite}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={addProduct}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Ajouter Produit
      </button>

      {/* Products Table */}
      <table className="min-w-full border-collapse border border-gray-200 mt-5">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Produit</th>
            <th className="border border-gray-200 px-4 py-2">Quantité</th>
          </tr>
        </thead>
        <tbody>
          {commandData.produits.map((product, index) => (
            <tr key={index}>
              <td className="border border-gray-200 px-4 py-2">
                {product.produit?.nom || "Unknown Product"}
              </td>
              <td className="border border-gray-200 px-4 py-2">{product.quantite}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={handleSaveCommand}
        className="mt-5 text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Save Commande
      </button>
    </form>
  );
}
