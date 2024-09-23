import { Box, Button, Grid, InputAdornment, Link, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { InputField, PageHeading1, InputFieldProps } from "shared/utils";
import { styles, imageContainer, loginImageStyle, noBtnIconStyle } from "app";
import { useNavigate } from "react-router-dom";
import { emptyUserNameField, toReSetPassword, toUserLogin } from "shared/constants/constants";
import loginImage from 'assets/images/backgrounds/loginimage.png';
import logo from 'assets/images/logos/pfc_logo1.png';
import { useSelector } from "react-redux";
import { AccountCircle } from "@mui/icons-material";


export const ForgotPasswordView = () => {
  const [userName, setUserName] = useState("");
  const [timeoutTimer, setTimeoutTimer] = useState();

  const navigate = useNavigate();


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



  const apiSlice = useSelector(state => state.apiSlice);
  const functionSlice = useSelector(state => state.functionSlice);
  const popUpSlice = useSelector(state => state.popUpSlice);
  const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
  const { ChangePasswordGenerateOTP } = apiSlice[0];
  // const { openOtpSubmitionModel, closeOtpSubmitionModel } = functionSlice[0];


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userName === "") {
      showErrorMessage(emptyUserNameField);
    }
    else {
      const payLoad = {
        userCode: userName,
      };
      const response = await ChangePasswordGenerateOTP(payLoad);
      if (response) {
        const { responseInfo } = response;
        const { clientId, dbUserType, userId } = responseInfo;
        const data = { userId, clientId, userCode: userName, dbUserType }; // Example data
        navigate(`${toReSetPassword}`, { state: data });
        //showSuccessMessage(setPasswordOtpToMailMsg);
      } else {
        //navigate("/");
      }
    }
  };

  return (
    <>
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
              <Grid>
                <form onSubmit={handleSubmit}>
                  <InputField inputProps={userNameInputProps} props={userNameInput} />
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    style={styles.btnstyle}
                    fullWidth
                  >
                    Generate Otp & Set Password
                  </Button>
                </form>
                <Box mt={2}>
                  <Typography variant="body2" align="center">
                    <Link href={toUserLogin} underline="hover">
                      Back to login
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
export default ForgotPasswordView;

