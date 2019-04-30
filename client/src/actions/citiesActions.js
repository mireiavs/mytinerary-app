import axios from "axios";
import {
  GET_CITIES,
  ADD_CITY,
  CITIES_LOADING,
  ADD_SUCCESS,
  DELETE_CITY,
  UPDATE_CITY
} from "./types";
import { tokenConfig } from "./authActions";
import apiURL from "../api_urls";

export const getCities = () => dispatch => {
  dispatch(setCitiesLoading());
  axios.get(`${apiURL.cities}/all`).then(res =>
    dispatch({
      type: GET_CITIES,
      payload: res.data
    })
  );
};

export const setCitiesLoading = () => {
  return {
    type: CITIES_LOADING
  };
};

export const addCity = city => (dispatch, getState) => {
  axios.post(`${apiURL.cities}/all`, city, tokenConfig(getState)).then(res =>
    dispatch({
      type: ADD_CITY,
      payload: res.data
    })
  );
};

export const addSuccess = () => {
  return {
    type: ADD_SUCCESS
  };
};

export const deleteSuccess = () => {
  return {
    type: ADD_SUCCESS
  };
};

export const deleteCity = id => (dispatch, getState) => {
  axios.delete(`${apiURL.cities}/${id}`, tokenConfig(getState)).then(() =>
    dispatch({
      type: DELETE_CITY,
      payload: id
    })
  );
};

export const updateCity = (city, id) => (dispatch, getState) => {
  axios.put(`${apiURL.cities}/${id}`, city, tokenConfig(getState)).then(() =>
    dispatch({
      type: UPDATE_CITY,
      payload: city
    })
  );
};
