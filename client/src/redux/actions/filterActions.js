import axios from "axios";
import { GET_NEW_ARRIVALS } from "../constants/filterConstants";
import { START_LOADING, STOP_LOADING } from "./../constants/loadingConstants";
import {
  SHOW_ERROR_MESSAGE,
  SHOW_SUCCESS_MESSAGE,
} from "./../constants/messageConstants";

export const getNewArrivals = (sortBy="desc", limit=6) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await axios.get(`/api/filter?sortBy=${sortBy}&limit=${limit}`);
    dispatch({ type: STOP_LOADING });
    dispatch({ type: GET_NEW_ARRIVALS, payload: response.data.newArrivals });
  } catch (err) {
    console.log(err, "getNewArrivals error message");
    dispatch({ type: STOP_LOADING });
    dispatch({
      type: SHOW_ERROR_MESSAGE,
      payload: err.response.data.errorMessage,
    });
  }
};
