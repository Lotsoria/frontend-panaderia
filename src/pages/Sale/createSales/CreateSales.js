import axios from "axios";
import { React, useState, useEffect } from "react";
import "./css/styles.css";

const URI = "http://localhost:3000/";

function CreateSalesPage() {
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers_id, setCustomers_id] = useState("");
  const [employees_id, setEmployeed_id] = useState("");
  const [sales, setSales] = useState({
    customers_id: "",
    employees_id: "",
    products: [],
  });

  const [customerSelect, setCustomerSelect] = useState("");
  const [products, setProducts] = useState([{ products_id: "", lot: "" }]);

  //TODO: Aquí se manda a traer la data
  useEffect(() => {
    getCustomer();
    getEmployees();
  }, []);

  const createSale = async (e) => {
    console.log("si entra al darle ");
    e.preventDefault();
    try {
      await axios.post(`${URI}sales/create`, {
        customers_id: customers_id,
        employeed_id: employees_id,
        products: products,
      });
    } catch (error) {
      console.error("Error creating sale:", error);
    }
  };

  const getCustomer = async () => {
    const res = await axios.get(`${URI}custumers/find`);
    setCustomers(res.data);
  };
  const getEmployees = async () => {
    const res = await axios.get(`${URI}employees/find`);
    setEmployees(res.data);
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][key] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setCustomerSelect([...products, { products_id: "", lot: "" }]);
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
            className="form-control"
            onChange={(e) => setCustomers_id(e.target.value)}
          >
            {customers.map((dpto) => (
              <option key={dpto.id} value={dpto.id}>
                {dpto.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Empleado</label>
          <select
            className="form-control"
            onChange={(e) => setEmployeed_id(e.target.value)}
          >
            {employees.map((dpto) => (
              <option key={dpto.id} value={dpto.id}>
                {dpto.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Productos</label>
          {products.map((product, index) => (
            <div key={index}>
              <input
                value={product.products_id}
                onChange={(e) =>
                  handleProductChange(index, "products_id", e.target.value)
                }
                type="text"
                placeholder="ID del producto"
                className="form-control"
              />
              <input
                value={product.lot}
                onChange={(e) =>
                  handleProductChange(index, "lot", e.target.value)
                }
                type="text"
                placeholder="Cantidad"
                className="form-control"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => removeProduct(index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={addProduct}
          >
            Agregar Producto
          </button>
        </div>
        <br></br>
        <br></br>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    </div>
  );
}

export default CreateSalesPage;
