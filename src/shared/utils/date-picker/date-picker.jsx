import * as React from "react";
import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { dateFormat } from "shared/constants/constants";
import PropTypes from "prop-types";
import "dayjs/locale/en-gb";
import { useState } from "react";
import dayjs from "dayjs";

const DatePicker = ({
  label,
  value,
  setValue,
  disableFuture,
  maxDate,
  minDate,
  disabled = false,
  errorMessage = "Invalid date. Please enter valid Date",
}) => {
 
  const [error, setError] = useState(null);
  const handleError = (newError) => {
    setError(newError);
  }; 
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <DesktopDatePicker
        disabled={disabled}
        label={label}
        inputFormat={dateFormat}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        disableFuture={disableFuture}
        maxDate={maxDate}
        minDate={minDate}
        views={["year", "month", "day"]}
        openTo="day"
        renderInput={(params) => (
          <TextField size="small" sx={{ width: "100%" }} {...params} />
        )}
        onError={handleError}
        slotProps={{
          field: {
            clearable: true,
             onClear: () => { 
              setError(null);
              setValue(null)
             },
          },
          textField: {
            error: !!error,
            helperText: error ? errorMessage : "",
          },
        }}
      />
    </LocalizationProvider>
  );
};

DatePicker.propTypes = {
  setValue: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disableFuture: PropTypes.bool.isRequired,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
};
export default DatePicker;
