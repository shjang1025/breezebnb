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

export const editRoom = (roomData, roomId) => (
    fetch(`/api/rooms/${roomId}`, {
        method: 'PATCH',
        //no stringify with formData
        body: roomData,
        headers: {
            'X-CSRF-Token': sessionStorage.getItem('X-CSRF-Token'),
            'Accept' : 'application/json'
        }
    })
    
)

export const deleteRoom = roomId => (
    csrfFetch(`/api/rooms/${roomId}`, {
        method: 'DELETE'
    })
)