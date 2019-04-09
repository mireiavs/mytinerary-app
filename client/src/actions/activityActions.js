import { GET_ACTIVITIES, ACTIVITIES_LOADING, ADD_ACTIVITY, ADD_AC_SUCCESS } from "./types"
/* import { tokenConfig } from "./authActions"
 */import { returnErrors } from "./errorActions"
import axios from "axios"

export const getActivities = (itineraryId) => dispatch => {
    dispatch(setActivitiesLoading());
    axios
        .get(`/api/activities/${itineraryId}`)
        .then(res =>
            dispatch({
                type: GET_ACTIVITIES,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const setActivitiesLoading = () => {
    return {
        type: ACTIVITIES_LOADING
    }
}

export const addActivity = (activity, itineraryId) => dispatch => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios
        .post(`/api/activities/${itineraryId}`, activity, config)
        .then(res =>
            dispatch({
                type: ADD_ACTIVITY,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const addAcSuccess = () => {
    return {
        type: ADD_AC_SUCCESS
    }
}