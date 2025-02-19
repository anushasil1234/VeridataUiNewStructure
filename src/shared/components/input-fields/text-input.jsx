import { inputFieldStyle2 } from 'app';
import React from 'react'
import Label from './label';
import { FormControl, TextField } from '@mui/material';

const TextInput = ({ value, onChange, label, required = false, readOnly = false, disabled = false, error = false, onKeyDown,onBlur,
    onPaste, maxLength = 0, inputProps, type
}) => {
    const _inputProps = inputProps ? inputProps : {
        maxLength: maxLength,
        readOnly: readOnly,
        style: {
            padding: 0,
            color: "#000"
        }
    }
    return (
        <FormControl fullWidth>
            <Label required={required}>{label}</Label>
            <TextField
                onChange={(e) => {
                    onChange && onChange(e.target.value);
                }}
                onBlur={onBlur}
                onKeyDown={(e) => onKeyDown ? onKeyDown(e) : false}
                onPaste={(e) => onPaste ? onPaste(e) : false}
                error={error}
                style={inputFieldStyle2}
               // type="text"
               type={type ? type : "text"}
                className="customeTextField"
                variant="outlined"
               // defaultValue={" "}
               defaultValue={""}
                value={value}
                disabled={disabled}
                inputStyle={{ padding: 0 }}
                InputProps={_inputProps}
            />
        </FormControl>
    )
}

export default TextInput