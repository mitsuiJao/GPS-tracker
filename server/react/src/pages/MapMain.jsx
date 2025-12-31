import React from "react";
import MapLine from "../components/MapLine";
import UtilityBanner from "../components/UtilityBanner";

function MapMain() {
    return (
        <div style={{
            display: "flex",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1000,
            overflow: "hidden",
            backgroundColor: "#242424" // Match bg
        }}>
            <div style={{ width: "25%", flexShrink: 0, height: "100%", overflowY: "auto", overflowX: "hidden" }}>
                <UtilityBanner />
            </div>
            <div style={{ flexGrow: 1, height: "100%", position: "relative" }}>
                <MapLine />
            </div>
        </div>
    );
}

export default MapMain;
