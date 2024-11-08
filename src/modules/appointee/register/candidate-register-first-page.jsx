import { Box, FormControl, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { datePickerinputFieldStyle2, formHeadingContainerStyle, formHeadingGridContainerStyle, genderTypeStyle, inputFieldStyle2, lable1CopyStyle } from 'app';
import React, { useEffect, useState } from 'react'
import FormHeading from './form-heading';
import GenderSelection from 'shared/utils/associate/gender-selection';
import { useSelector } from 'react-redux';
import { genders } from 'shared/constants/constants';
import { DatePicker } from '@mui/lab';
import dayjs from 'dayjs';

const CandidateRegisterFirstPage = ({
    handleOnSubmit,
    stepsList,
    fathersOrHusbandName,
    setFathersOrHusbandName,
    gender,
    setGender,
    isAadhaarVarified,
    setMemberName,
    memberName,
    dateOfBirth,
    setDateOfBirth,
    relationshipWithMember,
    setRelationshipWithMember,
    mobileNo,
    setMobileNo,
    email,
    setEmail,
    nationality,
    setNationality,
    setPassportNo,
    setPassportAvailable,
    setIsPassportAvailableDisable,
    setPassPortMaxLength,
    qualification,
    setQualification,
    maritalStatus,
    setMaritalStatus
}) => {

    // const dropdownList = useSelector((state) => state.dropdownList)[0];
    // const {
    //     relationList,
    //     nationalityList,
    //     qualificationList,
    //     maritalStatusList
    // } = dropdownList && dropdownList.length > 0 && dropdownList[0];
    // const genderDropdownList =
    //     dropdownList &&
    //     dropdownList.length > 0 &&
    //     dropdownList[0] &&
    //     dropdownList[0].genderList;


    // const [genderList, setGenderList] = useState();
    // const [
    //     isRelationShipWithMemberDisabled,
    //     setIsRelationShipWithMemberDisabled,
    // ] = useState(false);

    // const selectGender = (genderCode) => {
    //     const selectedGender = genderCode;
    //     const updatedGender =
    //         genderDropdownList &&
    //         genderDropdownList.map((gender, index) => {
    //             let selected = false;
    //             if (gender.code === selectedGender) {
    //                 selected = true;
    //                 setGender(gender.code);
    //             }
    //             return {
    //                 ...gender,
    //                 selected: selected,
    //                 icon: genders[index].icon,
    //                 selectGender,
    //             };
    //         }, genders);
    //     setGenderList(updatedGender);
    // };
    // const handleSpacialcharecter = (e) => {
    //     const char = /^[A-Za-z\s]+$/;
    //     const allowedKeys = [
    //         "Backspace",
    //         "Tab",
    //         "ArrowLeft",
    //         "ArrowRight",
    //         "Delete",
    //     ];
    //     if (!char.test(e.key) && !allowedKeys.includes(e.key)) {
    //         e.preventDefault();
    //     }
    // };
    // const handelSpacialCharecterPaste = (e) => {
    //     const paste = (e.clipboardData || window.clipboardData).getData("text");
    //     if (!/^[A-Za-z\s]*$/.test(paste)) {
    //         e.preventDefault();
    //     }
    // };

    // const handleNationalityChange = ({ target }) => {
    //     const value = target.value;
    //     setNationality(value);
    //     setPassportNo("");
    //     if (value.toLowerCase() !== "indian" && value.toLowerCase() !== "nepalese" && value.toLowerCase() !== "bhutanese") {
    //         setPassportAvailable('Y');
    //         setIsPassportAvailableDisable(true);
    //     } else {
    //         setIsPassportAvailableDisable(false);
    //         setPassportAvailable('');
    //     }
    //     setPassPortMaxLength(value);
    // }

    // const handlePassporNumbertHelp = () => {
    //     const passportHelpContent = {
    //         dialogContentText: "",
    //         dialogTitle: "PASSPORT HELP",
    //         dialogContentComponent: (
    //             <img
    //                 src={PassportSample}
    //                 alt="Help"
    //                 style={{ maxWidth: "100%", maxHeight: "100%" }}
    //             />
    //         ),
    //         maxWidth: "sm",
    //         btnName: "Close",
    //     };
    //     openInfoModel(passportHelpContent);
    // };

    // useEffect(() => {
    //     if (gender === "M") {
    //         setRelationshipWithMember("F");
    //         setIsRelationShipWithMemberDisabled(true);
    //     } else {
    //         setIsRelationShipWithMemberDisabled(false);
    //     }
    // }, [gender]);
    // return (
    //     <Box sx={{ marginTop: "1.8rem" }}>
    //         <form onSubmit={handleOnSubmit}>
    //             <Grid
    //                 sx={{ paddingLeft: "20px" }}
    //                 container
    //                 rowSpacing={1}
    //                 columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    //             >

    //                 {/* ###### Personal Details Section Start ###### */}

    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid item xs={12} sx={formHeadingContainerStyle}>
    //                         <FormHeading
    //                             step={stepsList.PD.step}
    //                             heading={stepsList.PD.name}
    //                             info={
    //                                 "Enter all your Personal Details like Gender, DOB to verify with Adhar, PAN, UAN."
    //                             }
    //                         />
    //                     </Grid>
    //                     <Grid
    //                         item
    //                         container
    //                         sx={{ paddingLeft: '0px !important' }}
    //                         rowSpacing={{ xs: 1, md: 0 }}
    //                         columnSpacing={{ xs: 0, md: 2 }}
    //                         xs={12}
    //                     >
    //                         {genderList &&
    //                             genderList.map((gender, index) => {
    //                                 const {
    //                                     value,
    //                                     icon,
    //                                     selected,
    //                                     id,
    //                                     code,
    //                                     selectGender,
    //                                 } = gender;
    //                                 const { currentGenderSectionContainer } = GenderSelection(selected, isAadhaarVarified);
    //                                 return (
    //                                     <Grid sx={{ padding: 0 }} key={index} item xs={12} md={4}>
    //                                         {isAadhaarVarified ? (
    //                                             <Stack
    //                                                 id={id}
    //                                                 sx={currentGenderSectionContainer}
    //                                             >
    //                                                 {icon}
    //                                                 <Typography
    //                                                     fontSize="2rem"
    //                                                     sx={genderTypeStyle}
    //                                                 >
    //                                                     {value}
    //                                                 </Typography>
    //                                             </Stack>
    //                                         ) : (
    //                                             <Stack
    //                                                 id={id}
    //                                                 sx={currentGenderSectionContainer}
    //                                                 onClick={() => {
    //                                                     selectGender(code);
    //                                                 }}
    //                                             >
    //                                                 {icon}
    //                                                 <Typography
    //                                                     fontSize="2rem"
    //                                                     sx={genderTypeStyle}
    //                                                 >
    //                                                     {value}
    //                                                 </Typography>
    //                                             </Stack>
    //                                         )}
    //                                     </Grid>
    //                                 );
    //                             })}
    //                     </Grid>
    //                 </Grid>
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
    //                         <Typography sx={lable1CopyStyle}>
    //                             Name
    //                             <span className="requiredField">*</span>
    //                         </Typography>
    //                         <TextField
    //                             onChange={(e) => {
    //                                 setMemberName(e.target.value);
    //                             }}
    //                             error={false}
    //                             style={inputFieldStyle2}
    //                             type="text"
    //                             className="customeTextField"
    //                             variant="outlined"
    //                             defaultValue={" "}
    //                             value={memberName}
    //                             disabled
    //                             inputStyle={{ padding: 0 }}
    //                             InputProps={{
    //                                 readOnly: true,
    //                                 style: {
    //                                     padding: 0,
    //                                     color: "#000",
    //                                 },
    //                             }}
    //                         />
    //                     </Grid>
    //                     <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
    //                         <FormControl sx={{ ...datePickerinputFieldStyle2 }} fullWidth>
    //                             <Typography sx={lable1CopyStyle}>
    //                                 Date Of Birth
    //                                 <span className="requiredField">*</span>
    //                             </Typography>

    //                             <DatePicker
    //                                 disabled={isAadhaarVarified}
    //                                 style={{ ...datePickerinputFieldStyle2 }}
    //                                 //label="Date of Birth"
    //                                 value={dateOfBirth ? dayjs(dateOfBirth) : null}
    //                                 setValue={(newDate) => {
    //                                     if (newDate) {
    //                                         setDateOfBirth(newDate.format('YYYY-MM-DD'));
    //                                     }
    //                                 }}
    //                                 disableFuture={true}
    //                                 maxDate={dayjs()}
    //                                 minDate={null}
    //                             />
    //                         </FormControl>

    //                     </Grid>
    //                 </Grid>
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
    //                         <Typography sx={lable1CopyStyle}>
    //                             Father's/ Husband's Name
    //                             <span className="requiredField">*</span>
    //                         </Typography>

    //                         <TextField
    //                             error={false}
    //                             style={inputFieldStyle2}
    //                             type="text"
    //                             className="customeTextField"
    //                             variant="outlined"
    //                             onKeyDown={handleSpacialcharecter}
    //                             onPaste={handelSpacialCharecterPaste}
    //                             onChange={(e) => {
    //                                 setFathersOrHusbandName(e.target.value);
    //                             }}
    //                             value={fathersOrHusbandName}
    //                             defaultValue={" "}
    //                             inputProps={{ maxLength: 50 }}
    //                         />
    //                     </Grid>
    //                     <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
    //                         <FormControl fullWidth>
    //                             <Typography sx={lable1CopyStyle}>
    //                                 Relationship{" "}
    //                                 <span className="requiredField">*</span>
    //                             </Typography>
    //                             {relationshipWithMember !== undefined && (
    //                                 <Select
    //                                     error={false}
    //                                     labelId="demo-simple-select-label"
    //                                     id="demo-simple-select"
    //                                     className="customeTextField"
    //                                     disabled={isRelationShipWithMemberDisabled}
    //                                     sx={inputFieldStyle2}
    //                                     onChange={(e) => {
    //                                         setRelationshipWithMember(e.target.value);
    //                                     }}
    //                                     value={relationshipWithMember}
    //                                 >
    //                                     {relationList &&
    //                                         relationList.map((element) => {
    //                                             return (
    //                                                 <MenuItem
    //                                                     key={element.id}
    //                                                     value={element.code}
    //                                                 >
    //                                                     {element.value}
    //                                                 </MenuItem>
    //                                             );
    //                                         })}
    //                                 </Select>
    //                             )}
    //                         </FormControl>
    //                     </Grid>
    //                 </Grid>
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
    //                         <Typography sx={lable1CopyStyle}>
    //                             Mobile No
    //                             <span className="requiredField">*</span>
    //                         </Typography>
    //                         <TextField
    //                             style={inputFieldStyle2}
    //                             type="text"
    //                             disabled={true}
    //                             variant="outlined"
    //                             className="customeTextField"
    //                             onChange={(e) => {
    //                                 setMobileNo(e.target.value);
    //                             }}
    //                             value={mobileNo}
    //                             defaultValue={" "}
    //                             InputProps={{
    //                                 readOnly: true,
    //                             }}
    //                         />
    //                     </Grid>
    //                     <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
    //                         <Typography sx={lable1CopyStyle}>
    //                             Email
    //                             <span className="requiredField">*</span>
    //                         </Typography>
    //                         <TextField
    //                             style={inputFieldStyle2}
    //                             type="text"
    //                             disabled={true}
    //                             variant="outlined"
    //                             className="customeTextField"
    //                             onChange={(e) => {
    //                                 setEmail(e.target.value);
    //                             }}
    //                             value={email}
    //                             defaultValue={" "}
    //                             InputProps={{
    //                                 readOnly: true,
    //                             }}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
    //                         <FormControl fullWidth>
    //                             <Typography sx={lable1CopyStyle}>
    //                                 Nationality
    //                                 <span className="requiredField">*</span>
    //                             </Typography>
    //                             {nationality !== undefined && (
    //                                 <Select
    //                                     error={false}
    //                                     labelId="demo-simple-select-label"
    //                                     id="demo-simple-select"
    //                                     sx={inputFieldStyle2}
    //                                     value={nationality}
    //                                     className="customeTextField"
    //                                     onChange={handleNationalityChange}
    //                                 >
    //                                     {nationalityList &&
    //                                         nationalityList.map((element) => {
    //                                             return (
    //                                                 <MenuItem
    //                                                     key={element.id}
    //                                                     value={element.code}
    //                                                 >
    //                                                     {element.value}
    //                                                 </MenuItem>
    //                                             );
    //                                         })}
    //                                 </Select>
    //                             )}
    //                         </FormControl>
    //                     </Grid>
    //                     <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
    //                         <FormControl fullWidth>
    //                             <Typography sx={lable1CopyStyle}>
    //                                 Qualification
    //                             </Typography>
    //                             {qualification !== undefined && (
    //                                 <Select
    //                                     error={false}
    //                                     labelId="demo-simple-select-label"
    //                                     id="demo-simple-select"
    //                                     className="customeTextField"
    //                                     sx={inputFieldStyle2}
    //                                     onChange={(e) => {
    //                                         setQualification(e.target.value);
    //                                     }}
    //                                     value={qualification}
    //                                 >
    //                                     {qualificationList &&
    //                                         qualificationList.map((element) => {
    //                                             return (
    //                                                 <MenuItem
    //                                                     key={element.id}
    //                                                     value={element.code}
    //                                                 >
    //                                                     {element.value}
    //                                                 </MenuItem>
    //                                             );
    //                                         })}
    //                                 </Select>
    //                             )}
    //                         </FormControl>
    //                     </Grid>
    //                 </Grid>
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
    //                         <FormControl fullWidth>
    //                             <Typography sx={lable1CopyStyle}>
    //                                 Marital status
    //                                 <span className="requiredField">*</span>
    //                             </Typography>
    //                             {maritalStatus !== undefined && (
    //                                 <Select
    //                                     error={false}
    //                                     labelId="demo-simple-select-label"
    //                                     id="demo-simple-select"
    //                                     sx={inputFieldStyle2}
    //                                     className="customeTextField"
    //                                     onChange={(e) => {
    //                                         setMaritalStatus(e.target.value);
    //                                     }}
    //                                     value={maritalStatus}
    //                                 >
    //                                     {maritalStatusList &&
    //                                         maritalStatusList.map((element) => {
    //                                             return (
    //                                                 <MenuItem
    //                                                     key={element.id}
    //                                                     value={element.code}
    //                                                 >
    //                                                     {element.value}
    //                                                 </MenuItem>
    //                                             );
    //                                         })}
    //                                 </Select>
    //                             )}
    //                         </FormControl>
    //                     </Grid>
    //                 </Grid>

    //                 {/* ###### Personal Details Section End ###### */}


    //                 {/* ###### Passport Details Section Start ###### */}

    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid item xs={12} sx={formHeadingContainerStyle}>
    //                         <FormHeading
    //                             step={stepsList.PassD.step}
    //                             heading={stepsList.PassD.name}
    //                             info={
    //                                 "Enter your Passport details to verify its authenticity."
    //                             }
    //                             Children={
    //                                 <IconButton
    //                                     onClick={handlePassporNumbertHelp}
    //                                 >
    //                                     <HelpOutline />
    //                                 </IconButton>
    //                             }
    //                         />
    //                     </Grid>
    //                 </Grid>
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
    //                         <FormControl fullWidth>
    //                             <Typography sx={lable1CopyStyle}>
    //                                 Is Passport Available
    //                                 <span className="requiredField">*</span>
    //                             </Typography>
    //                             {passportAvailable !== undefined && (
    //                                 <Select
    //                                     error={false}
    //                                     className="customeTextField"
    //                                     labelId="demo-simple-select-label"
    //                                     id="demo-simple-select"
    //                                     sx={inputFieldStyle2}
    //                                     onChange={
    //                                         handleIsPassportAvailableOnChange
    //                                     }
    //                                     value={passportAvailable}
    //                                     disabled={isPassportAvailableDisable}
    //                                 >
    //                                     <MenuItem value={"Y"}>Yes</MenuItem>
    //                                     <MenuItem value={"N"}>No</MenuItem>
    //                                 </Select>
    //                             )}
    //                         </FormControl>
    //                     </Grid>
    //                     {passportAvailable === "Y" ? (
    //                         <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
    //                             <FormControl fullWidth>
    //                                 <Typography sx={lable1CopyStyle}>
    //                                     Is International Worker
    //                                     <span className="requiredField">*</span>
    //                                 </Typography>
    //                                 {isInterNationalWorker !== undefined && (
    //                                     <Select
    //                                         error={false}
    //                                         className="customeTextField"
    //                                         labelId="demo-simple-select-label"
    //                                         id="demo-simple-select"
    //                                         sx={inputFieldStyle2}
    //                                         disabled={
    //                                             isPassportVarified ||
    //                                             disabledIsInterNationalWorker
    //                                         }
    //                                         onChange={
    //                                             handleInternationalWorkerOnChange
    //                                         }
    //                                         value={isInterNationalWorker}
    //                                     >
    //                                         <MenuItem value={"Y"}>Yes</MenuItem>
    //                                         <MenuItem value={"N"}>No</MenuItem>
    //                                     </Select>
    //                                 )}
    //                             </FormControl>
    //                         </Grid>
    //                     ) : null}
    //                 </Grid>

    //                 {passportAvailable === "Y" ? (
    //                     <>
    //                         <Grid
    //                             container
    //                             rowSpacing={1}
    //                             columnSpacing={2.5}
    //                             item
    //                             xs={12}
    //                             sx={formHeadingGridContainerStyle}
    //                         >
    //                             <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
    //                                 <FormControl fullWidth>
    //                                     <Typography sx={lable1CopyStyle}>
    //                                         Country of origin
    //                                         <span className="requiredField">*</span>
    //                                     </Typography>

    //                                     <Select
    //                                         error={false}
    //                                         disabled={isInterNationalWorker === "N"}
    //                                         labelId="demo-simple-select-label"
    //                                         id="demo-simple-select"
    //                                         className="customeTextField"
    //                                         sx={inputFieldStyle2}
    //                                         onChange={(e) => {
    //                                             setCountryOfOrigin(e.target.value);
    //                                         }}
    //                                         value={countryOfOrigin}
    //                                     >
    //                                         {countryList &&
    //                                             countryList.map((element) => {
    //                                                 return (
    //                                                     <MenuItem
    //                                                         key={element.id}
    //                                                         value={element.code}
    //                                                     >
    //                                                         {element.value}
    //                                                     </MenuItem>
    //                                                 );
    //                                             })}
    //                                     </Select>
    //                                 </FormControl>
    //                             </Grid>
    //                             <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
    //                                 <FormControl fullWidth>
    //                                     <Typography sx={lable1CopyStyle}>
    //                                         Passport Number
    //                                         <span className="requiredField">*</span>
    //                                     </Typography>
    //                                     <TextField
    //                                         error={passportNumberError}
    //                                         style={inputFieldStyle2}
    //                                         type="text"
    //                                         className="customeTextField"
    //                                         variant="outlined"
    //                                         onChange={handlePassportNoChange}
    //                                         value={passportNo}
    //                                         disabled={isPassportVarified}
    //                                         defaultValue={" "}
    //                                         inputProps={passportNumberInputProps}
    //                                     />
    //                                 </FormControl>
    //                             </Grid>
    //                         </Grid>
    //                         <Grid
    //                             container
    //                             rowSpacing={1}
    //                             columnSpacing={2.5}
    //                             item
    //                             xs={12}
    //                             sx={formHeadingGridContainerStyle}
    //                         >
    //                             <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
    //                                 <FormControl sx={{ ...datePickerinputFieldStyle2 }} fullWidth>
    //                                     <Typography sx={lable1CopyStyle}>
    //                                         Date of Issue
    //                                         <span className="requiredField">*</span>
    //                                     </Typography>


    //                                     <DatePicker
    //                                         disabled={isPassportVarified}
    //                                         style={{ ...datePickerinputFieldStyle2 }}
    //                                         value={passportValidForDate ? dayjs(passportValidForDate) : null}
    //                                         setValue={(newDate) => {
    //                                             if (newDate) {
    //                                                 setPassportValidForDate(newDate.format('YYYY-MM-DD'));
    //                                                 const expiryDate = newDate.add(10, 'year').subtract(1, 'day').format('YYYY-MM-DD');
    //                                                 setPassportValidTillDate(expiryDate);
    //                                             }
    //                                         }}
    //                                         disableFuture={true}
    //                                         maxDate={dayjs()}
    //                                         minDate={null}
    //                                     />
    //                                 </FormControl>
    //                             </Grid>

    //                             <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
    //                                 <FormControl sx={{ ...datePickerinputFieldStyle2 }} fullWidth>
    //                                     <Typography sx={lable1CopyStyle}>
    //                                         Date of Expiry
    //                                         <span className="requiredField">*</span>
    //                                     </Typography>


    //                                     <DatePicker
    //                                         disabled={isPassportVarified}
    //                                         style={{ ...datePickerinputFieldStyle2 }}
    //                                         value={passportValidTillDate ? dayjs(passportValidTillDate) : null}
    //                                         setValue={(newDate) => {
    //                                             if (newDate) {
    //                                                 PasswordExpiryValidity(newDate.format('YYYY-MM-DD'));
    //                                             }
    //                                         }}
    //                                         disableFuture={false}
    //                                         minDate={dayjs()}
    //                                     />
    //                                 </FormControl>
    //                             </Grid>

    //                         </Grid>
    //                     </>
    //                 ) : null}

    //                 {/* ###### Passport Details Section End ###### */}
    //                 {/* ###### Others Details Section Start ###### */}
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid item xs={12} sx={formHeadingContainerStyle}>
    //                         <FormHeading
    //                             step={stepsList.OD.step}
    //                             heading={stepsList.OD.name}
    //                             info={
    //                                 "Enter your other information like handicap details ."
    //                             }
    //                         />
    //                     </Grid>
    //                 </Grid>
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
    //                         <FormControl fullWidth>
    //                             <Typography sx={lable1CopyStyle}>
    //                                 Date Of Joining
    //                                 <span className="requiredField">*</span>
    //                             </Typography>
    //                             <TextField
    //                                 onChange={(e) => {
    //                                     setDateOfJoining(e.target.value);
    //                                 }}
    //                                 error={false}
    //                                 disableFuture={true}
    //                                 id="date"
    //                                 className="customeTextField"
    //                                 type="date"
    //                                 value={dateOfJoining}
    //                                 sx={inputFieldStyle2}
    //                                 InputLabelProps={{
    //                                     shrink: true,
    //                                 }}
    //                                 InputProps={{
    //                                     readOnly: true,
    //                                 }}
    //                             />
    //                         </FormControl>
    //                     </Grid>
    //                     <Grid item xs={12} md={6} sx={{ paddingLeft: { xs: '0px !important', md: '20px!important' } }}>
    //                         <FormControl fullWidth>
    //                             <Typography sx={lable1CopyStyle}>
    //                                 Is Physically Handicap
    //                                 <span className="requiredField">*</span>
    //                             </Typography>
    //                             {isPhysicallyHandicap !== undefined && (
    //                                 <Select
    //                                     error={false}
    //                                     className="customeTextField"
    //                                     labelId="demo-simple-select-label"
    //                                     id="demo-simple-select"
    //                                     sx={inputFieldStyle2}
    //                                     onChange={(e) => {
    //                                         setIsPhysicallyHandicap(e.target.value);
    //                                     }}
    //                                     value={isPhysicallyHandicap}
    //                                 >
    //                                     <MenuItem value={"Y"}>Yes</MenuItem>
    //                                     <MenuItem value={"N"}>No</MenuItem>
    //                                 </Select>
    //                             )}
    //                         </FormControl>
    //                     </Grid>
    //                 </Grid>
    //                 {isPhysicallyHandicap === "Y" ? (
    //                     <Grid
    //                         container
    //                         rowSpacing={1}
    //                         columnSpacing={2.5}
    //                         item
    //                         xs={12}
    //                         sx={formHeadingGridContainerStyle}
    //                     >
    //                         <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
    //                             <FormControl fullWidth>
    //                                 <Typography sx={lable1CopyStyle}>
    //                                     Handicap type
    //                                     <span className="requiredField">*</span>
    //                                 </Typography>
    //                                 {handicapType !== undefined && (
    //                                     <Select
    //                                         error={false}
    //                                         className="customeTextField"
    //                                         labelId="demo-simple-select-label"
    //                                         id="demo-simple-select"
    //                                         sx={inputFieldStyle2}
    //                                         onChange={(e) => {
    //                                             setHandicapType(e.target.value);
    //                                         }}
    //                                         value={handicapType}
    //                                     >
    //                                         {disabilityList &&
    //                                             disabilityList.map((element) => {
    //                                                 return (
    //                                                     <MenuItem
    //                                                         key={element.id}
    //                                                         value={element.code}
    //                                                     >
    //                                                         {element.value}
    //                                                     </MenuItem>
    //                                                 );
    //                                             })}
    //                                     </Select>
    //                                 )}
    //                             </FormControl>
    //                         </Grid>
    //                     </Grid>
    //                 ) : null}
    //                 {/* ###### Others Details Section End ###### */}
    //                 <Grid
    //                     container
    //                     rowSpacing={1}
    //                     columnSpacing={2.5}
    //                     item
    //                     xs={12}
    //                     sx={formHeadingGridContainerStyle}
    //                 >
    //                     <Grid sx={{ paddingLeft: '0px !important' }} item xs={12}>
    //                         <Stack sx={submitBtnContainerStyle}>
    //                             <Stack flexDirection={'row'} >
    //                                 <Button
    //                                     xs={12}
    //                                     name="save"
    //                                     onClick={() => setClickedButton("S")}
    //                                     type="submit"
    //                                     sx={submitBtnStyle}
    //                                     variant="contained"
    //                                     color="primary"
    //                                     disabled={!isDraft} // Hide saveButton when clickedButton is "N"
    //                                 >
    //                                     {saveButton}
    //                                 </Button>
    //                                 <Button
    //                                     name="save_and_next"
    //                                     onClick={() => setClickedButton("N")}
    //                                     type="submit"
    //                                     sx={submitBtnStyle}
    //                                     variant="contained"
    //                                     color="primary"
    //                                 >
    //                                     {saveAndNextbutton}
    //                                 </Button>
    //                             </Stack>
    //                             <Button
    //                                 onClick={handleSecondNext}
    //                                 sx={submitBtnStyle}
    //                                 variant="contained"
    //                                 color="primary"
    //                                 disabled={isDraft} // Show Next button only when clickedButton is "N"
    //                             >
    //                                 Next
    //                             </Button>
    //                         </Stack>
    //                     </Grid>
    //                 </Grid>
    //             </Grid>
    //         </form>
    //     </Box>
    // )
}

export default CandidateRegisterFirstPage