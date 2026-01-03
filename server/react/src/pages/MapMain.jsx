import React, { useState, useEffect } from "react";
import MapLine from "../components/MapLine";
import UtilityBanner from "../components/UtilityBanner";
import dayjs from "dayjs";

// TODO: 次APIのクエリどうにかしといて
function MapMain() {
    const [start, setStart] = useState(dayjs().startOf("day"));
    const [end, setEnd] = useState(dayjs().endOf("day"));
    useEffect(() => {
        console.log(start, end);
    }, [start, end]);

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
                <UtilityBanner start={start} end={end} setStart={setStart} setEnd={setEnd} />
            </div>
            <div style={{ flexGrow: 1, height: "100%", position: "relative" }}>
                <MapLine start={start} end={end} />
            </div>
        </div>
    );
}

export default MapMain;
