import { useSelector } from "react-redux"
import { postRoom } from "../utils/roomUtiils"
import { deleteRoom } from "../utils/roomUtiils"
import { editRoom } from "../utils/roomUtiils"
//CONSTANT
const RECEIVE_ROOM = 'rooms/RECEIVE_ROOM'
const RECEIVE_ROOMS = 'rooms/RECEIVE_ROOMS'
const REMOVE_ROOM = 'rooms/REMOVE_ROOM'
//ACTION CREATOR

export const receiveRoom = room => ({
    type: RECEIVE_ROOM,
    room
})

export const receiveRooms = rooms => ({
    type: RECEIVE_ROOMS,
    rooms
})

export const removeRoom = roomId => ({
    type: REMOVE_ROOM, 
    roomId
})

// SELECTOR
// THUNK ACTION CREATOR
export const fetchRooms = () => async dispatch => {
    try {
        const res = await fetch('/api/rooms')
        if(res.ok) {
            const data = await res.json();
            dispatch(receiveRooms(data))
        } else {
            throw res
        }
    }
    catch (error) {
        console.error(error)
    }
}

export const fetchRoom = roomId => async dispatch => {
    try {
        const res = await fetch(`/api/rooms/${roomId}`)
        if(res.ok) {
            const data = res.json();
            dispatch(receiveRoom(data))
        } else {
            throw res
        }
    }
    catch(error){
        console.error(error)
    }
}

export const createRoom = roomData => dispatch => {
    postRoom(roomData)
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => dispatch(receiveRoom(data)))
        .catch(err => console.error(err))
}

export const updateRoom = (roomData, roomID) =>  dispatch => {
    editRoom(roomData, roomID)
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => dispatch(receiveRoom(data)))
        .catch(err => console.error(err))
}

export const destroyRoom = roomId => dispatch => {
    deleteRoom(roomId)
        .then(res => {
            if (res.ok) {
                dispatch(removeRoom(roomId))
            } else {
                throw res
            }
        })
        .catch(err => console.error(err))
}
//SELECTOR

export const selectCurrentRoom = roomId => state => state.rooms[roomId] ? state.rooms[roomId] : null;
// REDUCER

const roomReducer = (state={}, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_ROOM:
            newState[action.room.id]= action.room
            return newState
        case RECEIVE_ROOMS:
            return action.rooms
        case REMOVE_ROOM:
            delete newState[action.roomId]
            return newState
        default:
            return state
    }
}

export default roomReducer