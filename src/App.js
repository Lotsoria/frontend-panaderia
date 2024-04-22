import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.js';
import ProductPage from './pages/Product/ProductPage.js';
import CustomerPage from './pages/Customer/CustomerPage.js';
import StaffPage from './pages/Staff/StaffPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/*" element={<ProductPage />} />  // Añade '/*' para manejar subrutas
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

