import axios from "axios";
import { React, useState, useEffect } from "react";
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

  const editEmployee = async (id) => {
    const thisEmployee= await axios.get(`${URI}find/${id}`);
    try {
      const response = await axios.put(`${URI}update/${id}`, {
        dpi: currentEmployee.dpi ? currentEmployee.dpi : thisEmployee.data.dpi,
        name: currentEmployee.name ? currentEmployee.name : thisEmployee.data.name,
        last_name: currentEmployee.last_name ? currentEmployee.last_name : thisEmployee.data.last_name,
        phone: currentEmployee.phone ? currentEmployee.phone : thisEmployee.data.phone,
        email: currentEmployee.email ? currentEmployee.email : thisEmployee.data.email,
      });
      
      if (response.status === 200) {
        toggleEditModal();
        getEmployees();
        Swal.fire(
          "¡Actualizado!",
          "El empleado ha sido actualizado correctamente.",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Error!", "No se pudo actualizar los datos del empleado.", "error");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.put(`${URI}delete/${id}`);
      if (response.status === 200) {
        Swal.fire(
          "Eliminado!",
          "El empleado ha sido eliminado correctamente.",
          "success"
        );
      }
      getEmployees();
    } catch (error) {
      Swal.fire("Error!", "No se pudo eliminar al empleado.", "error");
    }
  };

  const [editModal, setEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: "",
    dpi: "",
    name: "",
    last_name: "",
    phone: "",
    email: ""
  });

  const toggleEditModal = (employee) => {
    setCurrentEmployee(employee);
    setEditModal(!editModal);
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
                  onClick={() => toggleEditModal(employee)}
                >
                  Editar
                </Button>
              </td>
              <td>
                <Button
                  color="danger"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Editar Empleado</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Dpi:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, dpi: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentEmployee({ ...currentEmployee, name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Apellido:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentEmployee({
                  ...currentEmployee,
                  last_name: e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentEmployee({
                  ...currentEmployee,
                  phone: e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Email:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentEmployee({
                  ...currentEmployee,
                  email: e.target.value,
                })
              }
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" 
          onClick={() => editEmployee(currentEmployee.id)}
          >
            Editar
          </Button>
          <Button color="secondary" 
          onClick={toggleEditModal}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default GetEmployeesPage;
