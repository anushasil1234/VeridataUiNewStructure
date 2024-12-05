import { Download, Info, Refresh, Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemButton,
  MenuItem,
  Select,
} from "@mui/material";
import Button from '@mui/material/Button';
import { datePickerstyle, downLoadListSx, inputFieldStyleAdded, primaryFabStyle, ResponsiveFab } from "app";
import React, { useState } from "react";
import DatePicker from "shared/utils/date-picker/date-picker";
import PropTypes from "prop-types";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import { hasValue } from "shared/utils";
import { useSelector } from "react-redux";
import { pfPensionInfo } from "shared/constants/constants";


const DownloadPFReport = ({
  handleSearch,
  clearSearch,
  passbookStatus,
  toDate,
  setToDate,
  fromDate,
  setFromDate,
  handleDownload,
  handlePdfDownload,
  handlePassbookStatusChange,
  ispassFilter,
  hasPermission,
  infoDetails,
  ispensionfilter,
  handleProcessPansionChange,
  pensionStatus,
  PfType,
  EpsGap,
  handelprocessPFchange,
  handelprocessEPSgapchange
}) => {
  const [isDownloadListOpened, setIsDownloadListOpened] = useState(false);
  const {popUpSlice} = useSelector(
    (state) => state
  );
  const { showErrorMessage } = popUpSlice[0];
  const handleClickOnDownload = () => {
    setIsDownloadListOpened(!isDownloadListOpened);
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
            setValue={setToDate}
            disableFuture={true}
          />
        </Box>
      </Grid>
      {ispensionfilter && ispensionfilter === true ? (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl sx={{ width: "100%" }} size="large">
            <InputLabel id="demo-simple-select-label" >PF Type</InputLabel>
            <Select
              sx={inputFieldStyleAdded}
              labelId="demo-simple-select-label"
              id="demo-select-small"
              className="customeTextField"
              value={PfType}
              label="Pf Status"
              onChange={handelprocessPFchange}
            >
              <MenuItem value={1}>Trust</MenuItem>
              <MenuItem value={2}>EPFO</MenuItem>
              <MenuItem value={4}>Trust+EPFO</MenuItem>
              <MenuItem value={3}>NA</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      ) : null}
      {ispassFilter && ispassFilter === true && PfType === 2 || PfType === 4 ? (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl sx={{ width: "100%" }} size="large">
            <InputLabel id="demo-simple-select-label">Verification Type</InputLabel>
            {passbookStatus !== undefined && (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="customeTextField"
                sx={inputFieldStyleAdded}
                value={passbookStatus}
                label="Verification Type"
                onChange={handlePassbookStatusChange}
              >
                <MenuItem value={3}>All</MenuItem>
                <MenuItem value={1}>Manual</MenuItem>
                <MenuItem value={2}>Auto</MenuItem>
                
              </Select>
            )}
          </FormControl>
        </Grid>
      ) : null}

      {ispensionfilter && ispensionfilter === true ? (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl sx={{ width: "100%" }} size="large">
            <InputLabel id="demo-simple-select-label" >EPS Membership</InputLabel>
            <Select
              sx={inputFieldStyleAdded}
              labelId="demo-simple-select-label"
              id="demo-select-small"
              className="customeTextField"
              value={pensionStatus}
              label="EPS Membership"
              onChange={handleProcessPansionChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={'NA'}>NA</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      ) : null}
       <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl sx={{ width: "100%" }} size="large">
            <InputLabel id="demo-simple-select-label" >EPS Gap</InputLabel>
            <Select
              sx={inputFieldStyleAdded}
              labelId="demo-simple-select-label"
              id="demo-select-small"
              className="customeTextField"
              value={EpsGap}
              label="EPS Gap"
              onChange={handelprocessEPSgapchange}
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={2}>No</MenuItem>
              <MenuItem value={3}>NA</MenuItem>
             
            </Select>
          </FormControl>
        </Grid>
      <Grid item container xs={12} sm={6} md={4} lg={3} spacing={0.5} alignItems="center" justifyContent="flex-start">
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
          <Grid item sx={{ position: 'relative' }}>
            <DarkTooltip placement="top" title={"Download Report"} arrow>
              <ResponsiveFab
                variant="contained"
                size="small"
                button={"N"}
                onClick={handleClickOnDownload}
                sx={primaryFabStyle}
              >
                <Download width={18} />
              </ResponsiveFab>
            </DarkTooltip>
            {isDownloadListOpened && (
              <List
                sx={{
                  ...downLoadListSx,
                  zIndex: 1000,
                }}
              >
                <ListItemButton component="a">
                  <DarkTooltip
                    placement="top"
                    title={"Download pdf report"}
                    arrow
                  >
                    <Button variant="contained" onClick={handlePdfDownload} >PDF</Button>
                  </DarkTooltip>
                </ListItemButton>
                <ListItemButton component="a">
                  <DarkTooltip
                    placement="top"
                    title={"Download xlsx report"}
                    arrow
                  >
                    <Button variant="contained" onClick={handleDownload}>XLSX</Button>
                  </DarkTooltip>
                </ListItemButton>
              </List>
            )}
          </Grid>
        )}
         <Grid item>
          <DarkTooltip placement="top" title={pfPensionInfo} arrow>
            <ResponsiveFab
              variant="contained"
              size="small"
              button={"N"}
            //  onClick={clearSearch}
              sx={{ ...primaryFabStyle }}
            >
              <Info width={18} sx={{ color: "#fff" }} />
            </ResponsiveFab>
          </DarkTooltip>
        </Grid>
        {/* <Grid item>
          {infoDetails && hasValue(infoDetails) ?
            <DarkTooltip placement="right" title={infoDetails} arrow>
              <ResponsiveFab
                variant="contained"
                size="small"
                button={"N"}
                sx={{ ...primaryFabStyle }}
              >
                <Info width={18} sx={{ color: "#fff" }} />
              </ResponsiveFab>=
            </DarkTooltip>
            : null}
        </Grid> */}
      </Grid>
    </Grid>
  );
};

DownloadPFReport.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleDownload: PropTypes.func.isRequired,
  passbookStatus: PropTypes.number,
  toDate: PropTypes.string,
  PfType: PropTypes.number,
  setToDate: PropTypes.func.isRequired,
  fromDate: PropTypes.string,
  setFromDate: PropTypes.func.isRequired,
  handleProcessPansionChange: PropTypes.func.isRequired,
  handelprocessPFchange: PropTypes.func.isRequired,
  handlePassbookStatusChange: PropTypes.func.isRequired
};

export default DownloadPFReport;
