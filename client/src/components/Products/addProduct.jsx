import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const AddProduct = ({ isOpen, onRequestClose, onAddProduct }) => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [nom, setNom] = useState('');
  const [selectedFournisseur, setSelectedFournisseur] = useState('');
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [marque, setMarque] = useState("");

  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:8080/fournisseurs')
        .then(response => {
          setFournisseurs(response.data);
        })
        .catch(error => {
          console.error("Error fetching fournisseurs", error);
        });
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the new prestation object
    const newProduit = {
      nom,
      fournisseur: {
        idFournisseur: selectedFournisseur
      },
      prix,
      description,
      categorie,
      marque
    };

    // Make API request to save the new prestation (replace with your endpoint)
    axios.post('http://localhost:8080/produits', newProduit)
      .then(response => {
        onAddProduct(response.data); // Trigger parent component update after save
        onRequestClose();      // Close the modal
      })
      .catch(error => {
        console.error("Error saving prestation", error);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom produit</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom Fournisseur</label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={selectedFournisseur}
              onChange={(e) => setSelectedFournisseur(e.target.value)}
              required
            >
              <option value="" disabled>Select a fournisseur</option>
              {fournisseurs.map(fournisseur => (
                <option key={fournisseur.idFournisseur} value={fournisseur.idFournisseur}>
                  {fournisseur.nomFournisseur}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Prix Unitaire</label>
            <input
              type="number"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Categorie</label>
            <input
              type="text"
              name="categorie"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Marque</label>
            <input
              type="text"
              name="marque"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onRequestClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProduct;
