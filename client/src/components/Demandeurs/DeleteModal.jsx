import React from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import '../../css/modal.css';

const DeleteModal = ({ isOpen, onRequestClose, demandeurId, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(http://localhost:8080/api/demandeurs/${demandeurId});
            onDelete('Demandeur supprimé avec succès.');
        } catch (error) {
            onDelete(null, "Erreur lors de la suppression du demandeur");
        }
    };

    return (
        <div className={modal ${isOpen ? 'modal-open' : ''}}>
            <div className="modal-content">
                <button className="close" onClick={onRequestClose}><FaTimes /></button>
                <h2 className="text-xl font-semibold mb-4">Supprimer le demandeur</h2>
                <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce demandeur ?</p>
                <div className="flex justify-end">
                    <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Supprimer</button>
                    <button onClick={onRequestClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ml-2">Annuler</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;