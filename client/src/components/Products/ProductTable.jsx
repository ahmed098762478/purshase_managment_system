import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";
import DeleteProduct from "./deleteProduct";

const usersData = [
  {
    name: "Engrais Superphosphate Triple",
    prixUnitaire: 450.00,
    description: "Engrais phosphaté concentré idéal pour améliorer la productivité des sols en cultures céréalières.",
    categorie: "Engrais",
    marque: "OCP"
  },
  {
    name: "DAP (Diammonium Phosphate)",
    prixUnitaire: 520.00,
    description: "Engrais à base de phosphore et d'azote, utilisé pour favoriser la croissance des plantes.",
    categorie: "Engrais",
    marque: "OCP"
  },
  {
    name: "NPK 15-15-15",
    prixUnitaire: 600.00,
    description: "Engrais équilibré avec une combinaison de 15% d'azote, 15% de phosphore et 15% de potassium.",
    categorie: "Engrais",
    marque: "OCP"
  },
  {
    name: "MCP (Monocalcium Phosphate)",
    prixUnitaire: 480.00,
    description: "Additif pour l'alimentation animale, riche en calcium et phosphore.",
    categorie: "Additif Alimentaire",
    marque: "OCP"
  },
  {
    name: "Sulfate d'Ammonium",
    prixUnitaire: 300.00,
    description: "Engrais azoté avec du soufre, utilisé pour les cultures nécessitant un apport élevé en azote.",
    categorie: "Engrais",
    marque: "OCP"
  }
  // Add more users here if needed
];

export default function UserList() {
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
        <h2 className="text-2xl font-semibold leading-tight text-gray-900">Produits</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700" onClick={openAddUserModal }>
          Ajouter Produit
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
      <div className="overflow">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Prix unitaire
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Categorie
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Marque
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                </td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{user.prixUnitaire}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{user.description}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{user.categorie}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{user.marque}</td>
                <td className="px-6 py-6 border-b border-gray-200 text-sm text-gray-500 flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={openEditModal}>
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={openDeleteModal}>
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
	  <AddProduct isOpen={isAddUserModalOpen} onRequestClose={closeAddUserModal} />
	  <EditProduct isOpen={isEditModalOpen} onRequestClose={closeEditModal} />
	  <DeleteProduct isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} />
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