import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/sessionReducer";
import './addRoomForm.css'
import { useState } from "react";
import {faSquareParking, faTv, faIgloo, faTemperatureArrowUp,faCat, 
        faShirt, faSocks, faWifi, faSink, faFireBurner,faFire,faDog} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddRoomForm = props => {
    const categories = ['omg', 'beach_front', 'amazing_views', 'lake_front', 'amazing_pools', 'national_park','camping', 'design', 'skiing']
    const currentUser = useSelector(selectCurrentUser);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [capacity, setCapacity] = useState('')
    const [beds, setBeds] = useState(0)
    const [rooms, setRooms] = useState(0)
    const [baths, setBaths] = useState(0)
    const [parking, setParking] = useState(false)
    const [washer, setwasher] = useState(false)
    const [dryer, setDryer] = useState(false)
    const [tv, setTv] = useState(false)
    const [ac, setAC] = useState(false)
    const [heater, setHeater] = useState(false)
    const [kitchen, setKitchen] = useState(false)
    const [microwave, setMicrowave] = useState(false)
    const [fireplace, setFireplace] = useState(false)
    const [pets, setPets] = useState(false)

    return(
        <>
            <Navbar/>
            <div className="host-container">
                <div className="hosting-greet">
                    <h4>Hello {currentUser.username}!</h4>
                    <br/>
                    <h1>Hosting</h1>

                </div>
                <form className="hosting-form">
                    <label>Title
                        <div>
                            <input 
                                className="title-input" 
                                type="text" 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Title" />
                        </div>
                    </label>

                    <label>Description
                        <div>
                            <textarea 
                                className="description-input" 
                                type="textarea" 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Description"  />
                        </div>
                    </label>

                    <label>Price per Night
                        <div>
                            <input 
                                className="price-input" 
                                type="number" 
                                id="number" min="0"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Price per Night"  />
                        </div>
                    </label>

                    <label>Which of these best describes your place?
                        <div>
                            <select
                                className="category"
                                placeholder='Category'
                                defaultValue={category}
                                onChange={e => setCategory(e.target.value)}>
                                <optgroup>
                                    <option disabled value=""></option>
                                    {categories.map((category, idx) => <option key={idx}>{category}</option>)}
                                </optgroup>
                            </select>
                        </div>
                    </label>

                    <label>What is the max number of people?
                        <div>
                            <input 
                                className="capacity-input" 
                                type="number" 
                                id="number" min="0"
                                value={capacity}
                                onChange={e => setCapacity(e.target.value)}
                                placeholder="Capacity"  />
                        </div>
                    </label>

                    <div className="yn-container">
                        <label className="yn">
                            <FontAwesomeIcon icon={faSquareParking} size="xl"/> 
                            Parking
                            <input type="checkbox" name="has_parking" />
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faShirt} size="xl"/>  Washer
                            <input type="checkbox" name="has_washer" />
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faSocks} size="xl"/>  Dryer
                            <input type="checkbox" name="has_dryer" />
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faTv} size="xl"/>  TV
                            <input type="checkbox" name="has_tv" />
                            
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faIgloo} size="xl"/>  AC
                            <input type="checkbox" name="has_AC" />
                            
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faTemperatureArrowUp} size="xl"/>  Heater
                            <input type="checkbox" name="has_heater" />
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faWifi} size="xl"/>  Wi-Fi
                            <input type="checkbox" name="has_wifi" />
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faSink} size="xl"/>  Kitchen
                            <input type="checkbox" name="has_kitchen" />
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faFireBurner} size="xl"/>  Microwave
                            <input type="checkbox" name="has_microwave" />
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faFire} size="xl"/>  Fire Place
                            <input type="checkbox" name="has_fireplace" />
                        </label>
                        <label className="yn">
                            <FontAwesomeIcon icon={faDog} size="xl"/>  Pet
                            <input type="checkbox" name="has_pet" />
                        </label>
                    </div>

                </form>
            </div>

            
        </>
    );
}

export default AddRoomForm;