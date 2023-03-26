import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
} from "../constants/categoryConstants";
import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "../constants/messageConstants";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import axios from "axios";

export const readCategory = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get("/api/category", {
      baseURL: "https://food-order-b6n5.onrender.com",
    });
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: GET_CATEGORIES,
      payload: response.data.categories,
    });
  } catch (err) {
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};
export const createCategory = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      baseURL: "https://food-order-b6n5.onrender.com",
    };
    dispatch({ type: START_LOADING });
    const response = await axios.post("/api/category", formData, config);
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_SUCCESS_MESSAGE,
      payload: response.data.successMessage,
    });
    dispatch({ type: CREATE_CATEGORY, payload: response.data.category });
  } catch (err) {
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};
