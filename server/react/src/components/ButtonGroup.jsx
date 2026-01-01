import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function VariatButtonGroup() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                <Button>year</Button>
                <Button>month</Button>
                <Button>week</Button>
                <Button>day</Button>
                <Button>hour</Button>
            </ButtonGroup>
        </Box>
    )
}

export default VariatButtonGroup;