import { Button,Grid} from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { invalidEmailMsg, contactNoEmptyMsg, emailEmptyMsg, emptyUserNameField, passwordEmptyMsg, roleEmptyMsg, toUserlist, invalidPasswordPatternMsg, invalidcontactNoMsg } from 'shared/constants/constants'
import { CardLayout, PageLayout, hasValue, validationsCheck } from 'shared/utils'
import UserCreationForm from '../user-creation-form/user-creation-form'
import { postUserDetails } from 'server/apis'
import showErrorMessage from 'shared/utils/associate/show-error-message'

const CreateUserView = () => {

    const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
    const apiSlice = useSelector(state => state.apiSlice);
    const loggedInData = useSelector(state => state.loggedInData);
    // const popUpSlice = useSelector(state => state.popUpSlice);
   
   
    const { navigateTo } = commonHooksFunctionSlice[0];
    // const { postUserDetails } = apiSlice[0];

    const { userId, userTypeId, companyId } = loggedInData[0];
    // const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;


    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [role, setRole] = useState("");
    const [userCode, setUserCode] = useState();

    const saveUserDetails = async () => {

        if (!hasValue(userName)) {
            showErrorMessage(emptyUserNameField);
            return   
        }

        if (!hasValue(userEmail) ) {
            showErrorMessage(emailEmptyMsg);
            return
        }
        if (hasValue(userEmail)  && !validationsCheck(userEmail.trim(), 'email')) {
            showErrorMessage(invalidEmailMsg);
            return
        }
        // if (!hasValue(password)) {
        //     showErrorMessage(passwordEmptyMsg);
        //     return
        // }
        // if (hasValue(password)  && !validationsCheck(password.trim(), 'password')) {
        //     showErrorMessage(invalidPasswordPatternMsg);
        //     return
        // }
        // if (!hasValue(userCode)) {
        //     showErrorMessage(useCodeEmptyMsg);
        //     return
        // }
        // if (hasValue(userCode) && !validationsCheck(userCode.trim(), 'userCode')) {
        //     showErrorMessage(invalidUserCodeMsg);
        //     return   
        // }
        if (!hasValue(contactNumber)) {
            showErrorMessage(contactNoEmptyMsg);
            return
        }
        if (hasValue(contactNumber)  && !validationsCheck(contactNumber.trim(), 'phnNumber')) {
            showErrorMessage(invalidcontactNoMsg);
            return
        }
        if (!hasValue(role)) {
            showErrorMessage(roleEmptyMsg);
            return
        }
   
        const payLoad = {
            contactNo: contactNumber.trim(),
            emailId: userEmail.trim(),
            // password: password.trim(),
            roleId: role,
            // userCode: userCode.trim(),
            userName: userName.trim(),
            candidateId: null,
            companyId: companyId,
            userTypeId: userTypeId,
            refAppointeeId: null,
            userId: userId
        }
        const response = await postUserDetails(payLoad);
        if (response){
            setUserName("");
            setUserEmail("");
            setPassword("");
            setContactNumber("");
            setRole("");
            setUserCode("");
            
        }
    }
    // todo
    const handlePassWordValidation = (password) => {
       let flag = true;
        if (hasValue(password)) {


        } else {
            showErrorMessage(passwordEmptyMsg);
            flag = false;
        }
    }

    return (
        <PageLayout pageName={"Create User"}>
            <CardLayout>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid container rowSpacing={1} columnSpacing={2.5} item xs={8}>
                        <UserCreationForm
                            userName={userName}
                            userEmail={userEmail}
                            // password={password}
                            // userCode={userCode}
                            contactNumber={contactNumber}
                            role={role}
                            setUserName={setUserName}
                            setUserEmail={setUserEmail}
                            setPassword={setPassword}
                            setUserCode={setUserCode}
                            setContactNumber={setContactNumber}
                            setRole={setRole}
                            action={'C'}
                            handlePassWordValidation={handlePassWordValidation}
                        />
                        <Grid item xs={12} md={6} >
                            <Button variant='contained' sx={{ marginLeft: "5px" }} onClick={saveUserDetails}>Save</Button>
                            <Button onClick={() => navigateTo(toUserlist)} variant='contained' sx={{ marginLeft: "5px" }}>Back</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardLayout>
        </PageLayout>
    )
}

export default CreateUserView