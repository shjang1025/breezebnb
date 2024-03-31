import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./sessionReducer";

export const rootReducer = combineReducers({
    session: sessionReducer
})

const configureStore=(initialState = {}) => (
    createStore(rootReducer, initialState, applyMiddleware(thunk))
)

export default configureStore
