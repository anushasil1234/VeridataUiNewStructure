import { Button,Grid} from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { passwordEmptyMsg, toUserlist } from 'shared/constants/constants'
import { CardLayout, PageLayout, hasValue } from 'shared/utils'
import UserCreationForm from '../user-creation-form/user-creation-form'

const CreateUserView = () => {

    const commonHooksFunctionSlice = useSelector(state => state.commonHooksFunctionSlice);
    const apiSlice = useSelector(state => state.apiSlice);
    const loggedInData = useSelector(state => state.loggedInData);
    const popUpSlice = useSelector(state => state.popUpSlice);
   
   
    const { navigateTo } = commonHooksFunctionSlice[0];
    const { postUserDetails } = apiSlice[0];

    const { userId, userTypeId, companyId } = loggedInData[0];
    const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;


    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [role, setRole] = useState("");
    const [userCode, setUserCode] = useState();

    const saveUserDetails = async () => {

        const payLoad = {
            contactNo: contactNumber,
            emailId: userEmail,
            password: password,
            roleId: role,
            userCode: userCode,
            userName: userName,
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
                            password={password}
                            userCode={userCode}
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