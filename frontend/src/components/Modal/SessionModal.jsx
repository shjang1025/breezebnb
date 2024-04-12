import { useState } from "react";
import { useDispatch } from "react-redux";
import './SessionModal.css';
import { createUser, loginUser } from "../../store/sessionReducer";

const SessionModal = ({modalState, setModalState}) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = e => {
        e.preventDefault();
        if (modalState === 'signup') {
          dispatch(createUser({ username, email, password, gender }))
            .then(() => {
                setModalState(null); // Close modal on success
                setErrors({}); // Clear errors on success
            })
            .catch(async res =>{
              let data = await res.json();
              setErrors(data.errors);
            });
        } else {
          dispatch(loginUser({ email, password }))
            .then(() => {
                setModalState(null)
                setErrors({})
            })
            .catch(async res => {
                let data = await res.json();
                setErrors(data.errors || {});
            });
        }
    };
    const loginInput = () => {
        return(
            <>
                <label className="input-label">
                    <div className='email-input-label'>Email</div>
                    <input placeholder='  Email' 
                        type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                
                <label className="input-label">
                    <div className='password-input-label'>Password</div>
                    <input placeholder='  Password' 
                        type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                {errors ? <div className='username-errors'>{errors[0]}</div> : ""}
            </>
        )
    }

    const signupInput = () => {
        return(
            <>
                <label className="input-label">
                    <div className='username-input-label'>
                        Username {errors.username ? <div className='username-errors'>* {errors.username[0]}</div> : ""}
                    </div>
                    <input placeholder='  Username' 
                        type='text' value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                
                <label className="input-label">
                    <div className='email-input-label'>
                        Email {errors.email ? <div className='email-errors'>* {errors.email[0]}</div> : ""}
                    </div>
                    <input placeholder='  Email' 
                        type='email' value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                
                <label className="input-label">
                    <div className='password-input-label'>
                        Password {errors.password ? <div className='pw-errors'>* {errors.password[0]}</div> : ""}
                    </div>
                    <input placeholder='  Password' 
                        type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                

                <label className="input-label">
                    <div className='gender-select-label'>
                        Gender {errors.gender ? <div className='gender-errors'>* {errors.gender[0]}</div> : ""}
                    </div>
                    <select
                        className="gender-select"
                        placeholder='Gender'
                        value={gender}
                        onChange={e => setGender(e.target.value)}>
                        <optgroup>
                            <option disabled selected value="">  </option>
                            <option id="female">Female</option>
                            <option id="male">Male</option>
                        </optgroup>
                    </select>
                </label>
                
            </>
        )
    }
    return(
        <div className="modal-background" onClick={e => setModalState(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-content-top">
                    <button onClick={e => setModalState(null)}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" 
                                role="presentation" focusable="false" 
                                style={{
                                    display: 'block',
                                    fill: 'none',
                                    height: '16px',
                                    width: '16px',
                                    stroke: 'currentcolor',
                                    strokeWidth: '3',
                                    overflow: 'visible'
                                }}>
                                <path d="m6 6 20 20M26 6 6 26"></path>
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="modal-content-cetner">
                    <div className="modal-content-title">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="48px">
                                <path fill="#ff5252" d="M42.459,32.519c-1.037-3.336-9.539-19.596-12.12-24.5l-0.026-0.048C29.153,5.559,26.676,4,24,4 
                                s-5.153,1.559-6.291,3.929L17.661,8.02C15.08,12.923,6.578,29.183,5.542,32.518C5.261,33.421,5,34.407,
                                5,35.5 c0,4.687,3.813,8.5,8.5,8.5c4.654,0,7.612-1.949,10.5-5.184C26.888,42.051,29.846,44,34.5,44c4.687,
                                0,8.5-3.813,8.5-8.5 C43,34.407,42.739,33.421,42.459,32.519z M23.999,34.662C22.33,32.515,20,28.881,20,
                                26c0-2.206,1.794-4,4-4s4,1.794,4,4 C28,28.872,25.668,32.511,23.999,34.662z M34.5,41c-3.287,
                                0-5.521-1.107-8.325-4.258C27.878,34.596,31,30.104,31,26 c0-3.86-3.141-7-7-7s-7,3.14-7,7c0,4.104,
                                3.122,8.596,4.825,10.742C19.021,39.893,16.787,41,13.5,41C10.468,41,8,38.533,8,35.5 c0-0.653,0.162-1.308,
                                0.406-2.09C9.17,30.95,15.3,18.948,20.316,9.417l0.076-0.146C21.055,7.891,22.471,7,24,7 s2.945,0.891,3.615,
                                2.285l0.068,0.132C32.7,18.948,38.83,30.95,39.595,33.411C39.838,34.192,40,34.847,40,35.5 C40,38.533,37.532,
                                41,34.5,41z"/>
                            </svg>
                            <h2>Welcome to BreezeBnB</h2>                            
                    </div>
                    <div className="modal-content-login">
                        <form className={modalState === 'signup' ? 'modal-signup' : 'modal-login'} onSubmit={handleSubmit}>
                            {modalState === 'signup' ? signupInput() : loginInput()}
                            <button type="submit">{modalState === 'signup' ? 'Sign Up' : 'Log in'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SessionModal