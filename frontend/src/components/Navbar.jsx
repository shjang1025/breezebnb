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

const Navbar = () => {
    const dispatch = useDispatch();
    //find currentUser
    const currentUser = useSelector(selectCurrentUser);
    const [view, setView] = useState(false);
    const [modalState, setModalState] = useState(null)
    
    const handleLogout = () => {
        dispatch(logoutUser());
        setView(false);
    }
    const handleLogin = (sessionInfo) => {
        setModalState('login')
        dispatch(loginUser(sessionInfo));
        setView(false);

    }

    const handleSignup = (userInfo) => {
        setModalState('signup')
        dispatch(createUser(userInfo));
        setView(false);

    }

    useEffect(() => {
        console.log('Session data changed', currentUser)
    },[currentUser])

    const dropDown = () => {
        if(!currentUser) {
            return(
                <div className="dropdown">
                    <li id="login" onClick={handleLogin}>Login</li>
                    <li id="signup" onClick={handleSignup}>Signup</li>
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
    // const sessionLinks = () => {
    //     if (currentUser) {
    //         return (
    //             <button className='session-links' onClick={() => setView(!view)}>
    //                 <span>
    //                     <FontAwesomeIcon icon={faBars}/>
    //                     {view && dropDown()}
                        
    //                 </span>
    //                 <span>
    //                     <FontAwesomeIcon icon={faUser}/>
    //                     {view && dropDown()}
    //                 </span>
    //             </button>
    //         )
    //     } else {
    //         return(
    //             <>
    //                 <button className='session-links' onClick={() => setView(!view)}>
    //                         <span>
    //                             <FontAwesomeIcon icon={faBars}/>
    //                             {view && dropDown()}
                                
    //                         </span>
    //                         <span>
    //                             <FontAwesomeIcon icon={faUser}/>
    //                             {view && dropDown()}
    //                         </span>
    //                 </button>
    //             </>
                  
    //         )
    //     }
    // }


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
                {/* {sessionLinks()} */}
                <button className='session-links' onClick={() => setView(!view)}>
                    <span>
                        <FontAwesomeIcon icon={faBars}/>
                        {view && dropDown()}
                        
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faUser}/>
                        {view && dropDown()}
                    </span>
                </button>
            </div>
            {modalState && (<SessionModal modalState={modalState} setModalState={setModalState} />)}
        </nav>
    )
}

export default Navbar