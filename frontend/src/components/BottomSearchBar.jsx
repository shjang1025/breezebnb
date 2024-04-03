import './BottomSearchBar.css'
const BottomSearchBar = ({searchModal}) => {

    const bottomSearchBar = () => {
        const handleClick = (event) => {
            event.stopPropagation(); // Prevent click event from bubbling up
        };
        if(searchModal) {
            return (
                <div className="header2-container">
                    <div className="bottom-search-container" onClick={handleClick}>
                        <div className="icon2-wrapper">
                            <div className="location">
                                <p>Location</p>
                                <input type="text" placeholder="   Where are you going?"></input>
                            </div>
                            <div className="check-in">
                                <p>Check in</p>
                                <input type="text" placeholder="     Add dates(mm/dd/yyyy)"></input>
                            </div>
                            <div className="check-out">
                                <p>Check out</p>
                                <input type="text" placeholder="     Add dates(mm/dd/yyyy)"></input>
                            
                            </div>

                            <div className="guests">
                                <p>Guests</p>
                                <input type="text" placeholder="             Add guests"/>
                                <span><i className="lni lni-search-alt"></i></span>
                            </div>
                            <div class="search-button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" 
                                    style={{
                                        display: 'block',
                                        fill: 'none',
                                        height: '16px',
                                        width: '16px',
                                        stroke: '#E3185F',
                                        strokeWidth: '4',
                                        overflow: 'visible'
                                    }} 
                                    aria-hidden="true" role="presentation" focusable="false">
                                    <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
    return(
        <>
            {bottomSearchBar()}
        </>
    );
}

export default BottomSearchBar