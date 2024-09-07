import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const FournisseursTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [fournisseurs, setFournisseurs] = useState([])
  const [fournisseurToDelete, setFournisseurToDelete] = useState(null);
  const [fournisseurToEdit, setFournisseurToEdit] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/fournisseurs")
      .then(response => setFournisseurs(response.data))
      .catch(error => console.error("There was an error fetching the products!", error));
  }, []);

  const filteredUsers = fournisseurs.filter((fournisseur) =>
    fournisseur.nomFournisseur.toLowerCase().includes(searchTerm.toLowerCase()));
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openAddUserModal = () => setAddUserModalOpen(true);
  const closeAddUserModal = () => setAddUserModalOpen(false);
  
  const openEditModal = (fournisseur) => {
    setFournisseurToEdit(fournisseur); // Set the product to be edited
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (fournisseur) => {
    setFournisseurToDelete(fournisseur);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = async () => {
    if (fournisseurToDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/fournisseurs/${fournisseurToDelete.idFournisseur}`);
        setFournisseurs(fournisseurs.filter(fournisseur => fournisseur.idFournisseur !== fournisseurToDelete.idFournisseur));
      } catch (error) {
        console.error('There was an error deleting the product!', error);
      } finally {
        closeDeleteModal();
      }
    }
  };
  const handleAddFournisseur = (newFournisseur) => {
    setFournisseurs([...fournisseurs, newFournisseur]);
  };

  const handleEditFournisseur = (updatedFournisseur) => {
    setFournisseurs(fournisseurs.map(fournisseur => fournisseur.idFournisseur === updatedFournisseur.idFournisseur ? updatedFournisseur : fournisseur));
  };

return (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold leading-tight text-gray-900">Liste des fournisseurs</h2>
      <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700" onClick={openAddUserModal}>
        Ajouter un fournisseur
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
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Adresse</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">telephone</th>
          {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">Pratiques</th> */}
          <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {currentUsers.map((fournisseur) => (
          <tr key={fournisseur.idFournisseur} className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              {/* <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src={item.image}
                  alt=""
                />
                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
              </div> */}
              <div className="text-sm">
                <div className="font-medium text-gray-700">{fournisseur.nomFournisseur}</div>
                <div className="text-gray-400">{fournisseur.email}</div>
              </div>
            </th>
            <td className="px-6 py-4">
              {fournisseur.adresse}
            </td>
            <td className="px-6 py-4">
              {fournisseur.telephone}
            </td>
            {/* <td className="px-6 py-4">
              <div className="flex gap-2">
                {item.pratiques.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold bg-violet-50 text-violet-600">
                    {tag}
                  </span>
                ))}
              </div>
            </td> */}
            <td className="px-6 py-4">
              <div className="flex justify-end gap-4">
                <button aria-label="Delete" onClick={() => openDeleteModal(fournisseur)}>
                  <FaTrashAlt className="h-6 w-6 text-gray-600 hover:text-red-600" />
                </button>
                <button aria-label="Edit" onClick={() => openEditModal(fournisseur)}>
                  <FaEdit className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <AddModal isOpen={isAddUserModalOpen} onRequestClose={closeAddUserModal} onAddFournisseur={handleAddFournisseur} />
  <EditModal isOpen={isEditModalOpen} onRequestClose={closeEditModal} onEditFournisseur={handleEditFournisseur} fournisseur={fournisseurToEdit} />
  <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} onDelete={handleDelete} fournisseur={fournisseurToDelete} />
  {/* Pagination */}
  <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstUser + 1} to {indexOfLastUser} of {filteredUsers.length} results
        </span>
        <div className="flex space-x-1">
          {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === number + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
  </div>
);
};


export default FournisseursTable;
