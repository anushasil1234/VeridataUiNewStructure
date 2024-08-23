import { Refresh, Search, Send } from '@mui/icons-material';
import { Box, Button, Fab, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { LinkNotSentTableHeadCell, notProcessedDataVerificationConfirmationMsg, startVerification, toLinknotsent } from 'shared/constants/constants';
import { CardLayout, DataTable, DateFormatYYYYMMDD, PageLayout, generateTableRowData, selectCheckedRows } from 'shared/utils';
import DatePicker from 'shared/utils/date-picker/date-picker';
import { removeActionRoute } from 'store/slices/action-route-slice';
import dayjs from "dayjs";
import { primaryFabStyle } from 'app';
import checkPastDay from 'shared/utils/associate/check-is-pastday';
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip';
import ActionPermission from 'shared/components/action-permission/action-permission';

const UnwrapedLinkNotSent = (props) => {
    const { hasPermission } = props;

    const apiSlice = useSelector((state) => state.apiSlice);
    const loggedInData = useSelector((state) => state.loggedInData);
    const functionSlice = useSelector((state) => state.functionSlice);
    const actionRouteSlice = useSelector((state) => state.actionRouteSlice);
    const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
   
   
    const { openConfirmationModel } = functionSlice[0];
    const { getLinkNotSentList, postRawFileData } = apiSlice[0];
    const { navigateTo } = commonHooksFunctionSlice[0];
    const { companyId, userId } = loggedInData[0];
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


    const [selected, setSelected] = useState([]);
    const [responseInfos, setResponseInfos] = useState();
    const [isStartVerificationBtndisabled, setIsStartVerificationBtnDisabled] = useState(true);
    const [rows, setRows] = useState([]);
    const [pageName, setPageName] = useState(null);
    const [toDate, setToDate] = useState(_today);
    const [fromDate, setFromDate] = useState(_fromday);

    const payloadData = {
        isFiltered: state && state.dayRangePayLoad ? true : false,
        noOfDays: state && state.dayRangePayLoad ? state.dayRangePayLoad : 0,
        filterType: state && state.filterType,
        appointeeName: state && state.appointeeName,
        companyId: companyId,
        candidateId: state && state.candidateId,
        fromDate: fromDate && DateFormatYYYYMMDD(fromDate?.toString()),
        toDate: toDate && DateFormatYYYYMMDD(toDate?.toString()),
    }

    let [payLoad, setPayLoad] = useState(payloadData);

    // useEffect(() => {
    //     setTableRows(payloadData)
    // }, [state]);

    const generateDisableRow = (tableCellDataObj) => {
        const isPastDate = checkPastDay(new Date(tableCellDataObj.tableRow.dateOfJoining))
        return isPastDate
    }
    const setTableRows = async (payLoad) => {
        setPageName(
            isFiltered === true && noOfDays > 0
                ? `Link Not Sent List`
                : "Link Not Sent List"
        );
        const response = await getLinkNotSentList(payLoad);
        if (response) {
            const { responseInfos } = response
            setResponseInfos(responseInfos);
            let generatedCells = generateTableRowData(responseInfos, LinkNotSentTableHeadCell, generateDisableRow);
            setRows({
                tableHead: LinkNotSentTableHeadCell,
                tableRows: generatedCells
            });
        }
    }

    const startProcessRawData = async () => {
        const isCheckedAddedRows = selectCheckedRows(responseInfos, selected);
        const postRawDatapayLoad = {
            rawDataList: isCheckedAddedRows,
            userId: userId,
            isUnprocessed: true 
        }
        const response = await postRawFileData(postRawDatapayLoad);

        if (response) {
            setTableRows(payLoad);
        }
    }
    const handleStartProcess = () => {
        const confirmationModelContent = {
            dialogContentText: notProcessedDataVerificationConfirmationMsg
        }
        openConfirmationModel(confirmationModelContent, startProcessRawData)
    }
    const handleSearch = () => {
        setTableRows(payLoad);
    }
    const clearSearch = () => {
        setFromDate(null);
        setToDate(null);
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
        navigateTo(toLinknotsent, { state: false });
    }
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(removeActionRoute());
    //     if (actionRouteSlice.length === 0) {
    //         setTableRows(payLoad);
    //     }
    // }, [actionRouteSlice]);
  
    useEffect(() => {
        if (selected.length > 0) {
            setIsStartVerificationBtnDisabled(false);
        } else {
            setIsStartVerificationBtnDisabled(true);
        }
    }, [selected])

    // useEffect(() => {
    //     payLoad.fromDate = DateFormatYYYYMMDD(fromDate?.toString());
    //     setPayLoad(payLoad);
    // }, [fromDate]);
    // useEffect(() => {
    //     payLoad.toDate = DateFormatYYYYMMDD(toDate?.toString());
    //     setPayLoad(payLoad);
    // }, [toDate]);
    useEffect(() => {
        dispatch(removeActionRoute());
       if (actionRouteSlice.length === 0 ) {
         setTableRows(payLoad);
       }
     }, [state, actionRouteSlice]);
   
     useEffect(() => {
       const _payLoad = {
         ...payLoad,
         fromDate: DateFormatYYYYMMDD(fromDate?.toString()),
         toDate: DateFormatYYYYMMDD(toDate?.toString()),
       }
       setPayLoad(_payLoad);
     }, [fromDate, toDate]);
    return (
        <PageLayout pageName={pageName}>
            <CardLayout>
                <Stack my={2} direction="row" justifyContent={"left"} alignItems={"center"}>
                    <Box >
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
                            onClick={handleSearch}
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
                        // disabled
                        >
                            <Refresh width={18} sx={{ color: "#fff" }} />
                        </Fab>
                    </DarkTooltip>
                </Stack>
                <DataTable
                    rows={rows}
                    setRows={setRows}
                    headCells={LinkNotSentTableHeadCell}
                    checBoxRequired={true}
                    selected={selected}
                    setSelected={setSelected}
                />
                {
                    hasPermission && hasPermission['A004'] &&
                    <Button disabled={isStartVerificationBtndisabled} onClick={handleStartProcess} variant="contained" endIcon={<Send />}>
                        {startVerification}
                    </Button>
                }
            </CardLayout>
        </PageLayout>
    )
}
const LinkNotSent = ActionPermission(UnwrapedLinkNotSent);
export default LinkNotSent