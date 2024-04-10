import React, { useCallback, useEffect, useRef } from "react";
import './BnbMap.css'

const BnbMap = ({latitude, longitude}) => {
    const mapRef = useRef(null);
    const center = {lat: latitude, lng: longitude}
    const initMap = useCallback(() => {
        if(!window.google) {
            console.error('Google Maps API not loaded')
            return;
        }
        new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: 10,
        });
    }, [mapRef]);

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