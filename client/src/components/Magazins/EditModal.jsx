import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, onRequestClose, magasin, onEditMagasin }) => {
  const [formData, setFormData] = useState({
    nom_magasin: '',
    adresse_magasin: '',
    telephone_magasin: ''
  });

  useEffect(() => {
    if (magasin) {
      setFormData({
        nom_magasin: magasin.nom_magasin || '',
        adresse_magasin: magasin.adresse_magasin || '',
        telephone_magasin: magasin.telephone_magasin || ''
      });
    }
  }, [magasin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditMagasin({ ...formData, id_magasin: magasin.id_magasin });
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
        <h2 className="text-lg font-semibold mb-4">Edit Magasin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom du Magasin</label>
            <input
              type="text"
              name="nom_magasin"
              value={formData.nom_magasin}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Téléphone</label>
            <input
              type="text"
              name="telephone_magasin"
              value={formData.telephone_magasin}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <input
              type="text"
              name="adresse_magasin"
              value={formData.adresse_magasin}
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

export default EditModal;