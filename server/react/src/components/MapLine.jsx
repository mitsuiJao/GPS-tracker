import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
    height: "100%",
    width: "100%",
};

const center = {
    lat: 35.69575,
    lng: 139.77521,
};

const flightPath = [
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
];

const polylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 4,
    geodesic: true,
};

const key = import.meta.env.VITE_GCP_APIKEY;


function Map() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            axios.get("http://localhost:8080/map")
                .then(res => {
                    console.log(res);
                    setItems(res.data.map(item => ({
                        lat: item.latitude,
                        lng: item.longitude
                    })));
                })
                .catch(err =>{
                    console.error(err);
                })

            }

            fetchItems();
        }, [])

    return ( // マップの位置おかしいのとサイズ調整しといて
        <LoadScript googleMapsApiKey={key}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={17}
            >
                <Polyline
                    path={items}
                    options={polylineOptions}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
