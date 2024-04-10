import './BreezebnbModal.css'

const SigninModal = ({onClose}) => {
    const handleBackgroundClick = () => {
        console.log("Background Clicked")
        onClose()
    }

    const handleContentClick =(e) => {
        console.log("Content clicked")
        e.stopPropagation()
    }
    return(
        <div className="breezebnb-modal-background" onClick={handleBackgroundClick}>
            <div className="breezebnb-modal-content" onClick={handleContentClick}>
                <div className='breezebnb-context'>
                    <p>Hosting a room is only available for logged-in users!</p>
                </div>
                <div className='breezebnb-exit'>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
    
        </div>
            
    )
}

export default SigninModal;