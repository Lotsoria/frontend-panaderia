import React from "react";
import { Link } from "react-router-dom";
import "./css/styles.css";

function NavBarProductPage() {
  return (
    <div className="containerNBP">
      <div className="navbarProducts">
        <ul>
          <li>
            <Link to="create">Crear</Link>
          </li>
          <li>
            <Link to="find">Ver</Link>
          </li>
          <li>
            <Link to="otro">Staff</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBarProductPage;
