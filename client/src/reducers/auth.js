import { AUTH, LOGIN_ERROR } from "../constants/actionTypes";

const authReducer = (state = { loginError: false, authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGIN_ERROR:
            return { ...state, loginError: true };
        default:
            return state;
    }
}

export default authReducer