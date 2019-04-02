import { GET_ITINERARIES, ITINERARIES_LOADING, ADD_ITINERARY, ADD_IT_SUCCESS } from "../actions/types"

const initialState = {
    itineraries: [],
    loading: false,
    additsuccess: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITINERARIES:
            return {
                ...state,
                itineraries: action.payload,
                loading: false
            }
        case ITINERARIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_ITINERARY:
            return {
                ...state,
                itineraries: [action.payload, ...state.itineraries],
                additsuccess: true
            }
        case ADD_IT_SUCCESS:
            return {
                ...state,
                additsuccess: false
            }
        default:
            return state
    }
}

