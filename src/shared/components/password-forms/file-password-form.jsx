import { Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { smallFormModelHeadingSx } from 'app';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { encryptedData } from 'shared/utils';
import Button1 from 'shared/utils/button/button1';
import FullScreenModel from 'shared/utils/models/fullscreen-modal';
import { removeData } from 'store/slices/data-slice';

let UnWrappedFilePasswordFormSubmitionForm = (
    props
) => {
    const { filePasswordSubmitionProps, closeFilePasswordSubmitionModel } = props;
    const { downloadApi, payLoad } = filePasswordSubmitionProps;

    const apiSlice = useSelector((state) => state.apiSlice);
    // const DataSlice = useSelector((state) => state.DataSlice);

    //    const dispatch = useDispatch();

    // const fileSubmitionPayLoad = DataSlice[0] && DataSlice[0].fileSubmitionPayLoad;

    const { downloadReport } = apiSlice && apiSlice[0];

    const [filePassword, setFilePassword] = useState();
    const [displayfilePassword, setDisplayfilePassword] = useState();
    const [submitButtonStatus, setSubmitButtonStatus] = useState(true);
    const handlePasswordsubmition = async () => {
        const _payLoad = {
            ...payLoad,
            filePassword
        }
        await downloadReport(downloadApi, _payLoad);
        closeFilePasswordSubmitionModel();
        // dispatch(removeData())
    }

    const handlePasswordChange = async ({ target }) => {
        try {
            const { value } = target;
            const encryptedPassword = await encryptedData(value);
            setFilePassword(encryptedPassword);
            setDisplayfilePassword(value);
        } catch (error) {

        }
    }

    useEffect(() => {
        if (filePassword) {
            setSubmitButtonStatus(false);
        }

    }, [filePassword])

    return (
        <Box my={"20px"}>

            <Typography sx={smallFormModelHeadingSx}>Enter File Password</Typography>
            <Stack justifyContent={"center"} alignItems={"center"} direction={"row"}>
                <Box>
                    <TextField
                        error={false}
                        style={{ width: "100%", margin: "5px" }}
                        type="password"
                        label=""
                        variant="outlined"
                        onChange={handlePasswordChange}
                        value={displayfilePassword}
                    />
                </Box>
            </Stack>
            <Box>
                <Button1 disabled={submitButtonStatus} onClick={handlePasswordsubmition}>
                    Submit
                </Button1>
            </Box>
        </Box >
    )
}
const FilePasswordForm = (props) => {

    return (
        <FullScreenModel
            open={props.open}
            closeModel=
            {props.closeFilePasswordSubmitionModel}
            content={<UnWrappedFilePasswordFormSubmitionForm
                {...props} />}
        />
    )

}

export default FilePasswordForm