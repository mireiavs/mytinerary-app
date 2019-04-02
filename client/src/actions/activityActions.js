import { GET_ACTIVITIES, ACTIVITIES_LOADING } from "./types"

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
}

export const setActivitiesLoading = () => {
    return {
        type: ACTIVITIES_LOADING
    }
}
