import { Grid, TextField, Typography } from "@mui/material"
import { inputFieldStyle, inputFieldStyle2, lable1CopyStyle, lable1Style, listHeadingStyle } from "app"
import GridContainer from "../grid-container/grid-container"
import Label from "./label"

const TextAreaInput = ({ label, value, required, onChange }) => {
    return (
        <>
            <Grid item xs={12} md={8}>
                <Typography sx={{ ...listHeadingStyle, fontSize: '1rem', textAlign: "left", marginLeft: "-22px" }}>
                    {label}
                    {required &&
                        <span className="requiredField">*</span>
                    }
                </Typography>
            </Grid>
            <TextField
                onChange={onChange}
                error={false}
                style={inputFieldStyle2}
                type="text"
                className="customeTextField"
                variant="outlined"
                defaultValue={" "}
                multiline
                rows={4}
                maxRows={4}
                value={value}
                required={required}
                inputStyle={{ padding: 0 }}
                InputProps={{
                    style: {
                        color: "#000",
                        padding: "16.5px 14px"
                    },
                }}
            />
        </>
    )
}
export default TextAreaInput