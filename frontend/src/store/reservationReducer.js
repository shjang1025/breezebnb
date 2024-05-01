import { useSelector } from "react-redux"
import { postReservation, editReservation, deleteReservation } from "../utils/resrevationUtils"
//CONST
const RECEIVE_RESERVATION = 'reservations/RECEIVE_RESERVATION'
const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS'
const REMOVE_RESERVATION = 'reservations/REMOVE_RESERVATION'

//ACTION CREATOR
export const receiveReservation = reservation => ({
    type: RECEIVE_RESERVATION, 
    reservation
})
export const receiveReservations = reservations => ({
    type: RECEIVE_RESERVATIONS,
    reservations
})
export const removeReservation = reservationId => ({
    type: REMOVE_RESERVATION,
    reservationId
})

//SELECTOR

//THUNK ACTION CREATOR
export const fetchReservations = () => dispatch => {
    fetch('/api/reservations')
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => {

            dispatch(receiveReservations(data));
        })
        .catch(err => console.error(err))
}
export const fetchReservation = reservationId => dispatch => {
    fetch(`/api/reservations/${reservationId}`)
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => dispatch(receiveReservation(data)))
        .catch(err => console.error(err))
}
export const createReservation = reservationData => dispatch => (
    postReservation(reservationData)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => dispatch(receiveReservation(data)))
)
export const updateReservation = reservationData => dispatch => {
    editReservation(reservationData)
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw res;
            }
        })
        .then(data => dispatch(receiveReservation(data)))
        .catch(err => console.error(err))

}
export const destroyReservation = reservationId => dispatch => {
    deleteReservation(reservationId)
        .then(res => {
            if(res.ok) {
                dispatch(removeReservation(reservationId))
            } else {
                throw res;
            }
        })
        .catch(err => console.error(err))

}

//SELECTOR
export const selectCurrentReservation = (reservationId) => (state) =>
  state.reservations[reservationId] ? state.reservations[reservationId] : null;

//REDUCER
const reservationReducer = (state={}, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_RESERVATION:
            newState[action.reservation.id] = action.reservation
            return newState
        case RECEIVE_RESERVATIONS:
            // return action.reservations
            return action.reservations
        case REMOVE_RESERVATION:
            delete newState[action.reservationId]
            return newState
        default:
            return state
    }
}

export default reservationReducer