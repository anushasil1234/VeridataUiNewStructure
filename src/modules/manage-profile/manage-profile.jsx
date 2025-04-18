
// import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
// import { heading4, profilePasswordContainerSx, textField1Sx } from 'app';
// import React, { useState } from 'react';
// import { CardLayout, hasValue, validationsCheck } from 'shared/utils';
// import ProfileImg from 'assets/images/profile/user-2.jpg';
// import { PersonalInformation } from 'shared/components/display-information/personal-information';
// import { useSelector } from 'react-redux';
// import { invalidPasswordPatternMsg, passwordEmptyMsg } from 'shared/constants/constants';
// import { editUserProfileDetails } from 'server/apis';
// import showErrorMessage from 'shared/utils/associate/show-error-message';

// const ManageProfile = () => {
//     const loggedInData = useSelector(state => state.loggedInData);
//     const apiSlice = useSelector(state => state.apiSlice);
//     const popUpSlice = useSelector(state => state.popUpSlice);

//     // const { editUserProfileDetails } = apiSlice[0];
//     // const { showErrorMessage, showSuccessMessage } = popUpSlice[0];
//     const { roleName, userName, emailId, isSetProfilePassword, userId } = loggedInData && loggedInData.length > 0 && loggedInData[0];

//     const [profilePassword, setProfilePassword] = useState('');

//     const submitPassword = async () => {
//         if (!hasValue(profilePassword)) {
//             showErrorMessage(passwordEmptyMsg);
//             return;
//         }
//         if (hasValue(profilePassword) && !validationsCheck(profilePassword.trim(), 'password')) {
//             showErrorMessage(invalidPasswordPatternMsg);
//             return;
//         }

//         const payLoad = {
//             profilePassword,
//             userId
//         };
//         const response = await editUserProfileDetails(payLoad);
//         if (response) {
//             const { responseInfo } = response;
//             if (responseInfo === 'success') {
//                 setProfilePassword('');
//             }
//         }
//     };

//     return (
//         <CardLayout>
//             <Grid container rowSpacing={2} columnSpacing={2.5} >
//                 {/* Profile Image */}
//                 <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
//                     <img src={ProfileImg} alt="profile image" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
//                 </Grid>

//                 {/* User Information */}
//                 <Grid item xs={12} sm={6} md={8} lg={8} xl={9}>
//                     <Typography sx={heading4} variant="h4" gutterBottom>{userName}</Typography>
//                     <Grid container spacing={2}>
//                         <PersonalInformation fieldName="Role" fieldValue={roleName} />
//                         <PersonalInformation fieldName="Email" fieldValue={emailId} />
//                         {/* {
//                             !isSetProfilePassword &&
//                             <PersonalInformation
//                                 fieldName="Profile Password"
//                                 fieldTooltip="Password should have length 6-10, containing 1 letter, 1 number, 1 special character"
//                                 fieldValue={
//                                     <Stack
//                                         sx={{ ...profilePasswordContainerSx, alignItems: 'center' }} // Align items vertically centered
//                                         direction="row" // Set direction to row
//                                         spacing={2} // Add space between the input and button
//                                     >
//                                         <TextField
//                                             value={profilePassword}
//                                             onChange={({ target }) => setProfilePassword(target.value)}
//                                             sx={{ ...textField1Sx, flexGrow: 1 }} // Allow input to grow in width
//                                             variant="filled"
//                                             fullWidth
//                                         />
//                                         <Button
//                                             type="submit"
//                                             color="primary"
//                                             variant="contained"
//                                             onClick={submitPassword}
//                                         >
//                                             Submit
//                                         </Button>
//                                     </Stack>
//                                 }
//                             />

//                         } */}
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </CardLayout>
//     );
// };

// export default ManageProfile;



import React, { useState } from "react";
import { Button, Grid, Stack, Typography, Avatar } from "@mui/material";
import { heading4 } from "app";
import { CardLayout } from "shared/utils";
import ProfileImg from "assets/images/profile/user-2.jpg";
import { PersonalInformation } from "shared/components/display-information/personal-information";
import { useSelector } from "react-redux";
import ProfileImageUploader from "shared/components/file-upload-section/upload-profile-picture";

const ManageProfile = () => {
    const loggedInData = useSelector((state) => state.loggedInData);
    console.log("loggedInData", loggedInData[0]);
    const { roleName, userName, emailId,appointeeId,userId } = loggedInData?.[0] || {};

    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedFileDetails, setUploadedFileDetails] = useState([]);
    const [uploadedFile, setUploadedFile] = useState([]);
    

    return (
        <CardLayout>
            <Grid container rowSpacing={2} columnSpacing={2.5}>
                {/* Profile Image & Upload */}
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                    <Stack spacing={2} alignItems="center">
                        <Avatar
                            src={ProfileImg || selectedImage}
                            sx={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                        <Typography variant="body1">Upload your profile picture</Typography>

                        {/* Separate Image Upload Component */}
                        <ProfileImageUploader 
                        selectedImage={selectedImage} 
                        setSelectedImage={setSelectedImage} 
                        setUploadedFileDetails={setUploadedFileDetails}
                        uploadedFileDetails = {uploadedFileDetails}
                        uploadedFile = {uploadedFile}
                        setUploadedFile = {setUploadedFile}
                        appointeeId={appointeeId}
                        userId={userId}
                        />
                    </Stack>
                </Grid>

                {/* User Information */}
                <Grid item xs={12} sm={6} md={8} lg={8} xl={9}>
                    <Typography sx={heading4} variant="h4" gutterBottom>
                        {userName}
                    </Typography>
                    <Grid container spacing={2}>
                        <PersonalInformation fieldName="Role" fieldValue={roleName} />
                        <PersonalInformation fieldName="Email" fieldValue={emailId} />
                    </Grid>
                </Grid>
            </Grid>
            {/* {uploadedFileDetails.length > 0 && (
                <div>
                    <h3>Uploaded File Details:</h3>
                    <pre>{JSON.stringify(uploadedFileDetails, null, 2)}</pre>
                </div>
            )} */}
        </CardLayout>
    );
};

export default ManageProfile;

