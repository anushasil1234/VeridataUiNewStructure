import { Assessment, Download, Refresh, Search, Summarize } from '@mui/icons-material';
import {
  Fab,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItemButton,
  MenuItem,
  Select,
  TextField,
  Box,
  Checkbox,
  ListItemText,
} from '@mui/material';
import {
  backgroundOverLay,
  downLoadListSx,
  inputFieldStyleAdded,
  inputPropsStyle,
  primaryFabStyle,
  ResponsiveFab,
  datePickerstyle,
} from 'app';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  appointeeCountDetailsHeadCell,
  appointeeCountHeadCell,
  generateAppointeeCountReportDesc,
  reportGenarate,
  toAppointeecount,
} from 'shared/constants/constants';
import {
  CardLayout,
  CreatePdfTableBody,
  DDMMYYYY,
  DateFormatYYYYMMDD,
  PageLayout,
  generateTableRowData,
  hasValue,
} from 'shared/utils';
import { CollapsibleDataTable } from 'shared/utils/dataTable/collapsable-datatable';
import DatePicker from 'shared/utils/date-picker/date-picker';
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip';
import jsPDFReportTemplate from 'shared/utils/associate/js-pdf-invoice';
import moment from 'moment';
import jsPDFReportDataTemplate from 'shared/utils/associate/js-pdf-report';
import ArticleIcon from '@mui/icons-material/Article';
import downloadFile from 'shared/utils/associate/download-file';
import generateBlobFromBase64 from 'shared/utils/associate/generateBlob';
import { getAppointeeCounterReport } from 'server/apis';
import showErrorMessage from 'shared/utils/associate/show-error-message';
const AppointeeCount = () => {
  const apiSlice = useSelector((state) => state.apiSlice);
  const dropdownList = useSelector((state) => state.dropdownList);
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { entityList, processList } = dropdownList && dropdownList.length > 0 && dropdownList[0];
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [rows, setRows] = useState();
  const [appointeeCountDateWise, setAppointeeCountDateWises] = useState();
  const [appointeeCountListDetails, setAppointeeCountListDetails] = useState();
  const [isDownloadListOpened, setIsDownloadListOpened] = useState(false);
  const [isExalListOpened, setisExalListOpened] = useState(false);
  const [appointeeName, setAppointeeName] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [processId, setProcessId] = useState(null);
  const [entityId, setEntityId] = useState([]);
  const [fileData, setFileData] = useState(null);
  const reportFilterStatusList = [
    {
      id: 1,
      name: 'Force Approve',
      code: 'FA',
    },
    {
      id: 2,
      name: 'Approve',
      code: 'AP',
    },
    {
      id: 3,
      name: 'Reject',
      code: 'RJ',
    },
  ];
  const payLoadData = {
    appointeeName: appointeeName,
    statusId: statusCode ? statusCode.toString() : statusCode,
    processId: processId ? processId : null,
    fromDate: fromDate ? DateFormatYYYYMMDD(fromDate?.toString()) : fromDate,
    toDate: toDate ? DateFormatYYYYMMDD(toDate?.toString()) : toDate,
    entityId: entityId,
  };
  let [payLoad, setPayLoad] = useState(payLoadData);
  const fetchTableRows = async ({ appointeeName, statusCode, fromDate, toDate, entityId }) => {
    payLoad = {
      appointeeName: appointeeName,
      statusCode: hasValue(statusCode) ? statusCode.toString() : null,
      fromDate: hasValue(fromDate) ? DateFormatYYYYMMDD(fromDate?.toString()) : null,
      processId: hasValue(processId) ? processId : null,
      toDate: hasValue(toDate) ? DateFormatYYYYMMDD(toDate?.toString()) : null,
      entityId: entityId.length ? entityId : [],
    };
    const response = await getAppointeeCounterReport(payLoad);
    if (response) {
      const { responseInfo } = response;
      const { appointeeCountDateWise, appointeeCountDetails, filedata } = responseInfo || {};
      setAppointeeCountDateWises(appointeeCountDateWise);
      setAppointeeCountListDetails(appointeeCountDetails);
      setFileData(filedata);
      let generatedCells = generateTableRowData(
        appointeeCountDateWise,
        appointeeCountHeadCell,
        null,
        null,
        null,
        'appointeeTotalCount',
      );
      appointeeCountDateWise &&
        appointeeCountDateWise.forEach(({ appointeeCountDetails }, index) => {
          const detailsCells = generateTableRowData(
            appointeeCountDetails,
            appointeeCountDetailsHeadCell,
            null,
          );
          generatedCells[index].detailsCells = detailsCells;
        });
      setRows({
        tableHead: appointeeCountHeadCell,
        tableRows: generatedCells,
      });
    }
  };
  useEffect(() => {
    setAppointeeName(appointeeName);
    setStatusCode(statusCode);
    setFromDate(fromDate);
    setToDate(toDate);
    setEntityId(entityId);
    setProcessId(processId);
  }, [appointeeName, statusCode, fromDate, toDate, entityId]);
  const handleClickOnDownload = () => {
    setIsDownloadListOpened(!isDownloadListOpened);
  };
  const handleExalListDownload = () => {
    setisExalListOpened(!isExalListOpened);
  };
  var date = moment();
  var currentDate = date?.format('DDMMYYYY');
  const handleDownload = () => {
    if (!fileData || fileData.length === 0) {
      showErrorMessage(reportGenarate);
      return;
    }
    if (fileData && typeof fileData === 'object') {
      const base64String = fileData.fileData;
      const fileName = fileData.fileName || 'appointee_data.xlsx';
      const blob = generateBlobFromBase64(base64String);
      const blobUrl = window.URL.createObjectURL(blob);
      downloadFile(blobUrl, fileName);
      window.URL.revokeObjectURL(blobUrl);
    }
  };
  const handleAppointeeCountDownload = () => {
    if (!appointeeCountDateWise || appointeeCountDateWise.length === 0) {
      showErrorMessage(reportGenarate);
      return;
    }
    const tableHeadList = appointeeCountHeadCell.map(({ label }) => ({
      title: label,
    }));
    const tableBodyList =
      appointeeCountDateWise?.map(({ appointeeTotalCount }) =>
        CreatePdfTableBody(appointeeTotalCount, appointeeCountHeadCell),
      ) || [];
    const tableObj = {
      headerList: tableHeadList,
      rows: tableBodyList,
      tableName: 'Count Details',
    };
    jsPDFReportDataTemplate({
      reportDetails: {
        fileName: `Appointee_Count_${currentDate}`,
        label: 'Appointee Count',
        fromDate: fromDate,
        toDate: toDate,
        rptDesc: generateAppointeeCountReportDesc,
      },
      tables: [tableObj],
    });
  };
  const handleAppointeeDetailsDownload = () => {
    if (!appointeeCountDateWise || appointeeCountDateWise.length === 0) {
      showErrorMessage(reportGenarate);
      return;
    }
    let totaltable = [];
    let tableObj;
    const tableHeadList = appointeeCountDetailsHeadCell.map(({ label }) => {
      return {
        title: label,
      };
    });
    if (entityId.length > 0) {
      entityId.map((currEntityId) => {
        const companyWiseTable = appointeeCountListDetails.filter(({ companyId, companyName }) => {
          return currEntityId === companyId;
        });
        if (companyWiseTable.length > 0) {
          const tableBodyList = companyWiseTable.map((appointeeCount) => {
            return CreatePdfTableBody(appointeeCount, appointeeCountDetailsHeadCell);
          });
          tableObj = {
            headerList: tableHeadList,
            rows: tableBodyList,
            tableName: 'Appointee Details',
            companyName: companyWiseTable[0]?.companyName ?? '',
          };
          totaltable.push(tableObj);
        }
      });
    } else {
      entityList?.map((currEntity) => {
        const companyWiseTable = appointeeCountListDetails.filter(({ companyId, companyName }) => {
          return currEntity.id === companyId;
        });
        if (companyWiseTable.length > 0) {
          const tableBodyList = companyWiseTable.map((appointeeCount) => {
            return CreatePdfTableBody(appointeeCount, appointeeCountDetailsHeadCell);
          });
          tableObj = {
            headerList: tableHeadList,
            rows: tableBodyList,
            tableName: 'Appointee Details',
            companyName: currEntity?.name ?? '',
          };
          totaltable.push(tableObj);
        }
      });
    }
    jsPDFReportDataTemplate({
      reportDetails: {
        fileName: `Appointee_Count_${currentDate}`,
        label: 'Appointee Count',
        fromDate: fromDate,
        toDate: toDate,
        rptDesc: generateAppointeeCountReportDesc,
      },
      tables: totaltable,
    });
  };
  const handleSearch = () => {
    const payLoad = {
      appointeeName: appointeeName ? appointeeName.trim() : '',
      statusCode: statusCode ? statusCode.toString() : '',
      fromDate: fromDate ? fromDate : null,
      toDate: toDate ? toDate : null,
      entityId: entityId || null,
      processId: processId ? processId : null,
    };
    fetchTableRows(payLoad);
  };
  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setStatusCode(null);
    setEntityId([]);
    setProcessId(null);
    const clearPayLoad = {
      appointeeName: null,
      fromDate: null,
      toDate: null,
      statusCode: null,
      processId: null,
      entityId: [],
    };
    fetchTableRows(clearPayLoad);
    navigateTo(toAppointeecount, { state: false });
  };
  const handelsearch = () => {
    if (hasValue(toDate) && !hasValue(fromDate)) {
      showErrorMessage('From Date can not be empty');
    } else {
      handleSearch();
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <PageLayout pageName={'Appointee count'}>
      <CardLayout sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box sx={{ ...datePickerstyle }}>
              <DatePicker
                label={'From Date'}
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
                label={'To Date'}
                clearable
                value={toDate}
                minDate={fromDate}
                setValue={setToDate}
                disableFuture={true}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }} size='large'>
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              {statusCode !== undefined && (
                <Select
                  error={false}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  className='customeTextField'
                  sx={inputFieldStyleAdded}
                  value={statusCode}
                  label='Status'
                  inputProps={{
                    style: inputPropsStyle,
                  }}
                  defaultValue={''}
                  onChange={(e) => {
                    setStatusCode(e.target.value);
                  }}
                >
                  {reportFilterStatusList &&
                    reportFilterStatusList.map((element, index) => {
                      return (
                        <MenuItem key={index} value={element.code}>{`${element.name}`}</MenuItem>
                      );
                    })}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }} size='large'>
              <InputLabel id='demo-simple-select-label'>Process</InputLabel>
              {processId !== undefined && (
                <Select
                  error={false}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  className='customeTextField'
                  sx={inputFieldStyleAdded}
                  value={processId}
                  label='Process'
                  inputProps={{
                    style: inputPropsStyle,
                  }}
                  defaultValue={''}
                  onChange={(e) => {
                    setProcessId(e.target.value);
                  }}
                >
                  {processList &&
                    processList.map((element, index) => {
                      return (
                        <MenuItem key={index} value={element.id}>{`${element.name}`}</MenuItem>
                      );
                    })}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl sx={{ width: '100%' }} size='large'>
              <InputLabel id='demo-simple-select-label'>Entity</InputLabel>
              {statusCode !== undefined && (
                <Select
                  error={false}
                  labelId='demo-multiple-select-label'
                  id='demo-multiple-select'
                  className='customeTextField'
                  sx={inputFieldStyleAdded}
                  multiple
                  value={entityId}
                  label='entityId'
                  inputProps={{
                    style: inputPropsStyle,
                  }}
                  defaultValue={[]}
                  onChange={(e) => {
                    setEntityId(e.target.value);
                  }}
                  renderValue={(selected) => {
                    return entityList
                      .filter((element) => selected.includes(element.id))
                      .map((element) => element.name)
                      .join(', ');
                  }}
                >
                  {entityList &&
                    entityList.map((element, index) => {
                      return (
                        <MenuItem key={index} value={element.id}>
                          <Checkbox checked={entityId.indexOf(element.id) > -1} />
                          <ListItemText primary={element.name} />
                        </MenuItem>
                      );
                    })}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              error={/[^\w\s]/.test(appointeeName)}
              style={inputFieldStyleAdded}
              type='text'
              className='customeTextField'
              variant='outlined'
              onChange={(e) => {
                const value = e.target.value;
                const isValid = /^[a-zA-Z\s]*$/.test(value);
                if (isValid) {
                  setAppointeeName(value);
                }
              }}
              value={appointeeName || ''}
              inputStyle={{ padding: 0 }}
              inputProps={{
                style: inputPropsStyle,
              }}
              label={'Appointee Name'}
              defaultValue={''}
              multiline
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <DarkTooltip placement='top' title={'Search'} arrow>
                <ResponsiveFab
                  variant='contained'
                  size='small'
                  button={'N'}
                  onClick={handelsearch}
                  sx={primaryFabStyle}
                >
                  <Search width={18} sx={{ color: '#fff' }} />
                </ResponsiveFab>
              </DarkTooltip>
              <DarkTooltip placement='top' title={'Clear Search'} arrow>
                <ResponsiveFab
                  variant='contained'
                  size='small'
                  button={'N'}
                  onClick={clearSearch}
                  sx={primaryFabStyle}
                >
                  <Refresh width={18} sx={{ color: '#fff' }} />
                </ResponsiveFab>
              </DarkTooltip>
              <Box sx={{ position: 'relative' }}>
                <DarkTooltip placement='top' title={'Download Report(pdf)'} arrow>
                  <ResponsiveFab
                    variant='contained'
                    size='small'
                    button={'N'}
                    onClick={handleClickOnDownload}
                    sx={primaryFabStyle}
                  >
                    <Download width={18} />
                  </ResponsiveFab>
                </DarkTooltip>
                {isDownloadListOpened && (
                  <List sx={downLoadListSx}>
                    <ListItemButton component='a'>
                      <DarkTooltip placement='top' title={'Download AppointeeCount'} arrow>
                        <ResponsiveFab
                          variant='contained'
                          size='small'
                          button={'N'}
                          onClick={handleAppointeeCountDownload}
                          sx={primaryFabStyle}
                        >
                          <Summarize width={18} />
                        </ResponsiveFab>
                      </DarkTooltip>
                    </ListItemButton>
                    <ListItemButton component='a'>
                      <DarkTooltip placement='top' title={'Download Appointee Details Count'} arrow>
                        <ResponsiveFab
                          variant='contained'
                          size='small'
                          button={'N'}
                          onClick={handleAppointeeDetailsDownload}
                          sx={primaryFabStyle}
                        >
                          <Assessment width={18} />
                        </ResponsiveFab>
                      </DarkTooltip>
                    </ListItemButton>
                    <ListItemButton component='a'>
                      <DarkTooltip placement='top' title={'Download Appointee Count(xlsx)'} arrow>
                        <ResponsiveFab
                          variant='contained'
                          size='small'
                          button={'N'}
                          onClick={handleDownload}
                          sx={primaryFabStyle}
                        >
                          <ArticleIcon width={18} />
                        </ResponsiveFab>
                      </DarkTooltip>
                    </ListItemButton>
                  </List>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <CollapsibleDataTable
          headCells={appointeeCountHeadCell}
          rows={rows}
          detailsHeadCells={appointeeCountDetailsHeadCell}
          detailsTableName={'Details'}
        />
      </CardLayout>
    </PageLayout>
  );
};
export default AppointeeCount;
