import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import { lable1CopyStyle } from 'app'
import React from 'react'



const RadioInput = ({ label, name, value, onChange, disabled = false, flexDirection = 'column', size = "medium" }) => {
    return (
        <Stack flexDirection={flexDirection}>
            <Typography sx={{ ...lable1CopyStyle }}>
                {label}
            </Typography>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}
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