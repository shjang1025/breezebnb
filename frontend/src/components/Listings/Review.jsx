import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleCheck, faSprayCan,faComments,faMap,faTag} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux";
import { selectReviewByRoom } from "../../store/reviewReducer";
const Review = ({reviewsByRoom, hasRoomIdAsKey, room_id, FaStar}) => {
    const reviewByRoom = useSelector(selectReviewByRoom(room_id))

    return(
        <div>
            {!reviewsByRoom ? (
                <div>Loading...</div>
            ):(
                hasRoomIdAsKey(reviewsByRoom) ? (
                    <div className="review-result">
                        <span>
                            <p>There is no review</p>
                        </span>
                    </div>
                ):(
                    <>
                    {reviewsByRoom[room_id] ? (  
                        <>
                            <div className="review-result-container">
                                <div className="review-result">
                                    <p><FaStar size="35" style={{fill: "#f6e825", backgroundColor: "white"}}/></p> 
                                    <p>
                                        {reviewsByRoom[room_id].overallRating ? reviewsByRoom[room_id].overallRating : 0} /  
                                        {reviewsByRoom[room_id].numReviews} Reviews
                                    </p>                                       
                                </div>
                            </div>
                            <div className="review-details-container">
                                <div className="review-details-cleanliness">
                                    <span>
                                        Cleanliness
                                    </span>
                                    <span>
                                        {reviewsByRoom[room_id].cleanliness}
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faSprayCan} size="xl"/>
                                    </span> 
                                </div>
                                <div className="review-details-accuracy">
                                    <span>
                                        Accuracy
                                    </span>
                                    <span>
                                        {reviewsByRoom[room_id].accuracy}
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faCircleCheck} size="xl"/>
                                    </span>     
                                </div>
                                <div className="review-details-communication">
                                    <span>
                                        Communication
                                    </span>
                                    <span>
                                        {reviewsByRoom[room_id].communication}
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faComments} size="xl"/>
                                    </span>     
                                </div>
                                <div className="review-details-location">
                                    <span>
                                        Location
                                    </span>
                                    <span>
                                        {reviewsByRoom[room_id].location}
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faMap} size="xl"/>
                                    </span>     
                                </div>
                                <div className="review-details-value">
                                    <span>
                                        Value
                                    </span>
                                    <span>
                                        {reviewsByRoom[room_id].value}
                                    </span> 
                                    <span>
                                        <FontAwesomeIcon icon={faTag} size="xl"/>
                                    </span>   
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="no-review-title">
                            <p>No reviews available for this room 😭</p>
                        </div>
                    )}
                    </>
                    )
            )}
        </div>
    )
}

export default Review