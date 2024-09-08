import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import '../../css/modal.css';

const EditModal = ({ isOpen, onRequestClose, demandeur, onSave }) => {
    const [nomDemandeur, setNomDemandeur] = useState(demandeur.nom_demandeur);
    const [type, setType] = useState(demandeur.type);
    const [emailDemandeur, setEmailDemandeur] = useState(demandeur.email_demandeur);
    const [telephoneDemandeur, setTelephoneDemandeur] = useState(demandeur.telephone_demandeur);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/demandeurs/${demandeur.id_demandeur}`, {
                nom_demandeur: nomDemandeur,
                type,
                email_demandeur: emailDemandeur,
                telephone_demandeur: telephoneDemandeur
            });
            onSave('Demandeur modifié avec succès.');
        } catch (error) {
            setErrorMessage("Erreur lors de la modification du demandeur");
            onSave(null, "Erreur lors de la modification du demandeur");
        }
    };

    return (
        <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
            <div className="modal-content">
                <button className="close" onClick={onRequestClose}><FaTimes /></button>
                <h2 className="text-xl font-semibold mb-4">Modifier le demandeur</h2>
                {errorMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{errorMessage}</div>}
                <form onSubmit={handleSave}>
                    <div className="mb-4">
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="nom"
                            value={nomDemandeur}
                            onChange={(e) => setNomDemandeur(e.target.value)}
                            className="border border-gray-300 rounded-md shadow-sm w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                        <input
                            type="text"
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-gray-300 rounded-md shadow-sm w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={emailDemandeur}
                            onChange={(e) => setEmailDemandeur(e.target.value)}
                            className="border border-gray-300 rounded-md shadow-sm w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                        <input
                            type="text"
                            id="telephone"
                            value={telephoneDemandeur}
                            onChange={(e) => setTelephoneDemandeur(e.target.value)}
                            className="border border-gray-300 rounded-md shadow-sm w-full"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
