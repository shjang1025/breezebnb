import Navbar from "../Navbar";
import './Trip.css'
import bnbphoto from '../../assets/trip-big.png'
import { selectCurrentUser } from "../../store/sessionReducer"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EditModal from "./EditModal"
import ReviewModal from "./ReviewModal";
import { FaStar } from "react-icons/fa";
import { fetchReservation } from "../../store/reservationReducer";
import { destroyReservation, selectCurrentReservation } from "../../store/reservationReducer";
import { fetchReviews, selectReviewsByUserId } from "../../store/reviewReducer";
import { destroyReview } from "../../store/reviewReducer";
import Reservation from "./Reservation";
import PastReservation from './PastReservation'
import CurrentHosting from "./CurrentHosting";
import { fetchRooms } from "../../store/roomReducer";

const Trip = () => {
    
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser)
    const {user_id} = useParams();
    const [editModal, setEditModal] = useState(false)
    const [reservationId, setReservationId] = useState(null); // State to hold reservationId for EditReservationForm
    const [reviewId, setReviewId] = useState(null)
    const [reviewModal, setReviewModal] = useState(null)
    const currentReservation = useSelector(selectCurrentReservation(reservationId));
    const [viewCurrentReservation, setViewCurrentReservation] = useState('view-currnet-reservation')
    const [bookingHistory, setBookingHistory] = useState(null)
    const [hosting, setHosting] = useState(null)
    const [review, setReview] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState(null)


  

    const reservations = useSelector(state => state.reservations)
    const rooms = useSelector(state => state.rooms)
    const currentDate = new Date();
    const reviews = useSelector(state => state.reviews)
    useEffect(() => {

    }, [currentUser, reviews]);
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
    const currentReviewData = currentReviews.filter(ele => ele.id === reviewId)[0]
    
    useEffect(() => {
        dispatch(fetchRooms)
    }, [user_id, currentReviews])
    
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
    const handleReviewOpenClick = (roomId) => {
        setReviewModal('make-review')
        console.log(roomId)
        // setReviewId(reviewId)
        setSelectedRoom(roomId)
    }
    const handleReviewEditClick = ( roomId, reviewId, reservationId) => {
        setReviewModal('edit-review')
        setReviewId(reviewId)
        setReservationId(reservationId)
        setSelectedRoom(roomId)

    }
    const handleEditOpenClick = (reservationId) => {
        setEditModal(!editModal)
        setReservationId(reservationId)
        dispatch(fetchReservation(reservationId))
    }

    const handleCurrentReservationClick = () => {
        setViewCurrentReservation('view-currnet-reservation')
        setBookingHistory(null)
        setHosting(null)
        setReview(null)
    }
    const handleBookingClick = () => {
        setBookingHistory('view-booking-history')
        setViewCurrentReservation(null)
        setHosting(null)
        setReview(null)
    }
    const handleHostingClick = () => {
        setHosting('view-hosting')
        setViewCurrentReservation(null)
        setBookingHistory(null)
        setReview(null)
    }
    const handleReviewClick = () => {
        setReview('view-review')
        setHosting(null)
        setViewCurrentReservation(null)
        setBookingHistory(null)
    }
    if (!currentUser || !currentUser.id) {
        // Handle the case where currentUser or currentUser.id is not available
        return (
            <div>
                Loading...
            </div>
        );
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
                        <div className="select-trip">
                            <div className="booking-title" style={viewCurrentReservation ? { backgroundColor: '#FF385C', borderRadius: '50px', color: 'white' } : {}} onClick={handleCurrentReservationClick}>Current Reservations</div>
                            <div className="booking-history" style={bookingHistory ? { backgroundColor: '#FF385C', borderRadius: '50px', color: 'white' } : {}} onClick={handleBookingClick}>Booking History</div>
                            <div className="hostings-history" style={hosting ? { backgroundColor: '#FF385C', borderRadius: '50px', color: 'white' } : {}} onClick={handleHostingClick}>Hostings</div>
                            <div className="reviews-index-title" style={review ? { backgroundColor: '#FF385C', borderRadius: '50px', color: 'white' } : {}} onClick={handleReviewClick}>Reviews</div>
                        </div>

                        <div className="current-reservation-info-inner-container">
                            {viewCurrentReservation && <Reservation currentReservations={currentReservations} 
                            bnbphoto={bnbphoto}handleEditOpenClick={handleEditOpenClick} currentDate={currentDate} rooms={rooms}/>}
                        </div>
                        <div className="booking-history-info-inner-container">
                            {bookingHistory && <PastReservation currentUser={currentUser} pastReservations={pastReservations} bnbphoto={bnbphoto} handleReviewOpenClick={handleReviewOpenClick} rooms={rooms} currentDate={currentDate}/>}
                        </div>
                        <div className="hostings-info-inner-container">
                            {hosting && <CurrentHosting currentHostings={currentHostings} bnbphoto={bnbphoto}/>}
                        </div>

                        <div className="reviews-info-inner-container">
                        {review && currentReviews.length > 0 && currentReviews.map(review => {
                            const room = Object.values(rooms).find(room => room.id === review.reviewRoomId);
                            if (!room) {
                                return <p key={review.id}>Loading..</p>;
                            }
                            return (
                                <div className="reviews-index-container" key={review.id}>
                                    <div className="button-container">
                                        <button className="review-edit-button" onClick={() => handleReviewEditClick(room.id, review.id, reservationId)}>Edit</button>
                                        <button className="review-delete-button" onClick={() => dispatch(destroyReview(review.id, reservationId))}>Delete</button>
                                    </div>
                                    <div className="yes-reviews-inner">
                                        <div className="review-title-container">
                                            <div className="review-title">
                                                <div className="yes-reviews">{review.title}</div>
                                            </div>
                                        </div>
                                        <div className="review-title-below">
                                            <div className="review-description">
                                                <span><p>Description: </p></span>
                                                <span><p>{review.description}</p></span>
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
                                        <img src={room.photoUrl} id="review-photo" alt="Room" />
                                    </div>
                                </div>
                            );
                        })}

                        {review && currentReviews.length === 0 && 
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
                <EditModal reservationId={reservationId} setEditModal={setEditModal} initialData={currentReservation}/>}
            {reviewModal &&
                <ReviewModal selectedRoom={selectedRoom} reviewId={reviewId} reservationId={reservationId} setReviewModal={setReviewModal} initialReviewData={currentReviewData} reviewModal={reviewModal}/>
            }
        </>
    )
}

export default Trip;