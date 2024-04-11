import { useSelector } from "react-redux"
import { postRoom } from "../utils/roomUtiils"
import { deleteRoom } from "../utils/roomUtiils"
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
    console.log(roomData) //ok
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

export const updateRoom = roomData => async dispatch => {
    try {
        const res = fetch(`/api/rooms/${roomData.id}`, {
            method: 'PATCH',
            body: JSON.stringify(roomData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(res.ok) {
            const room = res.json();
            dispatch(receiveRoom(room))
        } else {
            throw res
        }
    }
    catch (error) {
        console.error(error)
    }
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