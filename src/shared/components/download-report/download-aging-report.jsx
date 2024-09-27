import { Download, Refresh, Search } from "@mui/icons-material";
import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { inputFieldStyle, primaryFabStyle, ResponsiveFab } from "app";
import React, { useState } from "react";
import DatePicker from "shared/utils/date-picker/date-picker";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import { DateFormatYYYYMMDD, hasValue } from "shared/utils";
import moment from "moment";

const DownloadAgingReport = ({
  filterType,
  setFilterType,
  handleSearch,
  clearSearch,
  handleDownload,
  fromDate,
  payLoad,
  setFromDate,
  noOfDays,
  handleNoOfDaysChange,
  hasPermission,
}) => {
  const { popUpSlice } = useSelector(
    (state) => state
  );
  const currentDate = moment();
  const _currentDate = currentDate.format("DD-MMM-YYYY");
  const { showErrorMessage } = popUpSlice[0];
  const handleReportSearch = () => {
    if (filterType === 0) {
      setFromDate(null);
      handleSearch();
    }
    else if (hasValue(fromDate)) {
      handleSearch();
    } else {
      showErrorMessage("From date can not be empty");
    }
  };

  const handleNoOfInactivityDaysChange = (event) => {
    const value = event?.target?.value;

    const _startDate = fromDate && DateFormatYYYYMMDD(fromDate?.toString());
    const startDate = moment(_startDate);
    const daydiff = moment(currentDate).diff(moment(startDate), 'days');
    if (value >= 0 && value <= daydiff) {
      handleNoOfDaysChange(value);
    }
  };

  return (
    <Box
  my={2}
  display="flex" 
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
  spacing={2} 
>
  
  <Box mr={2}> 
    <FormControl sx={{ minWidth: 180 }} size="large">
      <InputLabel id="demo-select-small">Filter</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={filterType}
        label="Filter"
        onChange={(e) => setFilterType(e.target.value)}
      >
        <MenuItem value={0}>All</MenuItem>
        <MenuItem value={1}>Custom</MenuItem>
      </Select>
    </FormControl>
  </Box>

  
  {filterType !== 0 && (
    <>
      
      <Box mr={2}>
        <DatePicker
          label="From Date"
          value={fromDate}
          setValue={setFromDate}
          disableFuture={true}
        />
      </Box>
      <Box display="flex" alignItems="center" mr={2}>
      <span style={{ marginRight: "0.5rem", whiteSpace: "nowrap" }}>
          No of Days of Inactivity
        </span>
        <TextField
          style={{ width: "100px" }} 
          type="number"
          variant="outlined"
          value={noOfDays}
          onChange={handleNoOfInactivityDaysChange}
          placeholder="No of days"
          InputProps={{ inputProps: { min: 0 } }} 
          disabled={!hasValue(fromDate)}
        />
        <span style={{ marginLeft: "0.5rem" }}>
          on {_currentDate}
        </span>
      </Box>
    </>
  )}

  <Box display="flex" alignItems="center" ml={2}>
    <DarkTooltip placement="top" title="Search" arrow>
      <ResponsiveFab
        variant="contained"
        size="small"
        button="N"
        onClick={handleReportSearch}
        sx={primaryFabStyle}
      >
        <Search width={18} sx={{ color: "#fff" }} />
      </ResponsiveFab>
    </DarkTooltip>
    
    <DarkTooltip placement="top" title="Clear Search" arrow>
      <ResponsiveFab
        variant="contained"
        size="small"
        button="N"
        onClick={clearSearch}
        sx={{ ...primaryFabStyle }} 
      >
        <Refresh width={18} sx={{ color: "#fff" }} />
      </ResponsiveFab>
    </DarkTooltip>

    {hasPermission && hasPermission["A008"] && (
      <DarkTooltip placement="top" title="Download" arrow>
        <ResponsiveFab
          variant="contained"
          size="small"
          button="N"
          onClick={handleDownload}
          sx={{  ...primaryFabStyle }} 
        >
          <Download width={18} sx={{ color: "#fff" }} />
        </ResponsiveFab>
      </DarkTooltip>
    )}
  </Box>
</Box>
  );
};

DownloadAgingReport.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  processStatus: PropTypes.string.isRequired,
  fromDate: PropTypes.string,
  setFromDate: PropTypes.func.isRequired,
  payLoad: PropTypes.object,
  noOfDays: PropTypes.number,
  handleNoOfDaysChange: PropTypes.func.isRequired,
  filterType: PropTypes.number,
  setFilterType: PropTypes.func.isRequired,
};

export default DownloadAgingReport;
