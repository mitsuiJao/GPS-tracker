import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

function VariatButtonGroup({ ...args }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                {Object.entries(args).map(([key, value]) => (
                    <Button key={key}>{value}</Button>
                ))}
            </ButtonGroup>
        </Box>
    )
}

export default VariatButtonGroup;