import axios from "axios";
import { React, useState, useEffect } from "react";
import "./css/styles.css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const URI = "http://localhost:3000/custumers/";

function GetCustomersPage() {
  const [customers, setCuostomers] = useState([]);
  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    const res = await axios.get(`${URI}find`);
    setCuostomers(res.data);
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.put(`${URI}delete/${id}`);
      if (response.status === 200) {
        Swal.fire(
          "Eliminado!",
          "El cliente ha sido eliminado correctamente.",
          "success"
        );
      }
      getCustomers();
    } catch (error) {
      Swal.fire("Error!", "No se pudo eliminar el cliente.", "error");
    }
  };

  const [editModal, setEditModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    id: "",
    dpi: "",
    nit: "",
    name: "",
    last_name: "",
    phone: "",
    email: "",
  });
  const toggleEditModal = (customer) => {
    setCurrentCustomer(customer);
    setEditModal(!editModal);
  };

  const editCustomer = async (id) => {
    const thisCustomer= await axios.get(`${URI}find/${id}`);


    try {
      const response = await axios.put(`${URI}update/${id}`, {
        dpi: currentCustomer.dpi ? currentCustomer.dpi : thisCustomer.data.dpi,
        nit: currentCustomer.nit ? currentCustomer.nit : thisCustomer.data.nit,
        name: currentCustomer.name ? currentCustomer.name : thisCustomer.data.name,
        last_name: currentCustomer.last_name ? currentCustomer.last_name : thisCustomer.data.last_name,
        phone: currentCustomer.phone ? currentCustomer.phone : thisCustomer.data.phone,
        email: currentCustomer.email ? currentCustomer.email : thisCustomer.data.email,
      });
      
      if (response.status === 200) {
        toggleEditModal();
        getCustomers();
        Swal.fire(
          "¡Actualizado!",
          "El cliente ha sido actualizado correctamente.",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Error!", "No se pudo actualizar el cliente.", "error");
    }
  };

  return (
    <div className="container">
      <h1>Tabla de usuarios</h1>
      <table className="table">
        <thead className="table-primary">
          <tr>
            <th>DPI</th>
            <th>Nit</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.dpi}</td>
              <td>{customer.nit}</td>
              <td>{customer.name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>
                <Button color="primary" onClick={() => toggleEditModal(customer)}>Editar</Button>
              </td>
              <td>
                <Button color="danger" onClick={() => deleteCustomer(customer.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Editar Cliente</ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>Dpi:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentCustomer({ ...currentCustomer, dpi: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Nit:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentCustomer({ ...currentCustomer, nit: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentCustomer({ ...currentCustomer, name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Apellido:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentCustomer({
                  ...currentCustomer,
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
                setCurrentCustomer({
                  ...currentCustomer,
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
                setCurrentCustomer({
                  ...currentCustomer,
                  email: e.target.value,
                })
              }
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editCustomer(currentCustomer.id)}>
            Editar
          </Button>
          <Button color="secondary" onClick={toggleEditModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default GetCustomersPage;
