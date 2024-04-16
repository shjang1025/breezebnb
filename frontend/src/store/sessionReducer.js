import { postUser, postSession, deleteSession } from "../utils/sessionApiUtils"

//CONST TYPES
export const CREATE_SESSION = 'session/CREATE_SESSION'
export const DESTROY_SESSION = 'session/DESTROY_SESSION'

//ACTION CREATORS
export const destroySession = () => ({
    type: DESTROY_SESSION
})

export const createSession = sessionInfo => ({
    type: CREATE_SESSION, 
    sessionInfo
})

//THUNK CREATOR
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
        // .catch(err => console.error(err))
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
        // .catch(err => console.error(err))
)

//SELECTORS
export const selectCurrentUser = state => state.session

//REDUCER
const initialState = JSON.parse(sessionStorage.getItem('currentUser')) || null;
const sessionReducer = (state=initialState, action) => {
    const newState = {...state}
    switch(action.type) {
        case CREATE_SESSION:
            // return action.sessionInfo
            newState[action.sessionInfo.id] = action.sessionInfo
            return newState;
        case DESTROY_SESSION:
            return null;
        default:
            return state
    }
}

export default sessionReducer
