import { FETCH_ALL, CREATE, UPDATE, DELETE, STAR, START_LOADING, END_LOADING, FETCH_EVENT, GET_BY_SEARCH } from '../constants/actionTypes';

const eventReducer = (state = { events: [], isLoading: false }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                events: action.payload
            };
        case GET_BY_SEARCH:
            return { ...state, events: action.payload };
        case CREATE:
            return { ...state, events: [...state.events, action.payload] };
        case DELETE:
            return { ...state, events: state.events.filter((event) => event._id !== action.payload) }
        case STAR:
        case UPDATE:
            return { ...state, events: state.events.map((event) => event._id === action.payload._id ? action.payload : event) }
        case FETCH_EVENT:
            return { ...state, event: action.payload };
        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}

export default eventReducer;
