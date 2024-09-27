import { Download, Info, Refresh, Search } from "@mui/icons-material";
import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { primaryFabStyle,ResponsiveFab } from "app";
import React from "react";
import DatePicker from "shared/utils/date-picker/date-picker";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import { addPassWordMsg, verifiedReportInfo } from "shared/constants/constants";
import { hasValue } from "shared/utils";

const DownloadReport = ({
  handleSearch,
  clearSearch,
  downloadApi,
  payLoad,
  processStatus,
  toDate,
  setToDate,
  fromDate,
  setFromDate,
  handleProcessStatusChange,
  isStatusFilter,
  hasPermission,
  infoDetails
}) => {
  const { functionSlice, popUpSlice, loggedInData } = useSelector(
    (state) => state
  );
  const { showErrorMessage } = popUpSlice[0];
  const { isSetProfilePassword } =
    loggedInData && loggedInData.length > 0 && loggedInData[0];

  const {
    openPasswordSubmitionModel,
    openFilePasswordSubmitionModel,
    closePasswordSubmitionModel,
  } = functionSlice[0];
  
  const handleSuccssCallBack = () => {
    const filePasswordSubmitModelProps = {
      downloadApi,
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
  return (
    <Stack my={2} direction="row" justifyContent={"left"} alignItems={"center"}>
      <Box>
        <DatePicker
          label={"From Date"}
          value={fromDate}
          maxDate={toDate}
          setValue={setFromDate}
          disableFuture={true}
        />
      </Box>
      <Box mx={"0.5rem"}>
        <DatePicker
          label={"To Date"}
          clearable
          clearText="Clear me"
          value={toDate}
          minDate={fromDate}
          setValue={setToDate}
          disableFuture={true}
        />
      </Box>
      <Box display="flex" alignItems="center" spacing={1} >
      {isStatusFilter && isStatusFilter === true ? (
        <FormControl sx={{ m: 1, minWidth: 180, }} size="small">
          <InputLabel id="demo-select-small" >Status</InputLabel>
          {processStatus !== undefined && (
            <Select
            sx={{height:'57px'}}
              labelId="demo-select-small"
              id="demo-select-small"
              value={processStatus}
              label="Status"
              onChange={handleProcessStatusChange}
            >
              <MenuItem value={"All"}>Select all</MenuItem>
              <MenuItem value={"AP"}>Verified</MenuItem>
              <MenuItem value={"FA"}>Manual Override</MenuItem>
            </Select>
          )}
        </FormControl>
      ) : null}
      </Box>
      <DarkTooltip placement="top" title={"Search"} arrow>
        <ResponsiveFab  Movement
          variant="contained"
          size="small"
          button={"N"}
          onClick={handleSearch}
          // backgroundColor={downloadcolor}
          // hoverColor={secondary}
          sx={primaryFabStyle}
        >
          <Search width={18} sx={{ color: "#fff" }} />
        </ResponsiveFab>
      </DarkTooltip>
      <DarkTooltip placement="top" title={"Clear Search"} arrow>
        <ResponsiveFab 
          variant="contained"
          size="small"
          button={"N"}
          onClick={clearSearch}
          sx={primaryFabStyle}
        >
          <Refresh width={18} sx={{ color: "#fff" }} />
        </ResponsiveFab>
      </DarkTooltip>
      {hasPermission && hasPermission["A008"] && (
        <DarkTooltip placement="top" title={"Download"} arrow>
          <ResponsiveFab 
            variant="contained"
            size="small"
            button={"N"}
            onClick={handleDownload}
            sx={primaryFabStyle}
          >
            <Download width={18} sx={{ color: "#fff" }} />
          </ResponsiveFab>
        </DarkTooltip>
      )}
      {infoDetails && hasValue(infoDetails) ?
        <DarkTooltip placement="right" title={infoDetails} arrow>
          <ResponsiveFab 
            variant="contained"
            size="small"
            button={"N"}
            sx={primaryFabStyle}
          >
            <Info width={18} sx={{ color: "#fff" }} />
          </ResponsiveFab>
        </DarkTooltip>
        : null
        }
    </Stack>
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
