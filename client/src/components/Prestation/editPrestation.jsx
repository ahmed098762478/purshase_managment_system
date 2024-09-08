import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const EditPrestation = ({ isOpen, onRequestClose, data, onSave }) => {
  const [formData, setFormData] = useState({
    prestationName: '',
    fournisseurId: '',
    prestationDate: ''
  });
  const [fournisseurs, setFournisseurs] = useState([]);

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

      if (data) {
        setFormData({
          prestationName: data.nomPrestation || '',
          fournisseurId: data.fournisseur?.idFournisseur || '',
          prestationDate: data.datePrestation ? data.datePrestation.split('T')[0] : ''
        });
      }
    }
  }, [isOpen, data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      idPrestation: data.idPrestation,
      nomPrestation: formData.prestationName,
      datePrestation: formData.prestationDate,
      fournisseur: {
        idFournisseur: formData.fournisseurId
      }
    };
    onSave(updatedData);
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
        <h2 className="text-lg font-semibold mb-4">Edit Prestation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom Prestation</label>
            <input
              type="text"
              name="prestationName"
              value={formData.prestationName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom Fournisseur</label>
            <select
              name="fournisseurId"
              value={formData.fournisseurId}
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
            <label className="block text-sm font-medium mb-1">Date Prestation</label>
            <input
              type="date"
              name="prestationDate"
              value={formData.prestationDate}
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

export default EditPrestation;
