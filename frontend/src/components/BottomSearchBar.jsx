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