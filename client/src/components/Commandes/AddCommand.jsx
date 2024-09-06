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

  const products = [
    { nom: "Produit 1", description: "Description 1", prix: "100" },
    { nom: "Produit 2", description: "Description 2", prix: "200" },
    { nom: "Produit 3", description: "Description 3", prix: "300" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommandData({
      ...commandData,
      [name]: value,
    });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    if (name === "nom") {
      const selectedProduct = products.find((prod) => prod.nom === value);
      if (selectedProduct) {
        setNewProduct({
          ...newProduct,
          nom: selectedProduct.nom,
          description: selectedProduct.description,
          prix: selectedProduct.prix,
        });
      }
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  const addProduct = () => {
    const { nom, quantite } = newProduct;

    if (nom && quantite) {
      setCommandData({
        ...commandData,
        produits: [...commandData.produits, newProduct],
      });
      // Clear product form
      setNewProduct({ nom: "", description: "", prix: "", quantite: "" });
    }
  };

  const handleSaveCommand = () => {
    console.log("Command saved:", commandData);
    // Submit the form or save the data
  };

  return (
    <form className="max-w-md mx-auto">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Selectionner le magazin
        </label>
        <select
          name="nomMagazin"
          onChange={handleInputChange}
          value={commandData.nomMagazin}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        >
          <option value="">Select magazin</option>
          <option value="Magazin 1">Magazin 1</option>
          <option value="Magazin 2">Magazin 2</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Selectionner le demandeur
        </label>
        <select
          name="nomDemandeur"
          onChange={handleInputChange}
          value={commandData.nomDemandeur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        >
          <option value="">Select demandeur</option>
          <option value="Demandeur 1">Demandeur 1</option>
          <option value="Demandeur 2">Demandeur 2</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Date de commande
        </label>
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
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nom produit
          </label>
          <select
            name="nom"
            onChange={handleProductChange}
            value={newProduct.nom}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          >
            <option value="">Select produit</option>
            {products.map((prod, index) => (
              <option key={index} value={prod.nom}>
                {prod.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Quantité
          </label>
          <input
            type="number"
            name="quantite"
            onChange={handleProductChange}
            value={newProduct.quantite}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          />
        </div>
      </div>

      {/* Auto-filled Description and Price */}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={newProduct.description}
            readOnly
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Prix
          </label>
          <input
            type="text"
            name="prix"
            value={newProduct.prix}
            readOnly
            className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
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
              <td className="border border-gray-200 px-4 py-2">
                {product.quantite}
              </td>
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
