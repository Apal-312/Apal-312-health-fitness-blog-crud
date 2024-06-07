import axios from "axios";
import { createContext, useReducer } from "react";
import { API } from "../helpers/const";

export const productContext = createContext();

const INIT_STATE = { products: [], oneProduct: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };

    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };

    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addProduct = async (newProduct) => {
    await axios.post(API, newProduct);
  };

  const getProducts = async () => {
    let { data } = await axios(`${API}/${window.location.search}`);
    let action = {
      type: "GET_PRODUCTS",
      payload: data,
    };
    dispatch(action);
  };

  // !  getOneProduct
  const getOneProduct = async (id) => {
    let { data } = await axios(`${API}/${id}`);

    let action = {
      type: "GET_ONE_PRODUCT",
      payload: data,
    };
    dispatch(action);
  };

  // ! DELETE
  const deleteProduct = async (id) => {
    await axios.delete(`${API}/${id}`);
    getProducts();
  };

  const saveEditedProduct = async (newProduct) => {
    await axios.patch(`${API}/${newProduct.id}`, newProduct); // ? patch - вносит изменения в существующий объект в базе данных
    getProducts();
  };

  const values = {
    addProduct,
    getProducts,
    getOneProduct,
    deleteProduct,
    saveEditedProduct,
    products: state.products,
    oneProduct: state.oneProduct,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
