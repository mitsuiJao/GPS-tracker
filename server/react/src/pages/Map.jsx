import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "700px",
    height: "500px",
};

const center = {
    lat: 35.69575,
    lng: 139.77521,
};

const key = import.meta.env.VITE_GCP_APIKEY;

function Map() {
    return (
        <LoadScript googleMapsApiKey={key}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={17}
            ></GoogleMap>
        </LoadScript>
    );
};

export default Map;
