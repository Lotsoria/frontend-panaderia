import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./css/styles.css"; 
import "bootstrap/dist/css/bootstrap.min.css";

const URI = "http://localhost:3000/employees/";


function GetEmployeesPage() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        getEmployees();
      }, []);
    
      const getEmployees = async () => {
        const res = await axios.get(`${URI}find`);
        console.log(res.data)
        setEmployees(res.data);
      };
    return (
        <div>
            <section className="containerGetEmpoyees">
            <h1>Hola mundo </h1>
            </section>
        </div>    
    );
}

export default GetEmployeesPage;