import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { loginFieldIconStyle, lableRedStyle } from 'app';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { changePassword, OtpEmptyMsg, passwordChangeSuccessMsg, passwordEmptyMsg, passwordNotMsg, passwordPattern, setPasswordOtpToMailMsg } from 'shared/constants/constants';
import { CardLayout, InputField, InputFieldProps, hasValue } from 'shared/utils'
import isPaswordValid from 'shared/utils/associate/is-pasword-valid';
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';

const ChangePassword = ({ userId, clientId, userCode, PasswordChangeSuccessAction }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpClientId, setOtpClientId] = useState(clientId);
    const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
    const [isOTPDisable, setIsOTPDisable] = useState(true);
    const [isConfPasswrdDisable, setIsConfPasswrdDisable] = useState(true);
    const [passwordFieldIcon, setPasswordFieldIcon] = useState(<VisibilityOff sx={loginFieldIconStyle} />);
    const [passwordType, setPasswordType] = useState("password");
    const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
    const [showResendButton, setShowResendButton] = useState(false);
    const [loading, setLoading] = useState(false);


    const popUpSlice = useSelector(state => state.popUpSlice);
    const apiSlice = useSelector(state => state.apiSlice);
    const { postPasswordChange, ChangePasswordGenerateOTP } = apiSlice[0];
    const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
    const showSuccessMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showSuccessMessage;

    const handlePasswordChange = async () => {
        if (hasValue(newPassword) && hasValue(confirmPassword)) {
            if (hasValue(otp)) {
                const trimmedPassword = newPassword.trim();
                if (trimmedPassword === confirmPassword.trim()) {
                    if (isPaswordValid(trimmedPassword)) {
                        setLoading(true);
                        const payLoad = {
                            userId: userId,
                            password: trimmedPassword,
                            clientId: otpClientId,
                            otp: otp
                        };
                        const response = await postPasswordChange(payLoad);
                        if (response) {
                            const { responseInfo } = response;
                            if (responseInfo) {
                                showSuccessMessage(passwordChangeSuccessMsg);
                                setTimeout(() => {
                                    PasswordChangeSuccessAction();
                                    setLoading(false);

                                }, 300);
                            }
                        } else {
                            setLoading(false);

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

    const handleResendOtp = async () => {
        setRemainingTime(300); // Reset timer to 5 minutes
        setShowResendButton(false);
        startTimer();
        const payLoad = {
            userCode: userCode,
        };
        const response = await ChangePasswordGenerateOTP(payLoad);
        if (response) {
            const { responseInfo } = response;
            const { clientId, dbUserType } = responseInfo;
            setOtpClientId(clientId);
            showSuccessMessage(setPasswordOtpToMailMsg);

        }
    }


    const handlePasswordVisibility = () => {
        setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
    }

    const startTimer = () => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setShowResendButton(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    }

    useEffect(() => {
        startTimer();
    }, []);
    // useEffect(() => {
    //     if (hasValue(newPassword) && newPassword.length >= 8) {
    //         const trimmedPassword = newPassword.trim();
    //         if (isPaswordValid(trimmedPassword)) {

    //             setIsConfPasswrdDisable(false)
    //         } else {
    //             showErrorMessage(passwordPattern);
    //             setIsConfPasswrdDisable(true);
    //         }
    //     } else {
    //         setIsConfPasswrdDisable(true);
    //     }
    // }, [newPassword])

    useEffect(() => {
        if (hasValue(newPassword) && newPassword.length >= 8) {
            const trimmedPassword = newPassword.trim();
            if (isPaswordValid(trimmedPassword)) {

                setIsConfPasswrdDisable(false)
            } else {
                showErrorMessage(passwordPattern);
                setIsConfPasswrdDisable(true);
            }
        } else {
            setIsConfPasswrdDisable(true);
        }

        
        if (hasValue(newPassword) && hasValue(confirmPassword) && newPassword.length >= 8) {
            const trimmedPassword = newPassword.trim();
            if (isPaswordValid(trimmedPassword)) {
                if (trimmedPassword === confirmPassword.trim()) {
                    setIsOTPDisable(false);
                } else {
                    showErrorMessage(passwordNotMsg);
                    setIsOTPDisable(true);
                    // setConfirmPassword('');
                }
            } else {
                showErrorMessage(passwordPattern);
                setIsOTPDisable(true);
            }
        } else {
            setIsOTPDisable(true);
        }
    }, [newPassword,confirmPassword])

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

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    return (
        <CardLayout>
            <Box my={"20px"}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{  paddingTop: 1 }}>
                            ** {passwordPattern}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography sx={{  paddingTop: 1 }}>
                            ** {setPasswordOtpToMailMsg}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} md={3}>
                        <InputField props={newPasswordInput} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <InputField inputProps={passwordInputProps} props={confirmPasswordInput} disabled={isConfPasswrdDisable} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <InputField props={newOtpInput} disabled={isOTPDisable} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button
                            name="save"
                            onClick={handlePasswordChange}
                            type="submit"
                            sx={{ m: "12px 7px" }}
                            variant="contained"
                            color="primary"
                            disabled={isOTPDisable}
                        >
                            {changePassword}
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <Typography sx={{ m: "12px 7px" }}
                        >
                            {showResendButton ? (
                                <Button
                                    name="save"
                                    color="secondary"
                                    variant="contained"
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </Button>
                            ) : (
                                `Remaining Time: ${formatTime(remainingTime)}`
                            )}
                        </Typography>

                    </Grid>
                </Grid>
            </Box>
            {loading && <CircularIndeterminate />}

        </CardLayout>

    )
}

export default ChangePassword;
