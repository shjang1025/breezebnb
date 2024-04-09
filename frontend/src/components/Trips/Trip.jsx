import Navbar from "../Navbar";
import './Trip.css'
import bnbphoto from '../../assets/trip.png'
import { selectCurrentUser } from "../../store/sessionReducer"
import { useSelector } from "react-redux"

const Trip = props => {
    // const currentUser = useSelector(selectCurrentUser);
    
    return(
        <>
            <Navbar/>

            <div className="trip-outer-container">
                <div className="trip-inner-container">
                    <div className="trip-header">
                        <div className="trip-header-title">
                            <p>Trips</p>
                        </div>
                        <div className="booking-info">
                            <div className="booking-info-left">
                                <span>
                                    <p>if reservation exists? display here</p>
                                    <p>if there's no reservation, show button to start searching</p>
                                </span>
                            </div>
                            <div className="bnb-photo">
                                <img src={bnbphoto} id="bnb-photo" alt="Trip" />
                            </div>
                        </div>
                    </div>
                    <div className="trip-history">
                        Here, it will show the booked history
                    </div>
                    <div className="trip-review">
                        Here, it will show the reviews that current user wrote
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trip;