import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCurrentUser } from "../../store/sessionReducer";
import './addRoomForm.css'
import { useState } from "react";
import {faSquareParking, faTv, faIgloo, faTemperatureArrowUp,faHouse, 
        faShirt, faSocks, faWifi, faSink, faFireBurner,faFire,faDog} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRoom, updateRoom } from "../../store/roomReducer";

const AddRoomForm = ({mode, initialHostData, roomId}) => {
    const categories = ['omg', 'beach_front', 'amazing_views', 'lake_front', 'amazing_pools', 'national_park','camping', 'design', 'skiing']
    const currentUser = useSelector(selectCurrentUser);
    const [title, setTitle] = useState(initialHostData ? initialHostData.title : '')
    const [description, setDescription] = useState(initialHostData ? initialHostData.description : '')
    const [address, setAddress] = useState(initialHostData ? initialHostData.address : '')
    const [city, setCity] = useState(initialHostData ? initialHostData.city : '')
    const [state, setState] = useState(initialHostData ? initialHostData.state : '')
    const [country, setCountry] = useState(initialHostData ? initialHostData.country : '')
    const [price, setPrice] = useState(initialHostData ? initialHostData.price : 0)
    const [category, setCategory] = useState(initialHostData ? initialHostData.category : '')
    const [capacity, setCapacity] = useState(initialHostData ? initialHostData.capacity : 1)
    const [beds, setBeds] = useState(initialHostData ? initialHostData.beds : 0)
    const [rooms, setRooms] = useState(initialHostData ? initialHostData.rooms : 0)
    const [baths, setBaths] = useState(initialHostData ? initialHostData.baths : 0)
    const [parking, setParking] = useState(initialHostData ? initialHostData.amenities.parking : false)
    const [washer, setWasher] = useState(initialHostData ? initialHostData.amenities.washer : false)
    const [dryer, setDryer] = useState(initialHostData ? initialHostData.amenities.dryer : false)
    const [tv, setTv] = useState(initialHostData ? initialHostData.amenities.tv : false)
    const [ac, setAC] = useState(initialHostData ? initialHostData.amenities.ac : false)
    const [heater, setHeater] = useState(initialHostData ? initialHostData.amenities.heater : false)
    const [wifi, setWifi] = useState(initialHostData ? initialHostData.amenities.wifi : false)
    const [kitchen, setKitchen] = useState(initialHostData ? initialHostData.amenities.kitchen : false)
    const [microwave, setMicrowave] = useState(initialHostData ? initialHostData.amenities.microwave : false)
    const [fireplace, setFireplace] = useState(initialHostData ? initialHostData.amenities.fireplace : false)
    const [pets, setPets] = useState(initialHostData ? initialHostData.amenities.pets : false)
    const [photo, setPhoto] = useState(initialHostData ? initialHostData.photo : null)
    const [errors, setErrors] = useState({})
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        const roomObject = {
            title: title,
            description: description,
            address: address,
            city: city,
            state: state,
            country: country,
            price: price,
            category: category, 
            capacity: capacity,
            rooms: rooms,
            beds: beds,
            baths: baths,
            parking: parking, 
            washer: washer, 
            dryer: dryer,
            tv: tv,
            ac: ac,
            heater: heater,
            wifi: wifi,
            kitchen: kitchen,
            microwave: microwave,
            fireplace: fireplace,
            pets: pets
            // photo: photo
        }
        for (const key in roomObject) {
            if (roomObject.hasOwnProperty(key) && 
                (key === 'parking' || key === 'washer' || key === 'dryer' || key === 'tv' ||
                key === 'ac' || key === 'heater' || key === 'wifi' || key === 'kitchen' || 
                key === 'microwave' || key === 'fireplace' || key === 'pets')) {
                data.append(`room[amenities][${key}]`, roomObject[key]);
            } else {
                data.append(`room[${key}]`, roomObject[key]);
            }
        }
        if(photo) {
            data.append('room[photo]',photo)
        }
    
        if(mode === 'edit') {
            data.append(`room[id]`, roomId)
        }
        if(mode === 'create') {
            dispatch(createRoom(data))
                .then(() => {
                    setErrors({});
                })
                .catch(async res =>{
                    let data = await res.json();
                    setErrors(data.errors);
                });

        } else if (mode === 'edit' && initialHostData) {
            dispatch(updateRoom(data, roomId))
        }
        setParking(false)
        setTv(false);
        setAC(false);
        setHeater(false)
        setWasher(false);
        setDryer(false);
        setWifi(false);
        setKitchen(false);
        setMicrowave(false);
        setFireplace(false);
        setPets(false);
        setPrice(0);
        setAddress('');
        setCity('');
        setState('');
        setCountry('');
        setBeds('');
        setBaths('');
        setRooms('');
        setCapacity('');
        setTitle('');
        setDescription('');
        setCategory('');
        setChecked(false);

        if (!errors) {
            window.location.href = `/users/${currentUser.id}`;
        }    
    }


    const handleCheckboxChange = (e) => {
        const {name, checked} = e.target

        switch(name) {
            case 'parking':
                setParking(checked)
                break
            case 'washer':
                setWasher(checked)
                break
            case 'dryer':
                setDryer(checked)
                break
            case 'tv':
                setTv(checked)
                break
            case 'AC':
                setAC(checked)
                break
            case 'heater':
                setHeater(checked)
                break
            case 'wifi':
                setWifi(checked)
                break
            case 'kitchen':
                setKitchen(checked)
                break
            case 'microwave':
                setMicrowave(checked)
                break
            case 'fireplace':
                setFireplace(checked)
                break
            case 'pets':
                setPets(checked)
                break
            default:
                break
        }
        setChecked(checked)
    }
    const handleFile = (e) => {
        //extract file from event
        const file = e.currentTarget.files[0]
        setPhoto(file);
    }



    useEffect(() => {
    }, [mode, initialHostData,ac])

    return(
        <>
            <Navbar/>
            <br></br>
            <br></br>
            <br></br>
            <div className="host-container">
                <div className="hosting-greet">
                    <h3>Hello {currentUser.username}!</h3>
                    <br/>
                    <h1>Hosting 
                        
                    </h1>

                </div>
                <form className="hosting-form" onSubmit={handleSubmit}>
                    <label>Title {errors.title ? <div className='title-errors'>* {errors.title[0]}</div> : ""}
                        <div>
                            <input 
                                className="title-input" 
                                type="text" 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Title" />
                        </div>
                    </label>
                    <label>Description {errors.description ? <div className='description-errors'>* {errors.description[0]}</div> : ""}
                        <div>
                            <textarea 
                                className="description-input" 
                                type="textarea" 
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Description"  />
                        </div>
                    </label>
                    <label>Location 
                        <div>
                            {errors.address ? <div className='address-errors'>* {errors.address[0]}</div> : ""}
                            <input 
                                className="address-input" 
                                type="text" 
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                placeholder="Address Line (ex) 1234 Cherry St. " />
                                
                        </div>
                        <div>
                            {errors.city ? <div className='city-errors'>* {errors.city[0]}</div> : ""}
                            <input 
                                className="city-input" 
                                type="text" 
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                placeholder="City" />
                        </div>
                        <div>
                            {errors.state ? <div className='state-errors'>* {errors.state[0]}</div> : ""}
                            <input 
                                className="state-input" 
                                type="text" 
                                value={state}
                                onChange={e => setState(e.target.value)}
                                placeholder="State" />
                        </div>
                        <div>
                            {errors.country ? <div className='country-errors'>* {errors.country[0]}</div> : ""}
                            <input 
                                className="country-input" 
                                type="text" 
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                placeholder="Country" />
                        </div> 
                    </label>
                    <label>Price per Night {errors.price ? <div className='price-errors'>* {errors.price[0]}</div> : ""}
                        <div>
                            <input 
                                className="price-input" 
                                type="number" 
                                id="number"
                                min="0"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                placeholder="Price per Night"  />
                        </div>
                    </label>

                    <label>Which of these best describes your place? {errors.category ? <div className='category-errors'>* {errors.category[1]}</div> : ""}
                        <div>
                            <select
                                className="category"
                                placeholder='Category'
                                defaultValue={''}
                                value={category}
                                onChange={e => setCategory(e.target.value)}>
                                <optgroup>
                                    <option disabled value=""></option>
                                    {categories.map((category, idx) => <option key={idx} value={category}>{category}</option>)}
                                </optgroup>
                            </select>
                        </div>
                    </label>

                    <label>What is the max number of people? 
                        <div>
                            <input 
                                className="capacity-input" 
                                type="number" 
                                id="number"
                                min="1"
                                value={capacity}
                                onChange={e => setCapacity(e.target.value)}
                                placeholder="Capacity"  />
                        </div>
                    </label>
                    <label id="num-beds"> How many bedrooms/beds/bathrooms ?</label> 
                    <div className="bed-container">
                        <label >Rooms: {errors.rooms ? <div className='rooms-errors'>* {errors.rooms[0]}</div> : ""}
                            <span>
                                <input type="number" min="0" value={rooms} onChange={e => setRooms(e.target.value)}/>
                            </span>
                        </label>
                        <label >Beds: {errors.beds ? <div className='beds-errors'>* {errors.beds[0]}</div> : ""}
                            <span>
                                <input type="number" min="0" value={beds} onChange={e => setBeds(e.target.value)}/>
                            </span>
                        </label>
                        <label >Bathrooms: {errors.baths ? <div className='baths-errors'>* {errors.baths[0]}</div> : ""}
                            <span>
                                <input type="number" min="0" value={baths} onChange={e => setBaths(e.target.value)}/>
                            </span>
                        </label>
                    </div>

                    <div className="yn-container">
                        <label>Please choose the provided facilities</label>
                        <label className="yn">
                            <span>
                            <FontAwesomeIcon icon={faSquareParking} size="xl"/> Parking
                            </span>
                            <span>
                                <input type="checkbox" name="parking" value={parking} checked={parking} onChange={handleCheckboxChange}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faShirt} size="xl" />  Washer
                            </span>
                            <span>
                                <input type="checkbox" name="washer" value={washer} checked={washer} onChange={handleCheckboxChange}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faSocks} size="xl" />  Dryer
                            </span>
                            <span>
                                <input type="checkbox" name="dryer" value={dryer} checked={dryer} onChange={handleCheckboxChange}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faTv} size="xl"/>  TV
                            </span>
                            <span>
                                <input type="checkbox" name="tv" value={tv} checked={tv} onChange={handleCheckboxChange} />
                            </span>
                            
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faIgloo} size="xl"/>  AC
                            </span>
                            <span>
                                <input type="checkbox" name="AC" value={ac} checked={ac} onChange={handleCheckboxChange}/>
                            </span>
                            
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faTemperatureArrowUp} size="xl"/>  Heater
                            </span>
                            <span>
                                <input type="checkbox" name="heater" value={heater} checked={heater} onChange={handleCheckboxChange}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faWifi} size="xl"/>  Wi-Fi
                            </span>
                            <span>
                                <input type="checkbox" name="wifi" value={wifi} checked={wifi} onChange={handleCheckboxChange}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faSink} size="xl"/>  Kitchen
                            </span>
                            <span>
                                <input type="checkbox" name="kitchen" value={kitchen} checked={kitchen} onChange={handleCheckboxChange}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faFireBurner} size="xl"/>  Microwave
                            </span>
                            <span>
                                <input type="checkbox" name="microwave" value={microwave} checked={microwave} onChange={handleCheckboxChange} />
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faFire} size="xl"/>  Fire Place
                            </span>
                            <span>
                                <input type="checkbox" name="fireplace" value={fireplace} checked={fireplace} onChange={handleCheckboxChange}/>
                            </span>
                        </label>
                        <label className="yn">
                            <span>
                                <FontAwesomeIcon icon={faDog} size="xl"/>  Pet
                            </span>
                            <span>
                                <input type="checkbox" name="pets" value={pets} checked={pets} onChange={handleCheckboxChange} />
                            </span>
                        </label>
                    </div>
                    <div className="photo-input">
                        <label className="photo-label"> 
                            Please add photo of your hosting
                        </label>
                        <input id="photo" onChange={handleFile} type="file" />
                    </div>
                    <div className="button-wrapper">
                        <button id="button" type="submit" >{mode === 'create' ? 'Start Hosting!' : 'Edit Hosting!'}</button>
                    </div>
                </form>
            </div>

            
        </>
    );
}

export default AddRoomForm;