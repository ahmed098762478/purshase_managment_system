import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AddModal = ({ isOpen, onRequestClose, onAddFournisseur }) => { 

  const [fournisseur, setFournisseur] = useState({
    nomFournisseur: '',
    adresse: '',
    telephone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFournisseur({ ...fournisseur, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/fournisseurs', fournisseur);
      onAddFournisseur(response.data);
      onRequestClose();
    } catch (error) {
      console.error('There was an error adding the fournisseur!', error);
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
      <h2 className="text-lg font-semibold mb-4">Add Fournisseur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nom Fournisseur</label>
          <input
            type="text"
            name="nomFournisseur" // Add name attribute here
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={fournisseur.nomFournisseur}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Adresse</label>
          <input
            type="text"
            name="adresse" // Add name attribute here
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={fournisseur.adresse}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Telephone</label>
          <input
            type="text"
            name="telephone" // Add name attribute here
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={fournisseur.telephone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email" // Add name attribute here
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={fournisseur.email}
            onChange={handleChange}
          />
        </div>
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
      </form>

    </div>
  </Modal>

  );
};

export default AddModal;
