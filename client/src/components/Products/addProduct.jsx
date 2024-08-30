import React from 'react';
import Modal from 'react-modal';

const AddProduct = ({ isOpen, onRequestClose }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
  >
    <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add Produit</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue=""
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Prix Unitaire</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue=""
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue=""
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Categorie</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue=""
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Marque</label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full"
            defaultValue=""
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

AddProduct.defaultProps = {
    isOpen: false,
    onRequestClose: () => {}
}

export default AddProduct;