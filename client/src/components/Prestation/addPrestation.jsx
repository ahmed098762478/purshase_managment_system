import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const AddPrestation = ({ isOpen, onRequestClose, onSave }) => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [nomPrestation, setNomPrestation] = useState("");
  const [selectedFournisseur, setSelectedFournisseur] = useState("");
  const [datePrestation, setDatePrestation] = useState("");

  // Fetch the fournisseurs from the backend when the modal opens
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
    const newPrestation = {
      nomPrestation,
      fournisseur: {
        idFournisseur: selectedFournisseur
      },
      datePrestation
    };

    // Make API request to save the new prestation (replace with your endpoint)
    axios.post('http://localhost:8080/prestations', newPrestation)
      .then(response => {
        onSave(response.data); // Trigger parent component update after save
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
        <h2 className="text-lg font-semibold mb-4">Add Prestation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Nom Prestation</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={nomPrestation}
              onChange={(e) => setNomPrestation(e.target.value)}
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
            <label className="block text-sm font-medium mb-1">Date Prestation</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={datePrestation}
              onChange={(e) => setDatePrestation(e.target.value)}
              required
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

export default AddPrestation;
