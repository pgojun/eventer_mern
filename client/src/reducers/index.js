import { combineReducers } from "redux";
import authReducer from './auth'
import eventReducer from './events'

export default combineReducers({
    eventReducer,authReducer
});