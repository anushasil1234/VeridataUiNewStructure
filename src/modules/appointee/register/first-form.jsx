import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  genderTypeStyle,
  inputFieldStyle2,
  subHeadingContentTextStyle,
  submitBtnContainerStyle,
  submitBtnStyle,
} from "app";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormHeadingContainer from "shared/components/grid-container/form-heading-container";
import GridRow from "shared/components/grid-container/grid-row";
import CustomeDatePicker from "shared/components/input-fields/custome-date-picker";
import TextInput from "shared/components/input-fields/text-input";
import {
  formSaveSuccess,
  formSubmitionSuccess,
  genders,
  indianpassportNumberPatternErrorMsg,
  passportNoEmptyMsg,
  saveAndNextbutton,
  saveButton,
  yesNoList,
} from "shared/constants/constants";
import GenderSelection from "shared/utils/associate/gender-selection";
import FormHeading from "./form-heading";
import SelectInput from "shared/components/input-fields/select-input";
import { HelpOutline } from "@mui/icons-material";
import PassportSample from "assets/images/backgrounds/PassportSample2.jpeg";
import dayjs from "dayjs";
import DateInput from "shared/components/input-fields/date-input";
import { getLocalStorageItem, hasValue, setLocalStorageItem } from "shared/utils";
import showErrorMessage from "shared/utils/associate/show-error-message";
import { postAppointeeDetails } from "server/apis";
import { removeLoggedinData, storeLoggedinData } from "store/slices/login-slice";

