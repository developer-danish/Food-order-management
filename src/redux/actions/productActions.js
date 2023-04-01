import axios from "axios";
import { getCookie } from "../../helpers/cookies";
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
} from "../constants/productConstants";
import { START_LOADING, STOP_LOADING } from "./../constants/loadingConstants";
import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "./../constants/messageConstants";
import { DELETE_PRODUCT } from "./../constants/productConstants";

export const createProduct = (formData) => async (dispatch) => {
  const token = await getCookie("token");

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      baseURL: "https://food-order-b6n5.onrender.com",
    };
    dispatch({ type: START_LOADING });
    const response = await axios.post("/api/food", formData, config);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successMessage,
    });
    dispatch({ type: CREATE_PRODUCT, payload: response.data.product });
  } catch (err) {
    console.log(err, "product error message");
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get("/api/food", {
      baseURL: "https://food-order-b6n5.onrender.com",
    });
    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_PRODUCTS, payload: response.data.products });
  } catch (err) {
    console.log(err, "product error message");
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};
export const getProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get(`/api/food/${productId}`, {
      baseURL: "https://food-order-b6n5.onrender.com",
    });
    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_PRODUCT, payload: response.data });
  } catch (err) {
    console.log(err, "product error message");
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  const token = await getCookie("token");

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    dispatch({ type: START_LOADING });
    const response = await axios.delete(`/api/food/${productId}`, config);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: DELETE_PRODUCT, payload: response.data });
  } catch (err) {
    console.log(err, "deleteProduct error message");
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};