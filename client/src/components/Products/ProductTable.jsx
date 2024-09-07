import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddProduct from "./addProduct";
import EditProduct from "./editProduct";
import DeleteProduct from "./deleteProduct";

export default function UserList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    fetchProduits();
  }, []);
  const fetchProduits = () => {
    axios.get("http://localhost:8080/produits")
      .then(response => setProducts(response.data))
      .catch(error => console.error("There was an error fetching the products!", error));
  }

  const filteredProducts = products.filter(product =>
    product.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const openAddProductModal = () => setAddProductModalOpen(true);
  const closeAddProductModal = () => setAddProductModalOpen(false);

  const openEditModal = (product) => {
    setProductToEdit(product); // Set the product to be edited
    setEditModalOpen(true);
  };
  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await axios.delete(`http://localhost:8080/produits/${productToDelete.idProduit}`);
        setProducts(products.filter(product => product.idProduit !== productToDelete.idProduit));
      } catch (error) {
        console.error('There was an error deleting the product!', error);
      } finally {
        closeDeleteModal();
      }
    }
  };
  const handleAddProduct = (newProduct) => {
    fetchProduits();
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (updatedProduct) => {
    axios.put(`http://localhost:8080/produits/${updatedProduct.idProduit}`, updatedProduct)
    .then(() => {
      fetchProduits(); // Refetch data to include the updated prestation
      setEditModalOpen(false); // Close the modal
    })
    .catch(error => {
      console.error("Error updating prestation", error);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold leading-tight text-gray-900">Produits</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700" onClick={openAddProductModal}>
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
                Fournisseur
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
            {currentProducts.map((product) => (
              <tr key={product.idProduit} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b border-gray-200">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                </td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-900">{product.nom}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{product.fournisseur.nomFournisseur}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{product.prix}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{product.description}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{product.categorie}</td>
                <td className="px-6 py-3 border-b border-gray-200 text-sm text-gray-500">{product.marque}</td>
                <td className="px-6 py-6 border-b border-gray-200 text-sm text-gray-500 flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => openEditModal(product)}>
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900" onClick={() => openDeleteModal(product)}>
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProduct isOpen={isAddProductModalOpen} onRequestClose={closeAddProductModal} onAddProduct={handleAddProduct}/>
      <EditProduct isOpen={isEditModalOpen} onRequestClose={closeEditModal} onEditProduct={handleEditProduct} product={productToEdit} />
      <DeleteProduct isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} onDelete={handleDelete} product={productToDelete} />
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstProduct + 1} to {indexOfLastProduct} of {filteredProducts.length} results
        </span>
        <div className="flex space-x-1">
          {[...Array(Math.ceil(filteredProducts.length / productsPerPage)).keys()].map((number) => (
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
