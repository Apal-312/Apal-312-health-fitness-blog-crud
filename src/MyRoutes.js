import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProductPage from "./pages/AddProductPage";
import ProductContextProvider from "./contexts/ProductContextProvider";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import EditProductPage from "./pages/EditProductPage";

const MyRoutes = () => {
  return (
    <div>
      <ProductContextProvider>
        <Routes>
          <Route path="/" element={<ProductPage />} />
          <Route path="/add" element={<AddProductPage />} />
          <Route path="/detail/:id" element={<ProductDetailsPage />} />
          <Route path="/edit/:id" element={<EditProductPage />} />
        </Routes>
      </ProductContextProvider>
    </div>
  );
};

export default MyRoutes;
