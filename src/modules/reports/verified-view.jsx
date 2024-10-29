import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ActionPermission from "shared/components/action-permission/action-permission";
import DownloadReport from "shared/components/download-report/download-report";
import { downloadVerifiedList_URL, toVerified, verifiedListTableHeadCell, verifiedReportInfo } from "shared/constants/constants";
import { CardLayout, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData } from "shared/utils";
import { removeActionRoute } from "store/slices/action-route-slice";
import { storeData } from "store/slices/data-slice";


const UnWrappedVerified = (props) => {
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
  let _fromday = null;
  let _today = null;
  if (noOfDays > 0) {
    const now = new Date();
    _fromday = dayjs(new Date(now.setDate(now.getDate() - noOfDays)));
    _today = dayjs(new Date());
  }

  const [pageName, setPageName] = useState(null);
  const [toDate, setToDate] = useState(_today);
  const [fromDate, setFromDate] = useState(_fromday);
  const [processStatus, setProcessStatus] = useState("All");
  const [passbookStatus, setPassbookStatus] = useState('All');

  let payloadData = {
    isFiltered: state && state.dayRangePayLoad ? true : false,
    noOfDays: state && state.dayRangePayLoad ? state.dayRangePayLoad : 0,
    filterType: state && state.filterType,
    appointeeName: state && state.appointeeName,
    candidateId: state && state.candidateId,
    isPfRequired: null,
    processStatus: null,
    fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
    toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
    IsManualPassbook: null,
  }

  let [payLoad, setPayLoad] = useState(payloadData);

  const [rows, setRows] = useState([]);
  const handleProcessStatusChange = async (e) => {
    const { value } = e.target;
    setProcessStatus(value);
    const _processStatus = value === "All" ? null : value;
    const _payLoad = {...payLoad, processStatus: _processStatus }
    setPayLoad(_payLoad);
  };
  const handlePassbookStatusChange = async (e) => {
    const { value } = e.target;
    setPassbookStatus(value);
     const _passbookStatus = value === "All" ? null : value;
    const _payLoad = {...payLoad, IsManualPassbook: _passbookStatus }
    setPayLoad(_payLoad);
  };

  const clearSearch = () => {
    setFromDate(null);
    setToDate(null);
    setProcessStatus('All');
    setPassbookStatus('All');
    const payLoad = {
      isFiltered: false,
      noOfDays: 0,
      filterType: null,
      appointeeName: null,
      candidateId: null,
      isPfRequired: null,
      processStatus: null,
      IsManualPassbook:null
    }
    setPayLoad(payLoad);
    setTableRows(payLoad);
    navigateTo(toVerified, { state: false });
  }


  const apiSlice = useSelector(state => state.apiSlice);
  const actionRouteSlice = useSelector(state => state.actionRouteSlice);
  const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);

  const { getVerifiedAppointeeList } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];


  const setTableRows = async (payLoad) => {
    setPageName(
      isFiltered === true && noOfDays > 0
        ? `verified List`
        : "verified List"
    );
    const response = await getVerifiedAppointeeList(payLoad);
    if (response) {
      const { responseInfos } = response;
      let generatedCells = generateTableRowData(
        responseInfos,
        verifiedListTableHeadCell,
        null,
        hasPermission
      );
      const _rows = {
        tableHead: verifiedListTableHeadCell,
        tableRows: generatedCells,
      }
      setRows({
        ..._rows
      });
    }
  };

  const updatDatePayLoad = (filePassword) => {
    const _payLoad = { ...payLoad, filePassword }
    setPayLoad(_payLoad);
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeActionRoute());
    if (actionRouteSlice.length === 0 && hasPermission) {
      setTableRows(payloadData);
    }
  }, [state, actionRouteSlice, hasPermission]);

  useEffect(() => {
    const _payLoad = {
      ...payLoad,
      fromDate: DateFormatYYYYMMDD(fromDate?.toString()),
      toDate: DateFormatYYYYMMDD(toDate?.toString())
    }

    setPayLoad(_payLoad);
  }, [fromDate, toDate]);

  // useEffect(() => {
  //   dispatch(storeData({
  //     fileSubmitionPayLoad: payLoad
  //   }))

  // }, [payLoad])

  return (
    <PageLayout pageName={pageName}>
      <CardLayout>
        <DownloadReport
          handleSearch={() => setTableRows(payLoad)}
          clearSearch={clearSearch}
          payLoad={payLoad}
          downloadApi={downloadVerifiedList_URL}
          updatDatePayLoad={updatDatePayLoad}
          processStatus={processStatus}
          passbookStatus={passbookStatus}
          toDate={toDate}
          setToDate={setToDate}
          fromDate={fromDate}
          setFromDate={setFromDate}
          handleProcessStatusChange={handleProcessStatusChange}
          handlePassbookStatusChange={handlePassbookStatusChange}
          isStatusFilter={true}
          hasPermission={hasPermission}
          infoDetails={verifiedReportInfo}
        />

        <DataTable
          rows={rows}
          setRows={setRows}
          headCells={verifiedListTableHeadCell}
        />
      </CardLayout>
    </PageLayout>
  );
};

const Verified = ActionPermission(UnWrappedVerified);
export default Verified;
