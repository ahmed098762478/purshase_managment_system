import React from 'react';
import { Card, CardBody, Badge, Button } from '@chakra-ui/react'
import { IoArrowBack } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { getOrderStatus } from '../../lib/consts/helpers';


const CommandDetails = () => {
  const { matricule } = useParams();
  const invoiceData = {
    amount: 10560.00,
    dateCommande: 'January 23, 2023',
    statut: "VALIDATED",
    montantTotal: 10560,
    magazin: {
      nom: 'Acme, Inc.',
      addresse: '7363 Cynthia Pass',
      telephone: '+1 (555) 123-4567',
    },
    fournisseur: {
      nom: 'Global Supplies Ltd.',
      adresse: '7363 Cynthia Pass',
      telephone: '+1 (555) 123-4567',
      email: 'john.doe@globalsupplies.com'
    },
    demandeur: {
      nom: 'Downtown Branch',
      type: 'maerftsh',
      telephone: '+1 (555) 987-6543',
      email: 'jane.smith@tuple.com'
    },
    produits: [
      { name: 'Logo redesign', description: 'New logo and digital asset playbook.', prix: 2000, quantite: 2 },
      { name: 'Website redesign', description: 'Design and program new company website.', prix: 5200, quantite: 3 },
      { name: 'Business cards', description: 'Design and production of 3.5" x 2.0" business cards.', prix: 1200, quantite: 4 },
      { name: 'T-shirt design', description: 'Three t-shirt design concepts.', prix: 400, quantite: 7 }
    ],
    subtotal: 8800,
    tax: 1760,
    total: 10560
  };
  
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <Button colorScheme='teal' variant='outline' onClick={handleGoBack}>
          <IoArrowBack className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">matricule: {matricule} </h1>
          <p className="text-gray-600">Faite le {invoiceData.dateCommande}</p>
          {/* <p className="text-gray-600">Due on {invoiceData.dueDate}</p> */}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${invoiceData.amount.toFixed(2)}</p>
          <div>
            {getOrderStatus(invoiceData.statut)}
          </div>
          {/* <Button colorScheme='blue' variant='outline' onClick={handleGoBack}>
            <FaDownload className="mr-2 h-4 w-4" /> Download Devis
          </Button> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">From</h2>
          <p>{invoiceData.magazin.nom}</p>
          <p>{invoiceData.magazin.addresse}</p>
          <p>{invoiceData.magazin.telephone}</p>
        </div>
        {/* <div>
          <h2 className="text-lg font-semibold mb-2">To</h2>
          <p>{invoiceData.to.name}</p>
          <p>{invoiceData.to.address}</p>
          <p>{invoiceData.to.city}</p>
        </div> */}
      </div>

      <Card className="mb-8">
        <CardBody className="grid grid-cols-2 gap-8 p-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Details Fournisseur</h2>
            <p><strong>Nom fournisseur:</strong> {invoiceData.fournisseur.nom}</p>
            <p><strong>Adresse:</strong> {invoiceData.fournisseur.adresse}</p>
            <p><strong>Telephone:</strong> {invoiceData.fournisseur.telephone}</p>
            <p><strong>Email:</strong> {invoiceData.fournisseur.email}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Informations demandeur d'achat</h2>
            <p><strong>Nom demandeur d'achat:</strong> {invoiceData.demandeur.nom}</p>
            <p><strong>type:</strong> {invoiceData.demandeur.type}</p>
            <p><strong>Telephone:</strong> {invoiceData.demandeur.telephone}</p>
            <p><strong>Email:</strong> {invoiceData.demandeur.email}</p>
          </div>
        </CardBody>
      </Card>

      <table className="table-auto w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Produit</th>
            {/* <th className="text-left py-2">Description</th> */}
            <th className="text-right py-2">Prix</th>
            <th className="text-right py-2">Quantite</th>
            {/* <th className="text-right py-2">Price</th> */}
          </tr>
        </thead>
        <tbody>
          {invoiceData.produits.map((produit, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">
                <p className="font-semibold">{produit.name}</p>
                <p className="text-sm text-gray-600">{produit.description}</p>
              </td>
              {/* <td className="py-2">
                <p className="font-semibold">{project.name}</p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </td> */}
              <td className="text-right py-2">{produit.prix.toFixed(2)}</td>
              <td className="text-right py-2">${produit.quantite}</td>
              {/* <td className="text-right py-2">${project.price.toFixed(2)}</td> */}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right py-2 font-semibold">Subtotal</td>
            <td className="text-right py-2">${invoiceData.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan="3" className="text-right py-2 font-semibold">Tax</td>
            <td className="text-right py-2">${invoiceData.tax.toFixed(2)}</td>
          </tr>
          <tr className="font-bold">
            <td colSpan="3" className="text-right py-2">Total</td>
            <td className="text-right py-2">${invoiceData.total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CommandDetails;