import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './EditModal.css';
import { updateReservation } from "../../store/reservationReducer";
import DatePicker from "react-datepicker";
import { differenceInDays } from "date-fns"; 
import "react-datepicker/dist/react-datepicker.css";
 
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/sessionReducer";


const EditModal = ({reservationId, setEditModal, initialData}) => {
    
    const dispatch = useDispatch()

    const [viewDropdown, setViewDropdown] = useState(false);
    const reservations = useSelector(state => state.reservations)
    const rooms = useSelector(state => state.rooms)
    const currentUser = useSelector(selectCurrentUser);
    const users = useSelector(state => state.users)
    const [numGuests, setNumGuests] = useState(initialData ? initialData.numGuests : null);
    const [checkInDate, setCheckInDate] = useState(initialData ? initialData.checkin : null);
    const [checkOutDate, setCheckOutDate] = useState(initialData ? initialData.checkout : null);
    
    const reservationsArr = users[currentUser.id].reservationId
    const findRoom =(reservationId) => {

        for(let i = 0; i < reservationsArr.length; i++) {
            if(reservationsArr[i] === reservationId) {
                return (reservations[reservationId].roomId)
            }
        }
        return null;
    }

    useEffect(() => {
    },[reservationId])
    useEffect(()=> {
    },[dispatch])
    const handleArrowClick = () => {
        setViewDropdown(!viewDropdown)
    }

    const guestDropdown = () => {

        const handleGuestDivClick = (i) => {
            setNumGuests(i)
            setViewDropdown(!viewDropdown)
        }
        const guests = [];
        for(let i = 1; i <= rooms[findRoom(reservationId)].capacity; i++) {
            guests.push(<div key={i} className="num-guest" onClick={() => handleGuestDivClick(i)}>{i}</div>)
        }
        return guests
    }

    const isDateAvailable = date => {
        const roomReserved = Object.values(reservations).filter(reservation => reservation.reserved_room_id === findRoom(reservation.id));
        for(const reservation of roomReserved) {
            const startDate = new Date(reservation.checkin)
            const endDate = new Date(reservation.checkout)
            if(date >= startDate && date <= endDate) {
                return false
            }

        }
        return true
    }
    const daysCalculation = () => {
        if (checkInDate && checkOutDate) {
          return differenceInDays(checkOutDate, checkInDate);
        }
        return 0; // Default to 0 if either date is not set
    };
    const cleaningFeeRange = () => {
        if(rooms[findRoom(reservationId)].price <= 100) {
            return 20
        } else if (rooms[findRoom(reservationId)].price <= 170) {
            return 53
        } else if (rooms[findRoom(reservationId)].price <= 260) {
            return 72
        } else if (rooms[findRoom(reservationId)].price <= 400) {
            return 100
        } else if (rooms[findRoom(reservationId)].price <= 600) {
            return 120
        } else {
            return 150
        }
    }
    const handleEditClick = () => {
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

    return(
        <div className="edit-modal-background" onClick={() => setEditModal(false)}>
            <div className="edit-modal-content" onClick={e => e.stopPropagation()}>
                
                <div className="edit-form-subject">Edit your Reservation</div>
                    <div className="edit-form-inner-container">
                        <button className="edit-reservation-date-button">
                            <div className="left">
                                <div className="edit-checkin">
                                    <span className="edit-checkin-label"><p>Check-in</p></span>
                                </div>
                                <div className="edit-checkin-input">
                                    <DatePicker
                                        className="edit-date-picker-checkin"
                                        selected={checkInDate}
                                        onChange={(date) => setCheckInDate(date)}
                                        selectsStart
                                        startDate={checkInDate}
                                        endDate={checkOutDate}
                                        filterDate={isDateAvailable}
                                        placeholderText="Check-in"
                                        minDate={new Date()}
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <div className="edit-checkout">
                                    <span className="edit-checkout-label"><p>Check-out</p></span>
                                </div>
                                <div className="edit-checkout-input">
                                <DatePicker
                                    className="edit-date-picker"
                                    selected={checkOutDate}
                                    onChange={(date) => setCheckOutDate(date)}
                                    selectsEnd
                                    startDate={checkInDate}
                                    endDate={checkOutDate}
                                    filterDate={isDateAvailable}
                                    placeholderText="Check-out"
                                    minDate={checkInDate || new Date()}
                                />
                                </div>
                            </div>
                        </button>
                        <div className="edit-guest-dropdown">
                            <div className="edit-guest-dropdown-upper" onClick={handleArrowClick}>
                                <label className="edit-guest-picker"> 
                                    <div className="edit-guest-text"><p>Guests</p></div>
                                    <div className="edit-guest-select">
                                        <span>{numGuests} guests</span>
                                    </div>
                                </label>
                                <div className="edit-guest-dropdown-arrow" >
                                    <FontAwesomeIcon icon={faAngleDown} />
                                </div>
                            </div>
                            {viewDropdown && (
                                <div className="edit-guest-dropdown-content">
                                    {guestDropdown()}
                                </div>
                            )}
                        </div>
                        <div className="edit-reservation-button-container">
                                <div className="edit-button-container">
                                    <button onClick={handleEditClick}>
                                        Edit
                                    </button>
                                </div>
                                <div>
                                    You won't be charged yets
                                </div>
                        </div>
                        <div className="edit-reservation-fee-calculation">
                            <div className="edit-reservation-fee-upper-container">
                                <div className="edit-reservation-fee-left">
                                    <span className="edit-reservation-text">
                                        ${rooms[findRoom(reservationId)].price} x {daysCalculation()} nights
                                    </span>
                                    <span className="edit-reservation-text">
                                        Cleaning fee
                                    </span>
                                    <span className="edit-service-fee-text">
                                        Breezebnb Service fee
                                    </span>
                                    
                                </div>
                                <div className="edit-reservation-fee-right">
                                    <span className="reservation-text">
                                        ${rooms[findRoom(reservationId)].price * daysCalculation()}
                                    </span>
                                    <span className="edit-reservation-text">
                                        ${cleaningFeeRange()}
                                    </span>
                                    <span className="edit-reservation-text">
                                        ${30}
                                    </span>
                                    
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="edit-reservation-fee-below-cotainer">
                                <div className="edit-total">
                                    <div className="total-left">
                                        <span className="edit-reservation-text">
                                            Total before Taxes
                                        </span>
                                    </div>
                                    <div className="edit-total-right">
                                        <span className="edit-reservation-text">
                                            ${daysCalculation() * rooms[findRoom(reservationId)].price + cleaningFeeRange() + 30}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>

                    </div>


            </div>
        </div>
    )

}

export default EditModal