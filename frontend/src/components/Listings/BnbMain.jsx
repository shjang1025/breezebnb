import Navbar from "../Navbar.jsx"
import './BnbMain.css'
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const BnbMain = props => {
    const [selectedRoom, setSelectedRoom] = useState(null)
    const navigate = useNavigate();
    const[rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const roomsPerPage = 15;
    // const roomsPerLine = 5;
    

    useEffect(()=> {
        fetchRoomsData();
    },[])

    useEffect(()=> {
        // console.log(rooms)
    }, [rooms])
    


    const handlePhotoClick = async (room) => {
        // console.log(room)
        setSelectedRoom(room)
    }
    
    const fetchRoomsData = async () => {
        try {
            const res = await fetch('/api/rooms')
            const data = await res.json()
            //change data to array
            const roomsArray = Object.values(data);
            // console.log(roomsArray)
            setRooms(roomsArray)
        } catch(error) {
            console.error('Error fetching rooms:', error);
        }
    }
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const idxLastRoom = currentPage * roomsPerPage
    const idxFirstRoom = idxLastRoom - roomsPerPage
    const currentRooms = rooms.slice(idxFirstRoom, idxLastRoom)

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(rooms.length / roomsPerPage); i++) {
        pageNumbers.push(i);
    }


    return(
        <>
            <Navbar/>
            
            <div className="rooms-index-grid-container">
                <div className="rooms-index-grid">
                    {currentRooms.map((room, idx) => (
                        
                            <div className="listing-item" key={idx}>
                                <div className="image-content">
                                    {room.photoUrl && (
                                        <Link key={idx} to={{ pathname: `/listings/${room.id}`, state: { room: room } }}>
                                            <img className="room-photo" src={room.photoUrl} onClick={() => handlePhotoClick(room)}></img>
                                        </Link>
                                    )}
                                </div>
                                <div className="location-info">
                                    <p>{room.city}</p>
                                </div>
                                <div className="title-info">
                                    <p>{room.title}</p>
                                </div>
                                <div className="price-info">
                                    <p>${room.price} / night</p>
                                </div>
                            </div>
                    ))}
                </div>
                <div className="pagination">
                    {pageNumbers.map((number) => (
                        <button key={number} onClick={() => handlePageChange(number)}>
                            {number}
                        </button>
                    ))}
                </div>
            </div>
            
        </>
    )
}

export default BnbMain