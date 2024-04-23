import axios from "axios";
import { React, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./css/styles.css";

const URI = "http://localhost:3000/custumers/"

function CreateCostumersPage() {
    const [dpi, setDpi] = useState("");
    const [nit, setNit] = useState("");
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()    

    const createCustomer = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("dpi", dpi ? dpi : "No dpi");
        // formData.append("nit", nit ? nit : "No nit");
        // formData.append("name", name ? name : "No name");
        // formData.append("last_name", last_name ? last_name : "No last_name");
        // formData.append("phone", phone ? phone : "No phone");
        // formData.append("email", email ? email : "No email");
        // try{
        //     console.log(formData);
        //     const response = await axios.post(`${URI}create`, formData, {
        //         headers: { "Content-Type": "multipart/form-data" },
        //       });
        //       navigate('/customer/find')
        // }catch (error) {
        //     console.error("Error creating customer:", error);
        // }

        try{
                await axios.post(`${URI}create`, {dpi: dpi, nit: nit, name: name, last_name:last_name, phone:phone, email:email});
                  navigate('/customer/find')
            }catch (error) {
                console.error("Error creating customer:", error);
            }
    };


    return (
        <div className="containerCreateCustomer">
          <h3>Crear nuevo cliente</h3>
          <form onSubmit={createCustomer}>
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
              <label className="form-label">Nit</label>
              <input
                value={nit}
                onChange={(e) => setNit(e.target.value)}
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

export default CreateCostumersPage