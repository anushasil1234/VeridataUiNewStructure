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
import { inputFieldStyle, primaryFabStyle } from "app";
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
    <Stack my={2} direction="row" justifyContent={"left"} spacing={2} alignItems={"center"}>
      <Box>
        <FormControl sx={{ minWidth: 180 }} size="large">
          <InputLabel id="demo-select-small">Filter</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={filterType}
            label="Filter"
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Custom</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {filterType !== 0 ?
        <>
          <Box>
            <DatePicker
              label={"From Date"}
              value={fromDate}
              // maxDate={toDate}
              setValue={setFromDate}
              disableFuture={true}
            />
          </Box>
          <Stack direction="row" justifyContent={"left"} spacing={1} alignItems={"center"}>
            <span style={{ paddingLeft: "1rem" }}> No of Days of Inactivity </span>
            {/* <Box size={"small"}> */}
            <TextField
              // label="No of days"
              style={{ width: "30%" }}

              type="number"
              variant="outlined"
              className="customeTextField"
              value={noOfDays}
              onChange={handleNoOfInactivityDaysChange}
              defaultValue=""
              placeholder="No of days"
              InputProps={{ inputProps: { min: 0, } }} // Enforce positive numbers only
              disabled={!hasValue(fromDate)}
            />
            {/* </Box> */}
            <span> on {_currentDate} </span>
          </Stack>
        </> : null
      }
      <DarkTooltip placement="top" title={"Search"} arrow>
        <Fab
          variant="contained"
          size="small"
          button={"N"}
          onClick={handleReportSearch}
          sx={primaryFabStyle}
        >
          <Search width={18} sx={{ color: "#fff" }} />
        </Fab>
      </DarkTooltip>
      <DarkTooltip placement="top" title={"Clear Search"} arrow>
        <Fab
          variant="contained"
          size="small"
          button={"N"}
          onClick={clearSearch}
          sx={primaryFabStyle}
        >
          <Refresh width={18} sx={{ color: "#fff" }} />
        </Fab>
      </DarkTooltip>
      {
        hasPermission && hasPermission["A008"] && (
          <DarkTooltip placement="top" title={"Download"} arrow>
            <Fab
              variant="contained"
              size="small"
              button={"N"}
              onClick={handleDownload}
              sx={primaryFabStyle}
            >
              <Download width={18} sx={{ color: "#fff" }} />
            </Fab>
          </DarkTooltip>
        )
      }
    </Stack >
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
