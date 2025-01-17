import {
  Download,
  Info,
  Refresh,
  Search,
  Summarize,
} from "@mui/icons-material";
import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Hidden,
  List,
  ListItemButton,
} from "@mui/material";
import {
  downLoadListSx,
  inputFieldStyle,
  primaryFabStyle,
  ResponsiveFab,
} from "app";
import React, { useState } from "react";
import DatePicker from "shared/utils/date-picker/date-picker";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import { DateFormatYYYYMMDD, hasValue } from "shared/utils";
import moment from "moment";
import ArticleIcon from "@mui/icons-material/Article";
import Button from "@mui/material/Button";
import { noMovementInfo, noResponseInfo, toHelp } from "shared/constants/constants";
const DownloadAgingReport = ({
  filterType,
  setFilterType,
  handleSearch,
  clearSearch,
  handleDownload,
  fromDate,
  payLoad,
  setPayLoad,
  setFromDate,
  noOfDays,
  setNoOfDays,
  handleNoOfDaysChange,
  hasPermission,
  handelxlsxDownload,
  reportType
}) => {
  // console.log('noOfDays',noOfDays);
  const { popUpSlice } = useSelector((state) => state);
  const currentDate = moment();
  const _currentDate = currentDate.format("DD/MM/YYYY");
  const { showErrorMessage } = popUpSlice[0];
  const [isDownloadListOpened, setIsDownloadListOpened] = useState(false);
  const handleDownloadClick = () => {
    setIsDownloadListOpened(!isDownloadListOpened);
  };
  const handleReportSearch = () => {
    if (filterType === 0) {
      setFromDate(null);
      handleSearch();
    } else if (hasValue(fromDate)) {
      handleSearch();
    } else {
      showErrorMessage("From Date can not be empty");
    }
  };

  // const handleNoOfInactivityDaysChange = (event) => {
  //   const value = event?.target?.value;

  //   const _startDate = fromDate && DateFormatYYYYMMDD(fromDate?.toString());
  //   const startDate = moment(_startDate);
  //   const daydiff = moment(currentDate).diff(moment(startDate), "days");
  //   if (value >= 0 && value <= daydiff) {
  //     handleNoOfDaysChange(value);
  //   }
  // };
  const handleNoOfInactivityDaysChange = (event) => {
    const value = event?.target?.value;
  
    if (filterType === 1) {
      const _startDate = fromDate && DateFormatYYYYMMDD(fromDate?.toString());
      const startDate = moment(_startDate);
      const daydiff = moment(currentDate).diff(moment(startDate), "days");
      if (value >= 0 && value <= daydiff) {
        handleNoOfDaysChange(value);
      }
    }
  };
  const handleFilterChange = (value) => {
    setFilterType(value);
    
    if (value === 0) {
      setNoOfDays(null);
      setFromDate(null);
      setPayLoad({ ...payLoad, startDate: null, noOfDays: 0 });
    }
  };
  return (
    <Box
      my={2}
      display="flex"
      flexWrap="wrap"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ gap: { xs: 1, sm: 2 }, p: { xs: 1, sm: 2 } }}
    >
      <Box
        sx={{
          mr: { xs: 0, md: 2 },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <FormControl sx={{ minWidth: 180 }} size="large">
          <InputLabel id="demo-select-small">Filter</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={filterType}
            label="Filter"
           // onChange={(e) => setFilterType(e.target.value)}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Custom</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filterType !== 0 && (
        <>
          <Box
            sx={{
              width: { xs: "100%", sm: "200px" },
              mr: { xs: 0, sm: 2 },
              mb: { xs: 2, sm: 0 },
            }}
          >
            <DatePicker
              label="From Date"
              value={fromDate}
              setValue={setFromDate}
              disableFuture={true}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            sx={{
              width: { xs: "100%", sm: "auto" },
              flexWrap: "wrap",
              mb: { xs: 2, sm: 0 },
              mr: { xs: 0, sm: 3 },
            }}
          >
            <span
              style={{
                marginRight: "auto",
                whiteSpace: "normal",
                wordBreak: "normal",
                maxWidth: "100px",
              }}
              className="responsive-text"
            >
              No of Days of Inactivity
            </span>
            <TextField
              style={{
                width: "140px",
                marginLeft: "4px",
              }}
              type="number"
              variant="outlined"
              value={noOfDays}
              onChange={handleNoOfInactivityDaysChange}
              placeholder="No of Days"
              InputProps={{
                inputProps: { min: 0 },
                style: { fontSize: "16px", fontWeight: "1px" },
              }}
              disabled={!hasValue(fromDate)}
            />
            <span style={{ marginLeft: "1rem" }}>as on {_currentDate}</span>
          </Box>
        </>
      )}

      <Box
        display="flex"
        alignItems="center"
        ml={1}
        sx={{ flexWrap: "nowrap", gap: { xs: 1, sm: 0.4 } }}
      >
        <DarkTooltip placement="top" title="Search" arrow>
          <ResponsiveFab
            variant="contained"
            size="small"
            button="N"
            onClick={handleReportSearch}
            sx={{ ...primaryFabStyle }}
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
          <Box sx={{ position: "relative" }}>
            <DarkTooltip placement="top" title="Download Report" arrow>
              <ResponsiveFab
                variant="contained"
                size="small"
                button="N"
                onClick={handleDownloadClick}
                sx={{ ...primaryFabStyle }}
              >
                <Download width={18} sx={{ color: "#fff" }} />
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
                    title="Download PDF Report"
                    arrow
                  >
                    {/* <ResponsiveFab
                      variant="contained"
                      size="small"
                      button="N"
                      sx={primaryFabStyle}
                      onClick={handleDownload}
                    >
                      <Summarize  width={18} sx={{ color: "#fff" }} />
                    </ResponsiveFab> */}
                    <Button variant="contained" onClick={handleDownload}>
                      PDF
                    </Button>
                  </DarkTooltip>
                </ListItemButton>

                <ListItemButton component="a">
                  <DarkTooltip
                    placement="top"
                    title="Download XLSX Report"
                    arrow
                  >
                    {/* <ResponsiveFab
                      variant="contained"
                      size="small"
                      button="N"
                      onClick={ handelxlsxDownload}
                      sx={primaryFabStyle}
                    >
                      <ArticleIcon width={18} sx={{ color: "#fff" }} />
                    </ResponsiveFab> */}
                    <Button variant="contained" onClick={handelxlsxDownload}>
                      XLSX
                    </Button>
                  </DarkTooltip>
                </ListItemButton>
              </List>
            )}
          </Box>
        )}
        <DarkTooltip
          placement="top"
          title={reportType === 'NORESPNSE' ? noResponseInfo(noOfDays ?? 0) : reportType === 'NOMVMENT' ? noMovementInfo(noOfDays ?? 0) : ''}
          arrow
        >
          <ResponsiveFab
            variant="contained"
            size="small"
            button="N"
            // onClick={clearSearch}
            sx={{ ...primaryFabStyle }}
          >
            <Info width={18} sx={{ color: "#fff" }} />
          </ResponsiveFab>
        </DarkTooltip>
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
