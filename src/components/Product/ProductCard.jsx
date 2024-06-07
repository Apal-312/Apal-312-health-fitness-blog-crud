import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../../contexts/ProductContextProvider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useSearchParams as useRouterSearchParams } from "react-router-dom"; // Переименуйте здесь
import { TextField } from "@mui/material";

const ProductCard = () => {
  const { products, getProducts, deleteProduct } = useContext(productContext);

  const [searchParams, setSearchParams] = useRouterSearchParams(); // Используйте здесь переименованное значение

  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({ q: search });
  }, [search]);

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  console.log(products, "products");

  // Проверка на наличие данных
  if (!products || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ margin: "30px 0" }}>Product Card</h1>

      <TextField
        sx={{ width: "300px", height: "70px" }}
        variant="outlined"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {products.map((item, index) => (
        <Card sx={{ maxWidth: 345, marginBottom: "20px" }} key={index}>
          <CardMedia
            sx={{ height: 140 }}
            image={item.image}
            title="product image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`detail/${item.id}`}>
              <Button
                style={{ margin: "5px" }}
                size="small"
                variant="contained"
                color="secondary"
              >
                Details
              </Button>
            </Link>
            <Link to={`edit/${item.id}`}>
              <Button size="small" variant="contained">
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => deleteProduct(item.id)}
              size="small"
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
