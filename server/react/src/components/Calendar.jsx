import { DatePicker, TimePicker } from "@mui/x-date-pickers";

function Calendar() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
            <DatePicker format="YYYY-MM-DD" />
            <TimePicker views={["hours", "minutes"]} format="HH:mm" />
        </div>
    );
}

export default Calendar;
