import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReviewModal from "./ReviewModal";
import { selectReview } from "../../store/reviewReducer";
const EditReviewModal = ({reviewId}) => {
    const currentReview = useSelector(selectReview(reviewId))
    
    return <ReviewModal initialReviewData={currentReview} reviewId={reviewId}/>;
}
export default EditReviewModal