import React from "react";
import Header from "../../components/common/header/header";
import NavBarCustomerPage from "./navbarCustomers/NavBarCustomers";
import { Routes, Route } from "react-router-dom";
import GetCustomersPage from "./getCustomers/GetCustomers";
import CreateCustomersPage from "./createCustomers/CreateCustomers";
import "./styles.css";

function CustomerPage() {
  return (
    <div className="containerCustomerPage">
      <Header title="Bienvenidos a la Panadería" name="Alberto Ulin" />
      <div className="container2">
        <NavBarCustomerPage className="NavBarCustomerPage"/>
        <div className="content">
          <Routes>
            <Route path="find" element={<GetCustomersPage />} />
            <Route path="create" element={<CreateCustomersPage />} />
            {/* Aquí puedes añadir la ruta para 'otro' si es necesario */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;