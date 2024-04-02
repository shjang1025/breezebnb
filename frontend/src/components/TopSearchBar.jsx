
import './TopSearchBar.css';
import { useState } from 'react';
import { useEffect } from 'react';

const TopSearchBar = ({searchModal, handleSearchClick}) => {

    //if not clicked (if searchModal is false)
    const topSearchBar = () => {
        if(!searchModal) {
            return(
                <div className="container" onClick={handleSearchClick}>
                    <div className="icon-wrapper">
                        <div className="icon-finder">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="25" width="25" stroke="currentColor" fill="currentColor" strokeWidth="0">
                                <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 
                                3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                            </svg>
                        </div>
                        <div className="text">
                            <h4>Anywhere</h4>
                            <p>Anywhere • Any Week • Add Guests</p>
                        </div>
                    </div>
                    <div className="icon-wrapper">
                        <div className="icon-filter">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16" aria-hidden="true" role="presentation" focusable="false" >
                                <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 
                                0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="stay-container">
                    Stays
                </div>
            )
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchModal && !event.target.closest('.header-container')) {
                handleSearchClick(null); // Close search modal when clicked outside
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [searchModal, handleSearchClick]);

    return(
            <>
                {topSearchBar()}
            </>

    )
}

export default TopSearchBar