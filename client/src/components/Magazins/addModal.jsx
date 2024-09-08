// src/components/AddModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';

const AddModal = ({ isOpen, onRequestClose, onAddMagasin }) => {
  const [nom_magasin, setNomMagasin] = useState('');
  const [telephone_magasin, setTelephoneMagasin] = useState('');
  const [adresse_magasin, setAdresseMagasin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMagasin = { nom_magasin, telephone_magasin, adresse_magasin };
    try {
      await onAddMagasin(newMagasin);
      onRequestClose(); // Ferme le modal après l'ajout
    } catch (error) {
      console.error('Error adding magasin:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Add New Magasin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom_magasin" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              id="nom_magasin"
              value={nom_magasin}
              onChange={(e) => setNomMagasin(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="adresse_magasin" className="block text-sm font-medium text-gray-700">Adresse</label>
            <input
              type="text"
              id="adresse_magasin"
              value={adresse_magasin}
              onChange={(e) => setAdresseMagasin(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telephone_magasin" className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="text"
              id="telephone_magasin"
              value={telephone_magasin}
              onChange={(e) => setTelephoneMagasin(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onRequestClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddModal;
