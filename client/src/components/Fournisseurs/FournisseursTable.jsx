import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import AddModal from './AddModal';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const data = [
  {
    name: 'Steven Jobs',
    email: 'jobs@sailboatui.com',
    state: 'Active',
    role: 'Product Designer',
    team: ['Design', 'Product', 'Develop'],
  },
  {
    name: 'Elon Musk',
    email: 'test@gmail.com',
    state: 'Active',
    role: 'Product Manager',
    team: ['Product', 'Develop'],
  },
  {
    name: 'Mark Zuckerberg',
    email: 'test@gmail.com',
    state: 'Inactive',
    role: 'Product Designer',
    team: ['Design', 'Product'],
  },
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
      <h2 className="text-2xl font-semibold leading-tight text-gray-900">Users</h2>
      <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700" onClick={openAddUserModal}>
        Add user
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
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">State</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Role</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Team</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {currentUsers.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div className="relative h-10 w-10">
                <img
                  className="h-full w-full rounded-full object-cover object-center"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-700">{item.name}</div>
                <div className="text-gray-400">{item.email}</div>
              </div>
            </th>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <span className={`h-1.5 w-1.5 rounded-full ${item.state === 'Active' ? 'bg-green-600 ' : 'bg-red-600'}`}></span>
              {item.state}
              </span>
            </td>
            <td className="px-6 py-4">{item.role}</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                {item.team.map((tag, idx) => (
                  <span key={idx} className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${tag === 'Design' ? 'bg-blue-50 text-blue-600' : tag === 'Product' ? 'bg-indigo-50 text-indigo-600' : 'bg-violet-50 text-violet-600'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </td>
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
