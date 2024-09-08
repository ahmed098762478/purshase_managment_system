import React, { useState, useEffect } from 'react';
import { getOrderStatus } from '../../lib/consts/helpers';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Commandes = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commandesPerPage] = useState(5); // Updated from usersPerPage
  const [searchTerm, setSearchTerm] = useState('');
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/commands');
        setCommandes(response.data);
      } catch (error) {
        console.error('Error fetching commandes:', error);
      }
    };

    fetchCommandes();
  }, []);

  const filteredCommandes = commandes.filter((commande) =>
    commande.magasin.nom_magasin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    commande.demandeur.nom_demandeur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCommande = currentPage * commandesPerPage;
  const indexOfFirstCommande = indexOfLastCommande - commandesPerPage;
  const currentCommandes = filteredCommandes.slice(indexOfFirstCommande, indexOfLastCommande);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold leading-tight text-gray-900">Liste des commandes</h2>
        <Link
          to="/admin/add-commande"
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
        >
          Ajouter une commande
        </Link>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher par nom du magasin ou demandeur..."
          className="px-4 py-2 border rounded-md w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
          <thead>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900">Date Commande</td>
              <td className="px-6 py-4 font-medium text-gray-900">Nom Magasin</td>
              <td className="px-6 py-4 font-medium text-gray-900">Nom Demandeur</td>
              <td className="px-6 py-4 font-medium text-gray-900">Statut</td>
              <td className="px-6 py-4 font-medium text-gray-900">Montant Total</td>
            </tr>
          </thead>
          <tbody>
            {currentCommandes.map((commande, index) => (
              <tr
                key={index}
                className="transition ease-in-out delay-50 hover:bg-gray-200 duration-300"
                onClick={() => window.location.href = `/admin/command-details/${commande.matricule}`}
              >
                <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{new Date(commande.dateCommande).toLocaleDateString()}</td>
                <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{commande.magasin.nom_magasin}</td>
                <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{commande.demandeur.nom_demandeur}</td>
                <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{getOrderStatus(commande.statut)}</td>
                <td className="px-6 py-5 border-b border-gray-200 text-sm text-gray-900">{commande.montantTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstCommande + 1} to {indexOfLastCommande} of {filteredCommandes.length} results
        </span>
        <div className="flex space-x-1">
          {[...Array(Math.ceil(filteredCommandes.length / commandesPerPage)).keys()].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === number + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
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
