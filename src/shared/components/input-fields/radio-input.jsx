import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import { disableStyle, lable1CopyStyle } from 'app'
import React from 'react'



const RadioInput = ({ label, name, value, onChange,
    disabled = false, subCategory, flexDirection = 'column', size = "medium", ...rest }) => {
    console.log("name", "value", name, value);

    return (
        <Stack flexDirection={flexDirection}>
            <Typography sx={disabled ? { ...disableStyle } : { ...lable1CopyStyle }}>
                {label}
            </Typography>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
                sx={{ marginLeft: 2 }} // Adjust margin as needed
            >
                <FormControlLabel
                    value={true}
                    control={<Radio size={size} />}
                    label="Yes"
                    disabled={disabled}
                />
                <FormControlLabel
                    value={false}
                    control={<Radio size={size} />}
                    label="No"
                    disabled={disabled}
                />
            </RadioGroup>
        </Stack>
    )
}

export default RadioInput