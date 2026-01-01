import React from "react";
import Calendar from "./Calendar";
import VariatButtonGroup from "./ButtonGroup";

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

    const period = { year: "year", month: "month", week: "week", day: "day", hour: "hour" };

    return (
        <div style={bannerStyle}>
            <h2 style={{ marginTop: 0 }}>Tracker</h2>
            <p>Status: Active</p>
            <p>GPS Options</p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "20px" }}>
                <VariatButtonGroup {...period} />
                <Calendar />
                <svg
                    width="24"
                    height="40"
                    viewBox="0 0 24 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 0 Q 0 10 12 20 T 12 40"
                        stroke="#666666"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
                <Calendar />
            </div>
        </div>
    );
}

export default UtilityBanner;
