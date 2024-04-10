import { useParams } from "react-router"
import Navbar from "../Navbar"
import "./ListingsShow.css"
import { useState, useEffect } from "react"
import {faSquareParking, faTv, faIgloo, faTemperatureArrowUp,faChevronLeft, faChevronRight,
    faShirt, faSocks, faWifi, faSink, faFireBurner,faFire,faDog, faAngleDown} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { differenceInDays } from "date-fns"; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectCurrentUser } from "../../store/sessionReducer"
import { useSelector } from "react-redux"

const ListingsShow = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isLoggedin = !!currentUser;

    const {room_id} = useParams();
    const currentRoom = useSelector(state => state.rooms[room_id])
    const reservations = useSelector(state => state.reservations);
    const [errors, setErrors] = useState('')
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [username, setUsername] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numGuests, setNumGuests] = useState(null);
    const [viewDropdown, setViewDropdown] = useState(false);

    useEffect(() => {

    },[])

    useEffect(() => {
        fetchRoomData(room_id)
        console.log("Current Room is!!!!!!!!!!! ", currentRoom)
    }, [room_id])

    useEffect(() => {
        if (selectedRoom) {
            // console.log("Host ID:", selectedRoom.ownerId); 
            fetchUserData(selectedRoom.ownerId);
        }
    }, [selectedRoom]);
    
    const fetchRoomData = async (roomId) => {
        try {
            const res = await fetch(`/api/rooms/${roomId}`)
            const data = await res.json()
            setSelectedRoom(data.rooms)
            
        } catch(error) { 
            console.error('Error fetching rooms:', error);
        }
    }
    const fetchUserData = async (userId) => {
        try {
            const res = await fetch(`/api/users/${userId}`);
            const data = await res.json();
            setUsername(data.username); //this needs to be edited ?? 
        } catch(error) {
            console.error('Error fetching user data:', error);
        }
    }
    useEffect(() => {
        
    }, [fetchRoomData, fetchUserData])

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
                console.log(data.error)
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

    const handleArrowClick = () => {
        setViewDropdown(!viewDropdown)
    }
    
    const guestDropdown = () => {

        const handleGuestDivClick = (i) => {
            setNumGuests(i)
            setViewDropdown(!viewDropdown)
        }
        const guests = [];
        for(let i = 1; i <= selectedRoom.capacity; i++) {
            guests.push(<div key={i} className="num-guest" onClick={() => handleGuestDivClick(i)}>{i}</div>)
        }
        return guests;
    }
    const isDateAvailable = date => {
        const roomReserved = Object.values(reservations).filter(reservation => reservation.reserved_room_id === room_id);
        for(const reservation of roomReserved) {
            const startDate = new Date(reservation.checkin)
            const endDate = new Date(reservation.checkout)
            if(date >= startDate && date <= endDate) {
                return false
            }

        }
        return true
    }
    return(
        <>
            <Navbar/>
            {selectedRoom ? (
                <div className="listings-show-container">
                    <div className="listing-title">
                        <h1>{selectedRoom.title}</h1>
                    </div>
                    <div className="listing-details">
                        <p>{selectedRoom.address}, {selectedRoom.city}, {selectedRoom.state}, {selectedRoom.country}</p>
                    </div>

                    <div className="listing-photo-container">
                        <div className="representing-photo">
                            <img className="listing-show-photo" src={selectedRoom.photoUrl}/>
                        </div>
                        <div className="listing-photo-grid">
                            <div className="grid-photo 1"></div>
                            <div className="grid-photo 2"></div>
                            <div className="grid-photo 3"></div>
                            <div className="grid-photo 4"></div>
                        </div>
                    </div>
                    <div className="details-wrapper">
                        <div className="details-main">
                            <div className="details-left">
                                <div className="details-left-host">
                                   <div className="host-info">
                                        <p>Whole Cabin hosted by {username}</p>
                                        <p>{selectedRoom.capacity} guests · {selectedRoom.rooms} bedrooms · 
                                            {selectedRoom.beds} beds · {selectedRoom.baths} baths</p>
                                   </div>
                                   <div className="host-profile">
                                        <h2>profile pic here</h2>
                                   </div>
                                </div>
                                <div className="details-left-amenities">
                                    <h2>What this place offers</h2>
                                    <ul>
                                        {Object.entries(selectedRoom.amenities).map(([amenity, value], idx) => (
                                            // Only render the <li> if the value is true
                                            value &&
                                            <li key={idx} className="amenity-item">
                                            {amenity === 'parking' && value && <FontAwesomeIcon icon={faSquareParking} size="xl" className="amenity-icon"/>}
                                            {amenity === 'washer' && value && <FontAwesomeIcon icon={faShirt} size="xl" className="amenity-icon"/>}
                                            {amenity === 'dryer' && value && <FontAwesomeIcon icon={faSocks} size="xl" className="amenity-icon"/>}
                                            {amenity === 'tv' && value && <FontAwesomeIcon icon={faTv} size="xl" className="amenity-icon"/>}
                                            {amenity === 'ac' && value && <FontAwesomeIcon icon={faIgloo} size="xl" className="amenity-icon"/>}
                                            {amenity === 'heater' && value && <FontAwesomeIcon icon={faTemperatureArrowUp} size="xl" className="amenity-icon"/>}
                                            {amenity === 'wifi' && value && <FontAwesomeIcon icon={faWifi} size="xl" className="amenity-icon"/>}
                                            {amenity === 'kitchen' && value && <FontAwesomeIcon icon={faSink} size="xl" className="amenity-icon"/>}
                                            {amenity === 'microwave' && value && <FontAwesomeIcon icon={faFireBurner} size="xl" className="amenity-icon"/>}
                                            {amenity === 'fireplace' && value && <FontAwesomeIcon icon={faFire} size="xl" className="amenity-icon"/>}
                                            {amenity === 'pets' && value && <FontAwesomeIcon icon={faDog} size="xl" className="amenity-icon"/>}
                                            {amenity}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="details-left-description">
                                    <p id="description">{selectedRoom.description}</p>
                                </div>

                                <div className="where-you-sleep-container">
                                    <div className="where-you-sleep">
                                        <span>
                                            <p>Where you sleep</p>
                                        </span>
                                        <div className="sleep-buttons-container">
                                            <span>1 / 3</span>
                                            <div className="sleep-button" >
                                                <FontAwesomeIcon icon={faChevronLeft} className="arrow-icon" aria-label="Previous"/>
                                            </div>
                                            <div className="sleep-button" >
                                                <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" aria-label="Next"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sleep-photo-carousel-container">
                                        <div className="sleep-photo-carousel">
                                            <div className="carousel-photo">
                                                1
                                            </div>
                                            <div className="carousel-photo">
                                                2
                                            </div>
                                            <div className="carousel-photo">
                                                3
                                            </div>
                                            <div className="carousel-photo">
                                                4
                                            </div>
                                            <div className="carousel-photo">
                                                5
                                            </div>
                                            <div className="carousel-photo">
                                                6
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="details-right">
                                <div className="reservation-outer-container">
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

    
                                    </div>
                                    {errors && 
                                        <div className="date-error-message">
                                            <p>* {errors}</p>
                                        </div>
                                    }

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
                            </div>
                        </div>

                    </div>
                </div>

                ) : (
                    <p>Loading...</p>
                )}
               
        </>
    )
}


export default ListingsShow 