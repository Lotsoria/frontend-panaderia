import axios from "axios";
import { React, useState, useEffect } from "react";
import "./css/styles.css";


const URI = "http://localhost:3000/sales";

function GetSalesPage(){
    const [sales, setSales] = useState([]);


    useEffect(() => {
      getSales();
    }, []);
  
    const getSales = async () => {
      const res = await axios.get(URI);
      setSales(res.data);
    };
  
    return (
      <div className="container">
        <h1>Tabla de Ventas</h1>
        <table className="table">
          <thead className="table-primary">
            <tr>
              <th>Cliente</th>
              <th>Empleado</th>
              <th>Produtos</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.customers.name}</td>
                <td>{sale.employees.name}</td>
                <td>
                <ul>
                  {sale.sales_invoice_details.map((detail) => (
                    <li key={detail.id}>{detail.products.name}</li>
                  ))}
                </ul>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
export default GetSalesPage