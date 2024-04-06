import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger"
import sessionReducer from "./sessionReducer";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    users: userReducer,
    session: sessionReducer,
    rooms: roomReducer
})

const configureStore=(initialState = {}) => (
    createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
)

export default configureStore
