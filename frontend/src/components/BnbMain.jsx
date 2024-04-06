import Navbar from "./Navbar"
import './BnbMain.css'
import { useEffect } from "react"
import { useState } from "react"

const BnbMain = props => {
    const[rooms, setRooms] = useState([])

    useEffect(()=> {
        fetchRoomsData();
    },[])

    useEffect(()=> {
        console.log(rooms)
    }, [rooms])

    const fetchRoomsData = async () => {
        try {
            const res = await fetch('/api/rooms')
            const data = await res.json()
            // console.log(data) //data is object

            //change data to array
            const roomsArray = Object.values(data);
            // console.log(roomsArray)
            setRooms(roomsArray)
        } catch(error) {
            console.error('Error fetching rooms:', error);
        }
    }


    return(
        <>
            <Navbar/>
            
            <div className="rooms-index-grid-container">
                <div className="rooms-index-grid">
                    {rooms.map((room, idx) => (
                        <div className="listing-item" key={idx}>
                            <div className="image-content">
                                {room.photoUrl && (
                                    <img className="room-photo" src={room.photoUrl}></img>
                                )}
                            </div>
                            <div className="location-info">
                                <p>{room.city}</p>
                            </div>
                            <div className="title-info">
                                <p>{room.title}</p>
                            </div>
                            <div className="price-info">
                                <p>${room.price}/night</p>
                            </div>
                        </div>
                    ))}
                    

                </div>
               
            </div>

        </>
    )
}

export default BnbMain