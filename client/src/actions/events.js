import { FETCH_ALL, CREATE, UPDATE, DELETE, STAR, GET_BY_SEARCH, FETCH_EVENT } from '../constants/actionTypes';
import * as api from '../api'

export const getEvents = () => async (dispatch) => {
    try {
        const { data } = await api.fetchEvents();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const getEvent = (id) => async (dispatch) => {
    try {
        const { data } = await api.getEvent(id);
        dispatch({ type: FETCH_EVENT, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const createEvent = (event) => async (dispatch) => {
    try {
        const { data } = await api.createEvent(event);
        if (data || data !== null) {
            dispatch({ type: CREATE, payload: data });
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteEvent = (id) => async (dispatch) => {
    try {
        await api.deleteEvent(id)
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const updateEvent = (id, event) => async (dispatch) => {
    try {
        const { data } = await api.updateEvent(id, event);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const starEvent = (id) => async (dispatch) => {
    try {
        const { data } = await api.starEvent(id);
        dispatch({ type: STAR, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getEventsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.getEventsBySearch(searchQuery);
        dispatch({ type: GET_BY_SEARCH, payload: data })
    } catch (error) {
        console.log(error);
    }
}