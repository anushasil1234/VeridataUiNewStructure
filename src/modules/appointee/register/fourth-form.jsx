import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Radio,
    RadioGroup,
    Stack,
    Switch,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import FormHeadingContainer from "shared/components/grid-container/form-heading-container";
import FormHeading from "./form-heading";
import GridRow from "shared/components/grid-container/grid-row";
import {
    checkBoxLabelStyle,
    checkBoxStyle,
    divederStyle,
    fileUploadSectionContainerStyle,
    headingType1,
    lable1CopyStyle,
    loginFieldIconStyle,
    positionRelative,
    primaryFabStyle,
    responsiveBtnType1Style,
    statusBoxstyle,
    statusstyle,
    submitBtnContainerStyle,
    submitBtnStyle,
    verificationBtnStyle,
} from "app";
import {
    Autorenew,
    HelpOutline,
    Info,
    InfoOutlined,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import {
    aadharFileTypeAlias,
    epfoPassbookFileTypeAlias,
    epfoServiceHistoryFileTypeAlias,
    getHandicapTypeDescription,
    handicapFileTypeAlias,
    imgAndPdfMaxSize,
    otherFileTypeAlias,
    passportFileTypeAlias,
    previousButton,
    tenthCertificateFileTypeAlias,
    trustEpfoFileTypeAlias,
} from "shared/constants/constants";
import TextInput from "shared/components/input-fields/text-input";
import FileUploadSection from "shared/components/file-upload-section/file-upload-section";
import { useSelector } from "react-redux";
import PassportFileNoSample from "assets/images/backgrounds/file-number-in-indian-passport.png";
import { DisableSection } from "shared/components/disble-section/disble-section";
import { VerificationStatusSection } from "shared/components/verification/verification-status-section";
import { Link } from "react-router-dom";
import VerficationAadharSteps from "shared/components/verification/verfication-aadhar";
import { hasValue } from "shared/utils";
import myImage from "assets/images/profile/instrucToServiceHistory.png";
import BankVerification from "./bank-verifications";

const FourthForm = ({
    formElement,
    stepsList,
    isAadhaarVarified,
    isOfflineXmlDownloaded,
    setIsOfflineXmlDownloaded,
    handleIsOfflineXmlDownloadedOnChange,
    nameAsOnAadhar,
    handleChangeNameOnAadhar,
    handleChangeAadharNumber,
    aadharShareCode,
    setAadharShareCode,
    disabledAadharInput,
    isAadhaarXmlUploaded,
    handleAadharVerifiaction,
    aadharstatusMessage,
    uploadAadharXmlFile,
    aadharXmlFileName,
    pan,
    handelPANNumberChange,
    handleBlurPAN,
    disabledPanInput,
    panNumberError,
    isPanVarified,
    handlePanVerifiaction,
    handleBankAccountVerification,
    isPANModalOpen,
    handleDialogCancel,
    handleDialogConfirm,
    panstatusMessage,
    bankstatusMessage,
    nameAsOnPan,
    isEpfoSectionDisabled,
    setUAN,
    UAN,
    setAccountNumber,
    accountNumber,
    setIFSCCode,
    IFSCCode,
    isUanVarified,
    handleEpfoButtonClick,
    isUanVerificationProcessManual,
    epfoButton,
    epfostatusMessage,
    uanAadharLink,
    handleChangeUanVerification,
    uploadEpfoServiceHistoryFile,
    epfoServiceHistoryFile,
    uploadEpfoPassBookFile,
    removeEPFOPassbookFile,
    epfoPassBookFiles,
    handleBack,
    submitDetails,
    aadharNumber,
    handleViewFile,
    otherVerification
}) => {
    const AADHARVERIFICATION_BY = process.env.REACT_APP_AADHARVERIFICATION_BY;

    console.log('AADHARVERIFICATION_BY', AADHARVERIFICATION_BY);

    const functionSlice = useSelector((state) => state.functionSlice);
    const { openInfoModel } = functionSlice[0];
    const [openModal, setOpenModal] = useState(false);

    const openOfflineKycInfoModel = () => {
        const offlineKycContent = {
            dialogTitle: "Offline Aadhaar Kyc Steps Info",
            dialogContentText:
                "To complete the offline Aadhaar KYC process please follow the instructions given below :",
            dialogContentComponent: <VerficationAadharSteps />,
            fullWidth: true,
        };
        openInfoModel(offlineKycContent);
    };
    const handleOpenModal = () => {
        setOpenModal(true); // Open modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close modal
    };

    const [passwordType, setPasswordType] = useState("password");
    const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
    const [passwordFieldIcon, setPasswordFieldIcon] = useState(
        <VisibilityOff sx={loginFieldIconStyle} />
    );
    const handleShareCodeVisibility = () => {
        setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
    };
    const handleAadharShareCode = (val) => {
        console.log('sharecode', val)
        if (/^\d{0,4}$/.test(val)) {
            setAadharShareCode(val);
        }
    }
    const shareCodeProps = {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShareCodeVisibility}
                >
                    {passwordFieldIcon}
                </IconButton>
            </InputAdornment>
        ),
    };
    useEffect(() => {
        if (isPasswordVisibilityOn) {
            setPasswordType("text");
            setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
        } else {
            setPasswordType("password");
            setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
        }
    }, [isPasswordVisibilityOn]);
    return (
        <Box sx={{ width: "100%" }}>
            <form ref={formElement}>
                <Grid
                    sx={{ paddingLeft: "20px" }}
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >

                    {/* ######  Aadhar Verification Section End ###### */}
                    {/* ######  PAN Verification Section Start ###### */}
                    <FormHeadingContainer>
                        <FormHeading
                            step={stepsList?.PAV?.step}
                            heading={stepsList?.PAV?.name}
                            info={"Enter your PAN Number to verify."}
                        />
                    </FormHeadingContainer>

                    <GridRow>
                        <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
                            <TextInput
                                label={"PAN Number"}
                                value={pan}
                                onChange={handelPANNumberChange}
                                // required={true}
                                disabled={disabledPanInput}
                                error={panNumberError}
                                onBlur={handleBlurPAN}
                            //  maxLength={10}
                            />
                            <Button
                                sx={{ ...submitBtnStyle, margin: "5px 0" }}
                                disabled={isPanVarified}
                                variant="contained"
                                onClick={handlePanVerifiaction}
                                endIcon={<Autorenew />}
                            >
                                Verify
                            </Button>
                            <Dialog open={isPANModalOpen} onClose={handleDialogCancel}>
                                <DialogTitle>PAN Verified</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Your PAN is successfully verified. To fetch and verify UAN
                                        automatically please click on OK.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleDialogConfirm}
                                        variant="contained"
                                        color="primary"
                                        sx={submitBtnStyle}
                                        autoFocus
                                    >
                                        OK
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            <VerificationStatusSection docType={panstatusMessage} />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{
                                paddingLeft: { xs: "0px !important", md: "20px!important" },
                            }}
                        >
                            <TextInput
                                label={"Name on PAN"}
                                value={nameAsOnPan}
                                disabled={true}
                            />
                        </Grid>
                    </GridRow>
                    {/* ######  PAN Verification Section End ###### */}


                    {/* ###### Bank Verification Section End ###### */}
                    <BankVerification isAadhaarVarified={isAadhaarVarified} stepsList={stepsList} />





                    {/* ###### Bank Verification Section End ###### */}




                    {/* ######  UAN Verification Section End ###### */}
                    <GridRow>
                        <Grid sx={{ paddingLeft: "0px !important" }} item xs={12}>
                            <Stack flexDirection={"row"}>
                                <Button
                                    //onClick={() => setCurrentPageNo(1)}
                                    onClick={handleBack}
                                    //sx={{ m: "15px 5px", ml: 3 }}
                                    sx={submitBtnStyle}
                                    variant="contained"
                                    color="primary"
                                >
                                    {previousButton}
                                </Button>


                                <Button
                                    //onClick={() => setCurrentPageNo(1)}
                                    //onClick={}
                                    //sx={{ m: "15px 5px", ml: 3 }}
                                    sx={submitBtnStyle}
                                    variant="contained"
                                    color="primary"
                                >
                                    {"Next"}
                                </Button>

                            </Stack>
                        </Grid>
                    </GridRow>
                </Grid>
            </form>
        </Box>
    );
};

export default FourthForm;
