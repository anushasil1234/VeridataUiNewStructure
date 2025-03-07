import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRejectedAppointeeList } from 'server/apis';
import ActionPermission from 'shared/components/action-permission/action-permission';
import DownloadReport from 'shared/components/download-report/download-report';
import { cancelledInfo, downloadRejectedList_URL, FromDateEmptyMsg, rejectedListTableHeadCell, toCancelled, uploadedFromDateEmptyMsg } from 'shared/constants/constants';
import { CardLayout, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData, hasValue } from 'shared/utils';
import { removeActionRoute } from 'store/slices/action-route-slice';

const UnwrappedCancelled = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();
  // const popUpSlice = useSelector((state) => state.popUpSlice);
  // const { showErrorMessage } = popUpSlice[0]
  let noOfDays = 0;

  if (state) {
    if (state.dayRangePayLoad) {
      noOfDays = state.dayRangePayLoad;
    }
  }
  let _fromday;
  let _today;
  if (noOfDays > 0) {
    const now = new Date();
    _fromday = dayjs(new Date(now.setDate(now.getDate() - noOfDays)));
    _today = dayjs(new Date());
  }

  const [toDate, setToDate] = useState(_today);
  const [fromDate, setFromDate] = useState(_fromday);

  const [processStatus, setProcessStatus] = useState("All");
  const payloadData = {
    appointeeName: state && state.appointeeName,
    candidateId: state && state.candidateId,
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
  }

  let [payLoad, setPayLoad] = useState(payloadData)

  const [rows, setRows] = useState([]);
  const handleProcessStatusChange = async (e) => {
    const { value } = e.target;
    setProcessStatus(value);
    payLoad.processStatus = value === "All" ? null : value;

    setPayLoad(payLoad)
  }

  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setProcessStatus('All');
    const payLoad = {
      isFiltered: false,
      noOfDays: 0,
      filterType: null,
      appointeeName: null,
      candidateId: null,
      isPfRequired: null,
      processStatus: null
    }
    setPayLoad(payLoad);
    setTableRows(payLoad);
    navigateTo(toCancelled, {state:false});
  }

  const apiSlice = useSelector(state => state.apiSlice);
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
 
  const { navigateTo } = commonHooksFunctionSlice[0];
  // const { getRejectedAppointeeList } = apiSlice[0];

  const setTableRows = async (payLoad) => {
    const response = await getRejectedAppointeeList(payLoad);
    if (response) {
      const { responseInfos } = response
      let generatedCells = generateTableRowData(responseInfos, rejectedListTableHeadCell, null, hasPermission);
      setRows({
        tableHead: rejectedListTableHeadCell,
        tableRows: generatedCells
      });
    }
  }
  const handleSearch = () => {
    // if (!hasValue (fromDate)) {
    //   showErrorMessage(FromDateEmptyMsg);
    //   return;
    // }
    setTableRows(payLoad);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payloadData);
    }
  }, [actionRouteSlice, state, hasPermission]);
  useEffect(() => {
    payLoad.fromDate = DateFormatYYYYMMDD(fromDate?.toString());
    payLoad.toDate = DateFormatYYYYMMDD(toDate?.toString());
    setPayLoad(payLoad);
  }, [fromDate, toDate])
  return (
    <PageLayout pageName={"cancelled List"}>
      <CardLayout>
        <DownloadReport
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          payLoad={payLoad}
          downloadApi={downloadRejectedList_URL}
          processStatus={processStatus}
          toDate={toDate}
          setToDate={setToDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          handleProcessStatusChange={handleProcessStatusChange}
          isStatusFilter={false}
          hasPermission={hasPermission}
          infoDetails={cancelledInfo}
        />

        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={rejectedListTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  )
}
const Cancelled = ActionPermission(UnwrappedCancelled);
export default Cancelled