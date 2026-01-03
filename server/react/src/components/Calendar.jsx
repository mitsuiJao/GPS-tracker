import { DatePicker, TimePicker } from "@mui/x-date-pickers";

function Calendar({ value, onChange }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
            <DatePicker
                format="YYYY-MM-DD"
                value={value}
                onChange={onChange}
                formatDensity="spacious"
            />
            {/* <TimePicker views={["hours", "minutes"]} format="HH:mm" value={value} onChange={onChange} /> */}
        </div>
    );
}

export default Calendar;
