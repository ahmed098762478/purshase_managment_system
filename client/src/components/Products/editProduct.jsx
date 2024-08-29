import React from 'react';
import Modal from 'react-modal';

const EditProduct = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
  >
    <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue="Lindsay Walton"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue="Front-end Developer"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue="lindsay.walton@example.com"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="state"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Save
        </button>
        <button
          type="button"
          className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          onClick={onRequestClose}
        >
          Close
        </button>
      </form>
    </div>
  </Modal>
);

export default EditProduct;
