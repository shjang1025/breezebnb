import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './ReviewModal.css';
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/sessionReducer";
import { createReview, selectReview, selectReviewsArray, updateReview } from "../../store/reviewReducer";
import { FaStar } from "react-icons/fa";
import { selectRoomByReview } from "../../store/roomReducer";
const ReviewModal = ({reservationId, reviewId, setReviewModal, initialReviewData, reviewModal}) => {
    const dispatch = useDispatch()
    const reservations = useSelector(state => state.reservations)
    const rooms = useSelector(state => state.rooms)
    const currentUser = useSelector(selectCurrentUser);
    const users = useSelector(state => state.users)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const ARRAY = [0,1,2,3,4]
    const [cleanliness, setCleanliness] = useState(0)
    const [accuracy, setAccuracy] = useState(0)
    const [communication, setCommunication] = useState(0)
    const [location, setLocation] = useState(0)
    const [value, setValue] = useState(0)

    const cleanlinessStarScore = clickedIndex => {
        const count = clickedIndex + 1; 
        setCleanliness(count);
    }
    const accuracyStarScore = clickedIndex => {
        const count = clickedIndex + 1;
        setAccuracy(count);
    }
    const communicationStarScore = clickedIndex => {
        const count = clickedIndex + 1;
        setCommunication(count);
    }
    
    const locationStarScore = clickedIndex => {
        const count = clickedIndex + 1;
        setLocation(count);
    }
    
    const valueStarScore = clickedIndex => {
        const count = clickedIndex + 1;
        setValue(count);
    }

    //user's reservations arr
    const reservationsArr = users[currentUser.id].reservationId 
    const reviewsArr = users[currentUser.id].reviewId
    
    const findRoom =(reservationId) => {
        for(let i = 0; i < reservationsArr.length; i++) {
            if(reservationsArr[i] === reservationId) {
                return (reservations[reservationId].roomId)
            }
        }
        return null;
    }
    useEffect(() => {
    },[reviewId])
    useEffect(()=> {
    },[dispatch])
    useEffect(() => {

    }, [cleanliness, accuracy, communication, location, value])
    useEffect(() => {
        if (initialReviewData) {
            // console.log("ID is",initialReviewData.id);
            setTitle(initialReviewData.title || '');
            setDescription(initialReviewData.description || '');
            setCleanliness(initialReviewData.cleanliness || 0);
            setAccuracy(initialReviewData.accuracy || 0);
            setCommunication(initialReviewData.communication || 0);
            setLocation(initialReviewData.location || 0);
            setValue(initialReviewData.value || 0);
        }
    }, [initialReviewData]);
    console.log(reviewId)
    const roomId = useSelector(selectRoomByReview(reviewId))
    useEffect(() => {
        console.log(">>>>>>",roomId)
    }, [roomId])
    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            
                id: reviewId,
                title: title,
                description: description,
                cleanliness: cleanliness,
                accuracy: accuracy,
                communication: communication,
                location: location,
                value: value,
                reviewer_id: currentUser.id, 
                review_room_id: roomId
            
        }
        console.log("REVIEWDATA",reviewData)
        if(reviewModal === 'edit-review') {
            dispatch(updateReview(reviewId, reviewData))
        } else {
            dispatch(createReview(reviewData));
        }
        setReviewModal(null)
    }

    return(
        <div className="edit-modal-background" onClick={() => setReviewModal(null)}>
            <div className="edit-modal-content" onClick={e => e.stopPropagation()}>
                <div className="review-form-subject">Make a Review</div>
                <div className="review-inner-container">
                    <form className="review-form-inner-container" onSubmit={handleSubmit}>
                        <label className="review-title-label">Title: 
                            <div className="review-title">
                                <input 
                                    className="review-title-input" 
                                    type="text" 
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Title" />
                            </div>

                        </label>
                        <label className="review-description-label">Description: 
                            <div className="review-description">
                                <textarea rows="10" cols="50"
                                    className="review-description"
                                    type="textarea"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Description"
                                />
                            </div>
                        </label>
                        <div className="star-section">
                            {/* Cleanliness */}
                            <label className="cleanliness">Cleanliness:
                            <span>
                                {ARRAY.map((el, idx) => (
                                    <FaStar
                                        className="star"
                                        key={idx}
                                        size="20"
                                        style={{ fill: idx < cleanliness ? '#f6e825' : '#808080', backgroundColor: 'white' }}
                                        onClick={() => cleanlinessStarScore(idx)}
                                    />
                                ))}

                            </span>
                            </label>
                            {/* Accuracy */}
                            <label className="accuracy">Accuracy: 
                            <span>
                                {ARRAY.map((el, idx) => (
                                    <FaStar
                                        className="star"
                                        key={idx}
                                        size="20"
                                        style={{ fill: idx < accuracy ? '#f6e825' : '#808080', backgroundColor: 'white' }}
                                        onClick={() => accuracyStarScore(idx)}
                                    />
                                ))}
                            </span>
                            </label>

                            {/* Communication */}
                            <label className="communication">Communication: 
                            <span>
                                {ARRAY.map((el, idx) => (
                                    <FaStar
                                        className="star"
                                        key={idx}
                                        size="20"
                                        style={{ fill: idx < communication ? '#f6e825' : '#808080', backgroundColor: 'white' }}
                                        onClick={() => communicationStarScore(idx)}
                                    />
                                ))}
                            </span>
                            </label>

                            {/* Location */}
                            <label className="review-location">Location: 
                            <span>
                                {ARRAY.map((el, idx) => (
                                    <FaStar
                                        className="star"
                                        key={idx}
                                        size="20"
                                        style={{ fill: idx < location ? '#f6e825' : '#808080', backgroundColor: 'white' }}
                                        onClick={() => locationStarScore(idx)}
                                    />
                                ))}
                            </span>
                            </label>

                            {/* Value */}
                            <label className="value">Value:
                            <span>
                                {ARRAY.map((el, idx) => (
                                    <FaStar
                                        className="star"
                                        key={idx}
                                        size="20"
                                        style={{ fill: idx < value ? '#f6e825' : '#808080', backgroundColor: 'white' }}
                                        onClick={() => valueStarScore(idx)}
                                    />
                                ))}
                            </span>
                            </label>

                        </div>
                        <div className="review-submit-container">

                            <button className="review-submit" type="submit">{reviewModal === 'edit-review' ? 'Update' : 'Submit'}</button>
                        </div>
                    </form>
                </div>
                

            </div>
        </div>
    )

}

export default ReviewModal