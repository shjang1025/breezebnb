import { csrfFetch } from "./csrfUtils"

export const postReview = reviewData => (
    csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(reviewData)
    })
)

export const editReview = reviewData => (
    csrfFetch( `/api/reviews/${reviewData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(reviewData)
    })
)

export const deleteReview = (reviewId) => (
    csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
)