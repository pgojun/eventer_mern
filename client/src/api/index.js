import axios from 'axios';

const API = axios.create({ baseURL: 'https://localhost:5000' })


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;

    }
    return req;
});

export const signUp = (formData) => API.post('/user/signup', formData)

export const signIn = (formData) => API.post('/user/signin', formData)

export const createEvent = (newEvent) => API.post('/events', newEvent);

export const fetchEvents = () => API.get('/events');

export const deleteEvent = (id) => API.delete(`/events/${id}`);

export const updateEvent = (id, updatedEvent) => API.patch(`/events/${id}`, updatedEvent);

export const getEvent = (id) => API.get(`/events/${id}`)

export const starEvent = (id) => API.patch(`/events/${id}/starEvent`);

export const getEventsBySearch = (searchQuery) => API.get(`/events/search?searchQuery=${searchQuery.search || 'none'}`)
