import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const EditProduct = ({ isOpen, onRequestClose, product, onEditProduct }) => {
  const [formData, setFormData] = useState({
    nom: '',
    idFournisseur: '',
    prix: '',
    description: '',
    categorie: '',
    marque: '',
  });
  const [fournisseurs, setFournisseurs] = useState([])

  useEffect(() => {
    if (isOpen) {
      // Fetch fournisseurs when the modal opens
      axios.get('http://localhost:8080/fournisseurs')
        .then(response => {
          setFournisseurs(response.data);
        })
        .catch(error => {
          console.error("Error fetching fournisseurs", error);
        });
      if (product) {
        setFormData({
          nom: product.nom || '',
          idFournisseur: product.fournisseur?.idFournisseur || '',
          prix: product.prix || '',
          description: product.description || '',
          categorie: product.categorie || '',
          marque: product.marque || '',
        });
      }
    }
  }, [isOpen, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form", formData);
    const updatedData = {
      idProduit: product.idProduit,
      nom: formData.nom,
      prix: formData.prix,
      description: formData.description,
      categorie: formData.categorie,
      marque: formData.marque,
      fournisseur: {
        idFournisseur: formData.idFournisseur
      }
    };
    onEditProduct(updatedData);
    onRequestClose();
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Modifier Produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom Fournisseur</label>
            <select
              name="idFournisseur"
              value={formData.idFournisseur}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
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
              name="prix"
              value={formData.prix}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Categorie</label>
            <input
              type="text"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Marque</label>
            <input
              type="text"
              name="marque"
              value={formData.marque}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
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

export default EditProduct;
