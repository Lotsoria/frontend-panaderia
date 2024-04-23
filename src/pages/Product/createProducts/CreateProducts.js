import axios from "axios";
import { React, useState } from "react";
import "./css/styles.css";

const URI = "http://localhost:3000/products/";
function CreateProductsPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");

  const createProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name ? name : "No name");
    formData.append(
      "description",
      description ? description : "No description"
    );
    formData.append("price", price ? price : 0);
    formData.append("stock", stock ? stock : 0);

    if (image) {
      formData.append("image", image);
    }
    try {
      // Realiza la solicitud POST con el objeto FormData
      const response = await axios.post(`${URI}create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      // Maneja la respuesta, como redireccionar al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error(error);
      // Maneja el error, como mostrar un mensaje al usuario
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  return (
    <div className="containerCreateProduct">
      <h3>Crear nuevo producto</h3>
      <form onSubmit={createProduct}>
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
          <label className="form-label">Descripción</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <div className="div_file">
            <p className="text">Seleccionar imagen</p>
            <input
              type="file"
              name="image"
              className="btn_enviar"
              onChange={(e) => setImage(e.target.files[0])} // Asegúrate de usar files[0] para obtener el archivo
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    </div>
  );
}

export default CreateProductsPage;
