import { Chip} from "@mui/material";
import {
  cancelledStyle,
  consetDeclinedChipStyle,
  consetGivenChipStyle,
  consetPendingChipStyle,
  issueChipStyle,
  lapsedStyle,
  manualStyle,
  manualstyle1,
  noResponseStyle,
  ongoingStyle,
  reprocessedChipStyle,
  submittedStyle,
  successStyle,
} from "app";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import React from "react";
import { useSelector } from "react-redux";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {getStatusTooltip } from "shared/constants/constants";
import { hasValue } from "..";

const TableStatusCell = (props) => {

  const functionSlice = useSelector(state => state.functionSlice);
  let { cellName, cellValue, rowAttribute } = props;

  const { appointeeId } = rowAttribute;
  const { setRemarks } = functionSlice[0];
  let labelValue;
  let chipStyle;
  let chipIconStyle = null;
  if (cellName === "status") {
    labelValue = cellValue;
    if (cellValue === "Submitted") {
      chipStyle = submittedStyle;
    }
    if (cellValue === "Ongoing") {
      chipStyle = ongoingStyle;
    }
    if (cellValue === "No Response") {
      chipStyle = noResponseStyle;
    }
    if (cellValue === "Verified") {
      chipStyle = successStyle;
    }
    if (cellValue === "Cancelled") {
      chipStyle = cancelledStyle;
    }
    if (cellValue === "Lapsed") {
      chipStyle = lapsedStyle;
    }
    if (cellValue === "Reupload Requested") {
      chipStyle = ongoingStyle;
    }
  }
  
  
  if (cellName === "isReprocess" && cellValue === true) {
    labelValue = "Reprocessed";
    chipStyle = reprocessedChipStyle;
  }
  if (cellName === "isNoIsuueinVerification" && cellValue === false) {
    labelValue = "Issue";
    chipStyle = issueChipStyle;
  }

  if (cellName === "consentStatusCode") {
    if (cellValue === 0) {
      labelValue = "Pending";
      chipStyle = consetPendingChipStyle;
      chipIconStyle= <WatchLaterIcon color="white"/>
    }if (cellValue === 1) {
      labelValue = "Given";
      chipStyle = consetGivenChipStyle;
      chipIconStyle= <CheckCircleIcon color="white"/>
    }if (cellValue === 2) {
      labelValue = "Declined";
      chipStyle = consetDeclinedChipStyle;
      chipIconStyle= <CancelIcon color="white"/>
    }if (cellValue === 3) {
      labelValue = "Revoked";
      chipStyle = consetDeclinedChipStyle;
      chipIconStyle= <CancelIcon color="white"/>
    }if (cellValue === 4) {
      labelValue = "Pending";
      chipStyle = consetPendingChipStyle;
      chipIconStyle= <WatchLaterIcon color="white"/>
    }if (cellValue === 5) {
      labelValue = "Prerequisite NA";
      chipStyle = consetDeclinedChipStyle;
      chipIconStyle= <CancelIcon color="white"/>
    }
  }
  if (cellName === "status") {
    labelValue = cellValue;
    if (cellValue === "Manual Verification Required") {
      chipStyle = manualStyle;
    }
    if(cellValue==="Document Reupload Request"){
      chipStyle = manualstyle1;
    }
  }
  if (cellName==="trustPassBookStatus"){
    if(hasValue(cellValue)){
      labelValue = (
        <DarkTooltip title="Trust Passbook Status Submitted"  placement="top" arrow>
          <span>{cellValue}</span>
        </DarkTooltip>
      );
      chipStyle =  submittedStyle;
    }
  }
  
  if (cellName==="epfoPassBookStatus"){
    if(hasValue(cellValue) && cellValue === "EPFO"){
      labelValue = (
        <DarkTooltip title="EPFO Passbook Status Submitted"  placement="top" arrow>
          <span>{cellValue}</span>
        </DarkTooltip>
      );
      chipStyle =  submittedStyle;
    }else{
      labelValue = (
        <DarkTooltip title="No UAN Available"  placement="top" arrow>
          <span>No UAN</span>
        </DarkTooltip>
      );
      chipStyle =noResponseStyle;
    }
  }
  
  if (cellName === "consentStatusCode") {
    if (cellValue === 0) {
      labelValue = "Pending";
      chipStyle = consetPendingChipStyle;
      chipIconStyle= <WatchLaterIcon color="white"/>
    }if (cellValue === 1) {
      labelValue = "Given";
      chipStyle = consetGivenChipStyle;
      chipIconStyle= <CheckCircleIcon color="white"/>
    }if (cellValue === 2) {
      labelValue = "Declined";
      chipStyle = consetDeclinedChipStyle;
      chipIconStyle= <CancelIcon color="white"/>
    }if (cellValue === 3) {
      labelValue = "Revoked";
      chipStyle = consetDeclinedChipStyle;
      chipIconStyle= <CancelIcon color="white"/>
    }if (cellValue === 4) {
      labelValue = "Pending";
      chipStyle = consetPendingChipStyle;
      chipIconStyle= <WatchLaterIcon color="white"/>
    }if (cellValue === 5) {
      labelValue = "No Prerequisite";
      chipStyle = consetDeclinedChipStyle;
      chipIconStyle= <CancelIcon color="white"/>
    }
  }
  return (
    labelValue && (
      <DarkTooltip
      title={getStatusTooltip(cellValue)} 
      arrow
      placement="top"
    >
      <Chip
        onClick={labelValue === "Issue" ? () => setRemarks(appointeeId) : null}
        sx={chipStyle}
        size="small"
        label={labelValue}
        icon={chipIconStyle}
        // variant="outlined"
        // color="primary"
      ></Chip>
      </DarkTooltip>
    )
  );
};

export default TableStatusCell;
