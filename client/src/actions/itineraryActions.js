import { GET_ITINERARIES, ITINERARIES_LOADING, ADD_ITINERARY, ADD_IT_SUCCESS } from "./types"

import axios from "axios"

export const getItineraries = (id) => dispatch => {
    dispatch(setItinerariesLoading());
    axios
        .get(`/api/itineraries/${id}`)
        .then(res =>
            dispatch({
                type: GET_ITINERARIES,
                payload: res.data
            }))
}

export const setItinerariesLoading = () => {
    return {
        type: ITINERARIES_LOADING
    }
}

export const addItinerary = (itinerary, id) => dispatch => {
    axios
        .post(`/api/itineraries/${id}`, itinerary)
        .then(res =>
            dispatch({
                type: ADD_ITINERARY,
                payload: res.data
            })
        )
}

export const addItSuccess = () => {
    return {
        type: ADD_IT_SUCCESS
    }
}