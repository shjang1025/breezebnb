import { csrfFetch } from "./csrfUtils"

export const postRoom = roomData => (
    fetch('/api/rooms', {
        method: 'POST',
        //no stringify with formData
        body: roomData,
        headers: {
            'X-CSRF-Token': sessionStorage.getItem('X-CSRF-Token'),
            'Accept' : 'application/json'
        }
    })
)

export const editRoom = roomData => (
    csrfFetch( `/api/rooms/${roomData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(roomData) 
    })
)

export const deleteRoom = roomId => (
    csrfFetch(`/api/rooms/${roomId}`, {
        method: 'DELETE'
    })
)