import {
  GET_ITINERARIES,
  GET_ALL_ITINERARIES,
  ITINERARIES_LOADING,
  ADD_ITINERARY,
  ADD_IT_SUCCESS,
  DELETE_ITINERARY,
  UPDATE_ITINERARY,
  SET_ITINERARY_RATING,
  SET_ITINERARY_LIKES
} from "./types";
import { tokenConfig } from "./authActions";
import axios from "axios";
import apiURL from "../api_urls";

export const getItineraries = id => dispatch => {
  dispatch(setItinerariesLoading());
  axios.get(`${apiURL.itineraries}/${id}`).then(res =>
    dispatch({
      type: GET_ITINERARIES,
      payload: res.data
    })
  );
};

export const getAllItineraries = () => dispatch => {
  dispatch(setItinerariesLoading());
  axios.get(apiURL.itineraries).then(res =>
    dispatch({
      type: GET_ALL_ITINERARIES,
      payload: res.data
    })
  );
};

export const setItinerariesLoading = () => {
  return {
    type: ITINERARIES_LOADING
  };
};

export const addItinerary = (itinerary, cityId) => (dispatch, getState) => {
  axios
    .post(`${apiURL.itineraries}/${cityId}`, itinerary, tokenConfig2(getState))
    .then(res =>
      dispatch({
        type: ADD_ITINERARY,
        payload: res.data
      })
    );
};

const tokenConfig2 = getState => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "multipart/form-data"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const addItSuccess = () => {
  return {
    type: ADD_IT_SUCCESS
  };
};

export const deleteItinerary = itineraryId => (dispatch, getState) => {
  axios
    .delete(`${apiURL.itineraries}/${itineraryId}`, tokenConfig(getState))
    .then(() =>
      dispatch({
        type: DELETE_ITINERARY,
        payload: itineraryId
      })
    );
};

export const updateItinerary = (itinerary, itineraryId) => dispatch => {
  axios.put(`${apiURL.itineraries}/${itineraryId}`, itinerary).then(() =>
    dispatch({
      type: UPDATE_ITINERARY,
      payload: itinerary
    })
  );
};

export const setItineraryRating = (rating, itineraryId) => (
  dispatch,
  getState
) => {
  const newRating = {
    itineraryId,
    rating
  };
  axios
    .put(
      `${apiURL.itineraries}/${itineraryId}/rating`,
      newRating,
      tokenConfig(getState)
    )
    .then(() =>
      dispatch({
        type: SET_ITINERARY_RATING,
        payload: newRating
      })
    );
};

export const setItineraryLikes = (likes, itineraryId) => (
  dispatch,
  getState
) => {
  const newLikes = {
    itineraryId,
    likes
  };
  axios
    .put(
      `${apiURL.itineraries}/${itineraryId}/likes`,
      newLikes,
      tokenConfig(getState)
    )
    .then(() =>
      dispatch({
        type: SET_ITINERARY_LIKES,
        payload: newLikes
      })
    );
};
