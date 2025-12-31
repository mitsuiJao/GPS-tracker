import React from "react";

function UtilityBanner() {
    const bannerStyle = {
        padding: "20px",
        height: "100%",
        boxSizing: "border-box", // Ensure padding doesn't add to width
        borderRight: "1px solid #444",
        backgroundColor: "#2a2a2a",
        color: "#fff", // Better contrast
        overflowY: "auto" // Allow internal scroll if needed
    };

    return (
        <div style={bannerStyle}>
            <h2 style={{ marginTop: 0 }}>Utilities</h2>
            <div style={{ marginTop: "20px" }}>
                <p>Status: Active</p>
                <p>GPS Options</p>
                {/* Add more utility items here later */}
            </div>
        </div>
    );
}

export default UtilityBanner;
