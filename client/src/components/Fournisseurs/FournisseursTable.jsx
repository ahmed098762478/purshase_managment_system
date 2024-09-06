import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const data = [
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Image d'un fournisseur
    name: "AgriSupplies SARL",
    adresse: "12 Rue de l'Agriculture, Casablanca, Maroc",
    telephone: "+212 522 123456",
    email: "contact@agrisupplies.ma",
    pratiques: ["Fourniture d'engrais", "Consultation agricole", "Distribution de semences"]
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Fertilis Maroc",
    adresse: "34 Avenue des Phosphates, Safi, Maroc",
    telephone: "+212 524 654321",
    email: "info@fertilismaroc.ma",
    pratiques: ["Production d'engrais", "R&D en fertilisation", "Exportation d'engrais"]
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1664298528358-790433ba0815?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "GreenGrowth Ltd",
    adresse: "98 Boulevard de l'Environnement, Rabat, Maroc",
    telephone: "+212 537 765432",
    email: "support@greengrowth.ma",
    pratiques: ["Agriculture durable", "Consultation en éco-agriculture", "Fourniture de solutions organiques"]
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1683121771856-3c3964975777?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "EcoFertil",
    adresse: "45 Route de Marrakech, El Jadida, Maroc",
    telephone: "+212 523 987654",
    email: "sales@ecofertil.ma",
    pratiques: ["Production d'engrais bio", "Formation en agriculture écologique", "Consultation en fertilisation"]
  }
];

const FournisseursTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const filteredUsers = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
        {currentUsers.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
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
                <div className="font-medium text-gray-700">{item.name}</div>
                <div className="text-gray-400">{item.email}</div>
              </div>
            </th>
            <td className="px-6 py-4">
              {item.adresse}
            </td>
            <td className="px-6 py-4">
              {item.telephone}
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
                <button aria-label="Delete" onClick={openDeleteModal}>
                  <FaTrashAlt className="h-6 w-6 text-gray-600 hover:text-red-600" />
                </button>
                <button aria-label="Edit" onClick={openEditModal}>
                  <FaEdit className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <AddModal isOpen={isAddUserModalOpen} onRequestClose={closeAddUserModal} />
  <EditModal isOpen={isEditModalOpen} onRequestClose={closeEditModal} />
  <DeleteModal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} />
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
