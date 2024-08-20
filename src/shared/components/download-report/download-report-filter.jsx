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

const DownloadReportFilter = ({
  filterType,
  setFilterType,
  handleSearch,
  clearSearch,
  handleDownload,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  dropdownFilterType,
  dropdownFilterTypeChange,
  filterCode,
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
      setToDate(null);
      dropdownFilterTypeChange('All')
      handleSearch();
    }
    else if (hasValue(toDate) && !hasValue(fromDate)) {
      showErrorMessage("From date can not be empty");
    } else {
      handleSearch();
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
      {filterType != 0 ?
        <>
          <Box>
            <DatePicker
              label={"From Date"}
              value={fromDate}
              setValue={setFromDate}
              disableFuture={true}
            />
          </Box>
          <Box>
            <DatePicker
              label={"To Date"}
              value={toDate}
              setValue={setToDate}
              disableFuture={true}
            />
          </Box>
          <Stack direction="row" justifyContent={"left"} spacing={1} alignItems={"center"}>
            {filterCode == 'NATNLTY' ?
              <FormControl sx={{ minWidth: 180 }} size="large">
                <InputLabel id="demo-select-small">Nationality</InputLabel>
                {/* {processStatus !== undefined && ( */}
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={dropdownFilterType}
                  label="Nationality"
                  onChange={(e) => {
                    dropdownFilterTypeChange(e.target.value);
                  }}>
                  <MenuItem value={"All"}>Select all</MenuItem>
                  <MenuItem value={"IN"}>Indian</MenuItem>
                  <MenuItem value={"OTH"}>Foreigner</MenuItem>
                </Select>
                {/* )} */}
              </FormControl>
              : filterCode == 'APPNTE' ?
                <FormControl sx={{ minWidth: 180 }} size="large">
                  <InputLabel id="demo-select-small">Status</InputLabel>
                  {/* {processStatus !== undefined && ( */}
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={dropdownFilterType}
                    label="Status"
                    onChange={(e) => {
                      dropdownFilterTypeChange(e.target.value);
                    }}>
                    <MenuItem value={"All"}>Select all</MenuItem>
                    <MenuItem value={"001"}>Under Process</MenuItem>
                    <MenuItem value={"003"}>Verified</MenuItem>
                    <MenuItem value={"004"}>Rejected</MenuItem>
                    <MenuItem value={"005"}>Lapsed</MenuItem>
                  </Select>
                  {/* )} */}
                </FormControl>
                : null}
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

DownloadReportFilter.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  fromDate: PropTypes.string,
  setFromDate: PropTypes.func.isRequired,
  toDate: PropTypes.string,
  setToDate: PropTypes.func.isRequired,
  nationalityType: PropTypes.string.isRequired,
  handleNationalityChange: PropTypes.func.isRequired,
  filterType: PropTypes.number,
  setFilterType: PropTypes.func.isRequired,
};

export default DownloadReportFilter;
