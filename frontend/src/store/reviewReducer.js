import { postReview, editReview, deleteReview } from "../utils/reviewUtils"

//CONSTANT
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW'
export const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS'
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

//ACTION CREATOR
export const receiveReview = review => ({
    type: RECEIVE_REVIEW, 
    review
})
export const receiveReviews = reviews => ({
    type: RECEIVE_REVIEWS, 
    reviews
})
export const removeReview = reviewId => ({
    type: REMOVE_REVIEW, 
    reviewId
})

// THUNK ACTION CREATOR

export const fetchReview = (reviewId) => dispatch => {
    fetch(`/api/reviews/${reviewId}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw res
            }
        })
        .then(data => dispatch(receiveReview(data)))
        .catch(err => console.error(err))
}

export const fetchReviews = () => dispatch => {
    fetch(`/api/reviews`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(`Failed to fetch reviews: ${res.statusText}`);
            }
        })
        .then(data => dispatch(receiveReviews(data)))
        .catch(err => console.error(err))
}
export const createReview = reviewData => async dispatch => {
    try {
        const res = await postReview(reviewData)
        if (res.ok) {
            const data = await res.json()
            dispatch(receiveReview(data))
        } else {
            throw res;
        }

    } catch(error) {
        console.error(error)
    }
}
export const updateReview = reviewData => async dispatch => {
    try {
        const res = await editReview(reviewData)
        if (res.ok) {
            const data = await res.json()
            dispatch(receiveReview(data))
        } else {
            throw res;
        }

    } catch(error) {
        console.error(error)
    }
}
export const destroyReview = reviewId => dispatch => {
    deleteReview(reviewId)
        .then(res => {
            if(res.ok) {
                dispatch(removeReview(reviewId))
            } else {
                throw res;
            }
        })
        .catch(err => console.error(err))
}

//SELECTOR
export const selectReviewsArray = state => Object.values(state.reviews)
export const selectReview = (reviewId => state => state.reviews[reviewId] ? state.reviews[reviewId] : null )
//REDUCER

const reviewReducer = (state={}, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_REVIEW:
            newState[action.review.id] = action.review
            return newState
        case RECEIVE_REVIEWS:
            return action.reviews
        case REMOVE_REVIEW:
            delete newState[action.reviewId]
            return newState
        default:
            return state
    }
}
export default reviewReducer
