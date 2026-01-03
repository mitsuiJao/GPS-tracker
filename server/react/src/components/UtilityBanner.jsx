import React from "react";
import Calendar from "./Calendar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import dayjs from "dayjs";
import Text from "./Text";

// TODO: 安定したらコメント消しといて

// function startEndSet(period) {
//     switch (period) {
//         case "year":
//             return { start: dayjs().subtract(1, "year"), end: dayjs() };
//         case "month":
//             return { start: dayjs().subtract(1, "month"), end: dayjs() };
//         case "week":
//             return { start: dayjs().subtract(1, "week"), end: dayjs() };
//         case "day":
//             return { start: dayjs().subtract(1, "day"), end: dayjs() };
//         case "hour":
//             return { start: dayjs().subtract(1, "hour"), end: dayjs() };
//     }
// }

function UtilityBanner({ start, end, setStart, setEnd }) {
    const bannerStyle = {
        padding: "20px",
        height: "100%",
        boxSizing: "border-box", // Ensure padding doesn't add to width
        borderRight: "1px solid #444",
        backgroundColor: "#2a2a2a",
        color: "#fff", // Better contrast
        overflowY: "auto" // Allow internal scroll if needed
    };

    // const period = { year: "year", month: "month", week: "week", day: "day", hour: "hour" };

    return (
        <div style={bannerStyle}>
            <h2 style={{ marginTop: 0 }}>Tracker</h2>
            <Text>Status: Active</Text>
            <Text>GPS Options</Text>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "20px" }}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text>Yesterday</Text>
                    <IconButton onClick={() => {
                        setStart(start.subtract(1, "day"));
                        setEnd(end.subtract(1, "day"));
                    }}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton onClick={() => {
                        setEnd(end.add(1, "day"));
                        setStart(start.add(1, "day"));
                    }}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                    <Text>Tomorrow</Text>
                </Stack>
                <Calendar value={start} onChange={(newValue) => {
                    setStart(newValue.startOf("day"));
                    setEnd(newValue.endOf("day"));
                }} />
                {/* 
                <Text>Start: {start.format("YYYY-MM-DD")}</Text>
                <Text>End: {end.format("YYYY-MM-DD")}</Text> */}
                {/* 
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                        {Object.entries(period).map(([key, value]) => (
                            <Button key={key} onClick={() => {
                                setStart(startEndSet(key).start);
                                setEnd(startEndSet(key).end);
                            }}>
                                {value}
                            </Button>
                        ))}
                    </ButtonGroup>
                </Box>
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
                <Calendar value={end} onChange={setEnd} />
                <Stack direction="row" spacing={2}>
                    <Button variant="text" onClick={() => { setStart(dayjs().subtract(1, "day")); setEnd(dayjs()) }}>Reset</Button>
                    <Button variant="contained">Submit</Button>
                </Stack> 
                */}
            </div>
        </div>
    );
}

export default UtilityBanner;
