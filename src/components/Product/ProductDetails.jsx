import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { productContext } from "../../contexts/ProductContextProvider";

const ProductDetails = () => {
  const { getOneProduct, oneProduct } = useContext(productContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOneProduct(id);
  }, [id, getOneProduct]);

  console.log(oneProduct, "oneProduct");

  // Проверка на наличие данных
  if (!oneProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
      <h2>Product Details</h2>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        {oneProduct ? (
          <Card sx={{ maxWidth: 545, marginBottom: "20px" }}>
            <CardMedia
              component="img"
              height="170px"
              sx={{ objectFit: "contain" }}
              image={oneProduct.image}
              alt="product image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Title: {oneProduct.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {oneProduct.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {oneProduct.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {oneProduct.category}
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </Container>
    </div>
  );
};

export default ProductDetails;
