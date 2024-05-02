import Navbar from "../Navbar.jsx"
import './BnbMain.css'
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

const BnbMain = props => {
    const [selectedRoom, setSelectedRoom] = useState(null)
    const[rooms, setRooms] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const roomsPerPage = 8;

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(()=> {
        fetchRoomsData();
    },[])

    useEffect(()=> {
    }, [rooms])
    

    const roomsToDisplay = selectedCategory ? filteredRooms : rooms;

    const handlePhotoClick = async (room) => {
        setSelectedRoom(room)
    }
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if(category === 'all') {
            let categoryRooms = rooms
            setFilteredRooms(categoryRooms);

        } else {
            let categoryRooms = rooms.filter(room => room.category === category);
            setFilteredRooms(categoryRooms);

        }
    };

    const fetchRoomsData = async () => {
        try {
            const res = await fetch('/api/rooms')
            const data = await res.json()
            const roomsArray = Object.values(data);
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
    const currentRooms = roomsToDisplay.slice(idxFirstRoom, idxLastRoom)

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(roomsToDisplay.length / roomsPerPage); i++) {
        pageNumbers.push(i);
    }

    const groupedRooms = rooms;
    rooms.forEach(room => {
        if (!groupedRooms[room.category]) {
            groupedRooms[room.category] = [];
        }
        groupedRooms[room.category].push(room);
    });

    return(
        <>
            <Navbar/>
            <div className="divider"></div>
            <div className="category-search-bar">
                <div className="category-all" onClick={() => handleCategoryClick('all')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg" alt="" width="28" height="28"/>
                    <div>All</div>
                </div>
                <div className="category-omg" onClick={() => handleCategoryClick('omg')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg" alt="" width="28" height="28"/>
                    <div>omg</div>
                </div>
                <div className="category-beach-front" onClick={() => handleCategoryClick('beach_front')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg" alt="" width="28" height="28"/>
                    <div>beach-front</div>
                </div>
                <div className="category-amazing-views" onClick={() => handleCategoryClick('amazing_views')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" alt="" width="28" height="28"/>
                    <div>amazing-views</div>
                </div>
                <div className="category-lake-front" onClick={() => handleCategoryClick('lake_front')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg" alt="" width="28" height="28"/>
                    <div>lake-front</div>
                </div>
                <div className="category-amazing-pools" onClick={() => handleCategoryClick('amazing_pools')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg" alt="" width="28" height="28"/>
                    <div>amazing-pools</div>
                </div>
                    <div className="category-national-park" onClick={() => handleCategoryClick('national_park')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg" alt="" width="28" height="28"/>
                    <div>national-park</div>
                </div>  
                <div className="category-camping" onClick={() => handleCategoryClick('camping')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg" alt="" width="28" height="28"/>
                    <div>camping</div>
                </div>
                <div className="category-design" onClick={() => handleCategoryClick('design')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg" alt="" width="28" height="28"/>
                    <div>design</div>
                </div>
                <div className="category-skiing" onClick={() => handleCategoryClick('skiing')}>
                    <img id="hover-effect" className="i181yxiv atm_j3_1osqo2v atm_vy_1o8jidz atm_e2_1wugsn5 
                    atm_d2_2ec48i atm_fg_1h6ojuz atm_k4_1d1puqj atm_uc_15ib22x atm_ui_idpfg4__1rrf6b5 dir dir-ltr" 
                    src="https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg" alt="" width="28" height="28"/>
                    <div>skiing</div>
                </div>
            </div>
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