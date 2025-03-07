import { Send } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRawFileData, postRawFileData } from 'server/apis';
import ActionPermission from 'shared/components/action-permission/action-permission';
import { emptyRowMsg, notProcessedDataVerificationConfirmationMsg, rawAppointeeListTableHeadCell, startVerification, verificationConfirmationMsg } from 'shared/constants/constants';
import { CardLayout, DataTable, PageLayout, addIsCheckFlag, generateTableRowData, hasValue } from 'shared/utils'
import showErrorMessage from 'shared/utils/associate/show-error-message';

const UnWrappedUploadedData = (props) => {
  const { hasPermission } = props;
  const { fileId, state } = useLocation();

  const apiSlice = useSelector(state => state.apiSlice);
  const loggedInData = useSelector(state => state.loggedInData);
  const functionSlice = useSelector(state => state.functionSlice);
  // const popUpSlice = useSelector(state => state.popUpSlice);


  // const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
  const { openConfirmationModel } = functionSlice[0];
  // const { postRawFileData } = apiSlice[0];
  // const { getRawFileData, postRawFileData } = apiSlice[0];
  const { companyId, userId } = loggedInData[0];

  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [responseInfos, setResponseInfos] = useState();

  const setTableRows = async () => {
    const response = await getRawFileData(companyId, fileId || 0);
    if (response) {
      const { responseInfos } = response;
      const filteredCandidateId = state && state.candidateId;
      const filteredAppointeeName = state && state.appointeeName;

      const filterredResponse = (hasValue(filteredCandidateId) || hasValue(filteredAppointeeName)) ?
        responseInfos && responseInfos.length > 0 &&
        [responseInfos.find(({ appointeeName, candidateId }) => {
          return (
            candidateId ?
              candidateId === filteredCandidateId
              : appointeeName === filteredAppointeeName
          )
        })] : responseInfos;
      let generatedCells = generateTableRowData(filterredResponse, rawAppointeeListTableHeadCell,false);
      setRows({
        tableHead: rawAppointeeListTableHeadCell,
        tableRows: generatedCells
      });
      setResponseInfos(filterredResponse);
    }
  }
  useEffect(() => {
    setTableRows();
  }, []);
  const startProcessRawData = async () => {
    const postResponse = responseInfos && responseInfos.map(({ id, fileId, isChecked }) => {
      return {
        id,
        fileId,
        isChecked
      }
    })
    const isCheckedAddedRows = addIsCheckFlag(postResponse, selected);
    const payLoad = {
      rawDataList: isCheckedAddedRows,
      userId: userId,
      isUnprocessed: false
    }
    const response = await postRawFileData(payLoad);
    if (response) {
      setRows();
    }

  }
  const handleStartProcess = () => {
    if (selected.length > 0) {
      const confirmationModelContent = {
        dialogContentText: verificationConfirmationMsg
      }
      openConfirmationModel(confirmationModelContent, startProcessRawData)
    } else {
      showErrorMessage(emptyRowMsg);
    }
  }
  return (
    <PageLayout pageName={"Uploaded Data"}>
     <Typography sx={{fontFamily:'Montserrat,Anuphan',fontSize:'1rem',fontWeight:400,color:'#000000'}}>{`Please select the candidates to whom you want to send the Start Verification mail, for Veridata.`}</Typography>
      {/* <Typography sx={{fontFamily:'Montserrat,Anuphan',fontSize:'1rem',fontWeight:400,color:'#000000'}}>{`After data upload, please go to UTILITIES -> Uploaded Data Page`}</Typography> */}

      <CardLayout>
        <DataTable
          rows={rows}
          checBoxRequired={true}
          headerCheckBox={true}
          setRows={setRows}
          headCells={rawAppointeeListTableHeadCell}
          selected={selected}
          setSelected={setSelected}
        />
        {
          hasPermission && hasPermission['A004'] &&

          <Button disabled={!(rows && selected.length > 0)} onClick={handleStartProcess} variant="contained" endIcon={<Send />}>
            {startVerification}
          </Button>
        }

      </CardLayout>
    </PageLayout>
  )
}

const UploadedData = ActionPermission(UnWrappedUploadedData)
export default UploadedData