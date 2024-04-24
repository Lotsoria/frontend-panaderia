import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const URI = "http://localhost:3000/employees/";

function GetEmployeesPage() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const res = await axios.get(`${URI}find`);
    console.log(res.data);
    setEmployees(res.data);
  };
  return (
    <div className="container">
      <h1>Tabla de empleados</h1>
      <table className="table">
        <thead className="table-primary">
          <tr>
            <th>DPI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.dpi}</td>
              <td>{employee.name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>
                <Button
                  color="primary"
                  // onClick={() => toggleEditModal()}
                >
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  color="danger"
                  // onClick={() => deleteCustomer(customer.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetEmployeesPage;
