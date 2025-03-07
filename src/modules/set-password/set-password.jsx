import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ChangePassword from './change-password';
import { hasValue } from 'shared/utils';
import { setPasswordOtpToMailMsg } from 'shared/constants/constants';
import { ChangePasswordGenerateOTP } from 'server/apis';

const SetPassword = () => {

    const [clientId, setClientId] = useState('');
    // const [dbUserType, setDbUserType] = useState(null);

    const loggeoutData = useSelector(state => state.loggeoutData);
    const loggedInData = useSelector((state) => state.loggedInData);
    const loggeoutFunction = loggeoutData && loggeoutData.length > 0 && loggeoutData[0];
    const { userId, userCode } = loggedInData[0];

    const apiSlice = useSelector(state => state.apiSlice);
    // const popUpSlice = useSelector(state => state.popUpSlice);

    // const showErrorMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
    // const showSuccessMessage = popUpSlice && popUpSlice[0] && popUpSlice[0].showSuccessMessage;

    // const { ChangePasswordGenerateOTP } = apiSlice[0];

    const handleOtpGenerate = async (e) => {
        // e.preventDefault();

        const payLoad = {
            userCode: userCode,
        };
        const response = await ChangePasswordGenerateOTP(payLoad);
        if (response) {
            const { responseInfo } = response;
            const { clientId, dbUserType } = responseInfo;
            setClientId(clientId);
            //showSuccessMessage(setPasswordOtpToMailMsg);

        }
    };
    useEffect(() => {
        handleOtpGenerate()
    }, []);
    return (

        hasValue(clientId) ?
            <ChangePassword
                userId={userId}
                clientId={clientId}
                userCode={userCode}
                // dbUserType={dbUserType}
                PasswordChangeSuccessAction={loggeoutFunction.handleClickOnLogout}
            /> : null

    )
}

export default SetPassword