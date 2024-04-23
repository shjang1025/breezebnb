import React, { useCallback, useEffect, useRef } from "react";
import './BnbMap.css'
import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY

const BnbMap = ({latitude, longitude, currentRoom}) => {
    const mapRef = useRef(null);
    const center = {lat: latitude, lng: longitude}
    const markerSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
    <path fill="#E8EAF6" d="M42 39L6 39 6 23 24 6 42 23z"></path><path fill="#C5CAE9" d="M39 21L34 16 34 9 39 9zM6 39H42V44H6z"></path><path fill="#B71C1C" d="M24 4.3L4 22.9 6 25.1 24 8.4 42 25.1 44 22.9z"></path><path fill="#D84315" d="M18 28H30V44H18z"></path><path fill="#01579B" d="M21 17H27V23H21z"></path><path fill="#FF8A65" d="M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z"></path>
    </svg>`
    const markerIcon = {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markerSvgIcon)}`,
        size: new window.google.maps.Size(48, 48), // Set the size of your marker icon
        origin: new window.google.maps.Point(0, 0), // Set the origin point of your marker icon
        anchor: new window.google.maps.Point(0,0) 
    };
    
    const initMap = useCallback(() => {
        if(!window.google) {
            console.error('Google Maps API not loaded')
            return;
        }
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: 11,
        });
        const marker = new window.google.maps.Marker({
            map: map,
            position: center,
            icon: markerIcon
        });
        const infoWindow = new window.google.maps.InfoWindow({
            content: "<div class='info-window-room'>Room Info</div>",
        });

        // Add click event listener to marker
        marker.addListener("click", () => {
            // Open the InfoWindow when marker is clicked
            // infoWindow.open(map, marker);
            const content = `
                <div class='info-window-content'>
                    <div class='content-text-info'>
                        <span class='content-title'>
                            <p>${currentRoom.title}</p> 
                        </span>
                        <div class='content-other-info-outer'>
                            <div class='content-price'>
                                <p class='bold-text'>Price: </p>
                                <p>$ ${currentRoom.price} / night</p> 
                                
                            </div>
                            <div class='content-other-info'>
                                <p>${currentRoom.rooms} beds</p>
                                <p>${currentRoom.beds} beds</p>
                                <p>${currentRoom.baths} beds</p>
                            </div>
                        </div>
                    </div>
                    <div class='content-img-info'>
                        <img src=${currentRoom.photoUrl} />
                    </div>
                    
                    
                </div>
            `;
            // Set the generated HTML content as the content of the InfoWindow
            infoWindow.setContent(content);
            // Open the InfoWindow when marker is clicked
            infoWindow.open(map, marker);
        });

        // Close the InfoWindow when the map is clicked
        map.addListener("click", () => {
            infoWindow.close();
        });
    }, [mapRef, center, markerIcon]);

    useEffect(() => {
    initMap();
    }, [initMap]);
    
    return (
    <div
        className="map"
        style={{ width: "80%", height: "700px" }}
        ref={mapRef}
    ></div>
    );
    

}

export default BnbMap;