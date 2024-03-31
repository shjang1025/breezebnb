import { useDispatch, useSelector } from "react-redux"
import {logoutUser, selectCurrentUser } from "../store/sessionReducer"
import { useState } from "react";
import './Navbar.css';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser} from "@fortawesome/free-regular-svg-icons"
import {faAirbnb} from "@fortawesome/free-brands-svg-icons"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import SessionModal from "./SessionModal";

const Navbar = () => {
    const dispatch = useDispatch();
    //find currentUser
    const currentUser = useSelector(selectCurrentUser);
    const [view, setView] = useState(false);
    const [modalState, setModalState] = useState(null)
    

    const dropDown = () => (
        <div className="dropdown">
            <li id="login" onClick={() => setModalState('login')}>Login</li>
            <li id="signup" onClick={() => setModalState('signup')}>Signup</li>
        </div>
    )
    const sessionLinks = () => {
        if (currentUser) {
            return (
                <li className='session-links'>
                    <p>Hello {currentUser.username}</p>
                    <button onClick={() => dispatch(logoutUser())}>Logout</button>
                </li>
            )
        } else {
            return(
                <>
                    {/* <li className='session-links'
                        onClick={() => setModalState('login')}>
                            <FontAwesomeIcon icon={faBars}/>
                            <FontAwesomeIcon icon={faUser}/>
                    </li> */}
                    <button className='session-links' onClick={() => setView(!view)}>
                        <li>
                            <FontAwesomeIcon icon={faBars}/>
                            {view && dropDown()}
                            
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faUser}/>
                            {view && dropDown()}
                        </li>
                    </button>
                </>
                  
            )
        }
    }
    
    return(
        <nav className="navbar">
            <div className="navbar-logo">
                <li><FontAwesomeIcon icon={faAirbnb}/></li>
                <li><Link to={'/'}>BreezeBnB</Link></li>
            </div>
            <div className="navbar-explore">
                <li>Stays</li>
            </div>
            <div className="navbar-menu">
                {sessionLinks()}
            </div>
            {modalState && (<SessionModal modalState={modalState} setModalState={setModalState} />)}
        </nav>
    )
}

export default Navbar