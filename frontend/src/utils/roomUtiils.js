import { csrfFetch } from "./csrfUtils"

export const postRoom = roomData => (
    csrfFetch('/api/rooms', {
        method: 'POST',
        body: JSON.stringify(roomData)
    })
)

export const editRoom = roomData => (
    csrfFetch( `/api/rooms/${roomData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(roomData)
    })
)

export const deleteRoom = () => (
    csrfFetch('/api/session', {
        method: 'DELETE'
    })
)