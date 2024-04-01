import { useState } from "react";
import { useDispatch } from "react-redux";
import './SessionModal.css';
import { createUser, loginUser } from "../store/sessionReducer";

const SessionModal = ({modalState, setModalState}) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        if (modalState === 'signup') {
          dispatch(createUser({ username, email, password, gender }))
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
    const loginInput = () => {
        return(
            <>
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
            </>
        )
    }

    const signupInput = () => {
        return(
            <>
                <input 
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
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
                <select
                    placeholder='Gender'
                    value={gender}
                    onChange={e => setGender(e.target.value)}>
                    
                    <option>Female</option>
                    <option>Male</option>

                </select>
            </>
        )
    }
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
                        <form className={modalState === 'signup' ? 'modal-signup' : 'modal-login'}onSubmit={handleSubmit}>
                            {modalState === 'signup' ? signupInput() : loginInput()}
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