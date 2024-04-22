import React from "react";
import Header from "../../components/common/header/header";
import "./css/home.css";
import { Pan } from "../../img/img";
function HomePage() {
  return (
    <div className="containerHome">
      <Header title="Bienvenidos a la Panadería" name="Alberto Ulin" />
      <div className="container2">
        <section className="banner">
          <img src={Pan} className="fitBg" alt="Pan" />
            <div className="content">
                <h2>La mejor panadería de la ciudad</h2>
                <p>
                  La panadería de Alberto Ulin es la mejor de la ciudad. Con más
                  de 20 años de experiencia, ofrecemos el mejor pan de la
                  ciudad. Nuestros productos son frescos y de la mejor calidad.
                </p>
            </div>
        </section>
      </div>
      <Header title="Bienvenidos a la Panadería" name="Alberto Ulin" />
    </div>
  );
}

export default HomePage;
