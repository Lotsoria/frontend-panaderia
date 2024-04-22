import React from "react";
import Header from "../../components/common/header/header";
import NavBarProductPage from "./navbarProducts/NavBarProducts";
import { Routes, Route } from "react-router-dom";
import CreateProductsPage from "./createProducts/CreateProdcuts";
import GetProductsPage from "./getProducts/GetProcuts";
import "./styles.css";
function ProductPage() {
  return (
    <div className="containerProductPage">
      <Header title="Bienvenidos a la Panadería" name="Alberto Ulin" />
      <div className="container2">
        <NavBarProductPage className="NavBarProductPage"/>
        <div className="content">
          <Routes>
            <Route path="create" element={<CreateProductsPage />} />
            <Route path="find" element={<GetProductsPage />} />
            {/* Aquí puedes añadir la ruta para 'otro' si es necesario */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
