import { useParams } from "react-router"
import Navbar from "../Navbar"
import "./ListingsShow.css"
import { useState, useEffect } from "react"

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
                                <h2>Whole Cabin hosted by {username}</h2>

                            </div>
                            <div className="details-right">

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
