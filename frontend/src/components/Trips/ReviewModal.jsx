import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './ReviewModal.css';
import { updateReservation } from "../../store/reservationReducer";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/sessionReducer";


const ReviewModal = ({reservationId, setReviewModal}) => {
    const ARRAY = [0,1,2,3,4]
    const dispatch = useDispatch()

    const [viewDropdown, setViewDropdown] = useState(false);
    const reservations = useSelector(state => state.reservations)
    const rooms = useSelector(state => state.rooms)
    const currentUser = useSelector(selectCurrentUser);
    const users = useSelector(state => state.users)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cleanliness, setCleanliness] = useState([false, false, false, false, false])
    const [accuracy, setAccuracy] = useState([false, false, false, false, false])
    const [communication, setCommunication] = useState([false, false, false, false, false])
    const [location, setLocation] = useState([false, false, false, false, false])
    const [value, setValue] = useState([false, false, false, false, false])

    const reservationsArr = users[currentUser.id].reservationId //[1,5]
    const findRoom =(reservationId) => {

        for(let i = 0; i < reservationsArr.length; i++) {
            if(reservationsArr[i] === reservationId) {
                return (reservations[reservationId].roomId)
            }
        }
        return null;
    }

    useEffect(() => {
        console.log("??????????/", reservationId)
    },[reservationId])
    useEffect(()=> {
    },[dispatch])
    const handleArrowClick = () => {
        setViewDropdown(!viewDropdown)
    }

    const handleReviewClick = () => {
        const reservationData = {
            reservation: {
                id: reservationId,
                checkin: checkInDate,
                checkout: checkOutDate,
                numGuests: numGuests,
                reserved_person_id: currentUser.id, 
                reserved_room_id: rooms[findRoom(reservationId)].id
            }
        }
        dispatch(updateReservation(reservationData));
        setEditModal(false)
    }
    const cleanStarScore = index => {
        let star = [...cleanliness];
        for(let i = 0; i < 5; i++) {
            star[i] = i <= index ? true: false
        }
        setCleanliness(star)
    }

    return(
        <div className="edit-modal-background" onClick={() => setReviewModal(false)}>
            <div className="edit-modal-content" onClick={e => e.stopPropagation()}>
                <div className="review-form-subject">Make a Review</div>
                <div className="review-inner-container">
                    <form className="review-form-inner-container">
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
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Description"
                                />
                            </div>
                        </label>
                        <div className="star-section">
                            <label className="cleanliness">Cleanliness: 
                                {ARRAY.map((el, idx) => (
                                    <FaStar key={idx} size="20" style={{ color: 'white', backgroundColor: 'transparent' }} />
                                    )                                
                                )}
                            </label>
                            <label className="accuracy">Accuracy: 
                                {ARRAY.map((el, idx) => (
                                    <FaStar key={idx} size="20" style={{ color: 'white', backgroundColor: 'transparent' }} />
                                    )                                
                                )}
                            </label>
                            <label className="communication">Communication: 
                                {ARRAY.map((el, idx) => (
                                    <FaStar key={idx} size="20" style={{ color: 'white', backgroundColor: 'transparent' }} />
                                    )                                
                                )}
                            </label>
                            <label className="review-location">Location: 
                                {ARRAY.map((el, idx) => (
                                    <FaStar key={idx} size="20" style={{ color: 'white', backgroundColor: 'transparent' }} />
                                    )                                
                                )}
                            </label>
                            <label className="value">Value: 
                                {ARRAY.map((el, idx) => (
                                    <FaStar key={idx} size="20" style={{ color: 'white', backgroundColor: 'transparent' }} />
                                    )                                
                                )}
                            </label>
                        </div>
                        <div className="review-submit-container">

                            <button className="review-submit" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                

            </div>
        </div>
    )

}

export default ReviewModal