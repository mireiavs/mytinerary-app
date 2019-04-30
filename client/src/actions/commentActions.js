import {
  GET_COMMENTS,
  COMMENTS_LOADING,
  ADD_COMMENT,
  DELETE_COMMENT
} from "./types";
import { tokenConfig } from "./authActions";
import axios from "axios";
import apiURL from "../api_urls";

export const getComments = itineraryId => dispatch => {
  dispatch(setCommentsLoading());
  axios.get(`${apiURL.comments}/${itineraryId}`).then(res =>
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    })
  );
};

export const setCommentsLoading = () => {
  return {
    type: COMMENTS_LOADING
  };
};

export const addComment = (comment, itineraryId) => (dispatch, getState) => {
  axios
    .post(`${apiURL.comments}/${itineraryId}`, comment, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    );
};

export const deleteComment = id => (dispatch, getState) => {
  axios.delete(`${apiURL.comments}/${id}`, tokenConfig(getState)).then(() =>
    dispatch({
      type: DELETE_COMMENT,
      payload: id
    })
  );
};
