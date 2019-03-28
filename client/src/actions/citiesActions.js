import { GET_CITIES, ADD_CITY, CITIES_LOADING } from "./types"
import axios from "axios"

export const getCities = () => dispatch => {
    dispatch(setCitiesLoading());
    axios
        .get("/api/cities")
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
    .post("api/cities", city)
    .then(res => 
        dispatch ({
            type: ADD_CITY,
            payload: res.data
        })
    )
}