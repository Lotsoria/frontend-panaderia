import React from "react";
import Header from "../../components/common/header/header";
import { Routes, Route } from "react-router-dom";
import GetSalesPage from "./getSales/GetSales";
import CreateSalesPage from "./createSales/CreateSales";
import NavBarSalePage from "./navbarSales/NavBarSales";
import "./styles.css";

function SalePage() {
  return (
    <div className="containerSalePage">
      <Header title="Bienvenidos a la Panadería" name="Alberto Ulin" />
      <div className="container2">
        <NavBarSalePage className="NavBarSalePage"/>
        <div className="content">
          <Routes>
            <Route path="find" element={<GetSalesPage />} />
            <Route path="create" element={<CreateSalesPage />} />
            {/* Aquí puedes añadir la ruta para 'otro' si es necesario */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default SalePage;
