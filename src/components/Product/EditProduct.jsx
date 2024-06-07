import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../../contexts/ProductContextProvider";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, TextField } from "@mui/material";

const EditProduct = () => {
  const { saveEditedProduct, getOneProduct, oneProduct } =
    useContext(productContext);

  const navigate = useNavigate(); // для навигации после сохранения
  const { id } = useParams(); // ? useParams - возвращает объект пары key/value (ключ/значение) параметров URL
  const [productToEdit, setProductToEdit] = useState(oneProduct); // Используем useState для управления состоянием редактируемого продукта

  useEffect(() => {
    getOneProduct(id);
  }, [id, getOneProduct]);

  useEffect(() => {
    setProductToEdit(oneProduct); // Устанавливаем состояние редактируемого продукта при изменении oneProduct
  }, [oneProduct]);

  const handleInp = (e) => {
    if (productToEdit) {
      const { name, value } = e.target;
      setProductToEdit((prev) => ({
        ...prev,
        [name]: name === "price" ? Number(value) : value,
      }));
    }
  };

  const handleSave = () => {
    saveEditedProduct(productToEdit);
    navigate(-1); // возвращаемся назад после сохранения
  };

  if (!productToEdit) {
    return <div>Loading...</div>; // Показать загрузку, пока продукт не загружен
  }

  return (
    <Container>
      <h1>Edit Product</h1>
      {productToEdit ? (
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
            value={productToEdit.name}
            onChange={handleInp}
            placeholder="name"
          />
          <TextField
            style={{ margin: "10px 0" }}
            type="text"
            name="description"
            value={productToEdit.description}
            onChange={handleInp}
            placeholder="description"
          />
          <TextField
            style={{ margin: "10px 0" }}
            type="text"
            name="price"
            value={productToEdit.price}
            onChange={handleInp}
            placeholder="price"
          />
          <TextField
            style={{ margin: "10px 0" }}
            type="text"
            name="image"
            value={productToEdit.image}
            onChange={handleInp}
            placeholder="image"
          />
          <TextField
            style={{ margin: "10px 0" }}
            type="text"
            name="type"
            value={productToEdit.type}
            onChange={handleInp}
            placeholder="type"
          />

          <Button
            variant="contained"
            onClick={() => {
              saveEditedProduct(productToEdit);
              navigate("/");
            }}
          >
            Save Edited Product
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default EditProduct;
