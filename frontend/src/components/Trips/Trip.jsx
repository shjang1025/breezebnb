import Navbar from "../Navbar";
import './Trip.css'
import bnbphoto from '../../assets/trip.png'
import { selectCurrentUser } from "../../store/sessionReducer"
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import EditModal from "./EditModal"
import ReviewModal from "./ReviewModal";
import { FaStar } from "react-icons/fa";
import { destroyReview } from "../../store/reviewReducer";
import Reservation from "./Reservation";
import PastReservation from './PastReservation'
import CurrentHosting from "./CurrentHosting";

const Trip = () => {
    
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const user_id = currentUser.id
    const reservations = useSelector(state => state.reservations)
    const rooms = useSelector(state => state.rooms)
    const currentDate = new Date();
    const reviews = useSelector(state => state.reviews)
    const currentReservations = Object.values(reservations).filter(
                                reservation => {
                                    const checkinDate = new Date(reservation.checkin);
                                    const checkoutDate = new Date(reservation.checkout);
                                    return(
                                        reservation.reserverId === currentUser.id &&
                                        (checkinDate > currentDate && checkoutDate > currentDate))
    });
    
    const pastReservations = Object.values(reservations).filter(
                            reservation => {
                                const checkinDate = new Date(reservation.checkin);
                                const checkoutDate = new Date(reservation.checkout);
                                return(
                                    reservation.reserverId === currentUser.id &&
                                    (checkinDate < currentDate && checkoutDate < currentDate))
    });

    
    const currentHostings = Object.values(rooms)
                            .filter(room => currentUser?.roomId?.includes(room.id))
    const currentReviews = Object.values(reviews).filter(review => Array.isArray(currentUser.reviewId) && currentUser.reviewId.includes(review.id));
    

    
    const [editModal, setEditModal] = useState(false)
    const [reservationId, setReservationId] = useState(null); // State to hold reservationId for EditReservationForm
    const [reviewModal, setReviewModal] =useState(false)


    useEffect(() => {

    }, [user_id, reservations,reviews])
    
    useEffect(() => {
    }, [rooms])

    
    useEffect(() => {
    },[reservationId])
    const starNumber = (n) => {
        if(n === 5) {
            return (
                <>
                <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                </>
                
            )
        } else if(n === 4) {
            return (
                <>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                </>
            )
        } else if (n === 3) {
            return (
                <>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                </>
            )
        } else if (n === 2) {
            return(
                <>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
            
                </>
            )
        } else if (n === 1) {
            return(
                    <FaStar size="20" style={{ fill: '#f6e825', backgroundColor: 'white' }}/>
            )
        }
    }
    const handleReviewOpenClick = (reservationId) => {
        setReviewModal(!reviewModal)
        setReservationId(reservationId)
    }
    const handleEditOpenClick = (reservationId) => {
        setEditModal(!editModal)
        setReservationId(reservationId)

    }
    return(
        <>
            <Navbar/>

            <div className="trip-outer-container">
                <div className="trip-inner-container">
                    <div className="trip-header">
                        <div className="trip-header-title">
                            <p>Trips</p>
                        </div>
                        <div className="booking-info">
                            <div className="booking-title">Your Current Reservations</div>
                             <Reservation currentReservations={currentReservations} bnbphoto={bnbphoto}handleEditOpenClick={handleEditOpenClick}/>
                        </div>
                    </div>
                    <div className="trip-history">
                        <div className="booking-history">Your Booking History</div>
                        <PastReservation pastReservations={pastReservations} bnbphoto={bnbphoto} handleReviewOpenClick={handleReviewOpenClick}/>
                    </div>

                    <div className="hostings-info-container">
                        <div className="hostings-history">Your Hostings</div>
                        <div className="hostings-info-inner-container">
                            <CurrentHosting currentHostings={currentHostings} bnbphoto={bnbphoto}/>
                        </div>
                    </div>
                    <div className="reviews-info-container">

                        <div className="reviews-index-title">Your Reviews</div>
                        <div className="reviews-info-inner-container">
                            
                            {currentReviews.length > 0 ?
                                currentReviews.map(review => {
                                    const room = Object.values(rooms).find(room => room.id === review.reviewRoomId);
                                    if (!room) {
                                        return (<p key={review.id}>Loading..</p>)
                                    }
                                   return(
                                    
                                    <div className="reviews-index-container" key={review.id}>
                                        <div className="button-container" >
                                                <button className="review-edit-button" onClick={() => handleReviewOpenClick(review.id)}>Edit</button>
                                                <button className="review-delete-button" onClick={() => dispatch(destroyReview(review.id))}>Delete</button>
                                        </div>
                                        <div className="yes-reviews-inner">
                                            <div className="review-title-container">
                                                <div className="review-title">
                                                    <div className="yes-reviews">
                                                        {review.title}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-title-below">
                                                <div className="review-description">
                                                    <span>
                                                        <p>Description: </p>
                                                    </span>
                                                    <span>
                                                        <p>
                                                            {review.description}
                                                        </p>
                                                    </span>
                                                </div>
                                                <div className="other-info">
                                                    <span>Cleanliness: {starNumber(review.cleanliness)}</span>
                                                    <span>Accuracy: {starNumber(review.accuracy)}</span>
                                                    <span>Communication: {starNumber(review.communication)}</span>
                                                    <span>Location: {starNumber(review.location)}</span>
                                                    <span>Value: {starNumber(review.value)}</span>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review-photo">
                                            <img src={room.photoUrl} id="review-photo" />
                                        </div>
                                    </div>
                                   )
                                })
                            :
                                <div className="no-reviews">
                                    <div className="no-review-content">
                                        <p>You have no reviews</p>
                                    </div>
                                    <div className="no-hosting-photo">
                                        <img src={bnbphoto} id="bnb-photo" alt="Trip" />
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            
            {editModal && 

            <EditModal reservationId={reservationId} setEditModal={setEditModal}/>}
            {reviewModal &&
                <ReviewModal reservationId={reservationId} setReviewModal={setReviewModal}/>
            }
        </>
    )
}

export default Trip;