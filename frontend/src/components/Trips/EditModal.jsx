import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './EditModal.css';
import { updateReservation } from "../../store/reservationReducer";
import "./EditReservationForm.css"
import DatePicker from "react-datepicker";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/sessionReducer";


const EditModal = ({reservationId, setEditModal}) => {
    
    const dispatch = useDispatch()
    const [reservationEdit, setReservationEdit] = useState({
        checkin: '',
        checkout: '',
        numGuests: 0
    })
    const [viewDropdown, setViewDropdown] = useState(false);
    const reservations = useSelector(state => state.reservations)
    const rooms = useSelector(state => state.rooms)
    const currentUser = useSelector(selectCurrentUser);
    const users = useSelector(state => state.users)
    const [numGuests, setNumGuests] = useState(null);
    const [errors, setErrors] = useState('')
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const reservationsArr = users[currentUser.id].reservationId //[1,5]

    const findRoom =(reservationId) => {
        // console.log(reservationsArr)
        // console.log(viewDropdown)
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

    useEffect(() => {
        console.log(reservationsArr)
    },[])

    useEffect (() => {

    },[reservationEdit])

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
        return guests;
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

    const handleEditClick = () => {
        const reservationData = {
            checkin: checkInDate,
            checkout: checkOutDate,
            numGuests: numGuests
        }
        dispatch(updateReservation(reservationData))
    }
    return(
        <div className="modal-background" onClick={() => setEditModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                
                <div className="edit-form-subject">Edit your Reservation</div>
                    <div className="edit-form-inner-container">
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
                                        minDate={new Date()}
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
                                    minDate={checkInDate || new Date()}
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
                        {/* {errors && 
                            <div className="date-error-message">
                                <p>* {errors}</p>
                            </div>
                        } */}

                        <div className="reservation-button-container">
                                <div className="button-container">
                                    <button >
                                        Edit
                                    </button>
                                </div>
                                <div>
                                    You won't be charged yet
                                </div>
                        </div>
                        {/* <div className="reservation-fee-calculation">
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
                            
                            
                        </div> */}

                    </div>


            </div>
        </div>
    )

}

export default EditModal