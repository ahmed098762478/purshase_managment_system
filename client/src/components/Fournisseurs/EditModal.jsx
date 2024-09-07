import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onRequestClose, fournisseur, onEditFournisseur }) => {
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    address: '',
    email: ''
  });

  useEffect(() => {
    if (fournisseur) {
      setFormData({
        name: fournisseur.name || '',
        telephone: fournisseur.telephone || '',
        address: fournisseur.address || '',
        email: fournisseur.email || ''
      });
    }
  }, [fournisseur]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form", formData); // Check if this is logged
  
    if (fournisseur) {
      console.log("Product exists", fournisseur); // Ensure product is available
      try {
        const response = await axios.put(`http://localhost:8080/fournisseurs/${fournisseur.idFournisseur}`, formData);
        console.log("fournisseur updated successfully", response.data);
        onEditFournisseur(response.data);
        onRequestClose();
      } catch (error) {
        console.error('There was an error updating the product!', error.response?.data || error.message);
      }
    } else {
      console.log("No product to update"); // If product is not set
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Fournisseur</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom Fournisseur</label>
            <input
              type="text"
              name="nomFournisseur"
              value={formData.nomFournisseur}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Telephone</label>
            <input
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
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
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
