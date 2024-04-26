import './Trip.css'

const pastReservations = ({pastReservations, bnbphoto, handleReviewOpenClick, rooms, currentDate}) => {
    return(
        <div>
    {pastReservations.length > 0 ? 
        pastReservations.map(reservation => {
            const room = Object.values(rooms).find(room => room.id === reservation.roomId);
            if (!room) {
                return (<p key={reservation.id}>Loading..</p>)
            }                                
            return (
                <div className="booking-container" key={reservation.id}>
                    <div className="button-container" >
                        <button className="review-button" onClick={() => handleReviewOpenClick(reservation.id)}>Make a Review</button>
                    </div>
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
    )
}

export default pastReservations