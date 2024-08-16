import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { lable1Style, loginFieldIconStyle } from 'app';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { changePassword, OtpEmptyMsg, passwordChangeSuccessMsg, passwordEmptyMsg, passwordNotMsg, passwordPattern } from 'shared/constants/constants';
import { CardLayout, InputField, InputFieldProps, hasValue } from 'shared/utils'
import isPaswordValid from 'shared/utils/associate/is-pasword-valid';

const ChangePassword = ({ userId, clientId,  PasswordChangeSuccessAction }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
    const [passwordFieldIcon, setPasswordFieldIcon] = useState(<VisibilityOff sx={loginFieldIconStyle} />);
    const [passwordType, setPasswordType] = useState("password");

    const popUpSlice = useSelector(state => state.popUpSlice);
    const apiSlice = useSelector(state => state.apiSlice);
    const { postPasswordChange } = apiSlice[0];
    const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
    const showSuccessMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showSuccessMessage;

    const handlePasswordChange = async () => {
        if (hasValue(newPassword) && hasValue(confirmPassword)) {
            if (hasValue(otp)) {
                const trimmedPassword = newPassword.trim();
                if (trimmedPassword === confirmPassword.trim()) {
                    if (isPaswordValid(trimmedPassword)) {
                        const payLoad = {
                            userId: userId,
                            password: trimmedPassword,
                            clientId:clientId,
                            otp:otp
                        };
                        const response = await postPasswordChange(payLoad);
                        if (response) {
                            const { responseInfo } = response;
                            if (responseInfo) {
                                showSuccessMessage(passwordChangeSuccessMsg);
                                setTimeout(() => {
                                    PasswordChangeSuccessAction()
                                    //  loggeoutFunction.handleClickOnLogout();
                                }, 3000);
                            }
                        }
                    } else {
                        showErrorMessage(passwordPattern);

                    }
                } else {
                    showErrorMessage(passwordNotMsg);
                }
            } else {
                showErrorMessage(OtpEmptyMsg);
            }
        } else {
            showErrorMessage(passwordEmptyMsg);
        }
    }
    const handlePasswordVisibility = () => {
        setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
    }

    useEffect(() => {
        if (isPasswordVisibilityOn) {
            setPasswordType("text");
            setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
        } else {
            setPasswordType("password");
            setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
        }
    }, [isPasswordVisibilityOn])

    const passwordInputProps = {
        endAdornment: (
            <InputAdornment position='end'>
                <IconButton
                    aria-label='toggle password visibility'
                    onClick={handlePasswordVisibility}
                >
                    {passwordFieldIcon}
                </IconButton>
            </InputAdornment>
        ),
    }

    const newPasswordInput = new InputFieldProps(
        setNewPassword,
        "New password",
        null,
        'text'
    );
    const newOtpInput = new InputFieldProps(
        setOtp,
        "OTP",
        null,
        'text'
    );
    const confirmPasswordInput = new InputFieldProps(
        setConfirmPassword,
        "Confirm password",
        null,
        passwordType
    );
    return (
        <CardLayout>
            <Box my={"20px"}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={3}>
                        <InputField props={newPasswordInput} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InputField inputProps={passwordInputProps} props={confirmPasswordInput} />
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={3}>
                        <InputField props={newOtpInput} />
                    </Grid>
                </Grid>
                <Button
                    xs={12}
                    name="save"
                    onClick={handlePasswordChange}
                    type="submit"
                    sx={{ m: "10px 5px" }}
                    variant="contained"
                    color="primary"
                >
                    {changePassword}
                </Button>
            </Box>
        </CardLayout>
    )
}

export default ChangePassword