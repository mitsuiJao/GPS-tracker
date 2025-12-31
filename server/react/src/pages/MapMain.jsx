import React from "react";
import MapLine from "../components/MapLine";
import UtilityBanner from "../components/UtilityBanner";

function MapMain() {
    return (
        <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden" }}>
            <div style={{ width: "25%", height: "100%", overflowY: "auto", overflowX: "hidden" }}>
                <UtilityBanner />
            </div>
            <div style={{ width: "75%", height: "100%" }}>
                <MapLine />
            </div>
        </div>
    );
}

export default MapMain;
