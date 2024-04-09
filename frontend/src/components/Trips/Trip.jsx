import Navbar from "../Navbar";
import './Trip.css'
import bnbphoto from '../../assets/trip.png'
import { selectCurrentUser } from "../../store/sessionReducer"
import { useSelector } from "react-redux"

const Trip = props => {
    const currentUser = useSelector(selectCurrentUser);
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
    console.log(pastReservations)
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
                                    return (
                                        <div className="booking-container">
                                            <div className="booking-info-left">
                                            
                                                    <div key={reservation.id} className="current-reservation">
                                                    <div className="current-reservation-title">
                                                        <p>{room.title}</p>
                                                    </div>
                                                    <div className="current-reservation-date">
                                                        {new Date(reservation.checkin) > currentDate && new Date(reservation.checkout) > currentDate &&
                                                            <p>{reservation.checkin} - {reservation.checkout}</p>
                                                        }
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
                                    <div className="booking-container">
                                        <div className="booking-info-left">
                                        
                                                <div key={reservation.id} className="current-reservation">
                                                <div className="current-reservation-title">
                                                    <p>{room.title}</p>
                                                </div>
                                                <div className="current-reservation-date">
                                                    {new Date(reservation.checkin) < currentDate && new Date(reservation.checkout) < currentDate &&
                                                        <p>{reservation.checkin} - {reservation.checkout}</p>
                                                    }
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
        </>
    )
}

export default Trip;