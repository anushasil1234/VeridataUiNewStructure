import { Box, Grid, Stack, Typography } from '@mui/material';
import { cardStyle, listHeadingConteinerStyle, listHeadingStyle } from 'app';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { PersonalInformation } from 'shared/components/display-information/personal-information';
import { hasValue } from 'shared/utils';
import FullScreenModel from 'shared/utils/models/fullscreen-modal';


const _UserView = (props) => {
    const { userId } = props;

    const apiSlice = useSelector(state => state.apiSlice);
    const dropdownList = useSelector(state => state.dropdownList);

    const {
        roleList
    } = dropdownList && dropdownList.length > 0 && dropdownList[0];
    const { getInputList } = apiSlice[0];

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [roleName, setRoleName] = useState();
    const [userCode, setUserCode] = useState();

    const setUserDetailsFields = async () => {
        const response = await getInputList(userId);
        if (response) {
            const { responseInfo } = response;
            const { emailId, roleId, userName, password, phone, userCode } = responseInfo;
            hasValue(userName) ? setUserName(userName) : setUserName("");
            hasValue(password) ? setPassword(password) : setPassword("");
            hasValue(emailId) ? setUserEmail(emailId) : setUserEmail("");
            hasValue(phone) ? setContactNumber(phone) : setContactNumber("");
            hasValue(userCode) ? setUserCode(userCode) : setUserCode("");
            if (hasValue(roleId)) {
                const role = roleList.find(({ id }) => id === roleId);
                if (role) {
                    setRoleName(role.value);
                }
            } else {
                setRoleName("");
            }

        }
    }
    useEffect(() => {
        setUserDetailsFields();
    }, [])


    return (
        <Grid item xs={12} md={5.5}>
            <Box sx={cardStyle}>
                <Stack sx={listHeadingConteinerStyle}>
                    <Typography sx={listHeadingStyle}>
                        Personal Information
                    </Typography>
                </Stack>
                <Grid container spacing={0}>
                    <PersonalInformation
                        fieldName={"User name"}
                        fieldValue={userName}
                    />
                    <PersonalInformation
                        fieldName={"Password"}
                        fieldValue={password}
                    />
                    <PersonalInformation
                        fieldName={"EmailId"}
                        fieldValue={userEmail}
                    />
                    <PersonalInformation
                        fieldName={"User Code"}
                        fieldValue={userCode}
                    />
                    <PersonalInformation
                        fieldName={"Contact no"}
                        fieldValue={contactNumber}
                    />
                    <PersonalInformation
                        fieldName={"Role Name"}
                        fieldValue={roleName}
                    />
                </Grid>
            </Box>
        </Grid>
    )
}
const UserView = (props) => {

    return (
        <FullScreenModel
            open={props.openView}
            closeModel={props.closeViewModel}
            content={<_UserView {...props} />}
        />
    );
}

export default UserView