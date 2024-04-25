import { useParams } from "react-router"
import Navbar from "../Navbar"
import "./ListingsShow.css"
import { useState, useEffect } from "react"
import {faSquareParking, faTv, faIgloo, faTemperatureArrowUp,
    faShirt, faSocks, faWifi, faSink, faFireBurner,faFire,faDog, faAngleDown} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux"
import BnbMap from "./BnbMap"
import { selectCurrentRoom } from "../../store/roomReducer"
import { FaStar } from "react-icons/fa";
import Review from "./Review"
import ReservationDate from "./ReservationDate"

const ListingsShow = () => {
    const {room_id} = useParams();
    const apiKey = sessionStorage.getItem('API-Key')
    const currentRoom = useSelector(selectCurrentRoom(room_id))
    const reservations = useSelector(state => state.reservations);
    const [errors, setErrors] = useState('')
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [username, setUsername] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numGuests, setNumGuests] = useState(null);
    const [viewDropdown, setViewDropdown] = useState(false);
    const [latLng, setLatLng] = useState(null);
    useEffect(() => {
        fetchRoomData(room_id)
    }, [room_id])

    const fetchLatLng = async (compactAddress) => {
        try {
            const fullAddress = encodeURIComponent(compactAddress)
            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddress}&key=${sessionStorage.getItem('API-Key')}`)
            
            if (!res.ok) {
                throw res
            }
            const data = await res.json()
            if (data.status !== 'OK') throw new Error('Geocoding request failed')
            
            const location = data.results[0].geometry.location;
            setLatLng({lat: location.lat, lng: location.lng});

        }catch(error) {
            console.error('Error:', error.message)
            setLatLng(null)
        }
    }
    
    useEffect(() => {
        if (currentRoom) {
            setSelectedRoom(currentRoom);
            fetchLatLng(fullAddress(currentRoom));
        } else {
            setSelectedRoom(null)
        }
    }, [currentRoom]);

    
    const fetchRoomData = async (roomId) => {
        try {
            const res = await fetch(`/api/rooms/${roomId}`)
            const data = await res.json()
            setSelectedRoom(data)
            
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

    const fullAddress = (room) => {
        if (!room) {
            return "Address information not available";
        }
        const { address, city, state, country } = room;
        return `${address}, ${city}, ${state}, ${country}`;
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
    const reviews = useSelector(state => state.reviews);
    if (!reviews) return null;

    function calculateOverallRatingsForRooms(reviews) {
        const overallRatingsByRoom = {};
        if(reviews) {
            for (const key in reviews) {
                const review = reviews[key];
                const roomId = review.reviewRoomId;
                
                if (!overallRatingsByRoom[roomId]) {
                    overallRatingsByRoom[roomId] = {
                    cleanliness: 0,
                    accuracy: 0,
                    location: 0,
                    value: 0,
                    communication: 0,
                    numReviews: 0
                    };
                }
              
                overallRatingsByRoom[roomId].cleanliness += review.cleanliness;
                overallRatingsByRoom[roomId].accuracy += review.accuracy;
                overallRatingsByRoom[roomId].location += review.location;
                overallRatingsByRoom[roomId].value += review.value;
                overallRatingsByRoom[roomId].communication += review.communication;
                overallRatingsByRoom[roomId].numReviews++;
            }
        }
        
        // Calculate average ratings for each room
        for (const roomId in overallRatingsByRoom) {
            const ratings = overallRatingsByRoom[roomId];
            const numReviews = ratings.numReviews;
            
            ratings.cleanliness = parseFloat((ratings.cleanliness / numReviews).toFixed(1));
            ratings.accuracy = parseFloat((ratings.accuracy / numReviews).toFixed(1));
            ratings.location = parseFloat((ratings.location / numReviews).toFixed(1));
            ratings.value = parseFloat((ratings.value / numReviews).toFixed(1));
            ratings.communication = parseFloat((ratings.communication / numReviews).toFixed(1));
            if (numReviews > 0) {
                ratings.overallRating = parseFloat(((ratings.cleanliness + ratings.accuracy + ratings.location + ratings.value + ratings.communication) / 5).toFixed(1));
            } else {
                ratings.overallRating = 0;
            }
        }
        
        return overallRatingsByRoom;
      }
    const reviewsByRoom = calculateOverallRatingsForRooms(reviews);

    function hasRoomIdAsKey(reviewsByRoom) {
        for (const roomId in reviewsByRoom) {
          if (reviewsByRoom.hasOwnProperty(roomId) && roomId === reviewsByRoom[roomId].room_id) {
            return true;
          }
        }
        return false;
    }
    

    useEffect(() => {
        if (reviews) {
            calculateOverallRatingsForRooms(reviews)
        }
    }, [reviews]);


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
                        {/* <div className="listing-photo-grid">
                            <div className="grid-photo 1"></div>
                            <div className="grid-photo 2"></div>
                            <div className="grid-photo 3"></div>
                            <div className="grid-photo 4"></div>
                        </div> */}
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
                                   </div>
                                </div>
                                <div className="details-left-amenities">
                                    <h2>What this place offers</h2>
                                    <ul>
                                        {Object.entries(selectedRoom.amenities).map(([amenity, value], idx) => (
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
                            </div>
                            <div className="details-right">
                                <div className="reservation-outer-container">
                                    <ReservationDate DatePicker={DatePicker} selectedRoom={selectedRoom} 
                                        guestDropdown={guestDropdown} setCheckInDate={setCheckInDate} checkInDate={checkInDate} 
                                        checkOutDate={checkOutDate} setCheckOutDate={setCheckOutDate} isDateAvailable={isDateAvailable}
                                        handleArrowClick={handleArrowClick} numGuests={numGuests} viewDropdown={viewDropdown}/>
                                    {errors && 
                                        <div className="date-error-message">
                                            <p>* {errors}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="reviews-container">
                        <div className="reviews-inner-container">
                            <Review reviewsByRoom={reviewsByRoom} hasRoomIdAsKey={hasRoomIdAsKey} room_id={room_id} FaStar={FaStar}/>
                        </div>
                    </div>
                    <div className="map-container">
                        <div className="map-title">
                            <span>
                                <p>Where you'll be</p>
                            </span>
                            <span>
                                <p>{fullAddress(currentRoom)}</p>
                            </span>
                        </div>
                        <div className="map-inner-content">
                        
                        </div>
                        {latLng && <BnbMap latitude={latLng.lat} longitude={latLng.lng} currentRoom={currentRoom} apiKey={apiKey}/>}
                    </div>
                </div>

                ) : (
                    <p>Loading...</p>
            )}   
        </>
    )
}


export default ListingsShow 