import { GET_CITIES, ADD_CITY, CITIES_LOADING } from "../actions/types"

const initialState = {
    cities: [],
    loading: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CITIES:
            return {
                ...state,
                cities: action.payload,
                loading: false
            }
        case CITIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_CITY:
            return {
                ...state,
                cities: [action.payload, ...state.cities]
            }
        default:
            return state

    }
}

