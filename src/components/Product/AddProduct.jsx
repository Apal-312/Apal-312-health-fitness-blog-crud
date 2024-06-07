import React, { useContext, useState } from "react";
import { productContext } from "../../contexts/ProductContextProvider";
import { Button, Container, TextField } from "@mui/material";

const AddProduct = () => {
  const { addProduct } = useContext(productContext);

  const initProduct = {
    name: "",
    description: "",
    price: "",
    image: "",
    type: "",
  };

  const [product, setProduct] = useState(initProduct);

  //   console.log(product, "Product");

  const handleAddProduct = (e) => {
    let obj = {
      ...product,
      [e.target.name]: e.target.value,
    };
    setProduct(obj);
  };

  function saveProduct() {
    addProduct(product);
    setProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      type: "",
    });
  }

  return (
    <Container>
      <h2 style={{ margin: "30px 0" }}>Страница для добавления продуктов</h2>
      <div
        style={{
          display: "flex",
          margin: "50px auto",
          width: "30%",
          flexDirection: "column",
        }}
      >
        <TextField
          style={{ margin: "10px 0" }}
          type="text"
          name="name"
          value={product.name}
          onChange={handleAddProduct}
          placeholder="name"
        />
        <TextField
          style={{ margin: "10px 0" }}
          type="text"
          name="description"
          value={product.description}
          onChange={handleAddProduct}
          placeholder="description"
        />
        <TextField
          style={{ margin: "10px 0" }}
          type="text"
          name="price"
          value={product.price}
          onChange={handleAddProduct}
          placeholder="price"
        />
        <TextField
          style={{ margin: "10px 0" }}
          type="text"
          name="image"
          value={product.image}
          onChange={handleAddProduct}
          placeholder="image"
        />
        <TextField
          style={{ margin: "10px 0" }}
          type="text"
          name="type"
          value={product.type}
          onChange={handleAddProduct}
          placeholder="type"
        />

        <Button variant="contained" onClick={saveProduct}>
          Add Product
        </Button>
      </div>
    </Container>
  );
};

export default AddProduct;
