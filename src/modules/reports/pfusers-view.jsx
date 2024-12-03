import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ActionPermission from "shared/components/action-permission/action-permission";
import DownloadReport from "shared/components/download-report/download-report";
import { GetPfCreationListTableHeadCell, downloadPfCreationApponteeList_URL, toPFUsers, uploadedFromDateEmptyMsg } from "shared/constants/constants";
import { CardLayout, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData, hasValue } from "shared/utils";
import { removeActionRoute } from "store/slices/action-route-slice";

const UnwappedPFUsers = (props) => {
  const { hasPermission } = props;
  const { state } = useLocation();
  let noOfDays = 0;
  let isFiltered = false;
  if (state) {
    if (state.dayRangePayLoad) {
      noOfDays = state.dayRangePayLoad;
      isFiltered = true;
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
  let [payLoad, setPayLoad] = useState({
    isFiltered: state && state.dayRangePayLoad ? true : false,
    noOfDays: state && state.dayRangePayLoad ? state.dayRangePayLoad : 0,
    filterType: state && state.filterType,
    appointeeName: state && state.appointeeName,
    isPfRequired: null,
    processStatus: null,
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString())
  });
  const [rows, setRows] = useState([]);
  const handleProcessStatusChange = async (e) => {
    const { value } = e.target;
    setProcessStatus(value);
  
    const updatedPayLoad = {
      ...payLoad,
      processStatus: value === "All" ? null : value,
    };
  
    setPayLoad(updatedPayLoad);
  };
  

  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setProcessStatus('All');
    const newPayLoad = {
      ...payLoad,
      fromDate: null,
      toDate: null,
      isFiltered: false,
      noOfDays: 0,
      filterType: null,
      appointeeName: null,
      candidateId: null,
      isPfRequired: null,
      processStatus: null,
    };
    setPayLoad(newPayLoad);
    setTableRows(newPayLoad); 
    navigateTo(toPFUsers, { state: false });
  };
  

  const apiSlice = useSelector(state => state.apiSlice);
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
 
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { getPfCreationAppointeeReportList } = apiSlice[0];
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const { showErrorMessage } = popUpSlice[0]
  const setTableRows = async (updatedPayLoad) => {
    const response = await getPfCreationAppointeeReportList(updatedPayLoad);
    if (response) {
      const { responseInfos } = response;
      let generatedCells = generateTableRowData(
        responseInfos,
        GetPfCreationListTableHeadCell,
        null,
        hasPermission
      );
      setRows({
        tableHead: GetPfCreationListTableHeadCell,
        tableRows: generatedCells,
      });
    }
  };
  const handleSearch = () => {
    if (!hasValue (fromDate)) {
      showErrorMessage(uploadedFromDateEmptyMsg);
      return;
    }
    setTableRows(payLoad);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payLoad);
    }
  }, [actionRouteSlice, hasPermission]);
  useEffect(() => {
    const updatedPayLoad = {
      ...payLoad,
      fromDate: fromDate ? DateFormatYYYYMMDD(fromDate.toString()) : null,
      toDate: toDate ? DateFormatYYYYMMDD(toDate.toString()) : null,
    };
    setPayLoad(updatedPayLoad);
  }, [fromDate, toDate]);
 
  return (
    <PageLayout pageName={"PF Users List"}>
      <CardLayout>
        <DownloadReport
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          payLoad={payLoad}
          downloadApi={downloadPfCreationApponteeList_URL}
          processStatus={processStatus}
          toDate={toDate}
          setToDate={setToDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          handleProcessStatusChange={handleProcessStatusChange}
          isStatusFilter={false}
          hasPermission={hasPermission}
        />

        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={GetPfCreationListTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  );
};

const PFUsers = ActionPermission(UnwappedPFUsers);

export default PFUsers;
