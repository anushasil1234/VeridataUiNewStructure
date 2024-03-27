import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { heading4, profilePasswordContainerSx, textField1Sx } from 'app'
import React, { useState } from 'react'
import { CardLayout, patternChecking } from 'shared/utils';
import ProfileImg from 'assets/images/profile/user-1.jpg';
import { PersonalInformation } from 'shared/components/display-information/personal-information';
import { useSelector } from 'react-redux';
import { invalidPasswordMsg } from 'shared/constants/constants';

const ManageProfile = () => {

    const loggedInData  = useSelector(state => state.loggedInData);
    const apiSlice  = useSelector(state => state.apiSlice);
    const popUpSlice  = useSelector(state => state.popUpSlice);
    
    const { editUserProfileDetails } = apiSlice[0];
    const { showErrorMessage, showSuccessMessage } = popUpSlice[0];
    const { roleName, userName, emailId, isSetProfilePassword, userId } = loggedInData && loggedInData.length > 0 && loggedInData[0];

    const [profilePassword, setProfilePassword] = useState();

    const submitPassword = async () => {
        const isPasswordValid = patternChecking(profilePassword, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,10}$/)
        if (isPasswordValid) {
            const payLoad = {
                profilePassword,
                userId
            }
            const response = await editUserProfileDetails(payLoad);
            if (response) {
                const { responseInfo } = response;
                if (responseInfo === 'success') {
                    setProfilePassword();
                }
            }
        } else {
            showErrorMessage(invalidPasswordMsg);
        }
    }

    return (
        <CardLayout>
            <Grid container rowSpacing={2} columnSpacing={2.5}  >
                <Grid item xs={12} md={6} >
                    <img src={ProfileImg} alt="profile image" />
                </Grid>
                <Grid item xs={12} md={6} >
                    <Typography sx={heading4}>{userName}</Typography>
                    <Grid container spacing={0}>
                        <PersonalInformation
                            fieldName={"Role"}
                            fieldValue={roleName}
                        />
                        <PersonalInformation
                            fieldName={"Email"}
                            fieldValue={emailId}
                        />
                        {
                            !isSetProfilePassword &&
                            <PersonalInformation
                                fieldName={"Profile Password"}
                                fieldTooltip={"Password should have length 6-10, containing 1 letter, 1 number, 1 spacial charecter"}
                                fieldValue={
                                    <Stack sx={profilePasswordContainerSx}>
                                        <TextField value={profilePassword} onChange={({ target }) => {
                                            setProfilePassword(target.value);
                                        }} sx={textField1Sx} variant="filled" />
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            // style={styles.btnstyle}
                                            onClick={submitPassword}
                                        >
                                            submit
                                        </Button>
                                    </Stack>
                                }
                            />
                        }
                    </Grid>
                </Grid>
            </Grid>
        </CardLayout>
    )
}

export default ManageProfile