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
import React, { useState } from "react";
import { useSelector } from "react-redux";
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

const FirstForm = ({
  stepsList,
  setGender,
  memberName,
  dateOfBirth,
  setDateOfBirth,
  fathersOrHusbandName,
  relationshipWithMember,
  handleChangeRelationship,
  isRelationShipWithMemberDisabled,
  mobileNo,
  email,
  nationality,
  handleNationalityChange,
  qualification,
  maritalStatus,
  handleMaritalStatusChange,
  passportAvailable,
  passportNo,
  handleAppointeeFormPage1Save,
  isAadhaarVarified,
  setFathersOrHusbandName,
  handleQualificationChange,
  handleIsPassportAvailableOnChange,
  isPassportAvailableDisable,
  isInterNationalWorker,
  handleInternationalWorkerOnChange,
  isPassportVarified,
  countryOfOrigin,
  disabledIsInterNationalWorker,
  handleChangeCountryOfOrigin,
  handlePassportNoChange,
  passportNumberError,
  passportNoMaxLength,
  passportValidForDate,
  setPassportValidForDate,
  setPassportValidTillDate,
  passportValidTillDate,
  PasswordExpiryValidity,
  dateOfJoining,
  isPhysicallyHandicap,
  handleIsPhysicallyHandicapOnChange,
  handicapType,
  handleHandicapTypeOnChange,
  isDraft,
  handleSecondNext,
  setClickedButton,
  selectGender,
  genderList,
}) => {
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
  const handleNo = (e) => {};
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
                value={memberName}
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
              <CustomeDatePicker
                label={"Date Of Birth"}
                value={dateOfBirth ? dayjs(dateOfBirth) : null}
                setValue={(newDate) => {
                  if (newDate) {
                    setDateOfBirth(newDate.format("YYYY-MM-DD"));
                  } else {
                    setDateOfBirth(null); // Clear the value if the date is cleared
                  }
                }}
                required={true}
                disableFuture={true}
                maxDate={dayjs()}
                minDate={dayjs().subtract(150, "year")}
                disabled={isAadhaarVarified}
              />
            </Grid>
          </GridRow>
          <GridRow>
            <Grid item xs={12} md={6} sx={{ paddingLeft: "0px !important" }}>
              <TextInput
                label={`Father's/ Husband's Name`}
                value={fathersOrHusbandName}
                onChange={setFathersOrHusbandName}
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
                value={relationshipWithMember}
                onChange={handleChangeRelationship}
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
                value={mobileNo}
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
                value={email}
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
                value={nationality}
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
                value={qualification}
                onChange={handleQualificationChange}
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
                value={maritalStatus}
                onChange={handleMaritalStatusChange}
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
                value={passportAvailable}
                onChange={handleIsPassportAvailableOnChange}
                sx={inputFieldStyle2}
                disabled={isPassportAvailableDisable}
                required={true}
              />
            </Grid>
            {passportAvailable === "Y" ? (
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
                  value={isInterNationalWorker}
                  onChange={handleInternationalWorkerOnChange}
                  sx={inputFieldStyle2}
                  required={true}
                  disabled={isPassportVarified || disabledIsInterNationalWorker}
                />
              </Grid>
            ) : null}
          </GridRow>

          {passportAvailable === "Y" ? (
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
                    value={countryOfOrigin}
                    onChange={handleChangeCountryOfOrigin}
                    sx={inputFieldStyle2}
                    required={true}
                    disabled={isInterNationalWorker === "N"}
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
                    value={passportNo}
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
                      passportValidForDate ? dayjs(passportValidForDate) : null
                    }
                    setValue={(newDate) => {
                      if (newDate) {
                        setPassportValidForDate(newDate.format("YYYY-MM-DD"));
                        const expiryDate = newDate
                          .add(10, "year")
                          .subtract(1, "day")
                          .format("YYYY-MM-DD");
                        setPassportValidTillDate(expiryDate);
                      } else {
                        setPassportValidForDate(null); // Clear the value if the date is cleared
                      }
                    }}
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
                      passportValidTillDate
                        ? dayjs(passportValidTillDate)
                        : null
                    }
                    setValue={(newDate) => {
                      if (newDate) {
                        PasswordExpiryValidity(newDate.format("YYYY-MM-DD"));
                      } else {
                        PasswordExpiryValidity(null); // Clear the value if the date is cleared
                      }
                    }}
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
            {/* <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <DateInput
                label={"Date Of Joining"}
                value={dateOfJoining}
                // required={true}
                readOnly={true}
              />
            </Grid> */}
            <Grid sx={{ paddingLeft: "0px !important" }} item xs={12} md={6}>
              <SelectInput
                label={"Is Physically Handicap"}
                itemList={yesNoList}
                value={isPhysicallyHandicap}
                onChange={handleIsPhysicallyHandicapOnChange}
                sx={inputFieldStyle2}
                required={true}
              />
            </Grid>
            {/* </GridRow> */}
            {isPhysicallyHandicap === "Y" ? (
              // <GridRow>
              <Grid sx={{ paddingLeft: { xs: "0px !important", md: "20px!important" }}}item xs={12} md={6}>
                <SelectInput
                  label={"Handicap type"}
                  itemList={disabilityList}
                  value={handicapType}
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
