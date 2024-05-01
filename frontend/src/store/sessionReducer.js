import { postUser, postSession, deleteSession } from "../utils/sessionApiUtils"

//CONST TYPES
export const RECEIVE_SESSION = 'session/RECEIVE_SESSION'
export const CREATE_SESSION = 'session/CREATE_SESSION'
export const DESTROY_SESSION = 'session/DESTROY_SESSION'

//ACTION CREATORS
export const receiveSession = sessionInfo => ({
    type: RECEIVE_SESSION,
    sessionInfo
})

export const destroySession = () => ({
    type: DESTROY_SESSION
})

export const createSession = sessionInfo => ({
    type: CREATE_SESSION, 
    sessionInfo
})

//THUNK CREATOR
export const fetchSession = () => async dispatch => {
    try {
        const res = await fetch('/api/session')
        if(res.ok) {
            const data = await res.json();
            dispatch(receiveSession(data))
        } else {
            throw res
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const createUser = userInfo => dispatch => (
    postUser(userInfo)
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw res          
            }
        })
        .then(data => {
            sessionStorage.setItem('currentUser', JSON.stringify(data.user))
            dispatch(createSession(data.user))
        })
)

export const loginUser = sessionInfo => dispatch => (
    postSession(sessionInfo)
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => {
            sessionStorage.setItem('currentUser', JSON.stringify(data.user))
            dispatch(createSession(data.user))
        })
)

export const logoutUser = () =>  dispatch => (
    deleteSession()
        .then(res => {
            if (res.ok) {
                sessionStorage.removeItem('currentUser')
                dispatch(destroySession()) // refer to jbuilder formats
            }else {
                throw res;
            }
        })
)

//SELECTORS
export const selectCurrentUser = state => state.session

//REDUCER
const initialState = JSON.parse(sessionStorage.getItem('currentUser')) || null;
const sessionReducer = (state=initialState, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_SESSION:
            return action.sessionInfo.user
        case CREATE_SESSION:
            return action.sessionInfo
            // newState[action.sessionInfo.id] = action.sessionInfo
            // return newState;
        case DESTROY_SESSION:
            return null;
        default:
            return state
    }
}

export default sessionReducer
