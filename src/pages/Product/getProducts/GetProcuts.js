import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/styles.css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";
const URI = "http://localhost:3000/products/";
function GetProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get(`${URI}find`);
    setProducts(res.data);
  };

  //TODO: Datos dinamicos
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const lastPage = Math.ceil(products.length / productsPerPage);

  //TODO: Funcion para borrar un producto
  const deleteProduct = async (id) => {
    try {
      const response = await axios.put(`${URI}delete/${id}`);
      console.log(response);
      // Si la respuesta es exitosa, muestra una alerta de éxito
      if (response.status === 200) {
        // Asumiendo que tu API devuelve un estado HTTP 200 para una operación exitosa
        Swal.fire(
          "Eliminado!",
          "El producto ha sido eliminado correctamente.",
          "success"
        );
        // Luego de la alerta, actualiza la lista de productos
        getProducts();
      }
    } catch (error) {
      // Manejo de errores, si algo va mal muestra una alerta de error
      Swal.fire("Error!", "No se pudo eliminar el producto.", "error");
    }
  };

  //TODO Logica para actualizar
  const [editModal, setEditModal] = useState(false);
const [currentProduct, setCurrentProduct] = useState({
  id: '',
  name: '',
  description: '',
  price: '',
  stock: '',
  image_url: '',
});
const toggleEditModal = (product) => {
  setCurrentProduct(product);
  setEditModal(!editModal);
};
const editProduct = async () => {
  // Aquí iría el código para enviar los datos actualizados al servidor
  // Por ejemplo, usando axios para enviar una petición PUT
  try {
    const response = await axios.put(`${URI}update/${currentProduct.id}`, {
      name: currentProduct.name,
      // Añadir otros campos aquí
    });
    if (response.status === 200) {
      // Cerrar modal
      toggleEditModal();
      // Actualizar lista de productos
      getProducts();
      Swal.fire("¡Actualizado!", "El producto ha sido actualizado correctamente.", "success");
    }
  } catch (error) {
    Swal.fire("Error!", "No se pudo actualizar el producto.", "error");
  }
};



  return (
    <div>
      <section className="containerGetProducts">
        <div className="cardsContainer">
          {currentProducts.map((product) => (
            <div className="card" key={product.id}>
              <div className="imgBox">
                <img src={product.image_url} alt={product.image_url} />
              </div>
              <div className="content">
                <div className="contentBox">
                  <h3>
                    {product.name}
                    <br></br>
                    <span>Q.{product.price} C/U</span>
                  </h3>
                </div>
                <ul className="sci">
                  <li>
                  <a onClick={() => toggleEditModal(product)}>Editar</a>
                  </li>
                  <li>
                    <a onClick={() => deleteProduct(product.id)}>Eliminar</a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="botones">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            Siguiente
          </button>
        </div>
      </section>
      <Modal isOpen={editModal} toggle={toggleEditModal}>
  <ModalHeader toggle={toggleEditModal}>Editar Producto</ModalHeader>
  <ModalBody>
    <FormGroup>
      <label>Id:</label>
      <input className="form-control" readOnly type="text" value={currentProduct.id} />
    </FormGroup>
    <FormGroup>
      <label>Nombre:</label>
      <input
        className="form-control"
        type="text"
        value={currentProduct.name}
        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
      />
    </FormGroup>
    {/* Añadir más campos aquí */}
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={() => editProduct()}>Editar</Button>
    <Button color="secondary" onClick={toggleEditModal}>Cancelar</Button>
  </ModalFooter>
</Modal>

    </div>
  );
}

export default GetProductsPage;
