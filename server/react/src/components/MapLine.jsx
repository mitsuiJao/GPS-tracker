import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";

const containerStyle = {
    height: "100%",
    width: "100%",
};

const center = {
    lat: 38.6362694,
    lng: 137.48694,
};
const zoom = 6;

const polylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 6,
    geodesic: true,
};

function Map({ items }) {
    const [map, setMap] = useState(null);

    const handleOnLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    useEffect(() => {
        if (map) {
            if (items && items.length > 0) {
                const bounds = new window.google.maps.LatLngBounds();
                items.forEach(item => {
                    bounds.extend({ lat: item.lat, lng: item.lng });
                });
                map.fitBounds(bounds);
            } else {
                map.setCenter(center);
                map.setZoom(zoom);
            }
        }
    }, [items, map]);

    return ( // マップの位置おかしいのとサイズ調整しといて
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={handleOnLoad}
        >
            {items && items.length > 0 && (
                <Polyline
                    path={items}
                    options={polylineOptions}
                />
            )}
        </GoogleMap>
    );
};

export default Map;
