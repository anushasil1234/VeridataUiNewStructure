import { Box, Button, Grid, IconButton, InputAdornment, Link, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { InputField, PageHeading1, InputFieldProps, setLocalStorageItem, removeLocalStorageItems } from "shared/utils";
import { styles, imageContainer, loginImageStyle, loginFieldIconStyle, noBtnIconStyle } from "app";
import { useNavigate } from "react-router-dom";
import { emptyPasswordField, emptyUserNameField, otpToMailMsg, toDashboard, toForgotPassword, toSetPassword, welcomeMsg } from "shared/constants/constants";
import loginImage from 'assets/images/backgrounds/loginimage.png';
import logo from 'assets/images/logos/pfc_logo1.png';
import { removeLoggedinData, storeLoggedinData } from "store/slices/login-slice";
import { removeLoggedinTokenData, storeLoggedinTokenData } from "store/slices/login-token-slice";
import { useDispatch, useSelector } from "react-redux";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect } from "react";
import { removeDropdownList } from "store/slices/dropdown-slice";
import { removeApi } from "store/slices/api-slice";
import { removeFunction } from "store/slices/function-slice";
import { removePopUpSetFunction } from "store/slices/popup-slice";
import { storeLoggeoutData } from "store/slices/logout-slice";
import { removeSideMenuItems } from "store/slices/side-menu-items-slice";
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "authConfig";

