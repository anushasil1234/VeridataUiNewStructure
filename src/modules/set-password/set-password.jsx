import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { lable1Style, loginFieldIconStyle } from 'app';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { changePassword, passwordEmptyMsg, passwordNotMsg } from 'shared/constants/constants';
import { CardLayout, InputField, InputFieldProps, hasValue } from 'shared/utils'

const SetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
    const [passwordFieldIcon, setPasswordFieldIcon] = useState(<VisibilityOff sx={loginFieldIconStyle} />);
    const [passwordType, setPasswordType] = useState("password");

    console.log('confirmPassword', confirmPassword);
    const popUpSlice = useSelector(state => state.popUpSlice);
    const loggeoutData = useSelector(state => state.loggeoutData);
    const loggeoutFunction = loggeoutData && loggeoutData.length > 0 && loggeoutData[0];
    const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
    const handlePasswordChange = () => {
        if (hasValue(newPassword) && hasValue(confirmPassword)) {
            if (newPassword.trim() === confirmPassword.trim()) {
                loggeoutFunction.handleClickOnLogout();
            } else {
                showErrorMessage(passwordNotMsg);
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
                        <Typography sx={lable1Style}>
                            New Password
                        </Typography>
                        <InputField props={newPasswordInput} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography sx={lable1Style}>
                            Confirm Password
                        </Typography>
                        <InputField inputProps={passwordInputProps} props={confirmPasswordInput} />
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

export default SetPassword