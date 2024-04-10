import { csrfFetch } from "./csrfUtils"

export const postReservation = reservationData => (
    csrfFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify(reservationData)
    })
)

export const editReservation = reservationData => (
    csrfFetch( `/api/reservations/${reservationData.reservation.id}`, {
        method: 'PATCH',
        body: JSON.stringify(reservationData)
    })
)

export const deleteReservation = (reservationId) => (
    csrfFetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    })
)