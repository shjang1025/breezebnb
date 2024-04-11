import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddRoomForm from "./addRoomForm";
import { selectCurrentRoom } from "../../store/roomReducer";

const EditHostForm = () => {
    const {host_id} = useParams();
    const currentRoom = useSelector(selectCurrentRoom(host_id));

    console.log(host_id)
    console.log("Current Room fetched?",currentRoom)
    
    return <AddRoomForm mode='edit' initialHostData={currentRoom} roomId={host_id}/>;
}

export default EditHostForm;