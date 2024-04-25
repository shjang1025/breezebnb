import React, { useCallback, useEffect, useRef } from "react";
import './BnbMap.css'

const BnbMap = ({latitude, longitude, currentRoom, apiKey}) => {
    const mapRef = useRef(null);
    const markerSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
    <path fill="#E8EAF6" d="M42 39L6 39 6 23 24 6 42 23z"></path><path fill="#C5CAE9" d="M39 21L34 16 34 9 39 9zM6 39H42V44H6z"></path><path fill="#B71C1C" d="M24 4.3L4 22.9 6 25.1 24 8.4 42 25.1 44 22.9z"></path><path fill="#D84315" d="M18 28H30V44H18z"></path><path fill="#01579B" d="M21 17H27V23H21z"></path><path fill="#FF8A65" d="M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z"></path>
    </svg>`

    useEffect(() => {
       const initMap = () => {
            // Check if apiKey is available
            if (!apiKey) {
                console.error('Google Maps API key is missing');
                return;
            }
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: latitude, lng: longitude },
                zoom: 11,
            });
            const markerIcon = {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markerSvgIcon)}`,
                size: new window.google.maps.Size(48, 48), // Set the size of your marker icon
                origin: new window.google.maps.Point(0, 0), // Set the origin point of your marker icon
                anchor: new window.google.maps.Point(0,0) 
            };
            const marker = new window.google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
                title: currentRoom.title,
                icon: markerIcon
            });
            const infoWindow = new window.google.maps.InfoWindow({
                content: "<div class='info-window-room'>Room Info</div>",
            });
            marker.addListener("click", () => {
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
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
            });

            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
            map.addListener("click", () => {
                infoWindow.close();
            });
        };
        

        const loadGoogleMapsScript = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
                script.defer = true;
                script.async = true;
                script.onload = initMap;
                document.head.appendChild(script);
            } else {
                initMap();
            }
        };
        loadGoogleMapsScript();
        
        return () => {
            // Clean up function to remove the script from the DOM if component unmounts
            const scriptElement = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
            if (scriptElement && scriptElement.parentNode) {
                scriptElement.parentNode.removeChild(scriptElement);
            }
        };
    }, [apiKey]);
    
    return (
    <div
        className="map"
        style={{ width: "80%", height: "700px" }}
        ref={mapRef}
    ></div>
    );
}

export default BnbMap;