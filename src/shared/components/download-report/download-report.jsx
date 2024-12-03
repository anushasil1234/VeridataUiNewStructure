import { Download, Info, Refresh, Search } from "@mui/icons-material";
import {
  Box,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
} from "@mui/material";
import { datePickerstyle, primaryFabStyle, ResponsiveFab } from "app";
import React from "react";
import DatePicker from "shared/utils/date-picker/date-picker";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import { hasValue } from "shared/utils";

const DownloadReport = ({
  handleSearch,
  clearSearch,
  downloadApi,
  processStatus,
  passbookStatus,
  toDate,
  setToDate,
  fromDate,
  setFromDate,
  handleProcessStatusChange,
  handlePassbookStatusChange,
  isStatusFilter,
  hasPermission,
  infoDetails,
  payLoad
}) => {
  const { functionSlice, popUpSlice, loggedInData } = useSelector(
    (state) => state
  );
  const { showErrorMessage } = popUpSlice[0];
  const { isSetProfilePassword } =
    loggedInData && loggedInData.length > 0 && loggedInData[0];

  const {
    openFilePasswordSubmitionModel,
  } = functionSlice[0];

  const handleSuccssCallBack = () => {
    const filePasswordSubmitModelProps = {
      downloadApi,
      payLoad: payLoad
    };
    openFilePasswordSubmitionModel(filePasswordSubmitModelProps);
  };
  const handleDownload = () => {
    handleSuccssCallBack();

    // add models for paword
    // if (isSetProfilePassword) {
    //   const passwordSubmitModelProps = {
    //     payLoad: payLoad,
    //     callBack: () => {
    //       closePasswordSubmitionModel();
    //       handleSuccssCallBack();
    //     },
    //   };
    //   openPasswordSubmitionModel(passwordSubmitModelProps);
    // } else {
    //   showErrorMessage(addPassWordMsg);
    // }
  };
  const handelsearch=()=>{
    if (hasValue(toDate) && !hasValue(fromDate)) {
      showErrorMessage("From Date can not be empty");
    }else {
      handleSearch();
    }
  }
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Box sx={{ ...datePickerstyle }}>
          <DatePicker
            label="From Date"
            value={fromDate}
            maxDate={toDate}
            setValue={setFromDate}
            disableFuture={true}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Box sx={{ ...datePickerstyle }}>
          <DatePicker
            label="To Date"
            clearable
            clearText="Clear me"
            value={toDate}
            minDate={fromDate}
            setValue={(date) => {
              setToDate(date);
            }}
            disableFuture={true}
          />
        </Box>
      </Grid>
      {isStatusFilter && isStatusFilter === true ? (
      <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="demo-select-small" >Verification Status</InputLabel>
            {processStatus !== undefined && (
              <Select
                sx={{ height: '57px' }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={processStatus}
                label="Verification Status"
                onChange={handleProcessStatusChange}
              >
                <MenuItem value={"All"}>Select All</MenuItem>
                <MenuItem value={"AP"}>Verified</MenuItem>
                <MenuItem value={"FA"}>Manual Override</MenuItem>
              </Select>
            )}
          </FormControl>
        
      </Grid>
       ) : null}

      {isStatusFilter && isStatusFilter === true ? (
      <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="demo-select-small" >Verification Type</InputLabel>
            {passbookStatus !== undefined && (
              <Select
                sx={{ height: '57px' }}
                labelId="demo-select-small"
                id="demo-select-small"
                value={passbookStatus}
                label="Passbook Status"
                onChange={handlePassbookStatusChange}
              >
                <MenuItem value={'All'}>Select All</MenuItem>
                <MenuItem value={true}>Manual</MenuItem>
                <MenuItem value={false}>Auto</MenuItem>
              </Select>
            )}
          </FormControl>
       
      </Grid>
        ) : null}
      <Grid item container xs={12} sm={6} md={4} lg={4} spacing={0.5} alignItems="center" justifyContent="flex-start">
        <Grid item >
          <DarkTooltip placement="top" title={"Search"} arrow>
            <ResponsiveFab Movement
              variant="contained"
              size="small"
              button={"N"}
              onClick={handelsearch}
              sx={{ ...primaryFabStyle }}
            >
              <Search width={18} sx={{ color: "#fff" }} />
            </ResponsiveFab>
          </DarkTooltip>
        </Grid>
        <Grid item>
          <DarkTooltip placement="top" title={"Clear Search"} arrow>
            <ResponsiveFab
              variant="contained"
              size="small"
              button={"N"}
              onClick={clearSearch}
              sx={{ ...primaryFabStyle }}
            >
              <Refresh width={18} sx={{ color: "#fff" }} />
            </ResponsiveFab>
          </DarkTooltip>
        </Grid>
        {hasPermission && hasPermission["A008"] && (
          <Grid item >
            <DarkTooltip placement="top" title={"Download"} arrow>
              <ResponsiveFab
                variant="contained"
                size="small"
                button={"N"}
                onClick={handleDownload}
                sx={{ ...primaryFabStyle }}
              >
                <Download width={18} sx={{ color: "#fff" }} />
              </ResponsiveFab>
            </DarkTooltip>
          </Grid>
        )}
       
        <Grid item>
            {infoDetails && hasValue(infoDetails) ?
            <DarkTooltip placement="right" title={infoDetails} arrow>
              <ResponsiveFab
                variant="contained"
                size="small"
                button={"N"}
                sx={{ ...primaryFabStyle }}
              >
                <Info width={18} sx={{ color: "#fff" }} />
              </ResponsiveFab>
            </DarkTooltip>
             : null}
        </Grid>
        
      </Grid>
    </Grid>
  );
};

DownloadReport.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  processStatus: PropTypes.string.isRequired,
  toDate: PropTypes.string,
  setToDate: PropTypes.func.isRequired,
  fromDate: PropTypes.string,
  setFromDate: PropTypes.func.isRequired,
  handleProcessStatusChange: PropTypes.func.isRequired,
};

export default DownloadReport;