const FirstForm = ({
  stepsList,
  isRelationShipWithMemberDisabled,
  passportAvailable,
  isAadhaarVarified,
  isPassportVarified,
  disabledIsInterNationalWorker,
  isDraft,
  handleSecondNext,
  firstPageForm,
  handleChangeDateofIssue,
  handleChangeinDateofexpiry,
  setFirstPageForm,
  setActiveStep,
  setCurrentPageNo,
  setIsDraft,
  updateStep,
  defaultCountry,
  setPassPortMaxLength,
  passportNoMaxLength
}) => {

  // console.log('genderList', genderList);

  const dispatch = useDispatch();

  const dropdownList = useSelector((state) => state.dropdownList);
  const functionSlice = useSelector((state) => state.functionSlice);
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const { openConfirmationYesNoModal } = functionSlice[0];
  const {
    countryList,
    nationalityList,
    relationList,
    qualificationList,
    disabilityList,
    maritalStatusList,
    fileTypeList,
  } = dropdownList && dropdownList.length > 0 && dropdownList[0];
  const genderDropdownList =
    dropdownList &&
    dropdownList.length > 0 &&
    dropdownList[0] &&
    dropdownList[0].genderList;
  const { openInfoModel } = functionSlice[0];
  const [passportNumberError, setPassportNumberError] = useState(false);
  const [genderList, setGenderList] = useState();
  const [clickedButton, setClickedButton] = useState(null);
  const [isPassportAvailableDisable, setIsPassportAvailableDisable] =
    useState(false);
  // const [passportNoMaxLength, setPassportNoMaxLength] = useState(null);


  const passportNumberInputProps = {
    maxLength: passportNoMaxLength,
    ...inputFieldStyle2,
  };
  const handlePassporNumbertHelp = () => {
    const passportHelpContent = {
      dialogContentText: "",
      dialogTitle: "PASSPORT HELP",
      dialogContentComponent: (
        <img
          src={PassportSample}
          alt="Help"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      ),
      maxWidth: "sm",
      btnName: "Close",
    };
    openInfoModel(passportHelpContent);
  };

  const handleSpacialcharecter = (e) => {
    const char = /^[A-Za-z\s]+$/;
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];
    if (!char.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
  const handelSpacialCharecterPaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    if (!/^[A-Za-z\s]*$/.test(paste)) {
      e.preventDefault();
    }
  };
  const handleYes = (e) => {
    handleSecondNext();
  };
  const handleNo = (e) => { };
  const handleClickOnNext = async () => {
    const ConfirmationModelContent = {
      dialogTitle: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Confirmation to save changes?</Typography>
        </div>
      ),
      dialogContentText: (
        <>
          <Typography sx={subHeadingContentTextStyle}>
            {/* {pensionConfirmation} */}
            This won't save the changes you have made. Do you want to proceed
            without saving changes?
          </Typography>
          <Typography> </Typography>
        </>
      ),
      fullWidth: true,
      mxWidth: "md",
    };
    openConfirmationYesNoModal(ConfirmationModelContent, handleYes, handleNo);
  };
  const handleFirstPageFormInputChange = (value, name) => {
    setFirstPageForm({ ...firstPageForm, [name]: value });
  }
  const handlePassportNoChange = (value, name) => {
    setPassportNumberError(false);
    handleFirstPageFormInputChange(value, name);
  };
  const selectGender = (genderCode) => {
    const selectedGender = genderCode;
    console.log('genderDropdownList', genderDropdownList);

    const updatedGender =
      genderDropdownList &&
      genderDropdownList.map((gender, index) => {
        let selected = false;
        if (gender.code === selectedGender) {
          selected = true;
          // setGender(gender.code);
          handleFirstPageFormInputChange(gender.code, 'gender');
          // setFirstPageForm({ ...firstPageForm, gender: gender.code });
        }
        return {
          ...gender,
          selected: selected,
          icon: genders[index].icon,
          selectGender,
        };
      }, genders);
    console.log('updatedGender12', updatedGender);

    setGenderList(updatedGender);
  };
  console.log('firstPageForm22', firstPageForm);

  const handleNationalityChange = (value, name) => {
    // const value = target.value;
    if (value !== "none") {
      let _firstPageForm = { ...firstPageForm, [name]: value, passportNo: "", passportValidFrom: null, passportValidTill: null };
      if (
        value.toLowerCase() !== "indian" &&
        value.toLowerCase() !== "nepalese" &&
        value.toLowerCase() !== "bhutanese"
      ) {
        // setPassportAvailable("Y");
        _firstPageForm = { ..._firstPageForm, isPassportAvailable: 'Y' };
        setIsPassportAvailableDisable(true);
      } else {
        setIsPassportAvailableDisable(false);
        // setPassportAvailable("");
        _firstPageForm = { ..._firstPageForm, isPassportAvailable: '' };
      }
      setFirstPageForm({ ..._firstPageForm });
      setPassPortMaxLength(value);
    }
  };
  const handleAppointeeFormPage1Save = async (formElement) => {
    formElement.preventDefault();
    if (passportAvailable === "Y"
      // && clickedButton !== "S"
    ) {
      if (!hasValue(firstPageForm.passportNo)) {
        setPassportNumberError(true);
        showErrorMessage(passportNoEmptyMsg);
        return;
      }
      if ((firstPageForm.nationality.toLowerCase() === "indian" ||
        firstPageForm.originCountry.toLowerCase() === "india")
        && firstPageForm.passportNo.length !== 8) {
        setPassportNumberError(true);
        showErrorMessage(indianpassportNumberPatternErrorMsg);
        return;
      }
    }
    const loginUserData = getLocalStorageItem("pfc-user");
    const formPostSuccessMessage =
      clickedButton === "S" ? formSaveSuccess : formSubmitionSuccess;
    let payLoad = {
      ...firstPageForm,
      isSubmit: clickedButton === "S" ? false : true,
    }

    const response = await postAppointeeDetails(
      payLoad,
      formPostSuccessMessage
    );
    if (response) {
      setLocalStorageItem("pfc-user", {
        ...loginUserData,
        //isSubmit: true,
        status: "Ongoing",
      });
      dispatch(removeLoggedinData());
      dispatch(
        storeLoggedinData({
          ...loginUserData,
          //isSubmit: true,
          status: "Ongoing",
        })
      );
      if (clickedButton === "N") {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setCurrentPageNo(2);
        setIsDraft(false);
        updateStep({
          isHandicap: firstPageForm.isHandicap,
          isPassportAvailable: passportAvailable,
        });
      }
    }
  };
  const handleIsPhysicallyHandicapOnChange = (value, name) => {
    if (value !== "none") {
      handleFirstPageFormInputChange(value, name);
    }
  };
  const handleHandicapTypeOnChange = (value, name) => {
    // const { value } = target;
    if (value !== "none") {
      handleFirstPageFormInputChange(value, name);
    }
  };
  const handleChangeCountryOfOrigin = (value, name) => {
    value !== "none" && handleFirstPageFormInputChange(value, name);
  };
  const handleInternationalWorkerOnChange = (value, name) => {

    if (value !== "none") {
      let _firstPageForm = { ...firstPageForm, [name]: value };
      if (value === "Y") {
        const nationalityLower = firstPageForm.nationality?.toLowerCase();
        const matchedNationality = nationalityList.find(
          (element) => element.value?.toLowerCase() === nationalityLower
        );
        const index = nationalityList.indexOf(matchedNationality);
        _firstPageForm = { ..._firstPageForm, originCountry: countryList[index]?.value };
      }
      if (value === "N") {
        _firstPageForm = { ..._firstPageForm, originCountry: defaultCountry };
      }
      setFirstPageForm(_firstPageForm);
    }
  };
  const handleChangeIspassportAvailable = (value, name) => {
    if (value === 'Y') {
      handleFirstPageFormInputChange(value, name);
    }
    if (value === 'N') {
      setFirstPageForm({
        ...firstPageForm,
        [name]: value,
        passportNo: null,
        passportValidFrom: null,
        passportValidTill: null
      })
    }
  }



  useEffect(() => {
    if (genderDropdownList) {
      selectGender(firstPageForm.gender);
    }
  }, [genderDropdownList, firstPageForm.gender]);
  return (
    <Box sx={{ marginTop: "1.8rem" }}>
      <form onSubmit={handleAppointeeFormPage1Save}>
        <Grid
          sx={{ paddingLeft: "20px" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {/* ###### Personal Details Section Start ###### */}
          <FormHeadingContainer>
            <FormHeading
              step={stepsList.PD.step}
              heading={stepsList.PD.name}
              info={
                "Enter all your Personal Details like Gender, DOB to verify with Aadhaar, PAN, UAN.This section ensures all necessary details for creating a PF account are provided in the exact required format."
              }
            />
          </FormHeadingContainer>
          <GridRow>
            <Grid
              item
              container
              sx={{ paddingLeft: "0px !important" }}
              rowSpacing={{ xs: 1, md: 0 }}
              columnSpacing={{ xs: 0, md: 2 }}
              xs={12}
            >
              {genderList &&
                genderList.map((gender, index) => {
                  const { value, icon, selected, id, code, selectGender } =
                    gender;
                  const { currentGenderSectionContainer } = GenderSelection(
                    selected,
                    isAadhaarVarified
                  );
                  return (
                    <Grid sx={{ padding: 0 }} key={index} item xs={12} md={4}>
                      {isAadhaarVarified ? (
                        <Stack id={id} sx={currentGenderSectionContainer}>
                          {icon}
                          <Typography fontSize="2rem" sx={genderTypeStyle}>
                            {value}
                          </Typography>
                        </Stack>
                      ) : (
                        <Stack
                          id={id}
                          sx={currentGenderSectionContainer}
                          onClick={() => {
                            selectGender(code);
                          }}
                        >
                          {icon}
                          <Typography fontSize="2rem" sx={genderTypeStyle}>
                            {value}
                          </Typography>
                        </Stack>
                      )}
                    </Grid>
                  );
                })}
            </Grid>
          </GridRow>

          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <TextInput
                label={"Name"}
                value={firstPageForm.appointeeName}
                disabled={true}
                required={true}
                name={'appointeeName'}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingLeft: { xs: "0px !important", md: "20px!important" },
              }}
            >
              <CustomeDatePicker
                label={"Date Of Birth"}
                value={firstPageForm.dateOfBirth ? dayjs(firstPageForm.dateOfBirth) : null}
                setValue={(newDate, name) => {
                  if (newDate) {
                    handleFirstPageFormInputChange(newDate.format("YYYY-MM-DD"), 'dateOfBirth');
                  } else {
                    handleFirstPageFormInputChange(null, 'dateOfBirth'); // Clear the value if the date is cleared
                  }
                }}
                required={true}
                disableFuture={true}
                maxDate={dayjs()}
                minDate={dayjs().subtract(150, "year")}
                disabled={firstPageForm.isAadhaarVarified}
              />
            </Grid>
          </GridRow>
          <GridRow>
            <Grid item xs={12} md={6} sx={{ paddingLeft: "0px !important" }}>
              <TextInput
                label={`Father's/ Husband's Name`}
                value={firstPageForm.memberName}
                name={'memberName'}
                onChange={handleFirstPageFormInputChange}
                onKeyDown={handleSpacialcharecter}
                onPaste={handelSpacialCharecterPaste}
                required={true}
                maxLength={50}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingLeft: { xs: "0px !important", md: "20px!important" },
              }}
            >
              <SelectInput
                label={"Relationship"}
                itemList={relationList}
                name={"memberRelation"}
                value={firstPageForm.memberRelation}
                onChange={handleFirstPageFormInputChange}
                disabled={isRelationShipWithMemberDisabled}
                sx={inputFieldStyle2}
                required={true}
                selectProperty={"code"}
              />
            </Grid>
          </GridRow>
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <TextInput
                label={"Mobile No"}
                value={firstPageForm.mobileNo}
                disabled={true}
                required={true}
              />
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
                label={"Email"}
                value={firstPageForm.appointeeEmailId}
                disabled={true}
                required={true}
              />
            </Grid>
          </GridRow>
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <SelectInput
                label={"Nationality"}
                itemList={nationalityList}
                name={'nationality'}
                value={firstPageForm.nationality}
                onChange={handleNationalityChange}
                sx={inputFieldStyle2}
                required={true}
                selectProperty={"code"}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                paddingLeft: { xs: "0px !important", md: "20px!important" },
              }}
            >
              <SelectInput
                label={"Qualification"}
                itemList={qualificationList}
                name={'qualification'}
                value={firstPageForm.qualification}
                onChange={handleFirstPageFormInputChange}
                sx={inputFieldStyle2}
                selectProperty={"code"}
              />
            </Grid>
          </GridRow>
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <SelectInput
                label={"Marital status"}
                itemList={maritalStatusList}
                name={'maratialStatus'}
                value={firstPageForm.maratialStatus}
                onChange={handleFirstPageFormInputChange}
                sx={inputFieldStyle2}
                selectProperty={"code"}
                required={true}
              />
            </Grid>
          </GridRow>

          {/* ###### Personal Details Section End ###### */}

          {/* ###### Passport Details Section Start ###### */}
          <FormHeadingContainer>
            <FormHeading
              step={stepsList.PassD.step}
              heading={stepsList.PassD.name}
              info={"Enter your Passport details to verify its authenticity."}
              Children={
                <IconButton onClick={handlePassporNumbertHelp}>
                  <HelpOutline />
                </IconButton>
              }
            />
          </FormHeadingContainer>

          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <SelectInput
                label={"Is Passport Available"}
                itemList={yesNoList}
                value={firstPageForm.isPassportAvailable}
                name={'isPassportAvailable'}
                onChange={handleChangeIspassportAvailable}
                sx={inputFieldStyle2}
                disabled={isPassportAvailableDisable}
                required={true}
              />
            </Grid>
            {firstPageForm.isPassportAvailable === "Y" ? (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  paddingLeft: { xs: "0px !important", md: "20px!important" },
                }}
              >
                <SelectInput
                  label={"Is International Worker"}
                  itemList={yesNoList}
                  value={firstPageForm.isInternationalWorker}
                  name={'isInternationalWorker'}
                  onChange={handleInternationalWorkerOnChange}
                  sx={inputFieldStyle2}
                  required={true}
                  disabled={isPassportVarified || disabledIsInterNationalWorker}
                />
              </Grid>
            ) : null}
          </GridRow>

          {firstPageForm.isPassportAvailable === "Y" ? (
            <>
              <GridRow>
                <Grid
                  sx={{ paddingLeft: "0px !important" }}
                  item
                  xs={12}
                  md={6}
                >
                  <SelectInput
                    label={"Country of origin"}
                    itemList={countryList}
                    value={firstPageForm.originCountry}
                    name={'originCountry'}
                    onChange={handleChangeCountryOfOrigin}
                    sx={inputFieldStyle2}
                    required={true}
                    disabled={firstPageForm.isInternationalWorker === "N"}
                    selectProperty={"code"}
                  />
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
                    label={"Passport Number"}
                    value={firstPageForm.passportNo}
                    name={'passportNo'}
                    onChange={handlePassportNoChange}
                    disabled={isPassportVarified}
                    required={true}
                    error={passportNumberError}
                    inputProps={passportNumberInputProps}
                  />
                </Grid>
              </GridRow>
              <GridRow>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ paddingLeft: "0px !important" }}
                >
                  <CustomeDatePicker
                    label={"Date Of Issue"}
                    value={
                      firstPageForm.passportValidFrom ? dayjs(firstPageForm.passportValidFrom) : null
                    }
                    name={'passportValidFrom'}
                    setValue={handleChangeDateofIssue}
                    required={true}
                    disabled={isPassportVarified}
                    maxDate={dayjs()}
                    minDate={null}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    paddingLeft: { xs: "0px !important", md: "20px!important" },
                  }}
                >
                  <CustomeDatePicker
                    label={"Date of Expiry"}
                    value={
                      firstPageForm.passportValidTill
                        ? dayjs(firstPageForm.passportValidTill)
                        : null
                    }
                    name={'passportValidTill'}
                    setValue={handleChangeinDateofexpiry}
                    disableFuture={false}
                    minDate={dayjs()}
                    required={true}
                    disabled={isPassportVarified}
                  />
                </Grid>
              </GridRow>
            </>
          ) : null}

          {/* ###### Passport Details Section End ###### */}
          {/* ###### Others Details Section Start ###### */}
          <FormHeadingContainer>
            <FormHeading
              step={stepsList.OD.step}
              heading={stepsList.OD.name}
              info={"Enter your handicap details ."}
            />
          </FormHeadingContainer>
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <SelectInput
                label={"Is Physically Handicap"}
                itemList={yesNoList}
                value={firstPageForm.isHandicap}
                name={'isHandicap'}
                onChange={handleIsPhysicallyHandicapOnChange}
                sx={inputFieldStyle2}
                required={true}
              />
            </Grid>
            {/* </GridRow> */}
            {firstPageForm.isHandicap === "Y" ? (
              // <GridRow>
              <Grid sx={{ paddingLeft: { xs: "0px !important", md: "20px!important" } }} item xs={12} md={6}>
                <SelectInput
                  label={"Handicap type"}
                  itemList={disabilityList}
                  value={firstPageForm.handicapeType}
                  name={'handicapeType'}
                  onChange={handleHandicapTypeOnChange}
                  sx={inputFieldStyle2}
                  required={true}
                  selectProperty="code"
                />
              </Grid>
            ) : null}
          </GridRow>
          {/* ###### Others Details Section End ###### */}
          <GridRow>
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12}>
              <Stack sx={submitBtnContainerStyle}>
                <Stack flexDirection={"row"}>
                  <Button
                    xs={12}
                    name="save"
                    onClick={() => setClickedButton("S")}
                    type="submit"
                    sx={submitBtnStyle}
                    variant="contained"
                    color="primary"
                    disabled={!isDraft} // Hide saveButton when clickedButton is "N"
                  >
                    {saveButton}
                  </Button>
                  <Button
                    name="save_and_next"
                    onClick={() => setClickedButton("N")}
                    type="submit"
                    sx={submitBtnStyle}
                    variant="contained"
                    color="primary"
                  >
                    {saveAndNextbutton}
                  </Button>
                </Stack>
                <Button
                  onClick={handleClickOnNext}
                  sx={submitBtnStyle}
                  variant="contained"
                  color="primary"
                  disabled={isDraft} // Show Next button only when clickedButton is "N"
                >
                  Next
                </Button>
              </Stack>
            </Grid>
          </GridRow>
        </Grid>
      </form>
    </Box>
  );
};

export default FirstForm;
