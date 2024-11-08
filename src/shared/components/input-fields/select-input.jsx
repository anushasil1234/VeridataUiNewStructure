import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import { inputFieldStyle2, lable1CopyStyle } from 'app'

const SelectInput = ({ itemList, label, onChange, value, required = false, disabled = false }) => {
    console.log("SelectInput", itemList, value);
    
    return (
        <FormControl fullWidth>
            <Typography sx={lable1CopyStyle}>
                {label}
                {required === true &&
                    <span className="requiredField">*</span>
                }
            </Typography>
            <Select
                error={false}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="customeTextField"
                disabled={disabled}
                sx={inputFieldStyle2}
                onChange={onChange}
                value={value}
            >
                {itemList && itemList.length > 0 && itemList.map(({ value, label, isDisabled = false }) => {
                    return (
                        <MenuItem value={value} disabled={isDisabled}>{label}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}

export default SelectInput