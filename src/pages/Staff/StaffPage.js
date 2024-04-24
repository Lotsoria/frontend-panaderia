import React from "react";
import Header from "../../components/common/header/header";
import { Routes, Route } from "react-router-dom";
import NavBarEmployeesPage from "./navbarEmployees/NavBarEmployees";
import GetEmployeesPage from "./getEmployees/GetEmployees";
import "./styles.css";
function StaffPage() {
  return (
    <div className="containerStaffPage">
      <Header title="Bienvenidos a l a Panaderia" name="Alberto Ulin" />
      <div className="container2">
        <NavBarEmployeesPage className="NavBarProductPage" />
        <div className="content">
          <Routes>
            <Route path="find" element={<GetEmployeesPage />} />
            {/* Aquí puedes añadir la ruta para 'otro' si es necesario */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default StaffPage;
