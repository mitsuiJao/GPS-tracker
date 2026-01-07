import Calendar from "./Calendar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Text from "./Text";

function UtilityBanner({ start, end, setStart, setEnd, dist }) {
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

                <Text>Distance: {dist < 1000 ? `${dist.toFixed(3)} m` : `${(dist / 1000).toFixed(3)} km`}</Text>

            </div>
        </div>
    );
}

export default UtilityBanner;
