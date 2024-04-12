import { csrfFetch } from "./csrfUtils"

export const postReview = reviewData => (
    csrfFetch('/api/reservations', {
        method: 'POST',
        body: JSON.stringify(reviewData)
    })
)

export const editReview = reviewData => (
    csrfFetch( `/api/reservations/${reviewData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(reviewData)
    })
)

export const deleteReview = (reviewId) => (
    csrfFetch(`/api/reservations/${reviewId}`, {
        method: 'DELETE'
    })
)