export const LoginView = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  const [passwordFieldIcon, setPasswordFieldIcon] = useState(<VisibilityOff sx={loginFieldIconStyle} />);
  const [timeoutTimer, setTimeoutTimer] = useState();
  const { instance } = useMsal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const userNameInput = new InputFieldProps(
    setUserName,
    "Username",
    null,
    null
  );
  const userNameInputProps = {
    endAdornment: (
      <InputAdornment position='end'>
        <AccountCircle sx={noBtnIconStyle} />
      </InputAdornment>
    ),
  }
  const passwordInput = new InputFieldProps(
    setPassword,
    "password",
    null,
    passwordType
  );
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


  const apiSlice = useSelector(state => state.apiSlice);
  const functionSlice = useSelector(state => state.functionSlice);
  const popUpSlice = useSelector(state => state.popUpSlice);

  const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
  const showSuccessMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showSuccessMessage;

  const { postLoginCredDetails, postLoginDetails, postLoginByEmailDetails } = apiSlice[0];
  const { setDropdownList, openOtpSubmitionModel, closeOtpSubmitionModel, openInfoModel } = functionSlice[0];


  const handleClickOnLogout = () => {
    dispatch(removeLoggedinData());
    dispatch(removeLoggedinTokenData());
    removeLocalStorageItems(["pfc-user"]);
    removeLocalStorageItems(["pfc-token"]);
    dispatch(removeApi());
    dispatch(removeDropdownList());
    dispatch(removeFunction());
    dispatch(removePopUpSetFunction());
    dispatch(removeSideMenuItems());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName === "") {
      showErrorMessage(emptyUserNameField);
    } else if (password === "") {
      showErrorMessage(emptyPasswordField);
    } else {
      const payLoad = {
        userCode: userName,
        password: password
      };
      const response = await postLoginCredDetails(payLoad);
      if (response) {

        const { responseInfo } = response;
        const { clientId, dbUserType } = responseInfo;
        const handlePostUserDetails = async (otp = null) => {
          const payLoad = {
            clientId: clientId,
            dbUserType: dbUserType,
            otp: otp
          };

          const response = await postLoginDetails(payLoad);
          if (response) {
            const { responseInfo } = response;
            const { userDetails, tokenDetails } = responseInfo;
            const { userName, consentStatus, userTypeId, isDefaultPassword, isPasswordExpire } = userDetails;
            if (userTypeId === 3 && consentStatus === 0 && isDefaultPassword === false && isPasswordExpire === false) {
              const infoModelcontent = {
                // dialogContentText: 'dialogContentText',
                // dialogTitle: 'dialogTitle',
                dialogContentComponent:
                  <Box>
                    <Typography style={{
                      fontSize: "1.5rem"
                    }}>
                      Hi {userName.split(' ')[0]} !
                    </Typography>
                    <Typography
                      style={{
                        fontSize: ".9rem",
                        textAlign: "left",
                        color: '#6e6d7a'
                      }}
                    >
                      {welcomeMsg}
                    </Typography>
                  </Box>,
                maxWidth: 'sm'
              }
              openInfoModel(infoModelcontent);
            }

            setLocalStorageItem("pfc-user", userDetails);
            setLocalStorageItem("pfc-token", tokenDetails);
            dispatch(storeLoggedinData(userDetails));
            dispatch(storeLoggedinTokenData(tokenDetails));
            dispatch(storeLoggeoutData({ handleClickOnLogout }));
            if (isDefaultPassword === true || isPasswordExpire === true) {
              navigate(`${toSetPassword}`);
            } else {
              await setDropdownList();
              navigate(`${toDashboard}`);
            }
            closeOtpSubmitionModel();
          } else {
            navigate("/");
          }
        }
        if (dbUserType === 3) {
          showSuccessMessage(otpToMailMsg);
          openOtpSubmitionModel({
            otpSubmitionFunction: (otp) => {
              handlePostUserDetails(otp);
            },
            timeoutTimer: timeoutTimer,
            setTimeoutTimer: setTimeoutTimer
          });
        } else {
          handlePostUserDetails();
        }

      } else {
        navigate("/");
      }
    }
  };

  const handleGetUserDetails = async (username) => {
    // const payLoad = {
    //   email: userName,
    // };
    const response = await postLoginByEmailDetails(username);
    if (response) {
      const { responseInfo } = response;
      const { userDetails, tokenDetails } = responseInfo;
      const { isDefaultPassword, isPasswordExpire } = userDetails;
      setLocalStorageItem("pfc-user", userDetails);
      setLocalStorageItem("pfc-token", tokenDetails);
      dispatch(storeLoggedinData(userDetails));
      dispatch(storeLoggedinTokenData(tokenDetails));
      dispatch(storeLoggeoutData({ handleClickOnLogout }));
      await setDropdownList();
      navigate(`${toDashboard}`)
      // if (!isDefaultPassword === true || isPasswordExpire === true) {
      //   navigate(`${toSetPassword}`);
      // } else {
      //   await setDropdownList();
      //   navigate(`${toDashboard}`);
      // }
    } else {
      navigate("/");
    }
  }
  const handleSSOLogin = () => {
    instance.loginPopup(loginRequest)
      .then((response) => {
        //   console.log("Logged in", response);
        //  Handle successful login, navigate to a secure page
        handleGetUserDetails(response.account.username);
        //  handleGetUserDetails(userName);
      })
      .catch((e) => {
        handleGetUserDetails();
        console.error("SSO Login failed", e);
      });
  };
  return (
    <>
      <Grid>
        <Paper elevation={10} style={styles.paperStyle}>
          <Grid container align="center" sx={styles.stackimageContainer}>
            <Grid item md={8} sx={{ ...styles.loginsection, display: { xs: "none", md: "block" } }}>
              <img
                style={loginImageStyle}
                src={loginImage}
                alt="text"
              />
            </Grid>
            <Grid item md={4} sx={styles.loginsection}>
              <Grid>
                <Box sx={imageContainer}>
                  <img
                    style={{ height: "100%", width: "100%" }}
                    src={logo}
                    alt="text"
                  />
                </Box>
                <Box my={1.25}>
                  <PageHeading1 heading={"sign in"} />
                </Box>
              </Grid>
              <Grid>
                <form onSubmit={handleSubmit}>
                  <InputField inputProps={userNameInputProps} props={userNameInput} />
                  <InputField inputProps={passwordInputProps} props={passwordInput} />
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={styles.btnstyle}
                    fullWidth
                  >
                    Sign in
                  </Button>
                </form>
                <hr />

                {/* SSO login button */}
                <Button
                  color="primary"
                  variant="contained"
                  style={styles.btnstyle}
                  fullWidth
                  onClick={handleSSOLogin}
                >Admin User Sign in
                </Button>
                <Box mt={2}>
                  <Typography variant="body2" align="center">
                    <Link href={toForgotPassword} underline="hover">
                      Forgot Password?
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};
export default LoginView;

