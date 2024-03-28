import { Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { smallFormModelHeadingSx } from 'app';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { invalidProfilePasswordMsg } from 'shared/constants/constants';
import { hasValue } from 'shared/utils';
import Button1 from 'shared/utils/button/button1';
import FullScreenModel from 'shared/utils/models/fullscreen-modal';

let UnWrappedProfilePasswordFormSubmitionForm = (
    {
        passwordSubmitionProps
    }) => {

    const popUpSlice = useSelector((state) => state.popUpSlice);
    const loggedInData = useSelector((state) => state.loggedInData);
    const apiSlice = useSelector((state) => state.apiSlice);

    const { userId } = loggedInData && loggedInData.length > 0 && loggedInData[0];
    const {postProfilePassword} = apiSlice[0];
    const { showErrorMessage } = popUpSlice[0];
    const { callBack } = passwordSubmitionProps;
    
    const [password, setPassword] = useState();
    const [displayfilePassword, setDisplayfilePassword] = useState();
    const [submitButtonStatus, setSubmitButtonStatus] = useState(true);


    const handleInputChange = async ({target}) => {

        try {
            const { value } = target;
            // const encryptedPassword = await encryptedData(value);
            setDisplayfilePassword(value);
            setPassword(value);
            if (hasValue(value)) {
                setSubmitButtonStatus(false);
            }else{
                setSubmitButtonStatus(true);
            }
            
        } catch (error) {
            // console.log('error', error);
        }
     
    }
    const handlePasswordsubmition = async () => {
        const payLoad = {
            profilePassword: password,
            userId: userId
        }
        const response = await postProfilePassword(payLoad);
        if (response) {
            const { responseInfo } = response;
            if (responseInfo) {
                callBack()
            }else{
                showErrorMessage(invalidProfilePasswordMsg);
            }
        }
    }

    return (
        <Box my={"20px"}>

            <Typography sx={smallFormModelHeadingSx}>Enter Profile Password</Typography>
            <Stack justifyContent={"center"} alignItems={"center"} direction={"row"}>
                <Box>
                    <TextField
                        error={false}
                        style={{ width: "100%", margin: "5px" }}
                        type="password"
                        label="Profile Password"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={displayfilePassword}
                    />
                </Box>
            </Stack>
            <Box>
                <Button1 disabled={submitButtonStatus} onClick={handlePasswordsubmition} type='submit'>
                    Submit
                </Button1>
            </Box>

        </Box>
    )
}
const ProfilePasswordForm = (props) => {

    return (
        <FullScreenModel
            open={props.open}
            closeModel=
            {props.closePasswordSubmitionModel}
            content={<UnWrappedProfilePasswordFormSubmitionForm
                {...props} />}
        />
    )

}

export default ProfilePasswordForm