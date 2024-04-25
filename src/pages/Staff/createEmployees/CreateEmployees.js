import axios from "axios";
import { React, useState } from "react";
import "./css/styles.css";

const URI = "http://localhost:3000/employees/";

function CreateEmployeesPage() {
  const [dpi, setDpi] = useState("");
  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const createEmployees = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${URI}create`, {
        dpi: dpi,
        name: name,
        last_name: last_name,
        phone: phone,
        email: email,
      });
    } catch (error) {
      console.error("Error creating employees:", error);
    }
  };

  return (
    <div className="containerCreateEmployees">
      <h3>Crear nuevo empleado</h3>
      <form onSubmit={createEmployees}>
        <div className="mb-3">
          <label className="form-label">Dpi</label>
          <input
            value={dpi}
            onChange={(e) => setDpi(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido</label>
          <input
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefono</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    </div>
  );
}

export default CreateEmployeesPage;
