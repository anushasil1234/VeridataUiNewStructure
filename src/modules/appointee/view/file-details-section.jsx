import { Box, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import {
  candidatefileViewContainerStyle,
  imagestyleContainer,
  listHeadingStyle,
  rightMostBtnStyle,
  submitBtnStyle,
} from 'app';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VerificationQuiestions from './verification-quiestions';
import GridContainer from 'shared/components/grid-container/grid-container';
import { hasValue } from 'shared/utils';
import TextAreaInput from 'shared/components/input-fields/text-area-input';
import {
  categoryFileEmptyerror,
  defaultDropdownValue,
  fileEmptyerror,
  fileVerificationEnums,
  ManualSubmitConfirmation,
  manualSubmitConfirmatonMsg,
  remarksemptyerror,
  remarksError,
  verificatiosucess,
} from 'shared/constants/constants';
import { Download, ZoomIn, ZoomOut } from '@mui/icons-material';
import { handleZoom } from 'shared/utils/associate/Zoomin-out';
import downloadFile from 'shared/utils/associate/download-file';
import { calculateDragPosition } from 'shared/utils/associate/dragein';
import { MouseEventHandler } from 'shared/utils/associate/dragable';
import {
  removeManualValidationResponseStatusSlice,
  storeManualValidationResponseStatusSlice,
} from 'store/slices/manual-validation-response-status-slice';
import Button1 from 'shared/utils/button/button1';
import { UpdateAppointeeManualVerification } from 'server/apis';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
const FiledetailsSection = ({
  verificationType,
  fileSrc,
  fileTypeCategory,
  setFileTypeCategory,
  verificationOnChange,
  enabledQuestions,
  verificationQuestionSet,
  verificationAnswers,
  appointeeId,
  fileName,
  selectedFiles,
  files,
  setFiles,
  setVerificationType,
  categorySelected,
  verificationCategoryList,
  setVerificationCategoryList,
  verificationTypeList,
  setFile,
  setVerificationTypeList,
  selectedMandatoryCategoryList,
  setSelectedMandatoryCategoryList,
  closeModel,
  setIsVarified,
}) => {
  const dispatch = useDispatch();
  const mimeType = fileSrc.split(';')[0].split(':')[1];
  const loggedInData = useSelector((state) => state.loggedInData);
  const functionSlice = useSelector((state) => state.functionSlice);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const { userId } = (loggedInData && loggedInData[0]) || {
    userId: null,
  };
  const { openConfirmationModel } = functionSlice[0];
  const [zoomLevel, setZoomLevel] = useState(1);
  const [remarks, setRemarks] = useState('');
  const handleZoomIn = () => {
    setZoomLevel(handleZoom('in'));
  };
  const handleZoomOut = () => {
    setZoomLevel(handleZoom('out'));
  };
  const handleRemarksChanged = ({ target }) => {
    setRemarks(target.value);
  };
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentMousePosition = { x: e.clientX, y: e.clientY };
    setPosition((prevPosition) =>
      calculateDragPosition(isDragging, lastMousePosition, currentMousePosition, prevPosition),
    );
    setLastMousePosition(currentMousePosition);
  };
  const handleMouseUp = () => setIsDragging(false);
  const callApiBasedOnSuccess = async (payload) => {
    {
      const response = await UpdateAppointeeManualVerification(payload);
      if (response) {
        const { responseInfo } = response;
        setIsVarified(responseInfo);
        const isdataSubmited = true;
        dispatch(removeManualValidationResponseStatusSlice());
        dispatch(storeManualValidationResponseStatusSlice({ isdataSubmited }));
        return isdataSubmited;
      }
    }
    return false;
  };
  const payload = {
    appointeeId: appointeeId,
    questionsToVerify: Object.keys(verificationAnswers).map((qId) => {
      const question = verificationQuestionSet.find((q) => q.questionId === parseInt(qId));
      return {
        processId: question?.processId || null,
        qestionId: question?.questionId || null,
        fieldCode: question?.fieldCode || null,
        answerText: verificationAnswers[qId],
        fetchedData: question?.fetchedData || null,
      };
    }),
    userId: userId,
    verificationCategory: verificationType.value,
    remarks: remarks,
  };
  const handleVerificationSubmit = async () => {
    const unansweredQuestions = enabledQuestions.filter((qId) => !verificationAnswers[qId]);
    if (fileTypeCategory !== 'none' && unansweredQuestions.length > 0) {
      showErrorMessage('Please answer all enabled questions before proceeding.');
      return;
    }
    // Check if all questions are disabled
    if (fileTypeCategory === 'none') {
      showErrorMessage('No questions are enabled. Please check your inputs.');
      return;
    }
    let submitconfModelContent = {
      dialogContentText: '',
    };
    if (selectedMandatoryCategoryList.length === 0) {
      showErrorMessage(categoryFileEmptyerror);
      return;
    }
    if (selectedFiles.length === 0) {
      showErrorMessage(fileEmptyerror);
      return;
    }


    if (!hasValue(remarks)) {
      showErrorMessage(remarksemptyerror);
      return;
    }
    if (remarks.length < 15) {
      showErrorMessage(remarksError);
      return;
    }
    if (
      selectedMandatoryCategoryList.length !== verificationCategoryList.length &&
      verificationType.verificationFieldName === fileVerificationEnums.docEPFO
    ) {
      submitconfModelContent.dialogContentText = <ManualSubmitConfirmation type={'categories'} />;
    } else if (selectedFiles.length !== files.length) {
      submitconfModelContent.dialogContentText = <ManualSubmitConfirmation type={'files'} />;
    } else {
      submitconfModelContent.dialogContentText = manualSubmitConfirmatonMsg;
    }
    // const { VerificationSubCategoryList } = createVerificationUpdate(verificationUpdate);

    const payload = {
      appointeeId: appointeeId,
      questionsToVerify: Object.keys(verificationAnswers).map((qId) => {
        const question = verificationQuestionSet.find((q) => q.questionId === parseInt(qId));
        return {
          processId: question?.processId || null,
          qestionId: question?.questionId || null,
          fieldCode: question?.fieldCode || null,
          answerText: verificationAnswers[qId],
          fetchedData: question?.fetchedData || null,
        };
      }),
      userId: userId,
      verificationCategory: verificationType.value,
      remarks: remarks,
    };
    const getCategoriesForVerificationType = (verificationTypeValue) => {
     
      return verificationCategoryList.filter((category) => category.verificationType === verificationTypeValue);
    };
    openConfirmationModel(submitconfModelContent, async () => {
      const isSuccessful = await callApiBasedOnSuccess(payload);
      if (isSuccessful) {
        const updatedVerificationTypeList = verificationTypeList.filter(
          (type) => type.value !== verificationType.value,
        );
        if (updatedVerificationTypeList.length > 0) {
          setVerificationTypeList(updatedVerificationTypeList);
          const nextVerificationType = updatedVerificationTypeList[0];
          setVerificationType(nextVerificationType);
          
          const nextVerificationCategories = getCategoriesForVerificationType(
            nextVerificationType.value,
          );
          setVerificationCategoryList(nextVerificationCategories);
        } else {
          showSuccessMessage(verificatiosucess);
        }
        setVerificationCategoryList([]);
        setSelectedMandatoryCategoryList([]);
        setFile(defaultDropdownValue);
        setFiles([]);
        setFileTypeCategory(defaultDropdownValue);
      }
    });
  };
  return (
    <>
      <GridContainer>
        <Grid item xs={12} md={8}>
          <Typography
            sx={{
              ...listHeadingStyle,
              fontSize: '1rem',
              textAlign: 'left',
              marginLeft: '-3px',
            }}
          >
            {`${verificationType.label} Verification`}
          </Typography>
        </Grid>
      </GridContainer>
      <GridContainer>
        <Grid item xs={12} md={8}>
          <GridContainer>
            <Box sx={{ ...candidatefileViewContainerStyle }}>
              {categorySelected && fileSrc && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '1px',
                    right: '1px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <IconButton onClick={handleZoomOut} aria-label='zoom out'>
                    <ZoomOut />
                  </IconButton>
                  <IconButton onClick={handleZoomIn} aria-label='zoom in'>
                    <ZoomIn />
                  </IconButton>
                  {fileTypeCategory === 'EPFO Service History' && (
                    <Tooltip title='Download File' arrow placement='right'>
                      <IconButton
                        onClick={() => downloadFile(fileSrc, fileName)}
                        aria-label='download file'
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              )}
              {categorySelected ? (
                fileSrc && (
                  <Box
                    sx={{
                      ...imagestyleContainer,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                    }}
                    {...MouseEventHandler({
                      zoomLevel,
                      handleMouseMove,
                      handleMouseUp,
                      handleMouseDown,
                    })}
                  >
                    {mimeType === 'image/jpeg' || mimeType === 'image/png' ? (
                      <img
                        style={{
                          position: 'absolute',
                          transform: `scale(${zoomLevel})`,
                          transition: 'transform 0.3s ease',
                          transformOrigin: 'center',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          left: isDragging ? `${position.x}px` : 'auto',
                          top: isDragging ? `${position.y}px` : 'auto',
                        }}
                        src={fileSrc}
                        alt='File Preview'
                      />
                    ) : mimeType === 'application/pdf' ? (
                      <embed
                        src={`${fileSrc}#toolbar=0`}
                        height='230px'
                        width='500px'
                        style={{
                          position: 'absolute',
                          transform: `scale(${zoomLevel})`,
                          transition: 'transform 0.3s ease',
                          transformOrigin: 'center',
                          maxWidth: '100%',
                          maxHeight: '100%',
                          left: isDragging ? `${position.x}px` : 'auto',
                          top: isDragging ? `${position.y}px` : 'auto',
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </Box>
                )
              ) : (
                <Typography sx={{ color: 'gray', textAlign: 'center', width: '100%' }}>
                  Please select a category and files to continue the verification process.
                </Typography>
              )}
            </Box>
            <TextAreaInput
              label={'Remarks'}
              value={remarks}
              required={true}
              onChange={handleRemarksChanged}
            />
          </GridContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          <GridContainer>
            <VerificationQuiestions
              //verificationUpdate={verificationUpdate}
              verificationAnswers={verificationAnswers}
              enabledQuestions={enabledQuestions}
              verificationQuestionSet={verificationQuestionSet}
              verificationOnChange={verificationOnChange}
              categorySelected={categorySelected}
            />
          </GridContainer>
        </Grid>
        {}
      </GridContainer>
      <GridContainer>
        <Grid item xs={12}>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'end' }}>
            <Button1
              onClick={handleVerificationSubmit}
              sx={submitBtnStyle}
              variant='contained'
              color='primary'
            >
              {'Submit'}
            </Button1>
            <Button1
              onClick={closeModel}
              sx={rightMostBtnStyle}
              variant='contained'
              color='primary'
            >
              {'Close'}
            </Button1>
          </Stack>
        </Grid>
      </GridContainer>
    </>
  );
};
export default FiledetailsSection;
