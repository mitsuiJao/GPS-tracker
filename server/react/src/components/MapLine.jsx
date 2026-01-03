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

const polylineOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 6,
    geodesic: true,
};

const key = import.meta.env.VITE_GCP_APIKEY;


function Map({ start, end }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            axios.get("http://localhost:8080/map", {
                params: {
                    start: start.format("YYYY-MM-DDTHH:mm:ss"),
                    end: end.format("YYYY-MM-DDTHH:mm:ss")
                }
            })
                .then(res => {
                    console.log(res);
                    setItems(res.data.map(item => ({
                        lat: item.latitude,
                        lng: item.longitude
                    })));
                })
                .catch(err => {
                    console.error(err);
                })

        }

        fetchItems();
    }, [start, end])

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
