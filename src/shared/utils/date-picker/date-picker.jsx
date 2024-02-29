import * as React from 'react';
import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dateFormat } from 'shared/constants/constants';
import PropTypes from "prop-types";
import 'dayjs/locale/en-gb';

const DatePicker = ({ label, value, setValue, disableFuture, maxDate, minDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
      <DesktopDatePicker
        label={label}
        inputFormat={dateFormat}
        value={value}
        onChange={(value) => setValue(value)}
        disableFuture={disableFuture}
        maxDate={maxDate}
        minDate={minDate}
        views={['day', 'month', 'year']}
        openTo="day"
        renderInput={(params) => <TextField size="small" sx={{ width: "100%" }} {...params} />}
      />
    </LocalizationProvider>
  );
}

DatePicker.propTypes = {
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disableFuture: PropTypes.bool.isRequired,
  maxDate: PropTypes.object,
  minDate: PropTypes.object
};
export default DatePicker
