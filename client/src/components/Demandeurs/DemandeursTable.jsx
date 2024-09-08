import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import '../../css/modal.css';

const DemandeursTable = () => {
    const [demandeurs, setDemandeurs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessVisible, setSuccessVisible] = useState(false);
    const [isErrorVisible, setErrorVisible] = useState(false);
    const [selectedDemandeur, setSelectedDemandeur] = useState(null);
    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchDemandeurs();
    }, []);

    const fetchDemandeurs = () => {
        axios.get('http://localhost:8080/api/demandeurs')
            .then(response => {
                setDemandeurs(response.data);
            })
            .catch(error => {
                console.error("Il y a eu une erreur lors de la récupération des demandeurs!", error);
            });
    };

    const filteredUsers = demandeurs.filter((user) =>
        user.nom_demandeur.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const openAddUserModal = () => setAddUserModalOpen(true);
    const closeAddUserModal = () => setAddUserModalOpen(false);

    const openEditModal = async (id_demandeur) => {
        try {
            const response = await axios.get("http://localhost:8080/api/demandeurs/${id_demandeur}");
            setSelectedDemandeur(response.data);
            setEditModalOpen(true);
        } catch (error) {
            console.error("Erreur lors de la récupération du demandeur pour l'édition", error);
        }
    };

    const closeEditModal = () => {
        setSelectedDemandeur(null);
        setEditModalOpen(false);
    };

    const openDeleteModal = (id_demandeur) => {
        setSelectedDemandeur(id_demandeur);
        setDeleteModalOpen(true);
    };
    
    const closeDeleteModal = () => {
        setSelectedDemandeur(null);
        setDeleteModalOpen(false);
    };

    const handleAddSuccess = () => {
        setSuccessMessage('Demandeur ajouté avec succès.');
        setSuccessVisible(true);
        setTimeout(() => setSuccessVisible(false), 7000);
        closeAddUserModal();
        fetchDemandeurs();  // Rafraîchir la liste des demandeurs
    };

    const handleEditSave = (successMsg, errorMsg) => {
        if (successMsg) {
            setSuccessMessage(successMsg);
            setSuccessVisible(true);
            setTimeout(() => setSuccessVisible(false), 7000);
        }
        if (errorMsg) {
            setErrorMessage(errorMsg);
            setErrorVisible(true);
            setTimeout(() => setErrorVisible(false), 7000);
        }
        fetchDemandeurs();  // Rafraîchir la liste des demandeurs
        closeEditModal();
    };

    const handleDelete = (successMsg, errorMsg) => {
        if (successMsg) {
            setSuccessMessage(successMsg);
            setSuccessVisible(true);
            setTimeout(() => setSuccessVisible(false), 7000);
        }
        if (errorMsg) {
            setErrorMessage(errorMsg);
            setErrorVisible(true);
            setTimeout(() => setErrorVisible(false), 7000);
        }
        fetchDemandeurs();  // Rafraîchir la liste des demandeurs
        closeDeleteModal();
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {isSuccessVisible && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Succès!</strong>
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            {isErrorVisible && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Erreur!</strong>
                    <span className="block sm:inline">{errorMessage}</span>
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
                    <tbody className="divide-y divide-gray-100 border-t border-gray-200">
                        {currentUsers.map((demandeur) => (
                            <tr key={demandeur.id_demandeur}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{demandeur.nom_demandeur}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{demandeur.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{demandeur.email_demandeur}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{demandeur.telephone_demandeur}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 flex space-x-2">
                                    <button
                                        className="text-indigo-600 hover:text-indigo-900"
                                        onClick={() => openEditModal(demandeur.id_demandeur)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => openDeleteModal(demandeur.id_demandeur)}
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </button>
                    <span className="text-gray-700">Page {currentPage}</span>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        disabled={indexOfLastUser >= demandeurs.length}
                    >
                        Suivant
                    </button>
                </div>
            </div>
            {isAddUserModalOpen && (
                <AddModal
                    isOpen={isAddUserModalOpen}
                    onRequestClose={closeAddUserModal}
                    onSuccess={handleAddSuccess}
                />
            )}
            {isEditModalOpen && selectedDemandeur && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onRequestClose={closeEditModal}
                    demandeur={selectedDemandeur}
                    onSave={handleEditSave}
                />
            )}
            {isDeleteModalOpen && selectedDemandeur && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onRequestClose={closeDeleteModal}
                    demandeurId={selectedDemandeur}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default DemandeursTable;