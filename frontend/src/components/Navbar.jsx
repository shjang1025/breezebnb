import { useDispatch, useSelector } from "react-redux"
import {fetchSession, logoutUser, selectCurrentUser } from "../store/sessionReducer"
import { useEffect, useState } from "react";
import './Navbar.css';
import {Link, useLocation} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBars, faCircleUser} from "@fortawesome/free-solid-svg-icons"
import {faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons"
import SessionModal from "./Modal/SessionModal";
import BottomSearchBar from "./SearchBar/BottomSearchBar"
import BreezebnbModal from './Modal/BreezebnbModal'
import { fetchRooms } from "../store/roomReducer";
import { fetchUsers } from "../store/userReducer";
import { fetchReservations } from "../store/reservationReducer";
import { fetchReviews } from "../store/reviewReducer";

const Navbar = () => {
    const location = useLocation()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRooms());
        dispatch(fetchUsers());
        dispatch(fetchReservations())
        dispatch(fetchReviews())
        dispatch(fetchSession())

    }, [dispatch]);


    //find currentUser
    const currentUser = useSelector(selectCurrentUser);
    const userId = currentUser ? currentUser.id : "";
    
    const [cu, setCu] = useState(currentUser)
    const [view, setView] = useState(false);
    const [modalState, setModalState] = useState(null)
    const [searchModal, setSearchModal] = useState(false)
    const[showSigninModal, setShowSigninModal] = useState(false)

    useEffect(() => {
        setCu(currentUser)
    },[currentUser,cu])

    const handleLogout = () => {
        dispatch(logoutUser())
            .then(() => {
                window.location.href = '/';
                setView(false)
                setCu(null)
            })

    }
    const handleSearchClick = () => {
        setSearchModal(!searchModal);
    };

    const handleBreezebnbClick = () => {
        if (!currentUser) {
            setShowSigninModal(true);
        }
    };

    const demoInfo1 = {
        email: "bbbb@test.com",
        password: "password"
    }
    const demoInfo2 = {
        email: "pppp@test.com",
        password: "password"
    }

    const dropDown = () => {
        if(!currentUser) {
            return(
                <div className="dropdown">
                    <ul>
                        <div>
                            <li id="login" onClick={() => setModalState('login')}>Login</li>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <li id="signup" onClick={() => setModalState('signup')}>Signup</li>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <li id="demo-login" onClick={() => dispatch(loginUser(demoInfo1))}>Demo Login 1</li>
                        </div>
                        <div>
                            <li id="demo-login" onClick={() => dispatch(loginUser(demoInfo2))}>Demo Login 2</li>
                        </div>
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="dropdown">
                    <ul>
                        <div className="to-trip-page">
                            <Link to={`/users/${userId}`}>
                                <li>Trips</li>
                            </Link>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <li id="logout" onClick={handleLogout}>Logout</li>
                        </div>
                    </ul>
                </div>

            )
        }
    }
    return(
        <>
            <div className="header-container">
                <header className="navbar">
                    <div className="navbar-container">
                        <div className="navbar-logo">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="48px">
                                    <path fill="#ff5252" d="M42.459,32.519c-1.037-3.336-9.539-19.596-12.12-24.5l-0.026-0.048C29.153,5.559,26.676,4,24,4 
                                    s-5.153,1.559-6.291,3.929L17.661,8.02C15.08,12.923,6.578,29.183,5.542,32.518C5.261,33.421,5,34.407,
                                    5,35.5 c0,4.687,3.813,8.5,8.5,8.5c4.654,0,7.612-1.949,10.5-5.184C26.888,42.051,29.846,44,34.5,44c4.687,
                                    0,8.5-3.813,8.5-8.5 C43,34.407,42.739,33.421,42.459,32.519z M23.999,34.662C22.33,32.515,20,28.881,20,
                                    26c0-2.206,1.794-4,4-4s4,1.794,4,4 C28,28.872,25.668,32.511,23.999,34.662z M34.5,41c-3.287,
                                    0-5.521-1.107-8.325-4.258C27.878,34.596,31,30.104,31,26 c0-3.86-3.141-7-7-7s-7,3.14-7,7c0,4.104,
                                    3.122,8.596,4.825,10.742C19.021,39.893,16.787,41,13.5,41C10.468,41,8,38.533,8,35.5 c0-0.653,0.162-1.308,
                                    0.406-2.09C9.17,30.95,15.3,18.948,20.316,9.417l0.076-0.146C21.055,7.891,22.471,7,24,7 s2.945,0.891,3.615,
                                    2.285l0.068,0.132C32.7,18.948,38.83,30.95,39.595,33.411C39.838,34.192,40,34.847,40,35.5 C40,38.533,37.532,
                                    41,34.5,41z"/>
                                </svg>
                            </li>
                            <li><Link to={'/'}>BreezeBnB</Link></li>
                        </div>
                        
                        <div className="navbar-explore">
                        </div>
                        <div className="navbar-menu">
                            <div className="room-hosting-links">
                                {currentUser ? (
                                    <Link to={'/host'} className="breezebnb-link">Breezebnb your home</Link>
                                ) : (
                                    <p className="breezebnb-link" onClick={handleBreezebnbClick}>Breezebnb your home</p>
                                )}
                            </div>
                            <div className="github">
                                <a href="https://github.com/shjang1025/breezebnb">
                                    <li>
                                        <FontAwesomeIcon icon={faGithub} size="xl" className="github-icon"/>
                                    </li>
                                </a>
                            </div>
                            <div className="linkedin">
                                <a href="https://www.linkedin.com/in/sohyun-jang-469918115/">
                                    <li>
                                        <FontAwesomeIcon icon={faLinkedin} size="xl" className="linkedin-icon"/>
                                    </li>
                                </a>
                            </div>
                            <button className='session-links' onClick={() => setView(!view)}>
                                <div className="menu-bars">
                                    <FontAwesomeIcon icon={faBars} size="xl"/>
                                    {view && dropDown()}
                                </div>
                                <div className="menu-dropdown">
                                    <FontAwesomeIcon icon={faCircleUser} size="2xl"/>
                                    {view && dropDown()}
                                </div>
                            </button>
                        </div>
                        {modalState && (<SessionModal modalState={modalState} setModalState={setModalState}/>)}
                        {showSigninModal && <BreezebnbModal onClose={() => setShowSigninModal(false)}/>}
                    </div>

                </header>
            </div>
            <BottomSearchBar searchModal={searchModal} handleSearchClick={handleSearchClick}/>
        </>          
        
        
    )
}

export default Navbar