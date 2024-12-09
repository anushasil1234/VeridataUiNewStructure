import * as React from 'react';
import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { dateFormat } from 'shared/constants/constants';
import PropTypes from "prop-types";
import 'dayjs/locale/en-gb';

const DatePickerolt = ({ label, value, setValue, disableFuture, maxDate, minDate, disabled = false, views, openTo }) => {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DesktopDatePicker
              disabled={disabled}
              label={label}
              inputFormat={dateFormat}
              value={value ? dayjs(value) : null}
              onChange={(value) => setValue(value)}
              disableFuture={disableFuture}
              maxDate={maxDate ? dayjs(maxDate) : null}
              minDate={minDate ? dayjs(minDate) : null}
              views={views} 
              openTo={openTo} 
              renderInput={(params) => <TextField size="small" sx={{ width: "100%" }} {...params} />}
          />
      </LocalizationProvider>
  );
};

DatePickerolt.propTypes = {
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disableFuture: PropTypes.bool.isRequired,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
  disabled: PropTypes.bool,
  views: PropTypes.array.isRequired, // Ensure views is required
  openTo: PropTypes.string.isRequired, // Ensure openTo is required
};

export default DatePickerolt;
