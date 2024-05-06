import { destroyRoom, selectCurrentRoom } from "../../store/roomReducer";
import { Link } from "react-router-dom";
import './Trip.css'
import { useDispatch } from "react-redux";
import noPhoto from "../../assets/no-image.png"
const CurrentHosting = ({currentHostings, bnbphoto}) => {
    const dispatch = useDispatch();
    return(
        <div>
    {currentHostings.length > 0 ? 
        currentHostings.map(hosting => {
            return (
                <div className="yes-hostings-container" key={hosting.id}>
                    <div className="button-container" >
                        <Link to={`host/edit/${hosting.id}`}><button className="edit-button">Edit</button></Link>
                        <button className="delete-button" onClick={() => dispatch(destroyRoom(hosting.id))}>Delete</button>
                    </div>
                    <div className="yes-hostings-inner">
                        <div className="hosting-title">
                            <div className="yes-hostings">
                                {hosting.title}
                            </div>
                        </div>
                        <div className="hosting-title-below">
                            <div className="location">
                                <span>
                                    <p>Location: </p>
                                </span>
                                <span>
                                    <p>
                                    {hosting.address}, {hosting.city}
                                    </p>
                                    <p> 
                                    {hosting.state}, {hosting.country}
                                    </p>
                                </span>
                            </div>
                            <div className="other-info">
                                <span>{hosting.beds} beds, {hosting.rooms} rooms, {hosting.baths} baths</span>
                                <span>Maximum guests: {hosting.capacity}</span>
                                <span>${hosting.price} / night</span>
                            </div>
                        </div>
                    </div>
                    <div className="hosting-photo">
                        {hosting.photoUrl ? (
                            <img src={hosting.photoUrl} id="hosting-photo" />
                        ): (
                            <img src={noPhoto} id="hosting-photo" />
                        )}
                    </div>
                </div>
            )
    })
    : 
        <div className="no-hostings"> 
            <div className="no-current-reservation">
                <p>You have no Hostings</p>
            </div>
            <div className="no-hosting-photo">
                <img src={bnbphoto} id="bnb-photo" alt="Trip" />
            </div>
        </div>
    }
    </div>
    )
}

export default CurrentHosting