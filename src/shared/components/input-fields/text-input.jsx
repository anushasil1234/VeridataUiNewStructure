import { TextField, Typography } from "@mui/material"
import { inputFieldStyle, inputFieldStyle2, lable1CopyStyle, lable1Style } from "app"

const TextAreaInput = ({ label, value, required, onChange }) => {
    return (
        <>
            <Typography sx={lable1CopyStyle}>
                {label}
                {required &&
                    <span className="requiredField">*</span>
                }
            </Typography>
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