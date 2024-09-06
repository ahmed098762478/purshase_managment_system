import React, { useState } from 'react';
import { getOrderStatus } from '../../lib/consts/helpers';
import { Link } from 'react-router-dom';

const Commandes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([
    { matricule: '001', nom: 'Fournisseur 1', date: '2024-09-01', statut: 'VALIDATED', montant: 1000 },
    { matricule: '002', nom: 'Fournisseur 2', date: '2024-09-02', statut: 'PENDING', montant: 1500 },
    // Add more supplier data here
  ]);


  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredSuppliers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold leading-tight text-gray-900">Liste des commandes</h2>
        <Link to="/admin/add-commande" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
          Ajouter une commande
        </Link>
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
        <table className='min-w-full bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200'>
            <thead>
                <tr>
                    <td scope="col" className="px-6 py-4 font-medium text-gray-900">Matricule</td>
                    <td scope="col" className="px-6 py-4 font-medium text-gray-900">Nom fournisseur</td>
                    <td scope="col" className="px-6 py-4 font-medium text-gray-900">Date</td>
                    <td scope="col" className="px-6 py-4 font-medium text-gray-900">Statut</td>
                    <td scope="col" className="px-6 py-4 font-medium text-gray-900">Montant Total</td>
                </tr>
            </thead>
            <tbody>
                {currentUsers.map((supplier, index) => (
                <tr key={index} className="transition ease-in-out delay-50 hover:bg-gray-200 duration-300" onClick={() => window.location.href = `/admin/command-details/${supplier.matricule}`}>
                    <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{supplier.matricule}</td>
                    <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{supplier.nom}</td>
                    <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{new Date(supplier.date).toLocaleDateString()}</td>
                    <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{getOrderStatus(supplier.statut)}</td>
                    <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{supplier.montant}</td>
                </tr>
                ))
                }
            </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstUser + 1} to {indexOfLastUser} of {filteredSuppliers.length} results
        </span>
        <div className="flex space-x-1">
          {[...Array(Math.ceil(filteredSuppliers.length / usersPerPage)).keys()].map((number) => (
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

export default Commandes;
