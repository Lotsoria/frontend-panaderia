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
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });
  const toggleEditModal = (product) => {
    setCurrentProduct(product);
    setEditModal(!editModal);
  };
  const editProduct = async () => {
    try {
      const thisProduct = await axios.get(`${URI}find/${currentProduct.id}`);
      console.log(thisProduct);
      const formData = new FormData();
      formData.append(
        "name",
        currentProduct.name ? currentProduct.name : thisProduct.data.name
      );
      formData.append(
        "description",
        currentProduct.description
          ? currentProduct.description
          : thisProduct.data.description
      );
      formData.append(
        "price",
        currentProduct.price ? currentProduct.price : thisProduct.data.price
      );
      formData.append(
        "stock",
        currentProduct.stock ? currentProduct.stock : thisProduct.data.stock
      );

      if (currentProduct.image) {
        formData.append("image", currentProduct.image);
      } else {
        formData.append("image_url", thisProduct.data.image_url);
      }
      const response = await axios.put(
        `${URI}update/${currentProduct.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        toggleEditModal();
        getProducts();
        Swal.fire(
          "¡Actualizado!",
          "El producto ha sido actualizado correctamente.",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
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
                    <br></br>
                    <span>Disponibles {product.stock}</span>
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
            <label>Nombre:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Descripción:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  description: e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Precio:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, price: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Stock:</label>
            <input
              className="form-control"
              type="text"
              onChange={(e) =>
                setCurrentProduct({ ...currentProduct, stock: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>Foto:</label>
            <input
              className="form-control"
              type="file"
              onChange={(e) =>
                setCurrentProduct({
                  ...currentProduct,
                  image: e.target.files[0],
                })
              }
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editProduct()}>
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

export default GetProductsPage;
