import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { loginFieldIconStyle, lableRedStyle } from 'app';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChangePasswordGenerateOTP, postPasswordChange } from 'server/apis';
import {
  changePassword,
  confirmpasswordNotMsg,
  OtpEmptyMsg,
  passwordChangeSuccessMsg,
  passwordEmptyMsg,
  passwordNotMsg,
  passwordPattern,
  setPasswordOtpToMailMsg,
  toSetPassword,
} from 'shared/constants/constants';
import { CardLayout, InputField, InputFieldProps, hasValue } from 'shared/utils';
import isPasswordValid from 'shared/utils/associate/is-pasword-valid';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';
const ChangePassword = ({ userId, clientId, userCode, userType, PasswordChangeSuccessAction }) => {
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openLicenseModal } = functionSlice[0];
  const navigate = useNavigate();
  const userRespondedToModal = useRef(false);
  const loggeoutData = useSelector((state) => state.loggeoutData);
  const loggeoutFunction = loggeoutData && loggeoutData.length > 0 && loggeoutData[0];
  const isDefaultPassword = localStorage.getItem('isDefaultPassword');
  if (isDefaultPassword === 'true' && !userRespondedToModal.current) {
    const handleYes = () => {
      userRespondedToModal.current = true;
      navigate(toSetPassword);
    };
    const handleNo = () => {
      userRespondedToModal.current = true;
      loggeoutFunction.handleClickOnLogout();
      navigate('/');
    };
    const consentPopupContent = {
      dialogTitle: 'Consent Required',
      dialogContentText: 'You need to set a new password. Do you want to proceed?',
      firstButtonName: 'Agree',
      secondButtonName: 'Disagree',
      confirmedYes: handleYes,
      confirmedNo: handleNo,
      disableCloseIcon: true,
    };
    openLicenseModal(consentPopupContent, (response) => {
    });
  }
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpClientId, setOtpClientId] = useState(clientId);
  const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  const [isOTPDisable, setIsOTPDisable] = useState(true);
  const [isConfPasswrdDisable, setIsConfPasswrdDisable] = useState(true);
  const [passwordFieldIcon, setPasswordFieldIcon] = useState(
    <VisibilityOff sx={loginFieldIconStyle} />,
  );
  const [passwordType, setPasswordType] = useState('password');
  const [remainingTime, setRemainingTime] = useState(300);
  const [showResendButton, setShowResendButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState(false);
  const [isOtpSubmnittedSuccessfully, setIsOtpSubmnittedSuccessfully] = useState(false);
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const apiSlice = useSelector((state) => state.apiSlice);
  const handlePasswordChange = async () => {
    const validationResult = isPasswordValid(newPassword);
    if (!validationResult.isValid) {
      return showErrorMessage(validationResult.msg);
    }
    if (hasValue(confirmPassword)) {
      if (newPassword !== confirmPassword) return showErrorMessage(confirmpasswordNotMsg);
    } else {
      return showErrorMessage('Confirm Password cannot be empty');
    }
    if (!otp) return showErrorMessage('OTP cannot be empty.');
    setLoading(true);
    const trimmedPassword = newPassword.trim();
    const payLoad = {
      userId: userId,
      password: trimmedPassword,
      clientId: otpClientId,
      otp: otp,
      userType: userType,
    };
    const response = await postPasswordChange(payLoad);
    if (response) {
      const { responseInfo } = response;
      if (responseInfo) {
        showSuccessMessage(passwordChangeSuccessMsg);
        setIsOtpSubmnittedSuccessfully(true);
        setTimeout(() => {
          PasswordChangeSuccessAction();
          setLoading(false);
        }, 300);
      }
    } else {
      setLoading(false);
    }
  };
  const handleResendOtp = async () => {
    setRemainingTime(300);
    setShowResendButton(false);
    startTimer();
    const payLoad = {
      userEmail: userCode,
    };
    const response = await ChangePasswordGenerateOTP(payLoad);
    if (response) {
      const { responseInfo } = response;
      const { clientId, dbUserType } = responseInfo;
      setOtpClientId(clientId);
      showSuccessMessage(setPasswordOtpToMailMsg);
    }
  };
  const handlePasswordVisibility = () => {
    setIsPasswordVisibilityOn(!isPasswordVisibilityOn);
  };
  const startTimer = () => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowResendButton(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };
  useEffect(() => {
    startTimer();
  }, []);
  const handleNewPasswordBlur = () => {
    const trimmedPassword = newPassword.trim();
    if (hasValue(trimmedPassword) && trimmedPassword.length >= 8) {
      const validationResult = isPasswordValid(trimmedPassword);
      if (!validationResult.isValid) {
        setPasswordErrorMsg(true);
        setIsOTPDisable(true);
        showErrorMessage(passwordPattern);
        showErrorMessage(validationResult.msg);
        setIsConfPasswrdDisable(true);
      } else {
        setPasswordErrorMsg(false);
        setIsConfPasswrdDisable(false);
        setIsOTPDisable(false);
        showErrorMessage();
      }
    } else {
      setPasswordErrorMsg(true);
      showErrorMessage(passwordPattern);
    }
  };
  const handleConfirmPasswordBlur = () => {
    const trimmedPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    if (hasValue(trimmedPassword) && hasValue(trimmedConfirmPassword)) {
      if (trimmedPassword === trimmedConfirmPassword) {
        setConfirmPasswordErrorMsg(false);
        setIsOTPDisable(false);
        showErrorMessage();
      } else {
        setConfirmPasswordErrorMsg(true);
        setIsOTPDisable(true);
        showErrorMessage(confirmpasswordNotMsg);
      }
    } else {
      setConfirmPasswordErrorMsg(true);
      setIsOTPDisable(true);
      showErrorMessage(confirmpasswordNotMsg);
    }
  };
  useEffect(() => {
    if (isPasswordVisibilityOn) {
      setPasswordType('text');
      setPasswordFieldIcon(<Visibility sx={loginFieldIconStyle} />);
    } else {
      setPasswordType('password');
      setPasswordFieldIcon(<VisibilityOff sx={loginFieldIconStyle} />);
    }
  }, [isPasswordVisibilityOn]);
  const passwordInputProps = {
    endAdornment: (
      <InputAdornment position='end'>
        <IconButton aria-label='toggle password visibility' onClick={handlePasswordVisibility}>
          {passwordFieldIcon}
        </IconButton>
      </InputAdornment>
    ),
  };
  const newPasswordInput = new InputFieldProps(setNewPassword, 'New Password', null, 'text');
  const newOtpInput = new InputFieldProps(setOtp, 'OTP', null, 'text');
  const confirmPasswordInput = new InputFieldProps(
    setConfirmPassword,
    'Confirm Password',
    null,
    passwordType,
  );
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  return (
    <CardLayout>
      <Box my={'20px'}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ paddingTop: 1 }}>** {passwordPattern}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ paddingTop: 1 }}>** {setPasswordOtpToMailMsg}</Typography>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={3}>
            <InputField
              error={passwordErrorMsg}
              props={{ ...newPasswordInput, handleBlur: handleNewPasswordBlur }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <InputField
              error={confirmPasswordErrorMsg}
              inputProps={passwordInputProps}
              props={{
                ...confirmPasswordInput,
                handleBlur: handleConfirmPasswordBlur,
              }}
              disabled={isConfPasswrdDisable}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <InputField props={newOtpInput} disabled={isOTPDisable} />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              name='save'
              onClick={handlePasswordChange}
              type='submit'
              sx={{ m: '12px 7px' }}
              variant='contained'
              color='primary'
            >
              {changePassword}
            </Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography sx={{ m: '12px 7px' }}>
              {showResendButton ? (
                <Button name='save' color='secondary' variant='contained' onClick={handleResendOtp}>
                  Resend OTP
                </Button>
              ) : (
                `OTP Timer: ${formatTime(remainingTime)}`
              )}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {loading && <CircularIndeterminate />}
    </CardLayout>
  );
};
export default ChangePassword;
