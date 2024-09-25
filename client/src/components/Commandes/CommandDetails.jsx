import React, { useEffect, useState } from 'react';
import { Card, CardBody, Button } from '@chakra-ui/react';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getOrderStatus } from '../../lib/consts/helpers';

const CommandDetails = () => {
  const { matricule } = useParams(); // Get matricule from URL params
  const [invoiceData, setInvoiceData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);


  useEffect(() => {
    const fetchCommandDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/commands/${matricule}`);
        setInvoiceData(response.data);
      } catch (error) {
        console.error("Error fetching command details:", error);
      }
    };

    fetchCommandDetails();
  }, [matricule]);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  const handleGoBack = () => {
    window.history.back();
  };


  const { dateCommande, statut, montantTotal, demandeur, magasin, lineItems } = invoiceData;

  const handleDownloadReceipt = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.get(`http://localhost:8080/commands/${matricule}/receipt`, {
        responseType: 'blob', // Important for handling binary data
      });
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `command-receipt-${matricule}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading receipt:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsDownloading(false);
    }
  };
  

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <Button colorScheme='teal' variant='outline' onClick={handleGoBack}>
          <IoArrowBack className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Matricule: {matricule}</h1>
          <p className="text-gray-600">Date de commande: {dateCommande}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${montantTotal.toFixed(2)}</p>
          <div>{getOrderStatus(statut)}</div>
        </div>
      </div>

      <Card className="mb-8">
        <CardBody className="grid grid-cols-2 gap-8 p-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Détails Magasin</h2>
            <p><strong>Nom Magasin:</strong> {magasin.nom_magasin}</p>
            <p><strong>Adresse:</strong> {magasin.adresse_magasin}</p>
            <p><strong>Téléphone:</strong> {magasin.telephone_magasin}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Informations Demandeur</h2>
            <p><strong>Nom Demandeur:</strong> {demandeur.nom_demandeur}</p>
            <p><strong>Type:</strong> {demandeur.type}</p>
            <p><strong>Téléphone:</strong> {demandeur.telephone_demandeur}</p>
            <p><strong>Email:</strong> {demandeur.email_demandeur}</p>
          </div>
        </CardBody>
      </Card>

      <table className="table-auto w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Produit</th>
            <th className="text-right py-2">Prix</th>
            <th className="text-right py-2">Quantité</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">
                <p className="font-semibold">{item.produit.nom}</p>
                <p className="text-sm text-gray-600">{item.produit.description}</p>
              </td>
              <td className="text-right py-2">{item.produit.prix.toFixed(2)}</td>
              <td className="text-right py-2">{item.quantite}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right py-2 font-semibold">Total</td>
            <td className="text-right py-2">${montantTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      {statut === "VALIDATED" && (
        <div className="mt-4 text-right">
          <Button colorScheme='blue' onClick={handleDownloadReceipt} isLoading={isDownloading}>
            Download Receipt
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommandDetails;
