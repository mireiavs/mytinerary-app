import { GET_FAVOURITES, FAVOURITES_LOADING, ADD_FAVOURITE, DELETE_FAVOURITE } from "./types"
import { tokenConfig } from "./authActions"
import axios from "axios"


export const getFavourites = (userId) => dispatch => {
    dispatch(setFavouritesLoading());
    axios
        .get(`/api/favourites/${userId}`)
        .then(res =>
            dispatch({
                type: GET_FAVOURITES,
                payload: res.data
            }))
}

export const setFavouritesLoading = () => {
    return {
        type: FAVOURITES_LOADING
    }
}

export const addFavourite = (favourite, userId) => (dispatch, getState) => {
    axios
        .post(`/api/favourites/${userId}`, favourite, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_FAVOURITE,
                payload: res.data
            })
        )
}

export const deleteFavourite = (favouriteId, userId) => (dispatch, getState) => {
    axios
        .delete(`/api/favourites/${userId}/${favouriteId}`, tokenConfig(getState))
        .then(() => dispatch({
            type: DELETE_FAVOURITE,
            payload: favouriteId
        }))
}

