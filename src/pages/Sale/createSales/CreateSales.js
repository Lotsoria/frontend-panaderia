import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./css/styles.css";

const URI = "http://localhost:3000/sale/"

function CreateSalesPage() {
    const [customers_id] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [employeed_id, setEmployeed] = useState("");
    const [products, setProducts] = useState([{ products_id: '', lot: '' }]);
    const navigate = useNavigate()    

    const createSale = async (e) => {
        e.preventDefault();
        try{
                await axios.post(`${URI}create`, {customers_id: customers_id, employeed_id: employeed_id, products: products});
                  navigate('/sale/find')
            }catch (error) {
                console.error("Error creating sale:", error);
            }
    };

    const handleProductChange = (index, key, value) => {
      const updatedProducts = [...products];
      updatedProducts[index][key] = value;
      setProducts(updatedProducts);
  };

    const addProduct = () => {
      setProducts([...products, { products_id: '', lot: '' }]);
    };

    const removeProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    return (
        <div className="containerCreateSale">
          <h3>Crear nueva Venta</h3>
          <form onSubmit={createSale}>
          <div className="mb-3">
              <label className="form-label">Cliente</label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="form-control"
              >
                <option value="">Seleccionar cliente...</option>
                {customers_id.map((customer) => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Empleado</label>
              <input
                value={employeed_id}
                onChange={(e) => setEmployeed(e.target.value)}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Productos</label>
              {products.map((product, index) => (
                <div key={index}>
                  <input
                    value={product.products_id}
                    onChange={(e) => handleProductChange(index, 'products_id', e.target.value)}
                    type="text"
                    placeholder="ID del producto"
                    className="form-control"
                  />
                  <input
                    value={product.lot}
                    onChange={(e) => handleProductChange(index, 'lot', e.target.value)}
                    type="text"
                    placeholder="Cantidad"
                    className="form-control"
                  /><button type="button" className="btn btn-primary" onClick={() => removeProduct(index)}>Eliminar</button>
                </div>
              ))}
              <button type="button" className="btn btn-primary" onClick={addProduct}>Agregar Producto</button>
            </div><br></br><br></br>
            <button type="submit" className="btn btn-primary">
              Crear
            </button>
          </form>
        </div>
      );
}

export default CreateSalesPage