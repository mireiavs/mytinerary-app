import { GET_CITIES, ADD_CITY, CITIES_LOADING, ADD_SUCCESS, DELETE_CITY } from "./types"
import axios from "axios"

export const getCities = () => dispatch => {
    dispatch(setCitiesLoading());
    axios
        .get("/api/cities/all")
        .then(res =>
            dispatch({
                type: GET_CITIES,
                payload: res.data
            }))
}

export const setCitiesLoading = () => {
    return {
        type: CITIES_LOADING
    }
}

export const addCity = city => dispatch => {
    axios
        .post("api/cities/all", city)
        .then(res =>
            dispatch({
                type: ADD_CITY,
                payload: res.data
            })
        )
}

export const addSuccess = () => {
    return {
        type: ADD_SUCCESS
    }
}

export const deleteSuccess = () => {
    return {
        type: ADD_SUCCESS
    }
}

export const deleteCity = id => dispatch => {
    axios.delete(`/api/cities/${id}`)
        .then(() => dispatch({
            type: DELETE_CITY,
            payload: id
        }))
}