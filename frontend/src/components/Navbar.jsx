import { useDispatch, useSelector } from "react-redux"
import {logoutUser, loginUser, createUser, selectCurrentUser } from "../store/sessionReducer"
import { useEffect, useState } from "react";
import './Navbar.css';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser} from "@fortawesome/free-regular-svg-icons"
import {faAirbnb} from "@fortawesome/free-brands-svg-icons"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import SessionModal from "./SessionModal";
import SearchBar from "./TopSearchBar";
import BottomSearchBar from "./BottomSearchBar";
import TopSearchBar from "./TopSearchBar";

const Navbar = () => {

    const dispatch = useDispatch();
    //find currentUser
    const currentUser = useSelector(selectCurrentUser);
    const [view, setView] = useState(false);
    const [modalState, setModalState] = useState(null)

    const [searchModal, setSearchModal] = useState(false)

    const handleLogout = () => {
        dispatch(logoutUser());
        setView(false);
    }
    const handleSearchClick = () => {
        setSearchModal(!searchModal);
    };

    useEffect(() => {
        console.log('Session data changed', currentUser)
    },[currentUser])

    const dropDown = () => {
        if(!currentUser) {
            return(
                <div className="dropdown">
                    <li id="login" onClick={() => setModalState('login')}>Login</li>
                    <li id="signup" onClick={() => setModalState('signup')}>Signup</li>
                </div>
            )
        } else {
            return (
                <div className="dropdown">
                    <li id="logout" onClick={handleLogout}>Logout</li>
                </div>

            )
        }
    }
    return(
        //outer div contains logo , and categories  
        <>
            <div className="header-container">
                <header className="navbar">
                    <div className="navbar-container">
                        <div className="navbar-logo">
                            <li><FontAwesomeIcon icon={faAirbnb} size="xl"/></li>
                            <li><Link to={'/'}>BreezeBnB</Link></li>
                        </div>
                        <div className="navbar-explore">
                            <TopSearchBar searchModal={searchModal} handleSearchClick={handleSearchClick}/>
                        </div>
                        <div className="navbar-menu">
                            {/* {sessionLinks()} */}
                            <button className='session-links' onClick={() => setView(!view)}>
                                <div className="menu-bars">
                                    <FontAwesomeIcon icon={faBars} size="xl"/>
                                    {view && dropDown()}
                                    
                                </div>
                                <div className="menu-dropdown">
                                    <FontAwesomeIcon icon={faUser} size="xl"/>
                                    {view && dropDown()}
                                </div>
                            </button>
                        </div>
                        {modalState && (<SessionModal modalState={modalState} setModalState={setModalState}/>)}
                    </div>

                </header>
            </div>
            <BottomSearchBar searchModal={searchModal} handleSearchClick={handleSearchClick}/>
        </>          
        
        
    )
}

export default Navbar