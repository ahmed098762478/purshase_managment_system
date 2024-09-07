import React from 'react';
import Modal from 'react-modal';

const DeleteProduct = ({ isOpen, onRequestClose, onDelete, product }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
  >
    <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">Supprimer Produit</h2>
      <p className="mb-4">Are you sure you want to delete {product ? product.nom : 'this product'}? This action cannot be undone.</p>
      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={() => {
          onDelete();
          onRequestClose();
        }}
      >
        Delete
      </button>
      <button
        type="button"
        className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        onClick={onRequestClose}
      >
        Cancel
      </button>
    </div>
  </Modal>
);

export default DeleteProduct;
