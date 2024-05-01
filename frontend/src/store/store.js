import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import logger from "redux-logger"
import sessionReducer from "./sessionReducer";
import roomReducer from "./roomReducer";
import userReducer from "./userReducer";
import reservationReducer from "./reservationReducer"
import reviewReducer from "./reviewReducer";

export const rootReducer = combineReducers({
    users: userReducer,
    session: sessionReducer,
    rooms: roomReducer,
    reservations: reservationReducer,
    reviews: reviewReducer
})

const configureStore=(initialState = {}) => (
    createStore(rootReducer, initialState, applyMiddleware(thunk ))
)

export default configureStore
