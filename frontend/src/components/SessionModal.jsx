import { useState } from "react";
import { useDispatch } from "react-redux";
import './SessionModal.css';
import { createUser, loginUser } from "../store/sessionReducer";

const SessionModal = ({modalState, setModalState}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        if (modalState === 'signup') {
          dispatch(createUser({ email, password }))
            .then(() => setModalState(null))
            .catch(async res =>{
              let data = await res.json();
              setErrors(data);
            });
        } else {
          dispatch(loginUser({ email, password }))
            .then(() => setModalState(null))
            .catch(async res => {
              let data = await res.json();
              setErrors(data.errors);
            });
        }
    };


    return(
        <div className="modal-background" onClick={e => setModalState(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-content-top">
                    <button onClick={e => setModalState(null)}>X</button>
                </div>
                <div className="modal-content-cetner">
                    <div className="modal-content-title">
                        {modalState === 'signup' ? 'Welcome to BreezeBnB' : 'Welcome back to BreezeBnB'}
                    </div>
                    <div className="modal-content-login">
                        <form onSubmit={handleSubmit}>

                            <input 
                                placeholder='Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                
                            />
                            <button type="submit">{modalState}</button>
                        </form>
                        
                    </div>
                </div>
                {/* </div> */}
                {/* if catching the error on handle submit, show the error message on the modal content */}
                {errors.map((err, idx) => (<p key={idx}>{err}</p>))}
            </div>
        </div>
    )

}

export default SessionModal