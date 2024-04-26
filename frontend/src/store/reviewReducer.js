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

export const fetchReviews = () => async dispatch => {
    try {
        const res = await fetch('/api/reviews')
        if(res.ok) {
            const data = await res.json()
            dispatch(receiveReviews(data))

        } else {
            throw new Error (`Failed to fetch revies: ${res.statusText}`)
        }
    } catch(err) {
        console.error(err)
    }
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
export const updateReview = (reviewId, reviewData) => async dispatch => {
    try {
        const res = await editReview(reviewId, reviewData)
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
// export const selectCurrentReview = reviewId => state => state.reviews[reviewId] ? state.reviews[reviewId] : null;
export const selectReviewsArray = state => Object.values(state.reviews)
export const selectReview = (reviewId => state => state.reviews[reviewId] ? state.reviews[reviewId] : null )
export const selectReviewByRoom = (roomId => state =>  {
    return Object.values(state.reviews).filter(review => review.reviewRoomId === roomId)
})
export const selectReviewsByUserId = (userId) => (state) => {
    return Object.values(state.reviews).filter(review => review.reviewerId === userId);
};
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
