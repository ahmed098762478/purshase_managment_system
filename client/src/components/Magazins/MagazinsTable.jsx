import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/magazins';

const MagazinsTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedMagasin, setSelectedMagasin] = useState(null);

  useEffect(() => {
    const fetchMagazins = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching magazins:', error);
      }
    };

    fetchMagazins();
  }, []);

  const handleAddMagasin = async (newMagasin) => {
    try {
      await axios.post(API_URL, newMagasin);
      setSuccessMessage('Magasin est ajouté avec succes!');
      setAddUserModalOpen(false);
      const response = await axios.get(API_URL);
      setData(response.data);
      setTimeout(() => setSuccessMessage(''), 7000);
    } catch (error) {
      console.error('Error adding magasin:', error);
    }
  };

  const handleDeleteMagasin = async (id) => {
    try {
      await axios.delete(${API_URL}/${id});
      setSuccessMessage('Magasin est supprimé avec succes!');
      setDeleteModalOpen(false);
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error deleting magasin:', error);
    }
  };

  const handleEditMagasin = async (updatedMagasin) => {
    try {
      await axios.put(${API_URL}/${updatedMagasin.id_magasin}, updatedMagasin);
      setSuccessMessage('Magasin est modifié avec succes !');
      setEditModalOpen(false);
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error updating magasin:', error);
    }
  };

  const filteredUsers = data.filter((user) =>
    user.nom_magasin.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openAddUserModal = () => setAddUserModalOpen(true);
  const closeAddUserModal = () => setAddUserModalOpen(false);

  const openEditModal = (magasin) => {
    setSelectedMagasin(magasin);
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (magasin) => {
    setSelectedMagasin(magasin);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {successMessage && (
        <div className="bg-green-200 text-green-800 p-4 rounded-lg mb-4">
          {successMessage}
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold leading-tight text-gray-900">Liste des magazins</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700" onClick={openAddUserModal}>
          Ajouter un magasin
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 border rounded-md w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nom</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Adresse</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Téléphone</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {currentUsers.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="font-medium text-gray-700">{item.nom_magasin}</div>
                </th>
                <td className="px-6 py-4">{item.adresse_magasin}</td>
                <td className="px-6 py-4">{item.telephone_magasin}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button aria-label="Delete" onClick={() => openDeleteModal(item)}>
                      <FaTrashAlt className="h-6 w-6 text-gray-600 hover:text-red-600" />
                    </button>
                    <button aria-label="Edit" onClick={() => openEditModal(item)}>
                      <FaEdit className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddModal isOpen={isAddUserModalOpen} onRequestClose={closeAddUserModal} onAddMagasin={handleAddMagasin} />
      <EditModal isOpen={isEditModalOpen} onRequestClose={closeEditModal} onEditMagasin={handleEditMagasin} magasin={selectedMagasin} />
      <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} onDelete={() => handleDeleteMagasin(selectedMagasin.id_magasin)} />
      <div className="mt-4 flex justify-center">
        <nav aria-label="Page navigation">
          <ul className="inline-flex items-center space-x-2">
            {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number + 1)}
                  className={px-3 py-2 rounded-md text-sm font-medium ${currentPage === number + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MagazinsTable;