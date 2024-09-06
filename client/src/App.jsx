import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Admin from './components/Admin'
import PrivateRoutes from './utils/PrivateRoutes';
import Layout from './components/admin/Layout'
import Products from './components/Products'
import Fournisseurs from './components/Fournisseurs'
import Prestation from './components/Prestation'
import MagazinTable from './components/Magazins/MagazinsTable'
import DemandeursTable from './components/Demandeurs/DemandeursTable'
import Commandes from './components/Commandes/Commandes'
import AddCommand from './components/Commandes/AddCommand'
import CommandDetails from './components/Commandes/CommandDetails'
import './index.css'


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Admin />} />
              <Route path="products" element={<Products />} />
              <Route path="fournisseurs" element={<Fournisseurs />} />
              <Route path="prestations" element={<Prestation />} />
              <Route path="magazins" element={<MagazinTable />} />
              <Route path="demandeurs" element={<DemandeursTable />} />
              <Route path="commandes" element={<Commandes />} />
              <Route path="add-commande" element={<AddCommand />} />
              <Route path="command-details/:matricule" element={<CommandDetails />} />
            </Route>
          </Route>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
        </Routes>
      </Router>
    </div>
  )
}

export default App
