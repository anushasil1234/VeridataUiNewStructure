import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FormControl, Typography } from '@mui/material';
import { autocompleteStyle, inputFieldStyle, lable1Style } from 'app';

export default function AutocompleteInput({ dropDownDataList, label, defaultValue, setAutoCompleteValue, disabled }) {

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={dropDownDataList}
      defaultValue={defaultValue}
      onChange={(event, value) => setAutoCompleteValue(value)}
      value={defaultValue}
      disabled = {disabled}
      className='customeTextField'
      sx={{height: "46px", }}
      renderInput={(params) => {
        return (
           <FormControl fullWidth sx={autocompleteStyle}>

             <Typography sx={lable1Style}>{label}
               <span className="requiredField">*</span>
             </Typography>
             <TextField sx={{...inputFieldStyle, padding: 0}}  value={"sdfsdf"} {...params} />
           </FormControl>

        )
      }}
    />
  );
}

