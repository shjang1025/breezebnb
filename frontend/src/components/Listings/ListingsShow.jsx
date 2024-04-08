import { useParams } from "react-router"
import Navbar from "../Navbar"
import "./ListingsShow.css"
import { useState, useEffect } from "react"
import {faSquareParking, faTv, faIgloo, faTemperatureArrowUp,faChevronLeft, faChevronRight,
    faShirt, faSocks, faWifi, faSink, faFireBurner,faFire,faDog} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListingsShow = () => {
    const {room_id} = useParams();
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        fetchRoomData(room_id)
    }, [room_id])


    useEffect(() => {
        if (selectedRoom) {
            console.log("Host ID:", selectedRoom.ownerId); 
            fetchUserData(selectedRoom.ownerId);
        }
    }, [selectedRoom]);

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
            setUsername(data.username);
        } catch(error) {
            console.error('Error fetching user data:', error);
        }
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
                                <p>Reservation to be continued...</p>
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
