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
    const [washer, setWasher] = useState(false)
    const [dryer, setDryer] = useState(false)
    const [tv, setTv] = useState(false)
    const [ac, setAC] = useState(false)
    const [heater, setHeater] = useState(false)
    const [wifi, setWifi] = useState(false)
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
                    <label id="num-beds"> How many bedrooms/beds/bathrooms ?</label>
                    <div className="bed-container">
                        <label >Rooms: 
                            <span>
                                <input type="number" min="0" value={rooms} onChange={e => setRooms(e.target.value)}/>
                            </span>
                        </label>
                        <label >Beds: 
                            <span>
                                <input type="number" min="0" value={beds} onChange={e => setBeds(e.target.value)}/>
                            </span>
                        </label>
                        <label >Bathrooms: 
                            <span>
                                <input type="number" min="0" value={baths} onChange={e => setBaths(e.target.value)}/>
                            </span>
                        </label>
                    </div>
                    {/* boolean type lists */}
                    <div className="yn-container">
                        <label>Please choose the provided facilities</label>
                        <label className="yn">
                            <span>
                            <FontAwesomeIcon icon={faSquareParking} size="xl"/> Parking
                            </span>
                            <span>
                                <input type="checkbox" name="has_parking" value={parking} onChange={e => setParking(e.target.value)}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faShirt} size="xl" />  Washer
                            </span>
                            <span>
                                <input type="checkbox" name="has_washer" value={washer} onChange={e => setWasher(e.target.value)}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faSocks} size="xl" />  Dryer
                            </span>
                            <span>
                                <input type="checkbox" name="has_dryer" value={dryer} onChange={e => setDryer(e.target.value)}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faTv} size="xl"/>  TV
                            </span>
                            <span>
                                <input type="checkbox" name="has_tv" value={tv} onChange={e => setTv(e.target.value)} />
                            </span>
                            
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faIgloo} size="xl"/>  AC
                            </span>
                            <span>
                                <input type="checkbox" name="has_AC" value={ac} onChange={e => setAC(e.target.value)}/>
                            </span>
                            
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faTemperatureArrowUp} size="xl"/>  Heater
                            </span>
                            <span>
                                <input type="checkbox" name="has_heater" value={heater} onChange={e => setHeater(e.target.value)}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faWifi} size="xl"/>  Wi-Fi
                            </span>
                            <span>
                                <input type="checkbox" name="has_wifi" value={wifi} onChange={e => setWifi(e.target.value)}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faSink} size="xl"/>  Kitchen
                            </span>
                            <span>
                                <input type="checkbox" name="has_kitchen" value={kitchen} onChange={e => setKitchen(e.target.value)}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faFireBurner} size="xl"/>  Microwave
                            </span>
                            <span>
                                <input type="checkbox" name="has_microwave" value={microwave} onChange={e => setMicrowave(e.target.value)} />
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faFire} size="xl"/>  Fire Place
                            </span>
                            <span>
                                <input type="checkbox" name="has_fireplace" value={fireplace} onChange={e => setFireplace(e.target.value)}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faDog} size="xl"/>  Pet
                            </span>
                            <span>
                                <input type="checkbox" name="has_pet" value={pets} onChange={e => setPets(e.target.value)} />
                            </span>
                        </label>
                    </div>
                    

                </form>
            </div>

            
        </>
    );
}

export default AddRoomForm;