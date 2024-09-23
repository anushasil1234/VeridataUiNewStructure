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
import CircularIndeterminate from "shared/utils/loader/circularIndeterminate";

export const UserLoginView = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isPasswordVisibilityOn, setIsPasswordVisibilityOn] = useState(false);
  const [passwordFieldIcon, setPasswordFieldIcon] = useState(<VisibilityOff sx={loginFieldIconStyle} />);
  const [timeoutTimer, setTimeoutTimer] = useState();
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
  const [loading, setLoading] = useState(false);

  const startLoader = () => setLoading(true);
  const stopLoader = () => setLoading(false);

  const handleClickOnLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
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

      try {
        // Start the loader before making the API call
        startLoader();

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

              // Show welcome message if needed
              if (userTypeId === 3 && consentStatus === 0 && !isDefaultPassword && !isPasswordExpire) {
                const wellcomeMsgContent = {
                  dialogContentText: "",
                  dialogTitle: "",
                  dialogContentComponent: <Box>
                    <Typography style={{ fontSize: "1.5rem" }}>
                      Hi {userName.split(' ')[0]} !
                    </Typography>
                    <Typography style={{ fontSize: ".9rem", textAlign: "left", color: '#6e6d7a' }}>
                      {welcomeMsg}
                    </Typography>
                  </Box>,
                  maxWidth: 'sm',
                  btnName: 'Close'
                };
                openInfoModel(wellcomeMsgContent);
              }

              // Store user and token data
              setLocalStorageItem("pfc-user", userDetails);
              setLocalStorageItem("pfc-token", tokenDetails);
              dispatch(storeLoggedinData(userDetails));
              dispatch(storeLoggedinTokenData(tokenDetails));
              dispatch(storeLoggeoutData({ handleClickOnLogout }));

              if (isDefaultPassword || isPasswordExpire) {
                navigate(toSetPassword);
              } else {
                await setDropdownList();
                navigate(toDashboard);
              }

              // Stop the loader after successful login
              stopLoader();
              closeOtpSubmitionModel();
            } else {
              navigate("/");
              stopLoader(); // Stop loader in case of error
            }
          };

          // If the user type requires OTP submission
          if (dbUserType === 3) {
            stopLoader(); // Stop loader if no response
            showSuccessMessage(otpToMailMsg);
            openOtpSubmitionModel({
              otpSubmitionFunction: (otp) => {
                handlePostUserDetails(otp);
              },
              timeoutTimer: timeoutTimer,
              setTimeoutTimer: setTimeoutTimer
            });
          } else {
            startLoader(); //
            handlePostUserDetails();
            stopLoader(); // Stop loader if no response

          }
        } else {
          navigate("/");
          stopLoader(); // Stop loader if no response
        }
      } catch (error) {
        console.error("Error during login:", error);
        stopLoader(); // Stop loader in case of any errors
        showErrorMessage("An error occurred during login. Please try again.");
      }
    }
  };


  return (
    <>
      {loading && <CircularIndeterminate />}
      <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ ...styles.containerStyles }}>
        <Paper elevation={8} sx={{ ...styles.paperStyle }}>
          <Grid container align="center" sx={styles.stackimageContainer}>
            <Grid item md={8} sx={{ ...styles.loginsection, display: { xs: "none", md: "block" } }}>
              <img
                style={loginImageStyle}
                src={loginImage}
                alt="text"
              />
            </Grid>
            <Grid item md={4} sx={styles.loginsection}>
              {/* <Grid> */}
              <Box sx={imageContainer}>
                <img
                  style={{ height: "50%", width: "50%", objectFit: "contain" }}
                  src={logo}
                  alt="text"
                />
              </Box>
              <Box my={1.25}>
                <PageHeading1 heading={"sign in"} />
              </Box>
              {/* </Grid> */}
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
export default UserLoginView;

