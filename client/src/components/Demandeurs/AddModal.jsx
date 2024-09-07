import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AddModal = ({ isOpen, onRequestClose, onSuccess }) => {
    const [nom, setNom] = useState('');
    const [type, setType] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDemandeur = { nom_demandeur: nom, type, telephone_demandeur: telephone, email_demandeur: email };

        axios.post('http://localhost:8080/api/demandeurs', newDemandeur)
            .then(response => {
                setSuccessMessage('Demandeur ajouté avec succès');
                setNom('');
                setType('');
                setTelephone('');
                setEmail('');
                if (onSuccess) onSuccess(); // Notify parent about success
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout du demandeur", error);
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
                <h2 className="text-lg font-semibold mb-4">Ajouter un Demandeur d'achat</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Nom du Demandeur</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Téléphone</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        Ajouter
                    </button>
                </form>
                {successMessage && (
                    <div className="mt-4 text-green-600 bg-green-100 p-2 rounded-lg">
                        {successMessage}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default AddModal;
