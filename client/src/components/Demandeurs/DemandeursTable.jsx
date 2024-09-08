import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const DemandeursTable = () => {
    const [demandeurs, setDemandeurs] = useState([]); // Stocker les demandeurs
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessVisible, setSuccessVisible] = useState(false);

    // Récupérer les demandeurs depuis l'API
    useEffect(() => {
        axios.get('http://localhost:8080/api/demandeurs')
            .then(response => {
                setDemandeurs(response.data);
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de la récupération des demandeurs!", error);
            });
    }, []);

    const filteredUsers = demandeurs.filter((user) =>
        user.nom_demandeur.toLowerCase().includes(searchTerm.toLowerCase()));
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const openAddUserModal = () => setAddUserModalOpen(true);
    const closeAddUserModal = () => setAddUserModalOpen(false);
    
    const openEditModal = () => setEditModalOpen(true);
    const closeEditModal = () => setEditModalOpen(false);
    
    const openDeleteModal = () => setDeleteModalOpen(true);
    const closeDeleteModal = () => setDeleteModalOpen(false);

    const handleAddSuccess = () => {
        setSuccessMessage('Demandeur ajouté avec succès');
        setSuccessVisible(true); // Afficher le message de succès
        setTimeout(() => setSuccessVisible(false), 7000); // Cacher le message après 3 secondes
        setAddUserModalOpen(false); // Fermer le modal d'ajout
        // Optionnellement, récupérer la liste mise à jour des demandeurs
        axios.get('http://localhost:8080/api/demandeurs')
            .then(response => {
                setDemandeurs(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des demandeurs après ajout", error);
            });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Message de succès */}
            {isSuccessVisible && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Succès!</strong>
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold leading-tight text-gray-900">Liste des demandeurs d'achat</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700" onClick={openAddUserModal}>
                    Ajouter un demandeur
                </button>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Rechercher par nom..."
                    className="px-4 py-2 border rounded-md w-full"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nom</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Type</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Email</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Téléphone</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {currentUsers.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 text-sm text-gray-900">{item.nom_demandeur}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{item.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{item.email_demandeur}</td>
                                <td className="px-6 py-4 text-sm text-gray-900">{item.telephone_demandeur}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-800" onClick={openEditModal}>
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-600 hover:text-red-800" onClick={openDeleteModal}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="text-center text-gray-500 py-4">Aucun demandeur trouvé</div>
                )}
            </div>
            <div className="mt-4 flex justify-between items-center">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Précédent
                </button>
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastUser >= filteredUsers.length} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Suivant
                </button>
            </div>
            <AddModal isOpen={isAddUserModalOpen} onRequestClose={closeAddUserModal} onSuccess={handleAddSuccess} />
            <EditModal isOpen={isEditModalOpen} onRequestClose={closeEditModal} />
            <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} />
        </div>
    );
};

export default DemandeursTable;
