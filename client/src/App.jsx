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
