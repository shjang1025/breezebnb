import Navbar from "../Navbar";
import './Trip.css'
import bnbphoto from '../../assets/trip.png'
import { selectCurrentUser } from "../../store/sessionReducer"
import { useSelector } from "react-redux"
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { destroyReservation } from "../../store/reservationReducer";
import { useState } from "react";
import EditModal from "./EditModal";

const Trip = props => {
    
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const user_id = currentUser.id
    const reservations = useSelector(state => state.reservations)
    const rooms = useSelector(state => state.rooms)
    const currentDate = new Date();
    
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

    // console.log(pastReservations)
    const [editModal, setEditModal] = useState(false)
    const [reservationId, setReservationId] = useState(null); // State to hold reservationId for EditReservationForm

    useEffect(() => {

    }, [user_id, reservations])
    const handleEditOpenClick = (reservationId) => {
        setEditModal(!editModal)
        setReservationId(reservationId)

    }
    useEffect(() => {
        console.log("RESERVATION ID IS CHANGED", reservationId)
    },[reservationId])
    
    console.log("Current Reservation" , currentReservations)

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
                            {currentReservations.length > 0 ? 
                                currentReservations.map(reservation => {

                                    const room = Object.values(rooms).find(room => room.id === reservation.roomId);
                                    if (!room) {
                                        return (<p key={reservation.id}>Loading..</p>)
                                    }
                                    return (
                                        <div className="booking-container" key={reservation.id}>
                                            <div className="button-container" >
                                                <button className="edit-button" onClick={() => handleEditOpenClick(reservation.id)}>Edit</button>
                                                <button className="delete-button" onClick={() => dispatch(destroyReservation(reservation.id))}>Delete</button>
                                            </div>
                                            <div className="booking-info-left">
                                                    <div className="current-reservation">
                                                        <div className="current-reservation-title">
                                                            <p>{room.title}</p>
                                                        </div>
                                                        <div className="reservation-details-container">
                                                            <div className="current-reservation-date">
                                                                {new Date(reservation.checkin) > currentDate && new Date(reservation.checkout) > currentDate &&
                                                                    <>
                                                                        <span>Reservation Date</span>
                                                                        <span>{reservation.checkin} </span>
                                                                        <span>  ~ {reservation.checkout}</span>
                                                                    </>
                                                                }
                                                            </div>
                                                            <div className="current-reservation-location">
                                                                <span>Location: </span>
                                                                <span>{reservation.address}, {reservation.city}</span>
                                                                <span>{reservation.state}</span>
                                                                <span>{reservation.country}</span>
                                                                
                                                            </div>
                                                            <div className="current-reservation-max">
                                                                <span><strong>Guests :</strong> {reservation.numGuests} people</span>
                                                                <span><strong>Nights :</strong> {reservation.nights} nights</span>
                                                                <span><strong>Total :</strong> ${reservation.totalCost}</span>

                                                            </div>

                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="bnb-photo">
                                                <div key={reservation.id} className="current-reservation">
                                                    {room && room.photoUrl && (
                                                        <img src={room.photoUrl} id="reservation-photo"  />
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                        
                                    );
                                })
                            
                                : 
                                <div className="no-reservation-container">
                                    <div className="no-reservation">
                                            <div className="current-no-reservation">
                                                <p>Currently you don't have any reservations</p>
                                            </div>
                                    </div>
                                    <div className="nobnb-photo">
                                        <img src={bnbphoto} id="bnb-photo" alt="Trip" />
                                    </div>
                                </div>
                            }
                            
                            
                        </div>
                    </div>
                    <div className="trip-history">
                        <div className="booking-history">Your Booking History</div>
                        {pastReservations.length > 0 ? 
                            pastReservations.map(reservation => {
                                const room = Object.values(rooms).find(room => room.id === reservation.roomId);
                                return (
                                    <div className="booking-container"  key={reservation.id}>
                                        <div className="booking-info-left">
                                        
                                            <div className="current-reservation">
                                                <div className="current-reservation-title">
                                                    <p>{room.title}</p>
                                                </div>
                                                <div className="reservation-details-container">
                                                    <div className="current-reservation-date">
                                                        {new Date(reservation.checkin) < currentDate && new Date(reservation.checkout) < currentDate &&
                                                            <>
                                                                <span>Reservation Date</span>
                                                                <span>{reservation.checkin} </span>
                                                                <span>  ~ {reservation.checkout}</span>
                                                            </>
                                                        }
                                                    </div>
                                                    <div className="current-reservation-location">
                                                        <span>Location: </span>
                                                        <span>{reservation.address}, {reservation.city}</span>
                                                        <span>{reservation.state}</span>
                                                        <span>{reservation.country}</span>
                                                        
                                                    </div>
                                                    <div className="current-reservation-max">
                                                        <span><strong>Guests :</strong> {reservation.numGuests} people</span>
                                                        <span><strong>Nights :</strong> {reservation.nights} nights</span>
                                                        <span><strong>Total :</strong> ${reservation.totalCost}</span>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="bnb-photo">
                                            <div key={reservation.id} className="current-reservation">
                                                {room && room.photoUrl && (
                                                    <img src={room.photoUrl} id="reservation-photo"  />
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                    
                                );
                            })
                        
                            : 
                            <div className="no-reservation-container">
                                <div className="no-reservation">
                                        <div className="current-reservation">
                                            <p>You have no booking history</p>
                                        </div>
                                </div>
                                <div className="nobnb-photo">
                                    <img src={bnbphoto} id="bnb-photo" alt="Trip" />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="trip-review">
                        Here, it will show the reviews that current user wrote
                    </div>
                </div>
            </div>
            {editModal && 

            <EditModal reservationId={reservationId} setEditModal={setEditModal}/>}
        </>
    )
}

export default Trip;