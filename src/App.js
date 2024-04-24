import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.js';
import ProductPage from './pages/Product/ProductPage.js';
import CustomerPage from './pages/Customer/CustomerPage.js';
import StaffPage from './pages/Staff/StaffPage.js';
import SalePage from './pages/Sale/SalesPage.js';

//Añade '/*' para manejar subrutas

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/*" element={<ProductPage />} /> 
        <Route path="/customer/*" element={<CustomerPage />} />
        <Route path="/staff/*" element={<StaffPage />} />
        <Route path="/sale/*" element={<SalePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

