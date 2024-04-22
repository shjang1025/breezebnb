import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import { differenceInDays } from "date-fns"; 
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../store/sessionReducer"

const ReservationDate = ({DatePicker, selectedRoom, guestDropdown, 
                        setCheckInDate, setCheckOutDate, checkInDate, 
                        checkOutDate, isDateAvailable,
                        handleArrowClick, numGuests, viewDropdown}) => {
    
    const currentUser = useSelector(selectCurrentUser);
    const isLoggedin = !!currentUser;

    const daysCalculation = () => {
        if (checkInDate && checkOutDate) {
            return differenceInDays(checkOutDate, checkInDate);
        }
        return 0; // Default to 0 if either date is not set
    };

    const cleaningFeeRange = () => {
        if(selectedRoom.price <= 100) {
            return 20
        } else if (selectedRoom.price <= 170) {
            return 53
        } else if (selectedRoom.price <= 260) {
            return 72
        } else if (selectedRoom.price <= 400) {
            return 100
        } else if (selectedRoom.price <= 600) {
            return 120
        } else {
            return 150
        }
    }
    const handleReserveClick = () => {
        const reservationData = {
            reservation:{
                num_guests: numGuests, 
                checkin: checkInDate, 
                checkout: checkOutDate, 
                reserved_person_id: currentUser.id, 
                reserved_room_id: room_id
            }
        }
        fetch('/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': sessionStorage.getItem('X-CSRF-Token')
            },
            body: JSON.stringify(reservationData)
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                setErrors(data.error);
            } else {
                setErrors('')
            }
        })
        .catch(error => {
            console.error(error)
        })

        setNumGuests(null)
        setCheckInDate(null)
        setCheckOutDate(null)
    }
    return(
        <div className="reservation-container">
            <div className="price-per-night">
                <p><span className="bold-text">${selectedRoom.price}</span> night</p>
            </div>
            <button className="reservation-date-button">
                <div className="left">
                    <div className="checkin">
                        <span className="checkin-label">Check-in</span>
                    </div>
                    <div className="checkin-input">
                        <DatePicker
                            className="date-picker"
                            selected={checkInDate}
                            onChange={(date) => setCheckInDate(date)}
                            selectsStart
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            filterDate={isDateAvailable}
                            placeholderText="Check-in"
                            minDate={new Date()} // Disable past dates
                        />
                    </div>
                </div>
                <div className="right">
                    <div className="checkout">
                        <span className="checkout-label">Check-out</span>
                    </div>
                    <div className="checkout-input">
                    <DatePicker
                        className="date-picker"
                        selected={checkOutDate}
                        onChange={(date) => setCheckOutDate(date)}
                        selectsEnd
                        startDate={checkInDate}
                        endDate={checkOutDate}
                        filterDate={isDateAvailable}
                        placeholderText="Check-out"
                        minDate={checkInDate || new Date()} // Disable past dates and dates before check-in
                    />
                    </div>
                </div>
            </button>
            <div className="guest-dropdown">
                <div className="guest-dropdown-upper" onClick={handleArrowClick}>
                    <label className="guest-picker"> 
                        <div className="guest-text">Guests</div>
                        <div className="guest-select">
                            <span>{numGuests} guests</span>
                        </div>
                    </label>
                    <div className="guest-dropdown-arrow" >
                        <FontAwesomeIcon icon={faAngleDown} />
                    </div>
                </div>
                {viewDropdown && (
                    <div className="guest-dropdown-content">
                        {guestDropdown()}
                    </div>
                )}
            </div>
            <div className="reservation-button-container">
                    <div className="button-container" 
                        onClick={handleReserveClick}>
                        <button disabled={!isLoggedin}>
                            {currentUser === null ? 'Need to Login':'Reserve'}
                        </button>
                    </div>
                    <div>
                        You won't be charged yet
                    </div>
            </div>
            <div className="reservation-fee-calculation">
                <div className="reservation-fee-upper-container">
                    <div className="reservation-fee-left">
                        <span className="reservation-text">
                            ${selectedRoom.price} x {daysCalculation()} nights
                        </span>
                        <span className="reservation-text">
                            Cleaning fee
                        </span>
                        <span className="service-fee-text">
                            Breezebnb Service fee
                        </span>
                        
                    </div>
                    <div className="reservation-fee-right">
                        <span className="reservation-text">
                            ${selectedRoom.price * daysCalculation()}
                        </span>
                        <span className="reservation-text">
                            ${cleaningFeeRange()}
                        </span>
                        <span className="reservation-text">
                            ${30}
                        </span>
                        
                    </div>
                </div>
                <div className="divider"></div>
                <div className="reservation-fee-below-cotainer">
                    <div className="total">
                        <div className="total-left">
                            <span className="reservation-text">
                                Total before Taxes
                            </span>
                        </div>
                        <div className="total-right">
                            <span className="reservation-text">
                                ${daysCalculation() * selectedRoom.price + cleaningFeeRange() + 30}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default ReservationDate