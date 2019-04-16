import { GET_FAVOURITES, FAVOURITES_LOADING, ADD_FAVOURITE, DELETE_FAVOURITE } from "../actions/types"

const initialState = {
    favourites: [],
    loading: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FAVOURITES:
            return {
                ...state,
                favourites: action.payload,
                loading: false
            }
        case FAVOURITES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [action.payload, ...state.favourites],
            }
        case DELETE_FAVOURITE:
            return {
                ...state,
                favourites: state.favourites.filter(favourite => favourite._id !== action.payload),
            }
        default:
            return state
    }
}

