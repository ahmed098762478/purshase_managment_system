import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddPrestation from "./addPrestation";
import EditPrestation from "./editPrestation";
import DeletePrestation from "./deletePrestation";

const usersData = [
  {
    name: "Livraison d'engrais NPK",
    nom_fournisseur: "AgriSupplies SARL",
    date: "2024-08-10"
  },
  {
    name: "Consultation en fertilisation",
    nom_fournisseur: "Fertilis Maroc",
    date: "2024-08-15"
  },
  {
    name: "Formation en agriculture durable",
    nom_fournisseur: "GreenGrowth Ltd",
    date: "2024-08-20"
  },
  {
    name: "Fourniture d'engrais bio",
    nom_fournisseur: "EcoFertil",
    date: "2024-08-25"
  },
  {
    name: "Recherche en agriculture",
    nom_fournisseur: "AgroPhos Industries",
    date: "2024-08-28"
  }
];

export default function PrestationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Search and pagination logic
  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold leading-tight text-gray-900">Liste des prestations</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700" onClick={openAddUserModal }>
          Ajouter une prestation
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
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nom Prestation
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nom fournisseur
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500">{user.nom_fournisseur}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500">{user.date}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500 flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={openEditModal}>
                    <FiEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={openDeleteModal}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
	  <AddPrestation isOpen={isAddUserModalOpen} onRequestClose={closeAddUserModal} />
	  <EditPrestation isOpen={isEditModalOpen} onRequestClose={closeEditModal} />
	  <DeletePrestation isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} />
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
}
