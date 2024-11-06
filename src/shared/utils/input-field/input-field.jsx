import { TextField } from '@mui/material'
import React from 'react'

export const InputField = ({props, inputProps,disabled=false, error= false}) => {
    const {setValue, label, placeholder, type, handleBlur} = props;
    
    return (
        <TextField
            name={label}
            onChange={(e) => setValue(e.target.value)}
            sx={{ margin: "8px 0" }}
            label={label}
            placeholder= {placeholder}
            type= {type }
            fullWidth
            InputProps={inputProps}
            onBlur={handleBlur && handleBlur}
            disabled={disabled}
            error={error}
        />
    )
}
