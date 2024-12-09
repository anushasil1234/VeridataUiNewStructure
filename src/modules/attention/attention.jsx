import { Info, Refresh, Search } from '@mui/icons-material';
import { Box, Fab,  Stack } from '@mui/material';
import { primaryFabStyle } from 'app';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ActionPermission from 'shared/components/action-permission/action-permission';
import { attentionInfo, criticalListTableHeadCell, FromDateEmptyMsg, uploadedFromDateEmptyMsg } from 'shared/constants/constants';
import { CardLayout, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData, hasValue } from 'shared/utils';
import DatePicker from 'shared/utils/date-picker/date-picker';
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip';
import { removeActionRoute } from 'store/slices/action-route-slice';


const UnwrappedAttention = (props) => {

  const { hasPermission } = props;

  const apiSlice = useSelector(state => state.apiSlice);
  const loggedInData = useSelector(state => state.loggedInData);
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const {showErrorMessage} =popUpSlice[0]
  const { getCriticalAppointeeList } = apiSlice[0];
  const { companyId } = loggedInData[0];

  const [rows, setRows] = useState([]);
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const defaultPayLoad = {
    companyId: companyId,
    fromDate: null,
    toDate: null
  }
  let [payLoad, setPayLoad] = useState(defaultPayLoad);

  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setTableRows(defaultPayLoad);
  }
  const setTableRows = async (payLoad) => {
    const response = await getCriticalAppointeeList(payLoad);
    if (response) {
      const { responseInfos } = response;

      let generatedCells = generateTableRowData(responseInfos, criticalListTableHeadCell, null, hasPermission);
     
      setRows({
        tableHead: criticalListTableHeadCell,
        tableRows: generatedCells
      });
    }
  }
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payLoad);
    }
  }, [actionRouteSlice, hasPermission]);
  useEffect(() => {
    payLoad.fromDate = DateFormatYYYYMMDD(fromDate?.toString());
    payLoad.toDate = DateFormatYYYYMMDD(toDate?.toString());
    setPayLoad(payLoad);
  }, [fromDate, toDate])
  const handleSearch = () => {
    if (!hasValue (fromDate)) {
      showErrorMessage(FromDateEmptyMsg);
      return;
    }
    setTableRows(payLoad);
  };
  const handelsearch=()=>{
    if (hasValue(toDate) && !hasValue(fromDate)) {
      showErrorMessage("From Date can not be empty");
    }else {
      handleSearch();
    }
  }
  return (
    <PageLayout pageName={"Attention List"}>
      <CardLayout>
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
              value={toDate}
              minDate={fromDate}
              setValue={setToDate}
              disableFuture={true}
            />
          </Box>
          <DarkTooltip placement="top" title={"Search"} arrow>
            <Fab
              variant="contained"
              size="small"
              button={"N"}
              onClick={handelsearch}
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
          <DarkTooltip placement="top" title={attentionInfo} arrow>
            <Fab
              variant="contained"
              size="small"
              button={"N"}
          //    onClick={clearSearch}
              sx={primaryFabStyle}
            >
              <Info width={18} sx={{ color: "#fff" }} />
            </Fab>
          </DarkTooltip>
        </Stack>
        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={criticalListTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  )
}

const Attention = ActionPermission(UnwrappedAttention);
export default Attention