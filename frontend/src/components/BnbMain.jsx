import Navbar from "./Navbar"
import './BnbMain.css'
import { useEffect } from "react"
import { useState } from "react"

const BnbMain = props => {
    const[rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const roomsPerPage = 12;
    const roomsPerLine = 4;

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