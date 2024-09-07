import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddPrestation from "./addPrestation";
import EditPrestation from "./editPrestation";
import DeletePrestation from "./deletePrestation";
import axios from "axios";

export default function PrestationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [prestations, setPrestations] = useState([]);
  const [selectedPrestation, setSelectedPrestation] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchPrestations();
  }, []);

  const fetchPrestations = () => {
    axios.get('http://localhost:8080/prestations')
      .then(response => {
        setPrestations(response.data);
      })
      .catch(error => {
        console.error("Error fetching prestations", error);
      });
  };

  const handleAddPrestation = () => {
    fetchPrestations(); // Refetch data to include the new prestation
    setAddModalOpen(false); // Close the modal
  };

  const handleEditPrestation = (updatedPrestation) => {
    axios.put(`http://localhost:8080/prestations/${updatedPrestation.idPrestation}`, updatedPrestation)
      .then(() => {
        fetchPrestations(); // Refetch data to include the updated prestation
        setEditModalOpen(false); // Close the modal
      })
      .catch(error => {
        console.error("Error updating prestation", error);
      });
  };

  const openDeleteModal = (prestation) => {
    setSelectedPrestation(prestation);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    if (!selectedPrestation) return;
    
    axios.delete(`http://localhost:8080/prestations/${selectedPrestation.idPrestation}`)
      .then(() => {
        fetchPrestations(); // Refetch data to reflect the deletion
        closeDeleteModal();
      })
      .catch(error => {
        console.error("Error deleting prestation", error);
      });
  };

  const openEditModal = (prestation) => {
    setSelectedPrestation(prestation); // Set the selected prestation to be edited
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const filteredPrestations = prestations.filter((prestation) =>
    prestation.nomPrestation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPrestation = currentPage * usersPerPage;
  const indexOfFirstPrestation = indexOfLastPrestation - usersPerPage;
  const currentPrestations = filteredPrestations.slice(indexOfFirstPrestation, indexOfLastPrestation);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold leading-tight text-gray-900">Liste des prestations</h2>
        <button 
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
          onClick={() => setAddModalOpen(true)}
        >
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
            {currentPrestations.map((prestation, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-900">{prestation.nomPrestation}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500">
                  {prestation.fournisseur ? prestation.fournisseur.nomFournisseur : 'N/A'}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500">{new Date(prestation.datePrestation).toLocaleDateString()}</td>
                <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500 flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => openEditModal(prestation)}>
                    <FiEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => openDeleteModal(prestation)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddPrestation
          isOpen={isAddModalOpen}
          onRequestClose={() => setAddModalOpen(false)}
          onSave={handleAddPrestation}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedPrestation && (
        <EditPrestation
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          data={selectedPrestation}
          onSave={handleEditPrestation}
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedPrestation && (
        <DeletePrestation
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstPrestation + 1} to {indexOfLastPrestation} of {filteredPrestations.length} results
        </span>
        <div className="flex space-x-1">
          {[...Array(Math.ceil(filteredPrestations.length / usersPerPage)).keys()].map((number) => (
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
